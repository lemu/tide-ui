import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const radioGroupVariants = cva("grid gap-[var(--space-sm)]");

const radioGroupItemVariants = cva(
  "peer w-[var(--size-2xsm)] h-[var(--size-2xsm)] shrink-0 rounded-full border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-100 box-border",
  {
    variants: {
      variant: {
        default: [
          "border-[var(--color-border-input)] bg-[var(--color-surface-primary)]",
          "hover:border-[var(--color-border-input-hovered)]",
          "data-[state=checked]:border-[var(--color-border-brand)] data-[state=checked]:bg-[var(--color-background-brand)] data-[state=checked]:text-[var(--color-text-on-action)]",
          "disabled:border-none disabled:bg-[var(--color-background-disabled)]",
          "disabled:data-[state=checked]:border-none disabled:data-[state=checked]:bg-[var(--color-background-disabled)] disabled:data-[state=checked]:text-[var(--color-text-disabled)]",
        ],
        error: [
          "border-[var(--color-border-error)] bg-[var(--color-surface-primary)]",
          "hover:border-[var(--color-border-error)]",
          "data-[state=checked]:border-[var(--color-border-error)] data-[state=checked]:bg-[var(--color-background-error)] data-[state=checked]:text-[var(--color-text-on-error)]",
          "disabled:border-[var(--color-border-disabled)] disabled:bg-[var(--color-surface-primary)]",
          "disabled:data-[state=checked]:border-[var(--color-border-disabled)] disabled:data-[state=checked]:bg-[var(--color-background-disabled)] disabled:data-[state=checked]:text-[var(--color-text-disabled)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const radioGroupIndicatorVariants = cva(
  "flex items-center justify-center text-current [&>svg]:w-[var(--dimension-150)] [&>svg]:h-[var(--dimension-150)]",
);

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

export interface RadioGroupItemProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
      "size"
    >,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn(radioGroupVariants(), className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioGroupItemVariants({ variant }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator
      className={cn(radioGroupIndicatorVariants())}
    >
      <Circle className="fill-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export {
  RadioGroup,
  RadioGroupItem,
  radioGroupVariants,
  radioGroupItemVariants,
};
