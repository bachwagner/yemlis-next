import Food from '@/models/food/food'
import foodBand from '@/models/groups/foodBand'
import { options } from 'joi'
import { cache } from 'react'
import Unit from '@/models/units/unit'
import UnitEquivalent from '@/models/units/unitEquivalent'
import Quantitative from '@/models/quantitatives/quantitative'
import Item from '@/models/items/item'
import Organisation from '@/models/organisations/organisations'
import { currentRole, currentUser } from '@/app/lib/auth'
import User from '@/models/user/user'
import assert from 'assert'
import connectDB from '@/app/lib/mongodb'
import mongoose from 'mongoose'
import { unstable_cache } from 'next/cache'
const getUserFoodsFromDB = (userId) =>
    unstable_cache(async (userId) => {
        const food = await
            Food.find({ "creationInfos.creator": userId })
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
                            model: UnitEquivalent,
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
                            model: UnitEquivalent,
                            select: '-_id',
                        }]
                    }],
                })
                .populate({ path: 'manufacturer.organisation', model: Organisation })
                .populate({ path: 'creationInfos.creator', model: User })
        return food
    }, [`userfood${userId}`])

const getFoodFromDB = async (id) => {
    const food = await
        Food.findById(id)
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
                        model: UnitEquivalent,
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
                        model: UnitEquivalent,
                        select: '-_id',
                    }]
                }],
            })
            .populate({ path: 'manufacturer.organisation', model: Organisation })
            .populate({ path: 'creationInfos.creator', model: User })
    return food
}

const getFoodsFromDB = async (search, offset, limit) => {
    const foods = await
        Food.find()
            .skip(offset)
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
                        model: UnitEquivalent,
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
                        model: UnitEquivalent,
                        select: '-_id',
                    }]
                }],
            })
            .populate({ path: 'organisation', model: Organisation })
    return foods
}


export const getUserFoods = async (userId, search = null, offset = 0, limit = 10) => {
    console.log("searchh")
    console.log(search)
    try {
        await connectDB()

        if (!search) {
            console.log("searchingg")

            const user = await currentUser()
            console.log("!search")

            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)
                const foods = await getUserFoodsFromDB(userId) // TO CONTINUE

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))
                    console.log("isSaved")
                    console.log(isSaved)

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } })
                })

                return JSON.parse(JSON.stringify(foodsForUser))
            }
            console.log("xxx")

            return JSON.parse(JSON.stringify(foods))

        } else {
            console.log("findingggg")
            const foods = await Food.find({
                name: { $regex: search, $options: "i" }
            })
                .skip(offset)
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
                            model: UnitEquivalent,
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
                            model: UnitEquivalent,
                            select: '-_id',
                        }]
                    }],
                })
                .populate({ path: 'organisation', model: Organisation })


            console.log("regex-foodssss")
            console.log(foods)

            const user = await currentUser()
            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))
                    console.log("isSaved")
                    console.log(isSaved)

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } })
                })

                return JSON.parse(JSON.stringify(foodsForUser))
            }
            console.log("xxx")


            return JSON.parse(JSON.stringify(foods))
        }

    } catch (err) {
        console.log("get foods cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

}

export const getFoods = cache(async (search = null, offset = 0, limit = 10) => {
    console.log("searchh")
    console.log(search)
    try {
        await connectDB()

        if (!search) {
            console.log("searchingg")
            const foods = await getFoodsFromDB(search, offset, limit)

            const user = await currentUser()
            console.log("!search")

            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))
                    console.log("isSaved")
                    console.log(isSaved)

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } })
                })

                return JSON.parse(JSON.stringify(foodsForUser))
            }
            console.log("xxx")

            return JSON.parse(JSON.stringify(foods))

        } else {
            console.log("findingggg")
            const foods = await Food.find({
                name: { $regex: search, $options: "i" }
            })
                .skip(offset)
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
                            model: UnitEquivalent,
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
                            model: UnitEquivalent,
                            select: '-_id',
                        }]
                    }],
                })
                .populate({ path: 'organisation', model: Organisation })


            console.log("regex-foodssss")
            console.log(foods)

            const user = await currentUser()
            if (user) { // add foods user releated infos such as likes
                const getUser = await User.findById(user._id)

                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(f._id))
                    console.log("isSaved")
                    console.log(isSaved)

                    return ({ ...f._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } })
                })

                return JSON.parse(JSON.stringify(foodsForUser))
            }
            console.log("xxx")


            return JSON.parse(JSON.stringify(foods))
        }

    } catch (err) {
        console.log("get foods cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

})

export const getFood = cache(async (id) => {
    try {
        await connectDB()
        const validId = mongoose.isValidObjectId(id)
        if (!validId) return JSON.parse(JSON.stringify({ error: true, message: "invalid id paramater" }))



        const user = await currentUser()
        const food = await getFoodFromDB(id)
        if (user) { // add foods user releated infos such as likes
            const getUser = await User.findById(user._id)

            const isLiked = food.likes?.includes(user._id) ? true : false
            const isSaved = getUser?.bookmarks?.find(b => b?.element?.equals(food._id))

            const foodForUser = { ...food._doc, userRelations: { isLiked: isLiked, isSaved: isSaved ? true : false } }

            return JSON.parse(JSON.stringify(foodForUser))
        }

        return JSON.parse(JSON.stringify(food))


    } catch (err) {
        console.log("get food cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

})
