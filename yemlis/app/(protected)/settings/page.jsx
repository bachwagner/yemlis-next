"use client"
import { startTransition, useTransition } from "react"
import { Box, Button, Typography } from "@mui/material"
import { useSession, signOut, getSession } from "next-auth/react"
import { logout } from "@/app/lib/actions/logout"
import { settings } from "@/app/lib/actions/settings"
import UserSettings from "@/components/user/userBasicSettings/UserSettings"
import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
    const { user } = useCurrentUser()

    console.log("user")
    console.log(user)
    /*  const [isPending, startTransition] = useTransition()
     const { update } = useSession()
     const changeNameOnClick = () => {
         startTransition(() => {
             settings({ name: "Mustafa Turgut" })
                 .then(() => {
                     update()
                 })
         })
     } */
    // const session = await auth()   // for server comp
    /*     const { data: session, status } = useSession({ required: true })
     */

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>⚙ Ayarlar</Typography>
            <Typography variant="body1" fontSize={20}>{user?.name}</Typography>
            <UserSettings user={user} />
        </Box >
    )
}

export default SettingsPage