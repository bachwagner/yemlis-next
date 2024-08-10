"use server"
import { getUserByEmail } from "@/app/lib/data/user"
import { newPassword as passwords } from "@/app/lib/validationSchemas"
import { getPasswordResetTokenByToken } from "@/app/lib/data/passwordResetToken"
import bcryptjs from "bcryptjs"
import User from '@/models/user/user'
export const newPassword = async (values, token) => {
    if (!token) {
        return { error: true, message: "Token Eksik" }
    }
    const validatedFields = await passwords.validateAsync(values)
    if (!validatedFields) {
        return { error: true, message: "Geçersiz Değerler" }
    }
    const { password } = validatedFields

    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) return { error: true, message: "Geçersiz Token" }
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) return { error: true, message: "Şifre Değiştirme Emaili Süre Aşımına Uğradı" }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) return { error: true, message: "Email Kayıtlı Değil" }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const updateUser = await User.findByIdAndUpdate(existingUser._id,{password:hashedPassword})
    if(!updateUser) return{ error: true, message: "Şifre Değişimi İşleminde Hata Meydana Geldi" }
    return{success:true, message: "Şifre Başarıyla Değiştirildi, Giriş Yapabilirsiniz"}

}  