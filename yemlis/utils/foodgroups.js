import Food from '@/models/food/food'
import foodBand from '@/models/groups/foodBand'
import { options } from 'joi'
import { cache } from 'react'
import Unit from '@/models/units/unit'
import UnitEquivalent from '@/models/units/unitEquivalent'
import Quantitative from '@/models/quantitatives/quantitative'
import Item from '@/models/components/item'
import Organisation from '@/models/organisations/organisations'
import { currentRole, currentUser } from '@/app/lib/auth'
import User from '@/models/user/user'
import assert from 'assert'
import connectDB from '@/app/lib/mongodb'
import mongoose from 'mongoose'
import FoodGroups from '@/models/groups/foodGroups'

export const getFoodGroups = cache(async () => {

    try {
        await connectDB()

        const foodGroups = await FoodGroups.find()
            .populate({ path: "parent", model: FoodGroups })
        console.log("foodGroupss")
        console.log(foodGroups.length)
        return JSON.parse(JSON.stringify(foodGroups))


    } catch (err) {
        console.log("get food groups cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

})
export const getFoodGroup = cache(async (name) => {

    try {
        await connectDB()
        console.log("foodGroup name search")
        console.log(name)

        const foodGroup = await FoodGroups.findOne({ name: name })
            .populate({ path: "parent", model: FoodGroups })
        console.log("foodGroup")
        console.log(foodGroup)
        return JSON.parse(JSON.stringify(foodGroup))

    } catch (err) {
        console.log("get food group cache error")
        console.log(err)
        return { error: true, message: "HATA: Besin Grubu Araması Başarısız Oldu" }
    }

})
export const updateFoodGroups = async () => {

    try {
        await connectDB()
        const update = async (fgs) => {
            for (let i = 0; i < fgs.length; i++) {
                const element = fgs[i];
                const updatefoodGroup = await FoodGroups.findOneAndUpdate({
                    name: element.name, foodId: i + 1
                })
            }

        }
        const updateFg = await FoodGroups.find()
        await update(updateFg)
        console.log("fg xx")
        return JSON.parse(JSON.stringify(updateFg))


    } catch (err) {
        console.log("update food groups cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

}

