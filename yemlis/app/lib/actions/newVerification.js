"use server"

import { getUserByEmail } from '@/app/lib/data/user'
import { getVerificationTokenByToken } from '@/app/lib/data/verificationToken'
import User from '@/models/user'
import VerificationToken from '@/models/verificationToken'
import connectDB from "@/app/lib/mongodb";

export const newVerification = async (token) => {
    
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: true, message: "Token Bulunamadı" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return { error: true, message: "Doğrulama Linki Süresi Doldu" }
    }
    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: true, message: "Email Bulunamadı" }
    }
    await connectDB()

    const updateUser = await User.findByIdAndUpdate(
        existingUser._id, {
        emailVerified: new Date(),
        email: existingToken.email
    })

    console.log("updateUser")
    console.log(updateUser)

    const deleteToken = await VerificationToken.deleteOne({
        _id: existingToken._id
    })
    console.log("deleteToken")
    console.log(updateUser)
    return { error: false, message: 'Email Doğrulandı' }
}

