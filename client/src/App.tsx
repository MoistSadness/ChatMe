import { useState } from "react";

import Chat from "./components/Chat";
import Login from "./components/Login";

import io from 'socket.io-client'

const socket = io("http://localhost:5305")

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [chatroom,setChatroom] = useState<string>("")

    return (
        <div>
            {isLoggedIn ? 
                <Chat 
                    username={username} 
                    chatroom={chatroom} 
                    socket={socket}
                /> 
            :
                 <Login 
                    setUsername={setUsername} 
                    setIsLoggedIn={setIsLoggedIn} 
                    setChatroom={setChatroom}
                    socket={socket}
                />}
        </div>
    )
}