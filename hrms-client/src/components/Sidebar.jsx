import { Link } from "@tanstack/react-router"
import Logo from "./Logo"
import { Blocks, HistoryIcon, PieChart, Users, Users2 } from "lucide-react"

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
const Sidebar = () => {
        return (
                <aside className="sidebar">
                        <div className="sidebar-logo flex  items-center gap-4">
                                <Logo />
                                <h4 className="font-bold">Acme Inc.</h4>
                        </div>
                        <nav className="sidebar-nav">
                                {
                                        sidebarData.map(({ to, icon, label }) => (
                                                <SidebarLink key={label} to={to} icon={icon} label={label} />
                                        ))
                                }
                        </nav>
                </aside>
        )
}

const SidebarLink = ({ to, label, icon }) => {
        return (
                <Link to={to} className="flex items-center gap-4">
                        {icon}
                        {label}
                </Link>
        )
}


export default Sidebar