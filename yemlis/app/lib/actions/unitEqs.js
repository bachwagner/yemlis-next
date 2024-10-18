"use server"


import {
    unitEq as unitEqValidation,
    updateUnitEq as updateUnitEqValidation,
    deleteUnitEq as deleteUnitEqValidation
} from "@/app/lib/validationSchemas"

import { currentUser } from "../auth"
import { revalidateTag } from 'next/cache'
import Unit from "@/models/units/unit"
import UnitEquivalent from "@/models/units/unitEquivalent"


export const createUnitEq = async (values) => {
    const validatedFields = await unitEqValidation.validateAsync(values)
    console.log("unit eq action vf")
    console.log(validatedFields)
    if (!validatedFields) return { error: true, message: "Invalid Unit Eq Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const isNameExists = await UnitEquivalent.findOne({ name: validatedFields.name })
    if (isNameExists) return { error: true, message: "Unit Eq is already exists" }
   
    let isMainUnitExists   // TODO: aynı isimle tanımlanan let ve const
    if (validatedFields.mainUnit) {
        const isMainUnitExists = await Unit.findOne({ name: validatedFields.mainUnit })
        if (!isMainUnitExists) return { error: true, message: "Create Unit Eq: Main Unit Cannot be Found" }
    }


    let createObj = {
        name: validatedFields.name,
        mainUnit: isMainUnitExists?._id,
        info: validatedFields.info,
    }

    const create = await UnitEquivalent.create(createObj)
    if (!create) return { error: true, message: "UnitEquivalent Cannot Be Created" }

    if (create.error) return { error: true, message: create.message }
    revalidateTag('uniteqs')

    return { success: true, message: "Unit Eqs Saved" }
}

export const updateUnitEq = async (values) => {
    console.log("Update Unit Eq Values")
    console.log(values)

    const validatedUnitEq = await updateUnitEqValidation.validateAsync(values)
    if (!validatedUnitEq) return { error: true, message: "Invalid Update Unit Eq Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    let updateObj = {
        name: validatedUnitEq.name,
        info: validatedUnitEq.info,
    }
    //find main unit
    const unitEq = await UnitEquivalent.findOne({ name: validatedUnitEq.oldName })
    console.log("Update Unit Eq: Unit Eq not Found")
    console.log(unitEq)
    if (!unitEq) return { error: true, message: "Unit Eq not Found" }

    if (validatedUnitEq.name) {
        const isUnitEqExists = await UnitEquivalent.findOne({ name: validatedUnitEq.name })
        if (isUnitEqExists) return { error: true, message: "Unit Eq is already exists" }
    }

    if (validatedUnitEq.mainUnit) {
        const findMainUnit = await Unit.findOne({ name: validatedUnitEq.mainUnit })
        if (!findMainUnit) return { error: true, message: "Main Unit Cannot be Found" }
        updateObj.mainUnit = findMainUnit._id // ObjID
    }

    const update = await UnitEquivalent.findOneAndUpdate({ name: validatedUnitEq.oldName }, updateObj, { new: true })
    if (!update) return { error: true, message: "Unit Eq Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('uniteqs')
    console.log("Unit Eq Updated")
    console.log(update)
    return { success: true, message: "Unit Eq Updated" }
}

export const deleteUnitEq = async (values) => {
    console.log("delete uniteq values")
    console.log(values)

    const validatedUnitEq = await deleteUnitEqValidation.validateAsync(values)

    if (!validatedUnitEq) return { error: true, message: "Invalid Delete Unit Eq Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: true, message: "Unauthorized" }
    }

    const deleteUnitEq = await UnitEquivalent.findOneAndDelete({
        name: validatedUnitEq.name
    })
    console.log("Delete Unit Eq")
    console.log(deleteUnitEq)
    if (!deleteUnitEq) {
        return { error: true, message: "Unit Eq Cannot Be Deleted" }
    }
    revalidateTag("uniteqs")
    const detachChildren = await Unit.updateMany({
        unitEquivalents: deleteUnitEq._id
    }, {
        $unset: { unitEquivalents: "" }
    })
    console.log("detachChildren")
    console.log(detachChildren)
    if (!detachChildren) return { error: true, success: false, message: "Unit Eq  Deleted but cannot removed from Units" }

    return { error: false, success: true, message: "Unit Eq  Deleted Successfully" }


}