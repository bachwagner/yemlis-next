import { connectMongoDB } from '@/app/lib/mongodb'
import User from '@/models/user'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials

                try {
                    await connectMongoDB()
                    const user = await User.findOne({ email })
                    if (!user) {
                        return null
                    }
                    console.log("passs")
                    console.log(password)
                    console.log(user.password)

                    const passwordsMatch = await bcrypt.compare(password, user.password)
                   
                    if (!passwordsMatch) {
                        return null
                    }
                    return user
                } catch (error) {
                    console.log("Error")
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }