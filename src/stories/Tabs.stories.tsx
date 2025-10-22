import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Tabs> = {
  title: 'NPM • Fundamental/Tabs',
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

export const LineTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList variant="line">
        <TabsTrigger variant="line" value="tab1">Overview</TabsTrigger>
        <TabsTrigger variant="line" value="tab2">Analytics</TabsTrigger>
        <TabsTrigger variant="line" value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p className="text-body-md">Overview content. Line tabs use an underline indicator instead of a pill background.</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p className="text-body-md">Analytics content with detailed metrics and charts.</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p className="text-body-md">Reports content showing various data visualizations.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const LineTabsSizes: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div>
        <h3 className="text-heading-sm mb-4">Small Size</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="sm">
            <TabsTrigger variant="line" size="sm" value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger variant="line" size="sm" value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger variant="line" size="sm" value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-sm">Small size content</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Medium Size (Default)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="md">
            <TabsTrigger variant="line" size="md" value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger variant="line" size="md" value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger variant="line" size="md" value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Medium size content</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Large Size</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="lg">
            <TabsTrigger variant="line" size="lg" value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger variant="line" size="lg" value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger variant="line" size="lg" value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-lg">Large size content</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const LineTabsWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-[600px]">
      <TabsList variant="line">
        <TabsTrigger
          variant="line"
          value="home"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6L8 2L14 6V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        >
          Home
        </TabsTrigger>
        <TabsTrigger
          variant="line"
          value="notifications"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.33333C12 4.27247 11.5786 3.25505 10.8284 2.50491C10.0783 1.75476 9.06087 1.33333 8 1.33333C6.93913 1.33333 5.92172 1.75476 5.17157 2.50491C4.42143 3.25505 4 4.27247 4 5.33333C4 10 2 11.3333 2 11.3333H14C14 11.3333 12 10 12 5.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.15333 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8 14.6643C7.7664 14.6643 7.53691 14.6029 7.3345 14.4864C7.13209 14.3698 6.96386 14.2021 6.84667 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          variant="line"
          value="settings"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.9333 10C12.8444 10.2115 12.8188 10.4446 12.8599 10.6704C12.901 10.8961 13.0068 11.1049 13.1667 11.2733L13.2067 11.3133C13.3337 11.4402 13.4345 11.5909 13.5033 11.7567C13.572 11.9226 13.6074 12.1003 13.6074 12.28C13.6074 12.4597 13.572 12.6374 13.5033 12.8033C13.4345 12.9691 13.3337 13.1198 13.2067 13.2467C13.0797 13.3737 12.929 13.4744 12.7632 13.5432C12.5974 13.612 12.4197 13.6474 12.24 13.6474C12.0603 13.6474 11.8826 13.612 11.7167 13.5432C11.5509 13.4744 11.4002 13.3737 11.2733 13.2467L11.2333 13.2067C11.0649 13.0468 10.8561 12.941 10.6304 12.8999C10.4046 12.8588 10.1715 12.8844 9.96 12.9733C9.75247 13.0578 9.57397 13.1994 9.44439 13.3817C9.3148 13.564 9.24008 13.7794 9.23333 14.0013V14.1667C9.23333 14.5203 9.09286 14.8594 8.84281 15.1095C8.59276 15.3595 8.25362 15.5 7.9 15.5C7.54638 15.5 7.20724 15.3595 6.95719 15.1095C6.70714 14.8594 6.56667 14.5203 6.56667 14.1667V14.1C6.55531 13.8706 6.47259 13.6501 6.32969 13.4679C6.18679 13.2858 5.9901 13.1506 5.76667 13.08C5.55515 12.9911 5.32203 12.9655 5.09628 13.0066C4.87053 13.0477 4.66174 13.1535 4.49333 13.3133L4.45333 13.3533C4.32643 13.4803 4.17575 13.5811 4.00989 13.6499C3.84403 13.7186 3.66633 13.754 3.48667 13.754C3.307 13.754 3.1293 13.7186 2.96344 13.6499C2.79758 13.5811 2.6469 13.4803 2.52 13.3533C2.39302 13.2264 2.29226 13.0757 2.22351 12.9099C2.15475 12.744 2.11935 12.5663 2.11935 12.3867C2.11935 12.207 2.15475 12.0293 2.22351 11.8634C2.29226 11.6976 2.39302 11.5469 2.52 11.42L2.56 11.38C2.71985 11.2116 2.82565 11.0028 2.8667 10.7771C2.90776 10.5513 2.88218 10.3182 2.79333 10.1067C2.70893 9.89913 2.56732 9.72063 2.38503 9.59105C2.20274 9.46146 1.98733 9.38674 1.76533 9.38V9.33333C1.41174 9.33333 1.0726 9.19286 0.822548 8.94281C0.572493 8.69276 0.432022 8.35362 0.432022 8C0.432022 7.64638 0.572493 7.30724 0.822548 7.05719C1.0726 6.80714 1.41174 6.66667 1.76533 6.66667H1.83333C2.06272 6.65531 2.28319 6.57259 2.46535 6.42969C2.64752 6.28679 2.78264 6.0901 2.85333 5.86667C2.94218 5.65515 2.96776 5.42203 2.9267 5.19628C2.88565 4.97053 2.77985 4.76174 2.62 4.59333L2.58 4.55333C2.45302 4.42643 2.35226 4.27575 2.28351 4.10989C2.21475 3.94403 2.17935 3.76633 2.17935 3.58667C2.17935 3.407 2.21475 3.2293 2.28351 3.06344C2.35226 2.89758 2.45302 2.7469 2.58 2.62C2.7069 2.49302 2.85758 2.39226 3.02344 2.32351C3.1893 2.25475 3.367 2.21935 3.54667 2.21935C3.72633 2.21935 3.90403 2.25475 4.06989 2.32351C4.23575 2.39226 4.38643 2.49302 4.51333 2.62L4.55333 2.66C4.72174 2.81985 4.93053 2.92565 5.15628 2.9667C5.38203 3.00776 5.61515 2.98218 5.82667 2.89333H5.86667C6.07421 2.80893 6.25271 2.66732 6.38229 2.48503C6.51188 2.30274 6.58659 2.08733 6.59333 1.86533V1.76667C6.59333 1.41304 6.7338 1.0739 6.98386 0.823857C7.23391 0.573806 7.57304 0.433334 7.92667 0.433334C8.28029 0.433334 8.61943 0.573806 8.86948 0.823857C9.11953 1.0739 9.26 1.41304 9.26 1.76667V1.83333C9.26674 2.05533 9.34146 2.27074 9.47105 2.45303C9.60063 2.63532 9.77913 2.77693 9.98667 2.86133C10.1982 2.95018 10.4313 2.97576 10.6571 2.9347C10.8828 2.89365 11.0916 2.78785 11.26 2.628L11.3 2.588C11.4269 2.46102 11.5776 2.36026 11.7434 2.29151C11.9093 2.22275 12.087 2.18735 12.2667 2.18735C12.4463 2.18735 12.624 2.22275 12.7899 2.29151C12.9557 2.36026 13.1064 2.46102 13.2333 2.588C13.3603 2.7149 13.4611 2.86558 13.5298 3.03144C13.5986 3.1973 13.634 3.375 13.634 3.55467C13.634 3.73433 13.5986 3.91203 13.5298 4.07789C13.4611 4.24375 13.3603 4.39443 13.2333 4.52133L13.1933 4.56133C13.0335 4.72974 12.9277 4.93853 12.8866 5.16428C12.8456 5.39003 12.8711 5.62315 12.96 5.83467V5.87467C13.0444 6.08221 13.186 6.26071 13.3683 6.39029C13.5506 6.51988 13.766 6.5946 13.988 6.60133H14.0547C14.4083 6.60133 14.7474 6.7418 14.9975 6.99185C15.2475 7.2419 15.388 7.58104 15.388 7.93467C15.388 8.28829 15.2475 8.62743 14.9975 8.87748C14.7474 9.12753 14.4083 9.268 14.0547 9.268H13.988C13.766 9.27474 13.5506 9.34945 13.3683 9.47904C13.186 9.60862 13.0444 9.78712 12.96 9.99467V10C13.0488 10.2115 13.0744 10.4446 13.0333 10.6704C12.9923 10.8961 12.8865 11.1049 12.7267 11.2733L12.9333 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home" className="mt-4">
        <p className="text-body-md">Home dashboard with overview and quick actions.</p>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <p className="text-body-md">Your recent notifications and alerts.</p>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <p className="text-body-md">Application settings and preferences.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const LineTabsAllStates: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <div>
        <h3 className="text-heading-sm mb-4">Default States</h3>
        <Tabs defaultValue="active">
          <TabsList variant="line">
            <TabsTrigger variant="line" value="active">Active Tab</TabsTrigger>
            <TabsTrigger variant="line" value="inactive">Inactive Tab</TabsTrigger>
            <TabsTrigger variant="line" value="another">Another Tab</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <p className="text-body-md">This tab is currently active with blue underline.</p>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <p className="text-body-md">Inactive tab content.</p>
          </TabsContent>
          <TabsContent value="another" className="mt-4">
            <p className="text-body-md">Another tab content.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">With Disabled Tab</h3>
        <Tabs defaultValue="available">
          <TabsList variant="line">
            <TabsTrigger variant="line" value="available">Available</TabsTrigger>
            <TabsTrigger variant="line" value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger variant="line" value="another">Another</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-4">
            <p className="text-body-md">This content is available.</p>
          </TabsContent>
          <TabsContent value="disabled" className="mt-4">
            <p className="text-body-md">Disabled content.</p>
          </TabsContent>
          <TabsContent value="another" className="mt-4">
            <p className="text-body-md">Another tab content.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Interactive States</h3>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
          Hover over inactive tabs to see the grey underline. Use Tab key to navigate and see focus states with subtle backgrounds.
        </p>
        <Tabs defaultValue="tab1">
          <TabsList variant="line">
            <TabsTrigger variant="line" value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger variant="line" value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger variant="line" value="tab3">Tab 3</TabsTrigger>
            <TabsTrigger variant="line" value="tab4">Tab 4</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Tab 1 content - try hovering and tabbing through the tabs above.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Tab 2 content</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Tab 3 content</p>
          </TabsContent>
          <TabsContent value="tab4" className="mt-4">
            <p className="text-body-md">Tab 4 content</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="space-y-8 w-[1000px]">
      <div>
        <h3 className="text-heading-sm mb-4">Pill Tabs - Full Width</h3>
        <Tabs defaultValue="tab1">
          <TabsList fullWidth>
            <TabsTrigger fullWidth value="tab1">Dashboard</TabsTrigger>
            <TabsTrigger fullWidth value="tab2">Analytics</TabsTrigger>
            <TabsTrigger fullWidth value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Dashboard content - tabs stretch across full width with equal distribution.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Analytics content.</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Reports content.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Line Tabs - Full Width</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" fullWidth>
            <TabsTrigger variant="line" fullWidth value="tab1">Overview</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab2">Details</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab3">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Overview content - line tabs stretch across full width with equal distribution.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Details content.</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Settings content.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Line Tabs - Full Width with Many Tabs</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" fullWidth>
            <TabsTrigger variant="line" fullWidth value="tab1">Home</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab2">Products</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab3">Services</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab4">About</TabsTrigger>
            <TabsTrigger variant="line" fullWidth value="tab5">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-body-md">Home content - five tabs evenly distributed across full width.</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-body-md">Products content.</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-body-md">Services content.</p>
          </TabsContent>
          <TabsContent value="tab4" className="mt-4">
            <p className="text-body-md">About content.</p>
          </TabsContent>
          <TabsContent value="tab5" className="mt-4">
            <p className="text-body-md">Contact content.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-heading-sm mb-4">Comparison: Regular vs Full Width</h3>
        <div className="space-y-6">
          <div>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-2">Regular (inline-flex, auto-width):</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="line">
                <TabsTrigger variant="line" value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger variant="line" value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger variant="line" value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p className="text-body-md">Regular tabs only take up as much space as needed.</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p className="text-body-md">Tab 2 content.</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p className="text-body-md">Tab 3 content.</p>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-2">Full Width (w-full with flex-1 triggers):</p>
            <Tabs defaultValue="tab1">
              <TabsList variant="line" fullWidth>
                <TabsTrigger variant="line" fullWidth value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger variant="line" fullWidth value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger variant="line" fullWidth value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p className="text-body-md">Full width tabs stretch to fill the entire container width.</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p className="text-body-md">Tab 2 content.</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p className="text-body-md">Tab 3 content.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  ),
}