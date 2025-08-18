import type { Meta, StoryObj } from '@storybook/react'
import { Icon, IconColor, IconSize } from '../components/ui/icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Icon name from Lucide or custom icons',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'] as IconSize[],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary', 'secondary', 'tertiary', 'tertiary-hover', 'disabled', 
        'neutral-selected', 'information', 'success', 'error', 'warning', 
        'selected', 'brand', 'brand-hover', 'on-action', 'inverse'
      ] as IconColor[],
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the icon. If not provided, icon will be marked as decorative',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'star',
  },
}

export const WithAriaLabel: Story = {
  args: {
    name: 'star',
    'aria-label': 'Favorite item',
  },
}

// Size variants
export const Small: Story = {
  args: {
    name: 'star',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    name: 'star',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    name: 'star',
    size: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    name: 'star',
    size: 'xl',
  },
}

// Color variants
export const Primary: Story = {
  args: {
    name: 'star',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    name: 'star',
    color: 'secondary',
  },
}

export const Brand: Story = {
  args: {
    name: 'star',
    color: 'brand',
  },
}

export const Success: Story = {
  args: {
    name: 'check-circle',
    color: 'success',
  },
}

export const Error: Story = {
  args: {
    name: 'circle-alert',
    color: 'error',
  },
}

export const Warning: Story = {
  args: {
    name: 'triangle-alert',
    color: 'warning',
  },
}

// Custom icons
export const CustomIcon: Story = {
  args: {
    name: 'dot',
    color: 'brand',
    size: 'lg',
  },
}

export const ChartIcon: Story = {
  args: {
    name: 'chart-bar',
    color: 'primary',
    size: 'lg',
  },
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-lg)]">
      {(['sm', 'md', 'lg', 'xl'] as IconSize[]).map((size) => (
        <div key={size} className="flex flex-col items-center gap-[var(--space-sm)]">
          <Icon name="star" size={size} />
          <span className="text-caption-sm text-[var(--color-text-tertiary)]">
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
}

// All colors showcase
export const AllColors: Story = {
  render: () => {
    const colors: IconColor[] = [
      'primary', 'secondary', 'tertiary', 'disabled', 'neutral-selected',
      'information', 'success', 'error', 'warning', 'selected', 'brand',
      'brand-hover', 'on-action', 'inverse'
    ];

    return (
      <div className="grid grid-cols-7 gap-[var(--space-md)]">
        {colors.map((color) => (
          <div key={color} className="flex flex-col items-center gap-[var(--space-sm)]">
            <div className={`flex h-[var(--size-xlg)] w-[var(--size-xlg)] items-center justify-center rounded-sm ${
              color === 'on-action' || color === 'inverse' ? 'bg-[var(--grey-900)]' : 'bg-[var(--color-surface-secondary)]'
            }`}>
              <Icon name="star" color={color} />
            </div>
            <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)]">
              {color}
            </span>
          </div>
        ))}
      </div>
    );
  },
}

// Popular Lucide icons
export const PopularLucideIcons: Story = {
  render: () => {
    const sampleLucideIcons = [
      'star', 'user', 'settings', 'search', 'plus', 'check', 'x', 'trash-2',
      'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'chevron-down', 'chevron-left',
      'bookmark', 'circle', 'info', 'send', 'share', 'package', 'ship', 'sparkles',
      'layout-dashboard', 'navigation'
    ];

    return (
      <div className="grid grid-cols-8 gap-[var(--space-lg)]">
        {sampleLucideIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-[var(--space-sm)]">
            <div className="flex h-[var(--size-xlg)] w-[var(--size-xlg)] items-center justify-center rounded-sm bg-[var(--color-surface-secondary)]">
              <Icon name={iconName} size="lg" />
            </div>
            <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)]">
              {iconName}
            </span>
          </div>
        ))}
      </div>
    );
  },
}

// Custom icons showcase
export const CustomIcons: Story = {
  render: () => {
    const customIcons = [
      'chart-bar', 'chart-line', 'chart-dashline', 'chart-dashline-2',
      'chart-dotline', 'chart-dot', 'dot', 'bubble-size', 'broken-scale',
      'ship-unload', 'ship-load'
    ];

    return (
      <div className="grid grid-cols-6 gap-[var(--space-lg)]">
        {customIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-[var(--space-sm)]">
            <div className="flex h-[var(--size-xlg)] w-[var(--size-xlg)] items-center justify-center rounded-sm bg-[var(--color-surface-secondary)]">
              <Icon name={iconName} size="lg" />
            </div>
            <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)]">
              {iconName}
            </span>
          </div>
        ))}
      </div>
    );
  },
}

// Usage examples with code
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-[var(--space-lg)] max-w-4xl">
      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Basic Usage
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Icon name="star" />
          <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
            {`<Icon name="star" />`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          With Size and Color
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Icon name="heart" size="lg" color="error" />
          <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
            {`<Icon name="heart" size="lg" color="error" />`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Accessible Icon with Label
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Icon name="star" aria-label="Favorite item" />
          <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
            {`<Icon name="star" aria-label="Favorite item" />`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Custom Icon
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Icon name="dot" color="brand" />
          <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
            {`<Icon name="dot" color="brand" />`}
          </code>
        </div>
      </div>

      <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
        <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
          Dynamic Lucide Icon
        </h3>
        <div className="flex items-center gap-[var(--space-md)]">
          <Icon name="microscope" size="lg" color="information" />
          <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
            {`<Icon name="microscope" size="lg" color="information" />`}
          </code>
        </div>
      </div>
    </div>
  ),
}

// Interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-[var(--space-md)]">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Normal vs Disabled</h4>
        <div className="flex items-center space-x-4">
          <Icon name="user" color="primary" />
          <Icon name="user" color="disabled" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Success, Warning, Error</h4>
        <div className="flex items-center space-x-4">
          <Icon name="check-circle" color="success" />
          <Icon name="triangle-alert" color="warning" />
          <Icon name="circle-alert" color="error" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Brand Colors</h4>
        <div className="flex items-center space-x-4">
          <Icon name="star" color="brand" />
          <Icon name="star" color="brand-hover" />
        </div>
      </div>
    </div>
  ),
}