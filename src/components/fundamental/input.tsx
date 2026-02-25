import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";

const inputVariants = cva(
  "flex w-full rounded-m border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:shadow-[0px_0px_0px_2px_rgba(0,95,133,0.2),0px_3px_4px_0px_rgba(0,14,20,0.03)] disabled:cursor-not-allowed disabled:opacity-50",
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
        s: "h-[var(--size-s)] px-[var(--space-s)] py-[var(--space-xs)] text-body-sm",
        m: "h-[var(--size-m)] px-[var(--space-m)] py-[var(--space-s)] text-body-md",
        l: "h-[var(--size-l)] px-[var(--space-l)] py-[var(--space-m)] text-body-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "m",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    const isSearchInput = type === "search";

    if (isSearchInput) {
      // Calculate left padding: icon_position + icon_width + spacing
      // For sm: 12px + 12px + 8px = 32px
      // For md/lg: 12px + 16px + 8px = 36px
      const iconSize = size === "s" ? "s" : "m";
      const leftPadding = size === "s"
        ? "pl-[calc(var(--space-m)+var(--size-3xs)+var(--space-s))]"
        : "pl-[calc(var(--space-m)+var(--size-2xs)+var(--space-s))]";

      return (
        <div className="relative">
          <Icon
            name="search"
            size={iconSize}
            color="tertiary"
            className="absolute left-[var(--space-m)] top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              leftPadding,
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };