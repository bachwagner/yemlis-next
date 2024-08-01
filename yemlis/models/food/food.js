import mongoose, { Schema, models } from "mongoose"
  
const foodSchema = new Schema({

    name: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: false
    }],
   
}, {
    timestamps: true
}

)
const Food = models?.Food || mongoose.model("Food", foodSchema)
export default Food