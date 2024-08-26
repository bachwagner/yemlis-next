import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'
const organisationTypes = ["factory", "catering", "restaurant", "company", "hotel"]
const organisation = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1, "Too Short Organisation Name"],
        maxLength: [50, "Too Long Organisation Name"],
        required: [true, "Organisation Name is Required"],
    },
    isConfirmed: Boolean,
    isVerified:Boolean,
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
        minLength: [1, "Too Short Organisation Info"],
        maxLength: [200, "Too Long Organisation Info"],
    },
    profileLink:{
        type: String,
        minLength: [1, "Too Short profileLink Info"],
        maxLength: [200, "Too Long profileLink Info"],
    },
    organisationType: {
        type: String,
        enum: {
            values: organisationTypes,
            message: "Wrong Organisation Type Option"
        },
    },
    creationInfos
}
)

const Organisation = mongoose.models?.Organisation || mongoose.model("Organisation", organisation)
export default Organisation