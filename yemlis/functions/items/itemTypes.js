import mongoose from 'mongoose'
import ItemTypes from "../../models/items/itemTypes.js";

export async function addItemType({
    name,
    parent,
    children,
    info,
    structureFeature,
    userId }) { // magnesium, vit d, etc  
    const addItem = await ItemTypes.findOneAndUpdate({
        name,
    }, {
        name,
        parent,
        $addToSet: { children },
        info,
        structureFeature,
        creationInfo: { creator: userId }
    }, {
        new: true,
        upsert: true
    })
    if (addItem && parent) {    //add created item's parent's children
        const updateParent = await ItemTypes.findOneAndUpdate({
            _id: parent
        }, {
            $addToSet: { children: addItem._id }
        })
    }
    return addItem
}
export async function addItemTypes(itemTypesObjs) {
    let added = []
    for (const itemType of itemTypesObjs) {
        const add = await addItemType({ ...itemType });
        if (add) added.push(itemType.name)
    }
    return added
}
export async function editChild({ itemType, child, pull }) { //default add or upsert parent,
    const isItemTypeId = mongoose.isValidObjectId(itemType)
    const isChildId = mongoose.isValidObjectId(child)
    const itemTypeFilter = { ...(isItemTypeId ? { _id: itemType } : { name: itemType }) }
    const findItemType = await ItemTypes.findOne(itemTypeFilter)

    if (!findItemType) return "Cannot Find ItemType"
    const parentId = findItemType._id
    let childFilter = { ...(isChildId ? { _id: child } : { name: child }) }
    let childUpdate = { ...(!pull ? { parent: parentId } : { $unset: { parent: "" } }) }
    const findChild = await ItemTypes.findOneAndUpdate(childFilter, childUpdate)

    if (!findChild) return "Child Cannot be Updated Find ItemType"
    const childId = findChild._id
    const updateParent = await ItemTypes.findOneAndUpdate({
        _id: parentId
    }, {
        ...(
            !pull
                ? { $addToSet: { children: childId } }
                : { $pull: { children: childId } })
    })

    if (!updateParent) return "Parent Cannot be Updated Find ItemType"

    return updateParent

}

export async function addItemTypesWithRelations(itemTypesObjs) {

    return ItemTypes
}