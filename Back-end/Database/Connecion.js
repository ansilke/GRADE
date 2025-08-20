import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()

const connectDB = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("database connected successfully");
            
        }).catch((err)=>{
            console.log(err);
            
        });
    } catch (error) { 
        console.log("connection error");
        
    }
}

export default connectDB