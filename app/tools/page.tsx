"use client";

import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { toolsData, ToolItem } from "@/lib/tools-data";
import { LucideIcon } from "lucide-react";
import Link from "next/link";


export default function ToolsPage() {
    const categories = ['PDF Tools', 'Video Tools', 'Audio Tools', 'Converters'] as const;

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <Header />
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4">
                {/* Brand Label */}
                <Link href="/" className="flex items-center gap-3 mb-16 animate-fade-in-up hover:opacity-80 transition-opacity cursor-pointer">
                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-12" />
                    <span className="font-product text-4xl text-foreground">
                        <span className="font-bold">Crucible</span> <span className="font-normal">Cameleon</span>
                    </span>
                </Link>

                {/* Tools Grid */}
                <div className="w-full max-w-7xl animate-fade-in-up delay-200">
                    {categories.map((category) => {
                        const categoryTools = toolsData.filter((t) => t.category === category);
                        if (categoryTools.length === 0) return null;

                        return (
                            <div key={category} className="mb-16">
                                <h2 className="font-product text-2xl font-bold mb-8 text-left border-b border-border/40 pb-2">
                                    {category}
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {categoryTools.map((tool) => (
                                        <ToolCard key={tool.id} tool={tool} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

function ToolCard({ tool }: { tool: ToolItem }) {
    const Icon = tool.icon;
    return (
        <Link href={`#`} className="group flex flex-col items-start p-4 rounded-xl hover:bg-secondary/40 transition-colors border border-transparent hover:border-white/5">
            <div className="mb-3 p-3 bg-secondary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon className="size-6 text-foreground" />
            </div>
            <h3 className="font-product font-medium text-sm text-foreground/90 group-hover:text-primary transition-colors">
                {tool.title}
            </h3>
        </Link>
    );
}
