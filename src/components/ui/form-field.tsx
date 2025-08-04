import * as React from "react";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

// Form Field Container
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-[var(--space-sm)]", className)}
      {...props}
    />
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
        "[&]:text-body-medium-md mb-[var(--space-xsm)] block text-[var(--color-text-primary)]",
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
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "[&]:text-body-sm mt-[var(--space-sm)] flex items-start gap-[var(--space-xsm)] text-[var(--color-text-tertiary)]",
        className,
      )}
      {...props}
    >
      <Icon
        name="info"
        size="sm"
        color="secondary"
        className="mt-[1px] flex-shrink-0"
      />
      <span>{children}</span>
    </div>
  ),
);
FormHelperText.displayName = "FormHelperText";

// Form Error Message
export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormErrorMessage = React.forwardRef<
  HTMLDivElement,
  FormErrorMessageProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&]:text-body-sm mt-[var(--space-sm)] flex items-start gap-[var(--space-xsm)] text-[var(--color-text-error)]",
      className,
    )}
    {...props}
  >
    <Icon
      name="circle-x"
      size="sm"
      color="error"
      className="mt-[1px] flex-shrink-0"
    />
    <span>{children}</span>
  </div>
));
FormErrorMessage.displayName = "FormErrorMessage";

export { FormField, FormLabel, FormControl, FormHelperText, FormErrorMessage };
