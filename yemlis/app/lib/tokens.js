"use server"
import { getVerificationTokenByEmail } from "@/app/lib/data/verificationToken"
import { v4 as uuidv4 } from "uuid"
import connectDB from "./mongodb"
import VerificationToken from "@/models/user/verificationToken"
import PasswordResetToken from "@/models/user/passwordResetToken"
import { getPasswordResetTokenByEmail } from "./data/passwordResetToken"

export const generateVerificationToken = async (email) => {
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

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

export const generatePasswordResetToken = async (email) => {
    const token = uuidv4()

    const expires = new Date(new Date().getTime() + 3600 * 1000)
    await connectDB()

    const newToken = await PasswordResetToken.findOneAndUpdate({
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
