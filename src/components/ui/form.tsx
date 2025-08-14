import * as React from "react";
import { useForm, UseFormReturn, FieldPath, FieldValues, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormField as BaseFormField,
  FormFieldProps as BaseFormFieldProps,
} from "./form-field";

// Re-export form components for convenience
export {
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "./form-field";

// Form Context for react-hook-form integration
const FormContext = React.createContext<UseFormReturn<any> | null>(null);

export const useFormContext = <TFieldValues extends FieldValues = FieldValues>(): UseFormReturn<TFieldValues> => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a Form component");
  }
  return context;
};

// Enhanced Form wrapper component
export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
}

const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
Form.displayName = "Form";

// Enhanced FormField component with react-hook-form integration
export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<BaseFormFieldProps, 'children'> {
  name: TName;
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
    error?: string;
  }) => React.ReactElement;
}

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  children,
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  const form = useFormContext<TFieldValues>();

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <BaseFormField {...props}>
          {children({
            ...field,
            error: fieldState.error?.message,
          })}
        </BaseFormField>
      )}
    />
  );
};
FormField.displayName = "FormField";

// Convenient hook for creating forms with zod validation
export interface UseFormWithSchemaOptions<T extends z.ZodType<any, any, any>> {
  schema: T;
  defaultValues?: z.infer<T>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all";
}

export const useFormWithSchema = <T extends z.ZodType<any, any, any>>({
  schema,
  defaultValues,
  mode = "onBlur",
}: UseFormWithSchemaOptions<T>) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
    mode,
  });
};

export { Form, FormField };
export type { UseFormReturn };