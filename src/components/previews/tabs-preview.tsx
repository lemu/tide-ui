import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
} from "../ui/form-field";

export function TabsPreview() {
  const [profileTab, setProfileTab] = useState("account");
  const [dashboardTab, setDashboardTab] = useState("overview");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Tabs */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Tabs</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Default Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default Style</CardTitle>
              <CardDescription>
                Standard tabs with background and active state styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Security</TabsTrigger>
                  <TabsTrigger value="tab3">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Account Settings</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Manage your account information and preferences here.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Security Settings</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Configure your security preferences and two-factor authentication.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Notifications</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Choose what notifications you want to receive.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Different Variant Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Alternative Layout</CardTitle>
              <CardDescription>
                Tabs with different content structure and organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Dashboard</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Overview of your application and key metrics.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Analytics</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Detailed analytics and performance insights.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="reports" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Reports</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Generate and view detailed reports.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="team" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Team</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Manage team members and permissions.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Different Sizes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Different Sizes</CardTitle>
              <CardDescription>
                Tabs in various sizes to fit different contexts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Small Size</div>
                <Tabs defaultValue="small1" className="w-full">
                  <TabsList size="sm" className="grid w-full grid-cols-2">
                    <TabsTrigger size="sm" value="small1">Tab 1</TabsTrigger>
                    <TabsTrigger size="sm" value="small2">Tab 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="small1">
                    <div className="text-caption-sm text-[var(--color-text-secondary)] p-[var(--space-md)]">
                      Small tab content area
                    </div>
                  </TabsContent>
                  <TabsContent value="small2">
                    <div className="text-caption-sm text-[var(--color-text-secondary)] p-[var(--space-md)]">
                      Another small tab
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Large Size</div>
                <Tabs defaultValue="large1" className="w-full">
                  <TabsList size="lg" className="grid w-full grid-cols-2">
                    <TabsTrigger size="lg" value="large1">Tab 1</TabsTrigger>
                    <TabsTrigger size="lg" value="large2">Tab 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="large1">
                    <div className="text-body-md text-[var(--color-text-secondary)] p-[var(--space-md)]">
                      Large tab content with more space
                    </div>
                  </TabsContent>
                  <TabsContent value="large2">
                    <div className="text-body-md text-[var(--color-text-secondary)] p-[var(--space-md)]">
                      Another large tab content
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tabs with Icons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Tabs with Icons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Icon + Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon + Text</CardTitle>
              <CardDescription>
                Tabs with icons alongside text labels for enhanced visual hierarchy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="user" size="sm" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="settings" size="sm" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="help" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="circle-help" size="sm" />
                    Help
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-[var(--space-md)]">
                  <div className="flex items-center gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <Icon name="user" size="md" color="primary" />
                    <div>
                      <h3 className="text-body-medium-md">Profile Information</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        Update your personal information and avatar.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-[var(--space-md)]">
                  <div className="flex items-center gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <Icon name="settings" size="md" color="primary" />
                    <div>
                      <h3 className="text-body-medium-md">Application Settings</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        Configure application preferences and defaults.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="help" className="space-y-[var(--space-md)]">
                  <div className="flex items-center gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <Icon name="circle-help" size="md" color="primary" />
                    <div>
                      <h3 className="text-body-medium-md">Help & Support</h3>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        Find answers to common questions and get support.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Icon Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon Only</CardTitle>
              <CardDescription>
                Compact tabs using only icons for space-efficient navigation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="home" className="flex items-center justify-center">
                    <Icon name="layout-dashboard" size="sm" />
                  </TabsTrigger>
                  <TabsTrigger value="search" className="flex items-center justify-center">
                    <Icon name="search" size="sm" />
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center justify-center">
                    <Icon name="info" size="sm" />
                  </TabsTrigger>
                  <TabsTrigger value="user" className="flex items-center justify-center">
                    <Icon name="user" size="sm" />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="home" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Dashboard</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Your main dashboard with key metrics and overview.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="search" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Search</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Search through your content and find what you need.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Notifications</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      View and manage your notifications and alerts.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="user" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Profile</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Manage your user profile and account settings.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Tabs with Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Tabs with Badges</CardTitle>
              <CardDescription>
                Tabs with notification badges to show counts or status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="inbox" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="inbox" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="package" size="sm" />
                    Inbox
                    <Badge intent="destructive" size="sm">12</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="send" size="sm" />
                    Sent
                  </TabsTrigger>
                  <TabsTrigger value="drafts" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="circle" size="sm" />
                    Drafts
                    <Badge intent="warning" size="sm">3</Badge>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <div className="flex items-center justify-between mb-[var(--space-sm)]">
                      <h3 className="text-body-medium-md">Inbox</h3>
                      <Badge intent="destructive" size="sm">12 unread</Badge>
                    </div>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      You have 12 unread messages in your inbox.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="sent" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Sent Messages</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      View your sent messages and delivery status.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="drafts" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <div className="flex items-center justify-between mb-[var(--space-sm)]">
                      <h3 className="text-body-medium-md">Drafts</h3>
                      <Badge intent="warning" size="sm">3 drafts</Badge>
                    </div>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      You have 3 unsent draft messages.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Disabled Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled Tabs</CardTitle>
              <CardDescription>
                Example showing how disabled tabs appear and behave.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="available" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="available">Available</TabsTrigger>
                  <TabsTrigger value="limited" disabled>Limited</TabsTrigger>
                  <TabsTrigger value="premium" className="flex items-center gap-[var(--space-sm)]">
                    <span className="truncate">Premium</span>
                    <Badge intent="neutral" size="sm">Pro</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="beta" disabled>Beta</TabsTrigger>
                </TabsList>
                <TabsContent value="available" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Available Features</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      These features are available in your current plan.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="premium" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md">
                    <h3 className="text-body-medium-md mb-[var(--space-sm)]">Premium Features</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Advanced features available with premium subscription.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Profile Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Profile Settings</CardTitle>
              <CardDescription>
                Multi-step form using tabs for different sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={profileTab} onValueChange={setProfileTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="space-y-[var(--space-lg)]">
                  <div className="space-y-[var(--space-lg)]">
                    <FormField>
                      <FormLabel htmlFor="name">Display Name</FormLabel>
                      <FormControl>
                        <Input id="name" defaultValue="John Doe" />
                      </FormControl>
                      <FormHelperText>
                        This is your public display name.
                      </FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </FormControl>
                      <FormHelperText>
                        Used for account notifications and login.
                      </FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="bio">Bio</FormLabel>
                      <FormControl>
                        <textarea 
                          id="bio"
                          className="w-full min-h-[80px] px-[var(--space-md)] py-[var(--space-sm)] text-body-sm rounded-md border border-[var(--color-border-input)] bg-[var(--color-background-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-primary)] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="Tell us about yourself..."
                          defaultValue="Product designer passionate about creating intuitive user experiences."
                        />
                      </FormControl>
                    </FormField>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </TabsContent>

                <TabsContent value="password" className="space-y-[var(--space-lg)]">
                  <div className="space-y-[var(--space-lg)]">
                    <FormField>
                      <FormLabel htmlFor="current-password">Current Password</FormLabel>
                      <FormControl>
                        <Input id="current-password" type="password" />
                      </FormControl>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="new-password">New Password</FormLabel>
                      <FormControl>
                        <Input id="new-password" type="password" />
                      </FormControl>
                      <FormHelperText>
                        Password must be at least 8 characters long.
                      </FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                      <FormControl>
                        <Input id="confirm-password" type="password" />
                      </FormControl>
                    </FormField>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="primary">Update Password</Button>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-[var(--space-lg)]">
                  <div className="space-y-[var(--space-lg)]">
                    <div className="space-y-[var(--space-md)]">
                      <h3 className="text-body-medium-md">Notifications</h3>
                      <div className="space-y-[var(--space-sm)]">
                        <div className="flex items-center justify-between">
                          <div className="text-body-sm">Email notifications</div>
                          <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-body-sm">Push notifications</div>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-body-sm">SMS notifications</div>
                          <Checkbox />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-[var(--space-md)]">
                      <h3 className="text-body-medium-md">Appearance</h3>
                      <div className="space-y-[var(--space-sm)]">
                        <div className="flex items-center justify-between">
                          <div className="text-body-sm">Dark mode</div>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-body-sm">Compact view</div>
                          <Checkbox defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="primary">Save Preferences</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Dashboard Views</CardTitle>
              <CardDescription>
                Different dashboard views organized with tabs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={dashboardTab} onValueChange={setDashboardTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="layout-dashboard" size="sm" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="star" size="sm" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="package" size="sm" />
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-[var(--space-md)]">
                  <div className="grid grid-cols-2 gap-[var(--space-md)]">
                    <div className="p-[var(--space-md)] bg-[var(--color-surface-secondary)] rounded-md">
                      <div className="text-body-medium-sm mb-[var(--space-xsm)]">Total Users</div>
                      <div className="text-heading-sm">12,543</div>
                      <div className="text-caption-sm text-[var(--color-text-success)]">+12% this month</div>
                    </div>
                    <div className="p-[var(--space-md)] bg-[var(--color-surface-secondary)] rounded-md">
                      <div className="text-body-medium-sm mb-[var(--space-xsm)]">Revenue</div>
                      <div className="text-heading-sm">$45,231</div>
                      <div className="text-caption-sm text-[var(--color-text-success)]">+8% this month</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md text-center">
                    <Icon name="star" size="lg" color="secondary" />
                    <h3 className="text-body-medium-md mt-[var(--space-sm)] mb-[var(--space-xsm)]">Analytics Dashboard</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Detailed analytics and insights would be displayed here.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-[var(--space-md)]">
                  <div className="p-[var(--space-lg)] bg-[var(--color-surface-secondary)] rounded-md text-center">
                    <Icon name="package" size="lg" color="secondary" />
                    <h3 className="text-body-medium-md mt-[var(--space-sm)] mb-[var(--space-xsm)]">Reports Center</h3>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      Generate and download detailed reports.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
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
                <li>• Use clear, descriptive labels for tab triggers</li>
                <li>• Keep the number of tabs reasonable (3-7 tabs)</li>
                <li>• Use consistent styling across all tab variants</li>
                <li>• Provide visual feedback for active and hover states</li>
                <li>• Consider using icons to enhance tab recognition</li>
                <li>• Use badges sparingly for important notifications</li>
                <li>• Make disabled states visually distinct</li>
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
                <li>• Don't use too many tabs (causes cognitive overload)</li>
                <li>• Avoid unclear or ambiguous tab labels</li>
                <li>• Don't nest tabs within tabs (creates confusion)</li>
                <li>• Avoid making tab content too different in height</li>
                <li>• Don't use tabs for sequential processes (use steps instead)</li>
                <li>• Avoid putting critical actions only in hidden tabs</li>
                <li>• Don't forget keyboard navigation support</li>
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
                <strong>Keyboard Navigation:</strong> Users can navigate between tabs using arrow keys, and activate them with Enter or Space keys.
              </p>
              <p>
                <strong>Screen Readers:</strong> Tabs include proper ARIA attributes and roles for screen reader compatibility and announce the current tab state.
              </p>
              <p>
                <strong>Focus Management:</strong> Focus is properly managed when switching between tabs, and visible focus indicators help with navigation.
              </p>
              <p>
                <strong>Color Contrast:</strong> All tab states maintain sufficient color contrast to meet WCAG guidelines for accessibility.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}