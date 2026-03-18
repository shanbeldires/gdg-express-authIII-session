import {Router} from "express"

import { placeOrder } from "../controllers/checkout.controller.js";


const checkoutRouter = Router();

checkoutRouter.post("/",placeOrder);


export default checkoutRouter;