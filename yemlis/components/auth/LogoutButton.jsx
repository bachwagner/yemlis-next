"use client"
import { logout } from "@/app/lib/actions/logout"
import { signOut } from "next-auth/react"

export const LogoutButton = ({ children }) => {
    const onClick = () => {
        logout()
        //signOut()
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}