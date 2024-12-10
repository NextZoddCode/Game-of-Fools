import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <main className="w-[1200px] mx-auto h-screen bg-zinc-950">
            {children}
        </main>
    )
}