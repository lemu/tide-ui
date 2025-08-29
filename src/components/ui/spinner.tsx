import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "./icon"

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4", 
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-10 w-10",
      },
      variant: {
        default: "text-[var(--color-text-primary)]",
        primary: "text-[var(--color-text-brand)]",
        secondary: "text-[var(--color-text-secondary)]",
        tertiary: "text-[var(--color-text-tertiary)]",
        inverse: "text-[var(--color-text-on-action)]",
        success: "text-[var(--color-text-success)]",
        warning: "text-[var(--color-text-warning)]",
        error: "text-[var(--color-text-error)]",
        disabled: "text-[var(--color-text-disabled)]",
      },
      speed: {
        slow: "animate-[spin_2s_linear_infinite]",
        normal: "animate-spin",
        fast: "animate-[spin_0.5s_linear_infinite]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      speed: "normal",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Text to display alongside the spinner
   */
  label?: string
  /**
   * Whether to show the loading text
   */
  showLabel?: boolean
  /**
   * Custom loading text
   */
  loadingText?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ 
    className, 
    size, 
    variant, 
    speed,
    label,
    showLabel = false,
    loadingText = "Loading...",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-2", className)}
        role="status"
        aria-label={label || loadingText}
        {...props}
      >
        <Icon 
          name="loader-2" 
          className={cn(spinnerVariants({ size, variant, speed }))} 
        />
        {showLabel && (
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            {label || loadingText}
          </span>
        )}
        <span className="sr-only">{label || loadingText}</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

// Loading overlay component for covering content
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the overlay is visible
   */
  visible: boolean
  /**
   * Loading message to display
   */
  message?: string
  /**
   * Spinner size
   */
  spinnerSize?: VariantProps<typeof spinnerVariants>["size"]
  /**
   * Background opacity
   */
  opacity?: "light" | "medium" | "heavy"
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ 
    className,
    visible,
    message = "Loading...",
    spinnerSize = "lg",
    opacity = "medium",
    children,
    ...props 
  }, ref) => {
    if (!visible) return null

    const opacityClass = {
      light: "bg-[var(--color-surface-primary)]/60",
      medium: "bg-[var(--color-surface-primary)]/80", 
      heavy: "bg-[var(--color-surface-primary)]/95",
    }[opacity]

    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 z-50 flex flex-col items-center justify-center",
          opacityClass,
          className
        )}
        {...props}
      >
        <Spinner size={spinnerSize} variant="primary" />
        <p className="mt-3 text-body-sm text-[var(--color-text-secondary)]">
          {message}
        </p>
        {children}
      </div>
    )
  }
)
LoadingOverlay.displayName = "LoadingOverlay"

// Skeleton loader for content placeholders
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   */
  width?: string | number
  /**
   * Height of the skeleton
   */
  height?: string | number
  /**
   * Border radius variant
   */
  radius?: "none" | "sm" | "md" | "lg" | "full"
  /**
   * Whether to animate the skeleton
   */
  animate?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className,
    width,
    height = "1rem",
    radius = "md",
    animate = true,
    ...props 
  }, ref) => {
    const radiusClass = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded",
      lg: "rounded-lg",
      full: "rounded-full",
    }[radius]

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-background-neutral-subtle)]",
          radiusClass,
          animate && "animate-pulse",
          className
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

// Pulsing dot indicator
export interface PulseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Color variant
   */
  variant?: "default" | "primary" | "success" | "warning" | "error"
  /**
   * Size of the pulse dot
   */
  size?: "sm" | "md" | "lg"
}

const Pulse = React.forwardRef<HTMLDivElement, PulseProps>(
  ({ 
    className,
    variant = "primary",
    size = "md",
    ...props 
  }, ref) => {
    const variantClass = {
      default: "bg-[var(--color-background-neutral)]",
      primary: "bg-[var(--color-background-brand)]",
      success: "bg-[var(--color-background-success)]",
      warning: "bg-[var(--color-background-warning)]",
      error: "bg-[var(--color-background-error)]",
    }[variant]

    const sizeClass = {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    }[size]

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full animate-pulse",
          variantClass,
          sizeClass,
          className
        )}
        {...props}
      />
    )
  }
)
Pulse.displayName = "Pulse"

// Progress dots for step indicators
export interface ProgressDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Total number of dots
   */
  total: number
  /**
   * Current active dot (0-indexed)
   */
  current: number
  /**
   * Size of the dots
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether to animate the transition
   */
  animate?: boolean
}

const ProgressDots = React.forwardRef<HTMLDivElement, ProgressDotsProps>(
  ({ 
    className,
    total,
    current,
    size = "md",
    animate = true,
    ...props 
  }, ref) => {
    const sizeClass = {
      sm: "h-1.5 w-1.5",
      md: "h-2 w-2",
      lg: "h-3 w-3",
    }[size]

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={cn(
              "rounded-full transition-colors duration-200",
              sizeClass,
              index === current
                ? "bg-[var(--color-background-brand)]"
                : "bg-[var(--color-background-neutral-subtle)]",
              animate && "transition-all duration-300"
            )}
          />
        ))}
      </div>
    )
  }
)
ProgressDots.displayName = "ProgressDots"

export { 
  Spinner, 
  LoadingOverlay, 
  Skeleton, 
  Pulse, 
  ProgressDots,
  spinnerVariants 
}

