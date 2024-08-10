
import mongoose,{models} from 'mongoose';
const unitEnums = ["time", "energy", "weight", "volume","unit"]
import creationInfos from '../groups/schemas.js'


const unit = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1,"Too Short Unit Name"],
        maxLength: [50,"Too Long Unit Name"],
        required: [true,"Unit Name is Required"],
    },
    abbr:{
        type: String,
        minLength: [1,"Too Short Unit Abbreviation Name"],
        maxLength: [50,"Too Long Unit Abbreviation Name"],
        required: [true,"Unit abbreviation is Required"],
    },
    type: {
        type: String,
        enum: {
            values: unitEnums,
            message:"Wrong Option"

        },
    },
    
   
  /*   mainEquivalent:{// for converting, e.g. for weights kg
        type: mongoose.Schema.Types.ObjectId,
        ref:"Unit"
    }, */
   
    unitEquivalents: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"unitEquivalent"
 
    },
    creationInfos
}
)

 
const Unit = mongoose.models?.Unit || mongoose.model("Unit", unit)
export default Unit