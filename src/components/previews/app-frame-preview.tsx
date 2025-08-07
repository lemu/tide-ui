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
      <section className="h-[800px] w-full overflow-hidden rounded-lg border border-[var(--color-border-primary-subtle)]">
        <AppFrame
          breadcrumbs={[
            { label: "Dashboard", href: "#" },
            { label: "Analytics" },
          ]}
        >
          <div className="grid auto-rows-min gap-[var(--space-md)] md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-heading-md">
                  Welcome to Tide DS
                </CardTitle>
                <CardDescription>
                  This is a demonstration of the AppFrame component using
                  sidebar-07 layout from shadcn/ui blocks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <p className="text-body-md text-[var(--color-text-secondary)]">
                    The AppFrame component provides a complete application
                    layout with:
                  </p>
                  <ul className="text-body-sm list-inside list-disc space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                    <li>Collapsible sidebar with team switcher</li>
                    <li>Main navigation with collapsible sections</li>
                    <li>Project navigation with context menus</li>
                    <li>User profile dropdown</li>
                    <li>Breadcrumb navigation</li>
                    <li>Responsive design (try resizing the window)</li>
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
                    <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]"></div>
                    <span className="text-body-sm">Keyboard shortcuts</span>
                  </div>
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]"></div>
                    <span className="text-body-sm">Mobile responsive</span>
                  </div>
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]"></div>
                    <span className="text-body-sm">State persistence</span>
                  </div>
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <div className="h-2 w-2 rounded-full bg-[var(--color-background-success)]"></div>
                    <span className="text-body-sm">Theme integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AppFrame>
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
                    AppSidebar
                  </code>{" "}
                  - Main sidebar container
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    TeamSwitcher
                  </code>{" "}
                  - Organization/team selector
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    NavMain
                  </code>{" "}
                  - Primary navigation menu
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    NavProjects
                  </code>{" "}
                  - Project-specific navigation
                </li>
                <li>
                  <code className="rounded bg-[var(--color-surface-secondary)] px-1 py-0.5">
                    NavUser
                  </code>{" "}
                  - User profile and settings
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-body-sm space-y-[var(--space-sm)]">
                <li>• Icon-only collapse mode</li>
                <li>• Tooltips in collapsed state</li>
                <li>• Collapsible navigation sections</li>
                <li>• Dropdown menus with actions</li>
                <li>• Breadcrumb integration</li>
                <li>• Mobile-optimized overlay</li>
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
