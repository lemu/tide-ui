import React from "react";
import {
  CircleArrowDown,
  CircleArrowUp,
  CircleHelp,
  CircleMinus,
  CirclePlus,
  CircleSlash,
  ClockAlert,
  SquareChartGantt,
  SquareCheck,
  SquareMinus,
  SquareSlash,
  SquareX,
} from "lucide-react";
import {
  CircleCheck2,
  CircleDashedArrowDown,
  CircleDashedArrowUp,
  CircleDiamond,
  CircleDot2,
  HexagonAsterisk,
  HexagonDashed,
  HexagonMinus,
  SquareCornerCheck,
  SquareCornerPlus,
  SquareDashedChartGantt,
  SquareDashedCornerPlus,
  SquareDiamond,
} from "../fundamental/custom-icons";
import { Icon, IconColor, IconComponent } from "../fundamental/icon";
import { Badge } from "../fundamental/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../fundamental/tooltip";

// Status configuration with combined object-status keys
type StatusConfig = {
  icon: IconComponent;
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
  "order-draft": { icon: HexagonDashed, color: "tertiary", objectLabel: "Order", statusLabel: "Draft" },
  "order-distributed": { icon: HexagonAsterisk, color: "information", objectLabel: "Order", statusLabel: "Distributed" },
  "order-withdrawn": { icon: HexagonMinus, color: "error", objectLabel: "Order", statusLabel: "Withdrawn" },

  // Negotiation statuses
  "negotiation-indicative-offer": { icon: CircleDashedArrowDown, color: "information", objectLabel: "Negotiation", statusLabel: "Indicative offer" },
  "negotiation-indicative-bid": { icon: CircleDashedArrowUp, color: "information", objectLabel: "Negotiation", statusLabel: "Indicative bid" },
  "negotiation-firm-offer": { icon: CircleArrowDown, color: "information", objectLabel: "Negotiation", statusLabel: "Firm offer" },
  "negotiation-firm-bid": { icon: CircleArrowUp, color: "information", objectLabel: "Negotiation", statusLabel: "Firm bid" },
  "negotiation-firm": { icon: CircleDot2, color: "violet", objectLabel: "Negotiation", statusLabel: "Firm" },
  "negotiation-on-subs": { icon: CircleDiamond, color: "warning", objectLabel: "Negotiation", statusLabel: "On subs" },
  "negotiation-fixed": { icon: CircleCheck2, color: "success", objectLabel: "Negotiation", statusLabel: "Fixed" },
  "negotiation-firm-offer-expired": { icon: ClockAlert, color: "error", objectLabel: "Negotiation", statusLabel: "(Firm offer) Expired" },
  "negotiation-withdrawn": { icon: CircleMinus, color: "error", objectLabel: "Negotiation", statusLabel: "Withdrawn" },
  "negotiation-firm-amendment": { icon: CirclePlus, color: "violet", objectLabel: "Negotiation", statusLabel: "Firm (Amendment)" },
  "negotiation-subs-expired": { icon: ClockAlert, color: "error", objectLabel: "Negotiation", statusLabel: "Subs expired" },
  "negotiation-subs-failed": { icon: CircleSlash, color: "error", objectLabel: "Negotiation", statusLabel: "Subs failed" },
  "negotiation-on-subs-amendment": { icon: CirclePlus, color: "warning", objectLabel: "Negotiation", statusLabel: "On subs (amendment)" },

  // Contract statuses
  "contract-draft": { icon: SquareDashedChartGantt, color: "tertiary", objectLabel: "Contract", statusLabel: "Draft" },
  "contract-working-copy": { icon: SquareChartGantt, color: "information", objectLabel: "Contract", statusLabel: "Working copy" },
  "contract-final": { icon: SquareCheck, color: "success", objectLabel: "Contract", statusLabel: "Final" },
  "contract-rejected": { icon: SquareX, color: "error", objectLabel: "Contract", statusLabel: "Rejected" },

  // Addenda statuses
  "addenda-draft": { icon: SquareDashedCornerPlus, color: "tertiary", objectLabel: "Addenda", statusLabel: "Draft" },
  "addenda-working-copy": { icon: SquareCornerPlus, color: "information", objectLabel: "Addenda", statusLabel: "Working copy" },
  "addenda-final": { icon: SquareCornerCheck, color: "success", objectLabel: "Addenda", statusLabel: "Final" },

  // Recap Manager statuses
  "recap-manager-draft": { icon: SquareDashedChartGantt, color: "tertiary", objectLabel: "Recap manager", statusLabel: "Draft" },
  "recap-manager-on-subs": { icon: SquareDiamond, color: "warning", objectLabel: "Recap manager", statusLabel: "On subs" },
  "recap-manager-fully-fixed": { icon: SquareCheck, color: "success", objectLabel: "Recap manager", statusLabel: "Fully fixed" },
  "recap-manager-canceled": { icon: SquareMinus, color: "error", objectLabel: "Recap manager", statusLabel: "Canceled" },
  "recap-manager-failed": { icon: SquareSlash, color: "error", objectLabel: "Recap manager", statusLabel: "Failed" },
};

// Size configuration
const textSizeClasses = {
  xs: "text-body-medium-xsm",
  s: "text-body-medium-sm",
  m: "text-body-medium-md",
  l: "text-body-medium-lg",
} as const;

const iconSizeMapping = {
  xs: "s",
  s: "s",
  m: "m",
  l: "l",
} as const;

// Size-specific vertical alignment adjustments for icon
const iconTranslateClasses = {
  xs: "translate-y-[0.5px]",
  s: "translate-y-[0px]",
  m: "translate-y-[0.5px]",
  l: "translate-y-[0.5px]",
} as const;

// Size-specific gap between icon and label
const gapClasses = {
  xs: "gap-[var(--space-xs)]",
  s: "gap-[var(--space-xs)]",
  m: "gap-[var(--space-s)]",
  l: "gap-[var(--space-s)]",
} as const;

// Color mapping for text to match icon colors
const textColorClasses: Partial<Record<IconColor, string>> = {
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  tertiary: "text-[var(--color-text-tertiary)]",
  brand: "text-[var(--color-text-brand-bold)]",
  information: "text-[var(--color-text-info-bold)]",
  success: "text-[var(--color-text-success-bold)]",
  warning: "text-[var(--color-text-warning-bold)]",
  error: "text-[var(--color-text-error-bold)]",
  violet: "text-[var(--violet-500)]",
};

// Map IconColor to Badge intent
type BadgeIntent = "neutral" | "brand" | "success" | "warning" | "destructive" | "information" | "violet";
const colorToIntent: Partial<Record<IconColor, BadgeIntent>> = {
  primary: "neutral",
  secondary: "neutral",
  tertiary: "neutral",
  brand: "brand",
  information: "information",
  success: "success",
  warning: "warning",
  error: "destructive",
  violet: "violet",
};

// Size mapping for Badge component
const badgeSizeMapping = {
  xs: "xs",
  s: "s",
  m: "m",
  l: "l",
} as const;

type StatusSize = keyof typeof textSizeClasses;

export interface FixtureStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The status value (e.g., "order-draft", "negotiation-firm-offer") */
  value: StatusValue;
  /** Size variant */
  size?: StatusSize;
  /** Whether to show the object prefix in the label (e.g., "Order • Draft" vs "Draft") */
  showObject?: boolean;
  /** Whether to show only the icon with a tooltip (default: false) */
  iconOnly?: boolean;
  /** Whether to display labels in lowercase (useful for mid-sentence usage) */
  lowercase?: boolean;
  /** Whether to render as a subtle badge (default: false) */
  asBadge?: boolean;
}

const FixtureStatus = React.forwardRef<HTMLDivElement, FixtureStatusProps>(
  (
    {
      value,
      size = "s",
      showObject = false,
      iconOnly = false,
      lowercase = false,
      asBadge = false,
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
            "inline-flex items-center p-0.5",
            gapClasses[size],
            textSizeClasses[size],
            className,
          )}
          {...props}
        >
          <span className={cn("flex-shrink-0", iconTranslateClasses[size])}>
            <Icon name={CircleHelp} size={iconSizeMapping[size]} color="secondary" />
          </span>
          <span className={textColorClasses.secondary}>
            Unknown status
          </span>
        </div>
      );
    }

    // Build the label text
    const objectLabel = lowercase ? config.objectLabel.toLowerCase() : config.objectLabel;
    const statusLabel = lowercase ? config.statusLabel.toLowerCase() : config.statusLabel;
    const labelText = showObject
      ? `${objectLabel} • ${statusLabel}`
      : statusLabel;

    // Badge mode
    if (asBadge) {
      // Tertiary color (draft statuses) needs secondary color for better contrast on neutral badge background
      const isTertiaryColor = config.color === "tertiary";
      const badgeIconColor = isTertiaryColor ? "secondary" : config.color;
      return (
        <Badge
          ref={ref}
          appearance="subtle"
          intent={colorToIntent[config.color] ?? "neutral"}
          size={badgeSizeMapping[size]}
          icon={<Icon name={config.icon} size={iconSizeMapping[size]} color={badgeIconColor} />}
          className={cn(isTertiaryColor && "text-[var(--color-text-secondary)]", className)}
          {...props}
        >
          {labelText}
        </Badge>
      );
    }

    // Icon-only mode with tooltip
    if (iconOnly) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                ref={ref}
                className={cn("inline-flex p-0.5", className)}
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
          "inline-flex items-center p-0.5",
          gapClasses[size],
          textSizeClasses[size],
          className,
        )}
        {...props}
      >
        <span className={cn("flex-shrink-0", iconTranslateClasses[size])}>
          <Icon name={config.icon} size={iconSizeMapping[size]} color={config.color} />
        </span>
        <span className={textColorClasses[config.color]}>
          {labelText}
        </span>
      </div>
    );
  },
);

FixtureStatus.displayName = "FixtureStatus";

export { FixtureStatus, statusConfig };
export type { StatusConfig };
