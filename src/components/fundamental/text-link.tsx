import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Icon, IconType } from "./icon";

const textLinkVariants = cva(
  "inline-flex items-center gap-[var(--space-xs)] min-w-0 max-w-full transition-colors underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focused)] focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        s: "[&]:text-body-sm",
        m: "[&]:text-body-md",
        l: "[&]:text-body-lg",
      },
      variant: {
        default:
          "text-[var(--color-text-action-brand-bold)] hover:text-[var(--color-text-action-brand-bold-hovered)]",
        subtle:
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
      },
    },
    defaultVariants: {
      size: "m",
      variant: "default",
    },
  },
);

export interface TextLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof textLinkVariants> {
  /** Icon to display alongside the link text */
  icon?: IconType;
  /** Position of the icon relative to text */
  iconPosition?: "left" | "right";
  /** Disabled state */
  disabled?: boolean;
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    {
      className,
      size = "m",
      variant = "default",
      icon,
      iconPosition = "right",
      disabled = false,
      children,
      target,
      rel,
      onClick,
      ...props
    },
    ref,
  ) => {
    // Map text size to icon size
    const iconSize = React.useMemo(() => {
      switch (size) {
        case "s":
          return "s" as const;
        case "m":
          return "s" as const;
        case "l":
          return "m" as const;
        default:
          return "s" as const;
      }
    }, [size]);

    // Auto-add security attributes for external links
    const linkRel = React.useMemo(() => {
      if (target === "_blank") {
        return rel ? `${rel} noopener noreferrer` : "noopener noreferrer";
      }
      return rel;
    }, [target, rel]);

    // Handle disabled click events
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      },
      [disabled, onClick],
    );

    const iconColor = React.useMemo(() => {
      if (disabled) return "disabled" as const;
      if (variant === "subtle") return "secondary" as const;
      return "brand" as const;
    }, [disabled, variant]);

    return (
      <a
        ref={ref}
        className={cn(
          textLinkVariants({ size, variant, className }),
          disabled && "cursor-not-allowed text-[var(--color-text-disabled)] no-underline hover:no-underline hover:text-[var(--color-text-disabled)]",
        )}
        target={target}
        rel={linkRel}
        onClick={handleClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            aria-hidden="true"
            className="flex-shrink-0"
          />
        )}
        <span className="min-w-0 truncate">{children}</span>
        {icon && iconPosition === "right" && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            aria-hidden="true"
            className="flex-shrink-0"
          />
        )}
      </a>
    );
  },
);

TextLink.displayName = "TextLink";

export { TextLink, textLinkVariants };
