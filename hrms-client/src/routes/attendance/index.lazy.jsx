import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import DataTable from '../../components/DataTable'
import Dialog from '../../components/Dialog'
import AttendanceForm from '../../components/forms/AttendanceForm'
import {
    useAttendances,
    useCreateAttendance,
    useUpdateAttendance,
    useDeleteAttendance,
} from "../../api/attendances"

export const Route = createLazyFileRoute('/attendance/')({
	component: RouteComponent,
})


const formatDateTime = (dateStr, timeStr) => {
    if (!timeStr) return "—";
    try {
        const [y, m, d] = dateStr.split("-");
        const [hour, min] = timeStr.split(":");
        const date = new Date(y, m - 1, d, hour, min);

        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(date);
    } catch (e) {
        return timeStr;
    }
};

function RouteComponent() {
	const [dialogState, setDialogState] = useState({
        isOpen: false,
        mode: "create",
        record: null,
    })
    const [apiError, setApiError] = useState(null)

    // Table state
    const [search, setSearch] = useState("")
    const [sortKey, setSortKey] = useState("id")
    const [sortDir, setSortDir] = useState("desc")
    const [page, setPage] = useState(1)
    const pageSize = 10

    const { data, isLoading, isError, refetch } = useAttendances({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        search,
        sort_by: sortKey,
        order: sortDir
    })

    const createMutation = useCreateAttendance()
    const updateMutation = useUpdateAttendance()
    const deleteMutation = useDeleteAttendance()

    const attendances = data?.data || []
    const totalCount = data?.total || 0

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null })

    return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title text-zinc-900 dark:text-zinc-100">
                        Attendance
                    </h2>
                    <p className="page-description text-zinc-500 dark:text-zinc-400">
                        Manage employee attendance and shifts from one place.
                    </p>
                </div>

                <button
                    type="button"
                    className="primary-btn"
                    onClick={() => {
                        setApiError(null);
                        setDialogState({
                            isOpen: true,
                            mode: "create",
                            record: null,
                        });
                    }}
                >
                    Log attendance
                </button>
            </div>

            {apiError && <p className="text-red-500 mb-4">{apiError}</p>}

            {isError ? (
                <p className="text-red-500">
                    Error loading attendance records.
                </p>
            ) : (
                <DataTable
                    columns={[
                        { key: "employee_id", label: "Emp ID", sortable: true },
                        {
                            key: "date",
                            label: "Date",
                            sortable: true,
                            render: (row) => {
                                const [y, m, d] = row.date.split("-");
                                return new Date(y, m - 1, d).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    },
                                );
                            },
                        },
                        {
                            key: "check_in",
                            label: "Check In",
                            sortable: true,
                            render: (row) =>
                                formatDateTime(row.date, row.check_in),
                        },
                        {
                            key: "check_out",
                            label: "Check Out",
                            sortable: true,
                            render: (row) =>
                                formatDateTime(row.date, row.check_out),
                        },
                        {
                            key: "status",
                            label: "Status",
                            sortable: true,
                            render: (row) => (
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${
                                        row.status === "checked-in"
                                            ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                                            : row.status === "checked-out"
                                              ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                                              : "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                                    }`}
                                >
                                    {row.status}
                                </span>
                            ),
                        },
                    ]}
                    data={attendances}
                    isLoading={isLoading}
                    search={search}
                    onSearchChange={setSearch}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSortChange={(dir, key) => {
                        setSortDir(dir);
                        setSortKey(key);
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
                                    setApiError(null);
                                    setDialogState({
                                        isOpen: true,
                                        mode: "edit",
                                        record: row,
                                    });
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
                                            "Are you sure you want to delete this attendance record?",
                                        )
                                    ) {
                                        deleteMutation.mutate(row.id);
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
                        ? "Update Attendance Status"
                        : "Log attendance"
                }
                description={
                    dialogState.mode === "edit"
                        ? "Check in or check out this employee."
                        : "Add an attendance record for an employee."
                }
                onClose={closeDialog}
            >
                <AttendanceForm
                    initialData={dialogState.record}
                    onCancel={closeDialog}
                    onSuccess={closeDialog}
                    onUpdate={(updateData) => {
                        updateMutation.mutate(
                            { id: dialogState.record.id, data: updateData },
                            {
                                onSuccess: closeDialog,
                                onError: (error) => setApiError(error.message),
                            },
                        );
                    }}
                    onCreate={(attendance) => {
                        createMutation.mutate(attendance, {
                            onSuccess: closeDialog,
                            onError: (error) => {
                                setApiError(error.message);
                                closeDialog();
                            },
                        });
                    }}
                />
            </Dialog>
        </div>
    );
}
