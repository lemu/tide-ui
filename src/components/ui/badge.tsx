import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center w-fit max-w-full rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)] text-caption-medium-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1 cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--grey-100)] text-[var(--color-text-primary)]",
        secondary:
          "border-transparent bg-[var(--grey-100)] text-[var(--color-text-primary)]",
        destructive:
          "border-transparent bg-[var(--color-background-error-bold)] text-[var(--color-text-inverse)]",
        outline:
          "bg-transparent border border-[var(--color-border-primary-strong)] text-[var(--color-text-primary)]",
      },
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
          "border-transparent bg-[var(--color-background-brand)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "brand",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--blue-50)] text-[var(--color-text-brand)]",
      },
      {
        intent: "brand",
        appearance: "outline",
        class:
          "border border-[var(--color-blue-300)] text-[var(--color-text-brand)]",
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
          "border-transparent bg-[var(--color-background-success)] text-[var(--color-text-success)]",
      },
      {
        intent: "success",
        appearance: "outline",
        class:
          "border border-[var(--color-border-success)] text-[var(--color-text-success)]",
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
          "border-transparent bg-[var(--color-background-warning)] text-[var(--color-text-warning)]",
      },
      {
        intent: "warning",
        appearance: "outline",
        class:
          "border border-[var(--color-border-warning)] text-[var(--color-text-warning)]",
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
          "border-transparent bg-[var(--color-background-error)] text-[var(--color-text-error)]",
      },
      {
        intent: "destructive",
        appearance: "outline",
        class:
          "border border-[var(--color-border-error)] text-[var(--color-text-error)]",
      },
      // Information intent variants
      {
        intent: "information",
        appearance: "solid",
        class:
          "border-transparent bg-[var(--color-background-information-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "information",
        appearance: "subtle",
        class:
          "border-transparent bg-[var(--color-background-information)] text-[var(--color-text-information)]",
      },
      {
        intent: "information",
        appearance: "outline",
        class:
          "border border-[var(--color-border-information)] text-[var(--color-text-information)]",
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
      variant: "default",
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
  ({ className, variant, intent, appearance, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, intent, appearance, size }),
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
