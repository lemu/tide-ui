import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

const DropDrawer = DropdownMenuPrimitive.Root

const DropDrawerTrigger = DropdownMenuPrimitive.Trigger

const DropDrawerGroup = DropdownMenuPrimitive.Group

const DropDrawerPortal = DropdownMenuPrimitive.Portal

const DropDrawerSub = DropdownMenuPrimitive.Sub

const DropDrawerRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropDrawerSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "text-body-md flex cursor-pointer select-none items-center rounded-lg px-[var(--space-md)] h-[var(--size-md)] outline-none transition-all duration-200 focus:bg-[var(--color-background-neutral-subtle-hovered)] hover:bg-[var(--color-background-neutral-subtle-hovered)] data-[state=open]:bg-[var(--color-background-neutral-subtle-hovered)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <Icon name="chevron-right" size="sm" className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropDrawerSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const DropDrawerSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]/95 backdrop-blur-xl p-[var(--space-xsm)] text-[var(--color-text-primary)] shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropDrawerSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const DropDrawerContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[16rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)]/95 backdrop-blur-xl p-[var(--space-sm)] text-[var(--color-text-primary)] shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropDrawerContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropDrawerItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    destructive?: boolean
  }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none transition-all duration-200 focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      destructive && "text-[var(--color-text-error)] hover:text-[var(--color-text-error)] focus:text-[var(--color-text-error)] hover:bg-[var(--color-background-error)] focus:bg-[var(--color-background-error)] [&>svg]:text-[var(--color-text-error)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropDrawerItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropDrawerCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "text-body-md relative flex cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-all duration-200 focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    onSelect={(e) => e.preventDefault()}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      <DropdownMenuPrimitive.ItemIndicator>
        <div className="h-4 w-4 rounded-sm border border-[var(--color-background-brand)] bg-[var(--color-background-brand)] flex items-center justify-center">
          <Check className="h-3 w-3 text-[var(--color-text-on-action)]" />
        </div>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropDrawerCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const DropDrawerRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "text-body-md relative flex cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-all duration-200 focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&[data-state=checked]_span]:border-[var(--color-border-brand)] [&[data-state=checked]_span]:bg-[var(--color-background-brand)] [&[data-state=checked]_span]:text-[var(--color-text-on-action)]",
      className
    )}
    onSelect={(e) => e.preventDefault()}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      <DropdownMenuPrimitive.ItemIndicator className="flex h-full w-full items-center justify-center rounded-full text-current">
        <Circle className="h-[6px] w-[6px] fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropDrawerRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropDrawerLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "[&]:text-body-medium-sm px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-tertiary)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropDrawerLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropDrawerSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
    {...props}
  />
))
DropDrawerSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropDrawerShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("text-caption-sm ml-auto tracking-widest text-[var(--color-text-tertiary)]", className)}
      {...props}
    />
  )
}
DropDrawerShortcut.displayName = "DropDrawerShortcut"

export {
  DropDrawer,
  DropDrawerTrigger,
  DropDrawerContent,
  DropDrawerItem,
  DropDrawerCheckboxItem,
  DropDrawerRadioItem,
  DropDrawerLabel,
  DropDrawerSeparator,
  DropDrawerShortcut,
  DropDrawerGroup,
  DropDrawerPortal,
  DropDrawerSub,
  DropDrawerSubContent,
  DropDrawerSubTrigger,
  DropDrawerRadioGroup,
}