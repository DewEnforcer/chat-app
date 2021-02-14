import React from 'react'

const DEFAULT_TEXTS = {
    1: "has joined the chat! Welcome!",
    2: "has disconnected."

}

export default function SystemMessage({msgData}) {
    const {statusId, text} = msgData;
    const msg = `${text} ${DEFAULT_TEXTS[statusId]}`

    return (
        <div className="system_message">
            <p>{msg}</p>
        </div>
    )
}
