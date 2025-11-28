import { useState, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/fundamental/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/fundamental/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/fundamental/popover";
import { Flag, FlagSize } from "@/components/ui/flag";
import { cn } from "@/lib/utils";
import { countries } from "country-data-list";

// Helper function to map pixel size to Flag size variant
const getFlagSizeVariant = (pixelSize: number): FlagSize => {
  if (pixelSize <= 12) return "sm";
  if (pixelSize <= 16) return "md";
  if (pixelSize <= 20) return "lg";
  return "xl";
};

// Type definitions
export interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  emoji?: string;
}

export interface CountryDropdownTriggerProps {
  open: boolean;
  selectedCountry: Country | undefined;
  placeholder: string;
  disabled: boolean;
}

export interface CountryDropdownProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  flagSize?: number;
  showFlag?: boolean;
  showCode?: boolean;
  variant?: "default" | "slim";
  priorityCountries?: string[];
  trigger?: (props: CountryDropdownTriggerProps) => React.ReactNode;
}

// Threshold for switching between virtualized and direct rendering
const VIRTUALIZATION_THRESHOLD = 8;

// Filter and format country data
const getFilteredCountries = (): Country[] => {
  return countries.all
    .filter((country) => {
      // Only keep officially assigned countries, exclude deleted/reserved codes
      const validStatuses = ["assigned", "officially assigned"];
      return (
        validStatuses.includes(country.status) &&
        !["AQ", "BV", "HM", "GS"].includes(country.alpha2) // Antarctica and uninhabited territories
      );
    })
    .map((country) => ({
      name: country.name,
      alpha2: country.alpha2,
      alpha3: country.alpha3,
      numeric: (country as any).numeric || "000", // Fallback for numeric code
      emoji: country.emoji,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export function CountryDropdown({
  value,
  onValueChange,
  placeholder = "Select country...",
  searchPlaceholder = "Search countries...",
  disabled = false,
  className,
  flagSize = 16,
  showFlag = true,
  showCode = false,
  variant = "default",
  priorityCountries = ["US", "GB", "CA", "AU", "DE", "FR", "JP", "CN", "IN", "BR"],
  trigger,
}: CountryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [parentElement, setParentElement] = useState<HTMLDivElement | null>(null);

  const allCountries = useMemo(() => getFilteredCountries(), []);

  // Convert pixel-based flagSize to Flag component size variant
  const flagSizeVariant = useMemo(() => getFlagSizeVariant(flagSize), [flagSize]);

  // Combine priority and regular countries into one list
  const allDisplayCountries = useMemo(() => {
    const priority = priorityCountries
      .map((code) => allCountries.find((country) => country.alpha2 === code))
      .filter(Boolean) as Country[];

    const regular = allCountries.filter(
      (country) => !priorityCountries.includes(country.alpha2)
    );

    // Combine priority + regular
    return [...priority, ...regular];
  }, [allCountries, priorityCountries]);

  // Filter countries based on search value
  const filteredCountries = useMemo(() => {
    if (!searchValue) return allDisplayCountries;

    const search = searchValue.toLowerCase();
    return allDisplayCountries.filter((country) =>
      country.name.toLowerCase().includes(search) ||
      country.alpha2.toLowerCase().includes(search) ||
      country.alpha3.toLowerCase().includes(search)
    );
  }, [allDisplayCountries, searchValue]);

  // Determine if we should use virtualization based on item count
  const shouldVirtualize = filteredCountries.length > VIRTUALIZATION_THRESHOLD;
  const dynamicHeight = Math.min(filteredCountries.length * 40, 300);

  // Setup virtualizer for the combined countries list (only when virtualizing)
  const virtualizer = useVirtualizer({
    count: shouldVirtualize ? filteredCountries.length : 0,
    getScrollElement: () => parentElement,
    estimateSize: () => 40, // Approximate height of each item
    overscan: 5, // Render 5 extra items outside viewport for smooth scrolling
  });

  const selectedCountry = useMemo(() => {
    return allCountries.find((country) => country.alpha2 === value);
  }, [allCountries, value]);

  const handleSelect = useCallback(
    (countryCode: string) => {
      onValueChange?.(countryCode);
      setOpen(false);
    },
    [onValueChange]
  );

  const renderCountryItem = useCallback(
    (country: Country, index?: number) => (
      <CommandItem
        key={country.alpha2}
        value={`${country.name} ${country.alpha2} ${country.alpha3}`}
        onSelect={() => handleSelect(country.alpha2)}
        className="flex items-center gap-[var(--space-sm)] cursor-pointer"
        data-index={index}
      >
        {showFlag && (
          <Flag
            country={country.alpha2}
            size={flagSizeVariant}
          />
        )}
        <span className="flex-1">{country.name}</span>
        {showCode && (
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            {country.alpha2}
          </span>
        )}
        {value === country.alpha2 && (
          <Check className="h-4 w-4 text-[var(--color-icon-brand-bold)]" />
        )}
      </CommandItem>
    ),
    [showFlag, flagSizeVariant, showCode, value, handleSelect]
  );

  const renderTriggerContent = () => {
    if (variant === "slim" && selectedCountry) {
      return (
        <div className="flex items-center">
          {showFlag && (
            <Flag
              country={selectedCountry.alpha2}
              size={flagSizeVariant}
            />
          )}
        </div>
      );
    }

    if (selectedCountry) {
      return (
        <div className="flex items-center gap-[var(--space-sm)]">
          {showFlag && (
            <Flag
              country={selectedCountry.alpha2}
              size={flagSizeVariant}
            />
          )}
          <span className="flex-1 truncate text-left">{selectedCountry.name}</span>
          {showCode && (
            <span className="text-body-sm text-[var(--color-text-secondary)]">
              {selectedCountry.alpha2}
            </span>
          )}
        </div>
      );
    }

    return (
      <span className="text-[var(--color-text-secondary)]">{placeholder}</span>
    );
  };

  const renderDefaultTrigger = () => (
    <Button
      variant="default"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      className={cn(
        "justify-between",
        variant === "slim" ? "w-auto px-[var(--space-sm)]" : "w-full",
        className
      )}
    >
      {renderTriggerContent()}
      {variant !== "slim" && (
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      )}
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? trigger({ open, selectedCountry, placeholder, disabled }) : renderDefaultTrigger()}
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[300px] p-0"
        align={variant === "slim" ? "start" : "start"}
      >
        <Command shouldFilter={false}>
          <div className="px-[var(--space-sm)] pt-[var(--space-sm)] pb-[var(--space-sm)] border-b border-[var(--color-border-primary-subtle)]">
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9"
              value={searchValue}
              onValueChange={setSearchValue}
            />
          </div>
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {shouldVirtualize ? (
                // Virtualized rendering for large lists
                <div
                  ref={setParentElement}
                  className="h-[300px] overflow-y-auto overflow-x-hidden"
                  style={{ contain: 'strict' }}
                >
                  <div
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                      const country = filteredCountries[virtualItem.index];
                      if (!country) return null;
                      return (
                        <div
                          key={virtualItem.key}
                          data-index={virtualItem.index}
                          ref={virtualizer.measureElement}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                        >
                          {renderCountryItem(country, virtualItem.index)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Direct rendering for small lists with dynamic height
                <div
                  style={{
                    maxHeight: `${dynamicHeight}px`,
                    overflowY: 'auto',
                  }}
                >
                  {filteredCountries.map((country, index) => renderCountryItem(country, index))}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Convenience hook for getting country data
export function useCountryData() {
  const countries = useMemo(() => getFilteredCountries(), []);
  
  const getCountryByCode = useCallback(
    (code: string) => {
      return countries.find(
        (country) => 
          country.alpha2 === code || 
          country.alpha3 === code ||
          country.numeric === code
      );
    },
    [countries]
  );

  const getCountryByName = useCallback(
    (name: string) => {
      return countries.find(
        (country) => country.name.toLowerCase() === name.toLowerCase()
      );
    },
    [countries]
  );

  return {
    countries,
    getCountryByCode,
    getCountryByName,
  };
}