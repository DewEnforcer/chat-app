import React, { Component } from 'react'
import { Prompt } from 'react-router-dom';
import { toast } from 'react-toastify';

import ChatUserContext from '../context/ChatUserContext';
import createChatSocket from '../sockets/createChatSocket';
import Chat from './chat/Chat'
import InviteBar from './chat/InviteBar'
import UsersOverview from './chat/UsersOverview';

export default class ChatRoom extends Component {
    state = {
        roomMsgs: [],
        chatUsers: [],
        chatName: "",
        connected: false,
        socket: null
    }
    
    token = this.props.history.location.state.chatId;
    user = this.props.history.location.state.user;

    handleMessageSubmit = text => this.state.socket.emit("msgRequest", {text});

    handleConnect = () => {
        this.setState({...this.state, connected: true});
        this.state.socket.emit("connectRequest", {chatId: this.token, user: this.user});
    }

    handleChatData = ({msgs, chatName}) => {
        this.setState({...this.state, roomMsgs: msgs, chatName});
    }

    handleChatUsers = data => this.setState({...this.state, chatUsers: data});

    handleMsg = msg => {
        if (!msg) return;
        
        const newState = {...this.state};
        newState.roomMsgs = [...newState.roomMsgs, msg];
        this.setState(newState);
    }

    handleDisconnect = (data) => {
        if (!data.includes("client")) toast.error("Lost connection to the server, please wait for connection to be reestablished or create a new chat room.");
    }

    componentDidMount() {
        const socket = createChatSocket("http://localhost:5000", this.handleConnect, this.handleChatData, this.handleChatUsers, this.handleMsg, this.handleDisconnect);
        this.setState({...this.state, socket});
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }

    render() {
        const {chatName, roomMsgs, connected, chatUsers} = this.state;

        return (
        <div className="chat_room">
            <Prompt message="Are you sure you want to leave this chatroom?"/>
            <ChatUserContext.Provider value={this.user}>
                <InviteBar chatId={this.token}/>
                <Chat onSubmit={this.handleMessageSubmit} chatName={chatName} roomMsgs={roomMsgs} connected={connected}/>
                <UsersOverview users={chatUsers}/>
            </ChatUserContext.Provider>
        </div>
        )
    }
}
