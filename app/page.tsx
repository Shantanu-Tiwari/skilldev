"use client";
import Image from "next/image";
import {ThemeToggle} from "@/components/ui/themeToggle";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export default function Home() {
    const router = useRouter();
    const {
        data: session} = authClient.useSession()
    async function signOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    toast.success('Signed out successfully')
                },
            },
        });
    }
    return (
    <div>

      <ThemeToggle />
        {session ? (
            <div>
                <p>{session.user.name}</p>
                <Button onClick={signOut}>Logout</Button>
            </div>
        ):(
            <Button onClick={() => router.push("/login")}>Login</Button>
        )}
    </div>
  );
}
