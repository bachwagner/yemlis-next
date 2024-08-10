import mongoose, { Schema, models } from "mongoose"
import { userDemandsEnums } from "@/constants/enums/userDemandsEnums"

const userDemandsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    demandType: {
        type: String,
        enum: Object.keys(userDemandsEnums)
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    actionTime: {
        type: Date,
        required: true,
        default: Date.now() + 259200  //TOCHECK
    },
    auto: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true
}

)

const UserDemands = models?.UserDemands || mongoose.model("UserDemands", userDemandsSchema)
export default UserDemands