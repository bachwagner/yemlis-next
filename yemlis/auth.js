import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./app/lib/mongodb1"
import { getUserById } from "./app/lib/data/user"
import User from "./models/user"

export const {
  auth,
  handlers,
  signIn,
  signOut } = NextAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/error"
    },
    events: {
      async linkAccount({ user }) {
        console.log("link account")
        console.log("userr")
        console.log(user)
        await User.findOneAndUpdate({
          _id: user.id
        }, { emailVerified: new Date() })
      }
    },
    callbacks: {
      async signIn({user, account}) {
      
        console.log({user, account})
        //allow Oauth without email verification
        console.log("signIn account")
        console.log(account)
        if (account?.provider !== "credentials") return true

        const existingUser = await getUserById(user.id)
        //prevent login without email verification
        console.log("existing user")
        console.log(existingUser)
        if (!existingUser?.emailVerified) return false
        return true
      },
      async session({ token, session }) {
        console.log("session cb")

        console.log({ sessionToken: token })
        if (token.sub && session.user) {
          session.user.id = token.sub
        }
        if (token.role && session.user) {
          session.user.role = token.role

        }
        return session
      },
      async jwt({ token }) {
        console.log("jwt cb")
        if (!token.sub) return token
        console.log({ token })
        const existingUser = await getUserById(token.sub)
        if (!existingUser) return token
        token.role = existingUser.role
        return token
      }
    
    },
    // adapter: MongoDBAdapter(clientPromise),
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
    ...authConfig,
  })







