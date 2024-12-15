'use server'

import { AuthOptions } from "@/auth/authOptions";
import { getServerSession } from "next-auth"

// current session
export const currentSession = async () => {
    // const { data: session, status } = useSession()
    const session = await getServerSession(AuthOptions);
    if (!session) return false
    return session
}