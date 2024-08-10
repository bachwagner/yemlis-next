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

    if (isApiAuthRoute) {
        console.log("api route returning null ")
        return null
    }
    if (isAuthRoute) {
        console.log("auth route")
        /*  if (isLoggedIn) {
             console.log("logged in redirecting")
             return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
         } */
        if (isLoggedIn) {
            /*  const paramsCB = nextUrl.searchParams.get("callbackUrl")
             const paramsError = nextUrl.searchParams.get("error") */
            /* if (paramsError === "SessionRequired" && paramsCB) {
                console.log("ses reqqq")
                return Response.redirect(new URL(paramsCB, nextUrl))
            } */
            //    if (isCB) return Response.redirect(new URL("/admin", nextUrl))
            //   if (!isCB) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
            console.log("already logged in redirecting")

            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl))
        }
        return null
    }
    if (!isLoggedIn && !isPublicRoute) {
        console.log("callbackUrlcallbackUrl")

        let callbackUrl = nextUrl.pathname
        nextUrl.searchParams
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)
        console.log("encodedCallbackUrl: ", encodedCallbackUrl)
        return Response.redirect(
            new URL(
                `/auth/login?callbackUrl=${encodedCallbackUrl}`,
                nextUrl
            ))

    }
    if(isPublicRoute) console.log("public: ", nextUrl)
    console.log("route returning null ")

    return null

})