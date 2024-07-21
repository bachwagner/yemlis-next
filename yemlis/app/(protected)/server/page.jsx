import { auth } from "@/auth"
import { currentUser } from "@/app/lib/auth"
import { Box } from "@mui/material"
import {UserInfo} from "@/components/userInfo"
const ServerPage = async () => {
    const user = await currentUser()

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <UserInfo
            user={user}
            label="Server Component 🖥"/>
        </Box>)
}

export default ServerPage