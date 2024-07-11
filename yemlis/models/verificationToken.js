import mongoose, { Schema, models } from "mongoose"

const verificationTokenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
}

)

const VerificationToken = models?.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema)
export default VerificationToken