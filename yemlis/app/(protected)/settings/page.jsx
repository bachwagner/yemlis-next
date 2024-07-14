"use client"
import { Button } from "@mui/material"
import { useSession, signOut, getSession } from "next-auth/react"
import { logout } from "@/app/lib/actions/logout"

const SettingsPage = () => {
    // const session = await auth()   // for server comp
    const { data: session, status } = useSession({ required: true })

    console.log("status")
    console.log(status)
    console.log(session)
    console.log("session")
    console.log(session)

    const onClick = () => {
        console.log("signOut")

        signOut()
        // logout()
    }
    return (
        <div>
            {status === "loading" ? <>Loading...</> : <>
                {/*{JSON.stringify(session)} */}
                user: {session?.user?.email}
                <Button type="submit" onClick={onClick}>
                    Çıkış
                </Button>
            </>}

        </div>
    )
}

export default SettingsPage