import React from 'react'
import Chat from './chat/Chat'
import InviteBar from './chat/InviteBar'

export default function ChatRoom() {
    const token = new URLSearchParams(window.location.search).get("token");

    return (
        <div className="chat_room">
            <Chat chatId={token}/>
            <InviteBar chatId={token}/>
        </div>
    )
}
