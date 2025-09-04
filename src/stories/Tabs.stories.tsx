import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Tabs> = {
  title: 'NPM/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p>Content for Tab 1. This is the first tab's content.</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p>Content for Tab 2. This is the second tab's content.</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p>Content for Tab 3. This is the third tab's content.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p>Welcome to your dashboard overview. Here you can see a summary of your account.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h4 className="font-medium">Total Users</h4>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="border rounded p-4">
              <h4 className="font-medium">Revenue</h4>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analytics</h3>
          <p>Detailed analytics and insights about your application usage.</p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reports</h3>
          <p>Generate and view reports for your data.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p>Manage your notification preferences and history.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p>Configure your application settings and preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="available" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Premium
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="available" className="mt-4">
        <p>This content is available to all users.</p>
      </TabsContent>
      <TabsContent value="disabled" className="mt-4">
        <p>This content requires a premium subscription.</p>
      </TabsContent>
      <TabsContent value="another" className="mt-4">
        <p>This is another tab's content.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="account" orientation="vertical" className="flex w-[600px] h-[400px]">
      <TabsList className="flex-col h-full">
        <TabsTrigger value="account" className="w-full">Account</TabsTrigger>
        <TabsTrigger value="profile" className="w-full">Profile</TabsTrigger>
        <TabsTrigger value="security" className="w-full">Security</TabsTrigger>
        <TabsTrigger value="preferences" className="w-full">Preferences</TabsTrigger>
      </TabsList>
      <div className="flex-1 ml-4">
        <TabsContent value="account" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Account management content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Profile settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Security settings content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Preferences content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  ),
}