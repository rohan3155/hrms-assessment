import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"

const DataTableTools = ({ search, setSearch, onRefresh, isFetching }) => {
	const [localSearch, setLocalSearch] = useState(search)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (localSearch !== search) {
				setSearch(localSearch)
			}
		}, 500)

		return () => clearTimeout(timeoutId)
	}, [localSearch, search, setSearch])


	return (
        <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800">
            <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search..."
                className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />

            {onRefresh && (
                <button
                    onClick={() => onRefresh()}
                    disabled={isFetching}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Refresh data"
                >
                    <RefreshCw size={18} className={isFetching ? "animate-spin text-indigo-500" : ""} />
                </button>
            )}
        </div>
    );
}

export default DataTableTools