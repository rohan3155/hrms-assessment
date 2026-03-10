import { useActionState, useEffect } from "react"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"

const initialState = {
        error: "",
        values: null,
        success: false,
}

const DepartmentForm = ({ onCreate, onCancel, onSuccess }) => {
        const [state, formAction] = useActionState((_, formData) => {
                const name = formData.get("name")?.toString().trim() ?? ""


                if (!name) {
                        return {
                                error: "All fields are required.",
                                values: { name, email, role },
                                success: false,
                        }
                }

                onCreate({
                        name,
                        email,
                        role,
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
                                label="Department name"
                                name="name"
                                placeholder="Ex: HR, Finance, Marketing"
                                defaultValue={state.values?.name}
                                required
                        />


                        {state.error ? <p className="form-error">{state.error}</p> : null}

                        <div className="dialog-actions">
                                <button type="button" className="secondary-btn" onClick={onCancel}>
                                        Cancel
                                </button>
                                <SubmitButton pendingLabel="Creating...">Create department</SubmitButton>
                        </div>
                </form>
        )
}

export default DepartmentForm
