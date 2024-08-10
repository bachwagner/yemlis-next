import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./app/lib/mongodb1"
import { getUserById } from "./app/lib/data/user"
import User from "./models/user/user"
import { getAccountByUserId } from "./app/lib/data/account"

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
          _id: user._id
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

        const existingUser = await getUserById(user._id)
        //prevent login without email verification
        console.log("existing user")
        console.log(existingUser)
        if (!existingUser?.emailVerified) return false
        return true
      },
      async session({ token, session }) {
        console.log("server session user")
        console.log(session)
        console.log("server session token")
        console.log(token)
        console.log({ sessionToken: token })
        if (token.sub && session.user) {
          session.user._id = token.sub
        }
        if (token.role && session.user) {
          session.user.role = token.role
        }
        if(session.user){
          session.user.name=token.name
          session.user.email=token.email
          session.user.isOAuth = token.isOAuth
        }
        return session
      },
      async jwt({ token }) {
        if (!token.sub) return token
        const existingUser = await getUserById(token.sub)
        console.log("jwt existing user")
        console.log(existingUser)
        if (!existingUser) return token
        const existingAccount = await getAccountByUserId(existingUser._id)
        token.isOAuth= !!existingAccount
        token.name=existingUser.name
        token.email=existingUser.email
        token.role = existingUser.role
       
        return token
      }
    
    },
    // adapter: MongoDBAdapter(clientPromise),
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
    ...authConfig,
  })







