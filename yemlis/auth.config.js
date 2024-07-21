import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'
import bcrypt from "bcryptjs"
import { login } from "./app/lib/validationSchemas"
import { getUserByEmail } from "./app/lib/data/user"

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                console.log("credentials")
                console.log(credentials)

                const validatedFields = await login.validateAsync({
                    email: credentials.email,
                    password: credentials.password
                })
                console.log("validatedFields")
                console.log(validatedFields)

                if (validatedFields) {
                    const { email, password } = validatedFields

                    const user = await getUserByEmail(email)
                    if (!user || !user.password) {
                        console.log("getUserByEmail null")

                        return null
                    }
                    const passwordsMatch = await bcrypt.compare(
                        password, user.password
                    )
                    console.log("passwordsMatch")
                    console.log(passwordsMatch)
                    console.log("user")
                    console.log(user)
                    if (!passwordsMatch) {
                        console.log("passwordsMatch returning null")
                        console.log(passwordsMatch)
                        return null
                    }
                    console.log("returning user")
                    console.log(user)
                    return user
                }
                console.log(" credentialds null")
                return null
            }
        })
    ]
} 