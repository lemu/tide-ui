import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "./button"
import { Icon } from "./icon"

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-3 py-8 px-4",
        md: "gap-4 py-12 px-6",
        lg: "gap-6 py-16 px-8",
      },
      fullWidth: {
        true: "w-full",
        false: "max-w-md mx-auto",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)

const emptyStateIconVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-tertiary)]",
        primary: "bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)]",
        success: "bg-[var(--color-background-success-subtle)] text-[var(--color-text-success)]",
        warning: "bg-[var(--color-background-warning-subtle)] text-[var(--color-text-warning)]",
        error: "bg-[var(--color-background-error-subtle)] text-[var(--color-text-error)]",
      },
      size: {
        sm: "h-12 w-12",
        md: "h-16 w-16",
        lg: "h-20 w-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ComponentType<{ className?: string }> | string
  iconVariant?: VariantProps<typeof emptyStateIconVariants>["variant"]
  iconSize?: VariantProps<typeof emptyStateIconVariants>["size"]
  heading: string
  description?: string
  image?: string
  imageAlt?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: "default" | "secondary" | "ghost" | "link"
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
    variant?: "default" | "secondary" | "ghost" | "link"
  }
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({
    className,
    size,
    fullWidth,
    icon,
    iconVariant = "default",
    iconSize,
    heading,
    description,
    image,
    imageAlt,
    action,
    secondaryAction,
    children,
    ...props
  }, ref) => {
    // Use size for icon size if not explicitly set
    const resolvedIconSize = iconSize || size

    const renderIcon = () => {
      if (image) {
        return (
          <div className="mb-2">
            <img
              src={image}
              alt={imageAlt || heading}
              className="max-h-32 w-auto object-contain"
            />
          </div>
        )
      }

      if (icon) {
        return (
          <div className={cn(emptyStateIconVariants({ variant: iconVariant, size: resolvedIconSize }))}>
            {typeof icon === "string" ? (
              <Icon 
                name={icon as any} 
                className={cn(
                  resolvedIconSize === "sm" && "h-6 w-6",
                  resolvedIconSize === "md" && "h-8 w-8",
                  resolvedIconSize === "lg" && "h-10 w-10"
                )}
              />
            ) : (
              React.createElement(icon, {
                className: cn(
                  resolvedIconSize === "sm" && "h-6 w-6",
                  resolvedIconSize === "md" && "h-8 w-8",
                  resolvedIconSize === "lg" && "h-10 w-10"
                )
              })
            )}
          </div>
        )
      }

      return null
    }

    const renderAction = (actionConfig: NonNullable<typeof action>, isPrimary = true) => {
      const buttonProps = {
        variant: actionConfig.variant || (isPrimary ? "default" : "ghost"),
        onClick: actionConfig.onClick,
        ...(actionConfig.href && { 
          as: "a" as const, 
          href: actionConfig.href 
        })
      }

      return (
        <Button {...buttonProps}>
          {actionConfig.label}
        </Button>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size, fullWidth }), className)}
        {...props}
      >
        {renderIcon()}
        
        <div className="space-y-2">
          <h3 className={cn(
            "font-semibold text-[var(--color-text-primary)]",
            size === "sm" && "text-heading-sm",
            size === "md" && "text-heading-md",
            size === "lg" && "text-heading-lg"
          )}>
            {heading}
          </h3>
          
          {description && (
            <p className={cn(
              "text-[var(--color-text-secondary)]",
              size === "sm" && "text-body-sm",
              size === "md" && "text-body-md",
              size === "lg" && "text-body-lg"
            )}>
              {description}
            </p>
          )}
        </div>

        {children}

        {(action || secondaryAction) && (
          <div className={cn(
            "flex gap-3",
            size === "sm" && "flex-col",
            (size === "md" || size === "lg") && "flex-row"
          )}>
            {action && renderAction(action, true)}
            {secondaryAction && renderAction(secondaryAction, false)}
          </div>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

// Preset empty states for common scenarios
export const EmptyStates = {
  // No data/results
  NoData: ({ title = "No data found", description = "There's no data to display yet.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="database"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // No search results
  NoSearchResults: ({ title = "No results found", description = "Try adjusting your search or filter to find what you're looking for.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="search"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // Empty inbox/messages
  EmptyInbox: ({ title = "Inbox is empty", description = "When you receive messages, they'll appear here.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="inbox"
      iconVariant="primary"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // No items in cart/list
  EmptyCart: ({ title = "Your cart is empty", description = "Add some items to get started.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="shopping-cart"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // No files uploaded
  NoFiles: ({ title = "No files uploaded", description = "Upload your first file to get started.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="upload"
      iconVariant="primary"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // Connection/network error
  ConnectionError: ({ title = "Connection error", description = "Unable to load data. Please check your connection and try again.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="wifi-off"
      iconVariant="error"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // Page not found
  NotFound: ({ title = "Page not found", description = "The page you're looking for doesn't exist or has been moved.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="file-question"
      iconVariant="warning"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // Access denied/unauthorized
  Unauthorized: ({ title = "Access denied", description = "You don't have permission to view this content.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="lock"
      iconVariant="error"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // Under construction/coming soon
  ComingSoon: ({ title = "Coming soon", description = "This feature is currently under development.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="construction"
      iconVariant="warning"
      heading={title}
      description={description}
      {...props}
    />
  ),

  // No notifications
  NoNotifications: ({ title = "No new notifications", description = "You're all caught up! Check back later for updates.", ...props }: Partial<EmptyStateProps>) => (
    <EmptyState
      icon="bell"
      iconVariant="success"
      heading={title}
      description={description}
      {...props}
    />
  ),
}

export type { EmptyStateProps }