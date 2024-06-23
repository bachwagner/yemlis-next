import mongoose from "mongoose"

export const connectMongoDB = async () => {
    console.log("Connecting to MongoDB...")
    console.log(process.env.MONGODB_URI)

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Mongodb")

    } catch (error) {
        console.log("Error Connecting to Mongodb, ", error)

    }
}