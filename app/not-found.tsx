"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 4000); // Redirect after 4 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center w-full max-w-5xl px-4">
                {/* Brand Label */}
                <div className="flex items-center gap-2 mb-8 animate-fade-in-up">
                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-8" />
                    <span className="font-product text-2xl text-foreground">
                        <span className="font-bold">Crucible</span> <span className="font-normal">Cameleon</span>
                    </span>
                </div>

                {/* 404 Headlines */}
                <h1 className="font-product text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight mb-4 text-foreground animate-fade-in-up delay-100">
                    404 - Lost in space?
                </h1>
                <p className="font-product text-2xl sm:text-4xl md:text-5xl text-muted-foreground mb-12 animate-fade-in-up delay-200">
                    Redirecting you back to base...
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-4 animate-fade-in-up delay-300">
                    <Button
                        size="lg"
                        className="rounded-full h-12 px-8 text-lg"
                        onClick={() => router.push("/")}
                    >
                        Return Home Now
                    </Button>
                </div>
            </div>
        </div>
    );
}
