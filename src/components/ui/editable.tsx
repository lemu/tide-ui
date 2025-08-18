import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const editableVariants = cva(
  "relative w-full",
  {
    variants: {
      size: {
        sm: "text-caption-sm",
        md: "text-body-sm",
        lg: "text-body-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const editablePreviewVariants = cva(
  "w-full cursor-pointer rounded border border-transparent px-2 py-1 transition-colors hover:bg-[var(--color-background-neutral-subtle-hovered)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-brand)] focus:ring-offset-1",
  {
    variants: {
      placeholder: {
        true: "text-[var(--color-text-tertiary)] italic",
        false: "text-[var(--color-text-primary)]",
      },
      invalid: {
        true: "border-[var(--color-border-error)] text-[var(--color-text-error)]",
        false: "",
      },
    },
    defaultVariants: {
      placeholder: false,
      invalid: false,
    },
  }
)

const editableInputVariants = cva(
  "w-full rounded border bg-[var(--color-surface-primary)] px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-border-brand)] focus:ring-offset-1",
  {
    variants: {
      invalid: {
        true: "border-[var(--color-border-error)]",
        false: "border-[var(--color-border-input)]",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  }
)

export interface EditableContextValue {
  isEditing: boolean
  value: string
  originalValue: string
  onEdit: () => void
  onCancel: () => void
  onSubmit: () => void
  onChange: (value: string) => void
  placeholder?: string
  invalid?: boolean
  required?: boolean
  maxLength?: number
  disabled?: boolean
  triggerMode: "click" | "dblclick" | "focus"
}

const EditableContext = React.createContext<EditableContextValue | undefined>(undefined)

const useEditable = () => {
  const context = React.useContext(EditableContext)
  if (!context) {
    throw new Error("useEditable must be used within an Editable component")
  }
  return context
}

export interface EditableProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof editableVariants> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onEdit?: () => void
  onCancel?: () => void
  onSubmit?: (value: string) => void
  placeholder?: string
  invalid?: boolean
  required?: boolean
  maxLength?: number
  disabled?: boolean
  triggerMode?: "click" | "dblclick" | "focus"
  controlled?: boolean
}

const Editable = React.forwardRef<HTMLDivElement, EditableProps>(
  ({ 
    className,
    size,
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    onEdit,
    onCancel,
    onSubmit,
    placeholder = "Enter text...",
    invalid = false,
    required = false,
    maxLength,
    disabled = false,
    triggerMode = "click",
    controlled = false,
    children,
    ...props 
  }, ref) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(controlledValue || defaultValue)
    const [originalValue, setOriginalValue] = React.useState(controlledValue || defaultValue)

    const value = controlled ? controlledValue || "" : internalValue

    React.useEffect(() => {
      if (controlled && controlledValue !== undefined) {
        setInternalValue(controlledValue)
        setOriginalValue(controlledValue)
      }
    }, [controlled, controlledValue])

    const handleEdit = () => {
      if (disabled) return
      setOriginalValue(value)
      setIsEditing(true)
      onEdit?.()
    }

    const handleCancel = () => {
      const resetValue = originalValue
      if (!controlled) {
        setInternalValue(resetValue)
      }
      setIsEditing(false)
      onCancel?.()
      onValueChange?.(resetValue)
    }

    const handleSubmit = () => {
      setIsEditing(false)
      onSubmit?.(value)
    }

    const handleChange = (newValue: string) => {
      if (!controlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const contextValue: EditableContextValue = {
      isEditing,
      value,
      originalValue,
      onEdit: handleEdit,
      onCancel: handleCancel,
      onSubmit: handleSubmit,
      onChange: handleChange,
      placeholder,
      invalid,
      required,
      maxLength,
      disabled,
      triggerMode,
    }

    return (
      <EditableContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(editableVariants({ size, className }))}
          {...props}
        >
          {children}
        </div>
      </EditableContext.Provider>
    )
  }
)
Editable.displayName = "Editable"

export interface EditablePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const EditablePreview = React.forwardRef<HTMLDivElement, EditablePreviewProps>(
  ({ className, children, ...props }, ref) => {
    const { 
      isEditing, 
      value, 
      onEdit, 
      placeholder, 
      invalid, 
      disabled, 
      triggerMode 
    } = useEditable()

    if (isEditing) return null

    const hasValue = value && value.length > 0
    const displayValue = hasValue ? value : placeholder

    const handleClick = () => {
      if (triggerMode === "click") onEdit()
    }

    const handleDoubleClick = () => {
      if (triggerMode === "dblclick") onEdit()
    }

    const handleFocus = () => {
      if (triggerMode === "focus") onEdit()
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        onEdit()
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          editablePreviewVariants({ 
            placeholder: !hasValue, 
            invalid,
            className 
          }),
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label="Click to edit"
        {...props}
      >
        {children || displayValue}
      </div>
    )
  }
)
EditablePreview.displayName = "EditablePreview"

export interface EditableInputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  autoFocus?: boolean
}

const EditableInput = React.forwardRef<HTMLInputElement, EditableInputProps>(
  ({ className, autoFocus = true, ...props }, ref) => {
    const { 
      isEditing, 
      value, 
      onChange, 
      onCancel, 
      onSubmit, 
      invalid, 
      required, 
      maxLength, 
      disabled 
    } = useEditable()

    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!, [])

    React.useEffect(() => {
      if (isEditing && autoFocus && inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, [isEditing, autoFocus])

    if (!isEditing) return null

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault()
        onSubmit()
      } else if (event.key === "Escape") {
        event.preventDefault()
        onCancel()
      }
    }

    const handleBlur = () => {
      onSubmit()
    }

    return (
      <input
        ref={inputRef}
        className={cn(editableInputVariants({ invalid, className }))}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
    )
  }
)
EditableInput.displayName = "EditableInput"

export interface EditableTextareaProps 
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  autoFocus?: boolean
  autoResize?: boolean
}

const EditableTextarea = React.forwardRef<HTMLTextAreaElement, EditableTextareaProps>(
  ({ className, autoFocus = true, autoResize = true, ...props }, ref) => {
    const { 
      isEditing, 
      value, 
      onChange, 
      onCancel, 
      onSubmit, 
      invalid, 
      required, 
      maxLength, 
      disabled 
    } = useEditable()

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    React.useEffect(() => {
      if (isEditing && autoFocus && textareaRef.current) {
        textareaRef.current.focus()
        textareaRef.current.select()
      }
    }, [isEditing, autoFocus])

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [value, autoResize])

    if (!isEditing) return null

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && event.metaKey) {
        event.preventDefault()
        onSubmit()
      } else if (event.key === "Escape") {
        event.preventDefault()
        onCancel()
      }
    }

    const handleBlur = () => {
      onSubmit()
    }

    return (
      <textarea
        ref={textareaRef}
        className={cn(
          editableInputVariants({ invalid }),
          "resize-none",
          className
        )}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        {...props}
      />
    )
  }
)
EditableTextarea.displayName = "EditableTextarea"

export { 
  Editable, 
  EditablePreview, 
  EditableInput, 
  EditableTextarea,
  useEditable 
}