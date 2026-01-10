import { handlers } from "@/auth" // Referring to root auth.ts

export const runtime = 'edge'

export const { GET, POST } = handlers
