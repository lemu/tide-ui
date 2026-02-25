import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Main Empty container
const emptyVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        s: "gap-[var(--space-m)] py-[var(--space-3xl)] px-[var(--space-l)]",
        m: "gap-[var(--space-l)] py-[var(--space-4xl)] px-[var(--space-xl)]",
        l: "gap-[var(--space-xl)] py-[var(--space-5xl)] px-[var(--space-2xl)]",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

export interface EmptyProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyVariants> {}

const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyVariants({ size }), className)}
      {...props}
    />
  )
)
Empty.displayName = "Empty"

// Header container
const EmptyHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center gap-[var(--space-m)]", className)}
    {...props}
  />
))
EmptyHeader.displayName = "EmptyHeader"

// Media container with icon variants
const emptyMediaVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        icon: "rounded-full",
        default: "", // For avatars, images, etc.
      },
      color: {
        default: "bg-[var(--color-background-neutral-subtlest)] text-[var(--color-text-tertiary)]",
        primary: "bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand-bold)]",
        success: "bg-[var(--color-background-success-subtle)] text-[var(--color-text-success-bold)]",
        warning: "bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning-bold)]",
        error: "bg-[var(--color-background-error-subtle)] text-[var(--color-text-error-bold)]",
        info: "bg-[var(--color-background-info-subtle)] text-[var(--color-text-info-bold)]",
      },
      size: {
        s: "h-[var(--size-3xl)] w-[var(--size-3xl)]",
        m: "h-[var(--size-4xl)] w-[var(--size-4xl)]",
        l: "h-[var(--size-5xl)] w-[var(--size-5xl)]",
      },
    },
    defaultVariants: {
      variant: "icon",
      color: "default",
      size: "m",
    },
  }
)

export interface EmptyMediaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof emptyMediaVariants> {}

const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>(
  ({ className, variant, color, size, ...props }, ref) => {
    const colorValue = variant === "icon" ? color : undefined;
    return (
      <div
        ref={ref}
        className={cn(
          emptyMediaVariants({ variant, color: colorValue, size }),
          className
        )}
        {...props}
      />
    );
  }
)
EmptyMedia.displayName = "EmptyMedia"

// Title with responsive typography
const emptyTitleVariants = cva(
  "font-semibold text-[var(--color-text-primary)]",
  {
    variants: {
      size: {
        s: "text-heading-sm",
        m: "text-heading-md",
        l: "text-heading-lg",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

export interface EmptyTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof emptyTitleVariants> {}

const EmptyTitle = React.forwardRef<HTMLHeadingElement, EmptyTitleProps>(
  ({ className, size, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(emptyTitleVariants({ size }), className)}
      {...props}
    />
  )
)
EmptyTitle.displayName = "EmptyTitle"

// Description with responsive typography
const emptyDescriptionVariants = cva(
  "text-[var(--color-text-secondary)]",
  {
    variants: {
      size: {
        s: "text-body-sm",
        m: "text-body-md",
        l: "text-body-lg",
      },
    },
    defaultVariants: {
      size: "m",
    },
  }
)

export interface EmptyDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof emptyDescriptionVariants> {}

const EmptyDescription = React.forwardRef<HTMLParagraphElement, EmptyDescriptionProps>(
  ({ className, size, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(emptyDescriptionVariants({ size }), className)}
      {...props}
    />
  )
)
EmptyDescription.displayName = "EmptyDescription"

// Content container for actions
const EmptyContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col sm:flex-row items-center gap-[var(--space-m)]", className)}
    {...props}
  />
))
EmptyContent.displayName = "EmptyContent"

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  emptyVariants,
  emptyMediaVariants,
  emptyTitleVariants,
  emptyDescriptionVariants,
}
