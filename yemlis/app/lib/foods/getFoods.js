/* "use server"
import Food from "@/models/food/food"
export const getFoods = async (search = null, offset = 0, limit = 10) => {

    try {
        if (!search) {
            const foods = await Food.find().skip(offset).limit(limit)
            console.log("sa-foods")
            console.log(foods)

            return JSON.parse(JSON.stringify(foods))
        } else {
            const foods = await Food.find({ name: { $regex: search, options: "i" } }).skip(offset).limit(limit)
            console.log("regex-foods")
            console.log(foods)

            return JSON.parse(JSON.stringify(foods))
        }
    
    } catch {
        return { error: true, message: "HATA: Besin Araması Başarısız Oldu" }
    }
} */