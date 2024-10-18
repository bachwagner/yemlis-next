//TO REMOVE
import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import Item from '@/models/items/item'
import { auth } from '@/auth'
export async function GET(req) {
    console.log("OItems Get request received")
    try {
        const user = await currentUser()
        if (!user || user.role !== "ADMIN") {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ error: true, message: "Unauthorized" }))
                , { status: 401 })
        }
        await auth()
        const { searchParams } = new URL(req.url)
 
        await connectDB() 
       
        const items = await Item.find({isNutrient:false})
        .populate({path:"itemType",ref:"itemTypes"})
        .populate({path:"standartMeasures",ref:"standartMeasures"})
        .populate({path:"mainUnit",ref:"mainUnit"})

       /*  .populate({path:"itemType",select:"name"})
        .populate({path:"standartMeasures",ref:"UnitEquivalent",select:"name"}) */
        if (items.length === 0 || !items) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Besin Bileşenleri Bulunamadı" }))
                , { status: 200 })
        }
        
        return NextResponse.json(
            JSON.parse(JSON.stringify(items))
            , { status: 200 })

    } catch (error) {
        console.log("error route food")
        console.log(error)

        return NextResponse.json({
            error: true, message: "Error fetching o items on api"
        }
            , { status: 500 })
    }

}

