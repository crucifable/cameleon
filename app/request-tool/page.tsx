import { auth } from "@/auth"
import { RequestToolForm } from "./request-form"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"


export const runtime = 'edge'

export default async function RequestToolPage() {
    const session = await auth()

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 w-full px-4 py-32">
                <div className="flex justify-center items-start min-h-[60vh]">
                    <RequestToolForm session={session} />
                </div>
            </div>

        </div>
    )
}
