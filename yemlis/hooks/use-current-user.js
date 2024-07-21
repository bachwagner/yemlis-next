import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession()
    console.log("useCurrentUser useSession")
    console.log(session)
    // return session.data?.user
    return {
        user: session.data?.user,
        status: session.status,
        update:session.update
    }
}