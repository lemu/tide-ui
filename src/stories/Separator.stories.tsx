import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../components/ui/separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
}

export const InMenu: Story = {
  render: () => (
    <div className="w-48 border rounded-md p-2">
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Profile
      </div>
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Settings
      </div>
      <Separator className="my-1" />
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Help
      </div>
      <div className="px-2 py-1.5 text-sm hover:bg-accent rounded-sm cursor-pointer">
        Sign out
      </div>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="w-80 border rounded-lg p-6">
      <div className="space-y-1">
        <h3 className="font-semibold">Account Information</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account details and preferences
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
        <div>
          <label className="text-sm font-medium">Username</label>
          <p className="text-sm text-muted-foreground">@johndoe</p>
        </div>
      </div>
    </div>
  ),
}