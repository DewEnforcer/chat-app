import React from 'react'

export default function TypeBar({onChange, onSubmit, value}) {
    return (
        <div className="chat_typebar">
            <textarea value={value} onChange={e => onChange(e.target.value)}/>
            <i className="fa fa-paper-plane" onClick={onSubmit} aria-hidden="true"></i>
        </div>
    )
}