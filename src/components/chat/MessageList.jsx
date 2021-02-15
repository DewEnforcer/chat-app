import React, { Component } from 'react'
import Message from './Message'
import SystemMessage from './SystemMessage';

export default class MessageList extends Component {
    listEl = React.createRef();

    componentDidUpdate() {
        if (!this.listEl.current.lastChild) return;
        this.listEl.current.lastChild.scrollIntoView();
    }

    render() {
        const {msgs} = this.props;

        return (
            <div ref={this.listEl} className="message_list list">
                {msgs.length === 0 && <span>Welcome to the chatroom!</span>}
                {msgs.map(m => m.author === "system" ? <SystemMessage key={m.id} msgData={m}/> : <Message key={m.id} msg={m}/>)}
            </div>
        )
    }
}
