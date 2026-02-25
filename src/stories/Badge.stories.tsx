import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/fundamental/badge'
import { CircleHelp } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'NPM • Fundamental/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: { type: 'select' },
      options: ['neutral', 'brand', 'success', 'warning', 'destructive', 'information', 'violet', 'magenta'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['bold', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default',
  },
}

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => {
    return (
      <div className="flex flex-col gap-[var(--space-2xl)]">
        {/* Subtle Variants */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">Subtle Appearance</h3>
          <div className="flex flex-wrap gap-[var(--space-m)]">
            <Badge intent="neutral" appearance="subtle">Neutral</Badge>
            <Badge intent="brand" appearance="subtle">Brand</Badge>
            <Badge intent="success" appearance="subtle">Success</Badge>
            <Badge intent="warning" appearance="subtle">Warning</Badge>
            <Badge intent="destructive" appearance="subtle">Destructive</Badge>
            <Badge intent="information" appearance="subtle">Information</Badge>
            <Badge intent="violet" appearance="subtle">Violet</Badge>
            <Badge intent="magenta" appearance="subtle">Magenta</Badge>
          </div>
        </div>

        {/* Bold Variants */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">Bold Appearance</h3>
          <div className="flex flex-wrap gap-[var(--space-m)]">
            <Badge intent="neutral" appearance="bold">Neutral</Badge>
            <Badge intent="brand" appearance="bold">Brand</Badge>
            <Badge intent="success" appearance="bold">Success</Badge>
            <Badge intent="warning" appearance="bold">Warning</Badge>
            <Badge intent="destructive" appearance="bold">Destructive</Badge>
            <Badge intent="information" appearance="bold">Information</Badge>
            <Badge intent="violet" appearance="bold">Violet</Badge>
            <Badge intent="magenta" appearance="bold">Magenta</Badge>
          </div>
        </div>

        {/* With Icons - Subtle */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">With Icons - Subtle</h3>
          <div className="flex flex-wrap gap-[var(--space-m)]">
            <Badge intent="neutral" appearance="subtle" icon={<CircleHelp />}>Neutral</Badge>
            <Badge intent="brand" appearance="subtle" icon={<CircleHelp />}>Brand</Badge>
            <Badge intent="success" appearance="subtle" icon={<CircleHelp />}>Success</Badge>
            <Badge intent="warning" appearance="subtle" icon={<CircleHelp />}>Warning</Badge>
            <Badge intent="destructive" appearance="subtle" icon={<CircleHelp />}>Destructive</Badge>
            <Badge intent="information" appearance="subtle" icon={<CircleHelp />}>Information</Badge>
            <Badge intent="violet" appearance="subtle" icon={<CircleHelp />}>Violet</Badge>
            <Badge intent="magenta" appearance="subtle" icon={<CircleHelp />}>Magenta</Badge>
          </div>
        </div>

        {/* With Icons - Bold */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">With Icons - Bold</h3>
          <div className="flex flex-wrap gap-[var(--space-m)]">
            <Badge intent="neutral" appearance="bold" icon={<CircleHelp />}>Neutral</Badge>
            <Badge intent="brand" appearance="bold" icon={<CircleHelp />}>Brand</Badge>
            <Badge intent="success" appearance="bold" icon={<CircleHelp />}>Success</Badge>
            <Badge intent="warning" appearance="bold" icon={<CircleHelp />}>Warning</Badge>
            <Badge intent="destructive" appearance="bold" icon={<CircleHelp />}>Destructive</Badge>
            <Badge intent="information" appearance="bold" icon={<CircleHelp />}>Information</Badge>
            <Badge intent="violet" appearance="bold" icon={<CircleHelp />}>Violet</Badge>
            <Badge intent="magenta" appearance="bold" icon={<CircleHelp />}>Magenta</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">Sizes</h3>
          <div className="flex items-center gap-[var(--space-m)]">
            <Badge size="xs">XSmall</Badge>
            <Badge size="s">Small</Badge>
            <Badge size="m">Medium</Badge>
            <Badge size="l">Large</Badge>
          </div>
        </div>

        {/* Sizes with Icons */}
        <div>
          <h3 className="text-heading-sm mb-[var(--space-m)]">Sizes with Icons</h3>
          <div className="flex items-center gap-[var(--space-m)]">
            <Badge size="xs" icon={<CircleHelp />}>XSmall</Badge>
            <Badge size="s" icon={<CircleHelp />}>Small</Badge>
            <Badge size="m" icon={<CircleHelp />}>Medium</Badge>
            <Badge size="l" icon={<CircleHelp />}>Large</Badge>
          </div>
        </div>
      </div>
    );
  },
}

