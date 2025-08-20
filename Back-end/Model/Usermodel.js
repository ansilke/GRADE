import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    password:Number,
})