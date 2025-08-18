import * as React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"

// Mention context
interface MentionContextValue {
  value: string
  onChange: (value: string) => void
  suggestions: MentionSuggestion[]
  trigger: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  filteredSuggestions: MentionSuggestion[]
  currentMention: string
  mentionStart: number
  onSelect: (suggestion: MentionSuggestion) => void
}

const MentionContext = React.createContext<MentionContextValue | null>(null)

const useMention = () => {
  const context = React.useContext(MentionContext)
  if (!context) {
    throw new Error("useMention must be used within a Mention component")
  }
  return context
}

// Types
export interface MentionSuggestion {
  id: string
  label: string
  value: string
  avatar?: string
  description?: string
  disabled?: boolean
}

export interface MentionProps {
  /**
   * Current text value
   */
  value: string
  /**
   * Callback when the text changes
   */
  onChange: (value: string) => void
  /**
   * Array of suggestion items
   */
  suggestions: MentionSuggestion[]
  /**
   * Character that triggers the mention dropdown
   */
  trigger?: string
  /**
   * Placeholder text for the input
   */
  placeholder?: string
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Callback when a mention is selected
   */
  onMentionSelect?: (suggestion: MentionSuggestion) => void
  /**
   * Custom filter function for suggestions
   */
  filterFn?: (suggestions: MentionSuggestion[], query: string) => MentionSuggestion[]
}

// Main Mention component
export const Mention = React.forwardRef<HTMLTextAreaElement, MentionProps>(
  ({
    value,
    onChange,
    suggestions,
    trigger = "@",
    placeholder,
    disabled = false,
    onMentionSelect,
    filterFn,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [currentMention, setCurrentMention] = React.useState("")
    const [mentionStart, setMentionStart] = React.useState(-1)
    
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    // Default filter function
    const defaultFilterFn = React.useCallback((suggestions: MentionSuggestion[], query: string) => {
      return suggestions.filter(suggestion => 
        !suggestion.disabled &&
        (suggestion.label.toLowerCase().includes(query.toLowerCase()) ||
         suggestion.value.toLowerCase().includes(query.toLowerCase()))
      )
    }, [])

    const actualFilterFn = filterFn || defaultFilterFn

    // Filter suggestions based on current mention query
    const filteredSuggestions = React.useMemo(() => {
      if (!currentMention) return suggestions.filter(s => !s.disabled)
      return actualFilterFn(suggestions, currentMention)
    }, [suggestions, currentMention, actualFilterFn])

    // Reset selected index when filtered suggestions change
    React.useEffect(() => {
      setSelectedIndex(0)
    }, [filteredSuggestions])

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      const cursorPosition = e.target.selectionStart || 0
      
      onChange(newValue)
      
      // Check if we're typing a mention
      const textBeforeCursor = newValue.slice(0, cursorPosition)
      const triggerIndex = textBeforeCursor.lastIndexOf(trigger)
      
      if (triggerIndex !== -1) {
        const textAfterTrigger = textBeforeCursor.slice(triggerIndex + 1)
        
        // Check if there's a space after the trigger (which would end the mention)
        if (!textAfterTrigger.includes(' ') && !textAfterTrigger.includes('\n')) {
          setCurrentMention(textAfterTrigger)
          setMentionStart(triggerIndex)
          setIsOpen(true)
        } else {
          setIsOpen(false)
          setCurrentMention("")
          setMentionStart(-1)
        }
      } else {
        setIsOpen(false)
        setCurrentMention("")
        setMentionStart(-1)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!isOpen || filteredSuggestions.length === 0) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => 
            prev < filteredSuggestions.length - 1 ? prev + 1 : 0
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => 
            prev > 0 ? prev - 1 : filteredSuggestions.length - 1
          )
          break
        case "Enter":
        case "Tab":
          e.preventDefault()
          if (filteredSuggestions[selectedIndex]) {
            handleSelectSuggestion(filteredSuggestions[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          setCurrentMention("")
          setMentionStart(-1)
          break
      }
    }

    const handleSelectSuggestion = (suggestion: MentionSuggestion) => {
      if (mentionStart === -1) return

      const beforeMention = value.slice(0, mentionStart)
      const afterMention = value.slice(mentionStart + currentMention.length + 1)
      const newValue = `${beforeMention}${trigger}${suggestion.value} ${afterMention}`
      
      onChange(newValue)
      onMentionSelect?.(suggestion)
      
      setIsOpen(false)
      setCurrentMention("")
      setMentionStart(-1)
      
      // Focus back to textarea
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPosition = mentionStart + trigger.length + suggestion.value.length + 1
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
        }
      }, 0)
    }

    const contextValue: MentionContextValue = {
      value,
      onChange,
      suggestions,
      trigger,
      isOpen,
      setIsOpen,
      selectedIndex,
      setSelectedIndex,
      filteredSuggestions,
      currentMention,
      mentionStart,
      onSelect: handleSelectSuggestion,
    }

    return (
      <MentionContext.Provider value={contextValue}>
        <div className="relative">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "flex min-h-[60px] w-full rounded-md border border-[var(--color-border-input)] bg-[var(--color-surface-primary)] px-3 py-2 text-body-sm shadow-sm transition-colors",
                  "placeholder:text-[var(--color-text-tertiary)]",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-brand)]",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "resize-none"
                )}
                {...props}
              />
            </PopoverTrigger>
            
            {isOpen && filteredSuggestions.length > 0 && (
              <PopoverContent 
                className="w-80 p-0" 
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <Command>
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {filteredSuggestions.map((suggestion, index) => (
                        <CommandItem
                          key={suggestion.id}
                          value={suggestion.value}
                          onSelect={() => handleSelectSuggestion(suggestion)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2",
                            index === selectedIndex && "bg-[var(--color-background-neutral-subtle)]"
                          )}
                        >
                          {suggestion.avatar && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={suggestion.avatar} />
                              <AvatarFallback className="text-xs">
                                {suggestion.label.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">{suggestion.label}</span>
                              <span className="text-caption-sm text-[var(--color-text-tertiary)]">
                                {trigger}{suggestion.value}
                              </span>
                            </div>
                            {suggestion.description && (
                              <p className="text-caption-sm text-[var(--color-text-secondary)] truncate">
                                {suggestion.description}
                              </p>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
        </div>
      </MentionContext.Provider>
    )
  }
)
Mention.displayName = "Mention"

// Utility function to extract mentions from text
export const extractMentions = (text: string, trigger = "@") => {
  const regex = new RegExp(`\\${trigger}([a-zA-Z0-9_.-]+)`, "g")
  const mentions: Array<{ mention: string; index: number }> = []
  let match

  while ((match = regex.exec(text)) !== null) {
    mentions.push({
      mention: match[1],
      index: match.index,
    })
  }

  return mentions
}

// Utility function to highlight mentions in text
export const highlightMentions = (
  text: string, 
  trigger = "@",
  className = "bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-1 rounded"
) => {
  const regex = new RegExp(`(\\${trigger}[a-zA-Z0-9_.-]+)`, "g")
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (part.startsWith(trigger)) {
      return (
        <span key={index} className={className}>
          {part}
        </span>
      )
    }
    return part
  })
}

// Component for displaying formatted text with highlighted mentions
export interface MentionTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content with mentions
   */
  text: string
  /**
   * Mention trigger character
   */
  trigger?: string
  /**
   * Custom className for mention highlights
   */
  mentionClassName?: string
  /**
   * Callback when a mention is clicked
   */
  onMentionClick?: (mention: string) => void
}

export const MentionText = React.forwardRef<HTMLDivElement, MentionTextProps>(
  ({ 
    className,
    text, 
    trigger = "@",
    mentionClassName,
    onMentionClick,
    ...props 
  }, ref) => {
    const regex = new RegExp(`(\\${trigger}[a-zA-Z0-9_.-]+)`, "g")
    const parts = text.split(regex)

    return (
      <div ref={ref} className={cn("text-body-sm", className)} {...props}>
        {parts.map((part, index) => {
          if (part.startsWith(trigger)) {
            return (
              <Badge
                key={index}
                intent="brand"
                appearance="subtle"
                className={cn(
                  "mx-0.5 cursor-pointer hover:opacity-80",
                  mentionClassName
                )}
                onClick={() => onMentionClick?.(part.slice(1))}
              >
                {part}
              </Badge>
            )
          }
          return <span key={index}>{part}</span>
        })}
      </div>
    )
  }
)
MentionText.displayName = "MentionText"

export type { MentionProps, MentionSuggestion, MentionTextProps }