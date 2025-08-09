import { AppFrame } from "../product/app-frame";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function AppFramePreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Full Application Layout */}
      <section className="h-[900px] w-full rounded-lg border border-[var(--color-border-primary-subtle)]">
        <div className="h-full">
          <AppFrame
            breadcrumbs={[
              { label: "Dashboard", href: "#" },
              { label: "Analytics" },
            ]}
          >
            <div className="mx-[var(--space-md)] grid auto-rows-min gap-[var(--space-md)]  md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-heading-md">
                    Welcome to Tide DS
                  </CardTitle>
                  <CardDescription>
                    This is a demonstration of the consolidated AppFrame
                    component for Sea platform with integrated sidebar and
                    navigation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-[var(--space-md)]">
                    <p className="text-body-md text-[var(--color-text-secondary)]">
                      The AppFrame component provides a complete application
                      layout with:
                    </p>
                    <ul className="text-body-sm list-inside list-disc space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                      <li>
                        Collapsible sidebar with combined user/team switcher
                      </li>
                      <li>Command palette with keyboard shortcuts (Ctrl+K)</li>
                      <li>Hierarchical navigation with collapsible sections</li>
                      <li>Combined user and team management dropdown</li>
                      <li>Breadcrumb navigation with Sea branding</li>
                      <li>Responsive design with proper vertical scrolling</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-sm">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-[var(--space-sm)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]" aria-hidden="true"></div>
                      <span className="text-body-sm">Keyboard shortcuts</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]" aria-hidden="true"></div>
                      <span className="text-body-sm">Mobile responsive</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]" aria-hidden="true"></div>
                      <span className="text-body-sm">State persistence</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]" aria-hidden="true"></div>
                      <span className="text-body-sm">Theme integration</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AppFrame>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Usage Example</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Implementation</CardTitle>
            <CardDescription>
              How to use the AppFrame component in your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="text-body-sm overflow-x-auto rounded-md bg-[var(--color-surface-secondary)] p-[var(--space-md)]">
              {`import { AppFrame } from "@/components/product/app-frame"

export function MyPage() {
  return (
    <AppFrame 
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Analytics" }
      ]}
    >
      <div className="space-y-4">
        <h1 className="text-heading-lg">My Page</h1>
        {/* Your page content */}
      </div>
    </AppFrame>
  )
}`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Components Overview */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Component Architecture
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Sidebar Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-body-sm space-y-[var(--space-sm)]">
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    AppFrame
                  </code>{" "}
                  - Main container with sidebar and content area
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    AppSidebar
                  </code>{" "}
                  - Internal sidebar with navigation and search
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    CombinedSwitcher
                  </code>{" "}
                  - Unified user/team selector in footer
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    sidebarData
                  </code>{" "}
                  - Navigation structure and user/team data
                </li>
              </ul>
              <p className="text-body-sm mt-[var(--space-md)] text-[var(--color-text-secondary)]">
                All components are consolidated into a single file for easier
                maintenance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-body-sm space-y-[var(--space-sm)]">
                <li>• Sea platform branding with SVG logo</li>
                <li>• Command palette with fuzzy search (Ctrl+K)</li>
                <li>
                  • Collapsible navigation sections (Management, Intelligence)
                </li>
                <li>• Combined user/team switcher with rich dropdown</li>
                <li>• Proper vertical scrolling and overflow handling</li>
                <li>• Mobile-responsive sidebar behavior</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card className="border-[var(--color-border-success)]">
            <CardHeader>
              <CardTitle className="text-heading-sm text-[var(--color-text-success)]">
                ✓ Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Use semantic navigation labels</li>
                <li>• Provide keyboard shortcuts for common actions</li>
                <li>• Keep navigation hierarchy shallow</li>
                <li>• Use consistent icons throughout</li>
                <li>• Test collapsed sidebar mode</li>
                <li>• Implement proper loading states</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-error)]">
            <CardHeader>
              <CardTitle className="text-heading-sm text-[var(--color-text-error)]">
                ✗ Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Too many top-level navigation items</li>
                <li>• Unclear or generic navigation labels</li>
                <li>• Nested dropdowns more than 2 levels deep</li>
                <li>• Missing mobile responsiveness</li>
                <li>• Inconsistent interaction patterns</li>
                <li>• Overwhelming the sidebar with options</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
