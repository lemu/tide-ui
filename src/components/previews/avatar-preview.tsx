import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export function AvatarPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Avatars */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Avatars</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Image Avatars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Image Avatars</CardTitle>
              <CardDescription>
                Profile pictures with fallback to initials when image fails to load.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Different Sizes</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar size="sm">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User 1" />
                    <AvatarFallback size="sm">JD</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 2" />
                    <AvatarFallback size="md">MJ</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face" alt="User 3" />
                    <AvatarFallback size="lg">AL</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=64&h=64&fit=crop&crop=face" alt="User 4" />
                    <AvatarFallback size="xl">EM</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Working Images</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="Sarah Wilson" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Mike Johnson" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Broken Images (Shows Fallback)</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar>
                    <AvatarImage src="/broken-image.jpg" alt="User" />
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/another-broken.jpg" alt="User" />
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/missing.jpg" alt="User" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fallback Variants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Fallback Variants</CardTitle>
              <CardDescription>
                Different color variants for avatar fallbacks when no image is available.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Color Variants</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar>
                    <AvatarFallback variant="primary">AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="secondary">CD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="accent">EF</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="success">GH</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="warning">IJ</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="error">KL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Different Sizes</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar size="sm">
                    <AvatarFallback size="sm" variant="primary">S</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarFallback size="md" variant="accent">M</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarFallback size="lg" variant="success">L</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarFallback size="xl" variant="error">XL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Icon Fallbacks</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar>
                    <AvatarFallback variant="accent">
                      <Icon name="user" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="primary">
                      <Icon name="info" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback variant="success">
                      <Icon name="check" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Avatar Shapes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Avatar Shapes</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Circular Avatars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Circular (Default)</CardTitle>
              <CardDescription>
                Traditional round avatars for user profiles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Avatar shape="circle">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
                  <AvatarFallback shape="circle" variant="primary">JD</AvatarFallback>
                </Avatar>
                <Avatar shape="circle">
                  <AvatarFallback shape="circle" variant="secondary">AB</AvatarFallback>
                </Avatar>
                <Avatar shape="circle">
                  <AvatarFallback shape="circle" variant="accent">
                    <Icon name="user" size="sm" color="inverse" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          {/* Rounded Avatars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Rounded</CardTitle>
              <CardDescription>
                Rounded corners for a modern, friendly appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Avatar shape="rounded">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=40&h=40&fit=crop&crop=face" alt="User" />
                  <AvatarFallback shape="rounded" variant="primary">EM</AvatarFallback>
                </Avatar>
                <Avatar shape="rounded">
                  <AvatarFallback shape="rounded" variant="secondary">CD</AvatarFallback>
                </Avatar>
                <Avatar shape="rounded">
                  <AvatarFallback shape="rounded" variant="success">
                    <Icon name="circle-check-big" size="sm" color="inverse" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          {/* Square Avatars */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Square</CardTitle>
              <CardDescription>
                Sharp corners for brands, logos, or architectural elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Avatar shape="square">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User" />
                  <AvatarFallback shape="square" variant="primary">MJ</AvatarFallback>
                </Avatar>
                <Avatar shape="square">
                  <AvatarFallback shape="square" variant="secondary">EF</AvatarFallback>
                </Avatar>
                <Avatar shape="square">
                  <AvatarFallback shape="square" variant="warning">
                    <Icon name="package" size="sm" color="inverse" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Company/Brand Avatars */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Company & Brand Avatars</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Company Initials */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Company Initials</CardTitle>
              <CardDescription>
                Company and organization avatars using brand initials.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Various Companies</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="primary">AC</AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="accent">AB</AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="success">AG</AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="warning">AM</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Different Sizes</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar size="sm" shape="rounded">
                    <AvatarFallback size="sm" shape="rounded" variant="primary">AC</AvatarFallback>
                  </Avatar>
                  <Avatar size="md" shape="rounded">
                    <AvatarFallback size="md" shape="rounded" variant="accent">AB</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg" shape="rounded">
                    <AvatarFallback size="lg" shape="rounded" variant="success">AG</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl" shape="rounded">
                    <AvatarFallback size="xl" shape="rounded" variant="error">AM</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Logos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Brand Icons</CardTitle>
              <CardDescription>
                Brand avatars using icons and symbols for organizations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Icon Based</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="primary">
                      <Icon name="package" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="accent">
                      <Icon name="ship" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="success">
                      <Icon name="star" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                  <Avatar shape="rounded">
                    <AvatarFallback shape="rounded" variant="warning">
                      <Icon name="handshake" size="sm" color="inverse" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Square Brand Style</div>
                <div className="flex items-center gap-[var(--space-md)]">
                  <Avatar shape="square">
                    <AvatarFallback shape="square" variant="primary">A</AvatarFallback>
                  </Avatar>
                  <Avatar shape="square">
                    <AvatarFallback shape="square" variant="accent">B</AvatarFallback>
                  </Avatar>
                  <Avatar shape="square">
                    <AvatarFallback shape="square" variant="success">C</AvatarFallback>
                  </Avatar>
                  <Avatar shape="square">
                    <AvatarFallback shape="square" variant="error">D</AvatarFallback>
                  </Avatar>
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
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">User Profile</CardTitle>
              <CardDescription>
                Avatar used in user profile cards and information displays.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-start gap-[var(--space-md)]">
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="John Doe" />
                  <AvatarFallback size="lg" variant="primary">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[var(--space-sm)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <h3 className="text-body-medium-md">John Doe</h3>
                    <Badge variant="success" size="small">Online</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Senior Product Designer at Acme Inc.
                  </p>
                  <p className="text-caption-sm text-[var(--color-text-tertiary)]">
                    Last seen 2 minutes ago
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-[var(--space-md)]">
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face" alt="Sarah Wilson" />
                  <AvatarFallback size="lg" variant="accent">SW</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[var(--space-sm)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <h3 className="text-body-medium-md">Sarah Wilson</h3>
                    <Badge variant="warning" size="small">Away</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Frontend Engineer at TechCorp
                  </p>
                  <p className="text-caption-sm text-[var(--color-text-tertiary)]">
                    Last seen 1 hour ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comment Thread */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Comment Thread</CardTitle>
              <CardDescription>
                Avatars in comment sections and discussion threads.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex gap-[var(--space-sm)]">
                <Avatar size="sm">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Mike Johnson" />
                  <AvatarFallback size="sm" variant="primary">MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[var(--space-xsm)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-medium-sm">Mike Johnson</span>
                    <span className="text-caption-xsm text-[var(--color-text-tertiary)]">2 hours ago</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Great work on this feature! The design looks fantastic.
                  </p>
                </div>
              </div>

              <div className="flex gap-[var(--space-sm)]">
                <Avatar size="sm">
                  <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[var(--space-xsm)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-medium-sm">Alex Lee</span>
                    <span className="text-caption-xsm text-[var(--color-text-tertiary)]">1 hour ago</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Thanks! I appreciate the feedback. Let me know if you have any suggestions.
                  </p>
                </div>
              </div>

              <div className="flex gap-[var(--space-sm)]">
                <Avatar size="sm">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=32&h=32&fit=crop&crop=face" alt="Emma Davis" />
                  <AvatarFallback size="sm" variant="accent">ED</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-[var(--space-xsm)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-medium-sm">Emma Davis</span>
                    <span className="text-caption-xsm text-[var(--color-text-tertiary)]">30 minutes ago</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    The accessibility improvements are excellent. Well done!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Team Members</CardTitle>
              <CardDescription>
                Avatar group showing team members with different roles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="grid gap-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-md)]">
                    <Avatar size="sm">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="John Doe" />
                      <AvatarFallback size="sm" variant="primary">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-body-medium-sm">John Doe</div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">Team Lead</div>
                    </div>
                  </div>
                  <Badge variant="success" size="small">Admin</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-md)]">
                    <Avatar size="sm">
                      <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Sarah Wilson" />
                      <AvatarFallback size="sm" variant="accent">SW</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-body-medium-sm">Sarah Wilson</div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">Developer</div>
                    </div>
                  </div>
                  <Badge variant="secondary" size="small">Member</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-md)]">
                    <Avatar size="sm">
                      <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-body-medium-sm">Alex Lee</div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">Designer</div>
                    </div>
                  </div>
                  <Badge variant="secondary" size="small">Member</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-md)]">
                    <Avatar size="sm">
                      <AvatarFallback size="sm" variant="warning">EM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-body-medium-sm">Emma Martinez</div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">Product Manager</div>
                    </div>
                  </div>
                  <Badge variant="warning" size="small">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avatar Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Avatar Stack</CardTitle>
              <CardDescription>
                Overlapping avatars to show groups and teams compactly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Project Team (5 members)</div>
                <div className="flex items-center">
                  <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)]">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User 1" />
                    <AvatarFallback size="sm" variant="primary">JD</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="User 2" />
                    <AvatarFallback size="sm" variant="accent">SW</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
                    <AvatarFallback size="sm" variant="success">AL</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
                    <AvatarFallback size="sm" variant="warning">EM</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-sm)]">
                    <AvatarFallback size="sm" variant="secondary">+1</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Design Team (8+ members)</div>
                <div className="flex items-center">
                  <Avatar size="md" className="border-2 border-[var(--color-surface-primary)]">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User 1" />
                    <AvatarFallback size="md" variant="primary">MJ</AvatarFallback>
                  </Avatar>
                  <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c913?w=40&h=40&fit=crop&crop=face" alt="User 2" />
                    <AvatarFallback size="md" variant="accent">ED</AvatarFallback>
                  </Avatar>
                  <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
                    <AvatarFallback size="md" variant="success">RH</AvatarFallback>
                  </Avatar>
                  <Avatar size="md" className="border-2 border-[var(--color-surface-primary)] -ml-[var(--space-md)]">
                    <AvatarFallback size="md" variant="secondary">+5</AvatarFallback>
                  </Avatar>
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
                <li>• Use descriptive alt text for profile images</li>
                <li>• Provide meaningful fallback initials (user's actual initials)</li>
                <li>• Choose appropriate avatar sizes for the context</li>
                <li>• Use consistent shapes throughout your application</li>
                <li>• Consider loading states and image optimization</li>
                <li>• Use color variants purposefully for categorization</li>
                <li>• Maintain proper contrast for accessibility</li>
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
                <li>• Don't use inappropriate or placeholder images</li>
                <li>• Avoid random or meaningless fallback text</li>
                <li>• Don't make avatars too small for touch targets</li>
                <li>• Avoid mixing different shapes inconsistently</li>
                <li>• Don't ignore image loading failures</li>
                <li>• Avoid poor contrast in fallback colors</li>
                <li>• Don't forget hover states for interactive avatars</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Note */}
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
                <strong>Alt Text:</strong> Always provide descriptive alt text for avatar images. Use the person's name and context when appropriate.
              </p>
              <p>
                <strong>Color Contrast:</strong> Ensure sufficient contrast between fallback text and background colors to meet WCAG guidelines.
              </p>
              <p>
                <strong>Touch Targets:</strong> Make interactive avatars at least 44x44px for proper touch accessibility on mobile devices.
              </p>
              <p>
                <strong>Screen Readers:</strong> Fallback content is automatically announced by screen readers when images fail to load.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}