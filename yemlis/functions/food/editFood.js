import mongoose from 'mongoose'
import Food from '../../models/foods/food.js'
import Unit from '../../models/units/unit.js'
import Items from '../../models/items/items.js'
export async function addValue(foodId, value, unitId, nutrientId) {  //name is not required // 5 gram magnesium  
    //if not ids accept string and search
    // foodId must be id
    let nutritionValue = {
        nutrient: "",
        value,
        unit: ""
    }
    try {
        const isFoodId = mongoose.isValidObjectId(foodId)
        if (!isFoodId) throw new Error("Invalid Food ID")
        const isUnitId = mongoose.isValidObjectId(unitId)
        const isNutrientId = mongoose.isValidObjectId(nutrientId)
        if (isUnitId) {
            nutritionValue.nutrient = unitId
        } else {
            const getUnit = await Unit.findOne({ name: unitId })
            const unit = getUnit._id
            nutritionValue.unit = unit
        }
        if (isNutrientId) {
            nutritionValue.unit = foodId
        } else {
            const getNutrient = await Items.findOne({ name: nutrientId })
            const nutrient = getNutrient._id
            nutritionValue.nutrient = nutrient
        }
        const food = await Food.findOne({ _id: foodId })
        if (!food) throw new Error("Food Cannot Be Found")
        console.log("nutritionValue")
        console.log(nutritionValue)
        const add = await Food.findByIdAndUpdate(foodId, { $push: { nutritionValues: nutritionValue } })
        console.log("add")
        console.log(add)
        return add
        //   if (!checkId) throw new Error("Invalid id or ids")
        //   const add = await Food.findOneAndUpdate({})
    } catch (error) {
        console.log(error)
    }
}

export default { addValue }

