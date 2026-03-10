import DataTableHeader from "./DataTableHeader"
import DataTableFooter from "./DataTableFooter"
import DataTableBody from "./DataTableBody"
import DataTableTools from "./DataTableTools"

const DataTable = ({
    columns,
    data,
    actions,
    isLoading,
    isFetching,
    search,
    onSearchChange,
    sortKey,
    sortDir,
    onSortChange,
    page,
    onPageChange,
    totalCount,
    pageSize = 10,
    onRefresh,
}) => {
    const handleSort = (key) => {
        if (sortKey === key) {
            onSortChange(sortDir === "asc" ? "desc" : "asc", key);
        } else {
            onSortChange("asc", key);
        }
    };

    return (
        <div className="w-full border rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm relative">
            <DataTableTools
                search={search}
                setSearch={(newSearch) => {
                    onSearchChange(newSearch);
                    // Reset page back to 1 when searching
                    onPageChange(1);
                }}
                onRefresh={onRefresh}
                isFetching={isFetching}
            />

            {/* Translucent overlay disabled state when loading new data but preserving old data skeleton heights */}
            {isFetching && data?.length > 0 && (
                <div className="absolute inset-0 top-[69px] bottom-[53px] bg-white/50 dark:bg-black/20 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <DataTableHeader
                        columns={columns}
                        onSort={handleSort}
                        sortKey={sortKey}
                        sortDir={sortDir}
                    />

                    <DataTableBody
                        columns={columns}
                        rows={data}
                        actions={actions}
                        // If we don't have existing rows and are loading, show skeletons
                        isLoading={isLoading && (!data || data.length === 0)}
                    />
                </table>
            </div>

            <DataTableFooter
                count={totalCount}
                page={page}
                pageSize={pageSize}
                setPage={onPageChange}
            />
        </div>
    );
};

export default DataTable