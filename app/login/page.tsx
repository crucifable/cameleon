"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function LoginContent() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md p-10 text-center space-y-8 bg-background/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Subtle shine effect */}
                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rotate-12 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                <div className="space-y-4 relative z-10">
                    <div className="bg-background/50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-lg">
                        <img src="/cameleon.png" alt="Cameleon Logo" className="size-12" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight font-product text-foreground">Login</h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Please sign in with Discord to access the full features of Cameleon.
                    </p>
                </div>

                <div className="relative z-10">
                    <Button
                        onClick={() => signIn("discord", { callbackUrl })}
                        size="lg"
                        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl h-14 text-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#5865F2]/20"
                    >
                        <svg className="size-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.031.07.039.084.029a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                        </svg>
                        Sign in with Discord
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-2 relative z-10">
                    By continuing, you agree to our <a href="/terms" className="hover:text-primary underline transition-colors">Terms</a> and <a href="/privacy" className="hover:text-primary underline transition-colors">Privacy Policy</a>.
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <Suspense fallback={
                <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
            }>
                <LoginContent />
            </Suspense>
        </div>
    )
}
