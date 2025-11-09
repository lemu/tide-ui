import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./command"
import { Popover, PopoverAnchor, PopoverContent } from "./popover"
import { Input } from "./input"

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
   */
  suggestions: string[]
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
   */
  onSelect?: (value: string) => void
}

/**
 * Performs fuzzy matching between a search term and a text value
 */
function fuzzyMatch(search: string, text: string): boolean {
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

  // Filter suggestions based on fuzzy matching
  const filteredSuggestions = React.useMemo(() => {
    if (!value || value.length < minCharacters) {
      return []
    }

    return suggestions
      .filter(suggestion => fuzzyMatch(value, suggestion))
      .slice(0, 50) // Limit to 50 suggestions for performance
  }, [value, suggestions, minCharacters])

  // Show dropdown when there are filtered suggestions
  // Close dropdown if value exactly matches a suggestion (indicating selection)
  React.useEffect(() => {
    const isExactMatch = suggestions.some(s => s === value)
    if (isExactMatch) {
      setOpen(false)
    } else {
      setOpen(filteredSuggestions.length > 0 && value.length >= minCharacters)
    }
  }, [filteredSuggestions.length, value.length, minCharacters, suggestions, value])

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setOpen(false)
    onSelect?.(selectedValue)
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
              onKeyDown={(e) => setOpen(e.key !== "Escape")}
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
                  {filteredSuggestions.map((suggestion, index) => (
                    <CommandItem
                      key={`${suggestion}-${index}`}
                      value={suggestion}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() => handleSelect(suggestion)}
                      className="text-body-md h-[var(--size-md)] py-0 hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                    >
                      <HighlightedText text={suggestion} search={value} />
                    </CommandItem>
                  ))}
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
