// Button.tsx
import React from "react";

interface ButtonProps {
  variant?: "primary" | "error";
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  className,
}): JSX.Element => {
  const baseClasses = `
    px-6 
    py-2 
    font-semibold 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    transition 
    h-[42px]
    duration-300 
    ease-in-out
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `;

  const variantClasses =
    variant === "primary"
      ? `
    bg-blue-500 
    text-white 
    hover:bg-blue-600 
    active:bg-blue-700 
    focus:ring-blue-500
  `
      : `
    bg-red-500 
    text-white 
    hover:bg-red-600 
    active:bg-red-700 
    focus:ring-red-500
  `;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
