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
export const getItems = cache(async () => {
    try {
        await connectDB()
        const items = await Item.find()
          
        return JSON.parse(JSON.stringify(items))

    } catch (err) {
        console.log("get items cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Item Araması Başarısız Olduu" }
    }

})
export const getItem = cache(async (name) => {

    try {
        await connectDB()
        console.log("item name search")
        console.log(name)

        const item = await Item.findOne({ name: name })
            .populate({ path: "parent", model: Items })
        console.log("item search")
        console.log(item)
        return JSON.parse(JSON.stringify(item))

    } catch (err) {
        console.log("get food group cache error")
        console.log(err)
        return { error: true, message: "HATA: Besin Grubu Araması Başarısız Oldu" }
    }

})
export const updateItems = async () => {

    try {
        await connectDB()
        const update = async (fgs) => {
            for (let i = 0; i < fgs.length; i++) {
                const element = fgs[i];
                const updateItem = await Item.findOneAndUpdate({
                    name: element.name, foodId: i + 1
                })
            }
        }
        const updateItem = await Item.find()
        await update(updateItem)
        console.log("ui xx")
        return JSON.parse(JSON.stringify(updateItem))

    } catch (err) {
        console.log("update items cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Item Güncellemesi Başarısız Olduu" }
    }

}

