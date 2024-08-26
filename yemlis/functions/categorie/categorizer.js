import mongoose from 'mongoose'
import Categorie from '../../models/groups/categorie.js'
import food from '../../models/foods/food.js'
import categorie from '../../models/groups/categorie.js'
import dish from '../../models/foods/dish.js'

const writeCategories = async (objects, creatorId, isOrdinal) => {
    const categorizationType = isOrdinal ? "ordinal" : "nominal"
    const userId = new mongoose.Types.ObjectId(creatorId)
    let childrenArray = []
    let depth = 0;
    const toObject = (obj, parentId, categorizationType, userId) => {
        const element = {
            _id: new mongoose.Types.ObjectId(),
            parent: parentId,
            categorieType: categorizationType,
            creationInfos: { creator: userId },
            ...obj
        }
        return element
    }
    function getChildren(parentObj) {
        depth++
        const children = parentObj.children
        const parentId = parentObj._id
        if (!parentObj._id) {
            parentObj._id = new mongoose.Types.ObjectId()
        }
        if (children && children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                let element = children[i];
                console.log("elementt parent")
                console.log(parentId)
                const elementToPush = toObject(element, parentId, categorizationType, userId)
                console.log("elementt")
                console.log(elementToPush)
                getChildren(elementToPush)
                //  delete element.children;
                childrenArray.push(elementToPush)
                depth--
            }
        }
    }
    const parentToObj = toObject(objects, undefined, categorizationType, userId)
    console.log("parentToObj")
    console.log(parentToObj)
    getChildren(parentToObj)
    childrenArray.push(parentToObj)
    delete childrenArray.children
    return childrenArray
}
const saveCategories = async (categories) => {

    try {
        for (let i = 0; i < categories.length; i++) {
            const categorie = categories[0]
            const checkAlreadyCreated = await Categorie.findOne({ name: categorie.name, "creationInfos.creator": categorie.creationInfos.creator })

            if (checkAlreadyCreated) {
                console.log("Already Exits with same creator")
            } else {
                const element = categories[i];
                const dietTypes = new Categorie(element)
                await dietTypes.save().then(savedDoc => {
                });
            }

        }
    } catch (error) {
        throw Error("An Error Occured creating new categore")
    }

}
const attachCategorie = async (elementId, categorieId, userId, isDish) => { //element => food or dish
    try {
        const getCategorie = await categorie.findById(categorieId)
        if (!getCategorie) throw new Error("Categorie cannot be found")

        const getElement = !isDish ? await food.findById(elementId)
            : await dish.findById(elementId)
        if (!getElement) throw new Error("Element cannot be found")

        const checkUserOwnerShip = getElement.creationInfos.creator.equals(userId)

        if (!checkUserOwnerShip) throw Error("User and Categorie does not match")
        const addCategorieToElement = !isDish ? await food.findByIdAndUpdate(elementId, { $addToSet: { categories: categorieId } })
            : await dish.findByIdAndUpdate(elementId, { $addToSet: { categories: categorieId } })
        console.log("addCategorieToElement")
        console.log(addCategorieToElement)
        return addCategorieToElement
    } catch (error) {
        console.log(error)
        throw new Error("Attach Categorie Error", error)
    }

}
// detachcategory
const detachcategory = async (elementId, categorieId, userId, isDish) => {
    // TO CONTINUE
}
export { writeCategories, saveCategories, attachCategorie }