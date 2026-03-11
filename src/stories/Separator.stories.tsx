import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '../components/fundamental/separator'
import { Button } from '../components/fundamental/button'

const meta: Meta<typeof Separator> = {
  title: 'NPM • Fundamental/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal-line', 'vertical-line', 'dot'],
      description: 'Visual style and orientation of the separator',
    },
    decorative: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { type: 'horizontal-line' },
  render: (args) => (
    <div className="w-[320px] flex items-center justify-center">
      <Separator {...args} />
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-2xl)] w-[480px]">
      <div>
        <h3 className="text-heading-sm mb-[var(--space-m)]">Horizontal Line</h3>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-m)]">
          Full-width divider between stacked content sections.
        </p>
        <div className="flex flex-col gap-[var(--space-m)]">
          <div>
            <p className="text-body-sm text-[var(--color-text-primary)]">Introduction</p>
            <p className="text-body-sm text-[var(--color-text-secondary)]">A brief overview of the topic at hand.</p>
          </div>
          <Separator type="horizontal-line" />
          <div>
            <p className="text-body-sm text-[var(--color-text-primary)]">Details</p>
            <p className="text-body-sm text-[var(--color-text-secondary)]">More information about the subject in depth.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-m)]">Vertical Line</h3>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-m)]">
          Inline divider between horizontally arranged items.
        </p>
        <div className="flex gap-[var(--space-m)] items-center">
          <span className="text-body-sm text-[var(--color-text-primary)]">Home</span>
          <Separator type="vertical-line" />
          <span className="text-body-sm text-[var(--color-text-primary)]">Products</span>
          <Separator type="vertical-line" />
          <span className="text-body-sm text-[var(--color-text-primary)]">About</span>
        </div>
      </div>

      <div>
        <h3 className="text-heading-sm mb-[var(--space-m)]">Dot</h3>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-m)]">
          Compact inline separator for metadata and secondary content.
        </p>
        <div className="flex gap-[var(--space-s)] items-center">
          <span className="text-body-sm text-[var(--color-text-secondary)]">Aug 15, 2025</span>
          <Separator type="dot" />
          <span className="text-body-sm text-[var(--color-text-secondary)]">5 min read</span>
          <Separator type="dot" />
          <span className="text-body-sm text-[var(--color-text-secondary)]">Technology</span>
        </div>
      </div>
    </div>
  ),
}

export const InMenu: Story = {
  render: () => (
    <div className="w-48 border border-[var(--color-border-primary-subtle)] rounded-[var(--border-radius-m)] p-[var(--space-xs)]">
      <div className="px-[var(--space-s)] py-[var(--space-xs)] text-body-sm rounded-[var(--border-radius-s)] cursor-pointer hover:bg-[var(--color-background-neutral-subtle)]">Profile</div>
      <div className="px-[var(--space-s)] py-[var(--space-xs)] text-body-sm rounded-[var(--border-radius-s)] cursor-pointer hover:bg-[var(--color-background-neutral-subtle)]">Settings</div>
      <div className="py-[var(--space-xs)]">
        <Separator type="horizontal-line" />
      </div>
      <div className="px-[var(--space-s)] py-[var(--space-xs)] text-body-sm rounded-[var(--border-radius-s)] cursor-pointer hover:bg-[var(--color-background-neutral-subtle)]">Help</div>
      <div className="px-[var(--space-s)] py-[var(--space-xs)] text-body-sm rounded-[var(--border-radius-s)] cursor-pointer hover:bg-[var(--color-background-neutral-subtle)]">Sign out</div>
    </div>
  ),
}

export const Navigation: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-m)]">
      <Button variant="ghost" size="s">Home</Button>
      <Separator type="vertical-line" />
      <Button variant="ghost" size="s">About</Button>
      <Separator type="vertical-line" />
      <Button variant="ghost" size="s">Contact</Button>
      <Separator type="vertical-line" />
      <Button variant="ghost" size="s">Help</Button>
    </div>
  ),
}

export const ArticleMetadata: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-s)]">
      <span className="text-body-sm text-[var(--color-text-secondary)]">Aug 15, 2025</span>
      <Separator type="dot" />
      <span className="text-body-sm text-[var(--color-text-secondary)]">5 min read</span>
      <Separator type="dot" />
      <span className="text-body-sm text-[var(--color-text-secondary)]">Technology</span>
      <Separator type="dot" />
      <span className="text-body-sm text-[var(--color-text-secondary)]">React</span>
    </div>
  ),
}
