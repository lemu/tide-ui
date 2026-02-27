import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icon, IconType, IconSize } from "./icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center relative transition-all duration-150 ease-in-out focus:outline-none cursor-pointer select-none disabled:cursor-not-allowed gap-[var(--space-xs)] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-background-neutral-subtlest)] text-[var(--color-text-primary)]",
          "border border-[var(--color-border-action-outline)]",
          "enabled:hover:bg-[var(--color-background-neutral-subtlest-hovered)] enabled:hover:border-[var(--color-border-action-outline-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--grey-alpha-50)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)] disabled:border-[var(--color-border-action-outline)]",
        ],
        secondary: [
          "bg-[var(--color-background-neutral-subtlest)] text-[var(--color-text-primary)]",
          "border border-[var(--color-border-action-outline)]",
          "enabled:hover:bg-[var(--color-background-neutral-subtlest-hovered)] enabled:hover:border-[var(--color-border-action-outline-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--grey-alpha-50)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)] disabled:border-[var(--color-border-action-outline)]",
        ],
        primary: [
          "bg-[var(--color-background-blue-bold)] [&]:text-[var(--color-text-on-action)]",
          "border-none",
          "enabled:hover:bg-[var(--color-background-blue-bold-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--blue-700)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)]",
        ],
        destructive: [
          "bg-[var(--color-background-error-bold)] [&]:text-[var(--color-text-on-action)]",
          "border-none",
          "enabled:hover:bg-[var(--color-background-error-bold-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--red-700)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)]",
        ],
        success: [
          "bg-[var(--color-background-success-bold)] [&]:text-[var(--color-text-on-action)]",
          "border-none",
          "enabled:hover:bg-[var(--color-background-success-bold-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--green-700)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)]",
        ],
        ghost: [
          "bg-transparent text-[var(--color-text-primary)]",
          "border-none",
          "enabled:hover:bg-[var(--color-background-neutral-hovered)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--grey-alpha-100)] enabled:active:translate-y-px",
          "disabled:bg-[var(--color-background-neutral-subtlest)] disabled:[&]:text-[var(--color-text-disabled)]",
        ],
      },
      size: {
        s: [
          "text-label-sm h-[var(--size-s)] rounded-s px-[var(--space-m)]",
        ],
        m: [
          "text-label-md h-[var(--size-m)] rounded-s px-[var(--space-m)]",
        ],
        l: [
          "text-label-md h-[var(--size-l)] rounded-s px-[var(--space-l)]",
        ],
      },
      iconPosition: {
        none: "",
        left: "",
        right: "",
        only: "",
      },
    },
    compoundVariants: [
      // Icon padding adjustments for different sizes
      {
        size: "s",
        iconPosition: "left",
        className: "pl-[var(--space-s)] pr-[var(--space-m)]",
      },
      {
        size: "s",
        iconPosition: "right",
        className: "pl-[var(--space-m)] pr-[var(--space-s)]",
      },
      {
        size: "s",
        iconPosition: "only",
        className: "px-[var(--space-s)] min-w-[var(--size-s)]",
      },
      {
        size: "m",
        iconPosition: "left",
        className: "pl-[var(--space-s)] pr-[var(--space-m)]",
      },
      {
        size: "m",
        iconPosition: "right",
        className: "pl-[var(--space-m)] pr-[var(--space-s)]",
      },
      {
        size: "m",
        iconPosition: "only",
        className: "px-[var(--space-s)] min-w-[var(--size-m)]",
      },
      {
        size: "l",
        iconPosition: "left",
        className: "pl-[var(--space-m)] pr-[var(--space-l)]",
      },
      {
        size: "l",
        iconPosition: "right",
        className: "pl-[var(--space-l)] pr-[var(--space-m)]",
      },
      {
        size: "l",
        iconPosition: "only",
        className: "px-[var(--space-m)] min-w-[var(--size-l)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "m",
      iconPosition: "none",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconType;
  dropdown?: boolean;
  /** Whether the dropdown is currently open (for accessibility) */
  dropdownOpen?: boolean;
  /** Loading state - shows spinner and disables interaction */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      icon: iconName,
      iconPosition,
      dropdown = false,
      dropdownOpen = false,
      disabled = false,
      loading = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const iconSize: IconSize = size || "m"; // Safe mapping with fallback

    // Determine if button should be disabled (disabled prop or loading state)
    const isDisabled = disabled || loading;

    // Icon color logic: disabled/loading buttons use disabled color, otherwise use variant-appropriate color
    const iconColor = isDisabled
      ? "disabled"
      : variant === "primary" ||
          variant === "destructive" ||
          variant === "success"
        ? "inverse"
        : "primary";

    const renderSpinner = () => {
      if (!loading) return null;
      return <Icon name={Loader2} size={iconSize} color={iconColor} className="animate-spin" />;
    };

    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!iconName) return null;
      return <Icon name={iconName} size={iconSize} color={iconColor} />;
    };

    const renderDropdown = () => {
      if (!dropdown) return null;
      return <Icon name={ChevronDown} size={iconSize} color={iconColor} />;
    };

    const actualIconPosition =
      iconName && children 
        ? iconPosition 
        : iconName || loading 
        ? "only" 
        : loading && children 
        ? "left" 
        : "none";

    // Add accessibility attributes for dropdown buttons
    const dropdownProps = dropdown
      ? {
          "aria-haspopup": "menu" as const,
          "aria-expanded": dropdownOpen,
        }
      : {};

    // Add accessibility attributes for loading state
    const loadingProps = loading
      ? {
          "aria-busy": true,
          "aria-disabled": true,
        }
      : {};

    return (
      <button
        type={type}
        className={cn(
          buttonVariants({
            variant,
            size,
            iconPosition: actualIconPosition,
            className,
          }),
        )}
        ref={ref}
        disabled={isDisabled}
        {...dropdownProps}
        {...loadingProps}
        {...props}
      >
        {actualIconPosition === "left" && renderIcon()}
        {actualIconPosition !== "only" && children}
        {actualIconPosition === "right" && renderIcon()}
        {actualIconPosition === "only" && renderIcon()}
        {dropdown && renderDropdown()}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
