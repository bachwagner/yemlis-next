import connectDB from '@/app/lib/mongodb'
import User from '@/models/user/user'
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        await connectDB()
        const { email } = await req.json()
        const user = await User.findOne({ email }).select("_id")
        console.log("user ", user)
        return NextResponse.json({ user })
    } catch (error) {
        console.log("error creating user")
        console.log(error)
        return NextResponse.json({
            message: "Error While Fetching User.."
        }, {
            status: 500
        })
    }

}