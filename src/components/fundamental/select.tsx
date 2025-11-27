import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between gap-[var(--space-xsm)] rounded-sm border bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] transition-all duration-150 ease-in-out placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-[var(--color-background-disabled)] disabled:text-[var(--color-text-disabled)]",
  {
    variants: {
      variant: {
        default: [
          "border-[var(--color-interaction-border-input)]",
          "enabled:hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
          "enabled:hover:border-[var(--color-interaction-border-input-hovered)]",
          "enabled:hover:shadow-sm",
        ],
        error: [
          "border-[var(--color-border-error-bold)]",
          "enabled:hover:bg-[var(--color-background-neutral-subtlest-hovered)]",
          "enabled:hover:border-[var(--color-border-error-bold)]",
          "enabled:hover:shadow-sm",
          "focus-visible:border-[var(--color-border-error-bold)]",
        ],
      },
      size: {
        sm: "h-[var(--size-sm)] px-[var(--space-md)] py-[var(--space-xsm)] text-body-sm",
        md: "h-[var(--size-md)] px-[var(--space-md)] py-[var(--space-sm)] text-body-md",
        lg: "h-[var(--size-lg)] px-[var(--space-lg)] py-[var(--space-md)] text-body-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const selectContentVariants = cva(
  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--color-border-primary-medium)] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] shadow-[0px_0px_12px_-2px_rgba(0,14,20,0.08),0px_16px_24px_-8px_rgba(0,14,20,0.08),0px_4px_8px_-4px_rgba(0,14,20,0.04),0px_1px_1px_0px_rgba(0,14,20,0.02)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
);

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center h-8 rounded-sm outline-none focus:bg-[var(--color-background-neutral-subtlest-hovered)] focus:text-[var(--color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-2 py-1 text-body-md",
  {
    variants: {},
    defaultVariants: {},
  },
);

const selectLabelVariants = cva(
  "px-2 py-1 [&]:text-body-medium-sm text-[var(--color-text-tertiary)]",
);

const selectSeparatorVariants = cva(
  "h-px bg-[var(--color-border-primary-subtle)] my-[var(--space-xsm)]",
);

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => {
  // Icon size matches trigger size directly (same as Button pattern)
  const iconSize = size || "md";

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="chevron-down" size={iconSize} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        selectContentVariants(),
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      modal={false}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
        <Icon name="chevron-up" size="sm" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          "p-2",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        <div className="flex flex-col gap-1">{children}</div>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
        <Icon name="chevron-down" size="sm" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItemVariants(), className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name="check" size="sm" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(selectLabelVariants(), className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(selectSeparatorVariants(), className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
};
