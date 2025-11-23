import {ReactNode} from "react";
import {Navbar} from "@/app/(public)/_components/Navbar";

export default function LayoutPublic({children}: {children: ReactNode}) {
    return (
        <div className="py-14">
            <Navbar/>
            <main className="container mx-auto px-4 md:px-6 lg:px-6">{children}</main>
        </div>
    )
}
