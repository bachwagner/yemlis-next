"use server"

import { currentRole } from "@/app/lib/auth"

export const admin = async () => {
    
    const role = await currentRole()
    if (role === "ADMIN") {
        return { success:true,error: false }
    } else {
        return { error: true }
    }
}