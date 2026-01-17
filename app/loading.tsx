"use client";

import React from "react";
import { Particles } from "@/components/ui/particles";

export default function Loading() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <Particles quantity={200} className="h-full w-full" color="#ffffff" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                    {/* Main Spinner */}
                    <div className="size-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />

                    {/* Outer glow ring */}
                    <div className="absolute inset-0 size-20 rounded-full border border-primary/10 animate-pulse scale-150" />

                    {/* Logo center piece */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/cameleon.png" alt="Loading" className="size-8 object-contain animate-pulse" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 className="font-product text-2xl font-bold tracking-tight text-white animate-pulse">
                        Cameleon
                    </h2>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="size-1.5 rounded-full bg-primary/40 animate-bounce"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
