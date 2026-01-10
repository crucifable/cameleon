import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"

export default function ChangelogPage() {
    const changes = [
        {
            version: "v1.1.0",
            date: "January 10, 2026",
            title: "The Expansion Update",
            improvements: [
                "Added a comprehensive 'About' page describing our mission",
                "Integrated universal footer across all pages",
                "New 'Changelog' portal to track development progress",
                "UI/UX refinements to the navigation system"
            ]
        },
        {
            version: "v1.0.0",
            date: "January 5, 2026",
            title: "Initial Launch",
            improvements: [
                "Launched main tools portal with PDF and Video utilities",
                "Integrated Discord authentication for secure access",
                "Implemented tool request system for community feedback",
                "High-performance particle background and glassmorphic UI"
            ]
        }
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-16">
                    <h1 className="font-product text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-foreground">
                        Changelog
                    </h1>
                    <p className="font-product text-xl text-muted-foreground">
                        Get to know Cameleon's evolution.
                    </p>
                </div>

                <div className="space-y-12">
                    {changes.map((change, index) => (
                        <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-border">
                            <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-primary" />
                            <div className="bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl transition-all hover:border-primary/30">
                                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                                    <span className="text-primary font-mono font-bold text-lg">{change.version}</span>
                                    <span className="text-muted-foreground text-sm">{change.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-6 font-product">{change.title}</h2>
                                <ul className="space-y-3">
                                    {change.improvements.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 p-12 rounded-3xl border border-dashed border-border/60 text-center">
                    <p className="text-muted-foreground italic font-product">
                        More exciting features are currently in development. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    )
}
