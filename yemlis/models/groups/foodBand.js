import mongoose from 'mongoose'

import creationInfos from './schemas.js'

const FoodBands = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1, 'too short foodBand name'],
        maxLength: [80, 'too long foodBand name']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bandType: {
        type: String,
        enum: {
            values: ["public", "private"],
            message: "Wrong foodBand Type"
        }
    },
    // TODO forbidden groups, categories
    tags: {
        type: [String],
        maxLength: [30, "too many FoodBands tags"]
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodBands' }],
    creationInfos

})

export default mongoose.models?.FoodBands || mongoose.model('FoodBands', FoodBands)


