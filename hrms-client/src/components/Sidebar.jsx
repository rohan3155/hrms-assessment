import { Link } from "@tanstack/react-router"

const Sidebar = () => {
        return (
                <aside className="sidebar">

                        <div className="sidebar-logo">
                                Acme Inc.
                        </div>

                        <nav className="sidebar-nav">
                                <Link to={"/department"}>Department</Link>
                                <Link to={"/employee"}>Employee</Link>
                                <Link to={"/attendance"}>Attendance</Link>
                        </nav>
                </aside>
        )
}



export default Sidebar