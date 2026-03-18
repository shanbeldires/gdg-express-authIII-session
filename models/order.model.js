import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    totalPrice:Number
},{
    timeStamps:true
})

const Order = mongoose.model("Order",OrderSchema);
export default Order;