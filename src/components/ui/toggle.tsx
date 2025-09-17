import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center font-medium ring-offset-[var(--color-surface-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-colors gap-[var(--space-sm)] cursor-pointer border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] data-[state=on]:bg-[var(--color-background-brand-selected)] data-[state=on]:text-[var(--color-text-brand)] data-[state=on]:border-transparent data-[state=on]:[&_svg]:text-[var(--color-text-brand)] aria-checked:bg-[var(--color-background-brand-selected)] aria-checked:text-[var(--color-text-brand)] aria-checked:border-transparent aria-checked:[&_svg]:text-[var(--color-text-brand)]",
  {
    variants: {
      size: {
        sm: "text-label-sm rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)]",
        md: "text-label-sm rounded-md px-[var(--space-md)] py-[var(--space-sm)]",
        lg: "text-label-md rounded-md px-[var(--space-lg)] py-[var(--space-md)]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };