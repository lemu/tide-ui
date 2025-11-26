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
        solid: "border-transparent",
        subtle: "border-transparent",
        outline: "bg-transparent",
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
        appearance: "solid",
        class:
          "border-transparent bg-[var(--grey-600)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "neutral",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--grey-100)] text-[var(--color-text-primary)]",
      },
      {
        intent: "neutral",
        appearance: "outline",
        class:
          "border border-[var(--color-border-primary-strong)] text-[var(--color-text-primary)]",
      },
      // Brand intent variants
      {
        intent: "brand",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-blue-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "brand",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--blue-50)] text-[var(--color-text-brand-bold)]",
      },
      {
        intent: "brand",
        appearance: "outline",
        class:
          "border border-[var(--color-blue-300)] text-[var(--color-text-brand-bold)]",
      },
      // Success intent variants
      {
        intent: "success",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-success-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "success",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--color-background-success-subtle)] text-[var(--color-text-success-bold)]",
      },
      {
        intent: "success",
        appearance: "outline",
        class:
          "border border-[var(--color-border-success-bold)] text-[var(--color-text-success-bold)]",
      },
      // Warning intent variants
      {
        intent: "warning",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-warning-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "warning",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning-bold)]",
      },
      {
        intent: "warning",
        appearance: "outline",
        class:
          "border border-[var(--color-border-warning-bold)] text-[var(--color-text-warning-bold)]",
      },
      // Destructive intent variants
      {
        intent: "destructive",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-error-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "destructive",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--color-background-error-subtle)] text-[var(--color-text-error-bold)]",
      },
      {
        intent: "destructive",
        appearance: "outline",
        class:
          "border border-[var(--color-border-error-bold)] text-[var(--color-text-error-bold)]",
      },
      // Information intent variants
      {
        intent: "information",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-info-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "information",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--color-background-info-subtle)] text-[var(--color-text-info-bold)]",
      },
      {
        intent: "information",
        appearance: "outline",
        class:
          "border border-[var(--color-border-info-bold)] text-[var(--color-text-info-bold)]",
      },
      // Violet intent variants
      {
        intent: "violet",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--violet-500)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "violet",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--violet-50)] text-[var(--violet-600)]",
      },
      {
        intent: "violet",
        appearance: "outline",
        class: "border border-[var(--violet-500)] text-[var(--violet-600)]",
      },
      // Magenta intent variants
      {
        intent: "magenta",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--magenta-500)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "magenta",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--magenta-50)] text-[var(--magenta-600)]",
      },
      {
        intent: "magenta",
        appearance: "outline",
        class: "border border-[var(--magenta-500)] text-[var(--magenta-600)]",
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
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, intent, appearance, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ intent, appearance, size }),
          className,
        )}
        {...props}
      >
        <span className="min-w-0 truncate">
          {children}
        </span>
      </div>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
