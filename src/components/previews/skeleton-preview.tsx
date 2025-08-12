import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
} from "../ui/skeleton";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function SkeletonPreview() {
  const [showActual, setShowActual] = useState(false);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Skeletons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Skeletons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Text Skeletons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Text Skeletons</CardTitle>
              <CardDescription>
                Basic skeleton lines for text content with different sizes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Single Line Skeletons
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <Skeleton height={20} width="100%" />
                  <Skeleton height={16} width="85%" />
                  <Skeleton height={16} width="60%" />
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Multiple Line Skeletons
                </div>
                <Skeleton lines={3} size="sm" randomWidth />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Different Sizes
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <Skeleton size="sm" width="70%" />
                  <Skeleton size="md" width="70%" />
                  <Skeleton size="lg" width="70%" />
                  <Skeleton size="xl" width="70%" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shape Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Shape Variants</CardTitle>
              <CardDescription>
                Different skeleton shapes for various UI elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Circular Skeletons
                </div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Skeleton variant="circle" width={32} height={32} />
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="circle" width={48} height={48} />
                  <Skeleton variant="circle" width={64} height={64} />
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Rectangular Skeletons
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <Skeleton variant="rectangular" height={100} width="100%" />
                  <Skeleton variant="rectangular" height={60} width="80%" />
                  <Skeleton variant="rectangular" height={40} width="60%" />
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Random Width Skeletons
                </div>
                <div className="space-y-[var(--space-sm)]">
                  <Skeleton randomWidth />
                  <Skeleton randomWidth />
                  <Skeleton randomWidth />
                  <Skeleton randomWidth />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Specialized Components */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Specialized Components</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Avatar Skeletons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Avatar Skeletons</CardTitle>
              <CardDescription>
                Pre-configured skeleton components for common UI elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Avatar Sizes
                </div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <SkeletonAvatar size="sm" />
                  <SkeletonAvatar size="md" />
                  <SkeletonAvatar size="lg" />
                  <SkeletonAvatar size="xl" />
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Button Skeletons
                </div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <SkeletonButton size="sm" />
                  <SkeletonButton size="md" />
                  <SkeletonButton size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complex Layouts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Complex Layouts</CardTitle>
              <CardDescription>
                Skeleton components for cards, lists, and other layouts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  User Profile Card
                </div>
                <div className="flex items-start gap-[var(--space-md)] p-[var(--space-lg)] border border-[var(--color-border-primary-subtle)] rounded-lg">
                  <SkeletonAvatar size="lg" />
                  <div className="flex-1 space-y-[var(--space-sm)]">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={16} width="40%" />
                    <Skeleton lines={2} size="sm" randomWidth />
                  </div>
                  <SkeletonButton size="sm" />
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Navigation Menu
                </div>
                <div className="space-y-[var(--space-sm)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-[var(--space-sm)]">
                      <Skeleton variant="circle" width={16} height={16} />
                      <Skeleton height={16} randomWidth />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Card and Table Skeletons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Card and Table Skeletons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Card Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Card Skeleton</CardTitle>
              <CardDescription>
                Pre-built skeleton for card-like content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonCard />
            </CardContent>
          </Card>

          {/* Table Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Table Skeleton</CardTitle>
              <CardDescription>
                Skeleton for tabular data with customizable rows/columns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SkeletonTable rows={4} columns={3} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Loading State Comparison</h2>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-heading-sm">
                {showActual ? "Loaded Content" : "Loading State"}
              </CardTitle>
              <CardDescription>
                Toggle between skeleton loading state and actual content.
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowActual(!showActual)}
              variant="ghost"
              size="sm"
            >
              <Icon name="rotate-ccw" size="sm" className="mr-[var(--space-sm)]" />
              Toggle State
            </Button>
          </CardHeader>
          <CardContent>
            {showActual ? (
              // Actual content
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-start gap-[var(--space-md)]">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-[var(--space-sm)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <h3 className="text-heading-sm">John Doe</h3>
                      <Badge variant="secondary" size="sm">Pro</Badge>
                    </div>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Senior Frontend Developer
                    </p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Passionate about building beautiful and accessible user interfaces. 
                      Currently working on React and TypeScript applications.
                    </p>
                  </div>
                  <Button size="sm">
                    <Icon name="plus" size="sm" className="mr-[var(--space-sm)]" />
                    Follow
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-[var(--space-md)] text-center">
                  <div>
                    <div className="text-heading-md text-[var(--color-text-primary)]">127</div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">Repositories</div>
                  </div>
                  <div>
                    <div className="text-heading-md text-[var(--color-text-primary)]">1.2k</div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">Followers</div>
                  </div>
                  <div>
                    <div className="text-heading-md text-[var(--color-text-primary)]">89</div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">Following</div>
                  </div>
                </div>
              </div>
            ) : (
              // Skeleton loading state
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-start gap-[var(--space-md)]">
                  <SkeletonAvatar size="lg" />
                  <div className="flex-1 space-y-[var(--space-sm)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Skeleton height={20} width="150px" />
                      <Skeleton height={20} width="40px" />
                    </div>
                    <Skeleton height={16} width="200px" />
                    <Skeleton lines={3} size="sm" randomWidth />
                  </div>
                  <SkeletonButton size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-[var(--space-md)] text-center">
                  <div className="space-y-[var(--space-xsm)]">
                    <Skeleton height={28} width="60px" className="mx-auto" />
                    <Skeleton height={16} width="80px" className="mx-auto" />
                  </div>
                  <div className="space-y-[var(--space-xsm)]">
                    <Skeleton height={28} width="60px" className="mx-auto" />
                    <Skeleton height={16} width="80px" className="mx-auto" />
                  </div>
                  <div className="space-y-[var(--space-xsm)]">
                    <Skeleton height={28} width="60px" className="mx-auto" />
                    <Skeleton height={16} width="80px" className="mx-auto" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Common Use Cases</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Form Loading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Form Loading</CardTitle>
              <CardDescription>
                Skeleton states for form inputs and controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <Skeleton height={16} width="100px" />
                <Skeleton height={40} width="100%" />
                <Skeleton height={14} width="200px" />
              </div>
              <div className="space-y-[var(--space-md)]">
                <Skeleton height={16} width="120px" />
                <Skeleton height={40} width="100%" />
              </div>
              <div className="space-y-[var(--space-md)]">
                <Skeleton height={16} width="80px" />
                <Skeleton height={80} width="100%" />
              </div>
              <div className="flex gap-[var(--space-md)]">
                <SkeletonButton size="md" />
                <SkeletonButton size="md" />
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Widgets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Dashboard Widgets</CardTitle>
              <CardDescription>
                Skeleton layouts for dashboard components and metrics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-[var(--space-md)]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="p-[var(--space-md)] border border-[var(--color-border-primary-subtle)] rounded-lg space-y-[var(--space-sm)]">
                    <Skeleton height={14} width="60%" />
                    <Skeleton height={24} width="80%" />
                    <Skeleton height={12} width="40%" />
                  </div>
                ))}
              </div>
              
              {/* Chart Area */}
              <div className="space-y-[var(--space-md)]">
                <Skeleton height={16} width="120px" />
                <Skeleton height={200} width="100%" />
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
                <li>• Match skeleton dimensions to actual content</li>
                <li>• Use appropriate skeleton shapes (circle for avatars, etc.)</li>
                <li>• Include aria-hidden="true" for accessibility</li>
                <li>• Maintain consistent loading patterns throughout app</li>
                <li>• Use random widths for text-like content variety</li>
                <li>• Show skeletons for predictable loading durations</li>
                <li>• Replace with actual content smoothly</li>
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
                <li>• Don't use skeletons for very short loading times (&lt;300ms)</li>
                <li>• Avoid skeletons that don't match final content layout</li>
                <li>• Don't use skeletons for unpredictable content structures</li>
                <li>• Avoid too many skeleton variations in one interface</li>
                <li>• Don't forget to handle loading errors appropriately</li>
                <li>• Avoid skeletons that flash too quickly</li>
                <li>• Don't make skeletons too different from actual content</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility */}
      <section>
        <Card className="border-[var(--color-border-information)]">
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
              <Icon name="info" size="sm" color="information" />
              <span>Accessibility Considerations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
              <p>
                <strong>Screen Readers:</strong> All skeleton components include aria-hidden="true" 
                to prevent screen readers from announcing meaningless loading content.
              </p>
              <p>
                <strong>Reduced Motion:</strong> The animate-pulse animation respects user's 
                reduced motion preferences through CSS media queries.
              </p>
              <p>
                <strong>Loading States:</strong> Consider providing additional loading indicators 
                or text for users who rely on screen readers.
              </p>
              <p>
                <strong>Semantic Structure:</strong> Maintain proper heading hierarchy and 
                semantic structure even during loading states.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}