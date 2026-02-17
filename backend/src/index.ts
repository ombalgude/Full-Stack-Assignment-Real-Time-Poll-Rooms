import express from "express";
import cors from "cors";
import mainRouter from "./routes/index";

import { setupWebSocket as startWebSocketServer } from "./ws";

const app = express();
app.use(express.json());
const allowedOrigins = [
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


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
