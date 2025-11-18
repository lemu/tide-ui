import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from '../components/fundamental/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Badge } from '../components/fundamental/badge'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'

const meta: Meta<typeof ScrollArea> = {
  title: 'NPM • Fundamental/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

// Basic scroll area
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <ScrollArea className="h-48 w-full rounded-md border p-4">
        <div className="space-y-2">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="text-body-sm">
              This is item {i + 1} in a scrollable area. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

// Horizontal scroll
export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="shrink-0 w-32 h-20 bg-[var(--color-background-neutral-subtle)] rounded flex items-center justify-center"
            >
              <span className="text-body-sm">Item {i + 1}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
}

// Chat messages
export const ChatMessages: Story = {
  render: () => (
    <div className="w-96">
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Chat Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64 px-4 pb-4">
            <div className="space-y-4">
              {[
                { user: 'Alice', message: 'Hey everyone! How is the project going?', time: '10:30 AM' },
                { user: 'Bob', message: 'Going well! Just finished the UI components.', time: '10:32 AM' },
                { user: 'Charlie', message: 'Great work on the design system! The new components look amazing.', time: '10:35 AM' },
                { user: 'Alice', message: 'Thanks! Should we review the progress tomorrow?', time: '10:40 AM' },
                { user: 'Bob', message: 'Sounds good. I\'ll prepare the demo.', time: '10:42 AM' },
                { user: 'David', message: 'I can join the review as well. What time works best?', time: '10:45 AM' },
                { user: 'Charlie', message: 'How about 2 PM? That should give us enough time to prepare.', time: '10:47 AM' },
                { user: 'Alice', message: 'Perfect! I\'ll send out the calendar invite.', time: '10:50 AM' },
                { user: 'Bob', message: 'Looking forward to it! The new features are really coming together.', time: '10:52 AM' },
                { user: 'David', message: 'Agreed! This is going to be a great release.', time: '10:55 AM' },
              ].map((msg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-medium">{msg.user}</span>
                    <span className="text-caption-sm text-[var(--color-text-secondary)]">{msg.time}</span>
                  </div>
                  <p className="text-body-sm bg-[var(--color-background-neutral-subtle)] rounded-lg p-3">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  ),
}

// Code preview
export const CodePreview: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="code" size="sm" />
            Code Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <pre className="p-4 text-caption-sm bg-[var(--color-background-neutral)] text-[var(--color-text-primary)]">
{`import React from 'react'
import { ScrollArea } from './components/ui/scroll-area'

export function MyComponent() {
  return (
    <ScrollArea className="h-48 w-full rounded-md border p-4">
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="p-2 border rounded">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="flex gap-2 mt-2">
              {item.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} appearance="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

// Example usage with data
const data = [
  {
    title: "Component Library",
    description: "A comprehensive set of UI components built with React and TypeScript.",
    tags: ["React", "TypeScript", "UI", "Components"]
  },
  {
    title: "Design System",
    description: "Consistent design patterns and guidelines for building modern applications.",
    tags: ["Design", "System", "Guidelines", "Patterns"]
  },
  // ... more items
]`}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  ),
}

// Sidebar navigation
export const SidebarNavigation: Story = {
  render: () => (
    <div className="w-64">
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-80">
            <div className="p-4 space-y-1">
              {[
                { icon: 'home', label: 'Dashboard', count: null },
                { icon: 'users', label: 'Team Members', count: 12 },
                { icon: 'folder', label: 'Projects', count: 8 },
                { icon: 'file-text', label: 'Documents', count: 24 },
                { icon: 'calendar', label: 'Calendar', count: 3 },
                { icon: 'message-circle', label: 'Messages', count: 7 },
                { icon: 'bell', label: 'Notifications', count: 15 },
                { icon: 'settings', label: 'Settings', count: null },
                { icon: 'bar-chart', label: 'Analytics', count: null },
                { icon: 'help-circle', label: 'Help & Support', count: null },
                { icon: 'user', label: 'Profile', count: null },
                { icon: 'shield', label: 'Security', count: 2 },
                { icon: 'credit-card', label: 'Billing', count: null },
                { icon: 'download', label: 'Downloads', count: 5 },
                { icon: 'archive', label: 'Archive', count: 18 },
                { icon: 'trash-2', label: 'Trash', count: 3 },
              ].map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start h-auto p-2"
                >
                  <Icon name={item.icon as any} size="sm" className="mr-2" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <Badge className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  ),
}

// Tags list
export const TagsList: Story = {
  render: () => (
    <div className="w-96">
      <Card>
        <CardHeader>
          <CardTitle>Available Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="flex flex-wrap gap-2">
              {[
                'React', 'TypeScript', 'JavaScript', 'Next.js', 'Vue.js', 'Angular',
                'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI',
                'Go', 'Rust', 'Java', 'Spring', 'C#', '.NET', 'PHP', 'Laravel',
                'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST',
                'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform',
                'Jenkins', 'GitHub Actions', 'CI/CD', 'Testing', 'Jest', 'Cypress',
                'Webpack', 'Vite', 'Rollup', 'Babel', 'ESLint', 'Prettier',
                'Tailwind CSS', 'Styled Components', 'SASS', 'CSS Modules',
                'Design System', 'Storybook', 'Figma', 'Accessibility',
              ].map((tag, i) => (
                <Badge key={i} appearance="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  ),
}