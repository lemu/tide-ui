import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, IconType, IconSize } from "./icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center relative transition-all duration-150 ease-in-out focus:outline-none cursor-pointer select-none disabled:cursor-not-allowed gap-[var(--space-xsm)] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-background-neutral-subtle)] text-[var(--color-text-primary)]",
          "border border-[var(--color-border-action-outline)]",
          "enabled:hover:bg-[var(--color-background-neutral-subtle-hovered)] enabled:hover:border-[var(--color-border-action-hovered)] enabled:hover:shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--grey-alpha-50)] enabled:active:translate-y-px enabled:active:shadow-xs",
          "disabled:bg-[var(--color-background-disabled)] disabled:[&]:text-[var(--color-text-disabled)] disabled:border-[var(--color-border-action-outline)]",
        ],
        primary: [
          "bg-[var(--color-background-brand)] [&]:text-[var(--color-text-on-action)]",
          "border-none",
          "enabled:hover:bg-[var(--color-background-brand-hovered)] enabled:hover:shadow-sm",
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
          "focus:bg-[var(--color-background-neutral-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2",
          "enabled:active:bg-[var(--grey-alpha-100)] enabled:active:translate-y-px",
          "disabled:bg-[var(--color-background-neutral-subtle)] disabled:[&]:text-[var(--color-text-disabled)]",
        ],
      },
      size: {
        sm: [
          "text-label-sm h-[var(--size-sm)] rounded-sm px-[var(--space-md)]",
        ],
        md: [
          "text-label-md h-[var(--size-md)] rounded-sm px-[var(--space-md)]",
        ],
        lg: [
          "text-label-md h-[var(--size-lg)] rounded-sm px-[var(--space-lg)]",
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
        size: "sm",
        iconPosition: "left",
        className: "pl-[var(--space-sm)] pr-[var(--space-md)]",
      },
      {
        size: "sm",
        iconPosition: "right",
        className: "pl-[var(--space-md)] pr-[var(--space-sm)]",
      },
      {
        size: "sm",
        iconPosition: "only",
        className: "px-[var(--space-sm)]",
      },
      {
        size: "md",
        iconPosition: "left",
        className: "pl-[var(--space-sm)] pr-[var(--space-md)]",
      },
      {
        size: "md",
        iconPosition: "right",
        className: "pl-[var(--space-md)] pr-[var(--space-sm)]",
      },
      {
        size: "md",
        iconPosition: "only",
        className: "px-[var(--space-sm)]",
      },
      {
        size: "lg",
        iconPosition: "left",
        className: "pl-[var(--space-md)] pr-[var(--space-lg)]",
      },
      {
        size: "lg",
        iconPosition: "right",
        className: "pl-[var(--space-lg)] pr-[var(--space-md)]",
      },
      {
        size: "lg",
        iconPosition: "only",
        className: "px-[var(--space-md)]",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
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
    const iconSize: IconSize = size || "md"; // Safe mapping with fallback

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
      return <Icon name="loader-2" size={iconSize} color={iconColor} className="animate-spin" />;
    };

    const renderIcon = () => {
      if (loading) return renderSpinner();
      if (!iconName) return null;
      return <Icon name={iconName} size={iconSize} color={iconColor} />;
    };

    const renderDropdown = () => {
      if (!dropdown) return null;
      return <Icon name="chevron-down" size={iconSize} color={iconColor} />;
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
