import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../components/ui/checkbox'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Checkbox> = {
  title: 'NPM • Fundamental/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>

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
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Marketing emails</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="analytics" defaultChecked />
        <Label htmlFor="analytics">Analytics and performance</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="social" />
        <Label htmlFor="social">Social media integration</Label>
      </div>
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="parent" checked="indeterminate" />
          <Label htmlFor="parent">Select all notifications</Label>
        </div>
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="child1" checked />
            <Label htmlFor="child1">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="child2" />
            <Label htmlFor="child2">Push notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="child3" checked />
            <Label htmlFor="child3">SMS notifications</Label>
          </div>
        </div>
      </div>
    )
  },
}