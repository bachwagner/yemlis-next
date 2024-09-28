"use server"

import { item as itemValidation } from "@/app/lib/validationSchemas"
import { updateItem as updateItemValidation } from "@/app/lib/validationSchemas"
import { deleteItem as deleteItemValidation } from "@/app/lib/validationSchemas"

import { currentUser } from "../auth"
import { revalidateTag } from 'next/cache'
import Item from "@/models/components/item"
import ItemTypes from "@/models/items/itemTypes"


export const createItem = async (values) => {
    const validatedItem = await itemValidation.validateAsync(values)
    if (!validatedItem) return { error: true, message: "Invalid Item Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const isNameExists = await Item.findOne({ name: validatedItem.name })
    if (isNameExists) return { error: true, message: "Item is already exists" }
    const isItemTypeExists = await itemTypes.findOne({ name: validatedItem.itemType })
    console.log("isItemTypeExists")
    console.log(isItemTypeExists)
    if (!isItemTypeExists) return { error: true, message: "ItemType Cannot be Found" }

    let createObj = {
        name: validatedItem.name,
        usdaName: validatedItem.usdaName,
        formula: validatedItem.formula,
        info: validatedItem.info,
        itemType: validatedItem.itemType,
    }
    const create = await Item.create(createObj)
    if (!create) return { error: true, message: "Item Cannot Be Created" }
    console.log("create")
    console.log(create)
    if (create.error) return { error: true, message: create.message }
    revalidateTag('Item')

    return { success: true, message: "Item Saved" }
}
export const updateItem = async (values) => {
    console.log("Update Item")
    console.log(values)

    const validatedItem = await updateItemValidation.validateAsync(values)
    if (!validatedItem) return { error: true, message: "Invalid Update Item Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    let updateObj = {
        name: validatedItem.name,
        usdaName: validatedItem.usdaName,
        formula: validatedItem.formula,
        info: validatedItem.info,
    }

    const isItemExists = await Item.findOne({ name: updateItemValidation.name })
    if (isItemExists) return { error: true, message: "Item is already exists" }
    const findItemType = await ItemTypes.findOne({ name: validatedItem.itemType })
    if (!findItemType) return { error: true, message: "Item Type Cannot be Found" }
    updateObj.itemType=findItemType // ObjID
    const update = await Item.updateOne({ name: updateItemValidation.oldName }, updateObj)
    if (!update) return { error: true, message: "Item Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('Item')
    console.log("Item Updated")
    return { success: true, message: "Item Updated" }
}

export const deleteItem = async (values) => {
    console.log("df item values")
    console.log(values)

    const validatedItem = await deleteItemValidation.validateAsync(values)
    if (!validatedItem) return { error: true, message: "Invalid Items Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: true, message: "Unauthorized" }
    }

    const deleteItem = await Item.findOneAndDelete({
        name: validatedItem.name
    })
    if (!deleteItem) {
        return { error: true, message: "Item Cannot Be Deleted" }
    }
    return { error: false, success: true, message: "Item Deleted Successfully" }


}