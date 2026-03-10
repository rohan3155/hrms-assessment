import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

const Dashboard = ({ children }) => {
        return (
                <div className="dashboard">

                        <Sidebar />

                        <Header />

                        <main className="dashboard-content">
                                {children}
                        </main>

                </div>
        )
}

export default Dashboard