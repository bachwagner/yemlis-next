import Unit from '@/models/units/unit'
import connectDB from '@/app/lib/mongodb'
import { unstable_cache } from 'next/cache'

export const getUnits = unstable_cache(async () => {
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

},
    ["units"],
    { revalidate: 3600, tags: ["units"] }
)
export const getUnit = unstable_cache(async (name) => {

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

},
["units"],
{revalidate:3600,tags:["units"]})

