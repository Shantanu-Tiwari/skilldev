import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, { shield, validateEmail } from "@arcjet/next";
import { NextRequest } from "next/server";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
    ],
});

const { GET, POST: originalPOST } = toNextJsHandler(auth);

export { GET };

export async function POST(request: NextRequest) {
    // Clone request to read body without consuming it
    const clonedRequest = request.clone();
    let email: string | undefined;

    try {
        const body = await clonedRequest.json();
        email = body.email;
    } catch (e) {
        // Body might not be JSON or might not contain email
        console.log('⚠️ Could not parse request body');
    }

    // Apply shield protection to all requests
    const decision = await aj.protect(request);

    console.log('🛡️ Arcjet Decision:', {
        conclusion: decision.conclusion,
        reason: decision.reason,
        ip: decision.ip,
        path: request.nextUrl.pathname
    });

    if (decision.isDenied()) {
        console.log('🚫 Arcjet BLOCKED request');
        return new Response("Forbidden", { status: 403 });
    }

    // Validate email if present
    if (email) {
        const emailDecision = await aj.protect(request, {
            email,
            rules: [
                validateEmail({
                    mode: "LIVE",
                    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"]
                })
            ],
        });

        console.log('📧 Email validation:', {
            email,
            conclusion: emailDecision.conclusion
        });

        if (emailDecision.isDenied()) {
            console.log('🚫 Invalid email blocked');
            return new Response(
                JSON.stringify({ error: "Invalid email address" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
    }

    console.log('✅ Arcjet ALLOWED request');
    return originalPOST(request);
}