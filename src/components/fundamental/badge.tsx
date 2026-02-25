import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center w-fit max-w-full shrink-0 rounded-s px-[var(--space-s)] py-[var(--space-xs)] text-caption-medium-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1 cursor-default",
  {
    variants: {
      intent: {
        neutral: "",
        brand: "",
        success: "",
        warning: "",
        destructive: "",
        information: "",
        violet: "",
        magenta: "",
      },
      appearance: {
        bold: "border-transparent",
        subtle: "",
      },
      size: {
        xs: "px-[var(--space-xs)] h-4 [&]:text-body-medium-xsm min-w-[16px] justify-center",
        s: "px-[var(--space-xs)] h-5 [&]:text-body-medium-xsm min-w-[20px] justify-center",
        m: "px-[var(--space-s)] h-6 [&]:text-body-medium-sm",
        l: "px-[var(--space-m)] h-7 [&]:text-body-medium-md",
      },
    },
    compoundVariants: [
      // Neutral intent variants
      {
        intent: "neutral",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--grey-600)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "neutral",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-neutral-subtle)] bg-[var(--grey-100)] text-[var(--color-text-primary)]",
      },
      // Brand intent variants
      {
        intent: "brand",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--color-background-blue-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "brand",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-brand-subtle)] bg-[var(--blue-50)] text-[var(--color-text-brand-bold)]",
      },
      // Success intent variants
      {
        intent: "success",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--color-background-success-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "success",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-success-subtle)] bg-[var(--color-background-success-subtle)] text-[var(--color-text-success-bold)]",
      },
      // Warning intent variants
      {
        intent: "warning",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--color-background-warning-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "warning",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-warning-subtle)] bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning-bold)]",
      },
      // Destructive intent variants
      {
        intent: "destructive",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--color-background-error-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "destructive",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-error-subtle)] bg-[var(--color-background-error-subtle)] text-[var(--color-text-error-bold)]",
      },
      // Information intent variants
      {
        intent: "information",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--color-background-info-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "information",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-info-subtle)] bg-[var(--color-background-info-subtle)] text-[var(--color-text-info-bold)]",
      },
      // Violet intent variants
      {
        intent: "violet",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--violet-500)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "violet",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-violet-subtle)] bg-[var(--violet-50)] text-[var(--violet-600)]",
      },
      // Magenta intent variants
      {
        intent: "magenta",
        appearance: "bold",
        class:
          "border-transparent bg-[var(--magenta-500)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "magenta",
        appearance: "subtle",
        class:
          "border border-[var(--color-border-magenta-subtle)] bg-[var(--magenta-50)] text-[var(--magenta-600)]",
      },
    ],
    defaultVariants: {
      intent: "neutral",
      appearance: "subtle",
      size: "m",
    },
  },
);

// Icon size classes based on badge size
const iconSizeClasses = {
  xs: "w-3 h-3",
  s: "w-3.5 h-3.5",
  m: "w-4 h-4",
  l: "w-[18px] h-[18px]",
} as const;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  /** Whether to truncate overflowing text. Defaults to true. Set to false for numeric content. */
  truncate?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, intent, appearance, size = "m", icon, truncate = true, children, ...props }, ref) => {
    const iconSize = iconSizeClasses[size as keyof typeof iconSizeClasses] ?? iconSizeClasses.m;

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ intent, appearance, size }),
          icon && "gap-[var(--space-xs)]",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className={cn("inline-flex items-center justify-center shrink-0 [&_svg]:w-full [&_svg]:h-full", iconSize)}>
            {icon}
          </span>
        )}
        <span className={cn("min-w-0 whitespace-nowrap", truncate && "overflow-hidden text-ellipsis")}>
          {children}
        </span>
      </div>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants, iconSizeClasses };
