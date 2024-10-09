
import mongoose,{models} from 'mongoose';
const unitEnums = ["time", "energy", "weight", "volume","unit"]
import creationInfos from '../groups/schemas.js'


const unit = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2,"Too Short Unit Name"],
        maxLength: [50,"Too Long Unit Name"],
        required: [true,"Unit Name is Required"],
    },
    abbr:{
        type: String,
        minLength: [1,"Too Short Unit Abbreviation Name"],
        maxLength: [50,"Too Long Unit Abbreviation Name"],
        required: [true,"Unit abbreviation is Required"],
    },
    unitEquivalents: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"unitEquivalent"
    },
    info: {
        type: String,
        minLength: [2,"Too Short Info"],
        maxLength: [255,"Too Long Info Name"]
    },
    equals: {
        type: Number,
        required: [true, "Unit 'Equals' is required"],
        min: [0, "too low unit equals"],
        max: [100000000000, "to high unit equals"]
    } ,
    creationInfos
}
)

 
const Unit = mongoose.models?.Unit || mongoose.model("Unit", unit)
export default Unit