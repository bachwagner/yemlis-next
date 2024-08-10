"use server"
import { deleteAccount as deleteAccountValidation } from "@/app/lib/validationSchemas"
import User from "@/models/user/user"
import UserDemands from "@/models/user/userDemands"
import { currentUser } from "../auth"
import { getUserById } from "@/app/lib/data/user"
import { userDemandsEnums } from "@/constants/enums/userDemandsEnums"
export const deleteAccount = async (values) => {
    const validatedDeleteAccount = await deleteAccountValidation.validateAsync(values)
    if (!validatedDeleteAccount) return { error: true, message: "Invalid Fields" }
    console.log("validatedDeleteAccount")
    console.log(validatedDeleteAccount)
    const user = await currentUser()
    if (!user) {
        return { error: "Unauthorized" }
    }
    const dbUser = await getUserById(user._id)
    if (!dbUser) return { error: true, message: "Unauthorized" }
    console.log("deleteAccount parameters")
    console.log(values)
    //DELETE OR UNDELETE
    const demandType = values?.demandType
    if (demandType === userDemandsEnums.deleteAccount) {
        const updateUser = await User.findByIdAndUpdate(dbUser._id, { isMarkedToDelete: true })
        console.log("updateUserr")
        console.log(updateUser)
        if (!updateUser) return { error: true, message: "İstek Aktarılamadı" }
        const actionTime = new Date(new Date().getTime() + 5 * 60 * 1000)

        const addDemand = await UserDemands.findOneAndUpdate({ userId: dbUser._id }, {
            userId: dbUser._id,
            demandType: "deleteAccount",
            createdAt: new Date(),
            actionTime: actionTime
        }, { upsert: true })
        if (!addDemand) return { error: true, message: "İstek Oluşturulamadı" }

        return { success: true, message: "İstek Oluşturuldu" }

    } else if (demandType === userDemandsEnums.cancelDeleteAccount) {
        const updateUser = await User.findByIdAndUpdate(dbUser._id, { isMarkedToDelete: false })
        if (!updateUser) return { error: true, message: "İstek Aktarılamadı" }

        const removeDemand = UserDemands.findOneAndDelete({ _id: updateUser._id })

        if (!removeDemand) return { error: true, message: "İstek İptal Edilemedi" }
        console.log("Demand Removed")
        return { success: true, message: "İstek İptal Edildi" }


    } else {
        return { error: true, message: "Geçersiz Parametre Hatası" }

    }

}