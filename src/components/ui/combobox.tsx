import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { useIsDesktop } from "@/lib/hooks";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger 
} from "./drawer";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxTriggerProps {
  open: boolean;
  selectedOption: ComboboxOption | undefined;
  placeholder: string;
  disabled: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  popoverClassName?: string;
  trigger: (props: ComboboxTriggerProps) => React.ReactNode;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  disabled = false,
  className,
  popoverClassName,
  trigger,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsDesktop();

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = React.useCallback((currentValue: string) => {
    if (currentValue === value) {
      onValueChange?.("");
    } else {
      onValueChange?.(currentValue);
    }
    setOpen(false);
  }, [value, onValueChange]);

  if (isDesktop) {
    return (
      <div className={cn("w-full", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {trigger({ open, selectedOption, placeholder, disabled })}
          </PopoverTrigger>
          <PopoverContent 
            className={cn(
              "w-[--radix-popover-trigger-width] min-w-[16rem] p-[var(--space-sm)]", 
              popoverClassName
            )}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className="h-[var(--size-md)] px-[var(--space-md)] transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] aria-selected:bg-[var(--color-background-neutral-subtle-hovered)]"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Mobile implementation using drawer
  return (
    <div className={cn("w-full", className)}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger({ open, selectedOption, placeholder, disabled })}
        </DrawerTrigger>
        <DrawerContent className={cn("p-0", popoverClassName)}>
          <div className="space-y-[var(--space-xsm)] px-[var(--space-md)] pb-[var(--space-md)]">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className="h-[var(--size-lg)] px-[var(--space-md)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          
          {/* Safe area padding for devices with bottom home indicator */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// Multi-select Combobox variant
export interface MultiComboboxTriggerProps {
  open: boolean;
  selectedOptions: ComboboxOption[];
  placeholder: string;
  disabled: boolean;
  maxDisplayedItems: number;
}

export interface MultiComboboxProps {
  options: ComboboxOption[];
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  popoverClassName?: string;
  trigger: (props: MultiComboboxTriggerProps) => React.ReactNode;
  maxDisplayedItems?: number;
}

export function MultiCombobox({
  options,
  values = [],
  onValuesChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  disabled = false,
  className,
  popoverClassName,
  trigger,
  maxDisplayedItems = 3,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useIsDesktop();

  const selectedOptions = options.filter((option) => values.includes(option.value));

  const handleSelect = React.useCallback((currentValue: string) => {
    if (values.includes(currentValue)) {
      onValuesChange?.(values.filter((value) => value !== currentValue));
    } else {
      onValuesChange?.([...values, currentValue]);
    }
  }, [values, onValuesChange]);

  if (isDesktop) {
    return (
      <div className={cn("w-full", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            {trigger({ open, selectedOptions, placeholder, disabled, maxDisplayedItems })}
          </PopoverTrigger>
          <PopoverContent 
            className={cn(
              "w-[--radix-popover-trigger-width] min-w-[16rem] p-[var(--space-sm)]", 
              popoverClassName
            )}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className="h-[var(--size-md)] px-[var(--space-md)] transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] aria-selected:bg-[var(--color-background-neutral-subtle-hovered)]"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Mobile implementation using drawer
  return (
    <div className={cn("w-full", className)}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          {trigger({ open, selectedOptions, placeholder, disabled, maxDisplayedItems })}
        </DrawerTrigger>
        <DrawerContent className={cn("p-0", popoverClassName)}>
          <div className="space-y-[var(--space-xsm)] px-[var(--space-md)] pb-[var(--space-md)]">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className="h-[var(--size-lg)] px-[var(--space-md)] active:bg-[var(--color-background-neutral-subtle-hovered)]"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values.includes(option.value) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          
          {/* Safe area padding for devices with bottom home indicator */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}