import React, { Component } from 'react'
import {io} from "socket.io-client";
import { toast } from 'react-toastify';

import Loader from '../Loader';
import TypeBar from '../TypeBar'
import ChatHeader from './ChatHeader';
import MessageList from './MessageList'
import Status from './Status'
import createChatSocket from '../../sockets/createChatSocket';

export default class Chat extends Component {
    state = {
        roomMsgs: [],
        input: "",
        connected: false,
        activity: null,
        socket: null,
        chatName: ""
    }

    handleMessageType = val => {
        const newState = {...this.state};
        newState.input = val;
        this.setState(newState);
    }

    handleMessageSubmit = () => {
        const {socket, input} = this.state;
        if (input.length <= 0) return;

        socket.emit("msgRequest", {text: input});

        this.setState({...this.state, input: ""});
    }

    handleConnect = () => {
        let chatId = this.props.chatId;
        let user = this.props.user;
        this.setState({...this.state, connected: true});
        this.state.socket.emit("connectRequest", {chatId, user});
    }

    handleChatData = ({msgs, chatName}) => {
        this.setState({...this.state, roomMsgs: msgs, chatName});
    }

    handleChatUsers = data => this.props.setChatUsers(data)

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
        const {roomMsgs, input, activity, connected, chatName} = this.state;

        if (!connected) return <Loader title="Connecting..."/>

        return (
        <div className="chat_wrapper flex_column">
            <ChatHeader title={chatName}/>
            <MessageList msgs={roomMsgs}/>
            {activity && <Status statusId={activity.statusId} author={activity.user}/>}
            <TypeBar onChange={this.handleMessageType} onSubmit={this.handleMessageSubmit} value={input}/>
        </div>
        )
    }
}
