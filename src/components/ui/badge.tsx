import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-[var(--space-sm)] py-[var(--space-xsm)] text-caption-medium-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default: [
          "border-transparent bg-[var(--color-background-brand)] text-[var(--color-text-on-action)] shadow-xs",
          "hover:bg-[var(--color-background-brand-hovered)]"
        ],
        secondary: [
          "border-transparent bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)]",
          "hover:bg-[var(--color-background-neutral-subtle-hovered)]"
        ],
        success: [
          "border-transparent bg-[var(--color-background-success)] text-[var(--color-text-on-success)] shadow-xs",
          "hover:bg-[var(--color-background-success-hovered)]"
        ],
        warning: [
          "border-transparent bg-[var(--color-background-warning)] text-[var(--color-text-on-warning)] shadow-xs",
          "hover:bg-[var(--color-background-warning-hovered)]"
        ],
        destructive: [
          "border-transparent bg-[var(--color-background-error)] text-[var(--color-text-on-error)] shadow-xs",
          "hover:bg-[var(--color-background-error-hovered)]"
        ],
        outline: [
          "border-[var(--color-border-primary-subtle)] bg-transparent text-[var(--color-text-primary)]",
          "hover:bg-[var(--color-background-neutral-subtle-hovered)]"
        ],
      },
      size: {
        sm: "px-[var(--space-xsm)] py-[1px] text-caption-medium-xsm",
        md: "px-[var(--space-sm)] py-[var(--space-xsm)] text-caption-medium-sm",
        lg: "px-[var(--space-md)] py-[var(--space-sm)] text-body-medium-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };