import { betterAuth } from "better-auth";
import { prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@/lib/db";
import {env} from "@/lib/env";
import {emailOTP} from "better-auth/plugins";
import {resend} from "@/lib/resend";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
        },
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({email, otp, type}){
                const {data} = await resend.emails.send({
                    from: "SkillDev <onboarding@resend.dev>",
                    to: [email],
                    subject: "SkillDev -- Verify your email",
                    html: "<p>Your OTP is <strong>${otp}</strong></p>"
                });
            },
            otpLength: 6,
            expiresIn: 300
        })
    ]
});