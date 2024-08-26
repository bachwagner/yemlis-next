"use server"

import { foodGroup as foodGroupValidation } from "@/app/lib/validationSchemas"
import User from "@/models/user/user"
import { currentUser } from "../auth"
import { createFoodGroup } from "../foodGroups/foodgroups"
export const foodGroup = async (values) => {
    const validatedFoodGroup = await foodGroupValidation.validateAsync(values)
    if (!validatedFoodGroup) return { error: true, message: "Invalid Food Group Fields" }
    console.log("validatedFoodGroup")
    console.log(validatedFoodGroup)
    const user = await currentUser()
    if (!user || user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }
    const create = await createFoodGroup({
        name: validatedFoodGroup.name,
        foodId: validatedFoodGroup.foodId,
        parent: validatedFoodGroup.parent,
        text: validatedFoodGroup.text,
    })
    if (!create) return { error: true, message: "Food Group Cannot Be Created" }
    if (create.error) return { error: true, message: create.message }
 
    return { success: true, message: "Food Group Saved" }
}