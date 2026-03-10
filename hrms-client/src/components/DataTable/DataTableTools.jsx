const DataTableTools = ({ search, setSearch }) => {
        return (
                <div className="flex justify-between p-3 border-b">

                        <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="border px-3 py-1 rounded"
                        />

                </div>
        )
}

export default DataTableTools