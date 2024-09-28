
const mongoose = require('mongoose');
import creationInfos from '../groups/schemas';
const itemTypesEnum = ["element", "compount", "vitamin"]
const item = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 50,
    },
    formula: {
        type: String,
        minLength: 5,
        maxLength: 2,
    },
    itemType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemTypes'
    },
    standartMeasures:
        [{
            unit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "unit"
            },
            isDefault: Boolean
        }],
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