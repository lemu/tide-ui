import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border transition-colors placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-background-input)] text-[var(--color-text-primary)]",
          "border-[var(--color-border-input)]",
          "hover:border-[var(--color-border-input-hovered)]",
          "focus-visible:border-[var(--color-border-focused)]",
        ],
        error: [
          "bg-[var(--color-background-input)] text-[var(--color-text-primary)]",
          "border-[var(--color-border-error)]",
          "focus-visible:border-[var(--color-border-error)]",
        ],
      },
      size: {
        sm: "px-[var(--space-sm)] py-[var(--space-xsm)] text-body-sm",
        md: "px-[var(--space-md)] py-[var(--space-sm)] text-body-md",
        lg: "px-[var(--space-lg)] py-[var(--space-md)] text-body-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };