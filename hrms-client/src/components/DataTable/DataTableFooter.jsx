const DataTableFooter = ({
count,
page,
pageSize,
setPage
}) => {

const totalPages = Math.ceil(count / pageSize)

return (
<div className="flex items-center justify-between p-3 border-t text-sm text-gray-500">

<span>
{count} rows
</span>

<div className="flex items-center gap-2">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="px-3 py-1 border rounded disabled:opacity-40"
>
Prev
</button>

<span>
Page {page} / {totalPages}
</span>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
className="px-3 py-1 border rounded disabled:opacity-40"
>
Next
</button>

</div>

</div>
)
}

export default DataTableFooter