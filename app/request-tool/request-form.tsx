"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, AlertCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Session } from "next-auth"
import { signIn } from "next-auth/react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/components/mono-alerts"

const formSchema = z.object({
    toolName: z.string().min(2, "Name must be at least 2 characters"),
    toolDescription: z.string().min(10, "Description must be at least 10 characters"),
    toolUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export function RequestToolForm({ session }: { session: Session | null }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        setErrorMessage(null)
        try {
            const res = await fetch("/api/webhooks/request-tool", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const errorText = await res.text()

                // Check if it's a server membership error
                if (res.status === 403) {
                    setErrorMessage(errorText || "You must be a member of our Discord server to submit requests.")
                } else {
                    setErrorMessage("Failed to submit request. Please try again.")
                }
                return
            }

            setIsSuccess(true)
            reset()
        } catch (e) {
            console.error(e)
            setErrorMessage("Something went wrong. Please check your connection and try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-background/50 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
                <h2 className="text-2xl font-bold">Login Required</h2>
                <p className="text-muted-foreground">Please sign in with Discord to continue.</p>
                <Button
                    onClick={() => signIn("discord")}
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                >
                    Login with Discord
                </Button>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-background/50 backdrop-blur-md rounded-xl border border-white/10 shadow-xl">
                <div className="text-green-500 text-5xl">✓</div>
                <h2 className="text-2xl font-bold">Request Sent!</h2>
                <p className="text-muted-foreground">Thank you for your suggestion. We have received your request on our Discord server.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl max-w-lg w-full mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Request a Tool</h1>
                <p className="text-muted-foreground text-sm">Tell us what tool you need, and we'll look into adding it.</p>
            </div>

            {errorMessage && (
                <Alert variant="destructive" appearance="light" size="md">
                    <AlertIcon>
                        <AlertCircle />
                    </AlertIcon>
                    <AlertContent>
                        <AlertTitle>Unable to Submit Request</AlertTitle>
                        <AlertDescription>
                            <p>{errorMessage}</p>
                            {errorMessage.includes("Discord server") && (
                                <div className="mt-3">
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                        onClick={() => window.open("https://discord.gg/VgruDnmeBm", "_blank")}
                                    >
                                        Join Our Discord Server
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </AlertDescription>
                    </AlertContent>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="toolName">Tool Name</Label>
                <Input
                    id="toolName"
                    placeholder="e.g. JSON Formatter"
                    {...register("toolName")}
                />
                {errors.toolName && <p className="text-red-500 text-xs">{errors.toolName.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="toolUrl">Reference URL (Optional)</Label>
                <Input
                    id="toolUrl"
                    placeholder="https://example.com/similar-tool"
                    {...register("toolUrl")}
                />
                {errors.toolUrl && <p className="text-red-500 text-xs">{errors.toolUrl.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="toolDescription">Description / Use Case</Label>
                <Textarea
                    id="toolDescription"
                    placeholder="Explain what this tool should do..."
                    className="resize-none"
                    rows={4}
                    {...register("toolDescription")}
                />
                {errors.toolDescription && <p className="text-red-500 text-xs">{errors.toolDescription.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Submit Request
            </Button>
        </form>
    )
}
