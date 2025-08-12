import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AlertDialogPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Alert Dialog</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Modal dialogs that interrupt the user with important content and expect a response
        </p>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 gap-[var(--space-xlg)] md:grid-cols-2 lg:grid-cols-3">
        
        {/* Basic Confirmation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Basic Confirmation</CardTitle>
            <CardDescription>
              Simple yes/no confirmation dialog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">Show Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Destructive Action */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Destructive Action</CardTitle>
            <CardDescription>
              Dialog for dangerous actions with destructive styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                  Delete Item
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This item will be permanently deleted. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">
                    <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Save Changes</CardTitle>
            <CardDescription>
              Confirmation when user tries to leave with unsaved changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Icon name="x" size="sm" className="mr-[var(--space-sm)]" />
                  Close Editor
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to save your changes before leaving? Your changes will be lost if you don't save them.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Don't save</AlertDialogCancel>
                  <AlertDialogAction>
                    <Icon name="save" size="sm" className="mr-[var(--space-sm)]" />
                    Save changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Permission Request */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Permission Request</CardTitle>
            <CardDescription>
              Request user permission for sensitive actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Icon name="camera" size="sm" className="mr-[var(--space-sm)]" />
                  Enable Camera
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Camera Access Required</AlertDialogTitle>
                  <AlertDialogDescription>
                    This application would like to access your camera to take photos. 
                    Your privacy is important to us and we will only use your camera when you explicitly request it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Not now</AlertDialogCancel>
                  <AlertDialogAction>
                    <Icon name="check" size="sm" className="mr-[var(--space-sm)]" />
                    Allow Access
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Sign Out</CardTitle>
            <CardDescription>
              Confirm user wants to sign out of their session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Icon name="log-out" size="sm" className="mr-[var(--space-sm)]" />
                  Sign Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your account and redirected to the login page.
                    Any unsaved work may be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay signed in</AlertDialogCancel>
                  <AlertDialogAction>
                    <Icon name="log-out" size="sm" className="mr-[var(--space-sm)]" />
                    Sign out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Network Action */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Network Action</CardTitle>
            <CardDescription>
              Confirm action that will affect network resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Icon name="wifi-off" size="sm" className="mr-[var(--space-sm)]" />
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect from network?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will disconnect you from the current network. You may lose access to 
                    online features until you reconnect.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay connected</AlertDialogCancel>
                  <AlertDialogAction>
                    <Icon name="wifi-off" size="sm" className="mr-[var(--space-sm)]" />
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">When to Use</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Confirming destructive actions (delete, reset)</li>
                <li>• Requesting permissions or access</li>
                <li>• Warning about data loss or irreversible actions</li>
                <li>• Critical system state changes</li>
                <li>• Before navigating away from unsaved work</li>
                <li>• Confirming account or security changes</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Best Practices</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use clear, specific titles and descriptions</li>
                <li>• Make the primary action obvious with proper styling</li>
                <li>• Use destructive variant for dangerous actions</li>
                <li>• Keep content concise but informative</li>
                <li>• Always provide a way to cancel</li>
                <li>• Don't overuse - reserve for important decisions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="border-[var(--color-border-information)]">
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
            <Icon name="info" size="sm" color="information" />
            <span>Accessibility Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              <strong>Keyboard Navigation:</strong> Full keyboard support with tab navigation between buttons and Escape to close.
            </p>
            <p>
              <strong>Screen Reader Support:</strong> Proper ARIA labeling with AlertDialogTitle and AlertDialogDescription for context.
            </p>
            <p>
              <strong>Focus Management:</strong> Focus is automatically moved to the dialog and restored when closed.
            </p>
            <p>
              <strong>Modal Behavior:</strong> Background content is inert and cannot be interacted with while dialog is open.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}