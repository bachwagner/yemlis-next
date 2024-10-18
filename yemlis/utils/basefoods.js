import connectDB from '@/app/lib/mongodb'
import { unstable_cache } from 'next/cache'
import Basefood from '@/models/basefood/basefood'

export const getBaseFoods = unstable_cache(async () => {
    try {
        await connectDB()
        const unitEqs = await Basefood.find()
        //  .populate({ path: "", model: "" })

        return JSON.parse(JSON.stringify(unitEqs))

    } catch (err) {
        console.log("get BaseFoods cache error")
        console.log(err)
        return { error: true, message: "HATA SS: BaseFoods Araması Başarısız Oldu" }
    }

},
    ["basefoods"],
    { revalidate: 3600, tags: ["basefoods"] }
)

export const getBaseFood = unstable_cache(async (name) => {

    try {
        await connectDB()
        console.log("BaseFoods name search")
        console.log(name)

        const unitEqs = await Basefood.findOne({ name: name })

        console.log("BaseFoods search")
        console.log(unitEqs)
        return JSON.parse(JSON.stringify(unit))

    } catch (err) {
        console.log("get BaseFoodscache error")
        console.log(err)
        return { error: true, message: "HATA: BaseFoodsArama Başarısız Oldu" }
    }

},
    ["basefoods"],
    { revalidate: 3600, tags: ["basefoods"] })

