import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import DataTable from "../../components/DataTable";
import Dialog from "../../components/Dialog";
import EmployeeForm from "../../components/forms/EmployeeForm";
import {
    useEmployees,
    useCreateEmployee,
    useUpdateEmployee,
    useDeleteEmployee,
} from "../../api/employees";

export const Route = createLazyFileRoute("/employee/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [dialogState, setDialogState] = useState({
        isOpen: false,
        mode: "create",
        record: null,
    });
    const { data, isLoading, isError } = useEmployees();
    const createMutation = useCreateEmployee();
    const updateMutation = useUpdateEmployee();
    const deleteMutation = useDeleteEmployee();

    const employees = data?.data || [];

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null });

    return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title">Employees</h2>
                    <p className="page-description">
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

            {isLoading ? (
                <p>Loading employees...</p>
            ) : isError ? (
                <p>Error loading employees.</p>
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
                        { key: "department_id", label: "Dept ID" },
                    ]}
                    data={employees}
                    actions={[
                        ({ row }) => (
                            <button
                                onClick={() => {
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
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this employee?",
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
                        );
                    }}
                    onCreate={(employee) => {
                        createMutation.mutate(employee, {
                            onSuccess: closeDialog,
                        });
                    }}
                />
            </Dialog>
        </div>
    );
}
