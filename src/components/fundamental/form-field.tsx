import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import { Label } from "./label";
import { Separator } from "./separator";

// Context to track if we're inside a checkbox form field (backward compatibility)
const FormFieldContext = React.createContext<{
  isCheckboxField?: boolean;
  invalid?: boolean;
}>({});

// FieldSet - Semantic fieldset container for grouped controls
export interface FieldSetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  ({ className, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={cn("flex flex-col gap-[var(--space-md)]", className)}
      {...props}
    />
  ),
);
FieldSet.displayName = "FieldSet";

// FieldLegend - Legend element for FieldSet with sizing variants
const fieldLegendVariants = cva(
  "block text-[var(--color-text-primary)] mb-[var(--space-xsm)]",
  {
    variants: {
      variant: {
        legend: "[&]:text-heading-sm",
        label: "[&]:text-body-md",
      },
    },
    defaultVariants: {
      variant: "legend",
    },
  }
);

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement>,
    VariantProps<typeof fieldLegendVariants> {}

const FieldLegend = React.forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ className, variant, ...props }, ref) => (
    <legend
      ref={ref}
      className={cn(fieldLegendVariants({ variant }), className)}
      {...props}
    />
  ),
);
FieldLegend.displayName = "FieldLegend";

// FieldGroup - Container for responsive field layouts with container queries
export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("@container/field-group flex flex-col gap-[var(--space-md)]", className)}
      {...props}
    />
  ),
);
FieldGroup.displayName = "FieldGroup";

// Field - Main wrapper with orientation control
const fieldVariants = cva(
  "flex gap-[var(--space-md)]",
  {
    variants: {
      orientation: {
        vertical: "flex-col",
        horizontal: "flex-row items-start",
        responsive: "flex-col @md/field-group:flex-row @md/field-group:items-start",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  invalid?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation, invalid, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-invalid={invalid ? "" : undefined}
      className={cn(fieldVariants({ orientation }), invalid && "group/invalid", className)}
      {...props}
    />
  ),
);
Field.displayName = "Field";

// FieldContent - Flex column for grouping label and descriptions
export interface FieldContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const FieldContent = React.forwardRef<HTMLDivElement, FieldContentProps>(
  ({ className, asChild, ...props }, ref) => {
    if (asChild) {
      return <div ref={ref} className={className} {...props} />;
    }
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-[var(--space-xsm)]", className)}
        {...props}
      />
    );
  },
);
FieldContent.displayName = "FieldContent";

// FieldLabel - Styled label for inputs with peer support
export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, asChild, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn(
        "peer [&]:text-body-md cursor-pointer",
        "group-data-[invalid]/invalid:text-[var(--color-text-error-bold)]",
        className
      )}
      {...props}
    />
  ),
);
FieldLabel.displayName = "FieldLabel";

// FieldTitle - Title styling within FieldContent
export interface FieldTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

const FieldTitle = React.forwardRef<HTMLDivElement, FieldTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "[&]:text-body-medium-sm text-[var(--color-text-primary)]",
        "group-disabled:opacity-50",
        className
      )}
      {...props}
    />
  ),
);
FieldTitle.displayName = "FieldTitle";

// FieldDescription - Helper text with automatic line balancing
export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "[&]:text-body-sm text-[var(--color-text-tertiary)]",
        "group-disabled:opacity-50",
        className
      )}
      style={{ textWrap: "balance" } as React.CSSProperties}
      {...props}
    >
      {children}
    </p>
  ),
);
FieldDescription.displayName = "FieldDescription";

// FieldSeparator - Visual divider between sections
export interface FieldSeparatorProps extends React.ComponentPropsWithoutRef<typeof Separator> {
  children?: React.ReactNode;
}

const FieldSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  FieldSeparatorProps
>(({ children, className, ...props }, ref) => {
  if (children) {
    return (
      <div className={cn("relative flex items-center gap-[var(--space-md)]", className)}>
        <Separator ref={ref} className="flex-1" {...props} />
        <span className="[&]:text-body-sm text-[var(--color-text-tertiary)]">{children}</span>
        <Separator className="flex-1" {...props} />
      </div>
    );
  }

  return <Separator ref={ref} className={className} {...props} />;
});
FieldSeparator.displayName = "FieldSeparator";

// FieldError - Accessible error container with array support
export interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errors?: string | string[] | null;
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, errors, children, ...props }, ref) => {
    const content = errors || children;

    if (!content) return null;

    // Single error message
    if (typeof content === "string") {
      return (
        <div
          ref={ref}
          role="alert"
          aria-live="polite"
          className={cn(
            "[&]:text-body-sm flex items-start gap-[var(--space-xsm)] text-[var(--color-text-error-bold)]",
            className
          )}
          {...props}
        >
          <Icon
            name="circle-alert"
            size="sm"
            color="error"
            className="mt-[1px] flex-shrink-0"
          />
          <span>{content}</span>
        </div>
      );
    }

    // Multiple error messages (array)
    if (Array.isArray(content)) {
      return (
        <div
          ref={ref}
          role="alert"
          aria-live="polite"
          className={cn(
            "[&]:text-body-sm text-[var(--color-text-error-bold)]",
            className
          )}
          {...props}
        >
          <ul className="flex flex-col gap-[var(--space-xsm)] list-disc list-inside">
            {content.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  },
);
FieldError.displayName = "FieldError";

// ===============================================
// BACKWARD COMPATIBILITY COMPONENTS
// These maintain the existing API while internally using new patterns
// ===============================================

// FormField - Original container (maintains backward compatibility)
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Set to true when this form field contains a checkbox */
  isCheckboxField?: boolean;
  /** Set to true to apply invalid state styling */
  invalid?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, isCheckboxField = false, invalid = false, ...props }, ref) => (
    <FormFieldContext.Provider value={{ isCheckboxField, invalid }}>
      <div
        ref={ref}
        data-invalid={invalid ? "" : undefined}
        className={cn(
          isCheckboxField ? "space-y-[var(--space-xsm)]" : "space-y-[var(--space-sm)]",
          className
        )}
        {...props}
      />
    </FormFieldContext.Provider>
  ),
);
FormField.displayName = "FormField";

// FormLabel - Original label (maintains backward compatibility)
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { invalid } = React.useContext(FormFieldContext);
    return (
      <label
        ref={ref}
        className={cn(
          "[&]:text-body-md mb-[var(--space-xsm)] block text-[var(--color-text-primary)] cursor-pointer",
          invalid && "text-[var(--color-text-error-bold)]",
          className,
        )}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

// FormControl - Original control wrapper (maintains backward compatibility)
export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
FormControl.displayName = "FormControl";

// FormHelperText - Original helper text (maintains backward compatibility)
export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormHelperText = React.forwardRef<HTMLDivElement, FormHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    const { isCheckboxField } = React.useContext(FormFieldContext);

    if (isCheckboxField) {
      // For checkbox fields: no icon, aligned with label text
      return (
        <div className="ml-[calc(var(--size-2xsm)+var(--space-sm))]">
          <div
            ref={ref}
            className={cn(
              "[&]:text-body-sm text-[var(--color-text-tertiary)]",
              className,
            )}
            {...props}
          >
            {children}
          </div>
        </div>
      );
    }

    // For input fields: with icon, normal alignment
    return (
      <div
        ref={ref}
        className={cn(
          "[&]:text-body-sm flex items-start gap-[var(--space-xsm)] text-[var(--color-text-tertiary)]",
          className,
        )}
        {...props}
      >
        <Icon
          name="info"
          size="sm"
          color="tertiary"
          className="mt-[1px] flex-shrink-0"
        />
        <span>{children}</span>
      </div>
    );
  },
);
FormHelperText.displayName = "FormHelperText";

// FormErrorMessage - Original error message (maintains backward compatibility)
export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  errors?: string | string[] | null;
}

const FormErrorMessage = React.forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>(({ className, errors, children, ...props }, ref) => {
  const { isCheckboxField } = React.useContext(FormFieldContext);
  const content = errors || children;

  if (!content) return null;

  // Handle error arrays
  if (Array.isArray(content)) {
    if (isCheckboxField) {
      return (
        <div className="ml-[calc(var(--size-2xsm)+var(--space-sm))]">
          <div
            ref={ref}
            role="alert"
            aria-live="polite"
            className={cn(
              "[&]:text-body-sm text-[var(--color-text-error-bold)]",
              className,
            )}
            {...props}
          >
            <ul className="flex flex-col gap-[var(--space-xsm)] list-disc list-inside">
              {content.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          "[&]:text-body-sm flex flex-col gap-[var(--space-xsm)] text-[var(--color-text-error-bold)]",
          className,
        )}
        {...props}
      >
        <ul className="flex flex-col gap-[var(--space-xsm)] list-disc list-inside ml-[calc(var(--size-sm)+var(--space-xsm))]">
          {content.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Handle single error message (string)
  if (isCheckboxField) {
    // For checkbox fields: no icon, aligned with label text
    return (
      <div className="ml-[calc(var(--size-2xsm)+var(--space-sm))]">
        <div
          ref={ref}
          role="alert"
          aria-live="polite"
          className={cn(
            "[&]:text-body-sm text-[var(--color-text-error-bold)]",
            className,
          )}
          {...props}
        >
          {content}
        </div>
      </div>
    );
  }

  // For input fields: with icon, normal alignment
  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={cn(
        "[&]:text-body-sm flex items-start gap-[var(--space-xsm)] text-[var(--color-text-error-bold)]",
        className,
      )}
      {...props}
    >
      <Icon
        name="circle-alert"
        size="sm"
        color="error"
        className="mt-[1px] flex-shrink-0"
      />
      <span>{content}</span>
    </div>
  );
});
FormErrorMessage.displayName = "FormErrorMessage";

export {
  // New composable Field components (shadcn-inspired)
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
  fieldVariants,
  fieldLegendVariants,
  // Original FormField components (backward compatibility)
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
};
