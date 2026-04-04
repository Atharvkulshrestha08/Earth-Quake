import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-neutral-700 text-neutral-100",
        primary: "bg-primary-500/20 text-primary-400",
        low: "bg-alert-low/20 text-alert-low",
        medium: "bg-alert-medium/20 text-alert-medium",
        high: "bg-alert-high/20 text-alert-high",
        critical: "bg-alert-critical/20 text-alert-critical animate-pulse",
        outline: "border border-current bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
