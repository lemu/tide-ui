import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
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

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
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
  triggerClassName?: string;
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
  triggerClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              !selectedOption && "text-[var(--color-text-tertiary)]",
              triggerClassName
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-[--radix-popover-trigger-width] p-0", popoverClassName)}>
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
                    onSelect={(currentValue) => {
                      if (currentValue === value) {
                        onValueChange?.("");
                      } else {
                        onValueChange?.(currentValue);
                      }
                      setOpen(false);
                    }}
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

// Multi-select Combobox variant
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
  triggerClassName?: string;
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
  triggerClassName,
  maxDisplayedItems = 3,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOptions = options.filter((option) => values.includes(option.value));

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length <= maxDisplayedItems) {
      return selectedOptions.map((option) => option.label).join(", ");
    }
    return `${selectedOptions.slice(0, maxDisplayedItems).map((option) => option.label).join(", ")} +${selectedOptions.length - maxDisplayedItems} more`;
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              selectedOptions.length === 0 && "text-[var(--color-text-tertiary)]",
              triggerClassName
            )}
          >
            <span className="truncate">{getDisplayText()}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-[--radix-popover-trigger-width] p-0", popoverClassName)}>
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
                    onSelect={(currentValue) => {
                      if (values.includes(currentValue)) {
                        onValuesChange?.(values.filter((value) => value !== currentValue));
                      } else {
                        onValuesChange?.([...values, currentValue]);
                      }
                    }}
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