import { getVerificationTokenByEmail } from "@/app/lib/data/verificationToken"
import { v4 as uuidv4 } from "uuid"
import connectDB from "./mongodb"
import VerificationToken from "@/models/verificationToken"

export const generateVerificationToken = async (email) => {
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const currentDate = new Date()
    console.log("expires")
    console.log(expires)
    console.log("current date")
    console.log(currentDate)
    await connectDB()

    const newToken = await VerificationToken.findOneAndUpdate({
        email
    }, {
        email,
        token,
        expires,
    }, {
        new: true,
        upsert: true
    })
    return newToken

}
