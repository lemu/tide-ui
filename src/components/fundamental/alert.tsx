import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-md border p-[var(--space-lg)] [&>svg~*]:pl-[var(--space-2xlg)] [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-[var(--space-lg)] [&>svg]:top-[var(--space-lg)] [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] border-[var(--color-border-primary-subtle)]",
        ],
        info: [
          "bg-[var(--color-background-information)] text-[var(--color-text-primary)] border-[var(--color-border-brand)] [&>svg]:text-[var(--color-text-brand)]",
        ],
        success: [
          "bg-[var(--color-background-success)] text-[var(--color-text-primary)] border-[var(--color-border-success)] [&>svg]:text-[var(--color-text-success)]",
        ],
        warning: [
          "bg-[var(--color-background-warning)] text-[var(--color-text-primary)] border-[var(--color-border-warning)] [&>svg]:text-[var(--color-text-warning)]",
        ],
        destructive: [
          "bg-[var(--color-background-error)] text-[var(--color-text-primary)] border-[var(--color-border-error)] [&>svg]:text-[var(--color-text-error)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const alertTitleVariants = cva(
  "mb-[var(--space-xsm)] [&]:text-body-strong-md text-[var(--color-text-primary)] leading-none tracking-tight",
);

const alertDescriptionVariants = cva(
  "[&]:text-body-md text-[var(--color-text-secondary)] [&_p]:leading-relaxed",
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn(alertTitleVariants(), className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionVariants(), className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
