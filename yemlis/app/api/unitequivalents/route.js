import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import UnitEquivalent from '@/models/units/unitEquivalent'

export async function GET(req) {
    console.log("Unit Eq Get request received")

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
        const unitEq = await UnitEquivalent.find()
            .populate({
                path: "mainUnit",
                model: "Unit" 

            })

        if (unitEq.length === 0 || !unitEq) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan UnitEquivalent Türleri Bulunamadı" }))
                , { status: 200 })
        }

        return NextResponse.json(
            JSON.parse(JSON.stringify(unitEq))
            , { status: 200 })

    } catch (error) {
        console.log("error route UnitEquivalent")
        console.log(error)

        return NextResponse.json({
            error: true, message: "Error fetching UnitEquivalent on api"
        }
            , { status: 500 })
    }

}

