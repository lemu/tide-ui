import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const numberScrubberVariants = cva(
  "flex h-9 w-full rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] px-3 py-1 text-body-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-brand)] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      size: {
        sm: "h-8 px-2 text-caption-sm",
        md: "h-9 px-3 text-body-sm",
        lg: "h-10 px-4 text-body-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface NumberScrubberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type">,
    VariantProps<typeof numberScrubberVariants> {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  sensitivity?: number
  precision?: number
  formatValue?: (value: number) => string
  parseValue?: (value: string) => number
  onScrubStart?: () => void
  onScrubEnd?: () => void
}

export const NumberScrubber = React.forwardRef<HTMLInputElement, NumberScrubberProps>(
  ({
    className,
    variant,
    size,
    value = 0,
    onChange,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
    sensitivity = 1,
    precision = 0,
    formatValue,
    parseValue,
    onScrubStart,
    onScrubEnd,
    disabled,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value)
    const [isEditing, setIsEditing] = React.useState(false)
    const [isDragging, setIsDragging] = React.useState(false)
    const [dragStartX, setDragStartX] = React.useState(0)
    const [dragStartValue, setDragStartValue] = React.useState(0)
    const [inputValue, setInputValue] = React.useState("")

    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!, [])

    // Sync internal value with prop value
    React.useEffect(() => {
      setInternalValue(value)
    }, [value])

    // Update input value when internal value changes and not editing
    React.useEffect(() => {
      if (!isEditing) {
        const formattedValue = formatValue ? formatValue(internalValue) : internalValue.toFixed(precision)
        setInputValue(formattedValue)
      }
    }, [internalValue, isEditing, formatValue, precision])

    const clampValue = React.useCallback((val: number): number => {
      return Math.max(min, Math.min(max, val))
    }, [min, max])

    const roundToStep = React.useCallback((val: number): number => {
      if (step === 0) return val
      return Math.round(val / step) * step
    }, [step])

    const updateValue = React.useCallback((newValue: number) => {
      const clampedValue = clampValue(roundToStep(newValue))
      setInternalValue(clampedValue)
      onChange?.(clampedValue)
    }, [clampValue, roundToStep, onChange])

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      if (disabled || isEditing) return
      
      e.preventDefault()
      setIsDragging(true)
      setDragStartX(e.clientX)
      setDragStartValue(internalValue)
      onScrubStart?.()

      // Change cursor to col-resize for the whole document
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }, [disabled, isEditing, internalValue, onScrubStart])

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStartX
      const valueChange = (deltaX * sensitivity * step) / 10
      const newValue = dragStartValue + valueChange
      
      updateValue(newValue)
    }, [isDragging, dragStartX, dragStartValue, sensitivity, step, updateValue])

    const handleMouseUp = React.useCallback(() => {
      if (!isDragging) return
      
      setIsDragging(false)
      onScrubEnd?.()

      // Reset cursor
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }, [isDragging, onScrubEnd])

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
        
        return () => {
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", handleMouseUp)
        }
      }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const handleFocus = () => {
      if (disabled) return
      setIsEditing(true)
      setInputValue(internalValue.toString())
    }

    const handleBlur = () => {
      setIsEditing(false)
      
      // Parse and validate the input value
      let parsedValue: number
      if (parseValue) {
        parsedValue = parseValue(inputValue)
      } else {
        parsedValue = parseFloat(inputValue)
      }

      if (!isNaN(parsedValue)) {
        updateValue(parsedValue)
      } else {
        // Reset to current value if invalid
        const formattedValue = formatValue ? formatValue(internalValue) : internalValue.toFixed(precision)
        setInputValue(formattedValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === "Enter") {
        inputRef.current?.blur()
      } else if (e.key === "Escape") {
        setIsEditing(false)
        const formattedValue = formatValue ? formatValue(internalValue) : internalValue.toFixed(precision)
        setInputValue(formattedValue)
        inputRef.current?.blur()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        updateValue(internalValue + step)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        updateValue(internalValue - step)
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isEditing) {
        setInputValue(e.target.value)
      }
    }

    return (
      <input
        ref={inputRef}
        type="text"
        className={cn(
          numberScrubberVariants({ variant, size }),
          isDragging && "cursor-col-resize",
          !isEditing && "cursor-col-resize",
          className
        )}
        value={inputValue}
        onChange={handleInputChange}
        onMouseDown={handleMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoComplete="off"
        spellCheck="false"
        style={{
          // Hide spin buttons
          WebkitAppearance: "textfield",
          MozAppearance: "textfield",
        }}
        {...props}
      />
    )
  }
)
NumberScrubber.displayName = "NumberScrubber"

export type { NumberScrubberProps }