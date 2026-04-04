import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}

export function getSeverityLabel(severity: number): string {
  if (severity <= 1) return "Low";
  if (severity === 2) return "Moderate";
  if (severity === 3) return "High";
  if (severity === 4) return "Severe";
  return "Critical";
}

export function getSeverityColor(severity: number): string {
  if (severity <= 1) return "text-alert-low";
  if (severity === 2) return "text-alert-medium";
  if (severity === 3) return "text-orange-500";
  if (severity === 4) return "text-alert-high";
  return "text-alert-critical";
}

export function getSeverityBgColor(severity: number): string {
  if (severity <= 1) return "bg-alert-low/10 border-alert-low";
  if (severity === 2) return "bg-alert-medium/10 border-alert-medium";
  if (severity === 3) return "bg-orange-500/10 border-orange-500";
  if (severity === 4) return "bg-alert-high/10 border-alert-high";
  return "bg-alert-critical/10 border-alert-critical";
}

export function getAlertTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    FLOOD: "droplets",
    EARTHQUAKE: "activity",
    CYCLONE: "wind",
    DROUGHT: "sun",
    FIRE: "flame",
    TSUNAMI: "waves",
    LANDSLIDE: "mountain",
    HEATWAVE: "thermometer",
    COLDWAVE: "snowflake",
    STORM: "cloud-lightning",
  };
  return icons[type] || "alert-triangle";
}

export function getAlertTypeColor(type: string): string {
  const colors: Record<string, string> = {
    FLOOD: "#3b82f6",
    EARTHQUAKE: "#ef4444",
    CYCLONE: "#f59e0b",
    DROUGHT: "#eab308",
    FIRE: "#dc2626",
    TSUNAMI: "#06b6d4",
    LANDSLIDE: "#78716c",
    HEATWAVE: "#f97316",
    COLDWAVE: "#0ea5e9",
    STORM: "#8b5cf6",
  };
  return colors[type] || "#6b7280";
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length === 10;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return `+91 ${cleaned}`;
}
