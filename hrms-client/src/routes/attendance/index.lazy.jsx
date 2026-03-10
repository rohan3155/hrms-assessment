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
} from "../../api/attendances";

export const Route = createLazyFileRoute('/attendance/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [dialogState, setDialogState] = useState({
        isOpen: false,
        mode: "create",
        record: null,
    });
    const [apiError, setApiError] = useState(null);

    const { data, isLoading, isError } = useAttendances();
    const createMutation = useCreateAttendance();
    const updateMutation = useUpdateAttendance();
    const deleteMutation = useDeleteAttendance();

    const attendances = data?.data || [];

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null });

    return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title">Attendance</h2>
                    <p className="page-description">
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

            {isLoading ? (
                <p>Loading attendance records...</p>
            ) : isError ? (
                <p>Error loading attendance records.</p>
            ) : (
                <DataTable
                    columns={[
                        { key: "employee_id", label: "Emp ID", sortable: true },
                        { key: "date", label: "Date", sortable: true },
                        { key: "check_in", label: "Check In" },
                        { key: "check_out", label: "Check Out" },
                        { key: "status", label: "Status" },
                    ]}
                    data={attendances}
                    actions={[
                        ({ row }) => (
                            <button
                                onClick={() => {
                                    setApiError(null);
                                    setDialogState({
                                        isOpen: true,
                                        mode: "edit",
                                        record: row,
                                    });
                                }}
                            >
                                Edit Status
                            </button>
                        ),
                        ({ row }) => (
                            <button
                                onClick={() => {
                                    console.log(row);
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
