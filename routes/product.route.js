import { addProduct, getAllProducts } from "../controllers/product.controller.js";
import {Router} from "express";

const productRouter = Router();

productRouter.post("/",addProduct)
productRouter.get("/",getAllProducts)

export default productRouter;