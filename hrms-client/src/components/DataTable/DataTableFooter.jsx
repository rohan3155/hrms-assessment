import React from "react"

const DataTableFooter = ({ count, page, pageSize, setPage }) => {
	const totalPages = Math.ceil(count / pageSize)

	return (
		<div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
			<span className="text-sm text-zinc-600 dark:text-zinc-400">
				Showing <span className="font-medium text-zinc-900 dark:text-zinc-100">{count === 0 ? 0 : (page - 1) * pageSize + 1}</span> to <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.min(page * pageSize, count)}</span> of <span className="font-medium text-zinc-900 dark:text-zinc-100">{count}</span> results
			</span>

			<div className="flex gap-2">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					className="px-3 py-1 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-md text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Previous
				</button>
				<button
					disabled={page >= totalPages || count === 0}
					onClick={() => setPage(page + 1)}
					className="px-3 py-1 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-md text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Next
				</button>
			</div>
		</div>
	)
}

export default DataTableFooter