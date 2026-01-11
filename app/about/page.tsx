import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { Zap, ShieldCheck, DollarSign, Layers, Heart, Sparkles, Box, Hammer, Rocket } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-5xl">
                {/* Hero Section */}
                <div className="text-center mb-20 animate-fade-in-up">
                    <h1 className="font-product text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                        Spunix Cameleon
                    </h1>
                    <p className="font-product text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        A multifunction brand and tool suite dedicated to making every day technology accessible, easy, and affordable.
                    </p>
                </div>

                <div className="space-y-12 animate-fade-in-up delay-100">

                    {/* Why Spunix? Section (The Sputnik Inspiration) */}
                    <div className="bg-background/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute -right-16 -bottom-16 opacity-5">
                            <Rocket className="size-64 rotate-45" />
                        </div>
                        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
                            <div className="flex flex-col items-center justify-center bg-primary/10 p-10 rounded-[2rem] border border-primary/20">
                                <Rocket className="size-24 text-primary mb-6 animate-bounce" />
                                <h3 className="font-product text-2xl font-bold">Origin</h3>
                            </div>
                            <div>
                                <h2 className="font-product text-3xl font-bold mb-6 flex items-center gap-3">
                                    Why "Spunix"?
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                                    The name <span className="text-foreground font-bold italic">Spunix</span> is a direct tribute to <span className="text-primary font-semibold">Sputnik</span>, the world's first satellite and the pioneer of the space race.
                                </p>
                                <p className="text-lg text-foreground/80 leading-relaxed">
                                    Just as Sputnik was a breakthrough that opened the doors to the cosmos for everyone, Spunix is my mission to break through the barriers of modern technology. It represents the spirit of exploration and speed, launching tools that are as revolutionary as a rocket, but as accessible as a single click.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* About Cameleon Section */}
                    <div className="bg-background/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <Hammer className="size-8 text-primary" />
                                </div>
                                <h2 className="font-product text-3xl font-bold mb-6">About Cameleon</h2>
                                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                                    Cameleon is a flagship tool suite. A versatile collection of online utilities designed to help you handle everyday digital tasks with zero friction. From simple tasks like PDF management to complex tasks that require a lot of processing power, Cameleon adapts to your needs just like its namesake.
                                </p>
                                <p className="text-lg text-foreground/80 leading-relaxed">
                                    I built Cameleon to be the only site you need when you're in a hurry to get things done. No forced subscriptions, no complicated menus. Just the tools you need, exactly when you need them.
                                </p>
                            </div>
                            <div className="order-1 md:order-2 bg-white/5 p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                                <img src="/cameleon.png" alt="Cameleon Logo" className="relative z-10 size-48 mx-auto group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* About Spunix Section */}
                    <div className="bg-background/40 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative">
                        {/* Decorative elements */}
                        <div className="absolute -right-20 -top-20 size-64 bg-primary/10 blur-[100px] pointer-events-none" />

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                    <Zap className="size-10 mb-4 text-yellow-400" />
                                    <h3 className="font-bold">Fast</h3>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                    <DollarSign className="size-10 mb-4 text-green-400" />
                                    <h3 className="font-bold">Cheap</h3>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                    <Heart className="size-10 mb-4 text-red-400" />
                                    <h3 className="font-bold">Easy</h3>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                                    <Layers className="size-10 mb-4 text-blue-400" />
                                    <h3 className="font-bold">Multifunction</h3>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-product text-3xl font-bold mb-6 flex items-center gap-3">
                                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-8" />
                                    Spunix Vision
                                </h2>
                                <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                                    Spunix is the driving force behind my vision. As a multifunction brand, Spunix is built on the belief that
                                    <span className="text-foreground font-semibold"> everything should be easy and cheap, in an easy way.</span>
                                </p>
                                <p className="text-lg text-foreground/80 leading-relaxed">
                                    I challenge the status quo by proving that premium quality doesn't have to come with a premium price tag.
                                    Spunix is committed to streamlining your digital life, making sure every interaction with my brand feels effortless.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Differentiators */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 shadow-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Layers className="size-5 text-primary" />
                                Multifunction
                            </h3>
                            <p className="text-muted-foreground">
                                Why visit dozen of sites? Spunix aggregates essentials in one ecosystem.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 shadow-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Zap className="size-5 text-primary" />
                                Everything Easy
                            </h3>
                            <p className="text-muted-foreground">
                                Intuitive design from the first click. No manuals, just results.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-white/10 shadow-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <DollarSign className="size-5 text-primary" />
                                Free & Affordable
                            </h3>
                            <p className="text-muted-foreground">
                                Utility isn't a luxury. I keep costs low so you can keep yours lower or maybe no need to pay at all!
                            </p>
                        </div>
                    </div>

                    <div className="text-center pt-12">
                        <p className="text-2xl font-medium mb-4 italic text-foreground/90 font-product">
                            "Everything should be easy and cheap, in an easy way."
                        </p>
                        <p className="text-muted-foreground font-product text-lg">
                            — The Spunix Developer
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
