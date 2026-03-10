import { useActionState, useEffect } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"

const initialState = {
	error: "",
	values: null,
	success: false,
}

const AttendanceForm = ({ onCreate, onCancel, onSuccess }) => {
	const [state, formAction] = useActionState((_, formData) => {
		const employee_id = formData.get("employee_id")?.toString().trim() ?? ""
		const date = formData.get("date")?.toString().trim() ?? ""
		const check_in = formData.get("check_in")?.toString().trim() ?? ""
		const check_out = formData.get("check_out")?.toString().trim() ?? ""
		const status = formData.get("status")?.toString().trim() ?? ""

		if (!employee_id || !date || !status) {
			return {
				error: "Employee ID, Date and Status are required.",
				values: { employee_id, date, check_in, check_out, status },
				success: false,
			}
		}

		onCreate({
			employee_id: parseInt(employee_id, 10),
			date,
			check_in,
			check_out,
			status,
		})

		return {
			...initialState,
			success: true,
		}
	}, initialState)

	useEffect(() => {
		if (state.success) {
			onSuccess()
		}
	}, [onSuccess, state.success])

	return (
		<form action={formAction} className="form-stack">
			<FormField
				label="Employee ID"
				name="employee_id"
				placeholder="Ex: 1001"
				defaultValue={state.values?.employee_id}
				required
			/>
			<FormField
				label="Date"
				name="date"
				type="date"
				placeholder="Ex: 2023-10-27"
				defaultValue={state.values?.date}
				required
			/>
			<FormField
				label="Check In"
				name="check_in"
				type="time"
				placeholder="Ex: 09:00"
				defaultValue={state.values?.check_in}
			/>
			<FormField
				label="Check Out"
				name="check_out"
				type="time"
				placeholder="Ex: 17:00"
				defaultValue={state.values?.check_out}
			/>
			<FormField
				label="Status"
				name="status"
				placeholder="Ex: Present, Absent, Half-day"
				defaultValue={state.values?.status}
				required
			/>

			{state.error ? <p className="form-error">{state.error}</p> : null}

			<div className="dialog-actions">
				<button type="button" className="secondary-btn" onClick={onCancel}>
					Cancel
				</button>
				<SubmitButton pendingLabel="Saving...">Add attendance</SubmitButton>
			</div>
		</form>
	)
}

export default AttendanceForm
