import { useState, useEffect } from 'react'
import io from 'socket.io-client'
//import nanoid from 'nanoid'

type ChatTypes = {
  username: string,
  chatroom: string,
}

type ChatMessage = {
  username: string,
  message: string
}

// no environment variables
const socket = io("http://localhost:5305")

export default function Chat({ username, chatroom }: ChatTypes) {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  console.log(username, " ", chatroom)

  function sendChat(e: any) {
    e.preventDefault()

    const response: ChatMessage = { username, message }
    socket.emit("chat", response)    // send message to server
    setMessage("")    // clear contents of message
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload)
      setChatMessages([...chatMessages, payload])
    })
  })

  function displayChatMessage(){

  }

  function displaySystemMessage(){

  }


  function displayChat() {
    return (
      chatMessages.map((chatMessage: ChatMessage, index: number) => (
        <div key={index}>
          
          <div className=''>

            <div>{chatMessage.username}</div>
            <div>{chatMessage.message}</div>
          </div>
        </div>
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
