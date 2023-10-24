import { useState, useEffect, useRef } from 'react'
//import nanoid from 'nanoid'

type ChatTypes = {
  username: string,
  chatroom: string,
  socket:any,
}

type ChatMessage = {
  username: string,
  message: string
  chatroom: string
}

// no environment variables

export default function Chat({ username, chatroom, socket }: ChatTypes) {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  
  //console.log(username, " ", chatroom)

  // Ref is used to target dummy div at the bottom of the chat messages
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  // When chatMessages changes, scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages]);


  async function sendChat(e: any) {
    e.preventDefault()

    const response: ChatMessage = { username, message, chatroom }
    await socket.emit("SendMessage", response)    // send message to server
    setMessage("")    // clear contents of message
  }

  useEffect(() => {
    socket.on("SendResponse", (payload:any) => {
      console.log(payload)
      setChatMessages([...chatMessages, payload])
    })
  })

  function displayChatMessage(chatMessage: ChatMessage) {
    return (
      <div className='message-container'>
        <div>{chatMessage.username}</div>
        <div>{chatMessage.message}</div>
      </div>
    )
  }

  function displaySystemMessage(chatMessage: ChatMessage) {
    return (
      <div className='message-container'>
        <div className='system-message'>{chatMessage.message}</div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>{chatroom}</h1>
      <div className='chat-messages-container'>
        { // Display All chat messages here
          chatMessages.map((chatMessage: ChatMessage, index: number) => (
            <div key={index}>
              {chatMessage.username == 'system' ? displaySystemMessage(chatMessage) : displayChatMessage(chatMessage)}
            </div>
          ))
        }
        {/** Dummy div used to scroll down to the bottom of the chat feed */}
        <div ref={messagesEndRef} />
      </div>
      {/* Form to submit chat messages here */}
      <form onSubmit={sendChat} >
        <input type="text" name="" id="" placeholder='message' value={message} onChange={(e) => { setMessage(e.target.value) }} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
