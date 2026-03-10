import { useState, useMemo, Activity } from "react"
import DataTableHeader from "./DataTableHeader"
import DataTableFooter from "./DataTableFooter"
import DataTableBody from "./DataTableBody"
import DataTableTools from "./DataTableTools"

const DataTable = ({ columns, data, actions }) => {
        const [search, setSearch] = useState("")
        const [sortKey, setSortKey] = useState(null)
        const [sortDir, setSortDir] = useState("asc")
        const [page, setPage] = useState(1)
        const pageSize = 10


        const filtered = useMemo(() => {
                let rows = [...data]

                if (search) {
                        rows = rows.filter(row =>
                                Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
                        )
                }

                if (sortKey) {
                        rows.sort((a, b) => {
                                if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1
                                if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1
                                return 0
                        })
                }

                return rows
        }, [data, search, sortKey, sortDir])

        const handleSort = key => {
                if (sortKey === key) {
                        setSortDir(prev => prev === "asc" ? "desc" : "asc")
                } else {
                        setSortKey(key)
                        setSortDir("asc")
                }
        }
        const paginatedRows = useMemo(() => {
                const start = (page - 1) * pageSize
                return filtered.slice(start, start + pageSize)
        }, [filtered, page])

        return (
                <Activity fallback={<div className="p-6">Loading table...</div>}>

                        <div className="w-full border rounded-lg overflow-hidden">

                                <DataTableTools
                                        search={search}
                                        setSearch={setSearch}
                                />

                                <table className="w-full">

                                        <DataTableHeader
                                                columns={columns}
                                                onSort={handleSort}
                                                sortKey={sortKey}
                                                sortDir={sortDir}
                                        />

                                        <DataTableBody
                                                columns={columns}
                                                rows={paginatedRows}
                                                actions={actions}
                                        />

                                </table>

                                <DataTableFooter
                                        count={filtered.length}
                                        page={page}
                                        pageSize={pageSize}
                                        setPage={setPage}
                                />

                        </div>

                </Activity>
        )
}

export default DataTable