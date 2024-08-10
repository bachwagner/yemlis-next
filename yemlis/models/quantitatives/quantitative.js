
import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'
const itemEnums = ["organic", "inorganic"]
const categories = ["element", "compound", "vitamin", "mineral"]


const quantitative = new mongoose.Schema({  //kalori glycemix index
    name: {
        type: String,
        minLength: [1, "Too Short Quantitative Name"],
        maxLength: [50, "Too Long Quantitative Name"],
        required: [true, "Quantitative Name is Required"],
    },

    info: {
        type: String,
        minLength: [1, "Too Short Quantitative Info Name"],
        maxLength: [200, "Too Long Quantitative Info Name"],
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quantitativeTypes'
    },

    creationInfos
}
)
quantitative.query.byType = async function (type, limit, pure) { //type:String
    const queryLimit = limit ? limit : 0
    if (pure) {
        return await this.find({ "types.typeName": type }).select('name -_id').limit(queryLimit)

    } else {
        return await this.find({ "types.typeName": type }).limit(queryLimit);

    }
};
 
const Quantitative = mongoose.models?.Quantitative || mongoose.model("Quantitative", quantitative)
export default Quantitative

/*    const editQ = await editQuantitative({
        quantitativeName: "Glycemix Index",
        name: "Glycemix Index",
        info: "Its a common Glycemix Index",
        type: bloodglucoseeffects,
        userId, 

    }) 
     const editQQ = await editQuantitative({
        quantitativeName: "calorie",
        type: bloodglucoseeffects, 
          
 
    }) 
    console.log("editQQ") 
    console.log(editQQ)

    const editQT = await editQuantitativeType({
        quantitativeTypeName: "Blood Glucose Effects",
        name: "Blood Glucose Effects",
        info: "Blood Glucose Effects, rising scores, glicemix index, load",
        children:quantitativeType,
        removeChildren:false
    })
    console.log("addQT")
    console.log(editQT)  */