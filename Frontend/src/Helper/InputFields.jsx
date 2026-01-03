import { useState } from "react";

export const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  onBlur,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    onBlur?.();
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </label>

      <div
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition
        ${
          touched && error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-zinc-300 dark:border-zinc-700 focus-within:ring-indigo-500"
        }
        focus-within:ring-2`}
      >
        {Icon && <Icon className="w-5 h-5 text-zinc-400" />}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          className="w-full bg-transparent outline-none text-zinc-800 dark:text-zinc-100"
        />
      </div>

      {touched && error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

export const TextareaField = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
        {label}
      </label>

      <textarea
        rows="3"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700
        bg-transparent px-4 py-2 resize-none
        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  );
}
