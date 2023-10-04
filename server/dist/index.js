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
io.on("connection", (socket) => {
    //console.log("Socket info: ", socket)
    console.log("Socket is active");
    // Payload contains incoming information from a client
    socket.on("chat", (payload) => {
        console.log("Payload contents: ", payload.message);
        io.emit("chat", payload.message);
    });
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
