import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-4xl">
                {/* Hero section inside about */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-20 mx-auto mb-8 shadow-2xl rounded-2xl" />
                    <h1 className="font-product text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-foreground">
                        About <span className="text-primary">Cameleon</span>
                    </h1>
                    <p className="font-product text-xl text-muted-foreground">
                        All tools in one place.
                    </p>
                </div>

                <div className="space-y-12 animate-fade-in-up delay-200">
                    <section className="bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl">
                        <h2 className="text-3xl font-semibold mb-4 font-product">My Vision</h2>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                            Cameleon was born from a simple idea: that powerful digital tools should be accessible, unified, and easy to use.
                            I believe that you shouldn't have to navigate dozens of different websites to perform everyday tasks like PDF editing,
                            video converting, or data processing.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl">
                            <h2 className="text-2xl font-semibold mb-4 font-product">What it Offers</h2>
                            <ul className="space-y-3 text-foreground/80">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">✓</span> PDF & Document Utilities
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">✓</span> Video & Audio Processing
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">✓</span> Seamless Format Converters
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold">✓</span> Developer & Productivity Tools
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary font-bold italic">✓</span> And more is coming!
                                </li>
                            </ul>
                        </section>

                        <section className="bg-background/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl">
                            <h2 className="text-2xl font-semibold mb-4 font-product">Community Driven</h2>
                            <p className="text-foreground/80 leading-relaxed">
                                I am building this toolset based on user feedback. Through our
                                <Link href="/request-tool" className="text-primary hover:underline ml-1">tool request system</Link>,
                                you can directly influence the future of the platform. I build what the community needs.
                            </p>
                        </section>
                    </div>

                    <section className="bg-primary/5 backdrop-blur-md p-10 rounded-3xl border border-primary/20 text-center">
                        <h2 className="text-3xl font-semibold mb-6 font-product">Ready to get started?</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have streamlined their workflow with Cameleon.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center font-product">
                            <Link
                                href="/tools"
                                className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-medium"
                            >
                                Browse All Tools
                            </Link>
                            <Link
                                href="/download"
                                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-all font-medium"
                            >
                                Download App
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
