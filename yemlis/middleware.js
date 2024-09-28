//import { auth } from "@/auth"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import rateLimitMiddleware from "./middlewares/rateLimiter"
import {
    DEFAULT_LOGIN_REDIRECT_URL,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    protectedRoutes,
} from "@/routes"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
export default  auth(
    rateLimitMiddleware(async function middleware(req) {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isProtected= protectedRoutes.includes(nextUrl.pathname)
    
/*     return Response.json(
        { success: false, message: 'Too Many Request ' },
        { status: 429 }
      )    */
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
    if(isPublicRoute) {
        console.log("public: ", nextUrl)
    console.log("route returning null")

    return null
} 
if(protectedRoutes && isLoggedIn) {
    console.log("welcome")
}
//belki geri kalanlar için redirect eklenebilir
}))