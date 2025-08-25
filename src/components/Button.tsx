import React from 'react';
import { ButtonProps } from '@/types';
import { cn } from '@/utils';

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  onClick,
  type = "button",
  ...props
}: Readonly<ButtonProps>) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl focus:ring-green-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border-2 border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
