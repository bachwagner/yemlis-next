"use server"
import Food from '@/models/food/food'
import foodBand from '@/models/groups/foodBand'
import { options } from 'joi'
import { cache } from 'react'
import Unit from '@/models/units/unit'
import unitEquivalent from '@/models/units/unitEquivalent'
import Quantitative from '@/models/quantitatives/quantitative'
import Item from '@/models/components/item'
import Organisation from '@/models/organisations/organisations'
import { currentRole, currentUser } from '@/app/lib/auth'
export const getFoods = cache(async (search = null, offset = 0, limit = 10) => {

    console.log("searchh")
    console.log(search)
    try {
        if (!search) {
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

            const user = await currentUser()
            if (user) { // add foods user releated infos such as likes
                const foodsForUser = foods.map((f, i) => {
                    const isLiked = f.likes?.includes(user._id) ? true : false
                    
                    return ({ ...f._doc, userRelation: { isLiked: isLiked } })
                })
                        console.log("fff")
                        console.log(foodsForUser[0])
                   
                return JSON.parse(JSON.stringify(foodsForUser))
            }
            console.log("xxx")

            return JSON.parse(JSON.stringify(foods))

        } else {
            console.log("findingggg")
            const foods = await Food.find()
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
            console.log("regex-foodssss")
            console.log(foods)

            return JSON.parse(JSON.stringify(foods))

        }

    } catch (err) {
        console.log("get foods cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

}) 