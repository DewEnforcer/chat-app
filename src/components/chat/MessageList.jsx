import React from 'react'
import Message from './Message'

export default function MessageList({msgs}) {
    console.log(msgs);
    return (
        <div className="message_list list">
            {msgs.map(m => <Message key={m.id} msg={m}/>)}
        </div>
    )
}
