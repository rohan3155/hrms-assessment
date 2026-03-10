import React from "react"
import ThemeToggle from "./ThemeToggle"

const Header = ({ toggleSidebar }) => {
return (
<header className="header">
<button className="menu-btn" onClick={toggleSidebar}>
☰
</button>

<h1 className="logo">Dashboard</h1>

<div className="header-right">
        <ThemeToggle/>
<span className="user">Admin</span>
</div>
</header>
)
}

export default Header