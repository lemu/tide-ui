import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

export function CardPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Card Example */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Cards</h2>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Card */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                Card description goes here. This provides context about the
                content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-md">
                This is the main content area of the card. You can put any
                content here.
              </p>
            </CardContent>
          </Card>

          {/* Card with Footer */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Project Update</CardTitle>
              <CardDescription>
                Latest changes and improvements to the project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-md">
                We've added new features and fixed several bugs in this release.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Cards with Actions */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Cards with Actions
        </h2>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Card with Multiple Actions */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-[var(--space-md)]">
                <div className="flex h-[var(--size-lg)] w-[var(--size-lg)] items-center justify-center rounded-full bg-[var(--color-background-brand)]">
                  <Icon name="user" size="sm" color="inverse" />
                </div>
                <div>
                  <p className="text-body-medium-md">John Doe</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    john@example.com
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="default" size="sm">
                Edit Profile
              </Button>
              <Button size="sm">
                <Icon name="settings" size="sm" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card with Icon Actions */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notifications</span>
                <Icon name="circle-help" size="sm" color="secondary" />
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Email notifications</span>
                  <div className="flex h-[var(--size-md)] w-[var(--size-md)] items-center justify-center rounded-full bg-[var(--color-background-success)]">
                    <Icon name="check" size="sm" color="inverse" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Push notifications</span>
                  <div className="h-[var(--size-md)] w-[var(--size-md)] rounded-full bg-[var(--color-background-secondary)]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Complex Cards */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Complex Cards</h2>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-[var(--space-sm)]">
                <Icon name="sparkles" size="sm" color="primary" />
                <span>Performance Metrics</span>
              </CardTitle>
              <CardDescription>
                Your application's key performance indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-[var(--space-lg)]">
                <div className="text-center">
                  <div className="text-heading-lg text-[var(--color-text-brand)]">
                    94%
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Uptime
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-heading-lg text-[var(--color-text-success)]">
                    1.2s
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Load Time
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-heading-lg text-[var(--color-text-brand)]">
                    2.1K
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Users
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-heading-lg text-[var(--color-text-success)]">
                    98%
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Satisfaction
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                <Icon name="link" size="sm" />
                View Full Report
              </Button>
            </CardFooter>
          </Card>

          {/* Action Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-[var(--space-sm)]">
                <Icon name="ship" size="sm" color="primary" />
                <span>Recent Shipment</span>
              </CardTitle>
              <CardDescription>
                Track your latest order and delivery status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-md">Order #12345</span>
                  <span className="text-label-sm rounded-sm bg-[var(--color-background-success-bold)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-on-action)]">
                    Shipped
                  </span>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Icon name="package" size="sm" color="secondary" />
                  <span className="text-body-sm text-[var(--color-text-secondary)]">
                    Premium Package
                  </span>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Icon name="route" size="sm" color="secondary" />
                  <span className="text-body-sm text-[var(--color-text-secondary)]">
                    Expected: Aug 5, 2025
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="default" size="sm">
                <Icon name="navigation" size="sm" />
                Track Package
              </Button>
              <Button size="sm">
                <Icon name="circle-help" size="sm" />
                Get Help
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Card Variations */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Card Variations
        </h2>
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Minimal Card */}
          <Card className="p-[var(--space-lg)]">
            <div className="text-center">
              <Icon
                name="star"
                size="lg"
                color="primary"
                className="mx-auto mb-[var(--space-md)]"
              />
              <h3 className="text-heading-sm mb-[var(--space-sm)]">Featured</h3>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                This item has been marked as featured content.
              </p>
            </div>
          </Card>

          {/* Compact Card */}
          <Card>
            <CardContent className="p-[var(--space-md)]">
              <div className="flex items-center space-x-[var(--space-md)]">
                <div className="flex h-[var(--size-md)] w-[var(--size-md)] items-center justify-center rounded-md bg-[var(--color-background-brand)]">
                  <Icon name="bookmark" size="sm" color="inverse" />
                </div>
                <div>
                  <h4 className="text-body-medium-md">Bookmarked</h4>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    5 items saved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card>
            <CardHeader className="pb-[var(--space-sm)]">
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <div className="h-[var(--size-3xsm)] w-[var(--size-3xsm)] rounded-full bg-[var(--color-background-success-bold)]"></div>
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                All systems are operational and running smoothly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
