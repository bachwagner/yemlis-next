"use server"

import { item as itemValidation } from "@/app/lib/validationSchemas"
import { updateItem as updateItemValidation } from "@/app/lib/validationSchemas"
import { deleteItem as deleteItemValidation } from "@/app/lib/validationSchemas"

import { currentUser } from "../auth"
import { revalidateTag } from 'next/cache'
import Item from "@/models/components/item"
import ItemTypes from "@/models/items/itemTypes"
import Unit from "@/models/units/unit"
import UnitEquivalent from "@/models/units/unitEquivalent"


export const createItem = async (values) => {
    const validatedFields = await itemValidation.validateAsync(values)
    if (!validatedFields) return { error: true, message: "Invalid Item Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const isNameExists = await Item.findOne({ name: validatedFields.name })
    if (isNameExists) return { error: true, message: "Item is already exists" }

    const isItemTypeExists = await ItemTypes.findOne({ name: validatedFields.itemType })
    if (!isItemTypeExists) return { error: true, message: "ItemType Cannot be Found" }

    const isUnitExists = await Unit.findOne({ name: validatedFields.mainUnit })
    if (!isUnitExists) return { error: true, message: "Unit Cannot be Found" }
    let unitEQIDS = []

    for await (const validatedField of validatedFields.measureUnits) {
        const findMeasuredUnit = await UnitEquivalent.findOne({ name: validatedField })
        if (!findMeasuredUnit) return { error: true, message: "Unit Type (Unit Equivalent) Cannot be Found" }
        console.log("findMeasuredUnit push")
        unitEQIDS.push(findMeasuredUnit._id)
        console.log(findMeasuredUnit._id)
    }
    console.log("unitEQIDS")
    console.log(unitEQIDS)
    // IS MAIN UNIT CHILDREN OF UNIT EQUIVALENT
    const unitsUnitEquivalent = isUnitExists.unitEquivalents
    console.log("unitsUnitEquivalent")
    console.log(unitsUnitEquivalent)
    const isUnitChild = unitEQIDS.find((ueid) => String(ueid) === String(unitsUnitEquivalent))  // unit, unitEQ'lerin child'ı mı
    console.log("isUnitChild")
    console.log(isUnitChild)

    if (!isUnitChild) return { error: true, message: "Main Unit ve Unit Equivalent Eşleşmiyor" }

    let createObj = {
        name: validatedFields.name,
        usdaName: validatedFields.usdaName,
        formula: validatedFields.formula,
        info: validatedFields.info,
        itemType: isItemTypeExists._id,
        standartMeasures: unitEQIDS,
        mainUnit: isUnitExists._id
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
    console.log("Update Item Values")
    console.log(values)

    const validatedItem = await updateItemValidation.validateAsync(values)
    if (!validatedItem) return { error: true, message: "Invalid Update Item Fields" }
    console.log("Update validatedItem Values")
    console.log(validatedItem)

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

    const item = await Item.findOne({ name: validatedItem.oldName }).populate("mainUnit")
    console.log("itemm")
    console.log(item)
    if (!item) return { error: true, message: "Item is not found" }
    const isItemExists = await Item.findOne({ name: validatedItem.name })
    if (isItemExists) return { error: true, message: "Item is already exists" }

    if (validatedItem.itemType) {
        const findItemType = await ItemTypes.findOne({ name: validatedItem.itemType })
        if (!findItemType) return { error: true, message: "Item Type Cannot be Found" }
        updateObj.itemType = findItemType._id // ObjID
    }

    if (validatedItem.measureUnits || validatedItem.mainUnit) {
        let unitEQIDS = []
        if (validatedItem.measureUnits) {
            for await (const validatedField of validatedItem.measureUnits) {
                const findMeasuredUnit = await UnitEquivalent.findOne({ name: validatedField })
                if (!findMeasuredUnit) return { error: true, message: "Unit Type(Unit Equivalent) Cannot be Found" }
                unitEQIDS.push(findMeasuredUnit._id)
            }
            if (!validatedItem.mainUnit) { //sadece unit eq değiştirmiş, weight çıkarınca main unit kg olarak kalmasını engelle
                const isUnitChild = unitEQIDS.find((ueid) => String(ueid) === String(item.mainUnit.unitEquivalents))  // unit, unitEQ'lerin child'ı mı
                console.log("unitEQIDS")
                console.log(unitEQIDS)
                console.log("item.mainUnit")
                console.log(item.mainUnit)
                console.log("isUnitChild")
                console.log(isUnitChild)

                if (!isUnitChild) return { error: true, message: "Main Unit ve Unit Equivalent Eşleşmiyor" }

            }


            updateObj.standartMeasures = unitEQIDS // [ObjID]
        } else {
            unitEQIDS = [...item.standartMeasures]
            updateObj.standartMeasures = unitEQIDS // [default unitEqs]

        }
        if (validatedItem.mainUnit) {
            // IS MAIN UNIT CHILDREN OF UNIT EQUIVALENT

            const isUnitExists = await Unit.findOne({ name: validatedItem.mainUnit })

            if (!isUnitExists) return { error: true, message: "Unit  Cannot be Found" }
            updateObj.mainUnit = isUnitExists._id // ObjID
            const unitsUnitEquivalent = isUnitExists.unitEquivalents
            console.log("unitsUnitEquivalent")
            console.log(unitsUnitEquivalent)
            const isUnitChild = unitEQIDS.find((ueid) => String(ueid) === String(unitsUnitEquivalent))  // unit, unitEQ'lerin child'ı mı
            console.log("isUnitChild")
            console.log(isUnitChild)

            if (!isUnitChild) return { error: true, message: "Main Unit ve Unit Equivalent Eşleşmiyor" }
        }



    }

    console.log("updateObj")
    console.log(updateObj)
    console.log("oldName")
    console.log(validatedItem.oldName)
    console.log(updateObj)
    const update = await Item.findOneAndUpdate({ name: validatedItem.oldName }, updateObj, { new: true })
    if (!update) return { error: true, message: "Item Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('Item')
    console.log("Item Updated")
    console.log(update)
    return { success: true, message: "Item Updated" }
}

export const deleteItem = async (values) => {
    console.log("delete item values")
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