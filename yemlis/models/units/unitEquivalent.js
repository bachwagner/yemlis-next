import mongoose,{models} from 'mongoose'
import creationInfos from '../groups/schemas.js'
const UnitEq = new mongoose.Schema({
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit"
    },
    equals: {
        type: Number,
        required: [true, "Unit 'Equals' is required"],
        min: [-100000000000, "too low unit equals"],
        max: [100000000000, "to high unit equals"]
    } 
})
const UnitEquivalent = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Too Short 'unitEquivalent' name"],
        maxLength: [50, "Too Long 'unitEquivalent' name"],
        required: true,
    },
    mainUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit",
        required: [false, "unitEquivalent's `mainUnit` is required"]
    },
    units: [UnitEq],
    creationInfos

})


UnitEquivalent.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};


export default  models?.UnitEquivalent || mongoose.model("UnitEquivalent", UnitEquivalent);