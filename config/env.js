import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`,
  });
}

export const { PORT, DB_URI, SESSION_SECRET } = process.env;
