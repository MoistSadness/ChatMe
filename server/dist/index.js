import express from "express";
import { createServer } from 'http';
import { Server } from "socket.io";
const PORT = 5305;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
// Temp strings
const system = 'system';
const username = 'user';
io.on("connection", (socket) => {
    //console.log(`User connected: ${socket.id}`)
    // Behavior when a user joins a room
    socket.on("JoinRoom", (payload) => {
        socket.join(payload.chatroom);
        console.log(`User: ${payload.username} with id: ${socket.id} has joined room: ${payload.chatroom}`);
        socket.to(payload.chatroom).emit("SendResponse", (socket) => {
            const response = {
                username: system,
                message: `${payload.username} has connected`,
                chatroom: payload.chatroom,
            };
            return response;
        });
    });
    // Payload contains incoming information from a client
    socket.on("SendMessage", (payload) => {
        console.log("Payload contents: ", payload);
        console.log(`id: ${socket.id} has sent message ${payload.message}`);
        const response = { username: payload.username, message: payload.message, chatroom: payload.chatroom };
        socket.to(payload.chatroom).emit("SendResponse", response);
    });
    /*
    // Send message to everyone except the user that connected
    socket.broadcast.emit("chat", (socket: any) => {
        const response: ChatMessage = {username: system, message:"New user has connected"}
        io.emit("chat",  response)
    })
    */
    // Send message to all users when one user disconnects
    socket.on("disconnect", () => {
        const response = { username: system, message: "A user has disconnected", chatroom: "" };
        io.emit("chat", response);
    });
    // Send message to everyone 
    // io.emit()
});
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.get("/hi", (req, res) => {
    res.send("hiiiiiiiii!");
});
app.get("/bye", (req, res) => {
    res.send("byeeeeeee!");
});
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
