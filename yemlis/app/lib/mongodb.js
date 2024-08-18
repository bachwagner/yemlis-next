import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}
 
async function connectDB() {
    if (cached.conn) {
        console.log("cached db")
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default connectDB

/* import mongoose from "mongoose"

export const connectMongoDB = async () => {
    console.log("Connecting to MongoDB...")
    console.log(process.env.MONGODB_URI)

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Mongodb")

    } catch (error) {
        console.log("Error Connecting to Mongodb, ", error)

    }
} */