"use client";

import { motion } from "framer-motion";
import { Infinity } from "lucide-react";

export function InfinitySpinner({ className = "size-8", label }: { className?: string, label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear"
                }}
                className={`relative flex items-center justify-center ${className}`}
            >
                <Infinity className="size-full text-primary filter drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
            </motion.div>
            {label && (
                <span className="text-sm font-medium animate-pulse text-primary/80 tracking-wide">
                    {label}
                </span>
            )}
        </div>
    );
}
