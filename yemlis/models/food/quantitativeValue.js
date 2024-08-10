
import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'
import Quant from '../quantitatives/quantitative.js'

const quantitativeValue = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Quantitative Values name is required"],
        minLength: [2, "too short Quantitative Values length"],
        maxLength: [50, "too long Quantitative Values length"],
    },
    quantitative: { // vita, mg  // will be paired with food's standart measure e.g. 1 gr=>
        type: mongoose.Schema.Types.ObjectId,
        ref: "quant"
    },
    perMain: { // describes 100 gram apples's 100
        type: Number,
        min: [0, "PerMain Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high PerMain  Amount"]
    },
    value: {
        type: Number,
        min: [0, "Quantitative Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high Unit Descriptive Amount"]
    },
    unit: { // standart measure id preferred
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
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


export default quantitativeValue