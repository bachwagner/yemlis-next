
import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'

const quantitativeTypes = new mongoose.Schema({
    name: { // Energy, glycemix index title
        type: String,
        minLength: [1, "Too Short Quantitative Types Type Name"],
        maxLength: [50, "Too Long Quantitative Types Type Name"],
        required: [true, "QuantitativeTypes Type Name is Required"],
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'quantitativeTypes'
    },
    children: [{
        type: mongoose.Types.ObjectId,
        ref: 'quantitativeTypes'
    }],
    info: {
        type: String,
        minLength: [1, "Too Short Quantitative Types Type Info "],
        maxLength: [200, "Too Long Quantitative Types Type Info"],
    },
    creationInfos
}
)

export default mongoose.model("quantitativeTypes", quantitativeTypes);