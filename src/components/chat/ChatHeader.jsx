import React from 'react'

export default function ChatHeader({title}) {
    return (
        <div className="chat_header">
            <h2>You are currently chatting in {title} room</h2>
        </div>
    )
}
