import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

// InputGroup - Main wrapper container for grouping inputs and addons
export interface InputGroupProps extends React.ComponentProps<"div"> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="input-group"
        role="group"
        className={cn(
          "group/input-group relative flex w-full items-center rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] shadow-xs outline-none transition-[color,box-shadow]",
          // Default height for inputs
          "h-[var(--size-xlg)] has-[>textarea]:h-auto",
          // Adjust padding when inline addons are present
          "has-[>[data-align=inline-start]]:[&>input]:pl-[var(--space-xsm)]",
          "has-[>[data-align=inline-end]]:[&>input]:pr-[var(--space-xsm)]",
          // Block alignment for textareas
          "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>textarea]:pb-[var(--space-md)]",
          "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>textarea]:pt-[var(--space-md)]",
          // Focus state
          "has-[[data-slot=input-group-control]:focus-visible]:ring-[var(--color-border-focused)] has-[[data-slot=input-group-control]:focus-visible]:ring-1",
          // Invalid state
          "has-[[data-slot][aria-invalid=true]]:ring-[var(--color-border-error-subtle)] has-[[data-slot][aria-invalid=true]]:border-[var(--color-border-error-bold)]",
          // Disabled state
          "group-data-[disabled=true]/input-group:opacity-50 group-data-[disabled=true]/input-group:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroup.displayName = "InputGroup";

// InputGroupAddon - Container for addons (icons, text, buttons)
const inputGroupAddonVariants = cva(
  "text-[var(--color-text-secondary)] flex h-auto cursor-text select-none items-center justify-center gap-[var(--space-xsm)] py-[var(--space-sm)] [&]:text-body-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-xsm [&>svg:not([class*='size-'])]:size-[var(--size-sm)]",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-[var(--space-md)] has-[>button]:ml-[-var(--space-xs)] has-[>kbd]:ml-[-var(--space-xsm)]",
        "inline-end":
          "order-last pr-[var(--space-md)] has-[>button]:mr-[-var(--space-xs)] has-[>kbd]:mr-[-var(--space-xsm)]",
        "block-start":
          "order-first w-full justify-start px-[var(--space-md)] pt-[var(--space-md)] group-has-[>input]/input-group:pt-[var(--space-sm)]",
        "block-end":
          "order-last w-full justify-start px-[var(--space-md)] pb-[var(--space-md)] group-has-[>input]/input-group:pb-[var(--space-sm)]",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

export interface InputGroupAddonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupAddonVariants> {}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, align = "inline-start", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="input-group-addon"
        data-align={align}
        className={cn(inputGroupAddonVariants({ align }), className)}
        onClick={(e) => {
          // Don't focus input if clicking on a button
          if ((e.target as HTMLElement).closest("button")) {
            return;
          }
          // Focus the input when clicking the addon
          e.currentTarget.parentElement?.querySelector("input")?.focus();
        }}
        {...props}
      />
    );
  }
);
InputGroupAddon.displayName = "InputGroupAddon";

// InputGroupButton - Specialized button for input groups
const inputGroupButtonVariants = cva(
  "flex items-center gap-[var(--space-xsm)] [&]:text-body-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-[var(--size-md)] gap-[var(--space-xsm)] rounded-xsm px-[var(--space-xsm)] has-[>svg]:px-[var(--space-xsm)] [&>svg:not([class*='size-'])]:size-[var(--size-xsm)]",
        sm: "h-[var(--size-lg)] gap-[var(--space-sm)] rounded-sm px-[var(--space-sm)] has-[>svg]:px-[var(--space-sm)]",
        "icon-xs": "size-[var(--size-md)] rounded-xsm p-0 has-[>svg]:p-0",
        "icon-sm": "size-[var(--size-lg)] p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
);

export interface InputGroupButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "size">,
    VariantProps<typeof inputGroupButtonVariants> {}

const InputGroupButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  InputGroupButtonProps
>(({ className, type = "button", variant = "ghost", size = "xs", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
});
InputGroupButton.displayName = "InputGroupButton";

// InputGroupText - Static text content within addons
export interface InputGroupTextProps extends React.ComponentProps<"span"> {}

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-[var(--color-text-secondary)] flex items-center gap-[var(--space-xsm)] [&]:text-body-sm [&_svg:not([class*='size-'])]:size-[var(--size-sm)] [&_svg]:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupText.displayName = "InputGroupText";

// InputGroupInput - Replacement for standard Input with input group styling
export interface InputGroupInputProps extends Omit<React.ComponentProps<"input">, 'size'> {
  size?: "sm" | "md" | "lg";
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="input-group-control"
        size={size}
        className={cn(
          "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupInput.displayName = "InputGroupInput";

// InputGroupTextarea - Replacement for standard Textarea with input group styling
export interface InputGroupTextareaProps extends React.ComponentProps<"textarea"> {}

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-[var(--space-md)] shadow-none focus-visible:ring-0",
        className
      )}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupAddonVariants,
  inputGroupButtonVariants,
};
