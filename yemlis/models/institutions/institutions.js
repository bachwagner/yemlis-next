import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'
const institutionTypes = ["government","foundation","university","others"]
const institution = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1, "Too Short Institution Name"],
        maxLength: [50, "Too Long Institution Name"],
        required: [true, "Institution Name is Required"],
    },
    website: {
        type: String,
        minLength: [1, "Too Short Website Adress"],
        maxLength: [200, "Too Long Website Adress"],
    },
    address: {
        type: String,
        minLength: [1, "Too Short Adress"],
        maxLength: [200, "Too Long Adress"],
    },
    info: {
        type: String,
        minLength: [1, "Too Short Institution Info"],
        maxLength: [200, "Too Long Institution Info"],
    },
    institutionType: {
        type: String,
            enum: {
                values: institutionTypes,
                message: "Wrong Institution Type Option"
            },
    },
    creationInfos
}
)

export default mongoose.model("Institution", institution);
