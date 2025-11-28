import type { Meta, StoryObj } from '@storybook/react'
import { BigTabs, BigTabsList, BigTabsTrigger, BigTabsContent } from '../components/in-progress/big-tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/fundamental/card'
import { Icon } from '../components/fundamental/icon'

const meta: Meta<typeof BigTabs> = {
  title: 'In Progress/BigTabs',
  component: BigTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A work-in-progress larger tabs component for future use. Built on Radix UI primitives.

**Note**: This component is still being developed and is not yet exported from the library.

## Features

- Single pill-style variant with gray container background
- Three sizes: sm, md (default), lg
- Optional icon support
- Full keyboard navigation
- Accessibility built-in via Radix UI
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
      description: 'The default active tab value',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
} satisfies Meta<typeof BigTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BigTabs defaultValue="account" className="w-[400px]">
      <BigTabsList className="grid w-full grid-cols-2">
        <BigTabsTrigger value="account">Account</BigTabsTrigger>
        <BigTabsTrigger value="password">Password</BigTabsTrigger>
      </BigTabsList>
      <BigTabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-md">Account content goes here.</p>
          </CardContent>
        </Card>
      </BigTabsContent>
      <BigTabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-md">Password content goes here.</p>
          </CardContent>
        </Card>
      </BigTabsContent>
    </BigTabs>
  ),
}

export const Simple: Story = {
  render: () => (
    <BigTabs defaultValue="tab1" className="w-[400px]">
      <BigTabsList>
        <BigTabsTrigger value="tab1">Tab 1</BigTabsTrigger>
        <BigTabsTrigger value="tab2">Tab 2</BigTabsTrigger>
        <BigTabsTrigger value="tab3">Tab 3</BigTabsTrigger>
      </BigTabsList>
      <BigTabsContent value="tab1" className="mt-4">
        <p className="text-body-md">Content for Tab 1. This is the first tab's content.</p>
      </BigTabsContent>
      <BigTabsContent value="tab2" className="mt-4">
        <p className="text-body-md">Content for Tab 2. This is the second tab's content.</p>
      </BigTabsContent>
      <BigTabsContent value="tab3" className="mt-4">
        <p className="text-body-md">Content for Tab 3. This is the third tab's content.</p>
      </BigTabsContent>
    </BigTabs>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div>
        <h3 className="text-heading-sm mb-4">Small Size</h3>
        <BigTabs defaultValue="tab1">
          <BigTabsList size="sm">
            <BigTabsTrigger size="sm" value="tab1">Tab 1</BigTabsTrigger>
            <BigTabsTrigger size="sm" value="tab2">Tab 2</BigTabsTrigger>
            <BigTabsTrigger size="sm" value="tab3">Tab 3</BigTabsTrigger>
          </BigTabsList>
          <BigTabsContent value="tab1" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab2" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab3" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </BigTabsContent>
        </BigTabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Medium Size (Default)</h3>
        <BigTabs defaultValue="tab1">
          <BigTabsList size="md">
            <BigTabsTrigger size="md" value="tab1">Tab 1</BigTabsTrigger>
            <BigTabsTrigger size="md" value="tab2">Tab 2</BigTabsTrigger>
            <BigTabsTrigger size="md" value="tab3">Tab 3</BigTabsTrigger>
          </BigTabsList>
          <BigTabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </BigTabsContent>
        </BigTabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Large Size</h3>
        <BigTabs defaultValue="tab1">
          <BigTabsList size="lg">
            <BigTabsTrigger size="lg" value="tab1">Tab 1</BigTabsTrigger>
            <BigTabsTrigger size="lg" value="tab2">Tab 2</BigTabsTrigger>
            <BigTabsTrigger size="lg" value="tab3">Tab 3</BigTabsTrigger>
          </BigTabsList>
          <BigTabsContent value="tab1" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab2" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </BigTabsContent>
          <BigTabsContent value="tab3" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </BigTabsContent>
        </BigTabs>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <BigTabs defaultValue="home" className="w-[600px]">
      <BigTabsList>
        <BigTabsTrigger
          value="home"
          icon={<Icon name="home" size="sm" />}
        >
          Home
        </BigTabsTrigger>
        <BigTabsTrigger
          value="notifications"
          icon={<Icon name="bell" size="sm" />}
        >
          Notifications
        </BigTabsTrigger>
        <BigTabsTrigger
          value="settings"
          icon={<Icon name="settings" size="sm" />}
        >
          Settings
        </BigTabsTrigger>
      </BigTabsList>
      <BigTabsContent value="home" className="mt-4">
        <p className="text-body-md">Home dashboard with overview and quick actions.</p>
      </BigTabsContent>
      <BigTabsContent value="notifications" className="mt-4">
        <p className="text-body-md">Your recent notifications and alerts.</p>
      </BigTabsContent>
      <BigTabsContent value="settings" className="mt-4">
        <p className="text-body-md">Application settings and preferences.</p>
      </BigTabsContent>
    </BigTabs>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <BigTabs defaultValue="available" className="w-[400px]">
      <BigTabsList>
        <BigTabsTrigger value="available">Available</BigTabsTrigger>
        <BigTabsTrigger value="disabled" disabled>
          Premium
        </BigTabsTrigger>
        <BigTabsTrigger value="another">Another</BigTabsTrigger>
      </BigTabsList>
      <BigTabsContent value="available" className="mt-4">
        <p className="text-body-md">This content is available to all users.</p>
      </BigTabsContent>
      <BigTabsContent value="disabled" className="mt-4">
        <p className="text-body-md">This content requires a premium subscription.</p>
      </BigTabsContent>
      <BigTabsContent value="another" className="mt-4">
        <p className="text-body-md">This is another tab's content.</p>
      </BigTabsContent>
    </BigTabs>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-[800px]">
      <h3 className="text-heading-sm mb-4">Full Width Tabs</h3>
      <BigTabs defaultValue="tab1">
        <BigTabsList fullWidth>
          <BigTabsTrigger fullWidth value="tab1">Dashboard</BigTabsTrigger>
          <BigTabsTrigger fullWidth value="tab2">Analytics</BigTabsTrigger>
          <BigTabsTrigger fullWidth value="tab3">Reports</BigTabsTrigger>
        </BigTabsList>
        <BigTabsContent value="tab1" className="mt-4">
          <p className="text-body-md">Dashboard content - tabs stretch across full width with equal distribution.</p>
        </BigTabsContent>
        <BigTabsContent value="tab2" className="mt-4">
          <p className="text-body-md">Analytics content.</p>
        </BigTabsContent>
        <BigTabsContent value="tab3" className="mt-4">
          <p className="text-body-md">Reports content.</p>
        </BigTabsContent>
      </BigTabs>
    </div>
  ),
}
