import { useEffect, useState } from 'react'

/**
 * Custom hook to track media query matches
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    
    // Set initial state
    setMatches(media.matches)
    
    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add listener
    media.addEventListener('change', listener)
    
    // Cleanup
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Hook to detect if the current viewport is desktop size (md and above)
 * @returns boolean - true for desktop (≥768px), false for mobile (<768px)
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(true) // Default to desktop to prevent hydration issues
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(min-width: 768px)')
    
    // Set initial state
    setIsDesktop(mediaQuery.matches)
    setIsInitialized(true)
    
    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches)
    }
    
    // Add listener
    mediaQuery.addEventListener('change', listener)
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // On server or before initialization, default to desktop
  if (!isInitialized) return true
  
  return isDesktop
}