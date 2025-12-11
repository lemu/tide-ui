import type { Meta, StoryObj } from '@storybook/react'
import * as LucideIcons from 'lucide-react'
import { Icon, IconColor, IconSize } from '../components/fundamental/icon'

const meta: Meta<typeof Icon> = {
  title: 'NPM • Fundamental/Icon',
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

// Lucide Icons - ALL Lucide icons from the library
export const AllLucideIcons: Story = {
  render: () => {
    // Get all Lucide icon names by converting PascalCase to kebab-case
    const pascalToKebab = (str: string): string => {
      return str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
    };

    // Get all icon names from lucide-react, excluding non-icon exports
    const lucideIconNames = Object.keys(LucideIcons)
      .filter((key) => {
        // Filter out known non-icon exports and duplicates
        if (key === 'createLucideIcon' ||
            key === 'default' ||
            key === 'icons' ||
            key.endsWith('Icon') ||  // Filter out XxxIcon aliases (keep Xxx only)
            key.startsWith('Lucide') ||
            key.startsWith('_')) {
          return false;
        }

        // Verify the value exists (components can be functions or objects in different build contexts)
        const component = (LucideIcons as any)[key];
        return component && (typeof component === 'function' || typeof component === 'object');
      })
      .map(pascalToKebab)
      .sort();

    return (
      <div className="space-y-[var(--space-md)]">
        <div className="text-body-md text-[var(--color-text-secondary)]">
          {lucideIconNames.length} Lucide icons available
        </div>
        <div className="grid grid-cols-12 gap-[var(--space-md)]">
          {lucideIconNames.map((iconName) => (
            <div key={iconName} className="flex flex-col items-center gap-[var(--space-xsm)]">
              <div className="flex h-[var(--size-lg)] w-[var(--size-lg)] items-center justify-center rounded-sm bg-[var(--color-surface-secondary)]">
                <Icon name={iconName} size="md" />
              </div>
              <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)] break-all">
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
}

// Custom Icons - All custom icons available in the library
export const CustomIcons: Story = {
  render: () => {
    const customIcons = [
      'chart-marker-bar', 'chart-marker-line', 'chart-marker-dashline', 'chart-marker-dashline2',
      'chart-marker-dotline', 'chart-marker-dot', 'dot', 'bubble-size', 'broken-scale',
      'ship-unload', 'ship-load', 'star-full', 'user-created-by', 'user-owner', 'user-charterer',
      'user-broker', 'order-distributed', 'order-withdrawn', 'order-draft', 'negotiation-indicative-bid',
      'negotiation-indicative-offer', 'negotiation-firm-bid', 'negotiation-firm-offer', 'negotiation-expired',
      'negotiation-withdrawn', 'negotiation-subs-failed', 'negotiation-firm', 'on-subs',
      'negotiation-on-subs-amendment', 'negotiation-fixed', 'contract-draft', 'addenda-draft',
      'contract-working-copy', 'addenda-working-copy', 'contract-final', 'contract-rejected',
      'addenda-final', 'contract-on-subs', 'contract-canceled', 'contract-failed', 'approved',
      'pending-approval', 'info-filled'
    ];

    return (
      <div className="grid grid-cols-8 gap-[var(--space-lg)]">
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

