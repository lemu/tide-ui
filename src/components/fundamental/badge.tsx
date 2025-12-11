import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center w-fit max-w-full rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)] text-caption-medium-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1 cursor-default",
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
        sm: "px-[var(--space-xsm)] h-5 [&]:text-body-medium-xsm min-w-[20px] justify-center",
        md: "px-[var(--space-sm)] h-6 [&]:text-body-medium-sm",
        lg: "px-[var(--space-md)] h-7 [&]:text-body-medium-md",
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
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, intent, appearance, size, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ intent, appearance, size }),
          icon && "gap-[var(--space-xsm)]",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 w-4 h-4 [&_svg]:w-full [&_svg]:h-full">
            {icon}
          </span>
        )}
        <span className="min-w-0 truncate">
          {children}
        </span>
      </div>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
