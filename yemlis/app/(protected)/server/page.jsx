import { auth } from "@/auth"
import { currentUser } from "@/app/lib/auth"
import { Box } from "@mui/material"
import { UserInfo } from "@/components/userInfo"
import { getAllUserInfo } from "@/app/lib/data/getAllUserInfo"
const ServerPage = async (_id) => {
    const user = await currentUser()
    const allUserData = await getAllUserInfo(user._id)
    console.log("All User Client Data")
    console.log(allUserData)
    user.isMarkedToDelete=allUserData.isMarkedToDelete
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
               <UserInfo
                user={user}
                label="Server Component 🖥" /> 
        </Box>
    )
}

export default ServerPage