import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const progressVariants = cva(
  "relative h-2 w-full rounded-full border border-[var(--color-border-primary-medium)] bg-white p-px",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-background-neutral-subtlest)]",
        success: "bg-[var(--color-background-success-subtle)]",
        warning: "bg-[var(--color-background-warning-subtle)]",
        error: "bg-[var(--color-background-error-subtle)]",
      },
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-background-blue-bold)]",
        success: "bg-[var(--green-500)]",
        warning: "bg-[var(--orange-500)]",
        error: "bg-[var(--red-500)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showLabel?: boolean
  formatLabel?: (value: number) => string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, showLabel, formatLabel, ...props }, ref) => {
  const defaultFormatLabel = (value: number) => `${Math.round(value)}%`
  
  return (
    <div className="w-full">
      <div className={cn(progressVariants({ variant, size, className }))}>
        <ProgressPrimitive.Root
          ref={ref}
          className="relative h-full w-full overflow-hidden rounded-full bg-[var(--color-background-neutral-subtlest)]"
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(progressIndicatorVariants({ variant }))}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
      {showLabel && value !== undefined && value !== null && (
        <div className="mt-1 text-caption-sm text-[var(--color-text-secondary)]">
          {formatLabel ? formatLabel(value) : defaultFormatLabel(value)}
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }