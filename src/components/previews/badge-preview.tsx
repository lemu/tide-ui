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
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Badge Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Badge Variants</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
          {/* Default Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default</CardTitle>
              <CardDescription>
                Primary brand badge with shadow for emphasis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="default">Default</Badge>
                <Badge variant="default">New Feature</Badge>
                <Badge variant="default">Premium</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Secondary</CardTitle>
              <CardDescription>
                Neutral badge for less prominent labeling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="secondary">Internal</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Success Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success</CardTitle>
              <CardDescription>
                Success badge for positive status and completion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="success">Success</Badge>
                <Badge variant="success">Active</Badge>
                <Badge variant="success">Completed</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Warning Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Warning</CardTitle>
              <CardDescription>
                Warning badge for cautionary states and attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="warning">Warning</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="warning">Review</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Destructive Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Destructive</CardTitle>
              <CardDescription>
                Error badge for failures and critical issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="destructive">Error</Badge>
                <Badge variant="destructive">Failed</Badge>
                <Badge variant="destructive">Blocked</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Outline Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Outline</CardTitle>
              <CardDescription>
                Subtle badge with border for minimal emphasis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-sm)]">
                <Badge variant="outline">Outline</Badge>
                <Badge variant="outline">Category</Badge>
                <Badge variant="outline">Tag</Badge>
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
                <Badge size="sm" variant="secondary">Tag</Badge>
                <Badge size="sm" variant="success">Live</Badge>
                <Badge size="sm" variant="outline">Mini</Badge>
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
                <Badge size="md" variant="secondary">Status</Badge>
                <Badge size="md" variant="warning">Alert</Badge>
                <Badge size="md" variant="outline">Label</Badge>
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
                <Badge size="lg" variant="secondary">Featured</Badge>
                <Badge size="lg" variant="destructive">Critical</Badge>
                <Badge size="lg" variant="outline">Important</Badge>
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
                <Badge variant="success" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="check-circle" size="sm" />
                  Verified
                </Badge>
                <Badge variant="warning" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="clock" size="sm" />
                  Pending
                </Badge>
                <Badge variant="destructive" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="x-circle" size="sm" />
                  Failed
                </Badge>
                <Badge variant="outline" className="inline-flex items-center gap-[var(--space-xsm)]">
                  <Icon name="star" size="sm" />
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
                <Badge variant="success" className="flex items-center justify-center">
                  <Icon name="check" size="sm" />
                </Badge>
                <Badge variant="warning" className="flex items-center justify-center">
                  <Icon name="triangle-alert" size="sm" />
                </Badge>
                <Badge variant="destructive" className="flex items-center justify-center">
                  <Icon name="x" size="sm" />
                </Badge>
                <Badge variant="outline" className="flex items-center justify-center">
                  <Icon name="info" size="sm" />
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Notification Badges */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Notification Badges</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Count Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Count Badges</CardTitle>
              <CardDescription>
                Circular badges for notification counts and numbers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-[var(--space-lg)] items-center">
                <div className="relative">
                  <Icon name="bell" size="lg" className="text-[var(--color-text-secondary)]" />
                  <Badge 
                    variant="destructive" 
                    size="sm"
                    className="absolute -top-[var(--space-xsm)] -right-[var(--space-xsm)] h-[var(--size-xsm)] min-w-[var(--size-xsm)] rounded-full px-[var(--space-xsm)] text-caption-strong-xsm leading-none flex items-center justify-center"
                  >
                    3
                  </Badge>
                </div>
                <div className="relative">
                  <Icon name="mail" size="lg" className="text-[var(--color-text-secondary)]" />
                  <Badge 
                    variant="default" 
                    size="sm"
                    className="absolute -top-[var(--space-xsm)] -right-[var(--space-xsm)] h-[var(--size-xsm)] min-w-[var(--size-xsm)] rounded-full px-[var(--space-xsm)] text-caption-strong-xsm leading-none flex items-center justify-center"
                  >
                    12
                  </Badge>
                </div>
                <div className="relative">
                  <Icon name="shopping-cart" size="lg" className="text-[var(--color-text-secondary)]" />
                  <Badge 
                    variant="warning" 
                    size="sm"
                    className="absolute -top-[var(--space-xsm)] -right-[var(--space-xsm)] h-[var(--size-xsm)] min-w-[var(--size-xsm)] rounded-full px-[var(--space-xsm)] text-caption-strong-xsm leading-none flex items-center justify-center"
                  >
                    99+
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Status Indicators</CardTitle>
              <CardDescription>
                Small dot badges for simple status indication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Badge 
                    variant="success" 
                    className="h-[var(--space-xsm)] w-[var(--space-xsm)] rounded-full p-0 flex items-center justify-center"
                    aria-hidden="true"
                  />
                  <span className="text-body-md">Online</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Badge 
                    variant="warning" 
                    className="h-[var(--space-xsm)] w-[var(--space-xsm)] rounded-full p-0 flex items-center justify-center"
                    aria-hidden="true"
                  />
                  <span className="text-body-md">Away</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Badge 
                    variant="destructive" 
                    className="h-[var(--space-xsm)] w-[var(--space-xsm)] rounded-full p-0 flex items-center justify-center"
                    aria-hidden="true"
                  />
                  <span className="text-body-md">Offline</span>
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Badge 
                    variant="secondary" 
                    className="h-[var(--space-xsm)] w-[var(--space-xsm)] rounded-full p-0 flex items-center justify-center"
                    aria-hidden="true"
                  />
                  <span className="text-body-md">Unknown</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    <Badge variant="outline">Technology</Badge>
                    <Badge variant="outline">Design</Badge>
                    <Badge variant="outline">Tutorial</Badge>
                    <Badge variant="outline">News</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Priority Labels</h4>
                  <div className="flex flex-wrap gap-[var(--space-sm)]">
                    <Badge variant="destructive">High Priority</Badge>
                    <Badge variant="warning">Medium Priority</Badge>
                    <Badge variant="secondary">Low Priority</Badge>
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
                      <Badge variant="success">
                        <Icon name="check-circle" size="xs" className="mr-[var(--space-xsm)]" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-md">Database</span>
                      <Badge variant="warning">
                        <Icon name="triangle-alert" size="xs" className="mr-[var(--space-xsm)]" />
                        Degraded
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body-md">File Storage</span>
                      <Badge variant="destructive">
                        <Icon name="x-circle" size="xs" className="mr-[var(--space-xsm)]" />
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
                  <Badge variant="default">Admin</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-md font-medium">Jane Smith</span>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">jane@example.com</p>
                  </div>
                  <Badge variant="secondary">Editor</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-body-md font-medium">Mike Johnson</span>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">mike@example.com</p>
                  </div>
                  <Badge variant="outline">Viewer</Badge>
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
                  <Badge variant="default">Pro</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">API Access</span>
                  <Badge variant="warning">Beta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Team Collaboration</span>
                  <Badge variant="success">
                    <Icon name="sparkles" size="xs" className="mr-[var(--space-xsm)]" />
                    New
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Export Tools</span>
                  <Badge variant="outline">Coming Soon</Badge>
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