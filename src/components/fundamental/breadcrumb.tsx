import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRight, MoreHorizontal, ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ComponentType<{ className?: string }>;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "[&]:text-body-md flex  flex-wrap items-center gap-[var(--space-s)] text-[var(--color-text-secondary)]",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-[var(--space-s)]", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn(
        "rounded-xs cursor-pointer underline-offset-2 transition-colors hover:text-[var(--color-text-primary)] hover:underline focus:ring-2 focus:ring-[var(--color-border-focused)] focus:ring-offset-2 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      "!text-body-medium-md text-[var(--color-text-primary)]",
      className,
    )}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbPagePickerProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "onSelect"> {
  siblings: Array<{ value: string; label: string }>;
  value?: string;
  onSelect: (value: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const BreadcrumbPagePicker = React.forwardRef<
  HTMLButtonElement,
  BreadcrumbPagePickerProps
>(
  (
    {
      children,
      className,
      siblings,
      value,
      onSelect,
      searchPlaceholder = "Search...",
      emptyMessage = "No items found.",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            aria-current="page"
            className={cn(
              "!text-body-medium-md inline-flex cursor-pointer items-center gap-[var(--space-xs)] text-[var(--color-text-primary)] underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focused)] focus-visible:ring-offset-2",
              className,
            )}
            {...props}
          >
            {children}
            <ChevronDown className="h-[var(--size-3xs)] w-[var(--size-3xs)] shrink-0 text-[var(--color-icon-tertiary)]" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="min-w-[16rem] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {siblings.map((sibling) => (
                  <CommandItem
                    key={sibling.value}
                    value={sibling.value}
                    onSelect={(v) => {
                      onSelect(v);
                      setOpen(false);
                    }}
                  >
                    {sibling.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 text-[var(--color-icon-brand-bold)]",
                        value === sibling.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
BreadcrumbPagePicker.displayName = "BreadcrumbPagePicker";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("text-[var(--color-text-tertiary)]", className)}
    {...props}
  >
    {children ?? (
      <ArrowRight className="h-[var(--size-3xs)] w-[var(--size-3xs)]" />
    )}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-[var(--size-2xs)] w-[var(--size-2xs)] items-center justify-center",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-[var(--size-3xs)] w-[var(--size-3xs)] text-[var(--color-text-tertiary)]" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbPagePicker,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
