"use client";

import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { toolsData, ToolItem } from "@/lib/tools-data";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function ToolsPage() {
    const categories = ['PDF Tools', 'Video Tools', 'Audio Tools', 'Converters', 'System Tools'] as const;

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <Header />
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4">
                {/* Brand Label */}
                <Link href="/" className="flex items-center gap-3 mb-16 animate-fade-in-up hover:opacity-80 transition-opacity cursor-pointer">
                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-16" />
                    <span className="font-product text-5xl text-foreground">
                        <span className="font-bold text-primary">Spunix</span> <span className="font-normal">Cameleon</span>
                    </span>
                </Link>

                {/* Tools Grid */}
                <div className="w-full max-w-7xl animate-fade-in-up delay-200">
                    {categories.map((category) => {
                        const categoryTools = toolsData.filter((t) => t.category === category);
                        if (categoryTools.length === 0) return null;

                        return (
                            <div key={category} className="mb-16 bg-background/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl">
                                <h2 className="font-product text-2xl font-bold mb-8 text-left border-b border-white/10 pb-2">
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

const tagDescriptions: Record<string, string> = {
    "Experimental": "This tool is in early development and may be unstable.",
    "Heavy": "Requires significant CPU/RAM. Best on Desktop.",
    "Light": "Fast and low resource usage. Works great on mobile.",
    "App Only": "This tool requires the Spunix Desktop App to function.",
    "New": "Recently added to the Spunix suite.",
    "Direct": "Runs directly in your browser with no server-side processing.",
    "Limited": "Functionality might be restricted depending on browser permissions.",
    "Online": "Data is processed on our secure servers."
};

function ToolCard({ tool }: { tool: ToolItem }) {
    const Icon = tool.icon;
    return (
        <Link href={`/tools/${tool.id}`} className="group relative flex flex-col items-start p-4 rounded-xl hover:bg-secondary/40 transition-colors border border-transparent hover:border-white/5 overflow-hidden">
            <div className="mb-3 p-3 bg-secondary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Icon className="size-6 text-foreground" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h3 className="font-product font-medium text-sm text-foreground/90 group-hover:text-primary transition-colors">
                    {tool.title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4 uppercase font-bold bg-red-500/80 hover:bg-red-500 cursor-help">
                                Experimental
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-destructive text-white border-none text-[10px]">
                            {tagDescriptions["Experimental"]}
                        </TooltipContent>
                    </Tooltip>

                    {tool.tags && tool.tags.map((tag) => (
                        <Tooltip key={tag}>
                            <TooltipTrigger asChild>
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20 cursor-help">
                                    {tag}
                                </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-[10px] bg-secondary text-secondary-foreground border-white/10">
                                {tagDescriptions[tag] || "Special tool feature."}
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </Link>
    );
}
