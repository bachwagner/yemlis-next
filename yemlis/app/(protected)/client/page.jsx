"use client"
import { Box } from "@mui/material"
import { UserInfo } from "@/components/userInfo"
import { useCurrentUser } from "@/hooks/use-current-user"
const ClientPage = () => {
    const { user, status } = useCurrentUser()
    console.log("client user")
    console.log(user)
    return (
        <Box display="flex" alignItems="center" justifyContent="center">

            {user && <UserInfo
                user={user}
                label="Client Component 💻" />}
                {!user && status!=="loading" && "Giriş Yapın"}
        </Box>)
}

export default ClientPage