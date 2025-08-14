import { useState, useMemo, useCallback } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { countries } from "country-data-list";

// Custom Flag component using square flags from kapowaz/square-flags
interface FlagIconProps {
  countryCode: string;
  size?: number;
  className?: string;
}

function FlagIcon({ countryCode, size = 16, className }: FlagIconProps) {
  return (
    <div
      className={cn(
        "inline-block rounded-[2px] shadow-[inset_0_0_0_1px_rgba(85,95,109,0.1)] bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{ 
        width: size, 
        height: size,
        backgroundImage: `url(https://kapowaz.github.io/square-flags/flags/${countryCode.toLowerCase()}.svg)`
      }}
      role="img"
      aria-label={`${countryCode} flag`}
    />
  );
}

// Type definitions
export interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  emoji?: string;
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
}

// Filter and format country data
const getFilteredCountries = (): Country[] => {
  return countries.all
    .filter((country) => {
      // Filter out deleted countries and specific regions
      return (
        country.status !== "deleted" &&
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
}: CountryDropdownProps) {
  const [open, setOpen] = useState(false);

  const allCountries = useMemo(() => getFilteredCountries(), []);

  // Separate priority countries from the rest
  const { priorityList, regularCountries } = useMemo(() => {
    const priority = priorityCountries
      .map((code) => allCountries.find((country) => country.alpha2 === code))
      .filter(Boolean) as Country[];
    
    const regular = allCountries.filter(
      (country) => !priorityCountries.includes(country.alpha2)
    );

    return { priorityList: priority, regularCountries: regular };
  }, [allCountries, priorityCountries]);

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
    (country: Country) => (
      <CommandItem
        key={country.alpha2}
        value={`${country.name} ${country.alpha2} ${country.alpha3}`}
        onSelect={() => handleSelect(country.alpha2)}
        className="flex items-center gap-[var(--space-sm)] cursor-pointer"
      >
        {showFlag && (
          <FlagIcon
            countryCode={country.alpha2}
            size={flagSize}
          />
        )}
        <span className="flex-1">{country.name}</span>
        {showCode && (
          <span className="text-body-sm text-[var(--color-text-secondary)]">
            {country.alpha2}
          </span>
        )}
        {value === country.alpha2 && (
          <Check className="h-4 w-4 text-[var(--color-icon-brand)]" />
        )}
      </CommandItem>
    ),
    [showFlag, flagSize, showCode, value, handleSelect]
  );

  const renderTriggerContent = () => {
    if (variant === "slim" && selectedCountry) {
      return (
        <div className="flex items-center">
          {showFlag && (
            <FlagIcon
              countryCode={selectedCountry.alpha2}
              size={flagSize}
            />
          )}
        </div>
      );
    }

    if (selectedCountry) {
      return (
        <div className="flex items-center gap-[var(--space-sm)]">
          {showFlag && (
            <FlagIcon
              countryCode={selectedCountry.alpha2}
              size={flagSize}
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "justify-between border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] hover:bg-[var(--color-background-neutral-subtle-hovered)]",
            variant === "slim" ? "w-auto px-[var(--space-sm)]" : "w-full",
            className
          )}
        >
          {renderTriggerContent()}
          {variant !== "slim" && (
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] p-0" 
        align={variant === "slim" ? "start" : "start"}
      >
        <Command>
          <CommandInput 
            placeholder={searchPlaceholder} 
            className="h-9"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No country found.</CommandEmpty>
            
            {priorityList.length > 0 && (
              <>
                <CommandGroup heading="Popular Countries">
                  {priorityList.map(renderCountryItem)}
                </CommandGroup>
                <div className="border-t border-[var(--color-border-primary-subtle)] my-1" />
              </>
            )}
            
            <CommandGroup heading="All Countries">
              {regularCountries.map(renderCountryItem)}
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