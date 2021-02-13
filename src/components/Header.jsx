import React from 'react'
import Navigation from './Navigation'

const navItems = [
    {id: 1, path: "/joinChat", label: "Join chat"},
    {id: 2, path: "/createChat", label: "New chat"},
]

export default function Header() {
    return (
        <div className="header">
            <Navigation appName="React chat" navItems={navItems}/>
        </div>
    )
}
