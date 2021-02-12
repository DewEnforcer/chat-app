import React, { useEffect, useState } from 'react'
import {io} from "socket.io-client";
import Loader from '../Loader';

import TypeBar from '../TypeBar'
import MessageList from './MessageList'
import Status from './Status'

const user = {
    id: 1,
    username: "Dew"
}

export default function Chat({chatId}) {
    const [roomMsgs, setRoomMsgs] = useState([]);
    const [input, setInput] = useState("");
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState();
    
    const handleMessageType = (val) => {
        setInput(val);
    }
    const handleMessageSubmit = () => {
        if (input.length === 0) return;
        console.log("Submitting ", input);
        console.log(socket);
        socket.emit("msg", {msg: input});
    }
    let getRoomMsgs;

    useEffect(() => {
        let newSocket = io("http://localhost:5000" ,{transports: ['websocket']});

        newSocket.on("connect", () => {
            setConnected(true);
            newSocket.emit("chatConnect", {chatId, user});
        })

        newSocket.on("data", ({msgs}) => {
            setRoomMsgs(msgs);
        })
        newSocket.on("msg", (msg) => {
            console.log(getRoomMsgs());
            const newMsgs = [...getRoomMsgs(), msg];
            console.log(newMsgs);
            setRoomMsgs(newMsgs);
        })

        setSocket(newSocket);


        return () => socket.disconnect();
    }, []);
    useEffect(() => {
       getRoomMsgs = () => roomMsgs;
    }, [roomMsgs])

    if (!connected) return <Loader/>

    return (
        <div className="chat_wrapper flex_column">
            <MessageList msgs={roomMsgs}/>
            <Status statusId={1} author={{username: "Tester"}}/>
            <TypeBar onChange={handleMessageType} onSubmit={handleMessageSubmit} value={input}/>
        </div>
    )
}
