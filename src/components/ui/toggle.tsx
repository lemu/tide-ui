import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-body-medium-sm font-medium ring-offset-[var(--color-surface-primary)] transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--color-background-brand-selected)] data-[state=on]:text-[var(--color-text-selected)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-[var(--space-sm)]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-[var(--color-border-input)] bg-transparent hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]",
      },
      size: {
        sm: "h-[var(--size-md)] px-[var(--space-sm)] min-w-[var(--size-md)]",
        md: "h-[var(--size-lg)] px-[var(--space-md)] min-w-[var(--size-lg)]",
        lg: "h-[var(--size-xlg)] px-[var(--space-lg)] min-w-[var(--size-xlg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };