import express, {Express, Request, Response} from "express"

const app = express()
const PORT = 5305

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.get("/hi", (req, res) => {
    res.send("hiiiiiiiii!")
})

app.get("/bye", (req, res) => {
    res.send("byeeeeeee!")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})