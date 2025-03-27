import { io } from "socket.io-client";

const SERVER_URL = "ws://localhost:5050";

const socket = io(SERVER_URL, {
  autoConnect: true,
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", (reason) => {
  console.log(`Disconnected from socket server: ${reason}`);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("connect_timeout", (timeout) => {
  console.error("Connection timeout:", timeout);
});

socket.on("reconnect_attempt", (attempt) => {
  console.log(`Reconnecting... Attempt ${attempt}`);
});

socket.on("reconnect", (attempt) => {
  console.log(`Reconnected after ${attempt} attempts`);
});

socket.on("reconnect_error", (error) => {
  console.error("Reconnection error:", error);
});

socket.on("reconnect_failed", () => {
  console.error("Reconnection failed");
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});

socket.on("message", (message) => {
  console.log("New message:", message);
});

socket.on("joinRoom", (roomId) => {
  console.log(`Joined room ${roomId}`);
});

socket.on("leaveRoom", (roomId) => {
  console.log(`Left room ${roomId}`);
});

export default socket;