import { useEffect } from "react"
import { X } from "lucide-react"

const Dialog = ({ open, title, description, onClose, children }) => {
        useEffect(() => {
                if (!open) {
                        return undefined
                }

                const handleKeyDown = event => {
                        if (event.key === "Escape") {
                                onClose()
                        }
                }

                const previousOverflow = document.body.style.overflow
                document.body.style.overflow = "hidden"
                window.addEventListener("keydown", handleKeyDown)

                return () => {
                        document.body.style.overflow = previousOverflow
                        window.removeEventListener("keydown", handleKeyDown)
                }
        }, [open, onClose])

        if (!open) {
                        return null
        }

        return (
                <div className="dialog-root" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
                        <button
                                type="button"
                                className="dialog-backdrop"
                                aria-label="Close dialog"
                                onClick={onClose}
                        />

                        <div className="dialog-panel">
                                <div className="dialog-header">
                                        <div>
                                                <h2 id="dialog-title" className="dialog-title">{title}</h2>
                                                {description ? <p className="dialog-description">{description}</p> : null}
                                        </div>

                                        <button
                                                type="button"
                                                className="dialog-close-btn"
                                                aria-label="Close dialog"
                                                onClick={onClose}
                                        >
                                                <X size={18} />
                                        </button>
                                </div>

                                <div className="dialog-body">{children}</div>
                        </div>
                </div>
        )
}

export default Dialog
