import arcjet, { detectBot, fixedWindow, shield } from "@arcjet/next";
import {env} from "@/lib/env";

export default arcjet({
    key: env.ARCJET_KEY,
    characteristics: ["fingerprint"],
    rules: [
        shield({
            mode: 'LIVE',
        })
    ]
})