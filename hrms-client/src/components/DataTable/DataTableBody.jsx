const DataTableBody = ({ columns, rows, actions, isLoading }) => {
    if (isLoading) {
        return (
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Array.from({ length: 5 }).map((_, i) => (
                    <tr
                        key={i}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                        {columns.map((col, j) => (
                            <td key={j} className="px-6 py-4 whitespace-nowrap">
                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-3/4"></div>
                            </td>
                        ))}
                        {actions && (
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-16 inline-block ml-auto"></div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        );
    }

    if (!rows || rows.length === 0) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={columns.length + (actions ? 1 : 0)}
                        className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                    >
                        No data found.
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {rows.map((row, i) => (
                <tr
                    key={i}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                    {columns.map((col) => (
                        <td
                            key={col.key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-300"
                        >
                            {/* If col specifies a render function, call it. Otherwise fallback to the raw cell value */}
                            {col.render ? col.render(row) : row[col.key]}
                        </td>
                    ))}

                    {actions && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 justify-end items-center">
                            {actions.map((Action, j) => (
                                <Action key={j} row={row} />
                            ))}
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default DataTableBody;
