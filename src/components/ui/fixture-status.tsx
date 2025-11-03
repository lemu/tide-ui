import React from "react";
import { Icon, IconColor } from "./icon";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

// Status configuration with combined object-status keys
type StatusConfig = {
  icon: string;
  color: IconColor;
  objectLabel: string;
  statusLabel: string;
};

// All valid status values
export type StatusValue =
  // Order statuses
  | "order-draft"
  | "order-distributed"
  | "order-withdrawn"
  // Negotiation statuses
  | "negotiation-indicative-offer"
  | "negotiation-indicative-bid"
  | "negotiation-firm-offer"
  | "negotiation-firm-bid"
  | "negotiation-firm"
  | "negotiation-on-subs"
  | "negotiation-fixed"
  | "negotiation-firm-offer-expired"
  | "negotiation-withdrawn"
  | "negotiation-firm-amendment"
  | "negotiation-subs-expired"
  | "negotiation-subs-failed"
  | "negotiation-on-subs-amendment"
  // Contract statuses
  | "contract-draft"
  | "contract-working-copy"
  | "contract-final"
  | "contract-rejected"
  // Addenda statuses
  | "addenda-draft"
  | "addenda-working-copy"
  | "addenda-final"
  // Recap Manager statuses
  | "recap-manager-draft"
  | "recap-manager-on-subs"
  | "recap-manager-fully-fixed"
  | "recap-manager-canceled"
  | "recap-manager-failed";

// Comprehensive status mapping based on Figma design
const statusConfig: Record<StatusValue, StatusConfig> = {
  // Order statuses
  "order-draft": { icon: "order-draft", color: "tertiary", objectLabel: "Order", statusLabel: "Draft" },
  "order-distributed": { icon: "order-distributed", color: "information", objectLabel: "Order", statusLabel: "Distributed" },
  "order-withdrawn": { icon: "order-withdrawn", color: "error", objectLabel: "Order", statusLabel: "Withdrawn" },

  // Negotiation statuses
  "negotiation-indicative-offer": { icon: "negotiation-indicative-offer", color: "information", objectLabel: "Negotiation", statusLabel: "Indicative offer" },
  "negotiation-indicative-bid": { icon: "negotiation-indicative-bid", color: "information", objectLabel: "Negotiation", statusLabel: "Indicative bid" },
  "negotiation-firm-offer": { icon: "negotiation-firm-offer", color: "information", objectLabel: "Negotiation", statusLabel: "Firm offer" },
  "negotiation-firm-bid": { icon: "negotiation-firm-bid", color: "information", objectLabel: "Negotiation", statusLabel: "Firm bid" },
  "negotiation-firm": { icon: "negotiation-firm", color: "violet", objectLabel: "Negotiation", statusLabel: "Firm" },
  "negotiation-on-subs": { icon: "on-subs", color: "warning", objectLabel: "Negotiation", statusLabel: "On Subs" },
  "negotiation-fixed": { icon: "negotiation-fixed", color: "success", objectLabel: "Negotiation", statusLabel: "Fixed" },
  "negotiation-firm-offer-expired": { icon: "negotiation-expired", color: "error", objectLabel: "Negotiation", statusLabel: "(Firm offer) Expired" },
  "negotiation-withdrawn": { icon: "negotiation-withdrawn", color: "error", objectLabel: "Negotiation", statusLabel: "Withdrawn" },
  "negotiation-firm-amendment": { icon: "negotiation-on-subs-amendment", color: "violet", objectLabel: "Negotiation", statusLabel: "Firm (Amendment)" },
  "negotiation-subs-expired": { icon: "negotiation-expired", color: "error", objectLabel: "Negotiation", statusLabel: "Subs expired" },
  "negotiation-subs-failed": { icon: "negotiation-subs-failed", color: "error", objectLabel: "Negotiation", statusLabel: "Subs failed" },
  "negotiation-on-subs-amendment": { icon: "negotiation-on-subs-amendment", color: "warning", objectLabel: "Negotiation", statusLabel: "On Subs (Amendment)" },

  // Contract statuses
  "contract-draft": { icon: "contract-draft", color: "tertiary", objectLabel: "Contract", statusLabel: "Draft" },
  "contract-working-copy": { icon: "contract-working-copy", color: "information", objectLabel: "Contract", statusLabel: "Working copy" },
  "contract-final": { icon: "contract-final", color: "success", objectLabel: "Contract", statusLabel: "Final" },
  "contract-rejected": { icon: "contract-rejected", color: "error", objectLabel: "Contract", statusLabel: "Rejected" },

  // Addenda statuses
  "addenda-draft": { icon: "addenda-draft", color: "tertiary", objectLabel: "Addenda", statusLabel: "Draft" },
  "addenda-working-copy": { icon: "addenda-working-copy", color: "information", objectLabel: "Addenda", statusLabel: "Working copy" },
  "addenda-final": { icon: "addenda-final", color: "success", objectLabel: "Addenda", statusLabel: "Final" },

  // Recap Manager statuses
  "recap-manager-draft": { icon: "contract-draft", color: "tertiary", objectLabel: "Recap manager", statusLabel: "Draft" },
  "recap-manager-on-subs": { icon: "contract-on-subs", color: "warning", objectLabel: "Recap manager", statusLabel: "On Subs" },
  "recap-manager-fully-fixed": { icon: "contract-final", color: "success", objectLabel: "Recap manager", statusLabel: "Fully Fixed" },
  "recap-manager-canceled": { icon: "contract-canceled", color: "error", objectLabel: "Recap manager", statusLabel: "Canceled" },
  "recap-manager-failed": { icon: "contract-failed", color: "error", objectLabel: "Recap manager", statusLabel: "Failed" },
};

// Size configuration
const textSizeClasses = {
  sm: "text-body-medium-sm",
  md: "text-body-medium-md",
  lg: "text-body-medium-lg",
} as const;

const iconSizeMapping = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

// Size-specific vertical alignment adjustments
const iconTranslateClasses = {
  sm: "",
  md: "translate-y-[0.5px]",
  lg: "translate-y-[1px]",
} as const;

// Size-specific gap between icon and label
const gapClasses = {
  sm: "gap-[var(--space-xsm)]",
  md: "gap-[var(--space-sm)]",
  lg: "gap-[var(--space-sm)]",
} as const;

// Color mapping for text to match icon colors
const textColorClasses: Partial<Record<IconColor, string>> = {
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  tertiary: "text-[var(--color-text-tertiary)]",
  brand: "text-[var(--color-text-brand)]",
  information: "text-[var(--color-text-information)]",
  success: "text-[var(--color-text-success)]",
  warning: "text-[var(--color-text-warning)]",
  error: "text-[var(--color-text-error)]",
  violet: "text-[var(--violet-500)]",
};

type StatusSize = keyof typeof textSizeClasses;

export interface FixtureStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The status value (e.g., "order-draft", "negotiation-firm-offer") */
  value: StatusValue;
  /** Size variant */
  size?: StatusSize;
  /** Whether to show the object prefix in the label (e.g., "Order • Draft" vs "Draft") */
  showObject?: boolean;
  /** Whether the label color should match the icon color (default: true) */
  coloredLabel?: boolean;
  /** Whether to show only the icon with a tooltip (default: false) */
  iconOnly?: boolean;
}

const FixtureStatus = React.forwardRef<HTMLDivElement, FixtureStatusProps>(
  (
    {
      value,
      size = "sm",
      showObject = false,
      coloredLabel = true,
      iconOnly = false,
      className,
      ...props
    },
    ref,
  ) => {
    // Get status configuration
    const config = statusConfig[value];

    // Fallback for unknown status
    if (!config) {
      console.warn(
        `Unknown status "${value}". Available statuses:`,
        Object.keys(statusConfig),
      );
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center leading-none px-1",
            gapClasses[size],
            textSizeClasses[size],
            className,
          )}
          {...props}
        >
          <span className={iconTranslateClasses[size]}>
            <Icon name="circle-help" size={iconSizeMapping[size]} color="secondary" />
          </span>
          <span className={cn(
            "leading-normal",
            coloredLabel ? textColorClasses.secondary : textColorClasses.primary
          )}>
            Unknown status
          </span>
        </div>
      );
    }

    // Build the label text
    const labelText = showObject
      ? `${config.objectLabel} • ${config.statusLabel}`
      : config.statusLabel;

    // Icon-only mode with tooltip
    if (iconOnly) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={ref}
                className={cn("inline-flex px-1", className)}
                {...props}
              >
                <Icon
                  name={config.icon}
                  size={iconSizeMapping[size]}
                  color={config.color}
                  aria-label={labelText}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {labelText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center leading-none px-1",
          gapClasses[size],
          textSizeClasses[size],
          className,
        )}
        {...props}
      >
        <span className={iconTranslateClasses[size]}>
          <Icon name={config.icon} size={iconSizeMapping[size]} color={config.color} />
        </span>
        <span className={cn(
          "leading-normal",
          coloredLabel ? textColorClasses[config.color] : textColorClasses.primary
        )}>
          {labelText}
        </span>
      </div>
    );
  },
);

FixtureStatus.displayName = "FixtureStatus";

export { FixtureStatus, statusConfig };
export type { StatusConfig };
