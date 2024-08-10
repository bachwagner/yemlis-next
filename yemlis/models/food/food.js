
import creationInfos from '../groups/schemas.js'
import mongoose from 'mongoose'
import nutritionValue from './nutritionValue.js'
import quantitativeValue from './quantitativeValue.js'
const humanHealthEffectEnums = ["healthy", "neutral", "notHealthy", "harmful", "toxic"]
const sourceTypeEnums = ["user", "institution", "person", "link"]

const food = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "food name is required"],
        minLength: [2, "too short food length"],
        maxLength: [50, "too long food length"],
    },
    name_translate: {
        en: {
            type: String,
            minLength: [2, "too short Food Name(Eng) length"],
            maxLength: [50, "too long Food Name(Eng)  length"],
        },
        tr: {
            type: String,
            minLength: [2, "too short Food Name(Tr) length"],
            maxLength: [50, "too long Food Name(Tr) length"],
        },
    },
    foodGroup: { // fruits, vegatables etc
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodGroups"
    },
    categorie: { //scientific
        type: mongoose.Schema.Types.ObjectId,
        ref: "sciCats",
        required: false,
    },
    image: {
        type: String,
        minLength: 5,
        maxLength: 60,
    },
    standartMeasure: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit"
    },
    foodPortions: [
        {
            modifier: {
                type: String,
                minLength: 1,
                maxLength: 128
            },
            gramWeight: {
                type: Number,
                min: 0,
                max: 99999
            },
            sequenceNumber: {
                type: Number,
                min: 0,
                max: 99
            },
        }
    ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
    }],
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation"
    },
    source: {
        sourceType: {
            type: String,
            enum: {
                values: sourceTypeEnums,
                message: "Wrong Source Type Option"
            },
        }
    },
    nutritionInfo: {
        humanHealthEffect: {
            type: String,
            enum: {
                values: humanHealthEffectEnums,
                message: "Wrong Human Health Effect Enums Option"
            },
        },
    },
    tags: [String],
    description: {
        type: String,
        minLength: 1,
        maxLength: 400
    },
    nutritionValues: [nutritionValue], // magnessium  5 mg
    quantitativeValues: [quantitativeValue], // energy 100 kcal
    creationInfos,
    likes: [mongoose.Schema.Types.ObjectId]
})

//find by name  
food.query.byName = async function (name) {
    return await this.find({ name: new RegExp(name, 'i') }).select("name");
};
//
//pure=> return just name

food.query.getValues = async function (foodId) {
    const selectFields = "-_id "

    return await this.findOne(
        { _id: foodId })
        .populate({
            path: "nutritionValues",
            model: "Food",
            select: "-_id",
            populate: [{
                path: "nutrient",
                model: 'Item',
                select: "-_id"
            }, {
                path: "unit",
                model: 'Unit',
                select: '-_id',
                populate: [{
                    path: "unitEquivalents",
                    model: 'UnitEquivalent',
                    select: '-_id',
                }]
            }],
        })
        .populate({
            path: "quantitativeValues",
            model: "Food",
            select: "-_id",
            populate: [{
                path: "quantitative",
                model: 'Quantitative',
                select: "-_id "
            }, {
                path: "unit",
                model: 'Unit',
                select: '-_id',
                populate: [{
                    path: "unitEquivalents",
                    model: 'UnitEquivalent',
                    select: '-_id ',
                }]
            }],
        })
        .populate({ path: 'organisation', model: 'Organisation', select: selectFields })
        .populate({ path: 'standartMeasure', model: 'Unit', select: selectFields })
        .select("-_id -creationInfos")
};

food.query.getFood = async function (foodId) {
    return await this.findOne(
        { _id: foodId })
        .populate({
            path: "nutritionValues",
            model: "Foods",
            select: "-_id",
            populate: [{
                path: "nutrient",
                model: 'Item',
                select: "-_id"
            }, {
                path: "unit",
                model: 'Unit',
                select: '-_id'
            }],
        })
};
//    return await this.findOne({ _id: foodId }).populate({path:"nutritionValues", populate:[{path:"nutrient",model:'Item'},{path:"unit",model:'Unit'}]}).select('-_id')



/* food.methods.findSimilarTypes = async function (foodObj) {
    const category=foodObj.categorie
    const foodGroup=foodObj.foodgroup
    //TODO
    //similar category, similar foodgroup
    const similars = await mongoose.model('sciCat').find({ category: this.category });
    console.log("methods")

    return similars
} */


const Food = mongoose.models?.Food || mongoose.model("Food", food)
export default Food

/* const nutritionValue = new mongoose.Schema({ 
    name: { 
        type: String,
        minLength: [2, "too short Nutrition Values length"],
        maxLength: [50, "too long Nutrition Values length"], 
    },

    nutrient: { // vita, mg  // will be paired with food's standart measure e.g. 1 gr=>
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items"
    },
    perMain: { // describes 100 gram apples's 100
        type: Number,
        min: [0, "PerMain Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high PerMain  Amount"]
    },
    value: { // (Items)
        type: Number,
        min: [0, "Nutrition Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high Unit Descriptive Amount"]
    },
    unit: { // standart measure id preferred
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    },
 
    foodNutrientDerivation: { //USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },
    foodNutrientSource: {//USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },

})
 */


/* const quantitativeValue = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Quantitative Values name is required"],
        minLength: [2, "too short Quantitative Values length"],
        maxLength: [50, "too long Quantitative Values length"],
    },
    quantitative: { // vita, mg  // will be paired with food's standart measure e.g. 1 gr=>
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quantitative"
    },
    perMain: { // describes 100 gram apples's 100
        type: Number,
        min: [0, "PerMain Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high PerMain  Amount"]
    },
    value: {
        type: Number,
        min: [0, "Quantitative Value Amount Cannot Be Less Than 0"],
        max: [999999999, "Too high Unit Descriptive Amount"]
    },
    unit: { // standart measure id preferred
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit"
    },
    
    foodNutrientDerivation: { //USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },
    foodNutrientSource: {//USDA
        type: String,
        minLength: 1,
        maxLength: 255,
    },
}) */
