//TO REMOVE
import connectDB from '@/app/lib/mongodb'
import User from '@/models/user/user'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import Food from '@/models/food/food'
import Quantitative from '@/models/quantitatives/quantitative'
import Unit from '@/models/units/unit'
import unitEquivalent from '@/models/units/unitEquivalent'
import Item from '@/models/components/item'
import Organisation from '@/models/organisations/organisations'
import { currentUser } from '@/app/lib/auth'
export async function GET(req) {
    console.log("Food Get request received")

    try {
        //  const session = await auth()
        const { searchParams } = new URL(req.url)
        const search = searchParams.get('search')
        const offset = searchParams.get('offset')
        const limit = searchParams.get('limit')
        console.log("search params food")
        console.log(search)
        console.log(offset)
        console.log(limit)
        await connectDB()
        if (!search) {
            const foods = await Food.find().skip(offset)
                .limit(limit)
                .populate({
                    path: "quantitativeValues",
                    model: "Food",
                    select: "-_id",
                    populate: [{
                        path: "quantitative",
                        model: Quantitative,
                        select: "-_id "
                    }, {
                        path: "unit",
                        model: Unit,
                        select: '-_id',
                        populate: [{
                            path: "unitEquivalents",
                            model: unitEquivalent,
                            select: '-_id ',
                        }]
                    }],
                })
                .populate({
                    path: "nutritionValues",
                    model: "Food",
                    select: "-_id",
                    populate: [{
                        path: "nutrient",
                        model: Item,
                        select: "-_id"
                    }, {
                        path: "unit",
                        model: Unit,
                        select: '-_id',
                        populate: [{
                            path: "unitEquivalents",
                            model: unitEquivalent,
                            select: '-_id',
                        }]
                    }],
                })
                .populate({ path: 'organisation', model: Organisation })
            console.log("route handler-search food")
            console.log(foods)
            if (foods.length === 0) {
                return NextResponse.json(
                    JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Besin Bulunamadı" }))
                    , { status: 200 })

            }
            const user = await currentUser()
            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved } })
                })

                return NextResponse.json(
                    JSON.parse(JSON.stringify(foodsForUser))
                    , { status: 200 })
            }

            return NextResponse.json(
                JSON.parse(JSON.stringify(foods))
                , { status: 200 })


        } else {
            const foods = await Food.find({
                name: { $regex: search, $options: "i" }
            }).skip(offset)
                .limit(limit)
                .populate({
                    path: "quantitativeValues",
                    model: "Food",
                    select: "-_id",
                    populate: [{
                        path: "quantitative",
                        model: Quantitative,
                        select: "-_id "
                    }, {
                        path: "unit",
                        model: Unit,
                        select: '-_id',
                        populate: [{
                            path: "unitEquivalents",
                            model: unitEquivalent,
                            select: '-_id ',
                        }]
                    }],
                })
                .populate({
                    path: "nutritionValues",
                    model: "Food",
                    select: "-_id",
                    populate: [{
                        path: "nutrient",
                        model: Item,
                        select: "-_id"
                    }, {
                        path: "unit",
                        model: Unit,
                        select: '-_id',
                        populate: [{
                            path: "unitEquivalents",
                            model: unitEquivalent,
                            select: '-_id',
                        }]
                    }],
                })
                .populate({ path: 'organisation', model: Organisation })
            if (foods.length === 0) {
                return NextResponse.json(
                    JSON.parse(JSON.stringify({ notFound: true, message: "Aranan Besin Bulunamadı" }))
                    , { status: 200 })
            }
            const user = await currentUser()
            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } })
                })

                return NextResponse.json(
                    JSON.parse(JSON.stringify(foodsForUser))
                    , { status: 200 })
            }

            console.log("route handler-search food regex")
            console.log(foods)

            return NextResponse.json(
                JSON.parse(JSON.stringify(foods))
                , { status: 200 })
        }


        /*  switch (type) {
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
         } */
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
            error: true, message: "Error fetching food on api"
        }
            , { status: 500 })
    }




}

