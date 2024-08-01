import mongoose, { Schema, models } from "mongoose"
const UserRoles = ["ADMIN", "USER"]

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,  //TODO userRole
        required: false,
        default: "USER",
        enum: UserRoles,
    },
    isMarkedToDelete:{
        type:Boolean,
        required:false,
        default:false
    },
   /*  accounts: {
        type: [String], //TODO [Accounts]
        required: false
    } */
    accounts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Account' }], //TODO [Accounts]
        required: false
    } 

}, {
    timestamps: true
}

)

const User = models?.User || mongoose.model("User", userSchema)
export default User