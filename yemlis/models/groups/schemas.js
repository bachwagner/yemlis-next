import mongoose from "mongoose"
const editLog = mongoose.Schema({
    editDate: {
        type: Date,
        default: () => Date.now(),
        required: true
    },
    editor: { type: mongoose.Schema.Types.ObjectId, required: true },
    
})

const creationInfos = new mongoose.Schema({ // For Post
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: () => Date.now()

    },
    updatedAt: {
        type: Date,
        default: () => Date.now()

    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    editors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    editInfos: {  // !TODO for limitation
        editHistory: {
            edits: [editLog],
        }
    }
})
export default creationInfos