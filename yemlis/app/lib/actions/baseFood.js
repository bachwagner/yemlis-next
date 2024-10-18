"use server"
import {
    baseFood as baseFoodValidation,
    updateBaseFood as updateBaseFoodValidation,
    deleteBaseFood as deleteBaseFoodValidation
} from "@/app/lib/validationSchemas"

import { currentUser } from "../auth"
import { revalidateTag } from 'next/cache'
import Basefood from "@/models/basefood/basefood"
import FoodGroups from "@/models/groups/foodGroups"
import SciCats from "@/models/groups/scicats"
export const createBaseFood = async (values) => {
    const validatedFields = await baseFoodValidation.validateAsync(values)
    console.log("BaseFood action vf")
    console.log(validatedFields)
    if (!validatedFields) return { error: true, message: "Invalid BaseFood Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const isNameExists = await Basefood.findOne({ name: validatedFields.name })
    if (isNameExists) return { error: true, message: "BaseFood is already exists" }

    let isFoodGroup
    if (validatedFields.foodGroup) {
        isFoodGroup = await FoodGroups.findOne({ name: validatedFields.foodGroup })
        if (!isFoodGroup) return { error: true, message: "Create BaseFood: Food Group Cannot be Found" }
    }
    let isCategorie //sciCats
    if (validatedFields.categorie) {
        isCategorie = await SciCats.findOne({ name: validatedFields.categorie })
        if (!categorie) return { error: true, message: "Create BaseFood: Scicats Cannot be Found" }
    }

    let createObj = {
        name: validatedFields.name,
        image: validatedFields.image,
        foodGroup: isFoodGroup?._id,
        categorie: isCategorie?._id,
        info: validatedFields.info,
        tags: validatedFields.tags,
    }

    const create = await Basefood.create(createObj)
    if (!create) return { error: true, message: "BaseFood Cannot Be Created" }

    if (create.error) return { error: true, message: create.message }
    revalidateTag('basefoods')

    return { success: true, message: "BaseFood Saved" }
}

export const updateBaseFood = async (values) => {
    console.log("Update BaseFood Values")
    console.log(values)

    const validatedBaseFood = await updateBaseFood.validateAsync(values)
    if (!validatedBaseFood) return { error: true, message: "Invalid BaseFood Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    let updateObj = {
        name: validatedBaseFood.name,
        info: validatedBaseFood.info,
        image: validatedFields.image,
        tags: validatedFields.tags,
    }
    //find main basefood
    const basefood = await Basefood.findOne({ name: validatedBaseFood.oldName })
    console.log("Update BaseFood: BaseFood not Found")
    console.log(basefood)
    if (!basefood) return { error: true, message: "BaseFood not Found" }

    if (validatedBaseFood.name) {
        const isName = await Basefood.findOne({ name: validatedBaseFood.name })
        if (isName) return { error: true, message: "BaseFood is already exists" }
    }

    if (validatedBaseFood.foodGroup) {
        const findFoodGroup = await FoodGroups.findOne({ name: validatedBaseFood.foodGroup })
        if (!findFoodGroup) return { error: true, message: "Food Group Cannot be Found" }
        updateObj.foodGroup = findFoodGroup._id // ObjID
    }
    if (validatedBaseFood.category) {
        const findSciCats = await SciCats.findOne({ name: validatedBaseFood.category })
        if (!findSciCats) return { error: true, message: "findSciCats Cannot be Found" }
        updateObj.foodGroup = findSciCats._id // ObjID
    }

    const update = await Basefood.findOneAndUpdate({ name: validatedBaseFood.oldName }, updateObj, { new: true })
    if (!update) return { error: true, message: "Base Food Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('basefoods')
    console.log("Base Food Updated")
    console.log(update)
    return { success: true, message: "Base Food Updated" }
}

export const deleteBaseFood = async (values) => {
    console.log("Delete BaseFood: values")
    console.log(values)

    const validatedBaseFood = await deleteBaseFoodValidation.validateAsync(values)

    if (!validatedBaseFood) return { error: true, message: "Delete BaseFood: Invalid Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: true, message: "Unauthorized" }
    }

    const deleteBaseFood = await Basefood.findOneAndDelete({
        name: validatedBaseFood.name
    })
  
    if (!deleteBaseFood) {
        return { error: true, message: "Delete BaseFood: Cannot Be Deleted" }
    }
    revalidateTag("basefoods")
   
    return { error: false, success: true, message: "Delete BaseFood: Deleted Successfully" }


}