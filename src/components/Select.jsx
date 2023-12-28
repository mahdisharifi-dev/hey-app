export default function Select(props) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="flex items-center justify-between gap-4">
                <p className="text-gray-500 text-sm">{props.label}</p>
                {props.error && <p className="text-[10px] text-red-500">{props.error}</p>}
            </label>
            <select
                {...props}
                className={`p-2 border rounded-lg outline-none focus:border-teal-500 ${
                    props.error ? "border-red-500" : ""
                } ${props.className ? props.className : ""}`}
            >
                <option value="">Choose ...</option>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.title}
                    </option>
                ))}
            </select>
        </div>
    );
}
