import { cache } from 'react'
import UnitEquivalent from '@/models/units/unitEquivalent'
import { currentRole, currentUser } from '@/app/lib/auth'
import connectDB from '@/app/lib/mongodb'
import { unstable_cache } from 'next/cache'

export const getUnitEqs = unstable_cache(async () => {
    try {
        await connectDB()
        const unitEqs = await UnitEquivalent.find()
          //  .populate({ path: "", model: "" })

        return JSON.parse(JSON.stringify(unitEqs))

    } catch (err) {
        console.log("get Unit Eqs cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Unit Eqs Araması Başarısız Oldu" }
    }

},
["uniteqs"],
{revalidate:3600,tags:["uniteqs"]}
)
export const getUnitEq = unstable_cache(async (name) => {

    try {
        await connectDB()
        console.log("Unit Eq name search")
        console.log(name)

        const unitEqs = await UnitEquivalent.findOne({ name: name })

        console.log("Unit Eq search")
        console.log(unitEqs)
        return JSON.parse(JSON.stringify(unit))

    } catch (err) {
        console.log("get Unit Eq cache error")
        console.log(err)
        return { error: true, message: "HATA: Unit Eq Arama Başarısız Oldu" }
    }

},
["uniteqs"],
{revalidate:3600,tags:["uniteqs"]})

/* export const updateUnitEq = async () => {

    try {
        await connectDB()
        const update = async (fgs) => {
            for (let i = 0; i < fgs.length; i++) {
                const element = fgs[i];
                const updateUnitEq = await UnitEquivalent.findOneAndUpdate({
                    name: element.name, foodId: i + 1
                })
            }
        }
        const updateUnitEq = await UnitEquivalent.find()
        await update(updateUnit)
        console.log("update unit eq xx")
        return JSON.parse(JSON.stringify(updateUnit))

    } catch (err) {
        console.log("update unit eqs cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Units Güncellemesi Başarısız Oldu" }
    }

}
 */
