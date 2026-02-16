import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { prismaClient } from "../db/db";

const router = Router();

// Create Room
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const room = await prismaClient.room.create({
            data: {
                name: name || "Untitled Room",
                creatorId: userId
            }
        });

        res.status(201).json({ message: "Room created", roomId: room.id, room });
    } catch (error) {
        console.error("Create room error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all rooms for user
router.get("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const rooms = await prismaClient.room.findMany({
            where: {
                creatorId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                _count: {
                    select: { polls: true }
                }
            }
        });

        res.json(rooms);
    } catch (error) {
        console.error("Get all rooms error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Room details with Polls
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const roomId = parseInt(req.params.id as string);

        const room = await prismaClient.room.findUnique({
            where: { id: roomId },
            include: {
                polls: {
                  include: {
                    options: {
                        include: {
                            _count: {
                                select: { votes: true }
                            }
                        }
                    }
                  }
                },
                creator: {
                    select: { username: true }
                }
            }
        });

        if (!room) {
            res.status(404).json({ message: "Room not found" });
            return;
        }

        res.json(room);
    } catch (error) {
        console.error("Get room error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
