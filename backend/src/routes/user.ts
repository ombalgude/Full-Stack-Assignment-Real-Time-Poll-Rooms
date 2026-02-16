import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prismaClient } from "../db/db";
import { JWT_SECRET } from "../config/config";

const router = Router();

// Signup
router.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }

        const existingUser = await prismaClient.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await prismaClient.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Signin
router.post("/signin", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required" });
            return;
        }

        const user = await prismaClient.user.findUnique({
            where: { username }
        });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
