import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border transition-colors placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)] disabled:cursor-not-allowed disabled:opacity-50 resize-y",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-interaction-background-input-neutral)] text-[var(--color-text-primary)]",
          "border-[var(--color-interaction-border-input)]",
          "hover:border-[var(--color-interaction-border-input-hovered)]",
          "focus-visible:border-[#005f85]",
        ],
        error: [
          "bg-[var(--color-interaction-background-input-neutral)] text-[var(--color-text-primary)]",
          "border-[var(--color-border-error-bold)]",
          "focus-visible:border-[var(--color-border-error-bold)]",
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