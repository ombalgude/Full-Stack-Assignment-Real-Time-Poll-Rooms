import express from "express";
import cors from "cors";
import mainRouter from "./routes/index";

import { startWebSocketServer } from "./ws";

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Real Time Poll Rooms landing page");
});

// WebSocket server
startWebSocketServer(8081);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
