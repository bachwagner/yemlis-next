"use server"

import { unit as unitValidation } from "@/app/lib/validationSchemas"
import { updateUnit as updateUnitValidation } from "@/app/lib/validationSchemas"
import { deleteUnit as deleteUnitValidation } from "@/app/lib/validationSchemas"

import { currentUser } from "../auth"
import { revalidateTag } from 'next/cache'
import Unit from "@/models/units/unit"
import UnitEquivalent from "@/models/units/unitEquivalent"


export const createUnit = async (values) => {
    const validatedFields = await unitValidation.validateAsync(values)
    console.log("unit action vf")
    console.log(validatedFields)
    if (!validatedFields) return { error: true, message: "Invalid Unit Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const isNameExists = await Unit.findOne({ name: validatedFields.name })
    if (isNameExists) return { error: true, message: "Unit is already exists" }

    const isUnitEquivalent = await UnitEquivalent.findOne({ name: validatedFields.unitEqs })
    if (!isUnitEquivalent) return { error: true, message: "unitEquivalents Cannot be Found" }


    let createObj = {
        name: validatedFields.name,
        abbr: validatedFields.abbr,
        unitEquivalents: isUnitEquivalent._id,
        info: validatedFields.info,
    }

    const create = await Unit.create(createObj)
    if (!create) return { error: true, message: "Unit Cannot Be Created" }
    console.log("create")
    console.log(create)
    if (create.error) return { error: true, message: create.message }
    revalidateTag('units')

    return { success: true, message: "Unit Saved" }
}

export const updateUnit = async (values) => {
    console.log("Update Unit Values")
    console.log(values)

    const validatedUnit = await updateUnitValidation.validateAsync(values)
    if (!validatedUnit) return { error: true, message: "Invalid Update Unit Fields" }
    console.log("Update validatedUnit Values")
    console.log(validatedUnit)

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    let updateObj = {
        name: validatedUnit.name,
        abbr: validatedUnit.abbr,
        info: validatedUnit.info,
    }

    const unit = await Unit.findOne({ name: validatedUnit.oldName })
    console.log("unitt")
    console.log(unit)
    if (!unit) return { error: true, message: "Unit is not found" }

    if (validatedUnit.name) {
        const isUnitExists = await Unit.findOne({ name: validatedUnit.name })
        if (isUnitExists) return { error: true, message: "Unit is already exists" }
    }

    if (validatedUnit.unitEqs) {
        const findUnitEquivalent = await UnitEquivalent.findOne({ name: validatedUnit.unitEqs })
        if (!findUnitEquivalent) return { error: true, message: "Unit Eqs Cannot be Found" }
        updateObj.unitEquivalents = findUnitEquivalent._id // ObjID
    }

    const update = await Unit.findOneAndUpdate({ name: validatedUnit.oldName }, updateObj, { new: true })
    if (!update) return { error: true, message: "Unit Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('units')
    console.log("Unit Updated")
    console.log(update)
    return { success: true, message: "Unit Updated" }
}

export const deleteUnit = async (values) => {
    console.log("delete uniy values")
    console.log(values)

    const validatedItem = await deleteUnitValidation.validateAsync(values)
    if (!validatedItem) return { error: true, message: "Invalid Delete Unit Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: true, message: "Unauthorized" }
    }

    const deleteUnit = await Unit.findOneAndDelete({
        name: validatedItem.name
    })
    if (!deleteUnit) {
        return { error: true, message: "Unit Cannot Be Deleted" }
    }
    return { error: false, success: true, message: "Unit Deleted Successfully" }


}