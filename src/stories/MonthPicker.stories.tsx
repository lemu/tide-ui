import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MonthPicker } from '../components/fundamental/month-picker'

const meta = {
  title: 'NPM • Fundamental/MonthPicker',
  component: MonthPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MonthPicker>

export default meta
type Story = StoryObj<typeof meta>

// Story 1: Single Month Selection
export const SingleMode: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | undefined>(new Date())
    return (
      <div className="w-[600px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as Date)}
          mode="single"
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
            Selected Month:
          </div>
          <div className="text-body-md text-[var(--color-text-primary)]">
            {value?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || 'No selection'}
          </div>
        </div>
      </div>
    )
  },
}

// Story 2: Range Selection
export const RangeMode: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    return (
      <div className="w-[600px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as [Date, Date])}
          mode="range"
          yearCount={2}
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
            Selected Range:
          </div>
          <div className="text-body-md text-[var(--color-text-primary)]">
            {value ? (
              <>
                {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </>
            ) : (
              'No range selected'
            )}
          </div>
        </div>
      </div>
    )
  },
}

// Story 3: With Date Constraints
export const WithConstraints: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    const minDate = new Date(2026, 2, 1) // March 2026
    const maxDate = new Date(2027, 9, 1) // October 2027

    return (
      <div className="w-[600px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <div className="mb-[var(--space-l)] p-[var(--space-m)] bg-[var(--color-background-blue-subtle)] rounded-m">
          <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
            Date Constraints: March 2026 - October 2027
          </div>
        </div>
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as [Date, Date])}
          mode="range"
          yearCount={2}
          minDate={minDate}
          maxDate={maxDate}
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
            Selected Range:
          </div>
          <div className="text-body-md text-[var(--color-text-primary)]">
            {value ? (
              <>
                {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </>
            ) : (
              'No range selected'
            )}
          </div>
        </div>
      </div>
    )
  },
}

// Story 4: Three Years
export const ThreeYears: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    return (
      <div className="w-[900px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <div className="mb-[var(--space-l)] p-[var(--space-m)] bg-[var(--color-background-blue-subtle)] rounded-m">
          <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
            Displaying 3 years for longer-term planning
          </div>
        </div>
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as [Date, Date])}
          mode="range"
          yearCount={3}
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
            Selected Range:
          </div>
          <div className="text-body-md text-[var(--color-text-primary)]">
            {value ? (
              <>
                {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </>
            ) : (
              'No range selected'
            )}
          </div>
        </div>
      </div>
    )
  },
}

// Story 5: With Disabled Dates
export const WithDisabledDates: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    const disabledDates = [
      new Date(2026, 3, 1), // April 2026
      new Date(2026, 7, 1), // August 2026
      new Date(2027, 0, 1), // January 2027
    ]

    return (
      <div className="w-[600px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <div className="mb-[var(--space-l)] p-[var(--space-m)] bg-[var(--color-background-blue-subtle)] rounded-m">
          <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
            Disabled Months: April 2026, August 2026, January 2027
          </div>
        </div>
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as [Date, Date])}
          mode="range"
          yearCount={2}
          disabledDates={disabledDates}
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
            Selected Range:
          </div>
          <div className="text-body-md text-[var(--color-text-primary)]">
            {value ? (
              <>
                {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </>
            ) : (
              'No range selected'
            )}
          </div>
        </div>
      </div>
    )
  },
}

// Story 6: With Navigation (2 Years)
export const WithNavigation: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear())

    return (
      <div className="w-[700px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
        <div className="mb-[var(--space-l)] p-[var(--space-m)] bg-[var(--color-background-blue-subtle)] rounded-m">
          <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
            Navigate through years using the arrow buttons. Displays 2 years at a time.
          </div>
        </div>
        <MonthPicker
          value={value}
          onChange={(v) => setValue(v as [Date, Date])}
          mode="range"
          yearCount={2}
          enableNavigation={true}
          onYearNavigate={(year) => setCurrentYear(year)}
        />
        <div className="mt-[var(--space-l)] pt-[var(--space-l)] border-t border-[var(--color-border-primary-subtle)]">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
                Selected Range:
              </div>
              <div className="text-body-md text-[var(--color-text-primary)]">
                {value ? (
                  <>
                    {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                    {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </>
                ) : (
                  'No range selected'
                )}
              </div>
            </div>
            <div>
              <div className="text-label-md text-[var(--color-text-secondary)] mb-[var(--space-s)]">
                Current Start Year:
              </div>
              <div className="text-body-md text-[var(--color-text-primary)]">
                {currentYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

// Story: Small Size Variant
export const SmallSize: Story = {
  render: () => {
    const [value, setValue] = React.useState<[Date, Date] | undefined>()
    const [currentYear, setCurrentYear] = React.useState<number>(new Date().getFullYear())

    return (
      <div className="space-y-[var(--space-2xl)]">
        {/* Small variant with navigation */}
        <div className="w-[500px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
          <div className="mb-[var(--space-m)] p-[var(--space-s)] bg-[var(--color-background-blue-subtle)] rounded-m">
            <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
              Small size variant - ideal for filter panels and modals
            </div>
          </div>
          <MonthPicker
            value={value}
            onChange={(v) => setValue(v as [Date, Date])}
            mode="range"
            yearCount={2}
            size="small"
            enableNavigation={true}
            onYearNavigate={(year) => setCurrentYear(year)}
          />
          <div className="mt-[var(--space-m)] pt-[var(--space-m)] border-t border-[var(--color-border-primary-subtle)]">
            <div className="text-caption-sm text-[var(--color-text-secondary)]">
              {value ? (
                <>
                  {value[0]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{' '}
                  {value[1]?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </>
              ) : (
                'No range selected'
              )}
            </div>
          </div>
        </div>

        {/* Default size for comparison */}
        <div className="w-[700px] p-[var(--space-l)] bg-[var(--color-surface-primary)] rounded-l shadow-md">
          <div className="mb-[var(--space-m)] p-[var(--space-s)] bg-[var(--color-background-blue-subtle)] rounded-m">
            <div className="text-caption-medium-sm text-[var(--color-text-primary)]">
              Default size variant - original sizing
            </div>
          </div>
          <MonthPicker
            value={value}
            onChange={(v) => setValue(v as [Date, Date])}
            mode="range"
            yearCount={2}
            enableNavigation={true}
            onYearNavigate={(year) => setCurrentYear(year)}
          />
        </div>
      </div>
    )
  },
}
