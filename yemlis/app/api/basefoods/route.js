import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import Basefood from '@/models/basefood/basefood'

export async function GET(req) {
    console.log("Base Food Get request received")

    try {
        const user = await currentUser()
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ error: true, message: "Unauthorized" }))
                , { status: 401 })
        }
        //  const session = await auth()

        const { searchParams } = new URL(req.url)

        await connectDB()
        const baseFoods = await Basefood.find()
            .populate({
                path: "foodGroup",
                model: "foodGroups"
            })
            .populate({
                path: "categorie",
                model: "sciCats"
            })

        if (baseFoods.length === 0 || !baseFoods) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan BaseFoods Türleri Bulunamadı" }))
                , { status: 200 })
        }

        return NextResponse.json(
            JSON.parse(JSON.stringify(baseFoods))
            , { status: 200 })

    } catch (error) {
        console.log("error route BaseFoods")
        console.log(error)

        return NextResponse.json({
            error: true, message: "Error fetching BaseFoods on api"
        }
            , { status: 500 })
    }

}

