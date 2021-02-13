import React, { Component } from 'react'
import Joi from "joi-browser";
import Form from './common/form'

export default class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            email: "",
            password: ""
        }, 
        errors: {

        },
        inputs: [
            {path: "username", name: "username", label: "Username", type: "text"},
            {path: "email", name: "email", label: "E-mail", type: "text"},
            {path: "password", name: "password", label: "Password", type: "password"},
        ]
    }

    schema = {
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.inputs.map(i => this.renderInput(i))}
                {this.renderButton("Sign-up!")}
            </form>
        )
    }
}
