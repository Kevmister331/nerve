import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import apiRoutes from "./routes/api.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"]
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Make io accessible to routes
app.set("io", io);

// Routes
app.use("/api", apiRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "API server is running" });
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Subscribe client to alert updates
  socket.on("subscribeToAlerts", () => {
    socket.join("alerts");
    console.log(`Client ${socket.id} subscribed to alerts`);
    socket.emit("alertSubscriptionSuccess", { message: "Subscribed to alerts" });
  });

  // Listen for unit status updates
  socket.on("unitStatusUpdate", (data) => {
    console.log("🚨 Status update from unit:", data);
    io.to("alerts").emit("unitStatus", data); // Send to all subscribed dispatchers
  });

  // Listen for unit location updates
  socket.on("unitLocationUpdate", (data) => {
    console.log("📍 Location update from unit:", data);
    io.to("alerts").emit("unitLocation", data); // Send to all subscribed dispatchers
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start server (use httpServer, not app.listen!)
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server initialized`);
});

export default app;
