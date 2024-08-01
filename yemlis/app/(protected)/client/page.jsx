"use client"
import { Box } from "@mui/material"
import { UserInfo } from "@/components/userInfo"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Suspense } from "react"
import Loading from "./loading"
const ClientPage = () => {
    const { user, status } = useCurrentUser()
    console.log("client user")
    console.log(user)
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
 
            {user &&
                <Suspense fallback={<Loading/>}>
                    <UserInfo
                        user={user}
                        label="Client Component 💻" /> </Suspense>}
            {!user && status !== "loading" && "Giriş Yapın"}

        </Box>)
}

export default ClientPage