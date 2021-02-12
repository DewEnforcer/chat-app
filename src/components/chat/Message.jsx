import React from 'react'

const user = {id: 1};

export default function Message({msg}) {
    const {text, author} = msg; //use msg object

    let cls = "message_box flex_column";
    cls += author.id === user.id ? " message_box_me" : "";

    return (
        <div className={cls}>
            <span className="message_author">{author.username}</span>
            <p>{text}</p>
        </div>
    )
}
