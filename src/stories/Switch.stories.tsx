import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '../components/ui/switch'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Marketing emails</Label>
          <p className="text-sm text-muted-foreground">Receive emails about new products and features</p>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Security alerts</Label>
          <p className="text-sm text-muted-foreground">Get notified about security updates</p>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  ),
}