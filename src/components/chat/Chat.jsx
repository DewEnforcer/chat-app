import React, { Component } from 'react'
import {io} from "socket.io-client";
import Loader from '../Loader';

import TypeBar from '../TypeBar'
import MessageList from './MessageList'
import Status from './Status'

const user = {
    id: 1,
    username: "Dew"
}

export default class Chat extends Component {
    state = {
        roomMsgs: [],
        input: "",
        connected: false,
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

        socket.emit("msg", {msg: input});
    }

    componentDidMount() {
        let newSocket = io("http://localhost:5000" ,{transports: ['websocket']});

        newSocket.on("connect", () => {
            let chatId = this.props.chatId;
            this.setState({...this.state, connected: true});
            newSocket.emit("chatConnect", {chatId, user});
        })

        newSocket.on("data", ({msgs}) => {
            this.setState({...this.state, roomMsgs: msgs});
        })
        newSocket.on("msg", (msg) => {
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
        const {roomMsgs, input} = this.state;

        return (
        <div className="chat_wrapper flex_column">
            <MessageList msgs={roomMsgs}/>
            <Status statusId={1} author={{username: "Tester"}}/>
            <TypeBar onChange={this.handleMessageType} onSubmit={this.handleMessageSubmit} value={input}/>
        </div>
        )
    }
}
