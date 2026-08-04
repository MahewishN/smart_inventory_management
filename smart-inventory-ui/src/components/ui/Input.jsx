function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    className = "",
}) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`
                w-full
                px-4
                py-3
                border
                border-slate-300
                rounded-xl
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition-all
                ${className}
            `}
        />
    );
}

export default Input;