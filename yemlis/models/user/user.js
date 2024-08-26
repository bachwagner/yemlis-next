import mongoose, { Schema, models } from "mongoose"
const UserRoles = ["ADMIN", "USER"]

const bookmark = new Schema({
    type: String, //food, list,
    element: Schema.Types.ObjectId,  //food, list
    date: Date,

})

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
    isVerified:Boolean,
    image: {
        type: String,
        required: false
    },
    profileLink:{
      type:String,
      minLength:2,
      maxLength:100
    },
    role: {
        type: String,  //TODO userRole
        required: false,
        default: "USER",
        enum: UserRoles,
    },
    isMarkedToDelete: {
        type: Boolean,
        required: false,
        default: false
    },
    /*  accounts: {
         type: [String], //TODO [Accounts]
         required: false
     } */
    accounts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Account' }], //TODO [Accounts]
        required: false
    },
    bookmarks: [bookmark]

}, {
    timestamps: true
}

)

const User = models?.User || mongoose.model("User", userSchema)
export default User