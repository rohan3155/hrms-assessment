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
} from "../../api/departments";

export const Route = createLazyFileRoute('/department/')({
	component: RouteComponent,
})

function RouteComponent() {
	const [dialogState, setDialogState] = useState({
        isOpen: false,
        mode: "create",
        record: null,
    });
    const { data, isLoading, isError } = useDepartments();
    const createMutation = useCreateDepartment();
    const updateMutation = useUpdateDepartment();
    const deleteMutation = useDeleteDepartment();

    const departments = data?.data || [];

    const closeDialog = () =>
        setDialogState({ isOpen: false, mode: "create", record: null });

	return (
        <div className="space-y-6">
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">Organization</p>
                    <h2 className="page-title">Departments</h2>
                    <p className="page-description">
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

            {isLoading ? (
                <p>Loading departments...</p>
            ) : isError ? (
                <p>Error loading departments.</p>
            ) : (
                <DataTable
                    columns={[
                        { key: "id", label: "ID", sortable: true },
                        { key: "name", label: "Name", sortable: true },
                    ]}
                    data={departments}
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
                                            "Are you sure you want to delete this department?",
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
                        );
                    }}
                    onCreate={(department) => {
                        createMutation.mutate(department, {
                            onSuccess: closeDialog,
                        });
                    }}
                />
            </Dialog>
        </div>
    );
}
