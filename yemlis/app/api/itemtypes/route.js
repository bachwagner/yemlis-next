//TO REMOVE
import connectDB from '@/app/lib/mongodb'
import { NextResponse } from 'next/server'
import { currentUser } from '@/app/lib/auth'
import ItemTypes from '@/models/items/itemTypes'

export async function GET(req) {
    console.log("ItemsType Get request received")
    
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
        const itemTypes = await ItemTypes.find()

        if (itemTypes.length === 0 || !itemTypes) {
            return NextResponse.json(
                JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Besin Öğesi Türü Bulunamadı" }))
                , { status: 200 })
        }

        return NextResponse.json(
            JSON.parse(JSON.stringify(itemTypes))
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

