"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Loader2, LogOut } from "lucide-react"

export function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = async () => {
        setIsLoading(true)
        await signOut({ callbackUrl: "/" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="rounded-xl px-8 gap-2">
                    <LogOut className="size-4" />
                    Log Out
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#0a0a0a]/90 backdrop-blur-2xl border-white/10 shadow-2xl">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto bg-red-500/10 p-3 rounded-2xl w-fit">
                        <LogOut className="size-6 text-red-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold font-product text-center">Confirm Sign Out</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-center">
                        Are you sure you want to log out of your Spunix account? You'll need to sign back in with Discord to access your profile.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
                    <DialogClose asChild>
                        <Button variant="ghost" className="flex-1 rounded-xl border border-white/5 hover:bg-white/5 order-2 sm:order-1">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="flex-1 rounded-xl px-8 font-bold order-1 sm:order-2"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Exit Session
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
