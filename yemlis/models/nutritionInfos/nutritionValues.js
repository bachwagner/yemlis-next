/* import mongoose from 'mongoose'

import creationInfos from '../groups/schemas.js'


const nutritionValues = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nutrition Values name is required"],
        minLength: [2, "too short Nutrition Values length"],
        maxLength: [50, "too long Nutrition Values length"],
    },
    food: { // standart measure should be
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    nutrient: { // vita, mg  // will be paired with food's standart measure e.g. 1 gr=>
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    },
    value: {
        type: Number,
        min: [0, "Nutrition Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high Unit Descriptive Amount"]
    },
    unit: { // should be standart measure
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    },
   
    creationInfos

})

export default mongoose.model("NutritionValues", nutritionValues)
 */

