import React, { Component } from 'react'
import Message from './Message'

export default class MessageList extends Component {
    listEl = React.createRef();

    componentDidUpdate() {
        if (!this.listEl.current.lastChild) return;
        this.listEl.current.lastChild.scrollIntoView();
    }

    render() {
        return (
            <div ref={this.listEl} className="message_list list">
                {this.props.msgs.map(m => <Message key={m.id} msg={m}/>)}
            </div>
        )
    }
}
