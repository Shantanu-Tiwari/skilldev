import arcjet, { detectBot, rateLimit } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Rate limit: 60 requests per hour for authenticated users
    rateLimit({
      mode: "LIVE",
      characteristics: ["userId"],
      max: 60,
      window: "1h",
    }),
    // Rate limit: 10 requests per minute for anonymous users
    rateLimit({
      mode: "LIVE", 
      characteristics: ["ip"],
      max: 10,
      window: "1m",
    }),
    // Bot detection - blocks all bots
    detectBot({
      mode: "LIVE",
      allow: [], // Block all bots
    }),
  ],
});