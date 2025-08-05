import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  "peer w-[var(--size-2xsm)] h-[var(--size-2xsm)] shrink-0 rounded-sm border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-100 box-border",
  {
    variants: {
      variant: {
        default: [
          "border-[var(--color-border-input)] bg-[var(--color-surface-primary)]",
          "hover:border-[var(--color-border-input-hovered)]",
          "data-[state=checked]:border-[var(--color-border-brand)] data-[state=checked]:bg-[var(--color-background-brand)] data-[state=checked]:text-[var(--color-text-on-action)]",
          "data-[state=indeterminate]:border-[var(--color-border-brand)] data-[state=indeterminate]:bg-[var(--color-background-brand)] data-[state=indeterminate]:text-[var(--color-text-on-action)]",
          "disabled:border-[var(--color-border-disabled)] disabled:bg-[var(--color-background-disabled)]",
          "disabled:data-[state=checked]:border-[var(--color-border-disabled)] disabled:data-[state=checked]:bg-[var(--color-background-disabled)] disabled:data-[state=checked]:text-[var(--color-icon-disabled)]",
          "disabled:data-[state=indeterminate]:border-[var(--color-border-disabled)] disabled:data-[state=indeterminate]:bg-[var(--color-background-disabled)] disabled:data-[state=indeterminate]:text-[var(--color-icon-disabled)]"
        ],
        error: [
          "border-[var(--color-border-error)] bg-[var(--color-surface-primary)]",
          "hover:border-[var(--color-border-error)]",
          "data-[state=checked]:border-[var(--color-border-error)] data-[state=checked]:bg-[var(--color-background-error)] data-[state=checked]:text-[var(--color-text-on-error)]",
          "data-[state=indeterminate]:border-[var(--color-border-error)] data-[state=indeterminate]:bg-[var(--color-background-error)] data-[state=indeterminate]:text-[var(--color-text-on-error)]",
          "disabled:border-[var(--color-border-disabled)] disabled:bg-[var(--color-background-disabled)]",
          "disabled:data-[state=checked]:border-[var(--color-border-disabled)] disabled:data-[state=checked]:bg-[var(--color-background-disabled)] disabled:data-[state=checked]:text-[var(--color-icon-disabled)]",
          "disabled:data-[state=indeterminate]:border-[var(--color-border-disabled)] disabled:data-[state=indeterminate]:bg-[var(--color-background-disabled)] disabled:data-[state=indeterminate]:text-[var(--color-icon-disabled)]"
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current [&>svg]:w-[var(--size-3xsm)] [&>svg]:h-[var(--size-3xsm)]",
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn(checkboxIndicatorVariants())}>
      {props.checked === "indeterminate" ? <Minus /> : <Check />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
