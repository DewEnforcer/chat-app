import React, { Component } from 'react'
import Joi from "joi-browser";
import { toast } from 'react-toastify';

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
        if (!ok)  return toast.error("Unable to create new, make sure you entered all required data or try again later.");

        this.props.history.push("/chatRoom", data);
    }

    render() {
        return (
            <form className="form create_chat_form" onSubmit={this.handleSubmit}>
                <h1>Create a new chat!</h1>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Create new chat!")}
            </form>
        )
    }
}
