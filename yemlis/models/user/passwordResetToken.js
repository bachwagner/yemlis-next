import mongoose, { Schema, models } from "mongoose"

const passwordResetTokenSchema = new Schema({
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

const PasswordResetToken = models?.PasswordResetToken || mongoose.model("PasswordResetToken", passwordResetTokenSchema)
export default PasswordResetToken