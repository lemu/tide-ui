import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

export function SeparatorPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Layout-Based Prop Documentation */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Layout-Based Separator API</h2>
        <div className="bg-[var(--color-background-information)] border border-[var(--color-border-information)] rounded-lg p-[var(--space-lg)] mb-[var(--space-lg)]">
          <div className="space-y-[var(--space-md)]">
            <p className="text-body-md text-[var(--color-text-primary)]">
              <strong>Intuitive Layout Prop:</strong> The <code className="bg-[var(--color-surface-primary)] px-[var(--space-xsm)] rounded-xsm">layout</code> prop describes 
              the layout context where the separator is used, making it more intuitive than orientation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
              <div>
                <h4 className="text-heading-xsm mb-[var(--space-sm)]">Horizontal Layout</h4>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  <code>layout="horizontal"</code><br/>
                  For side-by-side elements → creates vertical line
                </p>
              </div>
              <div>
                <h4 className="text-heading-xsm mb-[var(--space-sm)]">Vertical Layout</h4>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  <code>layout="vertical"</code><br/>
                  For stacked elements → creates horizontal line
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Line Separators */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Line Separators</h2>
        
        {/* Horizontal Layout with Vertical Lines */}
        <div className="space-y-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm mb-[var(--space-md)]">Horizontal Layout (Vertical Lines)</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
              For side-by-side content, use <code className="text-caption-sm bg-[var(--color-surface-secondary)] px-[var(--space-xsm)] rounded-xsm">layout="horizontal"</code> to create vertical divider lines.
            </p>
            
            <div className="flex items-center space-x-[var(--space-md)]">
              <span className="text-body-md">Left Content</span>
              <Separator layout="horizontal" />
              <span className="text-body-md">Middle Content</span>
              <Separator layout="horizontal" />
              <span className="text-body-md">Right Content</span>
            </div>
          </div>

          {/* Navigation Example */}
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h4 className="text-heading-xsm mb-[var(--space-md)]">Navigation Example</h4>
            <div className="flex items-center space-x-[var(--space-md)]">
              <Button variant="ghost" size="sm">Home</Button>
              <Separator layout="horizontal" />
              <Button variant="ghost" size="sm">About</Button>
              <Separator layout="horizontal" />
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>

          {/* Breadcrumb Example */}
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h4 className="text-heading-xsm mb-[var(--space-md)]">Breadcrumb Example</h4>
            <div className="flex items-center space-x-[var(--space-sm)]">
              <span className="text-body-sm text-[var(--color-text-brand)]">Home</span>
              <Separator layout="horizontal" />
              <span className="text-body-sm text-[var(--color-text-brand)]">Products</span>
              <Separator layout="horizontal" />
              <span className="text-body-sm">Laptops</span>
            </div>
          </div>
        </div>

        {/* Vertical Layout with Horizontal Lines */}
        <div className="mt-[var(--space-xlg)]">
          <h3 className="text-heading-sm mb-[var(--space-md)]">Vertical Layout (Horizontal Lines)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            For stacked content, use <code className="text-caption-sm bg-[var(--color-background-secondary)] px-[var(--space-xsm)] rounded-xsm">layout="vertical"</code> to create horizontal divider lines.
          </p>
          
          <div className="max-w-md bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <div className="space-y-[var(--space-md)]">
              <div className="text-body-md">First Item</div>
              <Separator layout="vertical" />
              <div className="text-body-md">Second Item</div>
              <Separator layout="vertical" />
              <div className="text-body-md">Third Item</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dot Separators */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Dot Separators</h2>
        <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
          Dot separators provide a softer visual division, ideal for inline content like tags, metadata, or subtle separations.
        </p>

        <div className="space-y-[var(--space-lg)]">
          {/* Basic Dot Separators */}
          <div>
            <h3 className="text-heading-sm mb-[var(--space-md)]">Basic Dot Separators</h3>
            <div className="flex items-center space-x-[var(--space-sm)]">
              <span className="text-body-md">Item One</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-md">Item Two</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-md">Item Three</span>
            </div>
          </div>

          {/* Metadata Example */}
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h4 className="text-heading-xsm mb-[var(--space-md)]">Article Metadata</h4>
            <div className="flex items-center space-x-[var(--space-sm)]">
              <span className="text-body-sm text-[var(--color-text-secondary)]">Aug 1, 2025</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-sm text-[var(--color-text-secondary)]">5 min read</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-sm text-[var(--color-text-secondary)]">Technology</span>
            </div>
          </div>

          {/* Tags Example */}
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h4 className="text-heading-xsm mb-[var(--space-md)]">Tags</h4>
            <div className="flex items-center space-x-[var(--space-sm)] flex-wrap">
              <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">React</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">TypeScript</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-label-sm bg-[var(--color-background-brand-subtle)] text-[var(--color-text-brand)] px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm">UI</span>
            </div>
          </div>

          {/* User Info Example */}
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h4 className="text-heading-xsm mb-[var(--space-md)]">User Profile</h4>
            <div className="flex items-center space-x-[var(--space-sm)]">
              <div className="flex items-center space-x-[var(--space-sm)]">
                <div className="w-[var(--size-md)] h-[var(--size-md)] bg-[var(--color-background-brand)] rounded-full flex items-center justify-center">
                  <Icon name="user" size="sm" color="inverse" />
                </div>
                <span className="text-body-medium-md">John Doe</span>
              </div>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-sm text-[var(--color-text-secondary)]">Premium User</span>
              <Separator type="dot" layout="horizontal" />
              <span className="text-body-sm text-[var(--color-text-secondary)]">Joined 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h3 className="text-heading-sm mb-[var(--space-md)] flex items-center space-x-[var(--space-sm)]">
              <Icon name="check" size="sm" color="success" />
              <span>When to Use Line Separators</span>
            </h3>
            <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
              <li>• Clear visual divisions between sections</li>
              <li>• Navigation menus and breadcrumbs</li>
              <li>• Distinct content areas</li>
              <li>• Strong hierarchical separation</li>
            </ul>
          </div>

          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg p-[var(--space-lg)]">
            <h3 className="text-heading-sm mb-[var(--space-md)] flex items-center space-x-[var(--space-sm)]">
              <Icon name="sparkles" size="sm" color="primary" />
              <span>When to Use Dot Separators</span>
            </h3>
            <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
              <li>• Subtle inline content separation</li>
              <li>• Metadata and tags</li>
              <li>• Related information grouping</li>
              <li>• Softer visual hierarchy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Notes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Technical Notes</h2>
        <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] rounded-lg p-[var(--space-lg)]">
          <div className="flex items-start space-x-[var(--space-sm)]">
            <Icon name="info" size="sm" color="info" className="mt-[var(--space-xsm)]" />
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-heading-sm">Orientation Logic</h3>
              <div className="text-body-sm text-[var(--color-text-secondary)] space-y-[var(--space-xsm)]">
                <p><strong>Horizontal orientation</strong> creates vertical lines (1px wide, 1em tall) for side-by-side content layout.</p>
                <p><strong>Vertical orientation</strong> creates horizontal lines (full width, 1px tall) for stacked content layout.</p>
                <p><strong>Dot separators</strong> only work with horizontal orientation for inline content.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}