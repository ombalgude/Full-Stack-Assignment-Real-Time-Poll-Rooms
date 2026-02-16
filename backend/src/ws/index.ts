import { WebSocketServer, WebSocket } from "ws";

// Map<roomId, Set<WebSocket>> store info key-value type pairs
const roomSubscribers = new Map<number, Set<WebSocket>>();

export function startWebSocketServer(port: number) {
    const wss = new WebSocketServer({ port });

    console.log(`WebSocket server started on port ${port}`);

    wss.on("connection", (ws: WebSocket) => {
        ws.on("message", (message: string) => {
            try {
                const data = JSON.parse(message);

                if (data.type === "join_room") {
                    const roomId = parseInt(data.roomId);
                    if (isNaN(roomId)) return;

                    if (!roomSubscribers.has(roomId)) {
                        roomSubscribers.set(roomId, new Set());
                    }
                    roomSubscribers.get(roomId)?.add(ws);
                    
                    console.log(`Client joined room ${roomId}`);
                }
            } catch (error) {
                console.error("Invalid WebSocket message:", error);
            }
        });

        ws.on("close", () => {
             // Cleanup 
            roomSubscribers.forEach((clients, roomId) => {
                if (clients.has(ws)) {
                    clients.delete(ws);
                    if (clients.size === 0) {
                        roomSubscribers.delete(roomId);
                    }
                }
            });
        });
    });
}

export function broadcastToRoom(roomId: number, message: object) {
    const clients = roomSubscribers.get(roomId);
    if (clients) {
        const payload = JSON.stringify(message);
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        });
    }
}
