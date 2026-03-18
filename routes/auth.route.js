import { logout, signIn, signUp } from "../controllers/auth.controller.js";
import {Router} from "express"

const authRouter = Router();

authRouter.post("/sign-up",signUp);
authRouter.post("/sign-in",signIn);
authRouter.post("/logout",logout)
export default authRouter
