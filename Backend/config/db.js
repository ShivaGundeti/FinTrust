import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo COnnected");
        
    } catch (error) {
        console.log("Mongoose error: ",error);
        
    }
}

