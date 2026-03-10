import { useActionState, useEffect } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"

const initialState = {
	error: "",
	values: null,
	success: false,
}

const EmployeeForm = ({ onCreate, onCancel, onSuccess }) => {
	const [state, formAction] = useActionState((_, formData) => {
		const employee_id = formData.get("employee_id")?.toString().trim() ?? ""
		const email = formData.get("email")?.toString().trim() ?? ""
		const full_name = formData.get("full_name")?.toString().trim() ?? ""
		const department_id = formData.get("department_id")?.toString().trim() ?? ""

		if (!employee_id || !email || !full_name || !department_id) {
			return {
				error: "All fields are required.",
				values: { employee_id, email, full_name, department_id },
				success: false,
			}
		}

		onCreate({
			employee_id: parseInt(employee_id, 10),
			email,
			full_name,
			department_id: parseInt(department_id, 10),
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
				label="Full Name"
				name="full_name"
				placeholder="Ex: John Doe"
				defaultValue={state.values?.full_name}
				required
			/>
			<FormField
				label="Email address"
				name="email"
				type="email"
				placeholder="Ex: john@example.com"
				defaultValue={state.values?.email}
				required
			/>
			<FormField
				label="Department ID"
				name="department_id"
				placeholder="Ex: 1"
				defaultValue={state.values?.department_id}
				required
			/>

			{state.error ? <p className="form-error">{state.error}</p> : null}

			<div className="dialog-actions">
				<button type="button" className="secondary-btn" onClick={onCancel}>
					Cancel
				</button>
				<SubmitButton pendingLabel="Creating...">Create employee</SubmitButton>
			</div>
		</form>
	)
}

export default EmployeeForm
