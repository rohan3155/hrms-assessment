import { useActionState, useEffect } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"
import { useDepartments } from "../../api/departments"

const initialState = {
	error: "",
	values: null,
	success: false,
}

const EmployeeForm = ({ initialData, onUpdate, onCreate, onCancel, onSuccess }) => {
	const { data: departmentsData } = useDepartments()
	const departments = departmentsData?.data || []

	const isEditMode = !!initialData;

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

		const parsedData = {
			employee_id: parseInt(employee_id, 10),
			email,
			full_name,
			department_id: parseInt(department_id, 10),
		}

		if (isEditMode) {
			onUpdate(parsedData)
		} else {
			onCreate(parsedData)
		}

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

	const departmentOptions = departments.map(d => ({ value: d.id.toString(), label: d.name }))

	const defaultEmployeeId = state.values?.employee_id ?? initialData?.employee_id ?? "";
	const defaultFullName = state.values?.full_name ?? initialData?.full_name ?? "";
	const defaultEmail = state.values?.email ?? initialData?.email ?? "";
	const defaultDepartmentId = state.values?.department_id?.toString() ?? initialData?.department_id?.toString() ?? "";

	return (
		<form action={formAction} className="form-stack">
			<FormField
				label="Employee ID"
				name="employee_id"
				type="number"
				placeholder="Ex: 1001"
				defaultValue={defaultEmployeeId}
				required
			/>
			<FormField
				label="Full Name"
				name="full_name"
				placeholder="Ex: John Doe"
				defaultValue={defaultFullName}
				required
			/>
			<FormField
				label="Email address"
				name="email"
				type="email"
				placeholder="Ex: john@example.com"
				defaultValue={defaultEmail}
				required
			/>
			<FormField
				label="Department"
				name="department_id"
				type="select"
				options={departmentOptions}
				defaultValue={defaultDepartmentId}
				required
			/>

			{state.error ? <p className="form-error">{state.error}</p> : null}

			<div className="dialog-actions">
				<button type="button" className="secondary-btn" onClick={onCancel}>
					Cancel
				</button>
				<SubmitButton pendingLabel={isEditMode ? "Saving..." : "Creating..."}>
					{isEditMode ? "Save Changes" : "Create employee"}
				</SubmitButton>
			</div>
		</form>
	)
}

export default EmployeeForm
