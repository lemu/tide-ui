import * as React from "react"
import { cn } from "../../lib/utils"
import { Icon } from "../fundamental/icon"

// Color mapping for dots
const DOT_COLORS = {
  cyan: "var(--cyan-500)",
  neutral: "var(--grey-400)",
  magenta: "var(--magenta-500)",
  brand: "var(--blue-500)",
  green: "var(--green-500)",
  red: "var(--red-500)",
  orange: "var(--orange-500)",
  violet: "var(--violet-500)",
} as const

// Intent to dot color mapping
const INTENT_TO_COLOR = {
  neutral: "neutral",
  brand: "brand",
  success: "green",
  warning: "orange",
  destructive: "red",
} as const

export type TagDotColor = keyof typeof DOT_COLORS
export type TagIntent = keyof typeof INTENT_TO_COLOR
export type TagVariant = "triangular" | "squared"

// Full tag shape SVG - draws complete outline (notch + body) as single path
// This ensures synchronized hover transitions with no gaps
interface TagShapeProps {
  width: number
  interactive?: boolean
  className?: string
}

const TagShapeMd = ({ width, interactive = false, className }: TagShapeProps) => {
  // Medium: 24px height, 4px border radius on right side
  const height = 24
  const r = 4 // border radius

  // Path uses y coordinates 0.5 to 23.5 (24px span with 0.5px inset for stroke)
  const rightX = width - 0.5
  const d = `
    M 11.8333 0.5
    L ${rightX - r} 0.5
    Q ${rightX} 0.5 ${rightX} ${0.5 + r}
    L ${rightX} ${23.5 - r}
    Q ${rightX} 23.5 ${rightX - r} 23.5
    L 11.8333 23.5
    C 10.7121 23.5 9.64236 23.0294 8.88472 22.2029
    L 1.55138 14.2029
    C 0.149538 12.6736 0.14954 10.3264 1.55138 8.7971
    L 8.88472 0.7971
    C 9.64236 0.5 10.7121 0.5 11.8333 0.5
    Z
  `

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-0 pointer-events-none overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <path
        d={d}
        stroke="var(--grey-100)"
        className={cn(
          "fill-[var(--neutral-white)] transition-[fill]",
          interactive && "group-hover:fill-[var(--grey-25)]"
        )}
      />
    </svg>
  )
}

const TagShapeSm = ({ width, interactive = false, className }: TagShapeProps) => {
  // Small: 20px height, 4px border radius on right side
  const height = 20
  const r = 4 // border radius

  // Path uses y coordinates 0.5 to 19.5 (20px span with 0.5px inset for stroke)
  const rightX = width - 0.5
  const d = `
    M 11.1 0.5
    L ${rightX - r} 0.5
    Q ${rightX} 0.5 ${rightX} ${0.5 + r}
    L ${rightX} ${19.5 - r}
    Q ${rightX} 19.5 ${rightX - r} 19.5
    L 11.1 19.5
    C 10.1049 19.5 9.14559 19.1291 8.40931 18.4598
    L 1.80931 12.4598
    C 0.0635623 10.8727 0.0635653 8.1273 1.80931 6.5402
    L 8.40931 0.5402
    C 9.14559 0.5 10.1049 0.5 11.1 0.5
    Z
  `

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-0 pointer-events-none overflow-visible", className)}
      preserveAspectRatio="none"
    >
      <path
        d={d}
        stroke="var(--grey-100)"
        className={cn(
          "fill-[var(--neutral-white)] transition-[fill]",
          interactive && "group-hover:fill-[var(--grey-25)]"
        )}
      />
    </svg>
  )
}

// Size configurations
const TAG_SIZES = {
  sm: {
    height: 20,
    typography: "[&]:text-label-sm",
    dotSize: "w-1.5 h-1.5",
    dotMargin: "mr-1",
    closeSize: "w-3.5 h-3.5",
    closeMargin: "ml-0.5",
    paddingX: "px-[var(--space-sm)]",
  },
  md: {
    height: 24,
    typography: "[&]:text-label-sm",
    dotSize: "w-2 h-2",
    dotMargin: "mr-1.5",
    closeSize: "w-4 h-4",
    closeMargin: "ml-1",
    paddingX: "px-[var(--space-sm)]",
  },
} as const

type TagSize = keyof typeof TAG_SIZES

// Variant props type for external use
type TagVariantProps = {
  size?: TagSize
}

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "color">,
    TagVariantProps {
  children: React.ReactNode
  variant?: TagVariant
  intent?: TagIntent
  color?: TagDotColor
  showDot?: boolean
  closable?: boolean
  onClose?: () => void
  disabled?: boolean
  onClick?: () => void
  interactive?: boolean
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      className,
      size = "md",
      variant = "triangular",
      children,
      intent,
      color,
      showDot,
      closable = false,
      onClose,
      disabled = false,
      onClick,
      interactive = false,
      style,
      ...props
    },
    ref
  ) => {
    const [contentWidth, setContentWidth] = React.useState(0)
    const contentRef = React.useRef<HTMLDivElement>(null)

    const sizeConfig = TAG_SIZES[size]
    const isTriangular = variant === "triangular"

    // Measure content width to size the SVG (use border box, not content box)
    // Only needed for triangular variant
    React.useEffect(() => {
      if (!isTriangular) return
      if (contentRef.current) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            // Use borderBoxSize for full width including padding
            const borderBoxWidth = entry.borderBoxSize?.[0]?.inlineSize
              ?? entry.target.getBoundingClientRect().width
            setContentWidth(borderBoxWidth)
          }
        })
        observer.observe(contentRef.current)
        return () => observer.disconnect()
      }
    }, [isTriangular])

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        handleClick()
      }
    }

    const effectiveColor = color || (intent ? INTENT_TO_COLOR[intent] : undefined)
    const dotColor = effectiveColor ? DOT_COLORS[effectiveColor] : undefined
    const shouldShowDot = showDot ?? (effectiveColor !== undefined)

    const ShapeComponent = size === "sm" ? TagShapeSm : TagShapeMd

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex group",
          interactive && "cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1",
          className
        )}
        style={{ height: `${sizeConfig.height}px`, ...style }}
        onClick={interactive ? handleClick : undefined}
        role={interactive ? "button" : undefined}
        tabIndex={interactive && !disabled ? 0 : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...props}
      >
        {/* Full tag shape SVG - handles fill and stroke for entire tag (triangular only) */}
        {isTriangular && contentWidth > 0 && (
          <ShapeComponent
            width={contentWidth}
            interactive={interactive}
          />
        )}

        {/* Content layer */}
        <div
          ref={isTriangular ? contentRef : undefined}
          className={cn(
            "relative z-10 inline-flex items-center",
            sizeConfig.typography,
            sizeConfig.paddingX,
            "text-[var(--color-text-primary)]",
            isTriangular && "pl-[12px]", // notch width clearance
            !isTriangular && [
              "border border-[var(--grey-100)] rounded-md",
              "bg-[var(--neutral-white)]",
              interactive && "group-hover:bg-[var(--grey-25)]",
              "transition-[background-color]",
            ]
          )}
        >
          {shouldShowDot && dotColor && (
            <span
              className={cn(
                "rounded-full shrink-0",
                sizeConfig.dotSize,
                sizeConfig.dotMargin
              )}
              style={{ backgroundColor: dotColor }}
              aria-hidden="true"
            />
          )}

          <span className="truncate">{children}</span>

          {closable && (
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center shrink-0 hover:bg-[var(--grey-alpha-50)] rounded-xsm transition-colors",
                sizeConfig.closeMargin,
                sizeConfig.closeSize
              )}
              onClick={handleClose}
              disabled={disabled}
              aria-label="Remove tag"
            >
              <Icon
                name="x"
                size="sm"
                color={disabled ? "disabled" : "secondary"}
              />
            </button>
          )}
        </div>
      </div>
    )
  }
)
Tag.displayName = "Tag"

// Tag group component
export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: Array<{
    id: string
    label: string
    intent?: TagIntent
    color?: TagDotColor
    disabled?: boolean
  }>
  onTagRemove?: (tagId: string) => void
  onTagClick?: (tagId: string) => void
  closable?: boolean
  interactive?: boolean
  size?: TagProps["size"]
  variant?: TagVariant
  intent?: TagIntent
  color?: TagDotColor
  showDot?: boolean
  maxVisible?: number
}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      className,
      tags,
      onTagRemove,
      onTagClick,
      closable = false,
      interactive = false,
      size = "md",
      variant,
      intent,
      color,
      showDot,
      maxVisible,
      ...props
    },
    ref
  ) => {
    const [showAll, setShowAll] = React.useState(false)

    const visibleTags =
      maxVisible && !showAll ? tags.slice(0, maxVisible) : tags

    const hiddenCount =
      maxVisible && !showAll ? tags.length - maxVisible : 0

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-[var(--space-sm)]", className)}
        {...props}
      >
        {visibleTags.map((tag) => (
          <Tag
            key={tag.id}
            intent={tag.intent || intent}
            color={tag.color || color}
            size={size}
            variant={variant}
            closable={closable}
            interactive={interactive}
            disabled={tag.disabled}
            showDot={showDot}
            onClose={onTagRemove ? () => onTagRemove(tag.id) : undefined}
            onClick={onTagClick ? () => onTagClick(tag.id) : undefined}
          >
            {tag.label}
          </Tag>
        ))}

        {hiddenCount > 0 && (
          <Tag size={size} variant={variant} interactive onClick={() => setShowAll(true)}>
            +{hiddenCount} more
          </Tag>
        )}

        {showAll && maxVisible && (
          <Tag size={size} variant={variant} interactive onClick={() => setShowAll(false)}>
            Show less
          </Tag>
        )}
      </div>
    )
  }
)
TagGroup.displayName = "TagGroup"

export { Tag, TagGroup }
