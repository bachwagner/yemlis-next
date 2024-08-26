import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'
import Organisation from '../organisations/organisations.js'


const manufacturer = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "too short food text original language length"],
        maxLength: [20, "too long food text original language length"]
    },
    organisation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation"
    }, // if its choosen it means food added by organisation and provided link, verified etc. on food page

})

export default manufacturer