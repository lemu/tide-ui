import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import type { DateRange } from "react-day-picker";

export function CalendarPreview() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [disabledDate, setDisabledDate] = useState<Date | undefined>();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Selection Modes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Selection Modes</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2 xl:grid-cols-3">
          {/* Single Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Single Date</CardTitle>
              <CardDescription>
                Select a single date from the calendar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected:</strong> {singleDate ? format(singleDate, "PPP") : "None"}
              </div>
            </CardContent>
          </Card>

          {/* Multiple Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Dates</CardTitle>
              <CardDescription>
                Select multiple individual dates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Calendar
                mode="multiple"
                selected={multipleDates}
                onSelect={setMultipleDates}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected:</strong> {multipleDates.length} date{multipleDates.length !== 1 ? 's' : ''}
                {multipleDates.length > 0 && (
                  <div className="mt-[var(--space-xsm)]">
                    {multipleDates.map((date, index) => (
                      <div key={index} className="text-caption-sm">
                        {format(date, "MMM d, yyyy")}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Date Range Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Date Range</CardTitle>
              <CardDescription>
                Select a range of dates from start to end.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected Range:</strong>
                {dateRange?.from ? (
                  <div className="mt-[var(--space-xsm)]">
                    <div>From: {format(dateRange.from, "MMM d, yyyy")}</div>
                    {dateRange.to && (
                      <div>To: {format(dateRange.to, "MMM d, yyyy")}</div>
                    )}
                  </div>
                ) : (
                  " None"
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calendar Features */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Calendar Features</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
          {/* Disabled Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled Dates</CardTitle>
              <CardDescription>
                Calendar with past dates and weekends disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Calendar
                mode="single"
                selected={disabledDate}
                onSelect={setDisabledDate}
                disabled={[
                  { before: today },
                  { dayOfWeek: [0, 6] }
                ]}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <div className="space-y-[var(--space-xsm)]">
                  <div>• Past dates are disabled</div>
                  <div>• Weekends (Sat/Sun) are disabled</div>
                  <div><strong>Selected:</strong> {disabledDate ? format(disabledDate, "PPP") : "None"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multiple Months */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Months</CardTitle>
              <CardDescription>
                Display multiple months for easier navigation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Integration Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Compact Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Compact Display</CardTitle>
              <CardDescription>
                Smaller calendar for inline use or limited space.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-md border border-[var(--color-border-primary-subtle)] scale-90 origin-top-left"
                classNames={{
                  month_caption: "text-body-sm",
                  day_button: "h-7 w-7 text-caption-sm",
                  weekday: "h-7 w-7 text-caption-xsm"
                }}
              />
            </CardContent>
          </Card>

          {/* Calendar with Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Actions</CardTitle>
              <CardDescription>
                Calendar with action buttons for common operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex gap-[var(--space-sm)]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSingleDate(today)}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSingleDate(tomorrow)}
                >
                  Tomorrow
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSingleDate(undefined)}
                >
                  Clear
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Event Booking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Event Booking</CardTitle>
              <CardDescription>
                Calendar for selecting event or appointment dates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <Icon name="calendar" size="sm" />
                <span>Select your preferred date</span>
              </div>
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={setSingleDate}
                disabled={{ before: today }}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              {singleDate && (
                <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="check-circle" size="sm" color="success" />
                    <div>
                      <div className="text-body-medium-sm">Date Selected</div>
                      <div className="text-body-sm text-[var(--color-text-secondary)]">
                        {format(singleDate, "EEEE, MMMM do, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vacation Planner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Vacation Planner</CardTitle>
              <CardDescription>
                Range selection for planning trips and vacations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <Icon name="plane" size="sm" />
                <span>Select your travel dates</span>
              </div>
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                disabled={{ before: today }}
                numberOfMonths={2}
                className="rounded-md border border-[var(--color-border-primary-subtle)]"
              />
              {dateRange?.from && (
                <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                  <div className="space-y-[var(--space-sm)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="calendar-days" size="sm" color="brand" />
                      <span className="text-body-medium-sm">Trip Duration</span>
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">
                      <div>Check-in: {format(dateRange.from, "MMM d, yyyy")}</div>
                      {dateRange.to && (
                        <div>Check-out: {format(dateRange.to, "MMM d, yyyy")}</div>
                      )}
                      {dateRange.to && (
                        <div className="mt-[var(--space-xsm)] font-medium">
                          {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} nights
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="check" size="sm" color="success" />
                <span>Good Examples</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use appropriate selection modes for the use case</li>
                <li>• Disable invalid dates (past dates for bookings)</li>
                <li>• Provide clear visual feedback for selections</li>
                <li>• Include action buttons for common operations</li>
                <li>• Show selected dates in a readable format</li>
                <li>• Use multiple months for range selections</li>
                <li>• Ensure keyboard navigation works properly</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="x" size="sm" color="error" />
                <span>Avoid</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Don't allow invalid date selections without clear feedback</li>
                <li>• Avoid tiny calendar sizes that are hard to interact with</li>
                <li>• Don't use range selection for single date needs</li>
                <li>• Avoid unclear selection states or visual feedback</li>
                <li>• Don't forget to handle edge cases like leap years</li>
                <li>• Avoid poor color contrast for accessibility</li>
                <li>• Don't neglect mobile touch interaction testing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}