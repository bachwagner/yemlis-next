"use server"

import { settings as settingsValidation } from "@/app/lib/validationSchemas"
import User from "@/models/user/user"
import { currentUser } from "../auth"
import { getUserById, getUserByEmail } from "@/app/lib/data/user"
import { generateVerificationToken } from "../tokens"
import { sendVerificationEmail } from "../mail"
import bcrypt from "bcryptjs"
export const settings = async (values) => {
    const validatedSettings = await settingsValidation.validateAsync(values)
    if (!validatedSettings) return { error: true, message: "Invalid Fields" }
    console.log("validatedSettings")
    console.log(validatedSettings)
    const user = await currentUser()
    if (!user) {
        return { error: "Unauthorized" }
    }
    const dbUser = await getUserById(user._id)
    if (!dbUser) return { error: true, message: "Unauthorized" }

    if (user.isOAuth) {
        values.email = undefined
        values.password = undefined
        values.newpassword = undefined
    }
    //CHANGE EMAIL
    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)

        if (existingUser && existingUser._id !== user._id) {
            return { error: true, message: "Email Zaten Kullanılıyor" }
        }
        const verificationToken = generateVerificationToken(
            values.email
        )
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken
        )

        return { success: true, message: "Doğrulama Emaili Gönderildi" }
    }
    //CHANGE PASSWORD

    if (values.password && values.newpassword && dbUser.password) {
        const passwordsMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        )
        console.log("passwordsMatch", passwordsMatch)
        if (!passwordsMatch) {
            return { error: true, message: "Hatalı Şifre" }
        }
        const hashedPassword = await bcrypt.hash(
            values.newpassword,
            10
        )
        values.password = hashedPassword
        values.newpassword = undefined
    }

    const updateUser = await User.findByIdAndUpdate(dbUser._id, { ...values })
    if(!updateUser) return { error: true, message: "Kayıt Hatası" }
    return { success: true, message: "Kaydedildi" }
}