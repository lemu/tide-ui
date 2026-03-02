import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from '../components/fundamental/calendar'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Label } from '../components/fundamental/label'

import {
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarX,
  Clock,
  Edit,
  Eye,
} from 'lucide-react'
const meta: Meta<typeof Calendar> = {
  title: 'NPM • Fundamental/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// Basic calendar
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(new Date())

    return (
      <div className="space-y-4">
        <div>
          <Label>Selected Date: {selected?.toLocaleDateString() || 'None'}</Label>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="rounded-m border border-[var(--color-border-primary-subtle)]"
        />
      </div>
    )
  },
}

// Date range picker
export const DateRange: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })

    return (
      <div className="space-y-4">
        <div>
          <Label>
            Selected Range: {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
          </Label>
          <p className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
            Click a start date, then click an end date. Third click starts new selection.
          </p>
        </div>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          className="rounded-m border border-[var(--color-border-primary-subtle)]"
        />
      </div>
    )
  },
}

// Multiple date selection
export const MultipleSelection: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([
      new Date(),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    ])

    return (
      <div className="space-y-4">
        <div>
          <Label>Selected Dates ({selectedDates.length}):</Label>
          <div className="mt-2 flex flex-wrap gap-1">
            {selectedDates.map((date, index) => (
              <Badge key={index} className="text-xs">
                {date.toLocaleDateString()}
              </Badge>
            ))}
          </div>
        </div>
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          className="rounded-m border border-[var(--color-border-primary-subtle)]"
        />
      </div>
    )
  },
}

// Event scheduling calendar
export const EventScheduling: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const [selectedTime, setSelectedTime] = useState<string>('')

    const events = [
      { date: new Date(), title: 'Team Meeting', time: '09:00' },
      { date: new Date(Date.now() + 24 * 60 * 60 * 1000), title: 'Project Review', time: '14:00' },
      { date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), title: 'Client Call', time: '11:00' },
    ]

    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ]

    const hasEvent = (date: Date) => {
      return events.some(event => 
        event.date.toDateString() === date.toDateString()
      )
    }

    const getEventsForDate = (date: Date) => {
      return events.filter(event => 
        event.date.toDateString() === date.toDateString()
      )
    }

    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  modifiers={{
                    hasEvent: (date) => hasEvent(date)
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: 'var(--color-background-information-subtle)',
                      color: 'var(--color-text-info-bold)',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-m border border-[var(--color-border-primary-subtle)]"
                />
                <div className="mt-3 text-caption-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--color-background-information-subtle)]"></div>
                    <span>Days with existing events</span>
                  </div>
                  <p className="mt-1">Weekends are unavailable</p>
                </div>
              </div>

              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">
                  {selectedDate ? `Available Times - ${selectedDate.toLocaleDateString()}` : 'Select a date first'}
                </Label>
                
                {selectedDate ? (
                  <div className="space-y-4">
                    {getEventsForDate(selectedDate).length > 0 && (
                      <div className="p-3 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-info-bold)] rounded-m">
                        <h4 className="text-body-sm font-medium mb-2">Existing Events:</h4>
                        {getEventsForDate(selectedDate).map((event, index) => (
                          <div key={index} className="flex items-center gap-2 text-body-sm">
                            <Icon name={Clock} size="s" />
                            <span>{event.time} - {event.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => {
                        const isBooked = getEventsForDate(selectedDate).some(event => event.time === time)
                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? 'default' : 'ghost'}
                            size="s"
                            disabled={isBooked}
                            onClick={() => setSelectedTime(selectedTime === time ? '' : time)}
                            className="justify-center"
                          >
                            {time}
                            {isBooked && <Icon name="x" size="s" className="ml-1" />}
                          </Button>
                        )
                      })}
                    </div>

                    {selectedTime && (
                      <div className="p-4 bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success-bold)] rounded-m">
                        <h4 className="text-body-sm font-medium mb-2">Selected Time Slot:</h4>
                        <p className="text-body-sm">
                          {selectedDate.toLocaleDateString()} at {selectedTime}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="s">Book Meeting</Button>
                          <Button size="s" variant="ghost">Add to Calendar</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--color-text-secondary)]">
                    <Icon name={CalendarIcon} size="l" className="mx-auto mb-2" />
                    <p>Select a date to view available time slots</p>
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

// Vacation booking calendar
export const VacationBooking: Story = {
  render: () => {
    const [vacationDates, setVacationDates] = useState<{ from?: Date; to?: Date }>()
    
    const blockedDates = [
      new Date(2024, 2, 15), // March 15
      new Date(2024, 2, 16), // March 16
      new Date(2024, 3, 10), // April 10
    ]

    const isBlocked = (date: Date) => {
      return blockedDates.some(blocked => 
        blocked.toDateString() === date.toDateString()
      )
    }

    const calculateDays = () => {
      if (vacationDates?.from && vacationDates?.to) {
        const timeDiff = vacationDates.to.getTime() - vacationDates.from.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
        return daysDiff
      }
      return 0
    }

    const calculateWeekdays = () => {
      if (!vacationDates?.from || !vacationDates?.to) return 0
      
      let count = 0
      const current = new Date(vacationDates.from)
      
      while (current <= vacationDates.to) {
        if (current.getDay() !== 0 && current.getDay() !== 6) {
          count++
        }
        current.setDate(current.getDate() + 1)
      }
      
      return count
    }

    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Vacation Request
              <Badge appearance="outline">25 days remaining</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">Select Vacation Dates</Label>
                <Calendar
                  mode="range"
                  selected={vacationDates}
                  onSelect={setVacationDates}
                  disabled={(date) => 
                    date < new Date() || 
                    isBlocked(date) ||
                    date.getDay() === 0 || 
                    date.getDay() === 6
                  }
                  modifiers={{
                    blocked: isBlocked
                  }}
                  modifiersStyles={{
                    blocked: {
                      backgroundColor: 'var(--color-background-error-subtle)',
                      color: 'var(--color-text-error-bold)',
                      textDecoration: 'line-through'
                    }
                  }}
                  numberOfMonths={2}
                  className="rounded-m border border-[var(--color-border-primary-subtle)]"
                />
                
                <div className="mt-4 space-y-2 text-caption-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--color-background-error-subtle)]"></div>
                    <span>Blocked dates (company holidays)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--color-background-neutral-subtlest)]"></div>
                    <span>Weekends (not counted)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">Vacation Summary</Label>
                
                {vacationDates?.from && vacationDates?.to ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-info-bold)] rounded-m">
                      <h4 className="text-body-sm font-medium mb-3">Request Details:</h4>
                      <div className="space-y-2 text-body-sm">
                        <div className="flex justify-between">
                          <span>Start Date:</span>
                          <span className="font-medium">{vacationDates.from.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>End Date:</span>
                          <span className="font-medium">{vacationDates.to.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Days:</span>
                          <span className="font-medium">{calculateDays()} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Weekdays Only:</span>
                          <span className="font-medium">{calculateWeekdays()} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remaining After:</span>
                          <span className="font-medium">{25 - calculateWeekdays()} days</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Reason for Leave:</Label>
                      <textarea 
                        className="w-full p-3 border border-[var(--color-interaction-border-input)] rounded-m resize-none"
                        rows={3}
                        placeholder="Optional: Describe the reason for your vacation request"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Emergency Contact:</Label>
                      <input 
                        type="text"
                        className="w-full p-2 border border-[var(--color-interaction-border-input)] rounded-m"
                        placeholder="Name and phone number"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Submit Request</Button>
                      <Button variant="ghost" onClick={() => setVacationDates(undefined)}>
                        Clear
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--color-text-secondary)]">
                    <Icon name={CalendarDays} size="l" className="mx-auto mb-2" />
                    <p>Select your vacation dates to see the summary</p>
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

// Project deadline tracker
export const ProjectDeadlines: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date>()
    
    const projects = [
      { 
        name: 'Website Redesign', 
        deadline: new Date(2024, 2, 20), 
        status: 'in-progress',
        progress: 75 
      },
      { 
        name: 'Mobile App Launch', 
        deadline: new Date(2024, 2, 25), 
        status: 'planning',
        progress: 30 
      },
      { 
        name: 'Q1 Marketing Campaign', 
        deadline: new Date(2024, 2, 31), 
        status: 'review',
        progress: 90 
      },
      { 
        name: 'Database Migration', 
        deadline: new Date(2024, 3, 5), 
        status: 'in-progress',
        progress: 60 
      },
    ]

    const getProjectsForDate = (date: Date) => {
      return projects.filter(project => 
        project.deadline.toDateString() === date.toDateString()
      )
    }

    const hasDeadline = (date: Date) => {
      return projects.some(project => 
        project.deadline.toDateString() === date.toDateString()
      )
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'in-progress': return 'var(--color-background-info-subtle)'
        case 'planning': return 'var(--color-background-warning-subtle)'
        case 'review': return 'var(--color-background-success-subtle)'
        default: return 'var(--color-background-neutral-subtlest)'
      }
    }

    const getStatusAppearance = (status: string) => {
      return status === 'review' ? 'outline' : undefined
    }

    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Project Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasDeadline: hasDeadline
                  }}
                  modifiersStyles={{
                    hasDeadline: {
                      backgroundColor: 'var(--color-background-error-subtle)',
                      color: 'var(--color-text-error-bold)',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-m border border-[var(--color-border-primary-subtle)]"
                />
                
                <div className="mt-4 text-caption-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--color-background-error-subtle)]"></div>
                    <span>Project deadlines</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">
                  {selectedDate && hasDeadline(selectedDate) 
                    ? `Deadlines - ${selectedDate.toLocaleDateString()}`
                    : 'All Upcoming Deadlines'
                  }
                </Label>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {(selectedDate && hasDeadline(selectedDate) 
                    ? getProjectsForDate(selectedDate) 
                    : projects
                  ).map((project, index) => (
                    <div key={index} className="p-4 border border-[var(--color-border-primary-subtle)] rounded-m">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-body-md font-medium">{project.name}</h4>
                        <Badge appearance={getStatusAppearance(project.status)} className="text-xs capitalize">
                          {project.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-body-sm text-[var(--color-text-secondary)]">
                          <Icon name={CalendarIcon} size="s" />
                          <span>Due: {project.deadline.toLocaleDateString()}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-body-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-[var(--color-background-neutral-subtlest)] rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${project.progress}%`,
                                backgroundColor: getStatusColor(project.status)
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="s" variant="ghost">
                            <Icon name={Eye} size="s" className="mr-1" />
                            View
                          </Button>
                          <Button size="s" variant="ghost">
                            <Icon name={Edit} size="s" className="mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {selectedDate && !hasDeadline(selectedDate) && (
                    <div className="text-center py-8 text-[var(--color-text-secondary)]">
                      <Icon name={CalendarX} size="l" className="mx-auto mb-2" />
                      <p>No deadlines on this date</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Availability calendar for booking
export const AvailabilityBooking: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date>()
    
    const availability = {
      [new Date(2024, 2, 20).toDateString()]: ['09:00', '10:00', '14:00', '15:00'],
      [new Date(2024, 2, 21).toDateString()]: ['11:00', '13:00', '16:00'],
      [new Date(2024, 2, 22).toDateString()]: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      [new Date(2024, 2, 25).toDateString()]: ['10:00', '14:00'],
      [new Date(2024, 2, 26).toDateString()]: ['09:00', '11:00', '13:00', '15:00', '16:00'],
    }

    const hasAvailability = (date: Date) => {
      const dateStr = date.toDateString()
      return availability[dateStr] && availability[dateStr].length > 0
    }

    const getAvailableSlots = (date: Date) => {
      const dateStr = date.toDateString()
      return availability[dateStr] || []
    }

    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Book a Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    date < new Date() || 
                    !hasAvailability(date)
                  }
                  modifiers={{
                    available: hasAvailability
                  }}
                  modifiersStyles={{
                    available: {
                      backgroundColor: 'var(--color-background-success-subtle)',
                      color: 'var(--color-text-success-bold)',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-m border border-[var(--color-border-primary-subtle)]"
                />
                
                <div className="mt-4 space-y-2 text-caption-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--color-background-success-subtle)]"></div>
                    <span>Available dates</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">
                    Only available dates can be selected
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-body-medium-sm font-medium mb-3 block">
                  {selectedDate ? `Available Times - ${selectedDate.toLocaleDateString()}` : 'Select a date first'}
                </Label>
                
                {selectedDate ? (
                  <div className="space-y-4">
                    {hasAvailability(selectedDate) ? (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          {getAvailableSlots(selectedDate).map((time) => (
                            <Button
                              key={time}
                              variant="ghost"
                              size="s"
                              className="justify-center"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                        
                        <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-info-bold)] rounded-m">
                          <h4 className="text-body-sm font-medium mb-2">Session Details:</h4>
                          <ul className="text-body-sm space-y-1">
                            <li>• Duration: 60 minutes</li>
                            <li>• Location: Virtual (Zoom link will be provided)</li>
                            <li>• Price: $150</li>
                            <li>• Cancellation: Free up to 24 hours before</li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-[var(--color-text-secondary)]">
                        <Icon name={CalendarX} size="l" className="mx-auto mb-2" />
                        <p>No available times on this date</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--color-text-secondary)]">
                    <Icon name={CalendarIcon} size="l" className="mx-auto mb-2" />
                    <p>Select a date to view available time slots</p>
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

// Custom styling and multiple months
export const CustomCalendar: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([])
    
    const specialDates = {
      holidays: [
        new Date(2024, 2, 17), // St. Patrick's Day
        new Date(2024, 3, 1),  // April Fool's Day
      ],
      birthdays: [
        new Date(2024, 2, 15),
        new Date(2024, 2, 28),
      ],
      meetings: [
        new Date(2024, 2, 18),
        new Date(2024, 2, 22),
        new Date(2024, 3, 3),
      ]
    }

    const isHoliday = (date: Date) => 
      specialDates.holidays.some(holiday => holiday.toDateString() === date.toDateString())
    
    const isBirthday = (date: Date) => 
      specialDates.birthdays.some(birthday => birthday.toDateString() === date.toDateString())
    
    const isMeeting = (date: Date) => 
      specialDates.meetings.some(meeting => meeting.toDateString() === date.toDateString())

    return (
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center">
          <h3 className="text-heading-md font-semibold mb-2">Event Calendar</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Track holidays, birthdays, and meetings
          </p>
        </div>

        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={setSelectedDates}
          numberOfMonths={3}
          modifiers={{
            holiday: isHoliday,
            birthday: isBirthday,
            meeting: isMeeting
          }}
          modifiersStyles={{
            holiday: {
              backgroundColor: 'var(--color-background-error-subtle)',
              color: 'var(--color-text-error-bold)',
              fontWeight: 'bold'
            },
            birthday: {
              backgroundColor: 'var(--color-background-warning-subtle)',
              color: 'var(--color-text-warning-bold)',
              fontWeight: 'bold'
            },
            meeting: {
              backgroundColor: 'var(--color-background-information-subtle)',
              color: 'var(--color-text-info-bold)',
              fontWeight: 'bold'
            }
          }}
          className="rounded-m border border-[var(--color-border-primary-subtle)]"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-caption-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[var(--color-background-error-subtle)]"></div>
            <span>Holidays</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[var(--color-background-warning-subtle)]"></div>
            <span>Birthdays</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[var(--color-background-information-subtle)]"></div>
            <span>Meetings</span>
          </div>
        </div>

        {selectedDates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Dates ({selectedDates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date, index) => (
                  <Badge key={index}>
                    {date.toLocaleDateString()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  },
}