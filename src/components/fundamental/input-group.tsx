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
          "group/input-group relative flex w-full items-center rounded-m border border-[var(--color-interaction-border-input)] bg-[var(--color-interaction-background-input-neutral)] outline-none transition-[color,box-shadow,border-color]",
          // Default height for inputs
          "h-[var(--size-m)] has-[>textarea]:h-auto",
          // Adjust padding when inline addons are present
          "has-[>[data-align=inline-start]]:[&>input]:pl-[var(--space-xs)]",
          "has-[>[data-align=inline-end]]:[&>input]:pr-[var(--space-xs)]",
          // Block alignment for textareas
          "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>textarea]:pb-[var(--space-m)]",
          "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>textarea]:pt-[var(--space-m)]",
          // Hover state
          "hover:border-[var(--color-interaction-border-input-hovered)]",
          // Focus state
          "has-[[data-slot=input-group-control]:focus-visible]:border-[#005f85] has-[[data-slot=input-group-control]:focus-visible]:shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)]",
          // Invalid state
          "has-[[data-slot][aria-invalid=true]]:border-[var(--color-border-error-bold)]",
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
  "text-[var(--color-text-secondary)] flex h-auto cursor-text select-none items-center justify-center gap-[var(--space-xs)] py-[var(--space-s)] [&]:text-body-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-xs [&>svg:not([class*='size-'])]:size-[var(--size-s)]",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-[var(--space-s)] has-[>button]:pl-[var(--space-xs)] has-[>.inline-flex]:pl-[var(--space-xs)] has-[>kbd]:ml-[-var(--space-xs)]",
        "inline-end":
          "order-last pr-[var(--space-s)] has-[>button]:pr-[var(--space-xs)] has-[>.inline-flex]:pr-[var(--space-xs)] has-[>kbd]:mr-[-var(--space-xs)]",
        "block-start":
          "order-first w-full justify-start px-[var(--space-m)] pt-[var(--space-m)] group-has-[>input]/input-group:pt-[var(--space-s)]",
        "block-end":
          "order-last w-full justify-start px-[var(--space-m)] pb-[var(--space-m)] group-has-[>input]/input-group:pb-[var(--space-s)]",
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
export interface InputGroupButtonProps
  extends React.ComponentProps<typeof Button> {}

const InputGroupButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  InputGroupButtonProps
>(({ className, type = "button", variant = "ghost", size = "s", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      className={cn("shadow-none", className)}
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
          "text-[var(--color-text-secondary)] flex items-center gap-[var(--space-xs)] [&]:text-body-sm [&_svg:not([class*='size-'])]:size-[var(--size-s)] [&_svg]:pointer-events-none",
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
  size?: "s" | "m" | "l";
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="input-group-control"
        size={size}
        className={cn(
          "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:shadow-none",
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
        "flex-1 resize-none rounded-none border-0 bg-transparent py-[var(--space-m)] shadow-none focus-visible:ring-0 focus-visible:shadow-none",
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
};
