import React from 'react'
import {NavLink} from "react-router-dom"

export default function NavItem({path, label}) {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={path}>{label}</NavLink>
        </li>
    )
}
