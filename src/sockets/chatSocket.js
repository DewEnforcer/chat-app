import {io} from "socket.io-client";

export default function createSocket(target, onConnect, onChatData, onChatUsers, onMsg, onDisconnect) {
    const socket = io(target, {transports: ['websocket']});

    socket.on("connect", onConnect);
    socket.on("chatData", onChatData);
    socket.on("chatUsers", onChatUsers);
    socket.on("msg", onMsg);
    socket.on("disconnect", onDisconnect);

    return socket;
}