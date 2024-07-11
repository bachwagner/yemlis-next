import  connectDB  from '@/app/lib/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req) {
    console.log("Post request received")
    try {
        const { email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectDB()
        console.log("creating user")
        await User.create({ email, password: hashedPassword })

        return NextResponse.json({
            message: "User Registered"
        }, { status: 200 }
        )
    } catch (error) {
        console.log("error creating user")
        console.log(error)
        return NextResponse.json({
            message: "Error While Registering.."
        }, {
            status: 500
        })
    }

}