import React from 'react';

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly className?: string;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500",
    outline: "border-2 border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
