import { Link } from "@tanstack/react-router"
import Logo from "./Logo"
import { Blocks, HistoryIcon, PieChart, Users2, X } from "lucide-react"

const sidebarData = [
        {
                to: "/",
                icon: <PieChart />,
                label: "Dashboard"
        },
        {
                to: "/department",
                icon: <Blocks />,
                label: "Department"
        },
        {
                to: "/employee",
                icon: <Users2 />,
                label: "Employee"
        },
        {
                to: "/attendance",
                icon: <HistoryIcon />,
                label: "Attendance"
        },
]
const Sidebar = ({ isOpen, onClose }) => {
        console.log(isOpen)
        return (
                <>
                        <button
                                type="button"
                                className={`sidebar-backdrop ${isOpen ? "open" : ""}`}
                                aria-label="Close navigation menu"
                                onClick={onClose}
                        />

                        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                        <div className="sidebar-header">
                                <div className="sidebar-logo flex items-center gap-4">
                                <Logo />
                                <h4 className="font-bold">Acme Inc.</h4>
                        </div>
                                <button
                                        type="button"
                                        className="sidebar-close-btn"
                                        onClick={onClose}
                                        hidden={!isOpen}
                                        aria-label="Close navigation menu"
                                >
                                        <X size={18} />
                                </button>
                        </div>
                        <nav className="sidebar-nav">
                                {
                                        sidebarData.map(({ to, icon, label }) => (
                                                <SidebarLink key={label} to={to} icon={icon} label={label} onNavigate={onClose} />
                                        ))
                                }
                        </nav>
                </aside>
                </>
        )
}

const SidebarLink = ({ to, label, icon, onNavigate }) => {
        return (
                <Link
                        to={to}
                        className={`flex items-center gap-4 `}
                        onClick={onNavigate}
                >
                        {icon}
                        <h4>{label}</h4>
                </Link>
        )
}


export default Sidebar
