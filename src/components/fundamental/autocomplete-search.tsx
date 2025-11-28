import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./command"
import { Popover, PopoverAnchor, PopoverContent } from "./popover"
import { Input } from "./input"

export interface AutocompleteSuggestion {
  /**
   * Display label for the suggestion
   */
  label: string
  /**
   * Value to use when suggestion is selected
   */
  value: string
  /**
   * Label of the filter this option belongs to
   */
  filterLabel: string
  /**
   * Icon component for the filter
   */
  filterIcon: React.ComponentType<{ className?: string }>
}

export interface AutocompleteSearchProps {
  /**
   * Current search value
   */
  value: string
  /**
   * Callback when search value changes
   */
  onValueChange: (value: string) => void
  /**
   * Available suggestions to show in dropdown
   * Can be simple strings or enriched objects with filter context
   */
  suggestions: (string | AutocompleteSuggestion)[]
  /**
   * Placeholder text for the input
   */
  placeholder?: string
  /**
   * Minimum characters required before showing suggestions
   * @default 2
   */
  minCharacters?: number
  /**
   * Message to show when no suggestions match
   * @default "No results found."
   */
  emptyMessage?: string
  /**
   * Additional className for the input
   */
  className?: string
  /**
   * Callback when a suggestion is selected
   * @param label - Display label of the selected suggestion (with proper capitalization)
   * @param filterLabel - Optional filter context label
   */
  onSelect?: (label: string, filterLabel?: string) => void
}

/**
 * Performs fuzzy matching between a search term and a text value
 */
function fuzzyMatch(search: string, text: string): boolean {
  // Safety check for undefined/null values
  if (!search || !text) {
    return false
  }

  const searchLower = search.toLowerCase()
  const textLower = text.toLowerCase()

  // Direct substring match
  if (textLower.includes(searchLower)) {
    return true
  }

  // Check for partial matches in words
  const words = textLower.split(' ')
  return words.some(word => word.includes(searchLower))
}

/**
 * Finds the matched portion of text for highlighting
 * Returns { before, match, after } or null if no match
 */
function findMatchedPortion(search: string, text: string): { before: string; match: string; after: string } | null {
  // Safety check for undefined/null values
  if (!search || !text) {
    return null
  }

  const searchLower = search.toLowerCase()
  const textLower = text.toLowerCase()

  // Find the position of the match
  const matchIndex = textLower.indexOf(searchLower)
  if (matchIndex !== -1) {
    return {
      before: text.substring(0, matchIndex),
      match: text.substring(matchIndex, matchIndex + search.length),
      after: text.substring(matchIndex + search.length),
    }
  }

  // Check for word-based match
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const wordLower = word.toLowerCase()
    const wordMatchIndex = wordLower.indexOf(searchLower)

    if (wordMatchIndex !== -1) {
      const before = words.slice(0, i).join(' ') + (i > 0 ? ' ' : '') + word.substring(0, wordMatchIndex)
      const match = word.substring(wordMatchIndex, wordMatchIndex + search.length)
      const after = word.substring(wordMatchIndex + search.length) + (i < words.length - 1 ? ' ' : '') + words.slice(i + 1).join(' ')

      return { before, match, after }
    }
  }

  return null
}

/**
 * Renders text with highlighted and bolded matched portion
 */
function HighlightedText({ text, search }: { text: string; search: string }) {
  const match = findMatchedPortion(search, text)

  if (!match) {
    return <span>{text}</span>
  }

  return (
    <span>
      {match.before}
      <span className="bg-[#ffeb10] text-body-strong-md">
        {match.match}
      </span>
      {match.after}
    </span>
  )
}

export function AutocompleteSearch({
  value,
  onValueChange,
  suggestions,
  placeholder = "Search...",
  minCharacters = 2,
  emptyMessage = "No results found.",
  className,
  onSelect,
}: AutocompleteSearchProps) {
  const [open, setOpen] = React.useState(false)

  // Normalize suggestions - convert strings to AutocompleteSuggestion objects
  const normalizedSuggestions = React.useMemo((): AutocompleteSuggestion[] => {
    return suggestions.map(suggestion => {
      if (typeof suggestion === 'string') {
        // Convert string to AutocompleteSuggestion
        return {
          label: suggestion,
          value: suggestion,
          filterLabel: '',
          filterIcon: () => null,
        }
      }
      return suggestion
    })
  }, [suggestions])

  // Filter suggestions based on fuzzy matching
  const filteredSuggestions = React.useMemo(() => {
    if (!value || value.length < minCharacters) {
      return []
    }

    return normalizedSuggestions
      .filter(suggestion => suggestion && suggestion.label) // Filter out invalid suggestions
      .filter(suggestion => fuzzyMatch(value, suggestion.label))
      .slice(0, 50) // Limit to 50 suggestions for performance
  }, [value, normalizedSuggestions, minCharacters])

  // Show dropdown when there are filtered suggestions
  // Close dropdown if value exactly matches a suggestion (indicating selection)
  React.useEffect(() => {
    const isExactMatch = normalizedSuggestions.some(s => s.value === value)
    if (isExactMatch) {
      setOpen(false)
    } else {
      setOpen(filteredSuggestions.length > 0 && value.length >= minCharacters)
    }
  }, [filteredSuggestions.length, value.length, minCharacters, normalizedSuggestions, value])

  const handleSelect = (suggestion: AutocompleteSuggestion) => {
    onValueChange(suggestion.value)
    setOpen(false)
    onSelect?.(suggestion.label, suggestion.filterLabel)
  }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if focus moved to the dropdown
    if (!e.relatedTarget?.hasAttribute("cmdk-list")) {
      setOpen(false)
    }
  }

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <Command
          shouldFilter={false}
          loop
          className="overflow-visible [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:p-0"
        >
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={value}
              onValueChange={onValueChange}
              onKeyDown={(e) => {
                // Close dropdown on Escape
                if (e.key === "Escape") {
                  setOpen(false)
                }
                // Don't force open on other keys - let useEffect handle it based on suggestions
              }}
              onBlur={onInputBlur}
            >
              <Input
                type="search"
                placeholder={placeholder}
              />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute("cmdk-input")
              ) {
                e.preventDefault()
              }
            }}
            className="w-[--radix-popover-trigger-width] p-[var(--space-sm)]"
          >
            <CommandList>
              {filteredSuggestions.length > 0 ? (
                <CommandGroup className="[&]:p-0">
                  {filteredSuggestions.map((suggestion, index) => {
                    const FilterIcon = suggestion.filterIcon
                    const hasFilterContext = suggestion.filterLabel && suggestion.filterLabel.length > 0
                    return (
                      <CommandItem
                        key={`${suggestion.value}-${suggestion.filterLabel}-${index}`}
                        value={`${suggestion.value}|${suggestion.filterLabel}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={() => handleSelect(suggestion)}
                        className="text-body-md h-[var(--size-md)] py-0 gap-[var(--space-md)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] hover:text-[var(--color-text-primary)]"
                      >
                        <HighlightedText text={suggestion.label} search={value} />
                        {hasFilterContext && (
                          <span className="ml-auto flex items-center gap-[var(--space-xsm)] text-caption-sm text-[var(--color-text-tertiary)]">
                            <FilterIcon className="w-[12px] h-[12px]" />
                            {suggestion.filterLabel}
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ) : null}
              {filteredSuggestions.length === 0 && value.length >= minCharacters ? (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
