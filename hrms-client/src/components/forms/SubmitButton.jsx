import { useFormStatus } from "react-dom"

const SubmitButton = ({ children, pendingLabel = "Saving..." }) => {
        const { pending } = useFormStatus()

        return (
                <button type="submit" className="primary-btn" disabled={pending}>
                        {pending ? pendingLabel : children}
                </button>
        )
}

export default SubmitButton
