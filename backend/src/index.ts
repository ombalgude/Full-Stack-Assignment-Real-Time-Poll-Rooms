import express from "express";
import cors from "cors";
import mainRouter from "./routes/index";

import { setupWebSocket as startWebSocketServer } from "./ws";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Real Time Poll Rooms landing page");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// WebSocket server setup
startWebSocketServer(server);
