"use server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
    email,
    token
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm Your Email",
        html:`<p>Emaili doğrulamak için <a href="${confirmLink}">Buraya</a> tıklayın</p>`
        
    })
}
export const sendPasswordResetEmail = async (
    email,
    token
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Yemlis Şifre Sıfırlama",
        html:`<p>Şifre Sıfırlamak İçin <a href="${resetLink}">Buraya</a> tıklayın</p>`
        
    })
}