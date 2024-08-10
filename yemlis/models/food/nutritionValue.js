
import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'


const nutritionValue = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "too short Nutrition Values length"],
        maxLength: [50, "too long Nutrition Values length"],
    },

    nutrient: { // vita, mg  // will be paired with food's standart measure e.g. 1 gr=>
        type: mongoose.Schema.Types.ObjectId,
        ref: "items"
    },
    perMain: { // describes 100 gram apples's 100
        type: Number,
        min: [0, "PerMain Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high PerMain  Amount"]
    },
    value: { // (Items)
        type: Number,
        min: [0, "Nutrition Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high Unit Descriptive Amount"]
    },
    unit: { // standart measure id preferred
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit"
    },
  
    foodNutrientDerivation: { //USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },
    foodNutrientSource: {//USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },

})

export default nutritionValue