import React, { Component } from 'react'
import Joi from "joi-browser";
import Form from "../common/form";
import authService from "../../services/authService";

export default class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {},
        inputs: [
            {path: "username", name: "username", label: "Username", type: "text"},
            {path: "password", name: "password", label: "Password", type: "password"},
        ]
    }

    schema = {
        username: Joi.string().required(),
        password: Joi.string().required(),
    }

    doSubmit = async () => {
        authService.login(this.state.data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Log-in!")}
            </form>
        )
    }
}
