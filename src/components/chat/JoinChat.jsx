import React, { Component } from 'react'
import Joi from "joi-browser";
import { toast } from 'react-toastify';

import Form from '../common/form'
import chatService from "../../services/chatService";

export default class JoinChat extends Form {
    state = {
        data: {
            username: "",
            chatId: ""
        },
        errors: {},
        inputs: [
            {path: "username", name: "username", label: "Username", type: "text"},
            {path: "chatId", name: "chatId", label: "Chat ID", type: "text"}
        ]
    }

    schema = {
        username: Joi.string().required(),
        chatId: Joi.string().max(256).required()
    }

    componentDidMount() {
        const {match} = this.props;

        if (!match.params.id) return;

        const newState = {...this.state};
        newState.data.chatId = match.params.id;
        this.setState(newState);
    }

    doSubmit = async () => {
        const {data, ok} = await chatService.joinChat(this.state.data);
        if (!ok) return toast.error("Unable to join the chat, please check your id or try again later.");

        this.props.history.push("/chatRoom", data);
    }

    render() {
        return (
            <form className="form join_chat_form" onSubmit={this.handleSubmit}>
                <h1>Join an already existing chat</h1>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Join chat!")}
            </form>
        )
    }
}
