//TO REMOVE
import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import Unit from '@/models/units/unit'

export async function GET(req) {
    console.log("Unit Get request received")
    
    try {
        const user = await currentUser()
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ error: true, message: "Unauthorized" }))
                , { status: 401 })
        }
        //  const session = await auth()
        const { searchParams } = new URL(req.url)
        /* const name = searchParams.get('name')
           console.log("search params foodgroups")
           console.log(name) */
        await connectDB()
        const units = await Unit.find()
        .populate({
            path:"unitEquivalents",
            model:"UnitEquivalent"
        
        })

           /*  console.log("my units")
            console.log(units) */
        if (units.length === 0 || !units) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Unit Türleri Bulunamadı" }))
                , { status: 200 })
        } 

        return NextResponse.json(
            JSON.parse(JSON.stringify(units))
            , { status: 200 })

    } catch (error) {
        console.log("error route Unit")
        console.log(error)

        return NextResponse.json({
            error: true, message: "Error fetching Units on api"
        }
            , { status: 500 })
    }

}

