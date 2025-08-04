import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Icon } from "../ui/icon";
import { TextLink } from "../ui/text-link";

export function BreadcrumbPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Breadcrumbs */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Basic Breadcrumbs
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Breadcrumb */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Simple Breadcrumb
              </CardTitle>
              <CardDescription>
                Basic breadcrumb navigation with links and current page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Laptop</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </CardContent>
          </Card>

          {/* With Custom Separators */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Custom Separators
              </CardTitle>
              <CardDescription>
                Breadcrumbs with different separator styles and icons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <span className="text-[var(--color-text-tertiary)]">
                        /
                      </span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <span className="text-[var(--color-text-tertiary)]">
                        /
                      </span>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Components</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        <Icon name="home" size="sm" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Website Redesign</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Breadcrumbs */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Advanced Breadcrumbs
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
          {/* With Ellipsis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Collapsed Breadcrumb
              </CardTitle>
              <CardDescription>
                Long breadcrumb paths with ellipsis for better space management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/category/electronics">
                        Electronics
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/users/profile">
                        Profile
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Account Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Icons</CardTitle>
              <CardDescription>
                Breadcrumbs enhanced with icons for better visual hierarchy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/"
                        className="flex items-center gap-[var(--space-xsm)]"
                      >
                        <Icon name="home" size="sm" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/products"
                        className="flex items-center gap-[var(--space-xsm)]"
                      >
                        <Icon name="package" size="sm" />
                        Products
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/admin"
                        className="flex items-center gap-[var(--space-xsm)]"
                      >
                        <Icon name="settings" size="sm" />
                        Admin
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/admin/users"
                        className="flex items-center gap-[var(--space-xsm)]"
                      >
                        <Icon name="user" size="sm" />
                        Users
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>John Doe</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Integration Examples
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* With Custom Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Custom Link Components
              </CardTitle>
              <CardDescription>
                Using asChild prop with custom link components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <TextLink href="/" icon="home">
                          Home
                        </TextLink>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <TextLink href="/docs" icon="bookmark">
                          Documentation
                        </TextLink>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>API Reference</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </CardContent>
          </Card>

          {/* Real-world Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Real-world Usage
              </CardTitle>
              <CardDescription>
                Practical breadcrumb examples for different contexts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                {/* E-commerce */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">
                    E-commerce
                  </h4>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Store</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/category/electronics">
                          Electronics
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/category/electronics/computers">
                          Computers
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>MacBook Pro 16"</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                {/* Admin Dashboard */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">
                    Admin Dashboard
                  </h4>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">
                          <Icon name="layout-dashboard" size="sm" />
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/users">
                          Users
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>User Profile</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Keep breadcrumb paths concise and meaningful</li>
                <li>• Use ellipsis for very long navigation paths</li>
                <li>• Make intermediate links clickable and functional</li>
                <li>• Use consistent separators throughout the application</li>
                <li>• Include proper ARIA labels for accessibility</li>
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Don't make the current page clickable</li>
                <li>• Avoid overly long breadcrumb chains (5+ levels)</li>
                <li>• Don't use breadcrumbs for single-level navigation</li>
                <li>• Avoid inconsistent separator styles</li>
                <li>• Don't truncate important navigation information</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
