import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 8000; // Set the port for the server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL (removed trailing slash)
    methods: ["GET", "POST"],
  },
});

// Middleware to enable CORS
app.use(cors());

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for push notifications from the client
  socket.on("pushNotification", (data) => {
    console.log("Received push notification:", data.message); 
    io.emit("notification", { message: data.message });
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
