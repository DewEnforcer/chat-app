import React, { useContext } from 'react'
import ChatUserContext from '../../context/ChatUserContext';

export default function Message({msg}) {
    const user = useContext(ChatUserContext);
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
