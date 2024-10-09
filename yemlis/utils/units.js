import Food from '@/models/food/food'
import foodBand from '@/models/groups/foodBand'
import { options } from 'joi'
import { cache } from 'react'
import Unit from '@/models/units/unit'
import UnitEquivalent from '@/models/units/unitEquivalent'
import Quantitative from '@/models/quantitatives/quantitative'
import Organisation from '@/models/organisations/organisations'
import { currentRole, currentUser } from '@/app/lib/auth'
import User from '@/models/user/user'
import assert from 'assert'
import connectDB from '@/app/lib/mongodb'

export const getUnits = cache(async () => {
    try {
        await connectDB()
        const units = await Unit.find()
            .populate({ path: "unitEquivalents", model: "UnitEquivalent" })

        return JSON.parse(JSON.stringify(units))

    } catch (err) {
        console.log("get units cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Unit Araması Başarısız Oldu" }
    }

})
export const getUnit = cache(async (name) => {

    try {
        await connectDB()
        console.log("unit name search")
        console.log(name)

        const unit = await Unit.findOne({ name: name })
        .populate({ path: "unitEquivalents", model: "UnitEquivalent" })

        console.log("unit search")
        console.log(unit)
        return JSON.parse(JSON.stringify(unit))

    } catch (err) {
        console.log("get unit cache error")
        console.log(err)
        return { error: true, message: "HATA: Unit Arama Başarısız Oldu" }
    }

})

export const updateUnits = async () => {

    try {
        await connectDB()
        const update = async (fgs) => {
            for (let i = 0; i < fgs.length; i++) {
                const element = fgs[i];
                const updateUnit = await Unit.findOneAndUpdate({
                    name: element.name, foodId: i + 1
                })
            }
        }
        const updateUnit = await Unit.find()
        await update(updateUnit)
        console.log("update unit xx")
        return JSON.parse(JSON.stringify(updateUnit))

    } catch (err) {
        console.log("update units cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Units Güncellemesi Başarısız Oldu" }
    }

}

