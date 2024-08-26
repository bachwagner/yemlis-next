import mongoose from 'mongoose'
import FoodGroups from '../../models/foods/food.js'
import fs from 'fs'
import Food from '../../models/foods/food.js'
import items from '../../models/items/items.js'

export async function querySrLegacy(url, limit) { //sr legacy
    try {

        if (!typeof url === 'string' && !url instanceof String) throw new Error("Url 6Must be String")
        const data = fs.readFileSync(url, 'utf8');
        const parsedData = JSON.parse(data) //OBJECT
        const srLegacy = parsedData.SRLegacyFoods //ARRAY
        const setLimit = limit ? limit : srLegacy.length
        let set1 = new Set();
        let scanned =0
        for (let i = 0; i < setLimit; i++) {
            const food = srLegacy[i]
            const foodNutrients = food.foodNutrients
            foodNutrients.forEach(nutrient => {
                const unitName = nutrient.nutrient.unitName
                set1.add(unitName)

            });
            scanned++

        }
        console.log(set1)
        console.log(scanned)
        return

    } catch (error) {
        console.log("Create Usda Food Error")
        console.log(error)
    }

}
export async function createUsdaFoods(url) { //sr legacy
    try {

        if (!typeof url === 'string' && !url instanceof String) throw new Error("Url 6Must be String")
        const data = fs.readFileSync(url, 'utf8');
        const parsedData = JSON.parse(data) //OBJECT
        const srLegacy = parsedData.SRLegacyFoods //ARRAY
        let totalAdded = 0
        for (let i = 0; i < srLegacy.length; i++) {
            console.log("starting add USDA FOODS...")
            const food = srLegacy[i]
            const foodName = food.description
            const foodNutrients = food.foodNutrients
            const undetermined = new mongoose.Types.ObjectId("65aacd17db9dd557d9f20d4e")
            const foodPortions = food.foodPortions.map((f) => {
                return {
                    modifier: f.modifier,
                    gramWeight: f.gramWeight,
                    sequenceNumber: f.sequenceNumber
                }
            }

            )

            const gramId = new mongoose.Types.ObjectId("657f62870302b4a8a55757e1")
            const usdaId = new mongoose.Types.ObjectId("65ce043f1fa46e42a29a2800")
            const calorieId = new mongoose.Types.ObjectId("6589991cdb9dd557d9ef969f")
            const calorieUnit = new mongoose.Types.ObjectId("657f6bc7094fb583bc8ed794")
            let foodObj = {
                name: foodName,
                // foodGroup:""
                // categorie
                //image
                standartMeasure: gramId,
                foodPortions: foodPortions,
                organisation: usdaId,
                source: "institution",
                tags: foodName.split(' '),
                foodNutrientDerivation: "",
                foodNutrientSource: ""

            }
            let nutritionValues = []
            let quantitativeValue = []


            for (const foodNutrient of foodNutrients) {
                if (foodNutrient.nutrient.name !== "Energy") {

                    let nutritionValue
                    const nutrient = foodNutrient.nutrient
                    const nutrientName = nutrient.name
                    const unitName = nutrient.unitName
                    const foodNutrientDerivation = foodNutrient.foodNutrientDerivation.description
                    const foodNutrientSource = foodNutrient.foodNutrientDerivation.foodNutrientSource.description
                    const amount = foodNutrient.amount
                    let nutrientId = undefined
                    nutrientId = await items.findOne({ name: nutrientName })
                    if (!nutrientId) {
                        console.log("nutrient error " + nutrientName)
                        console.log("nutrient adding: " + nutrientName)
                        const addItem = await items.findOneAndUpdate({
                            name: nutrientName
                        }, {
                            name: nutrientName,
                            itemType: undetermined,
                            usdaName: nutrientName
                        }, { upsert: true, new: true })

                        nutrientId = addItem._id
                        console.log("addedNutrientItem")
                        console.log(nutrientName)
                    }

                    nutritionValue = {
                        name: nutrientName,
                        nutrient: nutrientId,
                        perMain: 100,
                        unit: new mongoose.Types.ObjectId("657f62870302b4a8a55757e1"),
                        value: amount,
                        foodNutrientDerivation,
                        foodNutrientSource,
                    }
                    nutritionValues.push(nutritionValue)
                    //  console.log(nutrientName + " " + amount + " " + unitName)
                    //   console.log(foodNutrientDerivation)
                    //   console.log(foodNutrientSource)

                } else {
                    const foodNutrientDerivation = foodNutrient.foodNutrientDerivation.description
                    const foodNutrientSource = foodNutrient.foodNutrientDerivation.foodNutrientSource.description
                    const amount = foodNutrient.amount

                    let quantitative = {
                        name: "Calorie",
                        quantitative: calorieId,
                        permain: 100,
                        unit: calorieUnit,
                        value: amount,
                        foodNutrientDerivation,
                        foodNutrientSource
                    }

                    quantitativeValue.push(quantitative)

                }

            }

            foodObj.nutritionValues = nutritionValues
            foodObj.quantitativeValues = quantitativeValue
            const addFood = await Food.findOneAndUpdate({
                name: foodName
            },
                foodObj,
                { upsert: true })
            console.log("Added Item " + i)
            totalAdded++
        }

        console.log("Adding Session Over..")
        console.log("Total Added " + totalAdded)
        return

    } catch (error) {
        console.log("Create Usda Food Error")
        console.log(error)
    }

}

export async function translateFoods(originalQuery, translatedQuery, translateTo) { //translate
    for (let index = 0; index < originalQuery.length; index++) {
        console.log(index)
        const food = originalQuery[index];
        const originalFoodName = food.name
        const translatedFoodName = Object.values(translatedQuery[index])[0];
        let nameTranslateObj = {}
        nameTranslateObj[translateTo] = translatedFoodName  // tr:"besin ismi"
        const addFood = await Food.findOneAndUpdate(
            { name: originalFoodName },
            { $set: { name_translate: nameTranslateObj } })
    }


}

export default { createUsdaFoods, querySrLegacy, translateFoods }
