import connectDB from '@/app/lib/mongodb'
import FoodGroups from '@/models/groups/foodGroups'
import { unstable_cache } from 'next/cache'

export const getFoodGroups = unstable_cache(async () => {

    try {
        await connectDB()

        const foodGroups = await FoodGroups.find()
            .populate({ path: "parent", model: FoodGroups })
          
        return JSON.parse(JSON.stringify(foodGroups))


    } catch (err) {
        console.log("get food groups cache error")
        console.log(err)
        return { error: true, message: "HATA SS: Besin Araması Başarısız Olduu" }
    }

},
["foodgroups"],
{ revalidate: 3600, tags: ["foodgroups"] })
export const getFoodGroup = unstable_cache(async (name) => {

    try {
        await connectDB()
        console.log("foodGroup name search")
        console.log(name)

        const foodGroup = await FoodGroups.findOne({ name: name })
            .populate({ path: "parent", model: FoodGroups })
        console.log("foodGroup")
       // console.log(foodGroup)
        return JSON.parse(JSON.stringify(foodGroup))

    } catch (err) {
        console.log("get food group cache error")
        console.log(err)
        return { error: true, message: "HATA: Besin Grubu Araması Başarısız Oldu" }
    }

},
["foodgroups"],
{ revalidate: 3600, tags: ["foodgroups"] })
/* export const updateFoodGroups = async () => {

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

 */