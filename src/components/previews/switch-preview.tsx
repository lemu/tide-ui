import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
} from "../ui/form-field";

export function SwitchPreview() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [locationServices, setLocationServices] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Switches */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Switches</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Switches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Switches</CardTitle>
              <CardDescription>
                Basic switch components with labels and descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="notifications" className="text-body-medium-sm">
                    Push Notifications
                  </label>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Receive notifications about updates
                  </div>
                </div>
                <Switch 
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="dark-mode" className="text-body-medium-sm">
                    Dark Mode
                  </label>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Use dark theme for the interface
                  </div>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={darkModeEnabled}
                  onCheckedChange={setDarkModeEnabled}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="auto-save" className="text-body-medium-sm">
                    Auto Save
                  </label>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Automatically save changes
                  </div>
                </div>
                <Switch 
                  id="auto-save"
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Switch States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Switch States</CardTitle>
              <CardDescription>
                Switches in different states including disabled options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-body-medium-sm">Enabled & On</span>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Normal active state
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-body-medium-sm">Enabled & Off</span>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Normal inactive state
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Disabled & On</span>
                  <div className="text-body-sm text-[var(--color-text-disabled)]">
                    Cannot be changed
                  </div>
                </div>
                <Switch defaultChecked disabled />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Disabled & Off</span>
                  <div className="text-body-sm text-[var(--color-text-disabled)]">
                    Cannot be changed
                  </div>
                </div>
                <Switch defaultChecked={false} disabled />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Switch with Icons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Switches with Icons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Settings Switches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">System Settings</CardTitle>
              <CardDescription>
                Common system settings with descriptive icons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="circle" size="md" className={notificationsEnabled ? "text-[var(--color-icon-brand)]" : "text-[var(--color-icon-tertiary)]"} />
                <div className="flex-1">
                  <div className="text-body-medium-sm">Notifications</div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Get notified about important updates
                  </div>
                </div>
                <Switch 
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="circle" size="md" className={locationServices ? "text-[var(--color-icon-brand)]" : "text-[var(--color-icon-tertiary)]"} />
                <div className="flex-1">
                  <div className="text-body-medium-sm">Location Services</div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Allow apps to access your location
                  </div>
                </div>
                <Switch 
                  checked={locationServices}
                  onCheckedChange={setLocationServices}
                />
              </div>

              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="circle" size="md" className={analyticsEnabled ? "text-[var(--color-icon-brand)]" : "text-[var(--color-icon-tertiary)]"} />
                <div className="flex-1">
                  <div className="text-body-medium-sm">Analytics</div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Help improve our services
                  </div>
                </div>
                <Switch 
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Switches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Security Settings</CardTitle>
              <CardDescription>
                Security-related toggles with status indicators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="circle-check-big" size="md" color={twoFactorAuth ? "success" : "tertiary"} />
                <div className="flex-1">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-medium-sm">Two-Factor Authentication</span>
                    {twoFactorAuth && <Badge variant="success" size="sm">Enabled</Badge>}
                  </div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Add an extra layer of security
                  </div>
                </div>
                <Switch 
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>

              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="triangle-alert" size="md" color={securityAlerts ? "warning" : "tertiary"} />
                <div className="flex-1">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-medium-sm">Security Alerts</span>
                    {securityAlerts && <Badge variant="warning" size="sm">Active</Badge>}
                  </div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Get alerts for suspicious activity
                  </div>
                </div>
                <Switch 
                  checked={securityAlerts}
                  onCheckedChange={setSecurityAlerts}
                />
              </div>

              <div className="flex items-center gap-[var(--space-md)]">
                <Icon name="send" size="md" color={marketingEmails ? "information" : "tertiary"} />
                <div className="flex-1">
                  <div className="text-body-medium-sm">Marketing Emails</div>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Receive product updates and offers
                  </div>
                </div>
                <Switch 
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Integration</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Profile Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Profile Settings</CardTitle>
              <CardDescription>
                Switches integrated with form components and proper labeling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="profile-visibility">Profile Visibility</FormLabel>
                    <FormHelperText>Make your profile visible to other users</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="profile-visibility" defaultChecked />
                  </FormControl>
                </div>
              </FormField>

              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="activity-status">Activity Status</FormLabel>
                    <FormHelperText>Show when you're online or active</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="activity-status" defaultChecked={false} />
                  </FormControl>
                </div>
              </FormField>

              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="contact-info">Contact Information</FormLabel>
                    <FormHelperText>Allow others to see your contact details</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="contact-info" defaultChecked />
                  </FormControl>
                </div>
              </FormField>
            </CardContent>
          </Card>

          {/* Accessibility Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Accessibility</CardTitle>
              <CardDescription>
                Accessibility preferences with helpful descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="reduced-motion">Reduce Motion</FormLabel>
                    <FormHelperText>Minimize animations and transitions</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="reduced-motion" defaultChecked={false} />
                  </FormControl>
                </div>
              </FormField>

              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="high-contrast">High Contrast</FormLabel>
                    <FormHelperText>Increase contrast for better visibility</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="high-contrast" defaultChecked={false} />
                  </FormControl>
                </div>
              </FormField>

              <FormField>
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel htmlFor="screen-reader">Screen Reader Mode</FormLabel>
                    <FormHelperText>Optimize interface for screen readers</FormHelperText>
                  </div>
                  <FormControl>
                    <Switch id="screen-reader" defaultChecked={false} />
                  </FormControl>
                </div>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Dashboard Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Dashboard Controls</CardTitle>
              <CardDescription>
                Toggle different sections and features on a dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="p-[var(--space-lg)] bg-[var(--color-background-neutral-subtle)] rounded-lg space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="layout-dashboard" size="sm" />
                    <span className="text-body-medium-sm">Show Analytics</span>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="user" size="sm" />
                    <span className="text-body-medium-sm">Recent Activity</span>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="circle" size="sm" />
                    <span className="text-body-medium-sm">Live Updates</span>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="settings" size="sm" />
                    <span className="text-body-medium-sm">Advanced Mode</span>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Feature Toggles</CardTitle>
              <CardDescription>
                Enable or disable experimental features and beta functionality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <span className="text-body-medium-sm">New Editor</span>
                      <Badge variant="information" size="sm">Beta</Badge>
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">
                      Try the redesigned code editor
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <span className="text-body-medium-sm">AI Assistant</span>
                      <Badge variant="warning" size="sm">Experimental</Badge>
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">
                      Get AI-powered coding suggestions
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <span className="text-body-medium-sm">Performance Mode</span>
                      <Badge variant="success" size="sm">Stable</Badge>
                    </div>
                    <div className="text-body-sm text-[var(--color-text-secondary)]">
                      Optimize for better performance
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Interactive Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Smart Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Smart Controls</CardTitle>
              <CardDescription>
                Switches that affect other controls or show dynamic content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-body-medium-sm">Master Control</span>
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Controls all sub-features
                  </div>
                </div>
                <Switch 
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>

              {autoSaveEnabled && (
                <div className="ml-[var(--space-lg)] p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md space-y-[var(--space-sm)]">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Auto-save interval: 5 minutes</span>
                    <Switch defaultChecked size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Backup to cloud</span>
                    <Switch defaultChecked={false} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Version history</span>
                    <Switch defaultChecked size="sm" />
                  </div>
                </div>
              )}

              <div className="text-caption-sm text-[var(--color-text-tertiary)]">
                {autoSaveEnabled ? "✓ Auto-save is active" : "Auto-save is disabled"}
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Bulk Actions</CardTitle>
              <CardDescription>
                Control multiple switches with master controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setNotificationsEnabled(true);
                      setSecurityAlerts(true);
                      setMarketingEmails(true);
                    }}
                  >
                    Enable All
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setNotificationsEnabled(false);
                      setSecurityAlerts(false);
                      setMarketingEmails(false);
                    }}
                  >
                    Disable All
                  </Button>
                </div>

                <Separator />

                <div className="space-y-[var(--space-sm)]">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Push notifications</span>
                    <Switch 
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Security alerts</span>
                    <Switch 
                      checked={securityAlerts}
                      onCheckedChange={setSecurityAlerts}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Marketing emails</span>
                    <Switch 
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
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
                <li>• Use clear, descriptive labels for switch purposes</li>
                <li>• Include helpful descriptions or helper text</li>
                <li>• Group related switches logically</li>
                <li>• Provide immediate visual feedback on state changes</li>
                <li>• Use consistent switch sizing and spacing</li>
                <li>• Associate switches with proper labels using htmlFor/id</li>
                <li>• Consider the consequences of state changes</li>
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
                <li>• Don't use switches for actions that require immediate effect</li>
                <li>• Avoid ambiguous or unclear switch labels</li>
                <li>• Don't use switches for navigation or primary actions</li>
                <li>• Avoid making critical settings easy to accidentally change</li>
                <li>• Don't use switches without clear on/off states</li>
                <li>• Avoid grouping too many switches without organization</li>
                <li>• Don't forget to handle loading states for async changes</li>
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
                <strong>Keyboard Navigation:</strong> Switches can be toggled using Space or Enter keys and are focusable with Tab navigation.
              </p>
              <p>
                <strong>Screen Readers:</strong> Switches include proper ARIA attributes and announce their state (on/off) clearly to assistive technologies.
              </p>
              <p>
                <strong>Visual Indicators:</strong> Use sufficient color contrast and don't rely solely on color to indicate state changes.
              </p>
              <p>
                <strong>Labels and Descriptions:</strong> Always provide clear labels and consider using helper text to explain the consequences of toggling.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}