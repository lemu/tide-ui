
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function TypographyPreview() {
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
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">Headings</CardTitle>
            <CardDescription>
              Heading typography scale from largest to smallest with semantic class names.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-lg)]">
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
                <h2 className="text-heading-xlg text-[var(--color-text-primary)]">
                  Tide Design System
                </h2>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-heading-lg
                </span>
                <h3 className="text-heading-lg text-[var(--color-text-primary)]">
                  Tide Design System
                </h3>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-heading-md
                </span>
                <h4 className="text-heading-md text-[var(--color-text-primary)]">
                  Tide Design System
                </h4>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-heading-sm
                </span>
                <h5 className="text-heading-sm text-[var(--color-text-primary)]">
                  Tide Design System
                </h5>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-heading-xsm
                </span>
                <h6 className="text-heading-xsm text-[var(--color-text-primary)]">
                  Tide Design System
                </h6>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">Body Text</CardTitle>
            <CardDescription>
              Body text styles for content with different weights and emphasis levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-lg)]">
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-body-lg
                </span>
                <p className="text-body-lg text-[var(--color-text-primary)]">
                  The quick brown fox jumps over the lazy dog. This is large body text suitable for introductions.
                </p>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-body-md
                </span>
                <p className="text-body-md text-[var(--color-text-primary)]">
                  The quick brown fox jumps over the lazy dog. This is standard body text for most content.
                </p>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-body-sm
                </span>
                <p className="text-body-sm text-[var(--color-text-primary)]">
                  The quick brown fox jumps over the lazy dog. This is small body text for supplementary content.
                </p>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-body-medium-md (medium weight)
                </span>
                <p className="text-body-medium-md text-[var(--color-text-primary)]">
                  The quick brown fox jumps over the lazy dog. This is medium weight body text for emphasis.
                </p>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-body-strong-md (strong weight)
                </span>
                <p className="text-body-strong-md text-[var(--color-text-primary)]">
                  The quick brown fox jumps over the lazy dog. This is strong weight body text for emphasis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Labels and Captions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-lg">Labels and Captions</CardTitle>
            <CardDescription>
              Typography for form labels, captions, and supplementary text content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-lg)]">
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
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-caption-sm
                </span>
                <p className="text-caption-sm text-[var(--color-text-secondary)]">
                  Caption text for additional information and help text
                </p>
              </div>
              <div>
                <span className="text-caption-sm mb-[var(--space-xsm)] block text-[var(--color-text-tertiary)]">
                  text-caption-medium-sm (medium weight)
                </span>
                <p className="text-caption-medium-sm text-[var(--color-text-secondary)]">
                  Caption text with medium weight for emphasis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
