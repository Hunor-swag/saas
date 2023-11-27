import { Span } from "next/dist/trace";
import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  error?: string;
  name: string;
  register: any;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
};

export default function TextInput({
  label,
  placeholder,
  type,
  error,
  name,
  register,
  required = false,
  minLength = 0,
  defaultValue = "",
}: Props) {
  return (
    <div className="flex flex-col space-y-2 text-sm w-full">
      <label className="">{label}</label>
      <input
        {...register(name, {
          required: required && "This field is required",
          minLength: {
            value: minLength,
            message: `Must be at least ${minLength} characters`,
          },
        })}
        className={`  rounded-sm border px-2 py-2 outline-none focus:border-gray-500 focus:shadow-md transition-all duration-200 ${
          error ? "border-red-600 focus:border-red-600" : "border-gray-200"
        }`}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
