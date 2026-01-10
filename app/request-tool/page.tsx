import { auth } from "@/auth"
import { RequestToolForm } from "./request-form"
import { Header } from "@/components/header-with-search"
import { Particles } from "@/components/ui/particles"

export default async function RequestToolPage() {
    const session = await auth()

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Header />
            {/* Full-screen particle background */}
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4">
                <RequestToolForm session={session} />
            </div>
        </div>
    )
}
