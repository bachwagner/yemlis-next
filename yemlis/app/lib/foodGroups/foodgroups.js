import connectDB from "@/app/lib/mongodb"
import User from "@/models/user/user"
import { auth } from "@/auth"
import FoodGroups from "@/models/groups/foodGroups"

export const createFoodGroup = async ({ name, foodId, parent }) => {
    try {
        const session = await auth()
        if (!session) return { error: true, message: "Unauthorized" }
        const role = await currentRole()
        if (role !== "ADMIN") {
            if (!session) return { error: true, message: "Unauthorized" }
        }
        await connectDB()
        console.log("searcing for foodgroup")
        const foodgroup = await FoodGroups.findOne({ $or: [{ name: name }, { foodId }] })
        if (foodgroup) return { error: true, message: "Same name or foodId" }
        const addFoodGroup = await FoodGroups.create({name,foodId,parent})
        console.log("addFoodGroup")
        console.log(addFoodGroup)  
        if(addFoodGroup)return { error: false, message: "Foodgroup Updated" }
        return { error: true, message: "Foodgroup Cannot not be added" }
    } catch (error) {
        console.log("ss error")
        console.log(error)
        return null
    }
}
export const updateFoodGroup = async ({ name, foodId, parent }) => {
    try {
        const session = await auth()
        if (!session) return { error: true, message: "Unauthorized" }
        const role = await currentRole()
        if (role !== "ADMIN") {
            if (!session) return { error: true, message: "Unauthorized" }
        }
        await connectDB()
        console.log("searcing for foodgroup")
        const foodgroup = await FoodGroups.findOne({ $or: [{ name: name }, { foodId }] })
        if (foodgroup) return { error: true, message: "Same name or foodId" }
        const addFoodGroup = await FoodGroups.create({name,foodId,parent})
        console.log("addFoodGroup")
        console.log(addFoodGroup)  
        if(addFoodGroup)return { error: false, message: "Foodgroup Updated" }
        return { error: true, message: "Foodgroup Cannot not be added" }
    } catch (error) {
        console.log("ss error")
        console.log(error)
        return null
    }
}