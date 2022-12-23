import React from 'react'
import { NavLink } from 'react-router-dom'
// import PropTypes from 'prop-types'

export default function Navbar() {
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">News Monkey</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active": "nav-link"} aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="bg-dark border-0 nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/business">Business</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/entertainment">Entertainment</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/general">General</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/health">Health</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/science">Science</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/sports">Sports</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/technology">Technology</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active": "nav-link"} aria-current="page" to="/salaat">Salaat</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
