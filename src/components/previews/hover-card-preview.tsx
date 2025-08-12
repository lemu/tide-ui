import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function HoverCardPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Hover Cards */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Hover Cards</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Hover Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Hover Card</CardTitle>
              <CardDescription>
                Basic hover card with text content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
                Hover over the link below to see the hover card:
              </p>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0 h-auto font-normal">
                    @shadcn
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-[var(--space-sm)]">
                    <h4 className="text-body-medium-md">@shadcn</h4>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      The React framework created and maintained by Vercel.
                      Beautiful UI components built with Radix UI and Tailwind CSS.
                    </p>
                    <div className="flex items-center space-x-[var(--space-sm)] text-caption-sm text-[var(--color-text-tertiary)]">
                      <Icon name="calendar" size="sm" />
                      <span>Joined December 2021</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          {/* Rich Content Hover Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Rich Content</CardTitle>
              <CardDescription>
                Hover card with avatar, stats, and multiple content types.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
                Hover over the user profile:
              </p>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0 h-auto font-normal">
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <div className="w-6 h-6 bg-[var(--color-background-brand)] rounded-full flex items-center justify-center text-[var(--color-text-on-action)] text-caption-sm font-medium">
                        V
                      </div>
                      <span>@vercel</span>
                    </div>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-[var(--space-lg)]">
                    <div className="w-12 h-12 bg-[var(--color-background-brand)] rounded-full flex items-center justify-center text-[var(--color-text-on-action)] text-body-md font-medium flex-shrink-0">
                      V
                    </div>
                    <div className="space-y-[var(--space-sm)] flex-1">
                      <div>
                        <h4 className="text-body-medium-md">Vercel</h4>
                        <p className="text-body-sm text-[var(--color-text-secondary)]">@vercel</p>
                      </div>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        The React Framework – created and maintained by Vercel.
                        Deploy instantly, scale automatically.
                      </p>
                      <div className="flex items-center space-x-[var(--space-lg)] text-caption-sm text-[var(--color-text-tertiary)]">
                        <div className="flex items-center space-x-[var(--space-xsm)]">
                          <Icon name="users" size="sm" />
                          <span>50k followers</span>
                        </div>
                        <div className="flex items-center space-x-[var(--space-xsm)]">
                          <Icon name="calendar" size="sm" />
                          <span>Joined 2020</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Positioning Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Positioning Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Different Sides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Different Sides</CardTitle>
              <CardDescription>
                Hover cards positioned on different sides of the trigger.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-[var(--space-lg)] p-[var(--space-2xlg)]">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Top</Button>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" className="w-48">
                    <p className="text-body-sm">This hover card appears on top of the trigger.</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Right</Button>
                  </HoverCardTrigger>
                  <HoverCardContent side="right" className="w-48">
                    <p className="text-body-sm">This hover card appears to the right of the trigger.</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Left</Button>
                  </HoverCardTrigger>
                  <HoverCardContent side="left" className="w-48">
                    <p className="text-body-sm">This hover card appears to the left of the trigger.</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Bottom</Button>
                  </HoverCardTrigger>
                  <HoverCardContent side="bottom" className="w-48">
                    <p className="text-body-sm">This hover card appears below the trigger.</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
          </Card>

          {/* Different Alignments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Different Alignments</CardTitle>
              <CardDescription>
                Hover cards with different alignment options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)] p-[var(--space-lg)]">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Align Start</Button>
                  </HoverCardTrigger>
                  <HoverCardContent align="start" className="w-64">
                    <p className="text-body-sm">This hover card is aligned to the start of the trigger.</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Align Center</Button>
                  </HoverCardTrigger>
                  <HoverCardContent align="center" className="w-64">
                    <p className="text-body-sm">This hover card is centered with the trigger.</p>
                  </HoverCardContent>
                </HoverCard>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="sm">Align End</Button>
                  </HoverCardTrigger>
                  <HoverCardContent align="end" className="w-64">
                    <p className="text-body-sm">This hover card is aligned to the end of the trigger.</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Link Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Link Preview</CardTitle>
              <CardDescription>
                Preview external links with additional context.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Check out this article about{" "}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal underline">
                      React 19 features
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-[var(--space-md)]">
                      <div className="space-y-[var(--space-sm)]">
                        <h4 className="text-body-medium-md">React 19: New Features and Improvements</h4>
                        <p className="text-body-sm text-[var(--color-text-secondary)]">
                          Learn about the latest features in React 19 including the new compiler, 
                          Actions, and improved performance optimizations.
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-[var(--space-sm)] text-caption-sm text-[var(--color-text-tertiary)]">
                          <Icon name="globe" size="sm" />
                          <span>react.dev</span>
                        </div>
                        <Badge variant="secondary" size="sm">Article</Badge>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {" "}and how they can improve your development workflow.
              </p>
            </CardContent>
          </Card>

          {/* Product Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Product Preview</CardTitle>
              <CardDescription>
                Show product details on hover for quick reference.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Our latest product:{" "}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal">
                      Design System Pro
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-[var(--space-md)]">
                      <div className="space-y-[var(--space-sm)]">
                        <div className="flex items-center justify-between">
                          <h4 className="text-body-medium-md">Design System Pro</h4>
                          <Badge variant="success" size="sm">New</Badge>
                        </div>
                        <p className="text-body-sm text-[var(--color-text-secondary)]">
                          A comprehensive design system with 50+ components, 
                          design tokens, and detailed documentation.
                        </p>
                      </div>
                      <div className="space-y-[var(--space-sm)]">
                        <div className="flex items-center justify-between text-caption-sm">
                          <span className="text-[var(--color-text-tertiary)]">Price</span>
                          <span className="font-medium">$299</span>
                        </div>
                        <div className="flex items-center justify-between text-caption-sm">
                          <span className="text-[var(--color-text-tertiary)]">Components</span>
                          <span className="font-medium">50+</span>
                        </div>
                        <div className="flex items-center justify-between text-caption-sm">
                          <span className="text-[var(--color-text-tertiary)]">License</span>
                          <span className="font-medium">Commercial</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
            </CardContent>
          </Card>

          {/* Status Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Status Information</CardTitle>
              <CardDescription>
                Display detailed status information on hover.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-md">API Service</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge variant="success" className="cursor-pointer">
                        <Icon name="check-circle" size="sm" className="mr-[var(--space-xsm)]" />
                        Operational
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center space-x-[var(--space-sm)]">
                          <Icon name="check-circle" size="sm" color="success" />
                          <div>
                            <h4 className="text-body-medium-sm">All Systems Operational</h4>
                            <p className="text-caption-sm text-[var(--color-text-tertiary)]">Last updated 2 minutes ago</p>
                          </div>
                        </div>
                        <div className="space-y-[var(--space-sm)] text-caption-sm">
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Uptime (30d)</span>
                            <span className="font-medium">99.98%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Response Time</span>
                            <span className="font-medium">145ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Last Incident</span>
                            <span className="font-medium">12 days ago</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-body-md">Database</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge variant="warning" className="cursor-pointer">
                        <Icon name="triangle-alert" size="sm" className="mr-[var(--space-xsm)]" />
                        Degraded
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center space-x-[var(--space-sm)]">
                          <Icon name="triangle-alert" size="sm" color="warning" />
                          <div>
                            <h4 className="text-body-medium-sm">Performance Degraded</h4>
                            <p className="text-caption-sm text-[var(--color-text-tertiary)]">Investigating high latency</p>
                          </div>
                        </div>
                        <div className="space-y-[var(--space-sm)] text-caption-sm">
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Current Status</span>
                            <span className="font-medium text-[var(--color-text-warning)]">Degraded Performance</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Started</span>
                            <span className="font-medium">15 minutes ago</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">ETA Resolution</span>
                            <span className="font-medium">30 minutes</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Team Member Info</CardTitle>
              <CardDescription>
                Show team member details and availability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Assigned to:{" "}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="p-0 h-auto font-normal">
                        <div className="flex items-center space-x-[var(--space-sm)]">
                          <div className="w-5 h-5 bg-[var(--color-background-brand)] rounded-full flex items-center justify-center text-[var(--color-text-on-action)] text-caption-xsm font-medium">
                            A
                          </div>
                          <span>Alice Johnson</span>
                        </div>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-start space-x-[var(--space-md)]">
                          <div className="w-12 h-12 bg-[var(--color-background-brand)] rounded-full flex items-center justify-center text-[var(--color-text-on-action)] text-body-md font-medium flex-shrink-0">
                            A
                          </div>
                          <div className="space-y-[var(--space-sm)] flex-1">
                            <div>
                              <h4 className="text-body-medium-md">Alice Johnson</h4>
                              <p className="text-body-sm text-[var(--color-text-secondary)]">Senior Frontend Developer</p>
                            </div>
                            <div className="flex items-center space-x-[var(--space-sm)]">
                              <div className="w-2 h-2 bg-[var(--color-background-success)] rounded-full"></div>
                              <span className="text-caption-sm text-[var(--color-text-secondary)]">Available</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-[var(--space-sm)] text-caption-sm">
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Timezone</span>
                            <span className="font-medium">PST (UTC-8)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Local Time</span>
                            <span className="font-medium">2:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[var(--color-text-secondary)]">Active Tasks</span>
                            <span className="font-medium">3</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </p>
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
                <li>• Use for supplementary information that enhances context</li>
                <li>• Keep content concise and well-structured</li>
                <li>• Provide clear visual hierarchy within the card</li>
                <li>• Use appropriate positioning to avoid viewport edges</li>
                <li>• Include relevant icons and visual indicators</li>
                <li>• Consider mobile users who can't hover</li>
                <li>• Use consistent timing for smooth interactions</li>
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
                <li>• Don't use for essential information that must be accessible</li>
                <li>• Avoid overly complex or lengthy content</li>
                <li>• Don't rely solely on hover for critical interactions</li>
                <li>• Avoid poor contrast or illegible text</li>
                <li>• Don't make hover cards too large or intrusive</li>
                <li>• Avoid hover cards on mobile-only interfaces</li>
                <li>• Don't nest interactive elements that can cause conflicts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Note */}
      <section>
        <Card className="border-[var(--color-border-warning)]">
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
              <Icon name="info" size="sm" color="warning" />
              <span>Accessibility Considerations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
              <p>
                <strong>Important:</strong> Hover cards are primarily designed for sighted users and have limited keyboard accessibility. 
                The content is not easily accessible to screen readers or keyboard-only users.
              </p>
              <p>
                <strong>Recommendations:</strong>
              </p>
              <ul className="list-disc list-inside space-y-[var(--space-xsm)] ml-[var(--space-md)]">
                <li>Use hover cards for supplementary information only</li>
                <li>Ensure essential information is available through other means</li>
                <li>Consider providing alternative access methods for keyboard users</li>
                <li>Test with screen readers to ensure content remains accessible</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}