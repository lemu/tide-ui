import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Number formatting utilities for tables and data display
 */

/**
 * Format a number with commas for thousands separators
 * @param value - The number to format
 * @returns Formatted string with commas (e.g., "7,785,000")
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Format a number as currency with dollar sign and commas
 * @param value - The number to format as currency
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string (e.g., "$133,340,750")
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/**
 * Format a number with fixed decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with fixed decimals (e.g., "20.35")
 */
export function formatDecimal(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}