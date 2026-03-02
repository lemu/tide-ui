import type { Meta, StoryObj } from '@storybook/react'
import * as LucideIcons from 'lucide-react'
import { Icon, IconColor, IconSize } from '../components/fundamental/icon'
import {
  Dot, ShipLoad, ShipUnload, StarFull, InfoFilled,
  ChartMarkerBar, ChartMarkerLine, ChartMarkerDashline, ChartMarkerDashline2,
  ChartMarkerDotline, ChartMarkerDot, BubbleSize, BrokenScale,
  UserCreatedBy, UserOwner, UserCharterer, UserBroker,
  HexagonDashed, HexagonAsterisk, HexagonMinus,
  CircleDashedArrowDown, CircleDashedArrowUp, CircleDiamond, CircleDot2, CircleCheck2,
  SquareCornerCheck, SquareCornerPlus, SquareDashedChartGantt, SquareDashedCornerPlus, SquareDiamond,
  Approved, PendingApproval,
} from '../components/fundamental/custom-icons'

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
      description: 'Icon name (string) or a Lucide component reference. Pass a string like `"settings"` for convenience, or pass the component directly (e.g. `Settings` imported from `lucide-react`) to enable tree-shaking in consumer bundles.',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l', 'xl'] as IconSize[],
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

export const HowToUse: Story = {
  render: () => (
    <div className="space-y-[var(--space-xl)] max-w-4xl">

      {/* Section A — Usage patterns */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-m)]">Usage patterns</h2>

        <div className="space-y-[var(--space-m)]">
          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)] space-y-[var(--space-m)]">
            <h3 className="text-heading-sm text-[var(--color-text-primary)]">String name — static map, 34 icons (library internals only)</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Passing a string looks up the icon in a static map of 34 Lucide icons used internally by tide-ui components. These are already bundled with the library. Strings not in the map render a placeholder — use a component reference instead.
            </p>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name="star" size="m" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`<Icon name="star" size="m" />`}
              </code>
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)] space-y-[var(--space-m)]">
            <h3 className="text-heading-sm text-[var(--color-text-primary)]">Component reference — tree-shakeable</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Passing a Lucide component directly bypasses the runtime lookup entirely. The bundler sees the explicit import and can eliminate every other Lucide icon from the output. Use this in performance-sensitive apps where bundle size matters.
            </p>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name={LucideIcons.Settings} size="m" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`import { Settings } from 'lucide-react'\n<Icon name={Settings} size="m" />`}
              </code>
            </div>
            <div className="flex items-center gap-[var(--space-l)]">
              <Icon name={LucideIcons.Settings} size="s" color="tertiary" />
              <Icon name={LucideIcons.Settings} size="m" color="brand" />
              <Icon name={LucideIcons.Settings} size="l" color="primary" />
              <Icon name={LucideIcons.Settings} size="xl" color="information" />
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)] space-y-[var(--space-m)]">
            <h3 className="text-heading-sm text-[var(--color-text-primary)]">Summary</h3>
            <div className="grid grid-cols-3 gap-[var(--space-m)] text-body-sm">
              <div className="text-[var(--color-text-tertiary)]">Usage</div>
              <div className="text-[var(--color-text-tertiary)]">Bundle cost</div>
              <div className="text-[var(--color-text-tertiary)]">When to use</div>

              <code className="text-[var(--color-text-primary)]">{`name="star"`}</code>
              <div className="text-[var(--color-text-secondary)]">34 icons (library internals only, already in bundle)</div>
              <div className="text-[var(--color-text-secondary)]">Quick use of library-internal icons; unknown strings show placeholder</div>

              <code className="text-[var(--color-text-primary)]">{`name={Settings}`}</code>
              <div className="text-[var(--color-text-secondary)]">Only the imported icon</div>
              <div className="text-[var(--color-text-secondary)]">Production apps where bundle size matters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section B — Code examples */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-m)]">Code examples</h2>

        <div className="space-y-[var(--space-m)]">
          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)]">
            <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-primary)]">
              Basic usage
            </h3>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name="star" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`<Icon name="star" />`}
              </code>
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)]">
            <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-primary)]">
              With size and color
            </h3>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name="circle-alert" size="l" color="error" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`<Icon name="circle-alert" size="l" color="error" />`}
              </code>
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)]">
            <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-primary)]">
              Accessible icon with label
            </h3>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name="star" aria-label="Favorite item" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`<Icon name="star" aria-label="Favorite item" />`}
              </code>
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)]">
            <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-primary)]">
              Custom/tide-ui icon (component reference)
            </h3>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name={Dot} color="brand" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`import { Dot } from '@rafal.lemieszewski/tide-ui'\n<Icon name={Dot} color="brand" />`}
              </code>
            </div>
          </div>

          <div className="rounded-l border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-l)]">
            <h3 className="text-heading-sm mb-[var(--space-s)] text-[var(--color-text-primary)]">
              Lucide icon via direct import (component reference)
            </h3>
            <div className="flex items-center gap-[var(--space-m)]">
              <Icon name={LucideIcons.Settings} size="m" />
              <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-s)] py-[var(--space-xs)] rounded-s text-[var(--color-text-primary)]">
                {`import { Settings } from 'lucide-react'\n<Icon name={Settings} size="m" />`}
              </code>
            </div>
          </div>
        </div>
      </div>

    </div>
  ),
}

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-l)]">
      {(['s', 'm', 'l', 'xl'] as IconSize[]).map((size) => (
        <div key={size} className="flex flex-col items-center gap-[var(--space-s)]">
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
      <div className="grid grid-cols-7 gap-[var(--space-m)]">
        {colors.map((color) => (
          <div key={color} className="flex flex-col items-center gap-[var(--space-s)]">
            <div className={`flex h-[var(--size-xl)] w-[var(--size-xl)] items-center justify-center rounded-s ${
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
    // Get all Lucide icon entries (PascalCase name + component ref)
    const lucideIconEntries = Object.entries(LucideIcons)
      .filter(([key, val]) => {
        if (key === 'createLucideIcon' ||
            key === 'default' ||
            key === 'icons' ||
            key.endsWith('Icon') ||
            key.startsWith('Lucide') ||
            key.startsWith('_')) {
          return false;
        }
        return val && (typeof val === 'function' || typeof val === 'object');
      })
      .sort(([a], [b]) => a.localeCompare(b)) as [string, React.ComponentType<any>][];

    return (
      <div className="space-y-[var(--space-m)]">
        <div className="text-body-md text-[var(--color-text-secondary)]">
          {lucideIconEntries.length} Lucide icons available
        </div>
        <div className="grid grid-cols-12 gap-[var(--space-m)]">
          {lucideIconEntries.map(([name, component]) => (
            <div key={name} className="flex flex-col items-center gap-[var(--space-xs)]">
              <div className="flex h-[var(--size-l)] w-[var(--size-l)] items-center justify-center rounded-s bg-[var(--color-surface-secondary)]">
                <Icon name={component} size="m" />
              </div>
              <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)] break-all">
                {name}
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
    const customIconComponents = [
      { name: 'Dot', component: Dot },
      { name: 'ShipLoad', component: ShipLoad },
      { name: 'ShipUnload', component: ShipUnload },
      { name: 'StarFull', component: StarFull },
      { name: 'InfoFilled', component: InfoFilled },
      { name: 'ChartMarkerBar', component: ChartMarkerBar },
      { name: 'ChartMarkerLine', component: ChartMarkerLine },
      { name: 'ChartMarkerDashline', component: ChartMarkerDashline },
      { name: 'ChartMarkerDashline2', component: ChartMarkerDashline2 },
      { name: 'ChartMarkerDotline', component: ChartMarkerDotline },
      { name: 'ChartMarkerDot', component: ChartMarkerDot },
      { name: 'BubbleSize', component: BubbleSize },
      { name: 'BrokenScale', component: BrokenScale },
      { name: 'UserCreatedBy', component: UserCreatedBy },
      { name: 'UserOwner', component: UserOwner },
      { name: 'UserCharterer', component: UserCharterer },
      { name: 'UserBroker', component: UserBroker },
      { name: 'HexagonDashed', component: HexagonDashed },
      { name: 'HexagonAsterisk', component: HexagonAsterisk },
      { name: 'HexagonMinus', component: HexagonMinus },
      { name: 'CircleDashedArrowDown', component: CircleDashedArrowDown },
      { name: 'CircleDashedArrowUp', component: CircleDashedArrowUp },
      { name: 'CircleDiamond', component: CircleDiamond },
      { name: 'CircleDot2', component: CircleDot2 },
      { name: 'CircleCheck2', component: CircleCheck2 },
      { name: 'SquareCornerCheck', component: SquareCornerCheck },
      { name: 'SquareCornerPlus', component: SquareCornerPlus },
      { name: 'SquareDashedChartGantt', component: SquareDashedChartGantt },
      { name: 'SquareDashedCornerPlus', component: SquareDashedCornerPlus },
      { name: 'SquareDiamond', component: SquareDiamond },
      { name: 'Approved', component: Approved },
      { name: 'PendingApproval', component: PendingApproval },
    ];

    return (
      <div className="grid grid-cols-8 gap-[var(--space-l)]">
        {customIconComponents.map(({ name, component }) => (
          <div key={name} className="flex flex-col items-center gap-[var(--space-s)]">
            <div className="flex h-[var(--size-xl)] w-[var(--size-xl)] items-center justify-center rounded-s bg-[var(--color-surface-secondary)]">
              <Icon name={component} size="l" />
            </div>
            <span className="text-caption-xsm text-center text-[var(--color-text-tertiary)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
}


