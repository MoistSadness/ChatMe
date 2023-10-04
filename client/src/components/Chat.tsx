import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import nanoid from 'nanoid'

type ChatTypes = {
  username: String,
  chatroom: String,
}

// no environment variables
const socket = io("http://localhost:5305")

export default function Chat({username, chatroom}: ChatTypes) {
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<any>([])
  
  console.log(username, " ", chatroom)

  function sendChat(e: any) {
    e.preventDefault()
    socket.emit("chat", { message })    // send message to server
    setMessage("")    // clear contents of message
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload)
      setChats([...chats, payload])
    })
  })

  function displayChat() {
    return (
      chats.map((chat: any, index: number) => (
        <div key={index}>{chat}</div>
      )
      )
    )
  }

  return (
    <div className="body">
      <h1>Chat</h1>
      {displayChat()}
      <form onSubmit={sendChat} >
        <input type="text" name="" id="" placeholder='message' value={message} onChange={(e) => { setMessage(e.target.value) }} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
