

import Quantitative from '../../models/quantitives/quantitative.js'
import QuantitativeTypes from '../../models/quantitives/quantitativeTypes.js'

//adds, update,  Quantitative and QuantitativeType

export async function editQuantitative({
    quantitativeName,
    name,
    info,
    type,
    userId,
    /* removeType  */ }) {  // if types (id) adds it types
    let updateObj = {}

    if (name) updateObj.name = name
    if (info) updateObj.info = info
    if (type) {//type(objId) will add to types
        updateObj.type = type
        /* if (!removeType) {
            updateObj.$addToSet = { types: type }
        }
        else {
            updateObj.$pull = { types: type }
        } */
    }
    if (userId) updateObj.creationInfos = { userId }

    console.log("updateObj")
    console.log(updateObj)
    try {
        const edit = await Quantitative.findOneAndUpdate(
            { name: quantitativeName },
            updateObj,
            { upsert: true })
        return edit

    } catch (error) {
        console.log(error)
    }
}

export async function editQuantitativeType({
    quantitativeTypeName,
    name,
    parent,
    children,
    info,
    userId,
    removeChildren }) {
    let updateObj = {}
    if (name) updateObj.name = name
    if (parent) updateObj.parent = parent
    if (children) {
        if (!removeChildren) {
            updateObj.$addToSet = { children }
        } else {
            updateObj.$pull = { children }

        }
    }
    if (info) updateObj.info = info
    if (userId) updateObj.creationInfos = { userId }
    try {
        const add = await QuantitativeTypes.findOneAndUpdate(
            { name: quantitativeTypeName },
            updateObj,
            { upsert: true })
        return add

    } catch (error) {
        console.log(error)
    }

}

export default { editQuantitative, editQuantitativeType }

/* const editQ = await editQuantitative({
        quantitativeName: "calorie",
        name: "calorie", 
        info: "its a common calorie",
        type:quantitativeType,
        removeChildren:false,

        userId

         
    })
    console.log("editQ")
    console.log(editQ)  */

     /*  const addQuantitiveType = await editQuantitativeType({
        quantitativeTypeName:"potantialofhydrogen",
        name:"potantialofhydrogen",
        info:"ph",
        userId:userId 
     }) */