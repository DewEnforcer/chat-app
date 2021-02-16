import React, { useEffect, useRef, useState } from 'react'
import { Prompt } from 'react-router-dom';
import { toast } from 'react-toastify';

import ChatUserContext from '../context/ChatUserContext';
import createChatSocket from '../sockets/createChatSocket';
import Chat from './chat/Chat'
import InviteBar from './chat/InviteBar'
import UsersOverview from './chat/UsersOverview';

export default function ChatRoom({history}) {
    const chatRoomEl = useRef();
    
    const [chatUsers, setChatUsers] = useState([]);
    const [roomMsgs, setRoomMsgs] = useState([]);
    const [chatName, setChatName] = useState([]);
    const [connected, setConnected] = useState(false);

    let socket = null;
    const token = history.location.state.chatId;
    const user = history.location.state.user;

    function handleMessageSubmit(data) {
        socket.emit("msgRequest", {text: data});
    }
    
    function handleConnect () {
        setConnected(true);
        socket.emit("connectRequest", {chatId: token, user});
    }

    const handleChatData = ({msgs, chatName}) => {
        setRoomMsgs(msgs);
        setChatName(chatName);
    }

    const handleChatUsers = data => setChatUsers(data)

    const handleMsg = msg => {
        if (!msg) return;

        const newRoomMsgs = [...roomMsgs, msg];
        setRoomMsgs(newRoomMsgs);
    }

    const handleDisconnect = (data) => {
        if (!data.includes("client")) toast.error("Lost connection to the server, please wait for connection to be reestablished or create a new chat room.");
    }

    useEffect(() => {
        socket = createChatSocket("http://localhost:5000", handleConnect, handleChatData, handleChatUsers, handleMsg, handleDisconnect);
    }, [])

    return (
        <div className="chat_room" ref={chatRoomEl}>
            <Prompt message="Are you sure you want to leave this chatroom?"/>
            <ChatUserContext.Provider value={user}>
                <InviteBar chatId={token}/>
                <Chat onSubmit={handleMessageSubmit} chatName={chatName} roomMsgs={roomMsgs} connected={connected}/>
                <UsersOverview users={chatUsers}/>
            </ChatUserContext.Provider>
        </div>
    )
}
