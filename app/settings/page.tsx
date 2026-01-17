import { auth } from "@/auth"
export const runtime = "edge"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { syncDiscordMetadata } from "@/lib/discord-metadata"
import { LogoutButton } from "@/components/logout-button"

export default async function SettingsPage() {
    const session = await auth() as any

    if (!session) {
        redirect("/login?callbackUrl=/settings")
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-3xl">
                <div className="mb-12">
                    <h1 className="font-product text-4xl font-bold tracking-tight mb-2 text-foreground">
                        Account Settings
                    </h1>
                    <p className="font-product text-muted-foreground">
                        Manage your profile and connected accounts.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Account Section */}
                    <section className="bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={session.user?.image || "/cameleon.png"}
                                    alt="Profile"
                                    className="size-16 rounded-full border border-white/10"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold font-product">{session.user?.name}</h2>
                                    <p className="text-muted-foreground text-sm">{(session.user as any).discordUsername}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 pt-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">Connected Accounts</h3>

                            {/* Discord */}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="bg-[#5865F2]/10 p-2 rounded-lg">
                                        <svg className="size-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.031.07.039.084.029a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium">Discord</p>
                                        <p className="text-xs text-muted-foreground">Connected</p>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full uppercase tracking-wider">Active</div>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="bg-red-500/5 backdrop-blur-md p-8 rounded-3xl border border-red-500/10 shadow-xl">
                        <h2 className="text-xl font-bold font-product text-red-500 mb-6">Security</h2>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-bold text-foreground">Sign Out</p>
                                <p className="text-muted-foreground text-sm">You will be logged out of your current session.</p>
                            </div>
                            <LogoutButton />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
