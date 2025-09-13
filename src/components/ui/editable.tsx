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

// Removed editableInputVariants - now using direct styling on contenteditable divs

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
  previewFontSize?: string
  setPreviewFontSize: (fontSize: string | undefined) => void
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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit">,
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
    const [previewFontSize, setPreviewFontSize] = React.useState<string | undefined>(undefined)

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
      previewFontSize,
      setPreviewFontSize,
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
      triggerMode,
      setPreviewFontSize
    } = useEditable()

    // Extract font size class from className when component mounts or className changes
    React.useEffect(() => {
      if (className) {
        // Look for text-* classes that define font sizes - matches all typography utilities
        const fontSizeMatch = className.match(/text-(?:heading|body|label|caption)-[\w-]+/g)
        if (fontSizeMatch && fontSizeMatch.length > 0) {
          setPreviewFontSize(fontSizeMatch[0])
        } else {
          setPreviewFontSize(undefined)
        }
      } else {
        setPreviewFontSize(undefined)
      }
    }, [className, setPreviewFontSize])

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

const EditableInput = React.forwardRef<HTMLDivElement, EditableInputProps>(
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
      disabled,
      previewFontSize
    } = useEditable()

    const inputRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!, [])

    React.useEffect(() => {
      if (isEditing && autoFocus && inputRef.current) {
        inputRef.current.focus()
        // Select all text in contenteditable
        const range = document.createRange()
        range.selectNodeContents(inputRef.current)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }, [isEditing, autoFocus])

    if (!isEditing) return null

    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
      const newValue = event.currentTarget.textContent || ''
      
      // Handle maxLength constraint
      if (maxLength && newValue.length > maxLength) {
        event.currentTarget.textContent = newValue.slice(0, maxLength)
        // Move cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(event.currentTarget)
        range.collapse(false)
        selection?.removeAllRanges()
        selection?.addRange(range)
        return
      }
      
      onChange(newValue)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

    // Apply typography class directly to contenteditable div
    const appliedClassName = cn(
      // Base styles for contenteditable
      "w-full rounded border bg-[var(--color-surface-primary)] px-2 py-1 transition-colors focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)] break-words",
      // Invalid state
      invalid ? "border-[var(--color-border-error)] focus-visible:border-[var(--color-border-error)]" : "border-[var(--color-border-input)] focus-visible:border-[#005f85]",
      // Typography class from preview (this is the key!)
      previewFontSize || "",
      // Additional classes
      className
    )

    return (
      <div
        ref={inputRef}
        className={appliedClassName}
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        role="textbox"
        aria-required={required}
        aria-invalid={invalid}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {value}
      </div>
    )
  }
)
EditableInput.displayName = "EditableInput"

export interface EditableTextareaProps 
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  autoFocus?: boolean
  autoResize?: boolean
}

const EditableTextarea = React.forwardRef<HTMLDivElement, EditableTextareaProps>(
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
      disabled,
      previewFontSize
    } = useEditable()

    const textareaRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    React.useEffect(() => {
      if (isEditing && autoFocus && textareaRef.current) {
        textareaRef.current.focus()
        // Select all text in contenteditable
        const range = document.createRange()
        range.selectNodeContents(textareaRef.current)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }, [isEditing, autoFocus])

    if (!isEditing) return null

    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
      const newValue = event.currentTarget.textContent || ''
      
      // Handle maxLength constraint
      if (maxLength && newValue.length > maxLength) {
        event.currentTarget.textContent = newValue.slice(0, maxLength)
        // Move cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(event.currentTarget)
        range.collapse(false)
        selection?.removeAllRanges()
        selection?.addRange(range)
        return
      }
      
      onChange(newValue)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && event.metaKey) {
        // Cmd+Enter submits (like original textarea behavior)
        event.preventDefault()
        onSubmit()
      } else if (event.key === "Escape") {
        event.preventDefault()
        onCancel()
      }
      // Allow regular Enter for new lines in textarea mode
    }

    const handleBlur = () => {
      onSubmit()
    }

    // Apply typography class directly to contenteditable div 
    const appliedClassName = cn(
      // Base styles for contenteditable textarea
      "w-full rounded border bg-[var(--color-surface-primary)] px-2 py-1 transition-colors focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)] min-h-[3lh] break-words whitespace-pre-wrap",
      // Invalid state
      invalid ? "border-[var(--color-border-error)] focus-visible:border-[var(--color-border-error)]" : "border-[var(--color-border-input)] focus-visible:border-[#005f85]",
      // Typography class from preview (this is the key!)
      previewFontSize || "",
      // Additional classes
      className
    )

    return (
      <div
        ref={textareaRef}
        className={appliedClassName}
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        role="textbox"
        aria-multiline="true"
        aria-required={required}
        aria-invalid={invalid}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {value}
      </div>
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