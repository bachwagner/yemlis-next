'use server'
import { login, register } from '../validationSchemas'
import connectDB from '../mongodb'
import bcrypt from 'bcryptjs'
import User from '@/models/user'
import { getUserByEmail } from '@/app/lib/data/user'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes'
import { isRedirectError, permanentRedirect } from 'next/dist/client/components/redirect'
import { generateVerificationToken } from '../tokens'
import { sendVerificationEmail } from '../mail'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function authLogin(
  values,
  callbackUrl
) {
  const { email, password } = values
  console.log("callbackurl")
  console.log(callbackUrl)
  const validatedLoginParams = await login.validateAsync(
    { email, password })
  if (!validatedLoginParams) return { error: true, message: "validationError" }

  const existingUser = await getUserByEmail(validatedLoginParams.email)

  if (!existingUser || !existingUser.email || !existingUser.password) return { error: true, message: "Email Kaydı Bulunmuyor" }

  if (!existingUser.emailVerified) {
    /* PASSWORD CHECK FOR UNauth*/
    const passwordsMatch = await bcrypt.compare(
      password, existingUser.password
    )

    if (!passwordsMatch) return { error: "true", message: "Geçersiz Kimlik Bilgileri" }
    /* PASSWORD CHECK ENDS */
    const verificationToken = await generateVerificationToken(existingUser.email)

    console.log("sending verification email")
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: true, message: "Email Doğrulanmamış, Yeni Doğrulama Emaili Gönderildi." }

  }
  try {

    const signInLogin = await signIn("credentials", {
      email: validatedLoginParams.email,
      password: validatedLoginParams.password,
      // redirectTo: "/settings",/* callbackUrl || DEFAULT_LOGIN_REDIRECT_URL */
      redirect: false,

    })
    return { success: true, isRedirecting: true, callbackUrl}


  } catch (error) {
    console.log("login error type")
    console.log(error?.cause?.err?.code)
    /* throw error; */

    if (isRedirectError(error)) {
      console.log("isRedirectError")
      console.log(error)
      throw error;
    }
    switch (error?.cause?.err?.code) {

      case "credentials":
        console.log("credentials error")

        return { error: true, message: "Kimlik Bilgileri Geçersiz" }
      case "CallbackRouteError":
        console.log("CallbackRouteError")

        return { error: true, message: "CallbackRouteErrorr" }
      default:
        return { error: true, message: "Giriş Hatası, daha sonra tekrar deneyin" }
    }
    throw error;

  }

  /*   function resolveAfter2Seconds(x) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(x);
        }, 5000);
      });
    }
    const x = await resolveAfter2Seconds(10);
    console.log(x);
  
    return { status: "success", message: `Success ${x}` } */

}
export async function authRegister(
  values
) {
  const { email, password, repeatpassword, acceptmails, acceptterms } = values
  console.log("auth register")

  const validatedRegisterParams = await register.validateAsync(
    { email, password, repeatpassword, acceptmails, acceptterms })

  if (!validatedRegisterParams) return { error: true, message: "validationError" }

  try {
    await connectDB()
    const checkUserExists = await getUserByEmail(email)
    if (checkUserExists) return { error: true, message: "Bu Email ile Kayıt Oluşturulmuş" }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashedPassword })
    if (!user) return { error: false, message: "Registration Database Error" }
    const verificationToken = await generateVerificationToken(email)
    if (!verificationToken) return { error: true, message: "Doğrulama e-maili gönderilirken hata oluştu" }
    //sent verification email
    console.log("verification sending")
    // sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { error: false, message: "Kayıt Başarılı, doğrulama e-maili gönderildi" }

  } catch (error) {
    console.log("verification error")
    console.log(error)
    return { error: true, message: "Kayıt Hatası, daha sonra tekrar deneyiniz" }
  }


}