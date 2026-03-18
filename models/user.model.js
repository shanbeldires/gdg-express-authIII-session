import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Full Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true,
        trim:true,
        match:[/\S+@\S+\.\S+/, "Invalid email"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[3, "Weak Password"]
    }
},{
    timestamps:true
})



const User = mongoose.model("User",UserSchema);
export default User;


