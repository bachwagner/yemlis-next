
const mongoose = require('mongoose');

const itemTypesEnum = ["element","compount","vitamin"]
const item = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 50,
    },
    /* itemType:{
        name: String,
        enum:{
            values:itemTypesEnum,
            message:"Invalid item type"
        }
    }, */
    formula: {
        type: String,
        minLength: 5,
        maxLength: 2,
    },
    image: {
        type: String,
        minLength: 5,
        maxLength: 60,
    },
    standartMeasures:
        [{
            unit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "unit"
            },
            isDefault: Boolean
        }],
    nutritionInfos: [  //for additional nutritional Infos
        {
            nutritionInfo: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"NutritionInfo",
                isMain: Boolean,

            }
        }

    ],
    tags: [String],
    description: {
        type: String,
        minLength: 1,
        maxLength: 400
    }

}
)

const Item = mongoose.models?.Item || mongoose.model("Item", item)
export default Item
