import express from "express"
import dotenv from "dotenv"
import connectDB from "./Database/Connecion.js"
import cors from "cors"
import adminroutes from "./Routes/Adminroutes.js"

const app = express()

dotenv.config()

const PORT= process.env.PORT || 4000

connectDB()

app.use(express.json());



app.use(cors({
    origin:['http://localhost:5173','http://localhost:5173/'],
    credentials: true
}))

app.use("/admin",adminroutes)

app.listen(PORT,()=>{
    console.log(`server is running in port : ${PORT}`);
    
})