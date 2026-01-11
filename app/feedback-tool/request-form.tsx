"use client"

import { useState, useEffect } from "react"
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
    type: z.string().min(1, "Please select a feedback type"),
    toolName: z.string().min(2, "Name must be at least 2 characters"),
    toolDescription: z.string().min(10, "Description must be at least 10 characters"),
    toolUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export function FeedbackForm({ session }: { session: Session | null }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null)

    const COOLDOWN_MS = 60 * 60 * 1000 // 1 hour cooldown

    useEffect(() => {
        const checkCooldown = () => {
            const lastSubmitted = localStorage.getItem("last_feedback_submission")
            if (lastSubmitted) {
                const elapsed = Date.now() - parseInt(lastSubmitted)
                if (elapsed < COOLDOWN_MS) {
                    setCooldownRemaining(COOLDOWN_MS - elapsed)
                } else {
                    setCooldownRemaining(null)
                }
            }
        }

        checkCooldown()
        const interval = setInterval(checkCooldown, 1000)
        return () => clearInterval(interval)
    }, [])

    const formatCooldown = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}m ${seconds}s`
    }

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
            const res = await fetch("/api/webhooks/feedback-tool", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const errorText = await res.text()

                setErrorMessage("Failed to submit feedback. Please try again.")
                return
            }

            setIsSuccess(true)
            localStorage.setItem("last_feedback_submission", Date.now().toString())
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
                <h2 className="text-2xl font-bold">Feedback Sent!</h2>
                <p className="text-muted-foreground">Thank you for your input. We've received your feedback on our Discord server and will look into it.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                    Submit Another
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-background/50 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-xl max-w-lg w-full mx-auto">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Feedback & Request</h1>
                <p className="text-muted-foreground text-sm">Found an issue with a tool, a missing feature, or have a new tool idea? Let us know!</p>
            </div>

            {errorMessage && (
                <Alert variant="destructive" appearance="light" size="md">
                    <AlertIcon>
                        <AlertCircle />
                    </AlertIcon>
                    <AlertContent>
                        <AlertTitle>Unable to Submit Feedback</AlertTitle>
                        <AlertDescription>
                            <p>{errorMessage}</p>
                        </AlertDescription>
                    </AlertContent>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="type">Feedback Type</Label>
                <select
                    id="type"
                    {...register("type")}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="" className="bg-background">Select a type...</option>
                    <option value="feature" className="bg-background">Missing Feature / Inaccuracy</option>
                    <option value="bug" className="bg-background">Bug Report</option>
                    <option value="request" className="bg-background">New Tool Request</option>
                    <option value="other" className="bg-background">Other</option>
                </select>
                {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="toolName">Subject / Tool Name</Label>
                <Input
                    id="toolName"
                    placeholder="e.g. Metadata Checker"
                    {...register("toolName")}
                />
                {errors.toolName && <p className="text-red-500 text-xs">{errors.toolName.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="toolUrl">Reference URL (Optional)</Label>
                <Input
                    id="toolUrl"
                    placeholder="https://example.com/source"
                    {...register("toolUrl")}
                />
                {errors.toolUrl && <p className="text-red-500 text-xs">{errors.toolUrl.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="toolDescription">Details</Label>
                <Textarea
                    id="toolDescription"
                    placeholder="Describe the missing feature, bug, or tool request in detail..."
                    className="resize-none"
                    rows={4}
                    {...register("toolDescription")}
                />
                {errors.toolDescription && <p className="text-red-500 text-xs">{errors.toolDescription.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting || !!cooldownRemaining}
                className="w-full"
            >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {cooldownRemaining
                    ? `Cooldown Active (${formatCooldown(cooldownRemaining)})`
                    : "Submit Feedback"
                }
            </Button>
        </form>
    )
}
