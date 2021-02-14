import React, { Component } from 'react'
import Joi from "joi-browser";

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
        chatId: Joi.string().max(256).allow("").required()
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
        if (!ok) return console.log("Failed to join chat");

        this.props.history.push("/chatRoom", data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Join chat!")}
            </form>
        )
    }
}
