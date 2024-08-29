import React, { useState } from "react";
import { FiX } from "react-icons/fi";
// Using react-icons for the X icon

interface TextInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  ariaLabel?: string;
  required?: boolean;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "Enter text...",
  value,
  onChange,
  id,
  label,
  ariaLabel,
  required = false,
  className = "",
}) => {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          //   onChange={(e) => {
          //     onChange(e);
          //   }}
          required={required}
          aria-label={ariaLabel || label}
          className={`
            w-full 
            px-4 
            py-2 
            border 
            border-gray-300 
            rounded-md 
            shadow-sm 
            focus:outline-none 
            focus:border-blue-500 
            focus:ring-1 
            focus:ring-blue-500 
            transition 
            duration-300 
            ease-in-out 
            hover:border-blue-400
            hover:shadow-md
            disabled:bg-gray-200
            disabled:cursor-not-allowed
            ${className}
          `}
        />
        {value && (
          <button
            type="button"
            // onClick={handleClear}
            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear input"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
