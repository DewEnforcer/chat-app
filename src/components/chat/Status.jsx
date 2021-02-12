import React from 'react'

export default function Status({statusId, author}) {
    let statusString = `${author.username} is typing..`
    if (statusId === 0) return null;

    return (
        <div className="status_wrapper">
            <span>{statusString}</span>
        </div>
    )
}
