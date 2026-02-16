import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { prismaClient } from "../db/db";
import { broadcastToRoom } from "../ws";

const router = Router();

// Create Poll
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { question, description, roomId, options } = req.body;
        const userId = req.userId!;

        if (!question || !roomId || !options || !Array.isArray(options) || options.length < 2 || options.length > 5) {
             res.status(400).json({ message: "Invalid poll data. Need question, roomId, and at least 2 options and maximum 5 options." });
             return; 
        }

        const poll = await prismaClient.poll.create({
            data: {
                question,
                description,
                roomId: parseInt(roomId),
                creatorId: userId,
                options: {
                    create: options.map((opt: { text: string } | string) => ({ 
                        text: typeof opt === 'string' ? opt : opt.text 
                    })) // Handle both string array and object array just in case
                }
            },
            include: {
                options: true
            }
        });

        res.status(201).json({ message: "Poll created", poll });
    } catch (error) {
        console.error("Create poll error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Results (Vote Counts)
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const pollId = parseInt(req.params.id as string);

        const poll = await prismaClient.poll.findUnique({
            where: { id: pollId },
            include: {
                options: {
                    include: {
                        _count: {
                            select: { votes: true } // Prisma automatically counts related votes!
                        }
                    }
                },
                creator: {
                    select: { username: true }
                }
            }
        });

        if (!poll) {
             res.status(404).json({ message: "Poll not found" });
             return;
        }

        // Format the response to make it cleaner for frontend
        const result = {
            id: poll.id,
            question: poll.question,
            description: poll.description,
            creator: poll.creator.username,
            options: poll.options.map(opt => ({
                id: opt.id,
                text: opt.text,
                votes: opt._count.votes 
            }))
        };

        res.json(result);
    } catch (error) {
        console.error("Get poll error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Vote in a Poll
router.post("/:id/vote", authMiddleware, async (req: Request, res: Response) => {
    try {
        const pollId = parseInt(req.params.id as string);
        const { optionId } = req.body;
        const userId = req.userId!;
        
        // Get IP address
        const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '0.0.0.0';
        const ip = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress;
        
        const existingVoteByUser = await prismaClient.vote.findUnique({
            where: {
                userId_pollId: {
                    userId,
                    pollId
                }
            }
        });

        if (existingVoteByUser) {
             res.status(400).json({ message: "You have already voted in this poll." });
             return;
        }

        const existingVoteByIP = await prismaClient.vote.findUnique({
             where: {
                 pollId_ipAddress: {
                     pollId,
                     ipAddress: ip
                 }
             }
        });

        if (existingVoteByIP) {
            res.status(400).json({ message: "You have already voted in this poll from this device." });
            return;
        }

        await prismaClient.vote.create({
            data: {
                userId,
                pollId,
                optionId: parseInt(optionId),
                ipAddress: ip
            }
        });
        
        // Broadcast updates
        const updatedPoll = await prismaClient.poll.findUnique({
            where: { id: pollId },
            include: {
                options: {
                    include: {
                        _count: { select: { votes: true } }
                    }
                }
            }
        });

        if (updatedPoll) {
             broadcastToRoom(updatedPoll.roomId, {
                type: "poll_updated",
                payload: {
                    pollId: updatedPoll.id,
                    options: updatedPoll.options.map(opt => ({
                        id: opt.id,
                        votes: opt._count.votes
                    }))
                }
            });
        }

        res.status(200).json({ message: "Vote cast successfully" });
    } catch (error) {
        console.error("Vote error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
