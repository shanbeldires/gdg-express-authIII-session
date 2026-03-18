import {Router} from "express"
import { addToCart, updateCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/",addToCart);
cartRouter.patch("/",updateCart);

export default cartRouter;