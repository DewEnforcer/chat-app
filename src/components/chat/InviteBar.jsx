import React from 'react'

export default function InviteBar({chatId}) {
    const url = "http://localhost:3000/joinChat/"+chatId;

    const handleCopyInvite = e => {
        e.preventDefault();
        navigator.clipboard.writeText(url);
    }

    return (
        <div className="invite_box">
            <h2>Invite your friends</h2>
            <p>Feeling lonely in your chat room? Better invite some of your friends then! You can do so</p>
            <ul>
                <li><span>By URL: <button className="btn_copy_link" onClick={handleCopyInvite}>Copy</button></span></li>
                <li><span>By entering this chat ID: {chatId}</span></li>
            </ul>
        </div>
    )
}
