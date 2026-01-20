/**
 * Date utilities for filter date range calculations
 */

/**
 * Get the first day of the current week (Monday)
 */
export function getThisWeekStart(): Date {
  const now = new Date()
  const day = now.getDay()
  const diff = (day === 0 ? -6 : 1) - day // Monday is 1, Sunday is 0
  const monday = new Date(now)
  monday.setDate(now.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}

/**
 * Get the last day of the current week (Sunday)
 */
export function getThisWeekEnd(): Date {
  const start = getThisWeekStart()
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

/**
 * Get the first day of the current month
 */
export function getThisMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

/**
 * Get the last day of the current month
 */
export function getThisMonthEnd(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
}

/**
 * Get the first day of the current year
 */
export function getThisYearStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), 0, 1)
}

/**
 * Get the last day of the current year
 */
export function getThisYearEnd(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
}

/**
 * Get the first day of last week
 */
export function getLastWeekStart(): Date {
  const thisWeekStart = getThisWeekStart()
  const lastWeekStart = new Date(thisWeekStart)
  lastWeekStart.setDate(thisWeekStart.getDate() - 7)
  return lastWeekStart
}

/**
 * Get the last day of last week
 */
export function getLastWeekEnd(): Date {
  const thisWeekStart = getThisWeekStart()
  const lastWeekEnd = new Date(thisWeekStart)
  lastWeekEnd.setDate(thisWeekStart.getDate() - 1)
  lastWeekEnd.setHours(23, 59, 59, 999)
  return lastWeekEnd
}

/**
 * Get the first day of last month
 */
export function getLastMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, 1)
}

/**
 * Get the last day of last month
 */
export function getLastMonthEnd(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
}

/**
 * Get the first day of last year
 */
export function getLastYearStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear() - 1, 0, 1)
}

/**
 * Get the last day of last year
 */
export function getLastYearEnd(): Date {
  const now = new Date()
  return new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999)
}

/**
 * Get date N days ago
 */
export function getDaysAgo(days: number): Date {
  const now = new Date()
  const past = new Date(now)
  past.setDate(now.getDate() - days)
  past.setHours(0, 0, 0, 0)
  return past
}

/**
 * Get today at end of day
 */
export function getToday(): Date {
  const now = new Date()
  now.setHours(23, 59, 59, 999)
  return now
}

/**
 * Get the first day of the current quarter
 */
export function getThisQuarterStart(): Date {
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3)
  return new Date(now.getFullYear(), quarter * 3, 1)
}

/**
 * Get the last day of the current quarter
 */
export function getThisQuarterEnd(): Date {
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3)
  return new Date(now.getFullYear(), quarter * 3 + 3, 0, 23, 59, 59, 999)
}

/**
 * Get the first day of the last quarter
 */
export function getLastQuarterStart(): Date {
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3)
  const lastQuarter = quarter === 0 ? 3 : quarter - 1
  const year = quarter === 0 ? now.getFullYear() - 1 : now.getFullYear()
  return new Date(year, lastQuarter * 3, 1)
}

/**
 * Get the last day of the last quarter
 */
export function getLastQuarterEnd(): Date {
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3)
  const lastQuarter = quarter === 0 ? 3 : quarter - 1
  const year = quarter === 0 ? now.getFullYear() - 1 : now.getFullYear()
  return new Date(year, lastQuarter * 3 + 3, 0, 23, 59, 59, 999)
}

/**
 * Get quarter label (e.g., "Q1 2026")
 */
export function getQuarterLabel(date: Date): string {
  const quarter = Math.floor(date.getMonth() / 3) + 1
  return `Q${quarter} ${date.getFullYear()}`
}

/**
 * Calculate date range based on preset
 */
export function calculatePresetRange(preset: string): [Date, Date] | undefined {
  switch (preset) {
    case 'this-week':
      return [getThisWeekStart(), getThisWeekEnd()]
    case 'this-month':
      return [getThisMonthStart(), getThisMonthEnd()]
    case 'this-year':
      return [getThisYearStart(), getThisYearEnd()]
    case 'last-week':
      return [getLastWeekStart(), getLastWeekEnd()]
    case 'last-month':
      return [getLastMonthStart(), getLastMonthEnd()]
    case 'last-year':
      return [getLastYearStart(), getLastYearEnd()]
    case 'last-30-days':
      return [getDaysAgo(30), getToday()]
    case 'last-90-days':
      return [getDaysAgo(90), getToday()]
    case 'last-6-months':
      return [getDaysAgo(180), getToday()]
    case 'this-quarter':
      return [getThisQuarterStart(), getThisQuarterEnd()]
    case 'last-quarter':
      return [getLastQuarterStart(), getLastQuarterEnd()]
    default:
      return undefined
  }
}

/**
 * Format date range for display
 */
export function formatDateRange(start: Date, end: Date): string {
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const startStr = start.toLocaleDateString('en-US', formatOptions)
  const endStr = end.toLocaleDateString('en-US', formatOptions)
  return `${startStr} - ${endStr}`
}

/**
 * Get preset label for display
 */
export function getPresetLabel(preset: string): string {
  const labels: Record<string, string> = {
    'custom': 'Custom',
    'this-week': 'This week',
    'this-month': 'This month',
    'this-year': 'This year',
    'last-week': 'Last week',
    'last-month': 'Last month',
    'last-year': 'Last year',
    'last-30-days': 'Last 30 days',
    'last-90-days': 'Last 90 days',
    'last-6-months': 'Last 6 months',
    'this-quarter': `This quarter (${getQuarterLabel(getThisQuarterStart())})`,
    'last-quarter': `Last quarter (${getQuarterLabel(getLastQuarterStart())})`,
  }
  return labels[preset] || preset
}
