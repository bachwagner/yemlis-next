"use server"

import { currentRole, currentUser } from "@/app/lib/auth"
import Food from "@/models/food/food"
import User from "@/models/user/user"

export const likeFood = async (prevState, formData) => {
    console.log("prevState")
    console.log(prevState)
    console.log("formData")
    console.log(formData)

    const user = await currentUser()
    if (!user) return { error: true, message: "Unauthorized food like request" }

    const isLiked = formData.get('isLiked') === "true" ? true : false
    const foodId = formData.get('foodId')
    console.log("isLikedd")
    console.log(isLiked)
    console.log("foodId")
    console.log(foodId)
    try {
        if (!isLiked) {
            const food = await Food.findByIdAndUpdate(foodId, { $addToSet: { likes: user._id } }, { new: true })

            if (!food) return { error: true, message: "Food like update error" }

            //  const isLiked = food.likes?.includes(user._id) ? true : false
            console.log("food.isLiked")
            console.log(isLiked)
            return { likes: food.likes.length, isLiked: true }

        } else {
            console.log("food.unLiked")
            const food = await Food.findByIdAndUpdate(foodId, { $pull: { likes: user._id } }, { new: true })
            if (!food) return { error: true, message: "Food unlike update error" }
            //   const isLiked = food.likes?.includes(user._id) ? true : false

            return { likes: food.likes.length, isLiked: false }

        }
    } catch (error) {
        console.log("Food like error")
        console.log(error)
        return { error: true, message: "Food like error" }

    }

    //  revalidatePath('/posts')
    //  revalidateTag('posts')

}

export const saveFood = async (prevState, formData) => {
    console.log("prevState")
    console.log(prevState)
    console.log("formData")
    console.log(formData)

    const user = await currentUser()
    if (!user) return { error: true, message: "Unauthorized food save request" }

    const isSaved = formData.get('isSaved') === "true" ? true : false
    const foodId = formData.get('foodId')

    try {
        const food = await Food.findByIdAndUpdate(foodId, { $addToSet: { likes: user._id } }, { new: true })
        if (!food) return { error: true, message: "Food save update error, food not found" }

        if (!isSaved) {
            // const food = await Food.findByIdAndUpdate(foodId, { $addToSet: { likes: user._id } }, { new: true })
            console.log("save food")
            if (!food) return { error: true, message: "Food save update error, food not found" }

            const isSaved = user.likes?.includes(user._id) ? true : false

            const updateUser = await User.findOneAndUpdate({
                _id: user._id,
                "bookmarks.element": { $ne: food._id }
            }, {
                $push: { bookmarks: { type: "food", element: food._id, date: Date.now() } }
            },
                { new: true })
            console.log("updateUserr")
            console.log(updateUser)
            if (!updateUser) return { error: true, message: "Food save update error, cannot be added to library" }
            return { isSaved: true }

        } else {
            console.log("unsave foodd")

            const updateUser = await User.findByIdAndUpdate(user._id, {
                $pull: {
                    bookmarks: { element: { $eq: food._id } }
                }
            },
                { new: true })
            if (!updateUser) return { error: true, message: "Food unsave update error, cannot be added to library" }

            return { isSaved: false }

        }
    } catch (error) {
        console.log("Food save error")
        console.log(error)
        return { error: true, message: "Food save error" }

    }

    //  revalidatePath('/posts')
    //  revalidateTag('posts')

}

