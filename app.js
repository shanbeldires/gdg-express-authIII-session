import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import session from "express-session";
import { DB_URI, SESSION_SECRET } from "./config/env.js";
import MongoStore from "connect-mongo";
import errorMiddleware from "./middlewares/error.middleware.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import checkoutRouter from "./routes/checkout.route.js";
import helmet from "helmet";
import cors from "cors"
import rateLimit from "express-rate-limit";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  legacyHeaders:false,
  standardHeaders:true,
  max:100
})

app.use(express.urlencoded({ extended: false }));
app.use(apiLimiter)

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/checkouts",checkoutRouter)

app.use(errorMiddleware);

export default app;
