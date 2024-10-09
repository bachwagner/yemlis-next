const mongoose = require('mongoose');
import creationInfos from '../groups/schemas';
const itemTypesEnum = ["element", "compount", "vitamin"]
const item = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
    },
    usdaName: {
        type: String,
        minLength: [2, "Too Short Usda Name"],
        maxLength: [50, "Too Long Usda Name"],
    },
    formula: {
        type: String,
        minLength: 2,
        maxLength: 50,
    },
    itemType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemTypes',
        minLength: 2,
        maxLength: 50,
    },
    mainUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        minLength: 2,
        maxLength: 50,
    },
    standartMeasures:[{ type: mongoose.Schema.Types.ObjectId, ref: "UnitEquivalent" }],
    info: {
        type: String,
        minLength: [1, "Too Short Item Info Name"],
        maxLength: [200, "Too Long Item Info Name"],
    },
    creationInfos

}
)

item.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};


const Item = mongoose.models?.Item || mongoose.model("Item", item)
export default Item