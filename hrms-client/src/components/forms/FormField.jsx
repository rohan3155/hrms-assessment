const FormField = ({
        label,
        name,
        type = "text",
        placeholder,
        defaultValue,
        required = false,
        options = [],
}) => {
        const inputId = `field-${name}`

        return (
                <label className="form-field" htmlFor={inputId}>
                        <span className="form-label">{label}</span>

                        {type === "select" ? (
                                <select
                                        id={inputId}
                                        name={name}
                                        defaultValue={defaultValue ?? ""}
                                        required={required}
                                        className="form-input"
                                >
                                        <option value="" disabled>Select {label.toLowerCase()}</option>
                                        {options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                        {option.label}
                                                </option>
                                        ))}
                                </select>
                        ) : (
                                <input
                                        id={inputId}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        defaultValue={defaultValue}
                                        required={required}
                                        className="form-input"
                                />
                        )}
                </label>
        )
}

export default FormField
