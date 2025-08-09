import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Input } from "../ui/input";
import { Icon } from "../ui/icon";

export function AlertPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Alert Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Alert Variants</h2>

        <div className="space-y-[var(--space-lg)]">
          {/* Default Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default Alert</CardTitle>
              <CardDescription>
                Standard alert for general information and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Icon name="info" size="sm" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the cli. This is a default alert message.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Info Alert</CardTitle>
              <CardDescription>
                Informational alert with brand colors for neutral updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="info">
                <Icon name="info" size="sm" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert. It provides helpful context or additional details about a feature or process.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Success Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success Alert</CardTitle>
              <CardDescription>
                Success alert for completed actions and positive feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="success">
                <Icon name="check-circle" size="sm" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully. All updates are now live and visible to users.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Warning Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Warning Alert</CardTitle>
              <CardDescription>
                Warning alert for cautionary messages and important notices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="warning">
                <Icon name="triangle-alert" size="sm" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. Please review your changes carefully before proceeding.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Destructive/Error Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Error Alert</CardTitle>
              <CardDescription>
                Destructive alert for errors, failures, and critical issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <Icon name="circle-alert" size="sm" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Unable to process your request. Please check your connection and try again, or contact support if the problem persists.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alert Compositions */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Alert Compositions</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Title Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Title Only</CardTitle>
              <CardDescription>
                Alert with just a title and icon, no description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="info">
                <Icon name="bell" size="sm" />
                <AlertTitle>New notification received</AlertTitle>
              </Alert>
            </CardContent>
          </Card>

          {/* Description Only */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Description Only</CardTitle>
              <CardDescription>
                Alert with just description content, no title.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="warning">
                <Icon name="clock" size="sm" />
                <AlertDescription>
                  Session will expire in 5 minutes. Save your work to avoid losing progress.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* No Icon */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Without Icon</CardTitle>
              <CardDescription>
                Alert without an icon for minimal styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTitle>Simple Alert</AlertTitle>
                <AlertDescription>
                  This alert doesn't have an icon. Sometimes less is more for certain use cases.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Rich Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Rich Content</CardTitle>
              <CardDescription>
                Alert with more complex content and formatting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="success">
                <Icon name="check-circle" size="sm" />
                <AlertTitle>Deployment Complete</AlertTitle>
                <AlertDescription>
                  <p className="mb-[var(--space-sm)]">
                    Your application has been successfully deployed to production.
                  </p>
                  <ul className="list-disc list-inside space-y-[var(--space-xsm)] text-body-sm">
                    <li>Build completed in 2m 34s</li>
                    <li>Tests passed: 94/94</li>
                    <li>Bundle size: 245 KB</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Form Validation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Form Validation</CardTitle>
              <CardDescription>
                Alert for form validation errors and guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="destructive">
                  <Icon name="circle-alert" size="sm" />
                  <AlertTitle>Form submission failed</AlertTitle>
                  <AlertDescription>
                    Please correct the following errors:
                    <ul className="list-disc list-inside mt-[var(--space-sm)] space-y-[var(--space-xsm)]">
                      <li>Email address is required</li>
                      <li>Password must be at least 8 characters</li>
                      <li>Please accept the terms and conditions</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">System Status</CardTitle>
              <CardDescription>
                Alert for system-wide notifications and status updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="warning">
                  <Icon name="triangle-alert" size="sm" />
                  <AlertTitle>Scheduled Maintenance</AlertTitle>
                  <AlertDescription>
                    Our services will be temporarily unavailable on Sunday, March 15th from 2:00 AM to 4:00 AM EST for scheduled maintenance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Feature Announcement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Feature Announcement</CardTitle>
              <CardDescription>
                Alert for new feature announcements and updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="info">
                  <Icon name="sparkles" size="sm" />
                  <AlertTitle>New Feature Available</AlertTitle>
                  <AlertDescription>
                    We've just released our new dashboard analytics. Check out the enhanced reporting features in your account settings.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Action Required */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Action Required</CardTitle>
              <CardDescription>
                Alert requiring user action or attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="warning">
                  <Icon name="shield-alert" size="sm" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    Your account security settings need to be updated. Please enable two-factor authentication to secure your account.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contextual Usage */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Contextual Usage</h2>

        <div className="space-y-[var(--space-lg)]">
          {/* In Forms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">In Form Context</CardTitle>
              <CardDescription>
                Alerts integrated within form interfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="info">
                  <Icon name="info" size="sm" />
                  <AlertDescription>
                    Your changes are automatically saved as you type.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-[var(--space-sm)]">
                  <label className="text-body-md block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-[var(--space-sm)]">
                  <label className="text-body-md block">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stacked Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Alerts</CardTitle>
              <CardDescription>
                Multiple alerts stacked for complex messaging.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Alert variant="success">
                  <Icon name="check-circle" size="sm" />
                  <AlertTitle>Upload Complete</AlertTitle>
                  <AlertDescription>
                    3 files have been successfully uploaded to your project.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="warning">
                  <Icon name="triangle-alert" size="sm" />
                  <AlertTitle>Storage Warning</AlertTitle>
                  <AlertDescription>
                    You're using 85% of your storage quota. Consider upgrading your plan or removing old files.
                  </AlertDescription>
                </Alert>
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
                <li>• Use appropriate variants for different message types</li>
                <li>• Include clear, actionable titles and descriptions</li>
                <li>• Choose relevant icons that support the message</li>
                <li>• Keep messages concise but informative</li>
                <li>• Use consistent positioning across your application</li>
                <li>• Provide dismissible alerts when appropriate</li>
                <li>• Test with screen readers for accessibility</li>
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
                <li>• Don't overuse alerts - they lose impact</li>
                <li>• Avoid vague or unclear messaging</li>
                <li>• Don't use wrong variants (success for errors, etc.)</li>
                <li>• Avoid alerts for every minor interaction</li>
                <li>• Don't stack too many alerts simultaneously</li>
                <li>• Avoid alerts that block critical user workflows</li>
                <li>• Don't forget to provide actionable next steps</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}