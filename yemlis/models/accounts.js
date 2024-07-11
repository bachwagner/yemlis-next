 import mongoose, { Schema, models } from "mongoose"
const accountSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    providerAccountId: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: false
    },
    access_token: {
        type: String,
        required: false
    },
    expires_at: {
        type: Number,
        required: true
    },
    token_type: {
        type: String,
        required: false
    },
    scope: {
        type: String,
        required: false
    },
    scope: {
        type: String,
        required: false
    },
    id_token: {
        type: String,
        required: false
    },
    session_state: {
        type: String,
        required: false
    },

}
)

const Account = models?.User || mongoose.model("User", accountSchema)
export default Account 