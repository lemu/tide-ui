import * as React from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const listboxVariants = cva(
  "w-full space-y-2",
  {
    variants: {
      size: {
        sm: "text-body-sm",
        md: "text-body-sm", 
        lg: "text-body-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const listboxOptionVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center rounded-md border bg-[var(--color-surface-primary)] px-4 py-3 text-left outline-none transition-colors focus:ring-2 focus:ring-[var(--color-border-brand)] focus:ring-offset-2",
  {
    variants: {
      selected: {
        true: "border-[var(--color-border-primary-bold)] bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)]",
        false: "border-[var(--color-border-primary-subtle)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)]",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
)

export interface ListboxContextValue {
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
  multiple?: boolean
  disabled?: boolean
  size?: "sm" | "md" | "lg"
  options: { value: string; disabled: boolean; ref: React.RefObject<HTMLDivElement> }[]
  registerOption: (value: string, disabled: boolean, ref: React.RefObject<HTMLDivElement>) => void
  unregisterOption: (value: string) => void
  activeValue: string | null
  setActiveValue: (value: string | null) => void
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listboxVariants> {
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  multiple?: boolean
  disabled?: boolean
}

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  ({ 
    className, 
    value,
    onChange = () => {},
    multiple = false,
    disabled = false,
    size = "md",
    children,
    ...props 
  }, ref) => {
    const [options, setOptions] = React.useState<{ value: string; disabled: boolean; ref: React.RefObject<HTMLDivElement> }[]>([])
    const [activeValue, setActiveValue] = React.useState<string | null>(null)

    const registerOption = React.useCallback((optionValue: string, optionDisabled: boolean, optionRef: React.RefObject<HTMLDivElement>) => {
      setOptions(prev => {
        const existing = prev.find(opt => opt.value === optionValue)
        if (existing) {
          return prev.map(opt => 
            opt.value === optionValue 
              ? { ...opt, disabled: optionDisabled, ref: optionRef }
              : opt
          )
        }
        return [...prev, { value: optionValue, disabled: optionDisabled, ref: optionRef }]
      })
    }, [])

    const unregisterOption = React.useCallback((optionValue: string) => {
      setOptions(prev => prev.filter(opt => opt.value !== optionValue))
    }, [])

    // Container should not handle keyboard events - individual options should be focusable

    // Set first enabled option as active by default
    React.useEffect(() => {
      if (activeValue === null && options.length > 0) {
        const firstEnabledOption = options.find(opt => !opt.disabled)
        if (firstEnabledOption) {
          setActiveValue(firstEnabledOption.value)
        }
      }
    }, [options, activeValue])

    const contextValue: ListboxContextValue = {
      value,
      onChange,
      multiple,
      disabled,
      size,
      options,
      registerOption,
      unregisterOption,
      activeValue,
      setActiveValue,
    }

    return (
      <ListboxContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(listboxVariants({ size, className }))}
          role="listbox"
          aria-multiselectable={multiple}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      </ListboxContext.Provider>
    )
  }
)
Listbox.displayName = "Listbox"


export interface ListboxOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
  children: React.ReactNode
}

const ListboxOption = React.forwardRef<HTMLDivElement, ListboxOptionProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const optionRef = React.useRef<HTMLDivElement>(null)
    const { 
      value: selectedValue, 
      onChange, 
      multiple,
      options,
      registerOption,
      unregisterOption,
      disabled: listboxDisabled,
      activeValue,
      setActiveValue
    } = useListbox()
    
    // Use the passed ref or our internal ref
    React.useImperativeHandle(ref, () => optionRef.current!)
    
    const optionIndex = React.useMemo(() => {
      return options.findIndex(opt => opt.value === value)
    }, [options, value])

    React.useEffect(() => {
      registerOption(value, disabled, optionRef)
      return () => unregisterOption(value)
    }, [value, disabled, registerOption, unregisterOption])
    
    const isSelected = multiple 
      ? Array.isArray(selectedValue) && selectedValue.includes(value)
      : selectedValue === value
    const isDisabled = disabled || listboxDisabled

    const handleSelect = () => {
      if (isDisabled) return
      
      if (multiple) {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : []
        const newValue = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
        onChange(newValue)
      } else {
        onChange(value)
      }
    }


    return (
      <div
        ref={optionRef}
        className={cn(listboxOptionVariants({ 
          selected: isSelected, 
          disabled: isDisabled,
          className 
        }))}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : (activeValue === value || (activeValue === null && options.findIndex(opt => opt.value === value && !opt.isGroupLabel) === 0)) ? 0 : -1}
        onClick={handleSelect}
        onFocus={() => {
          if (!isDisabled) {
            setActiveValue(value)
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleSelect()
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            // Filter out disabled options AND group labels
            const navigableOptions = options.filter(opt => !opt.disabled && !opt.isGroupLabel)
            const currentIndex = navigableOptions.findIndex(opt => opt.value === value)
            
            let nextIndex
            if (event.key === 'ArrowDown') {
              nextIndex = currentIndex < navigableOptions.length - 1 ? currentIndex + 1 : 0
            } else {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : navigableOptions.length - 1
            }
            
            const nextOption = navigableOptions[nextIndex]
            if (nextOption?.ref.current) {
              nextOption.ref.current.focus()
            }
          }
        }}
        {...props}
      >
        <span className="block truncate">
          {children}
        </span>
        {isSelected && (
          <Check className="ml-auto h-4 w-4 text-[var(--color-text-brand)]" aria-hidden="true" />
        )}
      </div>
    )
  }
)
ListboxOption.displayName = "ListboxOption"

export interface ListboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ListboxGroup = React.forwardRef<HTMLDivElement, ListboxGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-2 last:mb-0", className)}
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
      className={cn(
        "px-4 py-2 mb-1 text-caption-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-background-neutral-subtle)]",
        className
      )}
      role="presentation"
      {...props}
    >
      {children}
    </div>
  )
)
ListboxGroupLabel.displayName = "ListboxGroupLabel"

export { 
  Listbox, 
  ListboxOption,
  ListboxGroup,
  ListboxGroupLabel
}