import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { Timeline } from "@/components/ui/timeline"

export default function ChangelogPage() {
    const data = [
        {
            title: "v1.1.0",
            content: (
                <div className="bg-background/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-2xl font-bold mb-4 font-product">The Expansion Update</h3>
                    <p className="text-muted-foreground mb-4">January 10, 2026</p>
                    <ul className="space-y-3 truncate">
                        {[
                            "Added a comprehensive 'About' page describing our mission",
                            "Integrated universal footer across all pages",
                            "New 'Changelog' portal with Aceternity Timeline",
                            "UI/UX refinements to the navigation system",
                            "Launched 'Device Inspector' diagnostic tool"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            title: "v1.0.0",
            content: (
                <div className="bg-background/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-2xl font-bold mb-4 font-product">Initial Launch</h3>
                    <p className="text-muted-foreground mb-4">January 5, 2026</p>
                    <ul className="space-y-3">
                        {[
                            "Launched main tools portal with PDF and Video utilities",
                            "Integrated Discord authentication for secure access",
                            "Implemented tool request system for community feedback",
                            "High-performance particle background and glassmorphic UI"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-foreground/80 leading-relaxed">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 pt-10">
                <Timeline data={data} />
            </div>

            <div className="relative z-10 container mx-auto px-4 pb-24 max-w-3xl text-center">
                <div className="mt-12 p-8 rounded-3xl border border-dashed border-border/60">
                    <p className="text-muted-foreground italic font-product">
                        More exciting features are currently in development. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    )
}
