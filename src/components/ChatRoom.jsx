import React, { useEffect, useRef, useState } from 'react'
import Chat from './chat/Chat'
import InviteBar from './chat/InviteBar'

export default function ChatRoom({history}) {
    const chatRoomEl = useRef();
    const [user, setUser] = useState();
    const token = history.location.state.chatId;

    
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            alert("Are you sure you want to leave this chat?")
        })
        setUser(history.location.state.user);
    }, [])

    return (
        <div className="chat_room" ref={chatRoomEl}>
            <Chat chatId={token} user={user}/>
            <InviteBar chatId={token}/>
        </div>
    )
}
