"use server"
import { getUserByEmail } from "../data/user"
import { justEmail } from "../validationSchemas"
import { sendPasswordResetEmail } from "../mail"
import { generatePasswordResetToken } from "../tokens"

export const reset = async (values) => {

    const { email } = values

    const validatedResetPasswordParams = await justEmail.validateAsync(
        { email })
    if (!validatedResetPasswordParams) return { error: true, message: "validationError" }

    const existingUser = await getUserByEmail(validatedResetPasswordParams.email)
    if (!existingUser) return { error: true, message: "Email Bulunamadı" }

    const newPasswordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail( validatedResetPasswordParams.email, newPasswordResetToken.token)
    return { success: true, message: "Şifre Sıfırlama Emaili Gönderildi" }

}
