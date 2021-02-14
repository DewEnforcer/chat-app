import React, { Component } from 'react'
import {io} from "socket.io-client";
import Loader from '../Loader';

import TypeBar from '../TypeBar'
import MessageList from './MessageList'
import Status from './Status'

export default class Chat extends Component {
    state = {
        roomMsgs: [],
        input: "",
        connected: false,
        activity: null,
        socket: null
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

    componentDidMount() {
        let newSocket = io("http://localhost:5000" ,{transports: ['websocket']});

        newSocket.on("connect", () => {
            let chatId = this.props.chatId;
            let user = this.props.user;
            this.setState({...this.state, connected: true});
            newSocket.emit("connectRequest", {chatId, user});
        })

        newSocket.on("chatData", (msgs) => {
            this.setState({...this.state, roomMsgs: msgs});
        })
        newSocket.on("msg", (msg) => {
            if (!msg) return;
            const newState = {...this.state};
            newState.roomMsgs = [...newState.roomMsgs, msg];
            this.setState(newState);
        })
        
        const newState = {...this.state};
        newState.socket = newSocket;
        this.setState(newState);
    }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }

    render() {
        const {roomMsgs, input, activity, connected} = this.state;

        if (!connected) return <Loader title="Connecting..."/>

        return (
        <div className="chat_wrapper flex_column">
            <MessageList msgs={roomMsgs}/>
            {activity && <Status statusId={activity.statusId} author={activity.user}/>}
            <TypeBar onChange={this.handleMessageType} onSubmit={this.handleMessageSubmit} value={input}/>
        </div>
        )
    }
}
