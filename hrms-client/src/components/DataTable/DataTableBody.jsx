const DataTableBody = ({ columns, rows, actions }) => {
        return (
                <tbody >

                        {rows.map((row, i) => (
                                <tr key={i} className="border-b">

                                        {columns.map(col => (
                                                <td key={col.key} className="px-4 py-3">
                                                        {row[col.key]}
                                                </td>
                                        ))}

                                        {actions && (
                                                <td className="px-4 py-3 flex gap-2">
                                                        {actions.map((Action, i) => (
                                                                <Action key={i} row={row} />
                                                        ))}
                                                </td>
                                        )}

                                </tr>
                        ))}

                </tbody>
        )
}

export default DataTableBody