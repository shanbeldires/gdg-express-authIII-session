import Order from "../models/order.model.js";

export const placeOrder = async (req, res, next) => {
  try {
    if (!req.session.cartItems) {
      const error = new Error("Empty cart");
      error.statusCode = 400;
      throw error;
    }
    const cart = req.session.cartItems;

    const userId = req.session.userId;
    const totalPrice = cart.reduce((sum,item)=> sum += item.quantity * item.price,0)
    const products = cart.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    const newOrder = await Order.create({
        user:userId,
        products,
        totalPrice
    })
    req.session.cartItems = []
    res.status(201).json({
        success:true,
        message: "Order created successfully",
        order: newOrder
    })
  } catch (err) {
    next(err);
  }
};
