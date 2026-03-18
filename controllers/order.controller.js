import Order from "../models/order.model.js";

export const getAllOrders = async(req,res,next)=>{
    try{
        const userId = req.session.userId;
        const orders = await Order.find({user:userId});
        res.status(200).json({
            success: true,
            message: "Order fetched",
            orders
        })
    }catch(err){
        next(err)
    }
}