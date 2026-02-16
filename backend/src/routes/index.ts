import { Router } from "express";
import authRoutes from "./user";
import roomRoutes from "./rooms";
import pollRoutes from "./poll";

const router = Router();

router.use("/auth", authRoutes);
router.use("/rooms", roomRoutes);
router.use("/polls", pollRoutes);

export default router;
