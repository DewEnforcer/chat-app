import React, { useState } from 'react'

import Loader from '../Loader';
import TypeBar from '../TypeBar'
import ChatHeader from './ChatHeader';
import MessageList from './MessageList'

export default function Chat({onSubmit, chatName, roomMsgs, connected}) {
    const [input, setInput] = useState("");
    
    const handleMessageSubmit = () => {
        if (input.length <= 0) return;
        
        onSubmit(input);
        
        setInput("");
    }

    const handleInputChange = val => {
        setInput(val);
    }
    
    if (!connected) return <Loader title="Connecting..."/>
    
    return (
        <div className="chat_wrapper flex_column">
            <ChatHeader title={chatName}/>
            <MessageList msgs={roomMsgs}/>
            <TypeBar onChange={handleInputChange} onSubmit={handleMessageSubmit} value={input}/>
        </div>
    )
}