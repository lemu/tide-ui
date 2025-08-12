import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Icon } from "../ui/icon";

export function BadgePreview() {
  const intents = ["neutral", "brand", "success", "warning", "destructive"] as const;
  const appearances = ["solid", "subtle", "outline"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Complete Badge Matrix */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Complete Badge Matrix</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-md">All Intent × Appearance Combinations</CardTitle>
            <CardDescription>
              Visual overview of all 15 badge variants (5 intents × 3 appearances) in default medium size.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-[var(--space-md)] text-body-medium-sm border-b border-[var(--color-border-primary-subtle)]">
                      Intent
                    </th>
                    {appearances.map((appearance) => (
                      <th key={appearance} className="text-center p-[var(--space-md)] text-body-medium-sm border-b border-[var(--color-border-primary-subtle)] capitalize">
                        {appearance}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {intents.map((intent) => (
                    <tr key={intent}>
                      <td className="p-[var(--space-md)] text-body-medium-sm border-b border-[var(--color-border-primary-subtle)] capitalize">
                        {intent}
                      </td>
                      {appearances.map((appearance) => (
                        <td key={`${intent}-${appearance}`} className="p-[var(--space-md)] text-center border-b border-[var(--color-border-primary-subtle)]">
                          <Badge intent={intent} appearance={appearance}>
                            {intent} {appearance}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Size Comparison Matrix */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Size Variants</h2>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Brand Intent - All Sizes</CardTitle>
              <CardDescription>
                Size comparison across all appearances for brand intent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                {appearances.map((appearance) => (
                  <div key={appearance}>
                    <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)] capitalize">
                      {appearance} appearance
                    </p>
                    <div className="flex items-center gap-[var(--space-md)]">
                      {sizes.map((size) => (
                        <Badge key={size} intent="brand" appearance={appearance} size={size}>
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success Intent - All Sizes</CardTitle>
              <CardDescription>
                Size comparison across all appearances for success intent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                {appearances.map((appearance) => (
                  <div key={appearance}>
                    <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)] capitalize">
                      {appearance} appearance
                    </p>
                    <div className="flex items-center gap-[var(--space-md)]">
                      {sizes.map((size) => (
                        <Badge key={size} intent="success" appearance={appearance} size={size}>
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Intent Overview */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Intent Types</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
          {/* Neutral Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Neutral</CardTitle>
              <CardDescription>
                Default neutral badges for general labeling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="neutral">Default</Badge>
                <Badge intent="neutral">Category</Badge>
                <Badge intent="neutral">Draft</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Brand Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Brand</CardTitle>
              <CardDescription>
                Brand-colored badges for emphasis and promotion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="brand">Featured</Badge>
                <Badge intent="brand">Premium</Badge>
                <Badge intent="brand">Pro</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Success Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success</CardTitle>
              <CardDescription>
                Success badges for positive status and completion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="success">Success</Badge>
                <Badge intent="success">Active</Badge>
                <Badge intent="success">Completed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Warning Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Warning</CardTitle>
              <CardDescription>
                Warning badges for cautionary states and attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="warning">Warning</Badge>
                <Badge intent="warning">Pending</Badge>
                <Badge intent="warning">Review</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Destructive Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Destructive</CardTitle>
              <CardDescription>
                Error badges for failures and critical issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="destructive">Error</Badge>
                <Badge intent="destructive">Failed</Badge>
                <Badge intent="destructive">Blocked</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Appearance Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Appearance Variants</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* All Appearances - Brand Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Brand Intent - All Appearances</CardTitle>
              <CardDescription>
                Different visual treatments for brand intent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Solid (high emphasis)</p>
                  <Badge intent="brand" appearance="solid">Brand Solid</Badge>
                </div>
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Subtle (low emphasis)</p>
                  <Badge intent="brand" appearance="subtle">Brand Subtle</Badge>
                </div>
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Outline (minimal emphasis)</p>
                  <Badge intent="brand" appearance="outline">Brand Outline</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Appearances - Success Intent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success Intent - All Appearances</CardTitle>
              <CardDescription>
                Different visual treatments for success intent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Solid (high emphasis)</p>
                  <Badge intent="success" appearance="solid">Success Solid</Badge>
                </div>
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Subtle (low emphasis)</p>
                  <Badge intent="success" appearance="subtle">Success Subtle</Badge>
                </div>
                <div>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Outline (minimal emphasis)</p>
                  <Badge intent="success" appearance="outline">Success Outline</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badge Sizes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Badge Sizes</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Small Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Small</CardTitle>
              <CardDescription>
                Compact badges for dense interfaces and inline use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)] items-center">
                <Badge size="sm">Small</Badge>
                <Badge size="sm" intent="neutral">Tag</Badge>
                <Badge size="sm" intent="success">Live</Badge>
                <Badge size="sm" intent="neutral" appearance="outline">Mini</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Default Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default</CardTitle>
              <CardDescription>
                Standard badge size for most use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)] items-center">
                <Badge size="md">Default</Badge>
                <Badge size="md" intent="neutral">Status</Badge>
                <Badge size="md" intent="warning">Alert</Badge>
                <Badge size="md" intent="neutral" appearance="outline">Label</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Large Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Large</CardTitle>
              <CardDescription>
                Prominent badges for emphasis and visibility.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)] items-center">
                <Badge size="lg">Large</Badge>
                <Badge size="lg" intent="neutral">Featured</Badge>
                <Badge size="lg" intent="destructive">Critical</Badge>
                <Badge size="lg" intent="neutral" appearance="outline">Important</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badges with Icons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Badges with Icons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Icon Left */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon + Text</CardTitle>
              <CardDescription>
                Badges with icons for enhanced visual communication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="success" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="check-circle" size="sm" color="inherit" />
                  Verified
                </Badge>
                <Badge intent="warning" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="clock" size="sm" color="inherit" />
                  Pending
                </Badge>
                <Badge intent="destructive" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="x-circle" size="sm" color="inherit" />
                  Failed
                </Badge>
                <Badge intent="neutral" appearance="outline" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="star" size="sm" color="inherit" />
                  Featured
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Icon Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon Only</CardTitle>
              <CardDescription>
                Compact icon-only badges for minimal interfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge intent="success" className="flex items-center justify-center">
                  <Icon name="check" size="sm" color="inherit" />
                </Badge>
                <Badge intent="warning" className="flex items-center justify-center">
                  <Icon name="triangle-alert" size="sm" color="inherit" />
                </Badge>
                <Badge intent="destructive" className="flex items-center justify-center">
                  <Icon name="x" size="sm" color="inherit" />
                </Badge>
                <Badge intent="neutral" appearance="outline" className="flex items-center justify-center">
                  <Icon name="info" size="sm" color="inherit" />
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Notification Badges */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Notification Badges</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Count Badges</CardTitle>
            <CardDescription>
              Circular badges for notification counts and numbers using solid appearance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-lg)]">
              <div>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Destructive intent</p>
                <Badge intent="destructive" appearance="solid" size="sm">3</Badge>
              </div>
              <div>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Brand intent</p>
                <Badge intent="brand" appearance="solid" size="sm">12</Badge>
              </div>
              <div>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">Warning intent</p>
                <Badge intent="warning" appearance="solid" size="sm">99+</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Content Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Content Categories</CardTitle>
              <CardDescription>
                Badges for categorizing and tagging content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Blog Post Categories</h4>
                  <div className="flex flex-wrap gap-[var(--space-sm)]">
                    <Badge intent="neutral" appearance="outline">Technology</Badge>
                    <Badge intent="neutral" appearance="outline">Design</Badge>
                    <Badge intent="neutral" appearance="outline">Tutorial</Badge>
                    <Badge intent="neutral" appearance="outline">News</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Priority Labels</h4>
                  <div className="flex flex-wrap gap-[var(--space-sm)]">
                    <Badge intent="destructive">High Priority</Badge>
                    <Badge intent="warning">Medium Priority</Badge>
                    <Badge intent="neutral">Low Priority</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">System Status</CardTitle>
              <CardDescription>
                Badges for system health and service status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Service Health</h4>
                  <div className="space-y-[var(--space-sm)]">
                    <div className="flex items-center justify-between">
                      <span className="text-body-md">API Gateway</span>
                      <Badge intent="success">
                        <Icon name="check-circle" size="sm" color="inherit" className="mr-[var(--space-xsm)]" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-md">Database</span>
                      <Badge intent="warning">
                        <Icon name="triangle-alert" size="sm" color="inherit" className="mr-[var(--space-xsm)]" />
                        Degraded
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-md">File Storage</span>
                      <Badge intent="destructive">
                        <Icon name="x-circle" size="sm" color="inherit" className="mr-[var(--space-xsm)]" />
                        Outage
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">User Roles</CardTitle>
              <CardDescription>
                Badges for user permissions and role indication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-md font-medium">John Doe</span>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">john@example.com</p>
                  </div>
                  <Badge intent="brand">Admin</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-md font-medium">Jane Smith</span>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">jane@example.com</p>
                  </div>
                  <Badge intent="neutral">Editor</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-md font-medium">Mike Johnson</span>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">mike@example.com</p>
                  </div>
                  <Badge intent="neutral" appearance="outline">Viewer</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Feature Flags</CardTitle>
              <CardDescription>
                Badges for feature availability and versioning.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Advanced Analytics</span>
                  <Badge intent="brand">Pro</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">API Access</span>
                  <Badge intent="warning">Beta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Team Collaboration</span>
                  <Badge intent="success">
                    <Icon name="sparkles" size="sm" color="inherit" className="mr-[var(--space-xsm)]" />
                    New
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Export Tools</span>
                  <Badge intent="neutral" appearance="outline">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="check" size="sm" color="success" />
                <span>Good Examples</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use appropriate variants for different meanings</li>
                <li>• Keep badge text concise and descriptive</li>
                <li>• Use consistent sizing within the same context</li>
                <li>• Include icons to enhance meaning when helpful</li>
                <li>• Use notification badges sparingly to avoid clutter</li>
                <li>• Ensure adequate color contrast for accessibility</li>
                <li>• Group related badges logically</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="x" size="sm" color="error" />
                <span>Avoid</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Don't overuse badges - they lose impact</li>
                <li>• Avoid unclear or ambiguous badge text</li>
                <li>• Don't mix different sizes randomly</li>
                <li>• Avoid using wrong variants (success for errors, etc.)</li>
                <li>• Don't make badges clickable without clear indication</li>
                <li>• Avoid low contrast color combinations</li>
                <li>• Don't use badges for lengthy text content</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}