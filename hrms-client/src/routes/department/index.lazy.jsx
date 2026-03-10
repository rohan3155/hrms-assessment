import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import DepartmentForm from '../../components/forms/DepartmentForm'
import {
    useDepartments,
    useCreateDepartment,
    useUpdateDepartment,
    useDeleteDepartment,
} from "../../api/departments"

export const Route = createLazyFileRoute('/department/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [dialogState, setDialogState] = useState({
        isOpen: false,
        mode: "create",
        record: null,
    })

    // Table state
    const [search, setSearch] = useState("")
    const [sortKey, setSortKey] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [page, setPage] = useState(1)
    const pageSize = 10

    const { data, isLoading, isError, refetch } = useDepartments({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search,
        sort_by: sortKey,
        order: sortDir
    })

    const createMutation = useCreateDepartment()
    const updateMutation = useUpdateDepartment()
    const deleteMutation = useDeleteDepartment()

    const departments = data?.data || []
    const totalCount = data?.total || 0

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null })

	return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title text-zinc-900 dark:text-zinc-100">Departments</h2>
                    <p className="page-description text-zinc-500 dark:text-zinc-400">
                        Manage departments from one place.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-btn"
                    onClick={() =>
                        setDialogState({
                            isOpen: true,
                            mode: "create",
                            record: null,
                        })
                    }
                >
                    Create new
                </button>
            </div>

            {isError ? (
                <p className="text-red-500">Error loading departments.</p>
            ) : (
                <DataTable
                    columns={[
                        { key: "id", label: "ID", sortable: true },
                        { key: "name", label: "Name", sortable: true },
                    ]}
                    data={departments}
                    isLoading={isLoading}
                    search={search}
                    onSearchChange={setSearch}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSortChange={(dir, key) => {
                        setSortDir(dir)
                        setSortKey(key)
                    }}
                    page={page}
                    onPageChange={setPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onRefresh={refetch}
                    actions={[
                        ({ row }) => (
                            <button
                                className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                onClick={() => {
                                    setDialogState({
                                        isOpen: true,
                                        mode: "edit",
                                        record: row,
                                    })
                                }}
                            >
                                Edit
                            </button>
                        ),
                        ({ row }) => (
                            <button
                                className="text-red-600 dark:text-red-400 hover:underline"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this department?",
                                        )
                                    ) {
                                        deleteMutation.mutate(row.id)
                                    }
                                }}
                            >
                                Delete
                            </button>
                        ),
                    ]}
                />
            )}

            <Dialog
                open={dialogState.isOpen}
                title={
                    dialogState.mode === "edit"
                        ? "Edit department"
                        : "Create department"
                }
                description={
                    dialogState.mode === "edit"
                        ? "Update the details of this department."
                        : "Add a department."
                }
                onClose={closeDialog}
            >
                <DepartmentForm
                    initialData={dialogState.record}
                    onCancel={closeDialog}
                    onSuccess={closeDialog}
                    onUpdate={(updateData) => {
                        updateMutation.mutate(
                            { id: dialogState.record.id, data: updateData },
                            {
                                onSuccess: closeDialog,
                            },
                        )
                    }}
                    onCreate={(department) => {
                        createMutation.mutate(department, {
                            onSuccess: closeDialog,
                        })
                    }}
                />
            </Dialog>
        </div>
    )
}
