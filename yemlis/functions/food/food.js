import mongoose from 'mongoose'  //TO DELETE
import Food from '../../models/foods/food.js'
import Unit from '../../models/units/unit.js'
import Items from '../../models/items/items(todelete).js'
import Quantitative from '../../models/quantitives/quantitative.js'

function adjustNutrientsTo100(nutrients, defaultPortionWeight) {


    const portionScale = (defaultPortionWeight / 100).toFixed(3)  //   x times 100 gram
    console.log("portionScale for food")
    console.log(portionScale)
    const adjustedNutrients = nutrients.map(nutrient => {
        if(nutrient.name==="Glycemix Index") return nutrient
        return ({
            ...nutrient,
            amount: (nutrient.value / portionScale).toFixed(3)
        })
    }
    )
    return adjustedNutrients
}
function adjustPortions(portions) {
    let modifiedFoodPortions = [...portions.filter(fp => fp.modifier !== "100 gram")]
    modifiedFoodPortions.unshift({ modifier: "100 gram", gramWeight: 100 })
    console.log("modifiedFoodPortions")
    console.log(modifiedFoodPortions)
    return modifiedFoodPortions

}

export async function addFood({ // for upsert id is required
    id,
    name,
    foodGroup, // citrus
    categorie, //scicats
    categories, // vegan helal etc
    image,
    standartMeasure, //gram
    uad,
    foodPortions,  //modifier, gramWeight, sequenceNumber
    organisation,
    humanHealthEffect, //in nutritionInfo
    tags,
    description,
    nutritionValues, //createNutritionValue name nutrient value unit descriptives
    quantitativeValues, // createQuantitativeValue name nutrient value unit descriptives
    source,
    userId }) {
    try {
        const checkSameUserFoodName = await Food.findOne({
            name: name,
            'creationInfos.creator': userId
        })
        if (checkSameUserFoodName) throw Error('Same User created a food with same name')
        const modifiedFoodPortions = adjustPortions(foodPortions)
        const modifiedNutritionValues = adjustNutrientsTo100(nutritionValues,"1 Crap")
        const modifiedquantitativeValues = adjustNutrientsTo100(quantitativeValues)
        const addFood = await Food.findOneAndUpdate(
            { _id: id ? id : new mongoose.Types.ObjectId(), 'creationInfos.creator': userId }, {
            name,
            foodGroup,
            categorie,
            categories:categories?categories:[],
            image,
            standartMeasure,
            uad,
            foodPortions: modifiedFoodPortions,
            organisation,
            nutritionInfo: { humanHealthEffect },
            tags,
            description,
            nutritionValues: modifiedNutritionValues,
            quantitativeValues: modifiedquantitativeValues,
            source,
            creationInfos: { creator: userId }

        }, { upsert: true })

        return addFood
    } catch (error) {
        return error
    }

}
export function createNutritionValue({ name, value, unit, nutrient }) {  //creates nutritionValue object
    let nutritionValue = {
        name,
        nutrient,
        perMain,
        value,
        unit
        
    }
    return nutritionValue
}
export function createQuantitativeValue({ name, value, unit, quantitative }) {  //creates nutritionValue object
    let nutritionValue = {
        name,
        quantitative,
        value,
        unit
        
    }
    return nutritionValue
}
export async function addValue({
    foodId,
    perMain,
    value,
    unit,
    property,  //must be either nutrientId or quantitive ID
    isQuantitive,
    pull       //if true removes value

}) { //add nutrient e.g. mg or quantitative e.g. calorie //name is not required // 5 gram magnesium  
    //permain is e.g. 100 gr apples, means "100"
    //add nutrient(mg,ca) or descriptives(cal,GI)
    //if not ids, accepts string and search it
    // foodId must be id

    try {
        //if descripttives(1 small size) provided it must be added to uad(unit and descriptives)
        let propertyObj = { perMain, value } // nutrient or quantitive(cal etc)
        const food = await Food.findOne({ _id: foodId })

        if (!food) throw new Error("Food Cannot Be Found")
        const isFoodId = mongoose.isValidObjectId(foodId)
        if (!isFoodId) throw new Error("Invalid Food ID")
        const isUnitId = mongoose.isValidObjectId(unit)
        if (isUnitId) {
            propertyObj.unit = unit
        } else {
            const getUnit = await Unit.findOne({ name: unit })
            const unitId = getUnit._id
            propertyObj.unit = unitId
        }
        const isPropertyId = mongoose.isValidObjectId(property) // get id or string
        if (!isQuantitive && isPropertyId) { //is nutrient and id defined, dont search by name
            propertyObj.nutrient = property
        } else if (!isQuantitive && !isPropertyId) {
            console.log("propertyy")
            console.log(property)
            const getNutrient = await Items.findOne({ name: property }) //is nutrient and id is no defined, search by name, propertyId is name
            const nutrientId = getNutrient._id
            propertyObj.nutrient = nutrientId
        } else if (isQuantitive && isPropertyId) { //is quantative (gi etc) and id defined, dont search by name
            propertyObj.quantitative = property
        } else { //is quantative (gi,calorie, etc) and id is no defined, search by name, foodId is name
            const getQuantative = await Quantitative.findOne({ name: property }) //is nutrient and id is no defined, search by name, propertyId is name
            const quantitiveId = getQuantative._id
            propertyObj.quantitative = quantitiveId
        }
        console.log("property objj")
        console.log(propertyObj)
        const propertyId = isPropertyId ? property  // nutrient or quantitive id
            : propertyObj.nutrient ? propertyObj.nutrient
                : propertyObj.quantitative ? propertyObj.quantitative
                    : property

        let filterProperty = { _id: foodId }  //nutrient(nutrition) values or quantitives(quantitativeValues)
        filterProperty[!isQuantitive ? 'nutritionValues.nutrient' : 'quantitativeValues.quantitative'] = { $ne: propertyId }
        let updateProperty = {
            $addToSet: { ...(!isQuantitive ? { nutritionValues: propertyObj } : { quantitativeValues: propertyObj }) }
        }
        /* console.log("filterProperty")
        console.log(filterProperty)
        console.log("updateProperty") 
        console.log(updateProperty) */


        const add = await Food.findOneAndUpdate(
            filterProperty,
            updateProperty,
            { new: true }
        )
        console.log("update")
        console.log(updateProperty)
        console.log("addaddadd")
        console.log(add)
        if (add === null) { //not added, already exist, should be updated
            let filter = { _id: foodId }
            filter[!isQuantitive ? "nutritionValues.nutrient" : "quantitativeValues.quantitative"] = propertyId
            let update = !pull ? {
                $set: { ...(!isQuantitive ? { "nutritionValues.$": propertyObj } : { "quantitativeValues.$": propertyObj }) }
            } : {
                $pull: { ...(!isQuantitive ? { "nutritionValues": { nutrient: propertyId } } : { "quantitativeValues.quantitative": propertyId }) }
            }

            const updateProperty = await Food.findOneAndUpdate(
                filter,
                update,
                { new: true }
            )
            console.log("updatePropertyupdateProperty")
            console.log(updateProperty)
            return updateProperty

        }
        return add

    } catch (error) {
        console.log(error)
        return null
    }
}
export async function addBulkValue(foodId, values) {
    let added = []

    for (const value of values) {
        console.log("value");
        console.log(value)
        const add = await addValue({ foodId, ...value });
        if (add) added.push(value.property)
    }
    return added

}
export async function editFood() { //id is necessary
    let args = { ...arguments[0] }
    if (args.userId) args.creationInfos = args.userId
    if (args.nutritionInfo) args.nutritionInfo = { humanHealthEffect: args.humanHealthEffect }

    delete args.humanHealthEffect
    delete args.userId
    console.log("args")
    console.log(args)

    try {
        const editFood = await Food.findOneAndUpdate(
            { _id: args.id },
            args,
            { upsert: true })

        return editFood
    } catch (error) {
        console.log(error)
        return error
    }

}

export async function deleteFood(foodId) {
    const del = await Food.deleteOne({ _id: foodId })
    console.log(del)
    return del
}
export default {
    addFood,
    deleteFood,
    createNutritionValue,
    createQuantitativeValue,
    addValue,
    editFood,
    addBulkValue

}

// QUERIES
//ADD FOOD
/*  const foodObj = {
    name:"garavolli",
    foodGroup:mollusks,
    categorie:animals,
    image:"snails.jpg",
    standartMeasure:unitGram,
    foodPortions:{
        modifier:"1 snail",
        gramWeight:40,
        sequenceNumber:1
    },
    nutritionInfo:{
        humanHealthEffect:"neutral"
    },
    tags:['snail','snails','salyangoz','garavolli'],
    description:'common garavolli, yum yum yum',
    nutritionValues:[{
        name:"Protein",
        nutrient:proteins,
        perMain:100,
        value:22,
        unit:unitGram,

    }],
    quantitativeValues:[{
        name:"Calorie",
        quantitative:quantitativeCal,
        perMain:100,
        value:69,
        unit:energyUnitCal,
    },
        {
        name:"Glycemix Index",
        quantitative:GI,
        perMain:100,
        value:12,
        unit:GIUnit,
    }],
    source:"user",
    userId
}
const createFood = await addFood(foodObj)
console.log("createFood")
console.log(createFood)
EDIT FOOD
 const editFoodd = await editFood({id:"65f1ca5e8ea05a06ec3d3317",name:"garavolliii"})
    const gvl = await Food.findOne({name:"garavolli"})
    console.log("editFoodd")
    console.log(editFoodd)

DELETE FOOD
    const del = await deleteFood("65f81c19b3e22709052293fe")

     // const allNutrients = await getAllNutrient()
    // console.log("ALL Nutrients")
    // await writeNutrients(allNutrients);
    //const getItem = await Items.find().byName("Pyruvic")
    // console.log("get item")
    //  console.log(getItem)


    //const usda = createUsda(allNutrients)
    //console.log("usda")
    //const addI = await addItems(usda)


    /*  const addIType = addItemType({
         name:"Carotenoids", parent:organicCompounds, info:"Common Carotenoids", structureFeature:["Organic"], userId
     }) */


/*   const addITAlkaloid= await addItemType({
    name:"Undetermined",
    info:"Undetermined",
    structureFeature:"Undetermined",
    userId
 })   */

/* const addI = await addItem({
    name: "Fatty acids, total saturated",
    formula: "",
    info: "Common Fatty acids, total saturated",
    itemType: "Saturated Faty Acids",
    userId
},) */


//  const addBulk = await addBulkValue(pearId, nValues)
/*  const foodx = await addFood({
    name: "Milk",
    foodGroup: foodgroup,
    categorie: categorieMagnoliopsida,
    image: "//:image/pears",
    standartMeasure: gr,
    uad: [{ descriptive: onesmallsize, amount: 105 }],
    humanHealthEffect: "healthy",
    tags: ["pear", "fruit"],
    description: "common pear",
    nutritionValues: nValues,
    quantitativeValues: qValues,
    userId
})
console.log("foodx")
console.log(foodx)  */

/*  const addUnit = await createUnit({
     name: "Vitamin D mcg",
     abbr: "Vit D mcg",
     type: "weight",
     unitEquivalents: vitdEquivalent,
     equals: 0.025,
     userId
 
 
 
 }) */

/*   const addV = await addValue({
       foodId: food, 
       perMain: 100,
       value: 20,
       unit: mg,
       property:copper,
       pull:false, 
   }) */


