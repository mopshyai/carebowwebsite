import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  color = "primary",
}: StatsCardProps) {
  const colors = {
    primary: "bg-primary-100 text-primary-700",
    secondary: "bg-secondary-100 text-secondary-700",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    error: "bg-error-soft text-error",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>

          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-error" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-success" : "text-error"
                }`}
              >
                {trend.value}%
              </span>
              {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>
          )}

          {!trend && subtitle && (
            <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
    </Card>
  );
}
