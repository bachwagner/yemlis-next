
import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'

const basefood = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Basefood name is required"],
        minLength: [2, "too short Basefood length"],
        maxLength: [50, "too long Basefood length"],
    },
    name_translate: {
        en: {
            type: String,
            minLength: [2, "too short Basefood Name(Eng) length"],
            maxLength: [50, "too long Basefood Name(Eng)  length"],
        },
        tr: {
            type: String,
            minLength: [2, "too short Basefood Name(Tr) length"],
            maxLength: [50, "too long Basefood Name(Tr) length"],
        },
    },
    foodGroup: { // fruits, vegatables etc
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodGroups"
    },
    categorie: { //scientific
        type: mongoose.Schema.Types.ObjectId,
        ref: "sciCats",
        required: false,
    },
    image: {
        type: String,
        minLength: [5, "too short Basefood Img length"],
        maxLength: [100, "too long Basefood length length"],
    },
    info: {
        type: String,
        minLength: [0, "too short Basefood info length"],
        maxLength: [255, "too long Basefood length length"],
    },
    tags: [String],
    creationInfos,
})


const Basefood = mongoose.models?.Basefood || mongoose.model("Basefood", basefood)
export default Basefood

