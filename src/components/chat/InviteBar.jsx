import React from 'react'

export default function InviteBar({chatId}) {
    const url = "http://localhost:3000/?token="+chatId;

    return (
        <div className="invite_box">
            <h2>Invite your friends</h2>
            <span>By url: <a href={url}>Click here</a></span>
            <span>By entering this chat id: {chatId}</span>
        </div>
    )
}
