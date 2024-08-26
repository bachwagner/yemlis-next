
import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'


const text = new mongoose.Schema({
    original: {
        type: String,
        minLength: [2, "too short food text original language length"],
        maxLength: [20, "too long food text original language length"]
    },
    tr: {
        type: String,
        minLength: [2, "too short food text length"],
        maxLength: [1000, "too long food text length"]
    },
    en:{
        type: String,
        minLength: [2, "too short food text length"],
        maxLength: [1000, "too long food text length"]
    },
    ru:{
        type: String,
        minLength: [2, "too short food text length"],
        maxLength: [1000, "too long food text length"]
    },


})

export default text