
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
        type: mongoose.Types.ObjectId,
        ref: 'ItemTypes'
    },
    creationInfos
}
)
/* item.query.byType = async function (type, limit, pure) { //type:String
    const queryLimit = limit ? limit : 0
    if (pure) {
        return await this.find({ "types.typeName": type }).select('name -_id').limit(queryLimit)

    } else {
        return await this.find({ "types.typeName": type }).limit(queryLimit);

    }
}; */
item.query.byName = async function (name) {
    return await this.where({ name: new RegExp(name, 'i') });
};

export default models?.Item || mongoose.model("Item", item);


/*  const Items = [{
        name: "Magnesium",
        formula: "Mg",
        info: "Common Mg",
        itemType:mineralType,
        userId
    },{
        name: "Potassium",
        formula: "K",
        info: "Common Potassium",
        itemType:mineralType,
        userId
    },{
        name: "Sodium",
        formula: "Na",
        info: "Common Sodium",
        itemType:mineralType,
        userId
    },{
        name: "Manganese",
        formula: "Mn",
        info: "Common Manganese",
        itemType:mineralType,
        userId
    },{
        name: "Nickel",
        formula: "Ni",
        info: "Common Nickel",
        itemType:mineralType,
        userId
    },{
        name: "Copper",
        formula: "Cu",
        info: "Common Copper",
        itemType:mineralType,
        userId
    },{
        name: "Cobalt",
        formula: "Cu",
        info: "Common Cobalt",
        itemType:mineralType,
        userId
    },{
        name: "Zinc",
        formula: "Zn",
        info: "Common Zinc",
        itemType:mineralType,
        userId
    },{
        name: "Iron",
        formula: "Fe",
        info: "Common Iron",
        itemType:mineralType,
        userId
    },{
        name: "Selenium",
        formula: "Se",
        info: "Common Selenium",
        itemType:mineralType,
        userId
    },{
        name: "Floride",
        formula: "Se",
        info: "Common Selenium",
        itemType:mineralType,
        userId
    },{
        name: "Iodine",
        formula: "I",
        info: "Common Iodine",
        itemType:mineralType,
        userId
    },{
        name: "Chrome",
        formula: "Cr",
        info: "Common Chrome",
        itemType:mineralType,
        userId
    },{
        name: "Molybdenum",
        formula: "Mb",
        info: "Common Molybdenum",
        itemType:mineralType,
        userId
    },]
    const addI = await addItems(Items)
    console.log("addI")
    console.log(addI) 
    
        const vitamins = new mongoose.Types.ObjectId("658f090bdb9dd557d9f02a4a")

  const Items = [{
        name: "Thiamin",
        formula: "B1",
        info: "Vitamin B1",
        itemType:vitamins,
        userId
    },{
        name: "Riboflavin",
        formula: "B2",
        info: "Vitamin B2",
        itemType:vitamins,
        userId
    },{
        name: "Niacin",
        formula: "B3",
        info: "Vitamin B3",
        itemType:vitamins,
        userId
    },{
        name: "Pantothenic acid",
        formula: "B5",
        info: "Vitamin B5",
        itemType:vitamins,
        userId
    },{
        name: "Pyridoxine",
        formula: "B6",
        info: "Vitamin B6",
        itemType:vitamins,
        userId
    },{
        name: "Biotin ",
        formula: "B7",
        info: "Vitamin B7",
        itemType:vitamins,
        userId
    },{
        name: "Folate",
        formula: "B9",
        info: "Vitamin B9",
        itemType:vitamins,
        userId
    },{
        name: "Cobalamin",
        formula: "B12",
        info: "Vitamin B9",
        itemType:vitamins,
        userId
    },{
        name: "Vitamin A",
        formula: "VitA",
        info: "Vitamin A",
        itemType:vitamins,
        userId
    },{
        name: "Tocopherol",
        formula: "VitE",
        info: "Vitamin E",
        itemType:vitamins,
        userId
    },{
        name: "Vitamin D",
        formula: "VitD",
        info: "Vitamin D",
        itemType:vitamins,
        userId
    },{
        name: "Vitamin K",  //TODO phylloquinone,Dihydrophylloquinone
        formula: "VitK",
        info: "Vitamin K",
        itemType:vitamins,
        userId
    },]
    
  const Items = [{
        name: "Betaine",
        formula: "C5H11NO2",
        info: "Betaine",
        itemType:organicCompounds,
        userId
    },{
        name: "β Carotene",
        formula:"",
        info: "Beta Carotene, converts into vitamin A",
        itemType:vitamins,
        userId
    },{
        name: "α-Carotene",
        formula:"",
        info: "Alpha Carotene, converts into vitamin A",
        itemType:vitamins,
        userId
    },{
        name: "Cryptoxanthin",
        formula:"",
        info: "Cryptoxanthin, converts into vitamin A",
        itemType:organicCompounds,
        userId
    },{
        name: "Lycopene",
        formula:"",
        info: "Lycopene",
        itemType:organicCompounds,
        userId
    },{
        name: "Lutein",
        formula:"",
        info: "Lycopene",
        itemType:organicCompounds,
        userId
    },{
        name: "Zeaxanthin",
        formula:"",
        info: "Zeaxanthin",
        itemType:organicCompounds,
        userId
    },{
        name: "Vitamin E (alpha-tocopherol)",
        formula:"",
        info: "Vitamin E (alpha-tocopherol)",
        itemType:organicCompounds,
        userId
    },]
    
  const Items = [{
        name: "Mono Unsaturated Fatty Acids",
        info: "Mono Unsaturated Fatty Acids",
        parent:unSaturatedFattyAcids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Poly Unsaturated Fatty Acids",
        info: "Poly Unsaturated Fatty Acids",
        parent:unSaturatedFattyAcids,
        structureFeature: ["Organic"],
        userId
    },{
        name: "Trans Fats",
        info: "Trans Fats",
        parent:lipids,
        structureFeature: ["Organic"],
        userId
    },]
    const addI = await addItemTypes(Items)
    
    const addWater = await addItem({
    name:"Water",
    formula:"H2O",
    info:"Common Water",
    itemType:inorganicCompounds,
    userId
   })
    
   const itemsToAdd = [{
        name: "Glucose",
        formula: "",
        info: "Common Glucose, general or total",
        itemType: "Carbohydrates",
        userId
    }, {
        name: "Fructose",
        formula: "",
        info: "Common Fructose in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Lactose",
        formula: "",
        info: "Common Fructose in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Maltose",
        formula: "",
        info: "Common Maltose in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Galactose",
        formula: "",
        info: "Common Galactose in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Trehalose",
        formula: "",
        info: "Common Trehalose  in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Starch",
        formula: "",
        info: "Common Starch in foods, or total",
        itemType: "Carbohydrates",
        userId
    },{
        name: "Calcium",
        formula: "Ca",
        info: "Common Calcium in foods, or total",
        itemType: "Elements",
        userId
    },]

    const addI = await addItems(itemsToAdd)
    console.log("addI")
    console.log(addI)
   */