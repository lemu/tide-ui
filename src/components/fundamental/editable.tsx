import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

// Context for sharing state between compound components
interface EditableContextType {
  isEditing: boolean;
  value: string;
  originalValue: string;
  disabled: boolean;
  placeholder?: string;
  onStartEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const EditableContext = createContext<EditableContextType | null>(null);

const useEditableContext = () => {
  const context = useContext(EditableContext);
  if (!context) {
    throw new Error('Editable compound components must be used within Editable');
  }
  return context;
};

// Main Editable component props
export interface EditableProps {
  /** The current value of the editable field */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Called when the value is submitted (Enter key or blur) */
  onSubmit?: (value: string) => void;
  /** Called when the value changes during editing */
  onChange?: (value: string) => void;
  /** Whether the field is disabled from editing */
  disabled?: boolean;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Whether to auto-focus when editing starts */
  autoFocus?: boolean;
  /** Whether to select all text when editing starts */
  selectAllOnFocus?: boolean;
  /** Children components (EditablePreview, EditableInput) */
  children: React.ReactNode;
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// Preview component props
export interface EditablePreviewProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Custom render function */
  children?: React.ReactNode;
}

// Input component props
export interface EditableInputProps {
  /** CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Input type */
  type?: string;
  /** Auto-sizing behavior */
  autoResize?: boolean;
  /** Minimum width for auto-resize */
  minWidth?: number;
  /** Character width multiplier for auto-resize */
  charWidth?: number;
}

/**
 * Editable - A compound component for inline editing
 *
 * @example
 * ```tsx
 * <Editable defaultValue="Click to edit" onSubmit={handleSubmit}>
 *   <EditablePreview className="cursor-pointer hover:bg-gray-100 p-2" />
 *   <EditableInput className="border-2 border-blue-500 p-2" autoResize />
 * </Editable>
 * ```
 */
export const Editable: React.FC<EditableProps> = ({
  value: controlledValue,
  defaultValue = '',
  onSubmit,
  onChange: onChangeProp,
  disabled = false,
  placeholder,
  autoFocus = true,
  selectAllOnFocus = true,
  children,
  className,
  style,
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [originalValue, setOriginalValue] = useState(controlledValue ?? defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Current value is either controlled value or internal state
  const currentValue = isControlled ? controlledValue : internalValue;

  // Update internal state when controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
      if (!isEditing) {
        setOriginalValue(controlledValue);
      }
    }
  }, [controlledValue, isControlled, isEditing]);

  const onStartEdit = () => {
    if (disabled) return;

    setIsEditing(true);
    setOriginalValue(currentValue);

    // Auto-focus and select text
    if (autoFocus) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          if (selectAllOnFocus) {
            inputRef.current.select();
          }
        }
      }, 0);
    }
  };

  const onSave = () => {
    const trimmedValue = currentValue.trim();

    // If empty, reset to original value
    if (!trimmedValue) {
      const resetValue = originalValue;
      if (!isControlled) {
        setInternalValue(resetValue);
      }
      setIsEditing(false);
      return;
    }

    // Call callbacks
    onSubmit?.(trimmedValue);
    if (!isControlled) {
      setInternalValue(trimmedValue);
    }

    setIsEditing(false);
  };

  const onCancel = () => {
    // Reset to original value
    if (!isControlled) {
      setInternalValue(originalValue);
    }
    setIsEditing(false);
  };

  const onChange = (newValue: string) => {
    onChangeProp?.(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const contextValue: EditableContextType = {
    isEditing,
    value: currentValue,
    originalValue,
    disabled,
    placeholder,
    onStartEdit,
    onSave,
    onCancel,
    onChange,
    inputRef,
  };

  return (
    <EditableContext.Provider value={contextValue}>
      <div className={className} style={style}>
        {children}
      </div>
    </EditableContext.Provider>
  );
};

/**
 * EditablePreview - Shows the value when not editing
 */
export const EditablePreview: React.FC<EditablePreviewProps> = ({
  className,
  style,
  children,
}) => {
  const { isEditing, value, disabled, onStartEdit } = useEditableContext();

  if (isEditing) return null;

  const handleClick = () => {
    onStartEdit();
  };

  return (
    <div
      onClick={handleClick}
      className={className}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        ...style,
      }}
    >
      {children || value || 'Click to edit'}
    </div>
  );
};

/**
 * EditableInput - Shows the input field when editing
 */
export const EditableInput: React.FC<EditableInputProps> = ({
  className,
  style,
  type = 'text',
  autoResize = false,
  minWidth = 120,
  charWidth = 16,
}) => {
  const {
    isEditing,
    value,
    placeholder,
    onChange,
    onSave,
    onCancel,
    inputRef
  } = useEditableContext();

  if (!isEditing) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = () => {
    onSave();
  };

  // Calculate auto-resize width
  const autoWidth = autoResize
    ? Math.max(minWidth, value.length * charWidth)
    : undefined;

  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={className}
      style={{
        ...style,
        ...(autoResize && { width: `${autoWidth}px` }),
      }}
    />
  );
};

// Re-export for convenient importing
export { EditablePreview as EditableDisplay };
export { EditableInput as EditableField };

export default Editable;