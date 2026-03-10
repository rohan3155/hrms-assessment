import { useActionState, useEffect } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"
import { useEmployees } from "../../api/employees";

const initialState = {
	error: "",
	values: null,
	success: false,
}

// Get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

const AttendanceForm = ({ initialData, onUpdate, onCreate, onCancel, onSuccess }) => {
	// Pre-load employees list to populate the select drop-down
	const { data: employeesData } = useEmployees({ skip: 0, limit: 100 })
	const employees = employeesData?.data || []

	const isEditMode = !!initialData;
	const isCheckedIn = isEditMode && (initialData.status === "checked-in" || initialData.check_in != null);

	const [state, formAction] = useActionState((_, formData) => {
		if (isEditMode) {
            // Update logic (only status is allowed via endpoint)
            const action = formData.get("action");

            if (action === "check-out") {
                onUpdate({ status: "checked-out" });
            } else if (action === "check-in") {
                onUpdate({ status: "checked-in" });
            } else {
                return {
                    error: "Invalid action",
                    values: {},
                    success: false,
                };
            }

            return { ...initialState, success: true };
        } else {
            // Create logic
            const employee_id =
                formData.get("employee_id")?.toString().trim() ?? "";
            const date = formData.get("date")?.toString().trim() ?? "";
            const isCheckedInNow = formData.get("isCheckedInNow") === "on";

            if (!employee_id || !date) {
                return {
                    error: "Employee and Date are required.",
                    values: { employee_id, date, isCheckedInNow },
                    success: false,
                };
            }

            onCreate({
                employee_id: parseInt(employee_id, 10),
                date,
                isCheckedInNow,
            });

            return {
                ...initialState,
                success: true,
            };
        }
	}, initialState)

	useEffect(() => {
		if (state.success) {
			onSuccess()
		}
	}, [onSuccess, state.success])

	const employeeOptions = employees.map((e) => ({
        value: e.id.toString(),
        label: `${e.full_name} (ID: ${e.employee_id})`,
    }));

    const defaultEmployeeId =
        state.values?.employee_id ?? initialData?.employee_id?.toString() ?? "";
    const defaultDate =
        state.values?.date ?? initialData?.date ?? getTodayDateString();

	return (
        <form action={formAction} className="form-stack">
            {isEditMode ? (
                // Edit Mode Form (Status update only)
                <>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg space-y-2 mb-4 text-sm text-zinc-700 dark:text-zinc-300">
                        <p>
                            <span className="font-semibold">Employee ID:</span>{" "}
                            {initialData.employee_id}
                        </p>
                        <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {initialData.date}
                        </p>
                        <p>
                            <span className="font-semibold">
                                Current Status:
                            </span>{" "}
                            {initialData.status}
                        </p>
                        {initialData.check_in && (
                            <p>
                                <span className="font-semibold">
                                    Checked In At:
                                </span>{" "}
                                {initialData.check_in}
                            </p>
                        )}
                        {initialData.check_out && (
                            <p>
                                <span className="font-semibold">
                                    Checked Out At:
                                </span>{" "}
                                {initialData.check_out}
                            </p>
                        )}
                    </div>

                    {state.error ? (
                        <p className="form-error">{state.error}</p>
                    ) : null}

                    <div className="dialog-actions mt-6">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        {isCheckedIn && !initialData.check_out ? (
                            <button
                                type="submit"
                                name="action"
                                value="check-out"
                                className="primary-btn bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                Check Out
                            </button>
                        ) : !initialData.check_in ? (
                            <button
                                type="submit"
                                name="action"
                                value="check-in"
                                className="primary-btn bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                                Check In
                            </button>
                        ) : null}
                    </div>
                </>
            ) : (
                // Create Mode Form
                <>
                    <FormField
                        label="Employee"
                        name="employee_id"
                        type="select"
                        options={employeeOptions}
                        defaultValue={defaultEmployeeId}
                        required
                    />
                    <FormField
                        label="Date"
                        name="date"
                        type="date"
                        defaultValue={defaultDate}
                        required
                    />

                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="isCheckedInNow"
                            name="isCheckedInNow"
                            defaultChecked={
                                state.values
                                    ? state.values.isCheckedInNow
                                    : true
                            }
                            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-600"
                        />
                        <label
                            htmlFor="isCheckedInNow"
                            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                        >
                            Checking in now?
                        </label>
                    </div>

                    {state.error ? (
                        <p className="form-error">{state.error}</p>
                    ) : null}

                    <div className="dialog-actions mt-6">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <SubmitButton pendingLabel="Saving...">
                            Add attendance
                        </SubmitButton>
                    </div>
                </>
            )}
        </form>
    );
}

export default AttendanceForm
