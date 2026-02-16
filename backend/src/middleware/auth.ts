import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Unauthorized: Missing token" });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token as string, JWT_SECRET) as { userId: string };
        req.userId = typeof decoded.userId === 'string' ? parseInt(decoded.userId) : decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};
