import connectDB from "@/app/lib/mongodb"
import User from "@/models/user"
import { auth } from "@/auth"

export const getAllUserInfo = async (_id) => {
    try {
        const session = await auth()
        if (!session) console.log("not authh")
        if (!session) return { error: true, message: "Unauthorized" }
        await connectDB()
        console.log("searcing for user")
        const user = await User.findById(_id)
        if (!user) return { error: true, message: "User Cannot be Found" }
        console.log("User Data Found") 
        console.log(user)
        return user
    } catch (error) {
        console.log("ss error")
        console.log(error)
        return null
    }
}
