import mongoose from "mongoose";
import { DB_URI } from "./env.js";


const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(DB_URI)
        console.log("Database connected Successfully")
    }catch(err){
        console.error(`Not connected to the database: ${err}`)
    }
}

export default connectToDatabase;