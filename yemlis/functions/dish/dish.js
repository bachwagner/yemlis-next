import mongoose from 'mongoose'  //TO DELETE
import Dish from '../../models/foods/dish.js'
import Unit from '../../models/units/unit.js'
import Items from '../../models/items/items.js'
import Quantitative from '../../models/quantitives/quantitative.js'

function adjustIngredientsTo100(ingredients, defaultPortionWeight = 100) {

    const totalIngredientWeight = ingredients.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount, 0
    )
    console.log("totalIngredientWeight")
    console.log(totalIngredientWeight)
    //modify to 100 gram

    const portionScale = (defaultPortionWeight / 100).toFixed(3)  //   x times 100 gram
    console.log("portionScale")
    console.log(portionScale)
    const adjustedIngredients = ingredients.map(ing => ({
        ...ing,
        amount: (ing.amount / portionScale).toFixed(3)
    }))
    return adjustedIngredients
}
function adjustPortions(portions) {
    let modifiedFoodPortions = [...portions.filter(fp => fp.modifier !== "100 gram")]
    modifiedFoodPortions.unshift({ modifier: "100 gram", gramWeight: 100 })
    console.log("modifiedFoodPortions")
    console.log(modifiedFoodPortions)
    return modifiedFoodPortions

}
export async function addDish({ // for upsert id is required
    id, //for upsert
    name,
    type, //drink..
    origin, //recipe
    organisation,
    isCustomValues,
    nutritionInfo,
    foodPortions,
    ingredients,
    defaultModifier, //ingredient list's portion, default
    quantitativeValues,
    nutritionValues,
    userId
}) {
    try {
        const checkSameDishName = await Dish.findOne({ name, 'creationInfos.creator': userId })
        if (checkSameDishName) throw Error("Same Dish name by Same User")
        const defaultPortionWeight = foodPortions.find(f => f.modifier === defaultModifier).gramWeight//default portion's total weight, gonna scale to 100 g

        const adjustedPortions = adjustPortions(foodPortions)
        const adjustedIngredients = adjustIngredientsTo100(ingredients, defaultPortionWeight)

        console.log("adjustedPortions")
        console.log(adjustedPortions)

        console.log("adjustedIngredients")
        console.log(adjustedIngredients)

        const addDishh = await Dish.findOneAndUpdate(
            {
                _id: id ? id : new mongoose.Types.ObjectId(),
                'creationInfos.creator': userId,
            }, {
            name,
            type,
            origin,
            organisation,
            isCustomValues,
            nutritionInfo,
            foodPortions: adjustedPortions,
            ingredients: adjustedIngredients,
            quantitativeValues,
            nutritionValues,
            creationInfos: { creator: userId }
        }, { upsert: true })
        console.log("addDish")
        console.log(addDishh)
        return addDishh
    } catch (error) {
        return error
    }

}

export async function editDish() { //id is necessary
    let args = { ...arguments[0] }
    if (args.userId) args.creationInfos = args.userId
    if (args.humanHealthEffect) args.nutritionInfo = { humanHealthEffect: args.humanHealthEffect }

    delete args.humanHealthEffect
    delete args.userId
    console.log("args")
    console.log(args)
    if (args.ingredients) {
        if (!args.defaultModifier) throw Error('editing ingredients requires default modifier')
        const defaultPortionWeight = args.foodPortions.find(f => f.modifier === args.defaultModifier).gramWeight
        const adjustedIngredients = adjustIngredientsTo100(args.ingredients, defaultPortionWeight)
        args.ingredients = adjustedIngredients

    }
    if (args.foodPortions) {
        const adjustedPortions = adjustPortions(args.foodPortions)
        args.foodPortions = adjustedPortions
    }
    try {
        const editDish = await Dish.findOneAndUpdate(
            { _id: args.id },
            args,
            { upsert: true })

        return editDish
    } catch (error) {
        console.log(error)
        return error
    }

}
export async function deleteDish(dishId) {
    const del = await Dish.deleteOne({ _id: dishId })
    console.log(del)
    return del
}
export function calculateNutrients(ingredients) {
    if (!ingredients) throw Error("Ingredients is Required")

    let allNutrients = {} //{value,unit}
    let allQuantitatives = {} //{value, unit}
    let commonNutrients = {}
    let commonQuantitatives = {}

    ingredients.forEach((ingredient, ingredientIndex) => {
        const ingredientNutrients = ingredient.foodType.nutritionValues //nutrients
        const ingredientQuantitatives = ingredient.foodType.quantitativeValues
        const ingredientWeight = ingredient.amount
        const multiplier = ingredientWeight / 100
        console.log("ingredientWeight")
        console.log(ingredientWeight)
        console.log("multiplier")
        console.log(multiplier)

        ingredientNutrients.forEach((nutrient, index) => {
            console.log("nutrient value")
            console.log(nutrient.value)

            const value = nutrient.value
            if (value === undefined) throw new Error("One of nutrient value is missing")
            const nutrientName = nutrient.name
            const unit = nutrient.unit.name

            if (!allNutrients[nutrientName]) allNutrients[nutrientName] = {}
            if (!allNutrients[nutrientName].unit) allNutrients[nutrientName].unit = unit
            if (ingredientIndex === 0) {
                if (!commonNutrients[nutrientName]) commonNutrients[nutrientName] = {}
                if (!commonNutrients[nutrientName].unit) commonNutrients[nutrientName].unit = unit

                commonNutrients[nutrientName].value = commonNutrients[nutrientName]?.value ? commonNutrients[nutrientName]?.value + value : value
            } else if (commonNutrients[nutrientName] !== undefined) {
                if (commonNutrients[nutrientName]?.unit !== unit) throw Error("Common Nutrient unit sync Error " + commonNutrients[nutrientName]?.unit + "<=>" + unit)
                commonNutrients[nutrientName].value = commonNutrients[nutrientName]?.value ? commonNutrients[nutrientName]?.value + value : value
            } else {
                //     console.log("nutrient removed")
                //     console.log(nutrientName)
            }
            if (allNutrients[nutrientName].unit !== unit) throw Error("Nutrient unit sync Error " + allNutrients[nutrientName].unit + "<=>" + unit)
            allNutrients[nutrientName].value = allNutrients[nutrientName]?.value ? allNutrients[nutrientName]?.value + value : value
        })
        ingredientQuantitatives.forEach((quantative, index) => {

            const value = quantative.value
            if (value === undefined) throw new Error("One of nutrient value is missing")
            const quantativeName = quantative.name
            const unit = quantative.unit.name
            console.log("quantativeName")
            console.log(quantativeName)
            if (!allQuantitatives[quantativeName]) allQuantitatives[quantativeName] = {}
            if (!allQuantitatives[quantativeName].unit) allQuantitatives[quantativeName].unit = unit
            if (ingredientIndex === 0) {
                if (!commonQuantitatives[quantativeName]) commonQuantitatives[quantativeName] = {}
                if (!commonQuantitatives[quantativeName].unit) commonQuantitatives[quantativeName].unit = unit

                commonQuantitatives[quantativeName].value = commonQuantitatives[quantativeName]?.value ? commonQuantitatives[quantativeName]?.value + value : value
            } else if (commonQuantitatives[quantativeName] !== undefined) {
                if (commonQuantitatives[quantativeName]?.unit !== unit) throw Error("Common Nutrient unit sync Error " + commonQuantitatives[quantativeName]?.unit + "<=>" + unit)
                commonQuantitatives[quantativeName].value = commonQuantitatives[quantativeName]?.value ? commonQuantitatives[quantativeName]?.value + value : value
            } else {
                //     console.log("quantative removed")
                //     console.log(quantativeName)
            }
            if (allQuantitatives[quantativeName].unit !== unit) throw Error("Nutrient unit sync Error " + allQuantitatives[quantativeName].unit + "<=>" + unit)
            allQuantitatives[quantativeName].value = allQuantitatives[quantativeName]?.value ? allQuantitatives[quantativeName]?.value + value : value
        })
    })



    /* console.log("allNutrients")
    console.log(commonNutrients) */
    //  console.log(Object.keys(allNutrients).length )
    //   console.log(Object.keys(commonNutrients).length)
    return { nutrients: commonNutrients, quantatives: commonQuantitatives }
}

export default {
    addDish,
    editDish,
    deleteDish,
    calculateNutrients

}


