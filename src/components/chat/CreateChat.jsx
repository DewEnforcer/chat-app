import React, { Component } from 'react'
import Joi from "joi-browser";

import Form from '../common/form'
import chatService from "../../services/chatService";

export default class CreateChat extends Form {
    state = {
        data: {
            username: "",
            chatName: "",
        },
        errors: {},
        inputs: [
            {path: "username", name: "username", label: "Username", type: "text"},
            {path: "chatName", name: "chatName", label: "Chat name", type: "text"}

        ]
    }

    entranceStatus = this.props.entranceStatus;

    schema = {
        username: Joi.string().required(),
        chatName: Joi.string().min(3).max(15).required()
    }


    doSubmit = async () => {
        const {data, ok} = await chatService.createChat(this.state.data);
        if (!ok) return console.log("Failed to create chat");

        this.props.history.push("/chatRoom", data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Create new chat!")}
            </form>
        )
    }
}
