import { createLazyFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import DataTable from "../../components/DataTable"
import Dialog from "../../components/Dialog"
import EmployeeForm from "../../components/forms/EmployeeForm"
import {
    useEmployees,
    useCreateEmployee,
    useUpdateEmployee,
    useDeleteEmployee,
} from "../../api/employees"

export const Route = createLazyFileRoute("/employee/")({
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

    const { data, isLoading, isError, refetch } = useEmployees({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search,
        sort_by: sortKey,
        order: sortDir
    })

    const createMutation = useCreateEmployee()
    const updateMutation = useUpdateEmployee()
    const deleteMutation = useDeleteEmployee()

    const employees = data?.data || []
    const totalCount = data?.total || 0

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null })

    return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title text-zinc-900 dark:text-zinc-100">Employees</h2>
                    <p className="page-description text-zinc-500 dark:text-zinc-400">
                        Manage employees and their details from one place.
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
                <p className="text-red-500">Error loading employees.</p>
            ) : (
                <DataTable
                    columns={[
                        { key: "employee_id", label: "Emp ID", sortable: true },
                        {
                            key: "full_name",
                            label: "Full Name",
                            sortable: true,
                        },
                        { key: "email", label: "Email", sortable: true },
                        { key: "department_id", label: "Dept ID", sortable: true },
                    ]}
                    data={employees}
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
                                            "Are you sure you want to delete this employee?",
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
                        ? "Edit employee"
                        : "Create employee"
                }
                description={
                    dialogState.mode === "edit"
                        ? "Update the details of this employee."
                        : "Add a new employee to the organization."
                }
                onClose={closeDialog}
            >
                <EmployeeForm
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
                    onCreate={(employee) => {
                        createMutation.mutate(employee, {
                            onSuccess: closeDialog,
                        })
                    }}
                />
            </Dialog>
        </div>
    )
}
