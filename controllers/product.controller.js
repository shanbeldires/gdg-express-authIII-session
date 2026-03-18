import Product from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      const error = new Error("Name and Price are required");
      error.statusCode = 400;
      throw error;
    }
    const newProduct = await Product.create({
        name,
        price
    })
    res.status(201).json({
        sucess:true,
        message: "Product Created",
        product:newProduct
    })
  } catch (err) {
    next(err);
  }
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
        sucess: true,
        message: "Fetched products",
        products
    })
  } catch (err) {
    next(err);
  }
};
