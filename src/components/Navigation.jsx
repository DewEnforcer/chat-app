import React from 'react'
import NavItem from './NavItem'

export default function Navigation({navItems, appName}) {
    return (
        <nav>
            <ul className="bg-dark">
                {appName && <NavItem path="/" label={appName}/>}
                {navItems.map(n => <NavItem key={n.id} path={n.path} label={n.label}/>)}
            </ul>
        </nav>
    )
}
