import type { Meta, StoryObj } from '@storybook/react'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineHeader,
  TimelineContent,
  TimelineDescription,
  TimelineTime,
  TimelineChevron,
} from '../components/ui/timeline'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Icon } from '../components/ui/icon'
import { Status } from '../components/ui/status'
import { Card, CardContent } from '../components/ui/card'

const meta: Meta<typeof Timeline> = {
  title: 'NPM • Product Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

// Story 1: Default - Simple timeline with non-collapsible items
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the project</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>uploaded 5 files</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:43</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>left a comment</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 14:22</TimelineTime>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 2: Time-Based Separators - Automatic separator insertion
export const TimeBasedSeparators: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline separatorThreshold={3600000}> {/* 1 hour threshold */}
        <TimelineItem timestamp={new Date('2025-07-04T12:37:00')}>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the project</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-04T12:43:00')}>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>uploaded files</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:43</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        {/* Separator auto-inserted here (2 days later) */}
        <TimelineItem timestamp={new Date('2025-07-06T13:36:00')}>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent a message</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 13:36</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-06T15:52:00')}>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>replied to message</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 15:52</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        {/* Separator auto-inserted here (4 days later) */}
        <TimelineItem timestamp={new Date('2025-07-10T14:28:00')}>
          <TimelineHeader>
            <Icon name="shield-check" size="md" />
            <TimelineDescription>
              <span>Compliance check completed successfully</span>
            </TimelineDescription>
            <TimelineTime>Jul 10, 2025 at 14:28</TimelineTime>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 3: Collapsible Items
export const CollapsibleItems: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem collapsible defaultOpen={false}>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created</span>
              <Status value="order-draft" />
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Order ID:</span>
                    <span className="text-body-medium-sm">#12345</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Quantity:</span>
                    <span className="text-body-medium-sm">1,000 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Price:</span>
                    <span className="text-body-medium-sm">$45.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem collapsible defaultOpen={true}>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <Status value="negotiation-indicative-bid" />
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 13:36</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Bid Price:</span>
                    <span className="text-body-medium-sm">$44.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Valid Until:</span>
                    <span className="text-body-medium-sm">Jul 7, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Notes:</span>
                    <span className="text-body-medium-sm">Bulk discount applied</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem collapsible defaultOpen={false}>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>answered with</span>
              <Status value="negotiation-indicative-offer" />
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 15:52</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Counter Offer:</span>
                    <span className="text-body-medium-sm">$45.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Comments:</span>
                    <span className="text-body-medium-sm">Meeting halfway</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 4: Rich Content (Matches Figma design)
export const RichContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline separatorThreshold={86400000}> {/* 24 hours */}
        <TimelineItem timestamp={new Date('2025-07-04T12:37:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created</span>
              <Status value="order-draft" />
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-04T12:43:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <Status value="order-distributed" />
              <span>the order to the market.</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:43</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        {/* Auto separator (2 days gap) */}
        <TimelineItem timestamp={new Date('2025-07-06T13:36:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[var(--space-xsm)]">
              <Avatar size="xxs">
                <AvatarFallback>IC</AvatarFallback>
              </Avatar>
              <Avatar size="xxs">
                <AvatarFallback variant="violet">AC</AvatarFallback>
              </Avatar>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <Status value="negotiation-indicative-bid" />
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 13:36</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-06T15:52:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[2px]">
              <Avatar size="xxs">
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <Icon name="arrow-right" size="sm" color="tertiary" />
              <div className="flex items-center gap-[var(--space-xsm)]">
                <Avatar size="xxs">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs">
                  <AvatarFallback variant="violet">AC</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>answered with</span>
              <Status value="negotiation-indicative-offer" />
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 15:52</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-06T16:14:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[var(--space-xsm)]">
              <Avatar size="xxs">
                <AvatarFallback>IC</AvatarFallback>
              </Avatar>
              <Avatar size="xxs">
                <AvatarFallback variant="violet">AC</AvatarFallback>
              </Avatar>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <Status value="negotiation-firm-bid" />
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 16:14</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        {/* Auto separator (1 day gap) */}
        <TimelineItem timestamp={new Date('2025-07-07T07:53:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[2px]">
              <Avatar size="xxs">
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <div className="flex items-center gap-[var(--space-xsm)]">
                <Avatar size="xxs">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs">
                  <AvatarFallback variant="violet">AC</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>accepted firm bid. Offer is now</span>
              <Status value="negotiation-firm" />
            </TimelineDescription>
            <TimelineTime>Jul 7, 2025 at 7:53</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem timestamp={new Date('2025-07-07T07:55:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[2px]">
              <Avatar size="xxs">
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <div className="flex items-center gap-[var(--space-xsm)]">
                <Avatar size="xxs">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs">
                  <AvatarFallback variant="violet">AC</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>went</span>
              <Status value="on-subs" />
            </TimelineDescription>
            <TimelineTime>Jul 7, 2025 at 7:55</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        {/* Auto separator (3 days gap) */}
        <TimelineItem timestamp={new Date('2025-07-10T14:28:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Icon name="shield-check" size="md" />
            <TimelineDescription>
              <span className="text-body-medium-sm">Compliance check has finished with the result</span>
              <div className="inline-flex items-center gap-[var(--space-xsm)] bg-[var(--color-background-success-subtle)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">
                <Icon name="circle-check-big" size="sm" color="success" />
                <span className="text-body-medium-sm text-[var(--color-text-success-bold)]">compliant</span>
              </div>
            </TimelineDescription>
            <TimelineTime>Jul 10, 2025 at 14:28</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>

        {/* Auto separator (2 days gap) */}
        <TimelineItem timestamp={new Date('2025-07-12T07:02:00')} collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <div className="flex items-center gap-[2px]">
              <Avatar size="xxs">
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <div className="flex items-center gap-[var(--space-xsm)]">
                <Avatar size="xxs">
                  <AvatarFallback>IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs">
                  <AvatarFallback variant="violet">AC</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>set negotiation as</span>
              <Status value="negotiation-firm-offer-fixed" />
            </TimelineDescription>
            <TimelineTime>Jul 12, 2025 at 7:02</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 5: Manual Separators
export const ManualSeparators: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>started the project</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>added initial files</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:43</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineSeparator />

        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>joined the project</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 13:36</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>made first contribution</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 15:52</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineSeparator />

        <TimelineItem>
          <TimelineHeader>
            <Icon name="check-circle" size="md" color="success" />
            <TimelineDescription>
              <span>Project completed successfully</span>
            </TimelineDescription>
            <TimelineTime>Jul 12, 2025 at 7:02</TimelineTime>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 6: Custom Content in Expandable Sections
export const CustomContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem collapsible defaultOpen={true}>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>deployed new version</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-[var(--space-md)]">
                  <div className="space-y-2">
                    <div className="text-body-medium-sm">Version 2.1.0</div>
                    <ul className="space-y-1 text-body-sm text-[var(--color-text-secondary)]">
                      <li className="flex items-start gap-2">
                        <Icon name="check" size="sm" color="success" className="mt-0.5 shrink-0" />
                        <span>Added new Timeline component</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check" size="sm" color="success" className="mt-0.5 shrink-0" />
                        <span>Fixed dark mode color issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="check" size="sm" color="success" className="mt-0.5 shrink-0" />
                        <span>Improved accessibility across all components</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-2 text-caption-sm text-[var(--color-text-tertiary)]">
                <span>Build: #1234</span>
                <span>•</span>
                <span>Duration: 2m 34s</span>
                <span>•</span>
                <span className="text-[var(--color-text-success-bold)]">Success</span>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Icon name="alert-circle" size="md" color="warning" />
            <TimelineDescription>
              <span className="text-body-medium-sm">Build warning detected</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:45</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)] space-y-2">
                <div className="text-body-sm">
                  <span className="text-[var(--color-text-warning-bold)]">Warning:</span>
                  <span className="text-[var(--color-text-secondary)] ml-1">
                    Deprecated API usage detected in 3 files
                  </span>
                </div>
                <div className="text-caption-sm font-mono text-[var(--color-text-tertiary)] bg-[var(--color-surface-secondary)] p-2 rounded-sm">
                  components/legacy-button.tsx:42
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>fixed the warnings</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 14:22</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="git-pull-request" size="sm" />
                    <span className="text-body-medium-sm">Pull Request #456</span>
                  </div>
                  <p className="text-[var(--color-text-secondary)]">
                    Updated deprecated API calls to use new methods
                  </p>
                  <div className="flex gap-4 text-caption-sm text-[var(--color-text-tertiary)] pt-2">
                    <span className="text-[var(--color-text-success-bold)]">+42</span>
                    <span className="text-[var(--color-text-error-bold)]">-38</span>
                    <span>3 files changed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}

// Story 7: Mixed Collapsible and Non-Collapsible
export const MixedItems: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Timeline>
        <TimelineItem>
          <TimelineHeader>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the repository</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:37</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>pushed 5 commits</span>
            </TimelineDescription>
            <TimelineTime>Jul 4, 2025 at 12:43</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <div className="space-y-1 text-body-sm pl-[var(--space-lg)]">
              <div className="text-[var(--color-text-secondary)]">Initial commit</div>
              <div className="text-[var(--color-text-secondary)]">Add project structure</div>
              <div className="text-[var(--color-text-secondary)]">Setup development environment</div>
              <div className="text-[var(--color-text-secondary)]">Add README documentation</div>
              <div className="text-[var(--color-text-secondary)]">Configure CI/CD pipeline</div>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineHeader>
            <Icon name="users" size="md" />
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>was added as a collaborator</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 13:36</TimelineTime>
          </TimelineHeader>
        </TimelineItem>

        <TimelineItem collapsible>
          <TimelineHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback>IC</AvatarFallback>
            </Avatar>
            <TimelineDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>opened pull request #1</span>
            </TimelineDescription>
            <TimelineTime>Jul 6, 2025 at 15:52</TimelineTime>
            <TimelineChevron />
          </TimelineHeader>
          <TimelineContent>
            <Card>
              <CardContent className="p-[var(--space-md)] space-y-2">
                <div className="text-body-medium-sm">Feature: Add user authentication</div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Implements OAuth2 authentication flow with support for Google and GitHub providers
                </p>
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  ),
}
