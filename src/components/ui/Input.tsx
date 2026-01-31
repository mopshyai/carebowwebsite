"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, rightIcon, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full px-3 py-2.5 border rounded-lg shadow-sm transition-colors duration-200",
              "placeholder:text-gray-400",
              "focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              icon ? "pl-10" : "",
              (rightIcon || isPasswordType) ? "pr-10" : "",
              error
                ? "border-error focus:ring-error focus:border-error"
                : "border-gray-300 hover:border-gray-400",
              className
            )}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {!isPasswordType && rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
        {!error && helperText && <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
