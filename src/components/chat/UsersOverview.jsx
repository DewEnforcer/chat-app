import React from 'react'

export default function UsersOverview({users}) {
    console.log(users);
    return (
        <div className="chat_users_overview">
            <h2>Users present in this chat room</h2>
            {users.map(u => <span key={u.id}>{u.username}</span>)}
        </div>
    )
}
