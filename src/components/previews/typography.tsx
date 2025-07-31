
export function TypographySection() {
  return (
    <div className="space-y-[var(--space-2xlg)]">
      <div>
        <h1 className="text-heading-2xlg mb-[var(--space-md)] text-[var(--color-text-primary)]">
          Typography
        </h1>
        <p className="text-body-lg text-[var(--color-text-secondary)]">
          Typography scale and semantic tokens from the design system.
        </p>
      </div>

      <div className="space-y-[var(--space-xlg)]">
        {/* Headings */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Headings
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-2xlg
              </span>
              <h1 className="text-heading-2xlg text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-xlg
              </span>
              <h1 className="text-heading-xlg text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-lg
              </span>
              <h1 className="text-heading-lg text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-md
              </span>
              <h1 className="text-heading-md text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-sm
              </span>
              <h1 className="text-heading-sm text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-heading-xsm
              </span>
              <h1 className="text-heading-xsm text-[var(--color-text-primary)]">
                Tide Design System
              </h1>
            </div>
          </div>
        </div>

        {/* Body Text */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Body Text
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-body-lg
              </span>
              <p className="text-body-lg text-[var(--color-text-primary)]">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-body-medium-lg
              </span>
              <p className="text-body-medium-lg text-[var(--color-text-primary)]">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-body-strong-lg
              </span>
              <p className="text-body-strong-lg text-[var(--color-text-primary)]">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Labels
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-label-md
              </span>
              <label className="text-label-md text-[var(--color-text-primary)]">
                Form Label Medium
              </label>
            </div>
            <div>
              <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                text-label-sm
              </span>
              <label className="text-label-sm text-[var(--color-text-primary)]">
                Form Label Small
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
