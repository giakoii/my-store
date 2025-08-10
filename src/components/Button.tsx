import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "gradient" | "outline";
    className?: string;
    onClick?: () => void;
};

export default function Button({
                                   children,
                                   variant = "primary",
                                   className,
                                   onClick,
                               }: ButtonProps) {
    const baseStyle =
        "px-6 py-3 font-medium rounded-lg transition-all duration-300 shadow-md active:scale-95";

    const variants = {
        primary: "bg-green-600 text-white hover:bg-green-700",
        gradient:
            "bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 text-white hover:opacity-90",
        outline:
            "border border-green-600 text-green-600 bg-white hover:bg-green-50",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className || ""}`}
        >
            {children}
        </button>
    );
}