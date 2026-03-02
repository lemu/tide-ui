import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "@/components/fundamental/icon";
import { Button } from "@/components/fundamental/button";
import { X } from "lucide-react";
import { inputVariants } from "@/components/fundamental/input";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    loop
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-m bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/25"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-0 shadow-lg duration-200 max-w-[450px]"
          )}
          aria-describedby={undefined}
        >
          <Command className="[&_[cmdk-group-heading]]:px-[var(--space-m)] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--color-text-tertiary)] [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-4 [&_[cmdk-input-wrapper]_svg]:w-4 [&_[cmdk-item]]:px-[var(--space-m)] [&_[cmdk-item]]:min-h-[var(--size-m)] [&_[cmdk-item]]:py-[var(--space-s)] [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4">
            {children}
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
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
>(({ className, size = "m", clearable = true, onClear, value, ...props }, ref) => {
  const showClearButton = clearable && value && String(value).length > 0;

  // Calculate icon sizes based on input size
  const iconSize = size === "s" ? "s" : "m";

  // Calculate left padding: icon_position + icon_width
  // For sm: 18px + 12px = 30px
  // For md/lg: 18px + 16px = 34px
  const leftPadding = size === "s"
    ? "pl-[30px]"
    : "pl-[34px]";

  // Calculate right padding for clear button if visible
  // Button width (--size-sm = 24px) + button position (--space-md = 12px) + spacing buffer (--space-sm = 8px)
  const rightPadding = showClearButton
    ? "pr-[calc(var(--size-s)+var(--space-m)+var(--space-s))]"
    : "";

  return (
    <div className="relative p-[var(--space-s)] border-b border-[var(--color-border-primary-subtle)]" cmdk-input-wrapper="">
      <Icon
        name="search"
        size={iconSize}
        color="tertiary"
        className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <CommandPrimitive.Input
        ref={ref}
        value={value}
        className={cn(
          inputVariants({ size, variant: "default" }),
          leftPadding,
          rightPadding,
          // Force typography to override cmdk defaults
          size === "s" && "[&]:text-body-sm",
          size === "m" && "[&]:text-body-md",
          size === "l" && "[&]:text-body-md",
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
        <Button
          type="button"
          variant="ghost"
          size="s"
          icon={X}
          iconPosition="only"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear?.();
          }}
          className="absolute right-[var(--space-m)] top-1/2 -translate-y-1/2 active:!translate-y-[-50%]"
          aria-label="Clear search"
        />
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
    className={cn("py-6 text-center [&]:text-body-md text-[var(--color-text-secondary)]", className)}
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
      "overflow-hidden p-[var(--space-s)] text-[var(--color-text-primary)] [&_[cmdk-group-heading]]:px-[var(--space-m)] [&_[cmdk-group-heading]]:py-[var(--space-s)] [&_[cmdk-group-heading]]:[&]:text-body-medium-sm [&_[cmdk-group-heading]]:text-[var(--color-text-tertiary)]",
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
      "[&]:text-body-md relative flex cursor-pointer select-none items-center rounded-m px-[var(--space-m)] min-h-[var(--size-m)] py-[var(--space-s)] outline-none transition-colors aria-selected:bg-[var(--color-background-neutral-subtlest-hovered)] aria-selected:text-[var(--color-text-primary)] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
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