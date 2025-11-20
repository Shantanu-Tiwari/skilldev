"use client";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GithubIcon, Loader, Loader2, Send} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {authClient} from "@/lib/auth-client";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export function LoginForm() {
    const router = useRouter();
    const [githubPending, startGithubTransition] = useTransition();
    const [emailPending, startEmailTransition] = useTransition();
    const [email, setEmail] = useState("");
    async function signInWithGithub(){
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL:"/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Github, redirecting....");
                    },
                    onError: (error) => {
                        console.error('GitHub sign-in error:', error);
                        toast.error(error?.message || "Failed to sign in with GitHub");
                    },
                },
            })
        })
    }
    function signInWithEmail() {
        if (!email || !email.includes('@')) {
            toast.error('Please enter a valid email address');
            return;
        }
        startEmailTransition(async ()=> {
            await authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'sign-in',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Email sent');
                        router.push('/verify-request');
                    },
                    onError: (error) => {
                        toast.error(error?.message || 'Failed to send email');
                    }
                }
            })
        })
    }
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with Github or Email</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button disabled={githubPending} onClick={signInWithGithub} className="w-full" variant="outline">
                    {githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin"/>
                            <span>Loading....</span>
                        </>
                    ):(
                        <>
                            <GithubIcon className="size-4"/>
                            Sign in with Github
                        </>
                    )}
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="me@example.com"></Input>
                    </div>
                    <Button onClick={signInWithEmail} disabled={emailPending}>{emailPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>Loading....</span>
                        </>
                    ) :(
                        <>
                        <Send className="size-4"/>
                            <span>Continue with Email</span>
                        </>
                    )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}