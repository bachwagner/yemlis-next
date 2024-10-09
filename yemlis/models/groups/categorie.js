import mongoose from 'mongoose'
import creationInfos from './schemas.js'
const categorieTypeEnums = ["ordinal", "nominal"]
//WORKS
const categorie = mongoose.Schema({ //String focused 
    name: {  // tree shape,age range, diseases, allergies, nutrition types("vegan",""vegetarian","helal"), will be helpful filtering suitable foods
        type: 'string', //adult, vegan
        required: [true, "categorie values Name is required"],
        minLength: [2, "too short length", "too short categorie name"],
        maxLength: [50, "too long length", "too long categorie name"],

    },
    info: {  // tree shape,age range, diseases, allergies, nutrition types("vegan",""vegetarian","helal"),
        type: 'string', //adult, vegan
        required: [true, "categorie info is required"],
        minLength: [2, "too short length", "too short categorie info"],
        maxLength: [255, "too long length", "too long categorie info"],

    },
    categorieId: {
        type: Number,
        min: 0,
        max: 255,
        //  required:[true,"got {VALUE}"]
    },
    parent: { // age=> adult, nutritionTypes =>vegan, pesketaryen => peskePesketeryan  age => 0-6 month (ordinal)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
    },
    categorieType: {  // nominal,ordinal  
        type: String,
        enum: {
            values: categorieTypeEnums,
            message: "Unvalid categorieType Enum"
        }
    },
    creationInfos,
    rules: {
        tagable: Boolean, // can be add as tag eg.  , it's not a general title like "diet styles"
        forbiddenGroups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodGroups",
        }],
        forbiddenCategories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categorie",
        }],
        requiredGroups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodGroups",
        }],
        requiredCategories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categorie",
        }],
    },

    img: {
        type: 'string', //adult, vegan
        minLength: [2, "too short length", "too short categorie name"],
        maxLength: [255, "too long length", "too long categorie name"],
    }
})

// All -Age
// Infants => sub categorie 
// group=Z categorie =>range(month, year)(scale), group(sex, level)(nominal)


// childs => scale?, nominal, ordinal,
// Main Categorie=> Age
//ordinal

categorie.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};
//find by categories   category:"division" => gets divisions 
//pure=> return just name


categorie.query.getParents = async function (name, pure) {
    // const categorie = await this.findOne({name})
    let parents = []
    const model = this.model
    const categoryObj = await model.findOne({ name }).populate('parent')
    parents.push(categoryObj.parent.name)

    async function getParents(categoryObj, pure) {
        console.log("finding parent")
        console.log(categoryObj.parent.name)
        const parent = await model.findOne({ name: categoryObj.parent.name }).populate('parent')
        if (parent.parent) {
            parents.push(parent?.parent?.name)
            await getParents(parent)
        } else {
            console.log("no more parents")
            return parent
        }
    }

    if (categoryObj.parent) {
        await getParents(categoryObj)
    } else {
        return []

    }

    return parents


};

categorie.query.getChildren = async function (name, limit, pure) {
    const model = this.model
    const categoryObj = await model.findOne({ name }) // this.model part is to prevent  "Query was already executed: sciCat.find({"" error
    const setLimit = limit ? limit : 0
    const setSelect = pure ? 'name -_id' : ''
    async function getChildren() {
        if (categoryObj) {
            const children = await model.find({ parent: new ObjectId(categoryObj._id) }).select(setSelect).limit(setLimit)
            return children
        } else {
            console.log("no child")
            return []
        }
    }
    return await getChildren()
}
/* categorie.methods.findSimilarTypes = async function () {
    const similars = await mongoose.model('sciCat').find({ category: this.category });
    console.log("methods")

    return similars
}; */

const Categorie = mongoose.models?.Categorie || mongoose.model("Categorie", categorie)
export default Categorie
