import connectDB from "@/app/lib/mongodb";
import User from "@/models/user/user";
export const getUserByEmail = async (email) => {
    try {
        await connectDB()
        const user = User.findOne({ email: email })

        return user
    } catch (error) {
        return null
    }
}

export const getUserById = async (id) => {
    try {
        await connectDB()
        const user = User.findById(id)

        return user
    } catch (error) {
        return null
    }
}