import * as React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

// Context to track if we're inside a checkbox form field
const FormFieldContext = React.createContext<{
  isCheckboxField?: boolean;
}>({});

// Form Field Container
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Set to true when this form field contains a checkbox */
  isCheckboxField?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, isCheckboxField = false, ...props }, ref) => (
    <FormFieldContext.Provider value={{ isCheckboxField }}>
      <div
        ref={ref}
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

// Form Label
export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "[&]:text-body-md mb-[var(--space-xsm)] block text-[var(--color-text-primary)] cursor-pointer",
        className,
      )}
      {...props}
    />
  ),
);
FormLabel.displayName = "FormLabel";

// Form Control (wrapper for input)
export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
FormControl.displayName = "FormControl";

// Form Helper Text
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

// Form Error Message
export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormErrorMessage = React.forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>(({ className, children, ...props }, ref) => {
  const { isCheckboxField } = React.useContext(FormFieldContext);

  if (isCheckboxField) {
    // For checkbox fields: no icon, aligned with label text
    return (
      <div className="ml-[calc(var(--size-2xsm)+var(--space-sm))]">
        <div
          ref={ref}
          className={cn(
            "[&]:text-body-sm text-[var(--color-text-error-bold)]",
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
      <span>{children}</span>
    </div>
  );
});
FormErrorMessage.displayName = "FormErrorMessage";

export { FormField, FormLabel, FormControl, FormHelperText, FormErrorMessage };
