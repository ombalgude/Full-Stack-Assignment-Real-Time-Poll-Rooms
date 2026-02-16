import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "default_dev_secret";
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    throw new Error("JWT_SECRET is not defined in environment");
}
