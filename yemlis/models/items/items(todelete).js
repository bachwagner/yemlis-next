/* 
import mongoose from 'mongoose';
import creationInfos from '../groups/schemas.js'

const item = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1, "Too Short Item Name"],
        maxLength: [50, "Too Long Item Name"],
        required: [true, "Item Name is Required"],
    },
    usdaName:{
        type: String,
        minLength: [1, "Too Short Usda Name"],
        maxLength: [50, "Too Long Usda Name"],
    },
    formula: {
        type: String,
        minLength: [1, "Too Short Item Formula "],
        maxLength: [50, "Too Long Item Formula "],
    },
    info: {
        type: String,
        minLength: [1, "Too Short Item Info Name"],
        maxLength: [200, "Too Long Item Info Name"],
    },
    itemType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemTypes'
    },
    creationInfos
}
)
 item.query.byType = async function (type, limit, pure) { //type:String
    const queryLimit = limit ? limit : 0
    if (pure) {
        return await this.find({ "types.typeName": type }).select('name -_id').limit(queryLimit)

    } else {
        return await this.find({ "types.typeName": type }).limit(queryLimit);

    }
}; 
item.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};


const Item = mongoose.models?.Item || mongoose.model("Item", item)
export default Item
 */