import Item from '@/models/items/item'
import connectDB from '@/app/lib/mongodb'
import { unstable_cache } from 'next/cache'

export const getAllItems = unstable_cache(async () => {
    try {
        await connectDB()
        const items = await Item.find()

        return JSON.parse(JSON.stringify(items))

    } catch (err) {
        console.log("get all items unstable_cache error")
        console.log(err)
        return { error: true, message: "HATA SS: All Items Araması Başarısız Oldu" }
    }

},
    ["items"],
    { revalidate: 3600, tags: ["items"] })

export const getItems = unstable_cache(async () => {
    try {
        await connectDB()
        const items = await Item.find({ isNutrient: true })

        return JSON.parse(JSON.stringify(items))

    } catch (err) {
        console.log("get items unstable_cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Item Araması Başarısız Olduu" }
    }

},
    ["items"],
    { revalidate: 3600, tags: ["items"] })

export const getItem = unstable_cache(async (name) => {

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
        console.log("get food group unstable_cache error")
        console.log(err)
        return { error: true, message: "HATA: Besin Grubu Araması Başarısız Oldu" }
    }

},
    ["items"],
    { revalidate: 3600, tags: ["items"] })


// NON NUTRIENTS
export const getOItems = unstable_cache(async () => {
    try {
        await connectDB()
        const items = await Item.find({ isNutrient: false })

        return JSON.parse(JSON.stringify(items))

    } catch (err) {
        console.log("get oitems unstable_cache error")
        console.log(err)
        return { error: true, message: "HATA SS: OItem Araması Başarısız Olduu" }
    }

},
    ["items"],
    { revalidate: 3600, tags: ["items"] })

