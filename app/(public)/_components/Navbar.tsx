"use client"
import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/logo-new.png'
import {ThemeToggle} from "@/components/ui/themeToggle";
import {authClient} from "@/lib/auth-client";
import {buttonVariants} from "@/components/ui/button";

const navigationItems = [
    {name: 'About Us', href: '/'},
    {name: 'Courses', href: '/courses'},
    {name: 'Dashboard', href: "/dashboard"}
]

export function Navbar() {
    const {data: session, isPending} = authClient.useSession()
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2
                           w-[90%] max-w-5xl z-50
                           border border-b px-6 backdrop-blur-md
                           rounded-2xl flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <Image src={Logo} alt="Logo" className="w-20" />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
                {navigationItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        {item.name}
                    </Link>
                ))}
                <div className="flex items-center space-x-4">
                    {isPending ? null : session ? (
                    <p>logged in</p>
                ):(
                    <>
                    <Link href="/login" className={buttonVariants({variant: "secondary"})}>
                        Login
                    </Link>
                        <Link href="/login" className={buttonVariants()}>
                            Get Started
                        </Link>
                    </>
                )}
                </div>
            </nav>
        </header>
    );
}

