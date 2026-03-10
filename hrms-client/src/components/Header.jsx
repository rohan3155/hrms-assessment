import React from "react"
import { Menu } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

const Header = ({ toggleSidebar }) => {
return (
<header className="header">
<button className="menu-btn" onClick={toggleSidebar} type="button" aria-label="Toggle navigation menu">
<Menu size={20} />
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
