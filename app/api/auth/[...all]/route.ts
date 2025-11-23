import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, { shield } from "@arcjet/next";
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
    
    console.log('✅ Arcjet ALLOWED request');
    return originalPOST(request);
}