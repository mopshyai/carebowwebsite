import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  dot = false,
  className
}: BadgeProps) {
  const variants = {
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    success: "bg-success-soft text-green-800",
    warning: "bg-warning-soft text-yellow-800",
    danger: "bg-error-soft text-red-800",
    info: "bg-info-soft text-blue-800",
    neutral: "bg-gray-100 text-gray-800",
  };

  const dotColors = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-error",
    info: "bg-info",
    neutral: "bg-gray-500",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
