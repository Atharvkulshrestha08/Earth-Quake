import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "low" | "medium" | "high" | "critical";
  title: string;
  description?: string;
  dismissible?: boolean;
  className?: string;
}

const alertStyles = {
  low: "bg-alert-low/10 border-alert-low text-alert-low",
  medium: "bg-alert-medium/10 border-alert-medium text-alert-medium",
  high: "bg-alert-high/10 border-alert-high text-alert-high",
  critical: "bg-alert-critical/15 border-alert-critical text-alert-critical animate-pulse",
};

export function AlertBanner({
  type,
  title,
  description,
  dismissible = true,
  className,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "border-l-4 px-4 py-3 flex items-start justify-between gap-4",
        alertStyles[type],
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 mt-0.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          {description && (
            <p className="text-sm opacity-90 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  color?: "default" | "low" | "medium" | "high" | "critical";
}

const colorStyles = {
  default: "text-white",
  low: "text-alert-low",
  medium: "text-alert-medium",
  high: "text-alert-high",
  critical: "text-alert-critical",
};

export function StatCard({ label, value, change, trend, icon, color = "default" }: StatCardProps) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-neutral-400">{label}</span>
        {icon && <span className="text-neutral-500">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-2xl font-bold", colorStyles[color])}>{value}</span>
        {change && (
          <span
            className={cn(
              "text-xs",
              trend === "up" && "text-alert-low",
              trend === "down" && "text-alert-high",
              trend === "neutral" && "text-neutral-400"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

interface SeverityMeterProps {
  severity: number;
  maxSeverity?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function SeverityMeter({ severity, maxSeverity = 5, showLabel = true, size = "md" }: SeverityMeterProps) {
  const getColor = (segment: number) => {
    if (segment <= 1) return "bg-alert-low";
    if (segment === 2) return "bg-alert-medium";
    if (segment === 3) return "bg-orange-500";
    if (segment === 4) return "bg-alert-high";
    return "bg-alert-critical";
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex gap-0.5 flex-1 rounded-full overflow-hidden", sizeStyles[size])}>
        {Array.from({ length: maxSeverity }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              getColor(i + 1),
              i + 1 <= severity ? "opacity-100" : "opacity-20"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-neutral-400 w-16 text-right">
          {severity}/{maxSeverity}
        </span>
      )}
    </div>
  );
}

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-2 border-neutral-600 border-t-primary-500 rounded-full animate-spin",
          sizeStyles[size]
        )}
      />
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-neutral-700 rounded", className)} />;
}
