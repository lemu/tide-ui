import * as React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const listboxVariants = cva(
  "w-full rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] p-1 shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-border-brand)] focus-within:ring-offset-2",
  {
    variants: {
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
        grid: "grid",
      },
      size: {
        sm: "text-caption-sm",
        md: "text-body-sm",
        lg: "text-body-md",
      },
    },
    defaultVariants: {
      orientation: "vertical",
      size: "md",
    },
  }
)

const listboxItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] focus:bg-[var(--color-background-neutral-subtle-hovered)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      selected: {
        true: "bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)]",
        false: "text-[var(--color-text-primary)]",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export interface ListboxContextValue {
  value: string | string[]
  onValueChange: (value: string | string[]) => void
  multiple?: boolean
  orientation?: "vertical" | "horizontal" | "grid"
  disabled?: boolean
}

const ListboxContext = React.createContext<ListboxContextValue | undefined>(undefined)

const useListbox = () => {
  const context = React.useContext(ListboxContext)
  if (!context) {
    throw new Error("useListbox must be used within a Listbox")
  }
  return context
}

export interface ListboxProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof listboxVariants> {
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  multiple?: boolean
  disabled?: boolean
  gridCols?: number
}

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  ({ 
    className, 
    value = multiple ? [] : "", 
    onValueChange = () => {}, 
    multiple = false, 
    orientation,
    size,
    disabled = false,
    gridCols,
    children,
    ...props 
  }, ref) => {
    const gridStyle = orientation === "grid" && gridCols 
      ? { gridTemplateColumns: `repeat(${gridCols}, 1fr)` }
      : undefined

    return (
      <ListboxContext.Provider value={{ value, onValueChange, multiple, orientation, disabled }}>
        <div
          ref={ref}
          className={cn(listboxVariants({ orientation, size, className }))}
          style={gridStyle}
          role="listbox"
          aria-multiselectable={multiple}
          {...props}
        >
          {children}
        </div>
      </ListboxContext.Provider>
    )
  }
)
Listbox.displayName = "Listbox"

export interface ListboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const ListboxItem = React.forwardRef<HTMLDivElement, ListboxItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange, multiple, disabled: listboxDisabled } = useListbox()
    
    const isSelected = multiple 
      ? Array.isArray(selectedValue) && selectedValue.includes(value)
      : selectedValue === value
    
    const isDisabled = disabled || listboxDisabled

    const handleSelect = () => {
      if (isDisabled) return

      if (multiple && Array.isArray(selectedValue)) {
        const newValue = isSelected 
          ? selectedValue.filter(v => v !== value)
          : [...selectedValue, value]
        onValueChange(newValue)
      } else {
        onValueChange(value)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleSelect()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(listboxItemVariants({ selected: isSelected, className }))}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        data-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
        {isSelected && (
          <ListboxItemIndicator>
            <Check className="h-4 w-4" />
          </ListboxItemIndicator>
        )}
      </div>
    )
  }
)
ListboxItem.displayName = "ListboxItem"

export interface ListboxItemIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const ListboxItemIndicator = React.forwardRef<HTMLSpanElement, ListboxItemIndicatorProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("ml-auto flex h-4 w-4 items-center justify-center", className)}
      {...props}
    >
      {children}
    </span>
  )
)
ListboxItemIndicator.displayName = "ListboxItemIndicator"

export interface ListboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ListboxGroup = React.forwardRef<HTMLDivElement, ListboxGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-1", className)}
      role="group"
      {...props}
    >
      {children}
    </div>
  )
)
ListboxGroup.displayName = "ListboxGroup"

export interface ListboxGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ListboxGroupLabel = React.forwardRef<HTMLDivElement, ListboxGroupLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-3 py-1.5 text-caption-sm font-medium text-[var(--color-text-secondary)]", className)}
      {...props}
    >
      {children}
    </div>
  )
)
ListboxGroupLabel.displayName = "ListboxGroupLabel"

export { 
  Listbox, 
  ListboxItem, 
  ListboxItemIndicator, 
  ListboxGroup, 
  ListboxGroupLabel 
}