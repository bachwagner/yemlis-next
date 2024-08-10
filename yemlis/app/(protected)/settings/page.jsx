"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useSession, signOut, getSession } from "next-auth/react"
import { logout } from "@/app/lib/actions/logout"
import { settings } from "@/app/lib/actions/settings"
import UserBasicSettings from "@/components/user/userBasicSettings/UserBasicSettings"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteUserAccount from "@/components/user/deleteUser/DeleteUserAccount"
import Loading from "./loading"

const SettingsPage = () => {
    const { user } = useCurrentUser()
    const [userData, setUserData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        fetch(`/api/user?id=${user._id}`, { next: { revalidate: 5 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("dataxx")
                console.log(data)
                setUserData({ ...user, ...data })
                setIsLoading(false)
            }).catch((err) => {
                console.log("fetch catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, [user])
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
            <Typography variant="body1" fontSize={20}>{userData?.name}</Typography>
            {isLoading ? <CircularProgress sx={{ mb: 1 }} color="primary" /> : <UserBasicSettings user={userData} />}
        </Box >
    )
}

export default SettingsPage