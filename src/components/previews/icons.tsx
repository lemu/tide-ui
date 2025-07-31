import { Icon, IconColor, IconSize } from '../ui/icon';

export function IconsSection() {
  // Sample of popular Lucide icons for demo
  const sampleLucideIcons = [
    'star', 'heart', 'user', 'settings', 'home', 'search', 'mail', 'phone',
    'calendar', 'clock', 'edit', 'trash-2', 'plus', 'minus', 'check', 'x',
    'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down', 'download', 'upload',
    'file', 'folder', 'image', 'video'
  ] as const;

  // All custom icons
  const customIcons = [
    'chart-bar', 'chart-line', 'chart-dashline', 'chart-dashline-2',
    'chart-dotline', 'chart-dot', 'dot', 'bubble-size', 'broken-scale',
    'ship-unload', 'ship-load'
  ] as const;

  // All available colors
  const colors: IconColor[] = [
    'primary', 'secondary', 'tertiary', 'disabled', 'neutral-selected',
    'information', 'success', 'error', 'warning', 'selected', 'brand',
    'brand-hover', 'on-action', 'inverse'
  ];

  // All available sizes
  const sizes: IconSize[] = ['sm', 'md', 'lg', 'xl'];

  return (
    <div className="space-y-[var(--space-2xlg)]">
      <div>
        <h1 className="text-heading-2xlg mb-[var(--space-md)] text-[var(--color-text-primary)]">
          Icons
        </h1>
        <p className="text-body-lg text-[var(--color-text-secondary)]">
          Icon system combining Lucide icons with custom design system icons.
        </p>
      </div>

      <div className="space-y-[var(--space-xlg)]">
        {/* Sizes */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Sizes
          </h2>
          <div className="flex items-center gap-[var(--space-lg)]">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-[var(--space-sm)]">
                <Icon name="star" size={size} />
                <span className="text-caption-sm text-[var(--color-text-tertiary)]">
                  {size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Colors
          </h2>
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
        </div>

        {/* Custom Icons */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Custom Icons
          </h2>
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
        </div>

        {/* Sample Lucide Icons */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Lucide Icons (Sample)
          </h2>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Showing a sample of popular Lucide icons. The full set of 1000+ icons is available.
          </p>
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
        </div>

        {/* Usage Examples */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Usage Examples
          </h2>
          <div className="space-y-[var(--space-md)]">
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
                Custom Icon
              </h3>
              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="dot" color="brand" />
                <code className="text-body-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm text-[var(--color-text-primary)]">
                  {`<Icon name="dot" color="brand" />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}