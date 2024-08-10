
import mongoose from 'mongoose';
const dishEnums = ["meat", "vegetables", "soup", "pilaff", "drink", "salad", "bread", "snack", "dessert", "bean", "other"]
const shareTypes = ["public", "followers", "private"]
const dishOrigin = ["recipe", "product", "catering", "homemade"]
const humanHealthEffectEnums = ["healthy", "neutral", "notHealthy", "harmful", "toxic"]
import nutritionValue from './nutritionValue.js'
import quantitativeValue from './quantitativeValue.js';
import creationInfos from '../groups/schemas.js'


const dish = new mongoose.Schema({
    name: {
        type: String,
        minLength: [1, "Too Short Dish Name"],
        maxLength: [50, "Too Long Dish Name"],
        required: [true, "Dish Name is Required"],
    },
    type: {
        type: String,
        enum: {
            values: dishEnums,
            message: "Wrong Option"
        },
    },
    shareType: {
        type: String,
        enum: {
            values: shareTypes,
            message: "Wrong Share Type Option"
        },
    },
    isAccepted: Boolean,
    origin: {
        type: String,
        enum: {
            values: dishOrigin,
            message: "Wrong Dish Type Option"
        },
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    recipeInfo:{
        cookingTime:{
            type:Number,
            min:0,
            max:1000
        },
        portionSize:{
            type:Number,
            min:0,
            max:100
        }
    },
    isCustomValues: Boolean,
    nutritionInfo: {
        humanHealthEffect: {
            type: String,
            enum: {
                values: humanHealthEffectEnums,
                message: "Wrong Human Health Effect Enums Option"
            },
        },
    },
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    }],
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
    quantitativeValues: [quantitativeValue], //define if customValues = true
    nutritionValues: [nutritionValue],//define if customValues = true
    ingredients: [{
        foodType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food"
        },
        amount: {
            type: Number,
            min: [0, "Food  Amount Cannot Be Less Than 0"],
            max: [999999999, "Too High Food  Amount"]
        }
    }],

    creationInfos
}
)
//TO CONTINUE
dish.query.getValues = async function (dishId) {
    const selectFields = "-_id "
    return await this.findOne(
        { _id: dishId })
        .populate({
            path: "ingredients",
            model: "Dishs",
            select: "-_id",
            populate: [{
                path: "foodType",
                model: 'food',
                select: "-_id",
                populate: [{
                    path: 'nutritionValues.nutrient',
                    model: "Item",
                    select: "-id"
                },{
                    path: 'nutritionValues.unit',
                    model: "Unit",
                    select: "-id"
                },{
                    path: 'quantitativeValues.quantitative',
                    model: "Item",
                    select: "-id"
                },{
                    path: 'quantitativeValues.unit',
                    model: "Unit",
                    select: "-id"
                }]
            },
            /*  {
                path: "unit",
                model: 'Unit',
                select: '-_id',
                 populate: [{
                    path: "unitEquivalents",
                    model: 'UnitEquivalent',
                    select: '-_id',
                }] 
            } */],
        })
        .populate({
            path: "nutritionValues",
            model: "Dish",
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
            model: "Dish",
            select: "-_id",
            populate: [{
                path: "quantitative",
                model: 'Quant',
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

        .select("-_id -creationInfos")
};

dish.query.getDish = async function (dishId) {
    return await this.findOne(
        { _id: dishId })
        .populate({
            path: "ingredients",
            model: "Dishs",
            select: "-_id",
            populate: [{
                path: "foodType",
                model: 'food',
                select: "-_id"
            }, {
                path: "unit",
                model: 'Unit',
                select: '-_id'
            }],
        })
};


const Dish = mongoose.models?.Dish || mongoose.model("Dish", dish)
export default Dish