import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-background-input)] text-[var(--color-text-primary)]",
          "border-[var(--color-border-input)]",
          "hover:border-[var(--color-border-input-hovered)]",
          "focus-visible:border-[var(--color-border-focused)]",
        ],
        error: [
          "bg-[var(--color-background-input)] text-[var(--color-text-primary)]",
          "border-[var(--color-border-error)]",
          "focus-visible:border-[var(--color-border-error)]",
        ],
      },
      size: {
        sm: "h-[var(--size-sm)] px-[var(--space-sm)] py-[var(--space-xsm)] text-body-sm",
        md: "h-[var(--size-md)] px-[var(--space-md)] py-[var(--space-sm)] text-body-md",
        lg: "h-[var(--size-lg)] px-[var(--space-lg)] py-[var(--space-md)] text-body-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };