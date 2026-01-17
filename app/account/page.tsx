import { auth } from "@/auth"
export const runtime = "edge"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/logout-button"
import ContributorsTable from "@/components/ruixen-contributors-table"
import { User, ShieldCheck, Mail, Database } from "lucide-react"

export default async function AccountPage() {
    const session = await auth() as any

    if (!session) {
        redirect("/login?callbackUrl=/account")
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#ffffff" />
            </div>

            <main className="relative z-10 container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary/10 rounded-2xl">
                                    <User className="size-6 text-primary" />
                                </div>
                                <h1 className="font-product text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    Account
                                </h1>
                            </div>
                            <p className="font-product text-lg text-muted-foreground ml-1">
                                Manage your profile, connections, and tools.
                            </p>
                        </div>
                        <LogoutButton />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1 space-y-8 animate-fade-in-up delay-100">
                            <section className="bg-background/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ShieldCheck className="size-32 text-primary" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                    <div className="relative">
                                        <img
                                            src={session.user?.image || "/cameleon.png"}
                                            alt="Profile"
                                            className="size-32 rounded-full border-4 border-primary/20 p-1 shadow-2xl"
                                        />
                                        <div className="absolute bottom-1 right-1 size-8 bg-[#5865F2] rounded-full border-4 border-background flex items-center justify-center">
                                            <svg className="size-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.031.07.039.084.029a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold font-product text-white tracking-tight">
                                            {session.user?.name}
                                        </h2>
                                        <p className="text-primary font-medium tracking-wide flex items-center justify-center gap-1.5 mt-1">
                                            @{session.user?.discordUsername}
                                        </p>
                                    </div>
                                    <div className="w-full pt-6 space-y-4 border-t border-white/10">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <Mail className="size-4 text-primary" />
                                            {session.user?.email || "No email linked"}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white/5 p-3 rounded-2xl border border-white/5">
                                            <Database className="size-4 text-primary" />
                                            Active Session
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-primary/5 backdrop-blur-md p-6 rounded-[2rem] border border-primary/20">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Connected</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Your Discord account is synchronized. Metadata like tool usage will automatically update.
                                </p>
                            </section>
                        </div>

                        {/* Main Tools Content */}
                        <div className="lg:col-span-2 space-y-8 animate-fade-in-up delay-200">
                            <ContributorsTable />

                            <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 space-y-4">
                                <h3 className="text-lg font-bold text-white font-product">Account Security</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Cameleon uses Discord OAuth2 for secure, passwordless authentication.
                                    We never store your Discord password or private messages.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
