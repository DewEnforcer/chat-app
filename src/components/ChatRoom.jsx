import React, { useEffect, useRef, useState } from 'react'
import ChatUserContext from '../context/ChatUserContext';
import Chat from './chat/Chat'
import InviteBar from './chat/InviteBar'
import UsersOverview from './chat/UsersOverview';

export default function ChatRoom({history}) {
    const chatRoomEl = useRef();
    const [user, setUser] = useState();
    const [chatUsers, setChatUsers] = useState([]);
    const token = history.location.state.chatId;

    
    useEffect(() => {
        window.onbeforeunload = () => alert("Stop");
        setUser(history.location.state.user);
    }, [])

    return (
        <div className="chat_room" ref={chatRoomEl}>
            <ChatUserContext.Provider value={user}>
                <InviteBar chatId={token}/>
                <Chat setChatUsers={setChatUsers} chatId={token} user={user}/>
                <UsersOverview users={chatUsers}/>
            </ChatUserContext.Provider>
        </div>
    )
}
