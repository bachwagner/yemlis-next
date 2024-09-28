//TO REMOVE
import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import Item from '@/models/components/item'
export async function GET(req) {
    console.log("Items Get request received")
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
       
        const items = await Item.find().populate("itemType")
        console.log("my schema")
       
        if (items.length === 0 || !items) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Besin Öğesi Bulunamadı" }))
                , { status: 200 })
        }

        return NextResponse.json(
            JSON.parse(JSON.stringify(items))
            , { status: 200 })

    } catch (error) {
        console.log("error route food")
        console.log(error)

        return NextResponse.json({
            error: true, message: "Error fetching food on api"
        }
            , { status: 500 })
    }

}

