import express, { Express, Request, Response, response } from "express"
import { createServer } from 'http'
import { Server } from "socket.io";


const PORT = 5305

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Temp strings
const system: string = 'system'
const username: string = 'user'

// Type for the sent message
export type ChatMessage = {
    username: string,
    message: string
  }

io.on("connection", (socket) => {
    //console.log("Socket info: ", socket)
    console.log("Socket is active")

    // Payload contains incoming information from a client
    socket.on("chat", (payload) => {
        console.log("Payload contents: ", payload.message)

        const response: ChatMessage = {username:username, message:payload.message}
        io.emit("chat", response)
    })

    // Send message to everyone except the user that connected
    socket.broadcast.emit("chat", (socket: any) => {
        const response: ChatMessage = {username: system, message:"New user has connected"}
        io.emit("chat",  response)
    })

    // Send message to all users when one user disconnects
    socket.on("disconnect", () =>{
        const response: ChatMessage = {username: system, message: "A user has disconnected"}
        io.emit("chat", response)
    })

    // Send message to everyone 
    // io.emit()
})

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.get("/hi", (req, res) => {
    res.send("hiiiiiiiii!")
})

app.get("/bye", (req, res) => {
    res.send("byeeeeeee!")
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})