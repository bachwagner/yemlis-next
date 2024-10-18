/* const mongoose = require('mongoose');

const measurablesEnum =["energy","Gylcemix Index"]
const measurables = mongoose.Schema({ // energy etc
    name:{
        type:String,
        required: [true, "name is required"],
        minLength: [2, "too short length"],
        maxLength: [50, "too long length"],
        enum:{
            values:measurablesEnum,
            message:"invalid measurables enum"
        }
    },
    unit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit"
    }
    
}) 

const Energy = mongoose.models?.Energy || mongoose.model("Energy", energy)
export default Energy
 */