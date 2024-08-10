import connectDB from '@/app/lib/mongodb'
import User from '@/models/user/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
export async function GET(req) {
    try {
        console.log("User Get request received")
        const session = await auth()
        const { searchParams } = new URL(req.url)
        const _id = searchParams.get('id')
        console.log("sessionnn")
        console.log(session)

        if (!session) {
            console.log("Not Authorized")
            return NextResponse.json(
                null
                , { status: 403 })
        }
        await connectDB()
        
        const user = await User.findById(_id)
        console.log("user foundd")
        console.log(user)
        if (!user) {
            return NextResponse.json(
                null
                , { status: 403 })
        }
        return NextResponse.json(
            user
            , { status: 200 })

    } catch (error) {
        console.log("error route user")
        console.log(error)
        return NextResponse.json({
            message: "Error While Fething User.."
        }, {
            status: 500
        })
    }




}