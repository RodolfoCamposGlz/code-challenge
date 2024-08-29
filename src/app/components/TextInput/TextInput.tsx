import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ICity } from "@/app/pages/home.types";

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
  options: any;
  onSelect: (option: any) => void;
  isLoading?: boolean;
  handleClear: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder = "Enter text...",
  value,
  onChange,
  id,
  label,
  ariaLabel,
  onSelect,
  required = false,
  className = "",
  options = [],
  isLoading = false,
  handleClear,
}): JSX.Element => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onOpenMenu = (): void => {
    setIsOptionsOpen(true);
  };

  useOutsideClick({
    ref: dropdownRef,
    handler: () => {
      setIsOptionsOpen(false);
    },
  });
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative" ref={dropdownRef}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          onFocus={() => onOpenMenu()}
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
            onClick={handleClear}
            className="absolute right-3 top-2/4 transform -translate-y-2/4 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear input"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
        {isOptionsOpen && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-2 w-full">Loading...</div>
            ) : options.length > 0 ? (
              <ul>
                {options.map((option: ICity) => (
                  <li
                    key={option.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      onSelect(option);
                      setIsOptionsOpen(false);
                    }}
                  >
                    {option.city_name}, {option.country}, {option.display}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 w-full">No options</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
