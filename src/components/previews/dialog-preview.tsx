import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
} from "../ui/form-field";

export function DialogPreview() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Dialogs */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Dialogs</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Dialog</CardTitle>
              <CardDescription>
                Basic dialog with header, content, and action buttons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Card header</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="space-y-[var(--space-lg)]">
                      <div className="space-y-[var(--space-sm)]">
                        <label htmlFor="name" className="text-body-medium-sm">
                          Name
                        </label>
                        <Input
                          id="name"
                          defaultValue="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="space-y-[var(--space-sm)]">
                        <label
                          htmlFor="username"
                          className="text-body-medium-sm"
                        >
                          Username
                        </label>
                        <Input
                          id="username"
                          defaultValue="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="primary" type="submit">
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Confirmation Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Confirmation Dialog
              </CardTitle>
              <CardDescription>
                Dialog for confirming destructive actions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button
                      variant="default"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Different Sizes
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Small Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Small Dialog</CardTitle>
              <CardDescription>
                Compact dialog for simple interactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Open Small
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[300px]">
                  <DialogHeader>
                    <DialogTitle>Card header</DialogTitle>
                    <DialogDescription>
                      Small dialog for quick actions.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button variant="default" size="sm">
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm">
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Medium Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Medium Dialog</CardTitle>
              <CardDescription>
                Standard dialog size for most use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Open Medium
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Card header</DialogTitle>
                    <DialogDescription>
                      This is a medium-sized dialog with more space for content.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-[var(--space-md)]">
                    <div className="text-body-sm text-[var(--color-text-secondary)]">
                      Medium dialogs provide a good balance between space and
                      focus, perfect for forms and detailed information.
                    </div>
                  </div>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button variant="default">Cancel</Button>
                    <Button variant="primary">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Large Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Large Dialog</CardTitle>
              <CardDescription>
                Large dialog for complex forms and content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Open Large
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Card header</DialogTitle>
                    <DialogDescription>
                      Large dialog with plenty of space for complex content and
                      forms.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-[var(--space-md)]">
                    <div className="grid grid-cols-2 gap-[var(--space-md)]">
                      <div className="space-y-[var(--space-sm)]">
                        <div className="text-body-medium-sm">Left Column</div>
                        <div className="text-body-sm text-[var(--color-text-secondary)]">
                          Large dialogs can accommodate complex layouts with
                          multiple columns and sections.
                        </div>
                      </div>
                      <div className="space-y-[var(--space-sm)]">
                        <div className="text-body-medium-sm">Right Column</div>
                        <div className="text-body-sm text-[var(--color-text-secondary)]">
                          Use them for detailed forms, settings panels, or rich
                          content.
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button variant="default">Cancel</Button>
                    <Button variant="primary">Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Profile Form</CardTitle>
              <CardDescription>
                Dialog with a complete form for editing user profiles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile information below.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-[var(--space-lg)]">
                    <FormField>
                      <FormLabel htmlFor="profile-name">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="profile-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormHelperText>
                        This is your public display name.
                      </FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="profile-email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="profile-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormHelperText>
                        We'll never share your email address.
                      </FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="profile-bio">Bio</FormLabel>
                      <FormControl>
                        <textarea
                          id="profile-bio"
                          className="text-body-sm min-h-[80px] w-full resize-none rounded-md border border-[var(--color-border-input)] bg-[var(--color-background-input)] px-[var(--space-md)] py-[var(--space-sm)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-primary)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about yourself..."
                          defaultValue="Frontend developer passionate about creating beautiful user interfaces."
                        />
                      </FormControl>
                    </FormField>
                  </form>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button
                      variant="default"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Settings Dialog</CardTitle>
              <CardDescription>
                Dialog with tabbed content and multiple settings sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="flex items-center gap-[var(--space-sm)]"
                  >
                    <Icon name="settings" size="sm" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Application Settings</DialogTitle>
                    <DialogDescription>
                      Configure your application preferences and settings.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-[var(--space-lg)]">
                    <div>
                      <h3 className="text-body-medium-md mb-[var(--space-md)]">
                        Appearance
                      </h3>
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">Dark Mode</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Use dark theme for the interface
                            </div>
                          </div>
                          <Checkbox />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">
                              Compact View
                            </div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Use smaller spacing and elements
                            </div>
                          </div>
                          <Checkbox />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-body-medium-md mb-[var(--space-md)]">
                        Notifications
                      </h3>
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">
                              Email Notifications
                            </div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Receive notifications via email
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            defaultChecked
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">
                              Push Notifications
                            </div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">
                              Receive push notifications
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button variant="default">Reset to Defaults</Button>
                    <Button variant="primary">Save Settings</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Special Use Cases */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Special Use Cases
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Alert Dialog */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Alert Dialog</CardTitle>
              <CardDescription>
                Critical alerts and important notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-[var(--space-sm)]"
                  >
                    <Icon name="alert-triangle" size="sm" />
                    Show Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="alert-triangle" size="md" color="error" />
                      System Error
                    </DialogTitle>
                    <DialogDescription>
                      An unexpected error occurred while processing your
                      request. Please try again or contact support if the
                      problem persists.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-[var(--space-md)]">
                    <div className="rounded-md bg-[var(--color-background-error)] p-[var(--space-md)]">
                      <div className="text-body-sm text-[var(--color-text-error)]">
                        <strong>Error Code:</strong> ERR_CONNECTION_FAILED
                        <br />
                        <strong>Timestamp:</strong>{" "}
                        {new Date().toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="gap-[var(--space-sm)] sm:gap-0">
                    <Button variant="default">Contact Support</Button>
                    <Button variant="primary">Try Again</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Success Dialog</CardTitle>
              <CardDescription>
                Confirmation of successful actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="primary"
                    className="flex items-center gap-[var(--space-sm)]"
                  >
                    <Icon name="circle-check-big" size="sm" />
                    Complete Action
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="circle-check-big" size="md" color="success" />
                      Success!
                    </DialogTitle>
                    <DialogDescription>
                      Your action has been completed successfully. All changes
                      have been saved.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-[var(--space-md)]">
                    <div className="flex items-center gap-[var(--space-md)]">
                      <div className="flex-1">
                        <div className="space-y-[var(--space-sm)]">
                          <div className="text-body-sm flex items-center justify-between">
                            <span className="text-[var(--color-text-secondary)]">
                              Status
                            </span>
                            <Badge variant="success" size="sm">
                              Complete
                            </Badge>
                          </div>
                          <div className="text-body-sm flex items-center justify-between">
                            <span className="text-[var(--color-text-secondary)]">
                              Time
                            </span>
                            <span className="font-medium">
                              {new Date().toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="primary" className="w-full">
                      Continue
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                <li>• Use clear, descriptive titles for dialog purpose</li>
                <li>• Include helpful descriptions to provide context</li>
                <li>• Place primary action on the right in footer</li>
                <li>• Use appropriate dialog sizes for content</li>
                <li>• Always provide a way to close or cancel</li>
                <li>• Use consistent button styling and spacing</li>
                <li>• Consider the consequences of actions</li>
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
                <li>• Don't use dialogs for non-essential information</li>
                <li>• Avoid unclear or vague dialog titles</li>
                <li>• Don't make dialogs too large on mobile</li>
                <li>• Avoid nesting dialogs within other dialogs</li>
                <li>• Don't forget keyboard navigation and focus</li>
                <li>• Avoid destructive actions without confirmation</li>
                <li>• Don't overuse dialogs for simple interactions</li>
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
            <div className="text-body-sm space-y-[var(--space-md)] text-[var(--color-text-secondary)]">
              <p>
                <strong>Focus Management:</strong> Dialogs automatically trap
                focus within the modal and return focus to the trigger when
                closed.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Users can close dialogs
                with the Escape key and navigate with Tab/Shift+Tab within the
                dialog.
              </p>
              <p>
                <strong>Screen Readers:</strong> Dialogs include proper ARIA
                attributes and roles for screen reader compatibility.
              </p>
              <p>
                <strong>Visual Hierarchy:</strong> Use clear headings and
                descriptions to establish content hierarchy for all users.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
