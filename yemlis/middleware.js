//import { auth } from "@/auth"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT_URL,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig)

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

export default auth(async function middleware(req) {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    console.log("isApiAuthRoute")
    console.log(isApiAuthRoute)
    if (isApiAuthRoute) {
        console.log("api route returning null ")

        return null
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log("logged in redirecting")
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
        }
        return null
    }
    if (!isLoggedIn && !isPublicRoute) {
        console.log("forbidden route")
    
        return Response.redirect(new URL("/auth/login", nextUrl))

    }
    console.log("route returning null ")

    return null

})