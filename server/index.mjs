import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import "./loadEnvironment.mjs";
import "express-async-errors";
import authRoutes from "./routes/authRoutes.mjs"
import userRoutes from "./routes/userRoutes.mjs"

const PORT = process.env.PORT || 5050;
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
  ], 
};

app.use(cors(corsOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// Load routes
app.use(authRoutes);
app.use(userRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
});
io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

  // Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`socket ${socket.id} joined room ${roomId}`);
  });
  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`socket ${socket.id} left room ${roomId}`);
  });
  
  // Handle incoming messages
  socket.on("message", (data) => {
    const roomId = data.roomchat;
    const message = data;
    console.log(`socket ${socket.id} sent message to room ${roomId}: ${message}`);
    // Broadcast the message to the room
    socket.to(roomId).emit("message", message);
  });
  
});




// start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// status 403 is forbidden
// status 401 is unauthorized
// status 500 is internal server error
// status 200 is success
// status 204 is no content
// status 404 is not found
// status 400 is bad request