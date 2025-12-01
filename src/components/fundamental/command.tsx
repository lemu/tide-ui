import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent, DialogOverlay } from "@/components/fundamental/dialog";
import { Icon } from "@/components/fundamental/icon";
import { inputVariants } from "@/components/fundamental/input";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    loop
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogOverlay className="bg-black/25" />
      <DialogContent className="overflow-hidden p-0 shadow-lg max-w-[450px]">
        <Command className="[&_[cmdk-group-heading]]:px-[var(--space-md)] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--color-text-tertiary)] [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-[var(--space-md)] [&_[cmdk-item]]:min-h-[var(--size-md)] [&_[cmdk-item]]:py-[var(--space-sm)] [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

interface CommandInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, "size">,
    Pick<VariantProps<typeof inputVariants>, "size"> {
  /**
   * Whether to show a clear button when value exists
   */
  clearable?: boolean;
  /**
   * Callback when clear button is clicked
   */
  onClear?: () => void;
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, size = "md", clearable = false, onClear, value, ...props }, ref) => {
  const showClearButton = clearable && value && String(value).length > 0;

  // Calculate icon sizes based on input size
  const iconSize = size === "sm" ? "sm" : "md";

  // Calculate left padding: icon_position + icon_width + spacing
  // For sm: 12px + 12px + 8px = 32px
  // For md/lg: 12px + 16px + 8px = 36px
  const leftPadding = size === "sm"
    ? "pl-[calc(var(--space-md)+var(--size-3xsm)+var(--space-sm))]"
    : "pl-[calc(var(--space-md)+var(--size-2xsm)+var(--space-sm))]";

  // Calculate right padding for clear button if visible
  // For sm: 12px + 12px + 8px = 32px
  // For md/lg: 12px + 16px + 8px = 36px
  const rightPadding = showClearButton
    ? size === "sm"
      ? "pr-[calc(var(--space-md)+var(--size-3xsm)+var(--space-sm))]"
      : "pr-[calc(var(--space-md)+var(--size-2xsm)+var(--space-sm))]"
    : "";

  return (
    <div className="relative p-[var(--space-sm)] border-b border-[var(--color-border-primary-subtle)]" cmdk-input-wrapper="">
      <Icon
        name="search"
        size={iconSize}
        color="tertiary"
        className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <CommandPrimitive.Input
        ref={ref}
        value={value}
        className={cn(
          inputVariants({ size, variant: "default" }),
          leftPadding,
          rightPadding,
          // Force typography to override cmdk defaults
          size === "sm" && "[&]:text-body-sm",
          size === "md" && "[&]:text-body-md",
          size === "lg" && "[&]:text-body-md",
          // Force focus styles to override cmdk defaults - includes outer blue ring
          "[&]:focus-visible:outline-none",
          "[&]:focus-visible:border-[#005f85]",
          "[&]:focus-visible:!shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)]",
          "[&]:focus:outline-none",
          "[&]:focus:!shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)]",
          className
        )}
        {...props}
      />
      {showClearButton && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear?.();
          }}
          className="absolute right-[var(--space-sm)] top-1/2 -translate-y-1/2 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[var(--color-background-neutral-subtlest)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] transition-colors"
          aria-label="Clear search"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="var(--color-text-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-body-sm text-[var(--color-text-secondary)]", className)}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-[var(--space-sm)] text-[var(--color-text-primary)] [&_[cmdk-group-heading]]:px-[var(--space-md)] [&_[cmdk-group-heading]]:py-[var(--space-sm)] [&_[cmdk-group-heading]]:[&]:text-body-medium-sm [&_[cmdk-group-heading]]:text-[var(--color-text-tertiary)]",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-[var(--color-border-primary-subtle)]", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex cursor-pointer select-none items-center rounded-md px-[var(--space-md)] min-h-[var(--size-md)] py-[var(--space-sm)] outline-none transition-colors aria-selected:bg-[var(--color-background-neutral-subtlest-hovered)] aria-selected:text-[var(--color-text-primary)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-caption-sm tracking-widest text-[var(--color-text-tertiary)]",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};