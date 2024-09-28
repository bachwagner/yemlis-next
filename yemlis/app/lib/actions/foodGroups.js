"use server"

import { foodGroup as foodGroupValidation } from "@/app/lib/validationSchemas"
import { updateFoodGroup as updateFoodGroupValidation } from "@/app/lib/validationSchemas"
import { deleteFoodGroup as deleteFoodGroupValidation } from "@/app/lib/validationSchemas"

import User from "@/models/user/user"
import { currentUser } from "../auth"
import FoodGroups from "@/models/groups/foodGroups"
import { revalidateTag } from 'next/cache'
import Items from "@/models/items/items"
import itemTypes from "@/models/items/itemTypes"

export const createFoodGroup = async (values) => {
    const validatedItem = await foodGroupValidation.validateAsync(values)
    if (!validatedFoodGroup) return { error: true, message: "Invalid Food Group Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    const foodId = await FoodGroups.aggregate([{ $count: "foodCount" }])
    console.log("aggregate")
    console.log(foodId[0]?.foodCount + 1)
    let createObj = {
        name: validatedFoodGroup.name,
        foodId: foodId[0]?.foodCount + 1,
        text: validatedFoodGroup.text,

    }
    const isNameExists = await FoodGroups.findOne({ name: validatedFoodGroup.name })
    if (isNameExists) return { error: true, message: "Foodgroup is already exists" }
    if (!values.noParent) {
        const checkParent = await FoodGroups.findOne({ name: validatedFoodGroup.parent })
        if (!checkParent) return { error: true, message: "Parent could not be found" }
        createObj.parent = checkParent._id
    }
    const create = await FoodGroups.create(createObj)
    if (!create) return { error: true, message: "Food Group Cannot Be Created" }
    console.log("create")
    console.log(create)
    if (create.error) return { error: true, message: create.message }
    revalidateTag('foodgroups')

    return { success: true, message: "Food Group Saved" }
}
export const updateFoodGroup = async (values) => {
    console.log("Update Food Group")

    const validatedFoodGroup = await updateFoodGroupValidation.validateAsync(values)
    if (!validatedFoodGroup) return { error: true, message: "Invalid Update Food Group Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    let updateObj = {
        name: validatedFoodGroup.name,
        text: validatedFoodGroup.text,
        tags: validatedFoodGroup.tags,
    }

    const isNameExists = await FoodGroups.findOne({ name: validatedFoodGroup.name })
    if (isNameExists) return { error: true, message: "Foodgroup is already exists" }
    if (!validatedFoodGroup.noParent && validatedFoodGroup.parent) {
        const checkParent = await FoodGroups.findOne({ name: validatedFoodGroup.parent })
        if (!checkParent) return { error: true, message: "Parent could not be found" }
        updateObj.parent = checkParent._id
    } else {
        updateObj.parent = null
    }
    const update = await FoodGroups.updateOne({ name: validatedFoodGroup.oldName }, updateObj)
    if (!update) return { error: true, message: "Food Group Cannot Be Updated" }
    if (update.error) return { error: true, message: update.message }
    revalidateTag('foodgroups')
    console.log("Food Group Updated")
    return { success: true, message: "Food Group Updated" }
}

export const deleteFoodGroup = async (values) => {
    console.log("df deleteFoodGroup values")
    console.log(values)

    const validatedFoodGroup = await deleteFoodGroupValidation.validateAsync(values)
    if (!validatedFoodGroup) return { error: true, message: "Invalid Food Group Fields" }

    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: true, message: "Unauthorized" }
    }
    const findItem = await FoodGroups.findOne({
        name: validatedFoodGroup.name
    }).populate({
        path: "parent",
        model: "FoodGroups",
    })
    console.log("df findFoodGroup")
    console.log(findFoodGroup)

    if (!findFoodGroup) return { error: true, message: "Delete Food Group: Food Group Cannot Be found" }
    const deleteFoodGroup = await FoodGroups.deleteOne({
        name: validatedFoodGroup.name
    })
    if (!deleteFoodGroup) {
        return { error: true, message: "Food Group Cannot Be Deleted" }
    }
    const children = await FoodGroups.find({ parent: findFoodGroup._id }).select("_id")
    console.log("df children")
    console.log(children)
    if (children && children.length > 0) {
        if (findFoodGroup.parent) { // foodgroup is not a root group
            console.log("parent is not root")
            const rearrangeChildren = await FoodGroups.updateMany({
                _id: { $in: children }
            }, {
                parent: findFoodGroup.parent._id // lift up elements
            })
            if (!rearrangeChildren) {
                return { error: true, message: "Food Group Deleted But Children Could Not be Updated" }
            }
        } else { //foodgroup is aroot group
            console.log("parent is root")
            console.log("childrenn")
            console.log(children)
            const rearrangeChildren = await FoodGroups.updateMany({
                _id: { $in: children }
            }, {
                $unset: { parent: "" } // lift up elements
            })
            if (!rearrangeChildren) {
                return { error: true, message: "Food Group Deleted But Children Could Not be Updated" }
            }
        }
        revalidateTag('foodgroups')

        return { error: false, success: true, message: "Food Group Deleted Successfully" }

    } else {
        return { error: false, success: true, message: "Food Group Deleted Successfully" }
    }

}

