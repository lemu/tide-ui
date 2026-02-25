import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon } from "./icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const labelVariants = cva(
  "cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        s: "[&]:text-body-sm",
        m: "[&]:text-body-md",
      },
      color: {
        primary: "text-[var(--color-text-primary)]",
        secondary: "text-[var(--color-text-tertiary)]",
      },
    },
    defaultVariants: {
      size: "m",
      color: "primary",
    },
  },
);

export interface LabelProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
    VariantProps<typeof labelVariants> {
  /** Show asterisk for required fields */
  required?: boolean;
  /** Info tooltip text - shows info icon with tooltip when provided */
  info?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { className, children, required, info, size, color, ...props },
    ref,
  ) => {
    const labelContent = (
      <label
        ref={ref}
        className={cn(labelVariants({ size, color }), className)}
        {...props}
      >
        <span className="inline-flex items-center gap-[var(--space-xs)]">
          {children}
          {required && (
            <span className="text-[var(--color-text-error-bold)]" aria-label="required">
              *
            </span>
          )}
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex cursor-help">
                    <Icon
                      name="info"
                      size="s"
                      color="secondary"
                      aria-label={info}
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </span>
      </label>
    );

    return labelContent;
  },
);

Label.displayName = "Label";

export { Label };
