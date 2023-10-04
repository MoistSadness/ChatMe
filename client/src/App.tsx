import { useState } from "react";

import Chat from "./components/Chat";
import Login from "./components/Login";

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
                /> 
            :
                 <Login 
                    setUsername={setUsername} 
                    setIsLoggedIn={setIsLoggedIn} 
                    setChatroom={setChatroom}
                />}
        </div>
    )
}