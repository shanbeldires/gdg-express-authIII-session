import Product from "../models/product.model.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      const error = new Error("Product and Quantity are required");
      error.statusCode = 400;
      throw error;
    }
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    if (!req.session.cartItems) {
      req.session.cartItems = [];
    }
    const cart = req.session.cartItems;
    const existingItem = cart.find((item) => item.productId == productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        price: product.price,
      });
    }
    res.status(201).json({
      success: true,
      message: "Added to the cart",
      cart,
    });
  } catch (err) {
    next(err);
  }
};
export const updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      const error = new Error("Product and Quantity are required");
      error.statusCode = 400;
      throw error;
    }
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    if (!req.session.cartItems) {
      req.session.cartItems = [];
    }
    if (quantity == 0) {
      req.session.cartItems = req.session.cartItems.filter(
        (item) => item.productId != productId,
      );
    }
    const cart = req.session.cartItems;

    const existingItem = cart.find((item) => item.productId == productId);
    if (!existingItem) {
      cart.push({ productId, quantity,price:product.price });
    } else {
      existingItem.productId = productId;
      existingItem.quantity = quantity;
      existingItem.price = product.price;
    }
    res.status(200).json({
      success: true,
      message: "Cart modified",
      cart,
    });
  } catch (err) {
    next(err);
  }
};
