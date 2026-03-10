import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

const Dashboard = ({ children }) => {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false)

        useEffect(() => {
                const handleResize = () => {
                        if (window.innerWidth > 900) {
                                setIsSidebarOpen(false)
                        }
                }

                window.addEventListener("resize", handleResize)

                return () => window.removeEventListener("resize", handleResize)
        }, [])

        return (
                <div className={`dashboard ${isSidebarOpen ? "sidebar-open" : ""}`}>

                        <Sidebar
                                isOpen={isSidebarOpen}
                                onClose={() => setIsSidebarOpen(false)}
                        />

                        <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

                        <main className="dashboard-content">
                                {children}
                        </main>

                </div>
        )
}

export default Dashboard
