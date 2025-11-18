import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Button } from "../fundamental/button"
import { Icon } from "../fundamental/icon"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-[var(--space-sm)] py-[var(--space-xsm)] text-caption-medium-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1",
  {
    variants: {
      intent: {
        neutral: "",
        brand: "",
        success: "",
        warning: "",
        destructive: "",
      },
      appearance: {
        solid: "border-transparent",
        subtle: "border-transparent",
      },
      size: {
        sm: "px-[var(--space-xsm)] h-5 [&]:text-body-strong-xsm",
        md: "px-[var(--space-sm)] h-6 [&]:text-body-strong-sm",
        lg: "px-[var(--space-md)] h-7 [&]:text-body-strong-md",
      },
      closable: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Neutral intent variants
      {
        intent: "neutral",
        appearance: "solid",
        class:
          "bg-[var(--grey-600)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "neutral",
        appearance: "subtle",
        class:
          "bg-[var(--grey-100)] text-[var(--color-text-primary)]",
      },
      // Brand intent variants
      {
        intent: "brand",
        appearance: "solid",
        class:
          "bg-[var(--color-background-brand)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "brand",
        appearance: "subtle",
        class:
          "bg-[var(--blue-50)] text-[var(--color-text-brand)]",
      },
      // Success intent variants
      {
        intent: "success",
        appearance: "solid",
        class:
          "bg-[var(--color-background-success-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "success",
        appearance: "subtle",
        class:
          "bg-[var(--color-background-success)] text-[var(--color-text-success)]",
      },
      // Warning intent variants
      {
        intent: "warning",
        appearance: "solid",
        class:
          "bg-[var(--color-background-warning-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "warning",
        appearance: "subtle",
        class:
          "bg-[var(--color-background-warning)] text-[var(--color-text-warning)]",
      },
      // Destructive intent variants
      {
        intent: "destructive",
        appearance: "solid",
        class:
          "bg-[var(--color-background-error-bold)] text-[var(--color-text-inverse)]",
      },
      {
        intent: "destructive",
        appearance: "subtle",
        class:
          "bg-[var(--color-background-error)] text-[var(--color-text-error)]",
      },
      // Closable padding adjustments
      {
        closable: true,
        size: "sm",
        class: "pr-1",
      },
      {
        closable: true,
        size: "md",
        class: "pr-1",
      },
      {
        closable: true,
        size: "lg", 
        class: "pr-1",
      },
    ],
    defaultVariants: {
      intent: "neutral",
      appearance: "subtle",
      size: "md",
      closable: false,
    },
  },
)

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof tagVariants> {
  /**
   * Content of the tag
   */
  children: React.ReactNode
  /**
   * Whether the tag can be closed/removed
   */
  closable?: boolean
  /**
   * Callback when the close button is clicked
   */
  onClose?: () => void
  /**
   * Whether the tag is disabled
   */
  disabled?: boolean
  /**
   * Callback when the tag itself is clicked (not the close button)
   */
  onClick?: () => void
  /**
   * Whether the tag is clickable/interactive
   */
  interactive?: boolean
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ 
    className, 
    intent, 
    appearance, 
    size, 
    children,
    closable = false,
    onClose,
    disabled = false,
    onClick,
    interactive = false,
    ...props 
  }, ref) => {
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (!disabled) {
        onClose?.()
      }
    }

    const handleClick = () => {
      if (!disabled && interactive && onClick) {
        onClick()
      }
    }

    const closeButtonSize = size === "sm" ? "sm" : size === "lg" ? "md" : "sm"
    
    // Determine close button color based on appearance and intent
    const closeButtonColor = appearance === "solid" 
      ? "inverse" 
      : intent === "brand" 
        ? "brand"
        : intent === "success"
          ? "success" 
          : intent === "warning"
            ? "warning"
            : intent === "destructive"
              ? "error"
              : "primary"

    return (
      <div
        ref={ref}
        className={cn(
          tagVariants({ intent, appearance, size, closable }),
          interactive && "cursor-pointer hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={interactive ? handleClick : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        onKeyDown={interactive ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleClick()
          }
        } : undefined}
        {...props}
      >
        <span className="truncate">{children}</span>
        {closable && (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-auto p-0 min-w-0 hover:bg-transparent",
              size === "sm" && "ml-1",
              size === "md" && "ml-1",
              size === "lg" && "ml-1.5"
            )}
            onClick={handleClose}
            disabled={disabled}
            aria-label="Remove tag"
          >
            <Icon 
              name="x" 
              size={closeButtonSize} 
              color={disabled ? "disabled" : closeButtonColor}
            />
          </Button>
        )}
      </div>
    )
  }
)
Tag.displayName = "Tag"

// Tag group component for managing multiple tags
export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of tag data
   */
  tags: Array<{
    id: string
    label: string
    intent?: TagProps["intent"]
    appearance?: TagProps["appearance"]
    disabled?: boolean
  }>
  /**
   * Callback when a tag is removed
   */
  onTagRemove?: (tagId: string) => void
  /**
   * Callback when a tag is clicked
   */
  onTagClick?: (tagId: string) => void
  /**
   * Whether tags are closable by default
   */
  closable?: boolean
  /**
   * Whether tags are interactive by default
   */
  interactive?: boolean
  /**
   * Default size for all tags
   */
  size?: TagProps["size"]
  /**
   * Default intent for all tags
   */
  intent?: TagProps["intent"]
  /**
   * Default appearance for all tags
   */
  appearance?: TagProps["appearance"]
  /**
   * Maximum number of tags to show before collapsing
   */
  maxVisible?: number
}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({
    className,
    tags,
    onTagRemove,
    onTagClick,
    closable = false,
    interactive = false,
    size = "md",
    intent = "neutral",
    appearance = "subtle",
    maxVisible,
    ...props
  }, ref) => {
    const [showAll, setShowAll] = React.useState(false)
    
    const visibleTags = maxVisible && !showAll 
      ? tags.slice(0, maxVisible)
      : tags
    
    const hiddenCount = maxVisible && !showAll 
      ? tags.length - maxVisible 
      : 0

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-1", className)}
        {...props}
      >
        {visibleTags.map((tag) => (
          <Tag
            key={tag.id}
            intent={tag.intent || intent}
            appearance={tag.appearance || appearance}
            size={size}
            closable={closable}
            interactive={interactive}
            disabled={tag.disabled}
            onClose={onTagRemove ? () => onTagRemove(tag.id) : undefined}
            onClick={onTagClick ? () => onTagClick(tag.id) : undefined}
          >
            {tag.label}
          </Tag>
        ))}
        
        {hiddenCount > 0 && (
          <Tag
            intent="neutral"
            appearance="subtle"
            size={size}
            interactive
            onClick={() => setShowAll(true)}
          >
            +{hiddenCount} more
          </Tag>
        )}
        
        {showAll && maxVisible && (
          <Tag
            intent="neutral" 
            appearance="subtle"
            size={size}
            interactive
            onClick={() => setShowAll(false)}
          >
            Show less
          </Tag>
        )}
      </div>
    )
  }
)
TagGroup.displayName = "TagGroup"

export { Tag, TagGroup, tagVariants }
