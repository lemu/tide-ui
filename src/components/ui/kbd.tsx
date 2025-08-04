import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded-xsm font-mono font-medium transition-colors select-none relative",
  {
    variants: {
      variant: {
        light: [
          "bg-grey-25/50",
          "text-[var(--color-text-secondary)]",
          "border border-[var(--color-border-primary-subtle)]",
          "shadow-[0_1px_0_0_var(--grey-50)]",
        ],
        dark: [
          "bg-grey-800/50",
          "text-[var(--grey-400)]",
          "border border-[var(--grey-alpha-200)]",
          "shadow-[0_1px_0_0_var(--grey-alpha-200)]",
        ],
      },
      size: {
        sm: "px-[var(--space-2xsm)] py-[var(--space-null)] min-w-[var(--size-2xsm)] [&]:text-body-xsm",
        md: "px-[var(--space-sm)] py-[var(--space-2xsm)] min-w-[var(--size-md)] [&]:text-body-sm",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "sm",
    },
  },
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <kbd
        className={cn(kbdVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Kbd.displayName = "Kbd";

export { Kbd, kbdVariants };
