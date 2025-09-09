import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsDesktop } from "@/lib/hooks"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const DropdownMenuDesktop = DropdownMenuPrimitive.Root

const DropdownMenuDesktopTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuDesktopRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "text-body-md flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none focus:bg-[var(--color-background-neutral-subtle-hovered)] hover:bg-[var(--color-background-neutral-subtle-hovered)] data-[state=open]:bg-[var(--color-background-neutral-subtle-hovered)]",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[12rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-xsm)] text-[var(--color-text-primary)] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuDesktopContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[16rem] overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-sm)] text-[var(--color-text-primary)] shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuDesktopContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuDesktopItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
    destructive?: boolean
  }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
      destructive && "text-[var(--color-text-error)] hover:text-[var(--color-text-error)] focus:text-[var(--color-text-error)] hover:bg-[var(--color-background-error)] focus:bg-[var(--color-background-error)] [&>svg]:text-[var(--color-icon-error)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuDesktopItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuDesktopCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
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
DropdownMenuDesktopCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuDesktopRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed [&[data-state=checked]_span]:border-[var(--color-border-brand)] [&[data-state=checked]_span]:bg-[var(--color-background-brand)] [&[data-state=checked]_span]:text-[var(--color-text-on-action)]",
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
DropdownMenuDesktopRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuDesktopLabel = React.forwardRef<
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
DropdownMenuDesktopLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuDesktopSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
    {...props}
  />
))
DropdownMenuDesktopSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
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
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Mobile Sheet Components (styled to match dropdown menu)
const MobileDropdownItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean
    destructive?: boolean
    onSelect?: (e: React.MouseEvent) => void
  }
>(({ className, inset, destructive, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&]:text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md px-[var(--space-md)] h-[var(--size-lg)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      destructive && "text-[var(--color-text-error)] hover:text-[var(--color-text-error)] focus:text-[var(--color-text-error)] hover:bg-[var(--color-background-error)] focus:bg-[var(--color-background-error)] [&>svg]:text-[var(--color-icon-error)]",
      inset && "pl-8",
      className
    )}
    onClick={onSelect}
    role="menuitem"
    tabIndex={0}
    {...props}
  />
))
MobileDropdownItem.displayName = "MobileDropdownItem"

const MobileDropdownCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-lg)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      className
    )}
    onClick={() => onCheckedChange?.(!checked)}
    role="menuitemcheckbox"
    aria-checked={checked}
    tabIndex={0}
    {...props}
  >
    <span className="absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--color-border-input)] bg-[var(--color-surface-primary)]">
      {checked && (
        <div className="h-4 w-4 rounded-sm border border-[var(--color-background-brand)] bg-[var(--color-background-brand)] flex items-center justify-center">
          <Check className="h-3 w-3 text-[var(--color-text-on-action)]" />
        </div>
      )}
    </span>
    {children}
  </div>
))
MobileDropdownCheckboxItem.displayName = "MobileDropdownCheckboxItem"

const MobileDropdownRadioItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
    checked?: boolean
    onSelect?: (value: string) => void
  }
>(({ className, children, value, checked, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-lg)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-background-neutral-subtle-hovered)]",
      className
    )}
    onClick={() => onSelect?.(value)}
    role="menuitemradio"
    aria-checked={checked}
    tabIndex={0}
    {...props}
  >
    <span className={cn(
      "absolute left-[var(--space-md)] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-border-input)] bg-[var(--color-surface-primary)]",
      checked && "border-[var(--color-border-brand)] bg-[var(--color-background-brand)] text-[var(--color-text-on-action)]"
    )}>
      {checked && <Circle className="h-[6px] w-[6px] fill-current" />}
    </span>
    {children}
  </div>
))
MobileDropdownRadioItem.displayName = "MobileDropdownRadioItem"

const MobileDropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&]:text-body-medium-sm px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-tertiary)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MobileDropdownLabel.displayName = "MobileDropdownLabel"

const MobileDropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
    role="separator"
    {...props}
  />
))
MobileDropdownSeparator.displayName = "MobileDropdownSeparator"

// Responsive Dropdown Components
interface ResponsiveDropdownMenuProps {
  children: React.ReactNode
}

const ResponsiveDropdownMenu = ({ children }: ResponsiveDropdownMenuProps) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return <DropdownMenuDesktop>{children}</DropdownMenuDesktop>
  }
  
  return <Sheet>{children}</Sheet>
}

interface ResponsiveDropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  children: React.ReactNode
}

const ResponsiveDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  ResponsiveDropdownMenuContentProps
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopContent
        ref={ref}
        sideOffset={sideOffset}
        className={className}
        {...props}
      >
        {children}
      </DropdownMenuDesktopContent>
    )
  }
  
  return (
    <SheetContent side="bottom" className={cn("p-[var(--space-lg)]", className)}>
      <div className="space-y-[var(--space-xsm)]">
        {children}
      </div>
    </SheetContent>
  )
})
ResponsiveDropdownMenuContent.displayName = "ResponsiveDropdownMenuContent"

interface ResponsiveDropdownMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  children: React.ReactNode
  asChild?: boolean
}

const ResponsiveDropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ResponsiveDropdownMenuTriggerProps
>(({ asChild, children, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopTrigger ref={ref} asChild={asChild} {...props}>
        {children}
      </DropdownMenuDesktopTrigger>
    )
  }
  
  return (
    <SheetTrigger asChild={asChild} {...props}>
      {children}
    </SheetTrigger>
  )
})
ResponsiveDropdownMenuTrigger.displayName = "ResponsiveDropdownMenuTrigger"

// Context for managing radio groups and checkbox states in mobile
const MobileDropdownContext = React.createContext<{
  radioValue?: string
  onRadioChange?: (value: string) => void
}>({})

interface ResponsiveDropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean
  destructive?: boolean
}

const ResponsiveDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  ResponsiveDropdownMenuItemProps
>(({ className, inset, destructive, onSelect, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuDesktopItem
        ref={ref}
        className={className}
        inset={inset}
        destructive={destructive}
        onSelect={onSelect}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownItem
      className={className}
      inset={inset}
      destructive={destructive}
      onSelect={onSelect}
      {...props}
    />
  )
})
ResponsiveDropdownMenuItem.displayName = "ResponsiveDropdownMenuItem"

// Add remaining responsive components
interface ResponsiveDropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  checked?: boolean
}

const ResponsiveDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ResponsiveDropdownMenuCheckboxItemProps
>(({ className, children, checked, onCheckedChange, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
          "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed",
          className
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
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
    )
  }
  
  return (
    <MobileDropdownCheckboxItem
      className={className}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      {children}
    </MobileDropdownCheckboxItem>
  )
})
ResponsiveDropdownMenuCheckboxItem.displayName = "ResponsiveDropdownMenuCheckboxItem"

interface ResponsiveDropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  value: string
}

const ResponsiveDropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ResponsiveDropdownMenuRadioItemProps
>(({ className, children, value, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
          "text-body-md relative flex [&]:cursor-pointer select-none items-center rounded-md h-[var(--size-md)] pl-10 pr-[var(--space-md)] outline-none transition-colors focus:bg-[var(--color-background-neutral-subtle-hovered)] focus:text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)] [&]:data-[disabled]:!cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:focus:bg-transparent [&[data-disabled]_*]:!cursor-not-allowed [&[data-state=checked]_span]:border-[var(--color-border-brand)] [&[data-state=checked]_span]:bg-[var(--color-background-brand)] [&[data-state=checked]_span]:text-[var(--color-text-on-action)]",
          className
        )}
        value={value}
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
    )
  }
  
  // For mobile, we need to get the current value from context
  return (
    <MobileDropdownContext.Consumer>
      {({ radioValue, onRadioChange }) => (
        <MobileDropdownRadioItem
          className={className}
          value={value}
          checked={radioValue === value}
          onSelect={onRadioChange}
          {...props}
        >
          {children}
        </MobileDropdownRadioItem>
      )}
    </MobileDropdownContext.Consumer>
  )
})
ResponsiveDropdownMenuRadioItem.displayName = "ResponsiveDropdownMenuRadioItem"

interface ResponsiveDropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean
}

const ResponsiveDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  ResponsiveDropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
          "[&]:text-body-medium-sm px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-tertiary)]",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownLabel
      className={className}
      inset={inset}
      {...props}
    />
  )
})
ResponsiveDropdownMenuLabel.displayName = "ResponsiveDropdownMenuLabel"

const ResponsiveDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn("-mx-2 my-[var(--space-sm)] h-px bg-[var(--color-border-primary-subtle)]", className)}
        {...props}
      />
    )
  }
  
  return (
    <MobileDropdownSeparator
      className={className}
      {...props}
    />
  )
})
ResponsiveDropdownMenuSeparator.displayName = "ResponsiveDropdownMenuSeparator"

interface ResponsiveDropdownMenuRadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const ResponsiveDropdownMenuRadioGroup = ({ value, onValueChange, children }: ResponsiveDropdownMenuRadioGroupProps) => {
  const isDesktop = useIsDesktop()
  
  if (isDesktop) {
    return (
      <DropdownMenuPrimitive.RadioGroup value={value} onValueChange={onValueChange}>
        {children}
      </DropdownMenuPrimitive.RadioGroup>
    )
  }
  
  return (
    <MobileDropdownContext.Provider value={{ radioValue: value, onRadioChange: onValueChange }}>
      <div role="radiogroup">
        {children}
      </div>
    </MobileDropdownContext.Provider>
  )
}

// Export responsive components as the main API
export {
  // Main responsive components (new default API)
  ResponsiveDropdownMenu as DropdownMenu,
  ResponsiveDropdownMenuTrigger as DropdownMenuTrigger,
  ResponsiveDropdownMenuContent as DropdownMenuContent,
  ResponsiveDropdownMenuItem as DropdownMenuItem,
  ResponsiveDropdownMenuCheckboxItem as DropdownMenuCheckboxItem,
  ResponsiveDropdownMenuRadioItem as DropdownMenuRadioItem,
  ResponsiveDropdownMenuLabel as DropdownMenuLabel,
  ResponsiveDropdownMenuSeparator as DropdownMenuSeparator,
  ResponsiveDropdownMenuRadioGroup as DropdownMenuRadioGroup,
  
  // Original non-responsive components (for backwards compatibility)
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  
  // Original primitives (kept for advanced use cases)
  DropdownMenuDesktop,
  DropdownMenuDesktopTrigger,
  DropdownMenuDesktopContent,
  DropdownMenuDesktopItem,
  DropdownMenuDesktopCheckboxItem,
  DropdownMenuDesktopRadioItem,
  DropdownMenuDesktopLabel,
  DropdownMenuDesktopSeparator,
  DropdownMenuDesktopRadioGroup,
}