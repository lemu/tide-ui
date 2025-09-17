import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '../components/ui/toggle'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Star, Heart, Bookmark } from 'lucide-react'

const meta: Meta<typeof Toggle> = {
  title: 'NPM/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    pressed: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  ),
}

export const Small: Story = {
  render: () => (
    <Toggle size="sm" aria-label="Toggle underline">
      <Underline className="h-4 w-4" />
    </Toggle>
  ),
}

export const Large: Story = {
  render: () => (
    <Toggle size="lg" aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const Pressed: Story = {
  render: () => (
    <Toggle pressed aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  ),
}

export const TextAlignment: Story = {
  render: () => (
    <div className="flex space-x-1">
      <Toggle aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const TextFormatting: Story = {
  render: () => (
    <div className="flex space-x-1">
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Favorites: Story = {
  render: () => (
    <div className="flex space-x-2">
      <Toggle aria-label="Toggle star">
        <Star className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle heart">
        <Heart className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle bookmark">
        <Bookmark className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const ToolbarExample: Story = {
  render: () => (
    <div className="border rounded-lg p-2 inline-flex items-center space-x-1">
      <div className="flex space-x-1">
        <Toggle size="sm" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="w-px h-6 bg-border mx-1" />
      <div className="flex space-x-1">
        <Toggle size="sm" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
}

// New story matching Figma design - column display toggles
export const ColumnDisplayToggles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-label-sm text-[var(--color-text-tertiary)]">Display columns</h4>
        <div className="flex flex-wrap gap-1 items-start justify-start">
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Laycan year">
            Laycan year
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Laycan month">
            Laycan month
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Fixture count">
            Fixture count
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Cargo count">
            Cargo count
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Gross freight">
            Gross freight
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Avg. freight rate">
            Avg. freight rate
          </Toggle>
          <Toggle variant="outline" size="sm" pressed aria-label="Toggle Avg. demurrage">
            Avg. demurrage
          </Toggle>
          <Toggle variant="outline" size="sm" aria-label="Toggle Hidden property">
            Hidden property
          </Toggle>
        </div>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Default Variant</h4>
        <div className="flex space-x-2">
          <Toggle size="sm" aria-label="Small default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="md" aria-label="Medium default">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Large default">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Outline Variant</h4>
        <div className="flex space-x-2">
          <Toggle variant="outline" size="sm" aria-label="Small outline">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" size="md" aria-label="Medium outline">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" size="lg" aria-label="Large outline">
            <Italic className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Text Toggles - All Sizes</h4>
        <div className="flex space-x-2 items-center">
          <Toggle variant="outline" size="sm" aria-label="Small text">
            Small
          </Toggle>
          <Toggle variant="outline" size="md" aria-label="Medium text">
            Medium
          </Toggle>
          <Toggle variant="outline" size="lg" aria-label="Large text">
            Large
          </Toggle>
        </div>
      </div>
    </div>
  ),
}