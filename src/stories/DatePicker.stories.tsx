import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker, DateRangePicker } from '../components/ui/date-picker'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'

const meta: Meta<typeof DatePicker> = {
  title: 'In Progress/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    formatStr: {
      control: 'text',
      description: 'Date format string (date-fns format)',
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

// Default date picker
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Select a date</Label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Pick a date"
            className="w-full"
          />
        </div>
        {date && (
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </div>
    )
  },
}

// Date range picker
export const DateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>()
    
    return (
      <div className="w-96 space-y-4">
        <div>
          <Label>Select a date range</Label>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            placeholder="Pick a date range"
            className="w-full"
          />
        </div>
        {dateRange?.from && (
          <div className="text-body-sm text-[var(--color-text-secondary)]">
            <p>From: {dateRange.from.toLocaleDateString()}</p>
            {dateRange.to && <p>To: {dateRange.to.toLocaleDateString()}</p>}
          </div>
        )}
      </div>
    )
  },
}

// Different formats
export const DateFormats: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>()
    const [date2, setDate2] = useState<Date | undefined>()
    const [date3, setDate3] = useState<Date | undefined>()
    const [date4, setDate4] = useState<Date | undefined>()
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label>Default format (PPP)</Label>
          <DatePicker
            date={date1}
            onDateChange={setDate1}
            placeholder="Pick a date"
            className="w-full"
          />
        </div>
        
        <div>
          <Label>Short format (P)</Label>
          <DatePicker
            date={date2}
            onDateChange={setDate2}
            placeholder="Pick a date"
            formatStr="P"
            className="w-full"
          />
        </div>
        
        <div>
          <Label>ISO format (yyyy-MM-dd)</Label>
          <DatePicker
            date={date3}
            onDateChange={setDate3}
            placeholder="Pick a date"
            formatStr="yyyy-MM-dd"
            className="w-full"
          />
        </div>
        
        <div>
          <Label>Custom format (do MMMM yyyy)</Label>
          <DatePicker
            date={date4}
            onDateChange={setDate4}
            placeholder="Pick a date"
            formatStr="do MMMM yyyy"
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

// With restrictions
export const WithRestrictions: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>()
    const today = new Date()
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Future dates only (next 30 days)</Label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Pick a future date"
            fromDate={oneWeekFromNow}
            toDate={oneMonthFromNow}
            className="w-full"
          />
        </div>
        <div className="text-caption-sm text-[var(--color-text-secondary)]">
          Available range: {oneWeekFromNow.toLocaleDateString()} - {oneMonthFromNow.toLocaleDateString()}
        </div>
      </div>
    )
  },
}

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      birthday: undefined as Date | undefined,
    })
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      alert(`Form submitted:\nStart: ${formData.startDate?.toLocaleDateString()}\nEnd: ${formData.endDate?.toLocaleDateString()}\nBirthday: ${formData.birthday?.toLocaleDateString()}`)
    }
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Event Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="start-date">Event Start Date</Label>
                <DatePicker
                  date={formData.startDate}
                  onDateChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                  placeholder="Select start date"
                  fromDate={new Date()}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="end-date">Event End Date</Label>
                <DatePicker
                  date={formData.endDate}
                  onDateChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                  placeholder="Select end date"
                  fromDate={formData.startDate || new Date()}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="birthday">Date of Birth</Label>
                <DatePicker
                  date={formData.birthday}
                  onDateChange={(date) => setFormData(prev => ({ ...prev, birthday: date }))}
                  placeholder="Select your birthday"
                  toDate={new Date()}
                  className="w-full"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Register for Event
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Disabled date picker</Label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="This is disabled"
            disabled={true}
            className="w-full"
          />
        </div>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          The date picker is disabled and cannot be interacted with.
        </p>
      </div>
    )
  },
}

// Project timeline
export const ProjectTimeline: Story = {
  render: () => {
    const [timeline, setTimeline] = useState({
      planning: { from: undefined as Date | undefined, to: undefined as Date | undefined },
      development: { from: undefined as Date | undefined, to: undefined as Date | undefined },
      testing: { from: undefined as Date | undefined, to: undefined as Date | undefined },
      launch: undefined as Date | undefined,
    })
    
    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline Planning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Planning Phase</Label>
                <DateRangePicker
                  dateRange={timeline.planning}
                  onDateRangeChange={(range) => setTimeline(prev => ({ ...prev, planning: range || { from: undefined, to: undefined } }))}
                  placeholder="Select planning period"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>Development Phase</Label>
                <DateRangePicker
                  dateRange={timeline.development}
                  onDateRangeChange={(range) => setTimeline(prev => ({ ...prev, development: range || { from: undefined, to: undefined } }))}
                  placeholder="Select development period"
                  fromDate={timeline.planning?.to}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>Testing Phase</Label>
                <DateRangePicker
                  dateRange={timeline.testing}
                  onDateRangeChange={(range) => setTimeline(prev => ({ ...prev, testing: range || { from: undefined, to: undefined } }))}
                  placeholder="Select testing period"
                  fromDate={timeline.development?.to}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label>Launch Date</Label>
                <DatePicker
                  date={timeline.launch}
                  onDateChange={(date) => setTimeline(prev => ({ ...prev, launch: date }))}
                  placeholder="Select launch date"
                  fromDate={timeline.testing?.to}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Timeline summary */}
            <div className="space-y-3">
              <h4 className="text-body-medium-sm font-medium">Timeline Summary</h4>
              <div className="space-y-2">
                {timeline.planning?.from && timeline.planning?.to && (
                  <div className="flex items-center gap-2">
                    <Badge appearance="outline">Planning</Badge>
                    <span className="text-body-sm">
                      {timeline.planning.from.toLocaleDateString()} - {timeline.planning.to.toLocaleDateString()}
                    </span>
                  </div>
                )}
                {timeline.development?.from && timeline.development?.to && (
                  <div className="flex items-center gap-2">
                    <Badge appearance="outline">Development</Badge>
                    <span className="text-body-sm">
                      {timeline.development.from.toLocaleDateString()} - {timeline.development.to.toLocaleDateString()}
                    </span>
                  </div>
                )}
                {timeline.testing?.from && timeline.testing?.to && (
                  <div className="flex items-center gap-2">
                    <Badge appearance="outline">Testing</Badge>
                    <span className="text-body-sm">
                      {timeline.testing.from.toLocaleDateString()} - {timeline.testing.to.toLocaleDateString()}
                    </span>
                  </div>
                )}
                {timeline.launch && (
                  <div className="flex items-center gap-2">
                    <Badge>Launch</Badge>
                    <span className="text-body-sm">
                      {timeline.launch.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}