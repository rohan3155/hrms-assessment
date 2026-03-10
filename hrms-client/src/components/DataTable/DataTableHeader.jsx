const DataTableHeader = ({ columns, onSort, sortKey, sortDir }) => {
        return (
                <thead>
                        <tr className="border-b bg-gray-50">

                                {columns.map(col => (
                                        <th
                                                key={col.key}
                                                onClick={() => col.sortable && onSort(col.key)}
                                                className="text-left px-4 py-3 cursor-pointer"
                                        >
                                                {col.label}
                                                {sortKey === col.key && (sortDir === "asc" ? " ↑" : " ↓")}
                                        </th>
                                ))}
                                <th
                                        key={"Action"}
                                        className="text-left px-4 py-3 cursor-pointer"
                                >
                                        Actions
                                </th>
                        </tr>
                </thead>
        )
}

export default DataTableHeader