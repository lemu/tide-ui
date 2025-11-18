import type { Meta, StoryObj } from '@storybook/react'
import {
  ActivityLog,
  ActivityLogItem,
  ActivityLogSeparator,
  ActivityLogHeader,
  ActivityLogContent,
  ActivityLogDescription,
  ActivityLogTime,
  ActivityLogChevron,
  ActivityLogValue,
} from '../components/product/activity-log'
import { Avatar, AvatarImage, AvatarFallback } from '../components/fundamental/avatar'
import { AvatarGroup } from '../components/fundamental/avatar-group'
import { Icon } from '../components/fundamental/icon'
import { FixtureStatus } from '../components/product/fixture-status'
import { Card, CardContent } from '../components/fundamental/card'
import { Badge } from '../components/fundamental/badge'

const meta: Meta<typeof ActivityLog> = {
  title: 'NPM • Product Components/ActivityLog',
  component: ActivityLog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ActivityLog>

export default meta
type Story = StoryObj<typeof meta>

// Story 1: Default - Simple timeline with non-collapsible items
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the project</span>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>uploaded 5 files</span>
              <ActivityLogTime>Jul 4, 2025 at 12:43</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>left a comment</span>
              <ActivityLogTime>Jul 4, 2025 at 14:22</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 2: Time-Based Separators - Automatic separator insertion
export const TimeBasedSeparators: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog separatorThreshold={3600000}> {/* 1 hour threshold */}
        <ActivityLogItem timestamp={new Date('2025-07-04T12:37:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the project</span>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-04T12:43:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>uploaded files</span>
              <ActivityLogTime>Jul 4, 2025 at 12:43</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Separator auto-inserted here (2 days later) */}
        <ActivityLogItem timestamp={new Date('2025-07-06T13:36:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent a message</span>
              <ActivityLogTime>Jul 6, 2025 at 13:36</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-06T15:52:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>replied to message</span>
              <ActivityLogTime>Jul 6, 2025 at 15:52</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Separator auto-inserted here (4 days later) */}
        <ActivityLogItem timestamp={new Date('2025-07-10T14:28:00')}>
          <ActivityLogHeader>
            <Icon name="shield-check" size="md" color="primary" />
            <ActivityLogDescription>
              <span>Compliance check completed successfully</span>
              <ActivityLogTime>Jul 10, 2025 at 14:28</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 3: Collapsible Items
export const CollapsibleItems: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem collapsible defaultOpen={false}>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created</span>
              <FixtureStatus value="order-draft" />
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
          </ActivityLogContent>
        </ActivityLogItem>

        <ActivityLogItem collapsible defaultOpen={true}>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <FixtureStatus value="negotiation-indicative-bid" />
              <ActivityLogTime>Jul 6, 2025 at 13:36</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
          </ActivityLogContent>
        </ActivityLogItem>

        <ActivityLogItem collapsible defaultOpen={false}>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>answered with</span>
              <FixtureStatus value="negotiation-indicative-offer" />
              <ActivityLogTime>Jul 6, 2025 at 15:52</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
          </ActivityLogContent>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 4: Rich Content (Matches Figma design)
export const RichContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog separatorThreshold={86400000}> {/* 24 hours */}
        <ActivityLogItem timestamp={new Date('2025-07-04T12:37:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created</span>
              <FixtureStatus value="order-draft" />
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-04T12:43:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <FixtureStatus value="order-distributed" />
              <span>the order to the market.</span>
              <ActivityLogTime>Jul 4, 2025 at 12:43</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Auto separator (2 days gap) */}
        <ActivityLogItem timestamp={new Date('2025-07-06T13:36:00')}>
          <ActivityLogHeader>
            <AvatarGroup size="xxs">
              <Avatar size="xxs">
                <AvatarFallback size="xxs">IC</AvatarFallback>
              </Avatar>
              <Avatar size="xxs" type="organization">
                <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <FixtureStatus value="negotiation-indicative-bid" />
              <ActivityLogTime>Jul 6, 2025 at 13:36</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-06T15:52:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <Icon name="arrow-right" size="sm" color="tertiary" />
              <AvatarGroup size="xxs">
                <Avatar size="xxs">
                  <AvatarFallback size="xxs">IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs" type="organization">
                  <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>answered with</span>
              <FixtureStatus value="negotiation-indicative-offer" />
              <ActivityLogTime>Jul 6, 2025 at 15:52</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-06T16:14:00')}>
          <ActivityLogHeader>
            <AvatarGroup size="xxs">
              <Avatar size="xxs">
                <AvatarFallback size="xxs">IC</AvatarFallback>
              </Avatar>
              <Avatar size="xxs" type="organization">
                <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>sent</span>
              <FixtureStatus value="negotiation-firm-bid" />
              <ActivityLogTime>Jul 6, 2025 at 16:14</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Auto separator (1 day gap) */}
        <ActivityLogItem timestamp={new Date('2025-07-07T07:53:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <AvatarGroup size="xxs">
                <Avatar size="xxs">
                  <AvatarFallback size="xxs">IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs" type="organization">
                  <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>accepted firm bid. Offer is now</span>
              <FixtureStatus value="negotiation-firm" />
              <ActivityLogTime>Jul 7, 2025 at 7:53</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem timestamp={new Date('2025-07-07T07:55:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <AvatarGroup size="xxs">
                <Avatar size="xxs">
                  <AvatarFallback size="xxs">IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs" type="organization">
                  <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>went</span>
              <FixtureStatus value="negotiation-on-subs" />
              <ActivityLogTime>Jul 7, 2025 at 7:55</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Auto separator (3 days gap) */}
        <ActivityLogItem timestamp={new Date('2025-07-10T14:28:00')}>
          <ActivityLogHeader>
            <Icon name="shield-check" size="md" color="primary" />
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Compliance check has finished with the result</span>
              <Badge intent="success" size="sm">Compliant</Badge>
              <ActivityLogTime>Jul 10, 2025 at 14:28</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        {/* Auto separator (2 days gap) */}
        <ActivityLogItem timestamp={new Date('2025-07-12T07:02:00')}>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <Icon name="arrow-left-right" size="sm" color="tertiary" />
              <AvatarGroup size="xxs">
                <Avatar size="xxs">
                  <AvatarFallback size="xxs">IC</AvatarFallback>
                </Avatar>
                <Avatar size="xxs" type="organization">
                  <AvatarFallback size="xxs" type="organization" variant="violet">AC</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>set negotiation as</span>
              <FixtureStatus value="negotiation-fixed" />
              <ActivityLogTime>Jul 12, 2025 at 7:02</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 5: Manual Separators
export const ManualSeparators: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>started the project</span>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>added initial files</span>
              <ActivityLogTime>Jul 4, 2025 at 12:43</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogSeparator />

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>joined the project</span>
              <ActivityLogTime>Jul 6, 2025 at 13:36</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>made first contribution</span>
              <ActivityLogTime>Jul 6, 2025 at 15:52</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogSeparator />

        <ActivityLogItem>
          <ActivityLogHeader>
            <Icon name="check-circle" size="md" color="primary" />
            <ActivityLogDescription>
              <span>Project completed successfully</span>
              <ActivityLogTime>Jul 12, 2025 at 7:02</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 6: Custom Content in Expandable Sections
export const CustomContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem collapsible defaultOpen={true}>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>deployed new version</span>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
              <div className="flex gap-2 text-caption-xsm text-[var(--color-text-tertiary)]">
                <span>Build: #1234</span>
                <span>•</span>
                <span>Duration: 2m 34s</span>
                <span>•</span>
                <span className="text-[var(--color-text-success-bold)]">Success</span>
              </div>
            </div>
          </ActivityLogContent>
        </ActivityLogItem>

        <ActivityLogItem collapsible>
          <ActivityLogHeader asCollapsibleTrigger>
            <Icon name="alert-circle" size="md" color="primary" />
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Build warning detected</span>
              <ActivityLogTime>Jul 4, 2025 at 12:45</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
          </ActivityLogContent>
        </ActivityLogItem>

        <ActivityLogItem collapsible>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>fixed the warnings</span>
              <ActivityLogTime>Jul 4, 2025 at 14:22</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
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
          </ActivityLogContent>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 7: Mixed Collapsible and Non-Collapsible
export const MixedItems: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>created the repository</span>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem collapsible>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>pushed 5 commits</span>
              <ActivityLogTime>Jul 4, 2025 at 12:43</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
            <div className="space-y-1 text-body-sm pl-[var(--space-lg)]">
              <div className="text-[var(--color-text-secondary)]">Initial commit</div>
              <div className="text-[var(--color-text-secondary)]">Add project structure</div>
              <div className="text-[var(--color-text-secondary)]">Setup development environment</div>
              <div className="text-[var(--color-text-secondary)]">Add README documentation</div>
              <div className="text-[var(--color-text-secondary)]">Configure CI/CD pipeline</div>
            </div>
          </ActivityLogContent>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Icon name="users" size="md" color="primary" />
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>was added as a collaborator</span>
              <ActivityLogTime>Jul 6, 2025 at 13:36</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem collapsible>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>opened pull request #1</span>
              <ActivityLogTime>Jul 6, 2025 at 15:52</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
            <Card>
              <CardContent className="p-[var(--space-md)] space-y-2">
                <div className="text-body-medium-sm">Feature: Add user authentication</div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Implements OAuth2 authentication flow with support for Google and GitHub providers
                </p>
              </CardContent>
            </Card>
          </ActivityLogContent>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}

// Story 8: Value Changes - Shows changed values with ActivityLogValue
export const ValueChanges: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ActivityLog>
        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>changed Charterer from</span>
              <ActivityLogValue>Acme Ltd</ActivityLogValue>
              <span>to</span>
              <ActivityLogValue>ShipCo Ltd</ActivityLogValue>
              <ActivityLogTime>Jul 4, 2025 at 12:37</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>updated Freight Rate from</span>
              <ActivityLogValue>24.50 $/mt</ActivityLogValue>
              <span>to</span>
              <ActivityLogValue>25.12 $/mt</ActivityLogValue>
              <ActivityLogTime>Jul 4, 2025 at 14:22</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem>
          <ActivityLogHeader>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">RL</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Rafał Lemieszewski</span>
              <span>changed Vessel name from</span>
              <ActivityLogValue>Maersk Boston</ActivityLogValue>
              <span>to</span>
              <ActivityLogValue>Ever Given</ActivityLogValue>
              <ActivityLogTime>Jul 6, 2025 at 9:15</ActivityLogTime>
            </ActivityLogDescription>
          </ActivityLogHeader>
        </ActivityLogItem>

        <ActivityLogItem collapsible>
          <ActivityLogHeader asCollapsibleTrigger>
            <Avatar size="xxs">
              <AvatarFallback size="xxs">IC</AvatarFallback>
            </Avatar>
            <ActivityLogDescription>
              <span className="text-body-medium-sm">Ivy Chu</span>
              <span>updated multiple fields</span>
              <ActivityLogTime>Jul 6, 2025 at 11:42</ActivityLogTime>
            </ActivityLogDescription>
            <ActivityLogChevron />
          </ActivityLogHeader>
          <ActivityLogContent>
            <div className="space-y-2 text-body-sm">
              <div className="flex items-center gap-[var(--space-xsm)]">
                <span className="text-[var(--color-text-secondary)]">Load Port:</span>
                <ActivityLogValue>Santos, BR</ActivityLogValue>
                <Icon name="arrow-right" size="sm" color="tertiary" />
                <ActivityLogValue>Tubarão, BR</ActivityLogValue>
              </div>
              <div className="flex items-center gap-[var(--space-xsm)]">
                <span className="text-[var(--color-text-secondary)]">Cargo:</span>
                <ActivityLogValue>150,000 mt</ActivityLogValue>
                <Icon name="arrow-right" size="sm" color="tertiary" />
                <ActivityLogValue>160,000 mt</ActivityLogValue>
              </div>
              <div className="flex items-center gap-[var(--space-xsm)]">
                <span className="text-[var(--color-text-secondary)]">Laycan:</span>
                <ActivityLogValue>Oct 25-28, 2025</ActivityLogValue>
                <Icon name="arrow-right" size="sm" color="tertiary" />
                <ActivityLogValue>Oct 27-30, 2025</ActivityLogValue>
              </div>
            </div>
          </ActivityLogContent>
        </ActivityLogItem>
      </ActivityLog>
    </div>
  ),
}
