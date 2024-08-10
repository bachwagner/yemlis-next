
import PasswordResetToken from "@/models/user/passwordResetToken"
import connectDB from "@/app/lib/mongodb"

export const getPasswordResetTokenByToken = async (token) => {
    try {
        await connectDB()

        const passwordResetToken = await PasswordResetToken.findOne({
            token
        })
        return passwordResetToken
    } catch (err) {
        console.log("db token error")
        return null
    }
 
} 
export const getPasswordResetTokenByEmail = async (email) => {
    try {
        await connectDB()
        const passwordResetToken = await PasswordResetToken.findOne({
            email
        })
        return passwordResetToken
    } catch {
        return null
    }

}