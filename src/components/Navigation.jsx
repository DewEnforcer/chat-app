import React from 'react'
import NavItem from './NavItem'

export default function Navigation({navItems}) {
    return (
        <nav>
            <ul className="bg-dark">
                {navItems.map(n => <NavItem key={n.id} path={n.path} label={n.label}/>)}
            </ul>
        </nav>
    )
}
