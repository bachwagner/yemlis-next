import VerificationToken from "@/models/verificationToken"
import connectDB from "@/app/lib/mongodb"
export const getVerificationTokenByToken = async (token) => {
    try {
        await connectDB()
       
        const verificationToken = await VerificationToken.findOne({
            token
        })
        return verificationToken
    } catch(err) {
        console.log("db token error")
        return null
    }

}
export const getVerificationTokenByEmail = async (email) => {
    try {
        await connectDB()
        const verificationToken = await VerificationToken.findOne({
            email
        })
        return verificationToken
    } catch {
        return null
    }

}