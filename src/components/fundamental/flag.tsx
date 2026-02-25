import { cn } from "@/lib/utils";

// Flag size variants matching Icon component sizes
export const flagSizes = {
  s: {
    width: "w-[var(--size-3xs)]", // 12px
    height: "h-[9px]", // 12 * 0.75 = 9px for 4:3 aspect ratio
  },
  m: {
    width: "w-[var(--size-2xs)]", // 16px
    height: "h-[12px]", // 16 * 0.75 = 12px for 4:3 aspect ratio
  },
  l: {
    width: "w-[var(--size-xs)]", // 20px
    height: "h-[15px]", // 20 * 0.75 = 15px for 4:3 aspect ratio
  },
  xl: {
    width: "w-[var(--size-s)]", // 24px
    height: "h-[18px]", // 24 * 0.75 = 18px for 4:3 aspect ratio
  },
} as const;

export type FlagSize = keyof typeof flagSizes;

export interface FlagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * ISO 3166-1-alpha-2 country code (e.g., "us", "gb", "fr")
   */
  country: string;
  /**
   * Size variant matching Icon component sizes
   * @default "m"
   */
  size?: FlagSize;
  /**
   * Optional aria-label for accessibility
   */
  "aria-label"?: string;
}

/**
 * Flag component displaying country flags in 4:3 aspect ratio
 *
 * Uses flagcdn.com for flag images with size variants matching the Icon component.
 *
 * @example
 * ```tsx
 * <Flag country="us" size="m" />
 * <Flag country="gb" size="l" aria-label="United Kingdom flag" />
 * ```
 */
export function Flag({
  country,
  size = "m",
  className,
  "aria-label": ariaLabel,
  ...props
}: FlagProps) {
  // Guard against undefined/null country
  if (!country) {
    return null;
  }

  const sizeClasses = flagSizes[size];
  const countryCode = country.toLowerCase();

  return (
    <div
      className={cn(
        "inline-block rounded-[2px] shadow-[inset_0_0_0_1px_rgba(85,95,109,0.1)] bg-cover bg-center bg-no-repeat",
        sizeClasses.width,
        sizeClasses.height,
        className
      )}
      style={{
        backgroundImage: `url(https://flagcdn.com/${countryCode}.svg)`,
      }}
      role="img"
      aria-label={ariaLabel || `${country.toUpperCase()} flag`}
      {...props}
    />
  );
}
