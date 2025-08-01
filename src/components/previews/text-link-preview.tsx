import { TextLink } from "../ui/text-link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export function TextLinkPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Text Links */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Text Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
          {/* Default Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default Variant</CardTitle>
              <CardDescription>
                Primary brand-colored links for main navigation and actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center space-x-[var(--space-md)]">
                  <TextLink href="#" size="sm">Small link</TextLink>
                  <TextLink href="#" size="md">Medium link</TextLink>
                  <TextLink href="#" size="lg">Large link</TextLink>
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <TextLink href="#" disabled>Disabled link</TextLink>
                  <TextLink href="#" disabled icon="link">Disabled with icon</TextLink>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subtle Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Subtle Variant</CardTitle>
              <CardDescription>
                Secondary links for less prominent actions and references.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center space-x-[var(--space-md)]">
                  <TextLink href="#" variant="subtle" size="sm">Small subtle</TextLink>
                  <TextLink href="#" variant="subtle" size="md">Medium subtle</TextLink>
                  <TextLink href="#" variant="subtle" size="lg">Large subtle</TextLink>
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <TextLink href="#" variant="subtle" disabled>Disabled subtle</TextLink>
                  <TextLink href="#" variant="subtle" disabled icon="settings">Disabled subtle with icon</TextLink>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Links with Icons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Links with Icons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
          {/* Icon Positions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon Positioning</CardTitle>
              <CardDescription>
                Icons can be positioned on the left or right of link text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="space-y-[var(--space-sm)]">
                  <TextLink href="#" icon="arrow-left" iconPosition="left">
                    Back to previous page
                  </TextLink>
                  <TextLink href="#" icon="arrow-right" iconPosition="right">
                    Continue to next step
                  </TextLink>
                  <TextLink href="#" icon="link" iconPosition="right">
                    External resource
                  </TextLink>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Icon Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Common Icons</CardTitle>
              <CardDescription>
                Frequently used icons for different link types and actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-sm)]">
                <TextLink href="https://example.com" target="_blank" icon="link">
                  External link
                </TextLink>
                <TextLink href="#" icon="user">
                  View profile
                </TextLink>
                <TextLink href="#" icon="settings">
                  Account settings
                </TextLink>
                <TextLink href="#" icon="info">
                  Learn more
                </TextLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Usage Examples</h2>
        
        <div className="space-y-[var(--space-lg)]">
          {/* In Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Inline Content Links</CardTitle>
              <CardDescription>
                Links embedded within text content and paragraphs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <p className="text-body-md">
                  Welcome to our platform! You can{" "}
                  <TextLink href="#" size="md">create an account</TextLink>{" "}
                  to get started, or{" "}
                  <TextLink href="#" variant="subtle" size="md">browse as a guest</TextLink>.
                </p>
                <p className="text-body-md">
                  For more information, please{" "}
                  <TextLink href="#" icon="link" size="md">
                    visit our documentation
                  </TextLink>{" "}
                  or{" "}
                  <TextLink href="#" icon="circle-help" size="md">
                    contact support
                  </TextLink>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Navigation Links</CardTitle>
              <CardDescription>
                Links used for navigation, breadcrumbs, and page actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                {/* Breadcrumb Example */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Breadcrumbs</h4>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <TextLink href="#" variant="subtle" size="sm">Home</TextLink>
                    <Separator type="dot" orientation="horizontal" />
                    <TextLink href="#" variant="subtle" size="sm">Products</TextLink>
                    <Separator type="dot" orientation="horizontal" />
                    <span className="text-body-sm">Current Page</span>
                  </div>
                </div>

                {/* Action Links */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-sm)]">Page Actions</h4>
                  <div className="flex items-center space-x-[var(--space-md)]">
                    <TextLink href="#" icon="arrow-left" iconPosition="left" size="sm">
                      Back
                    </TextLink>
                    <Separator orientation="horizontal" />
                    <TextLink href="#" icon="share" size="sm">
                      Share
                    </TextLink>
                    <Separator orientation="horizontal" />
                    <TextLink href="#" icon="bookmark" size="sm">
                      Save
                    </TextLink>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Link Lists */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Link Lists</CardTitle>
              <CardDescription>
                Organized collections of related links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-md)]">Resources</h4>
                  <div className="space-y-[var(--space-sm)]">
                    <TextLink href="#" icon="info">Documentation</TextLink>
                    <TextLink href="#" icon="circle-help">Help Center</TextLink>
                    <TextLink href="#" icon="user">Community</TextLink>
                    <TextLink href="https://api.example.com" target="_blank" icon="link">
                      API Reference
                    </TextLink>
                  </div>
                </div>

                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-md)]">Account</h4>
                  <div className="space-y-[var(--space-sm)]">
                    <TextLink href="#" icon="user">Profile Settings</TextLink>
                    <TextLink href="#" icon="settings">Preferences</TextLink>
                    <TextLink href="#" variant="subtle">Privacy Policy</TextLink>
                    <TextLink href="#" variant="subtle">Terms of Service</TextLink>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility & Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Accessibility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Security & External Links</CardTitle>
              <CardDescription>
                Automatic security attributes for external links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-sm)]">
                <TextLink href="https://example.com" target="_blank" icon="link">
                  External link (auto rel="noopener noreferrer")
                </TextLink>
                <TextLink href="https://trusted-site.com" target="_blank" rel="nofollow" icon="link">
                  External with custom rel
                </TextLink>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Focus & States</CardTitle>
              <CardDescription>
                Proper focus management and state handling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-sm)]">
                <TextLink href="#" icon="check">
                  Focus with Tab key
                </TextLink>
                <TextLink href="#" disabled icon="x">
                  Disabled and not focusable
                </TextLink>
                <p className="text-caption-sm text-[var(--color-text-secondary)]">
                  Links automatically receive focus outlines and proper ARIA attributes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Design Guidelines */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Design Guidelines</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">When to Use Each Variant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
              <div>
                <h4 className="text-body-medium-md mb-[var(--space-sm)] text-[var(--color-text-brand)]">Default Links</h4>
                <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                  <li>• Primary navigation and actions</li>
                  <li>• Call-to-action links</li>
                  <li>• Important external resources</li>
                  <li>• Main content links</li>
                </ul>
              </div>
              <div>
                <h4 className="text-body-medium-md mb-[var(--space-sm)] text-[var(--color-text-secondary)]">Subtle Links</h4>
                <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                  <li>• Secondary navigation</li>
                  <li>• Footer links</li>
                  <li>• Metadata and references</li>
                  <li>• Less important actions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}