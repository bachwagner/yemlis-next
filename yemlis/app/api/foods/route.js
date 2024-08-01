import connectDB from '@/app/lib/mongodb'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import Food from '@/models/food/food'
export async function GET(req) {
    try {
        console.log("Food Get request received")
        //  const session = await auth()
        //  const { searchParams } = new URL(req.url)
        const type = searchParams.get('type')
        const anchor = searchParams.get('anchor')
        const pieces = searchParams.get('pieces')
        await connectDB()

        switch (type) {
            case "feed":
                const food = await Food.find()
                console.log("food foundd")
                console.log(food)
                if (!food) {
                    return NextResponse.json(
                        null
                        , { status: 403 })
                }
                return NextResponse.json(
                    food
                    , { status: 200 })

            case "search":

                break;

            default:
                break;
        }
        /*  if (!session) {
             console.log("Not Authorized")
             return NextResponse.json(
                 null
                 , { status: 403 })
         } */

    } catch (error) {
        console.log("error route food")
        console.log(error)
        return NextResponse.json({
            message: "Error While Fething Food.."
        }, {
            status: 500
        })
    }




}