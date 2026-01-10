import { auth, signOut } from "@/auth"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
    const session = await auth()

    if (!session) {
        redirect("/login?callbackUrl=/settings")
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-5xl">
                <div className="mb-12">
                    <h1 className="font-product text-4xl font-bold tracking-tight mb-2 text-foreground">
                        Settings
                    </h1>
                    <p className="font-product text-muted-foreground">
                        Configure your experience and manage your account.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
                    {/* Sidebar Nav (Desktop) */}
                    <aside className="hidden lg:flex flex-col gap-2">
                        <nav className="space-y-1">
                            {["General", "Appearance", "Account", "Security", "Notifications"].map((item) => (
                                <button
                                    key={item}
                                    className={`w-full text-left px-4 py-2 rounded-xl transition-all font-medium ${item === "General"
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="space-y-8">
                        {/* Account Section */}
                        <section className="bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <div>
                                    <h2 className="text-2xl font-bold font-product">Account Presence</h2>
                                    <p className="text-muted-foreground text-sm">Manage your connected digital identities.</p>
                                </div>
                                <img
                                    src={session.user?.image || "/cameleon.png"}
                                    alt="Profile"
                                    className="size-12 rounded-full border border-white/10"
                                />
                            </div>

                            <div className="grid gap-4">
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
                                            <p className="text-xs text-muted-foreground">{(session.user as any).discordUsername}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                                        Unlink
                                    </Button>
                                </div>

                                {/* Google */}
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50 grayscale">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-red-500/10 p-2 rounded-lg">
                                            <svg className="size-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.896 4.136-1.248 1.248-3.224 2.536-6.424 2.536-5.176 0-9.272-4.176-9.272-9.352s4.096-9.352 9.272-9.352c2.792 0 4.88 1.104 6.384 2.52l2.32-2.32c-1.976-1.888-4.608-3.32-8.704-3.32-7.856 0-14.288 6.432-14.288 14.288s6.432 14.288 14.288 14.288c4.24 0 7.424-1.4 9.936-4.04 2.592-2.592 3.392-6.232 3.392-9.104 0-.872-.08-1.696-.216-2.504h-13.112z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-muted-foreground whitespace-nowrap">Google Account</p>
                                            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/50">Coming Soon</p>
                                        </div>
                                    </div>
                                    <Button disabled variant="outline" size="sm" className="rounded-lg">
                                        Link
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* General Preferences */}
                        <section className="bg-background/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
                            <h2 className="text-xl font-bold font-product">General</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Automatic Updates</Label>
                                        <p className="text-sm text-muted-foreground">Keep tools updated in the background.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Developer Mode</Label>
                                        <p className="text-sm text-muted-foreground">Access beta tools and diagnostics.</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Cloud Sync</Label>
                                        <p className="text-sm text-muted-foreground">Sync tool preferences across devices.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section className="bg-red-500/5 backdrop-blur-md p-8 rounded-3xl border border-red-500/10 shadow-xl">
                            <h2 className="text-xl font-bold font-product text-red-500 mb-6">Danger Zone</h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-red-500">Sign Out</p>
                                    <p className="text-muted-foreground text-sm">You will be logged out of your current session.</p>
                                </div>
                                <form
                                    action={async () => {
                                        "use server"
                                        await signOut({ redirectTo: "/" })
                                    }}
                                >
                                    <Button variant="destructive" className="rounded-xl px-8" type="submit">
                                        Log Out
                                    </Button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
