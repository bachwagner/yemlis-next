/* import mongoose from 'mongoose'
import Food from '../../models/foods/food.js'
import Unit from '../../models/units/unit.js'
import Items from '../../models/items/items.js'
import Dish from '../../models/foods/dish.js'

export async function addDish({
    name,
    type,
    origin,
    organisation,
    humanHealthEffect,
    foodPortions,
    ingredients,
    creator }) {
    try {
        const addDish = await Dish.findOneAndUpdate({
            name,
            userId
        }, {
            name,
            type,
            origin,
            organisation,
            nutritionInfo: { humanHealthEffect },
            foodPortions,
            ingredients,
            creationInfos: { creator }

        })

    } catch (error) {
        console.log(error)
    }
}

export default { addDish }

 */