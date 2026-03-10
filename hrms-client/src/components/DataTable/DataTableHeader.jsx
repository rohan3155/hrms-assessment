const DataTableHeader = ({ columns, onSort, sortKey, sortDir }) => {
	return (
		<thead>
			<tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
				{columns.map(col => (
					<th
						key={col.key}
						onClick={() => col.sortable && onSort(col.key)}
						className={`text-left px-6 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors' : ''}`}
					>
						<div className="flex items-center gap-1">
							{col.label}
							{col.sortable && sortKey === col.key && (
								<span className="text-indigo-600 dark:text-indigo-400">
									{sortDir === "asc" ? "↑" : "↓"}
								</span>
							)}
						</div>
					</th>
				))}
				<th className="text-right px-6 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
					Actions
				</th>
			</tr>
		</thead>
	)
}

export default DataTableHeader