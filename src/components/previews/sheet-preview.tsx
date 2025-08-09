import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
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

export function SheetPreview() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Sheets */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Sheets</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Right Side Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Right Side Sheet</CardTitle>
              <CardDescription>
                Default sheet that slides in from the right side.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Open Right Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Right Side Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the right side of the screen.
                      Perfect for navigation menus, settings panels, and detailed views.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="space-y-[var(--space-md)]">
                      <div className="flex items-center gap-[var(--space-sm)]">
                        <Icon name="info" size="sm" className="text-[var(--color-text-brand)]" />
                        <span className="text-body-medium-sm">Sheet Content</span>
                      </div>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        This is the main content area of the sheet. You can place any content here,
                        including forms, lists, or detailed information.
                      </p>
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Left Side Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Left Side Sheet</CardTitle>
              <CardDescription>
                Sheet that slides in from the left side.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Left Sheet</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Left Side Sheet</SheetTitle>
                    <SheetDescription>
                      This sheet slides in from the left side, commonly used for navigation.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <nav className="space-y-[var(--space-sm)]">
                      <a href="#" className="flex items-center gap-[var(--space-sm)] p-[var(--space-sm)] rounded-md hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                        <Icon name="layout-dashboard" size="sm" />
                        <span className="text-body-sm">Dashboard</span>
                      </a>
                      <a href="#" className="flex items-center gap-[var(--space-sm)] p-[var(--space-sm)] rounded-md hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                        <Icon name="user" size="sm" />
                        <span className="text-body-sm">Profile</span>
                      </a>
                      <a href="#" className="flex items-center gap-[var(--space-sm)] p-[var(--space-sm)] rounded-md hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                        <Icon name="settings" size="sm" />
                        <span className="text-body-sm">Settings</span>
                      </a>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top and Bottom Sheets */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Top and Bottom Sheets</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Top Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Top Sheet</CardTitle>
              <CardDescription>
                Sheet that slides down from the top of the screen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary">Open Top Sheet</Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Notification Center</SheetTitle>
                    <SheetDescription>
                      Recent notifications and updates from your account.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="space-y-[var(--space-md)]">
                      <div className="flex items-start gap-[var(--space-md)]">
                        <Icon name="circle-check-big" size="sm" color="success" className="mt-[2px]" />
                        <div className="flex-1">
                          <div className="text-body-medium-sm">Deployment successful</div>
                          <div className="text-body-sm text-[var(--color-text-secondary)]">
                            Your application has been deployed to production.
                          </div>
                        </div>
                        <Badge variant="success" size="small">New</Badge>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-[var(--space-md)]">
                        <Icon name="info" size="sm" color="information" className="mt-[2px]" />
                        <div className="flex-1">
                          <div className="text-body-medium-sm">System maintenance</div>
                          <div className="text-body-sm text-[var(--color-text-secondary)]">
                            Scheduled maintenance window tonight at 2 AM EST.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Bottom Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Bottom Sheet</CardTitle>
              <CardDescription>
                Sheet that slides up from the bottom, great for mobile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost">Open Bottom Sheet</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Quick Actions</SheetTitle>
                    <SheetDescription>
                      Choose an action to perform quickly.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--space-md)]">
                      <Button variant="outline" className="flex flex-col gap-[var(--space-sm)] h-auto py-[var(--space-md)]">
                        <Icon name="plus" size="md" />
                        <span className="text-caption-sm">Create</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col gap-[var(--space-sm)] h-auto py-[var(--space-md)]">
                        <Icon name="share" size="md" />
                        <span className="text-caption-sm">Share</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col gap-[var(--space-sm)] h-auto py-[var(--space-md)]">
                        <Icon name="bookmark" size="md" />
                        <span className="text-caption-sm">Save</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col gap-[var(--space-sm)] h-auto py-[var(--space-md)]">
                        <Icon name="send" size="md" />
                        <span className="text-caption-sm">Send</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Profile Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Profile Form</CardTitle>
              <CardDescription>
                Sheet with a form for editing user profile information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <SheetTrigger asChild>
                  <Button>Edit Profile</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      Update your profile information below.
                    </SheetDescription>
                  </SheetHeader>
                  <form className="space-y-[var(--space-lg)] py-[var(--space-lg)]">
                    <FormField>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" defaultValue="John Doe" />
                      </FormControl>
                    </FormField>
                    
                    <FormField>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                      </FormControl>
                      <FormHelperText>Your email address will not be publicly visible</FormHelperText>
                    </FormField>

                    <FormField>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <textarea 
                          className="w-full min-h-[80px] px-[var(--space-md)] py-[var(--space-sm)] text-body-sm rounded-md border border-[var(--color-border-input)] bg-[var(--color-background-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-primary)] disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="Tell us about yourself..."
                          defaultValue="Frontend developer passionate about creating beautiful user interfaces."
                        />
                      </FormControl>
                    </FormField>
                  </form>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button onClick={() => setIsProfileOpen(false)}>Save Changes</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Settings Panel</CardTitle>
              <CardDescription>
                Sheet with various settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="settings" size="sm" />
                    Settings
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                      Manage your account settings and preferences.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)] space-y-[var(--space-lg)]">
                    <div>
                      <h3 className="text-body-medium-md mb-[var(--space-md)]">Account</h3>
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">Email notifications</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Receive updates via email</div>
                          </div>
                          <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">Push notifications</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Receive push notifications</div>
                          </div>
                          <Checkbox />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-body-medium-md mb-[var(--space-md)]">Privacy</h3>
                      <div className="space-y-[var(--space-md)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">Profile visibility</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Make profile public</div>
                          </div>
                          <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-body-medium-sm">Analytics</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Help improve our service</div>
                          </div>
                          <Checkbox defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSettingsOpen(false)}
                    >
                      Done
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Sizing */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Custom Sizing</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Narrow Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Narrow Sheet</CardTitle>
              <CardDescription>
                Custom narrow width for focused content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">Open Narrow</Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Narrow Panel</SheetTitle>
                    <SheetDescription>
                      A narrow sheet for focused interactions.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="space-y-[var(--space-sm)]">
                      <Button variant="ghost" className="w-full justify-start">
                        <Icon name="user" size="sm" className="mr-[var(--space-sm)]" />
                        Account
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Icon name="settings" size="sm" className="mr-[var(--space-sm)]" />
                        Preferences
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Icon name="info" size="sm" className="mr-[var(--space-sm)]" />
                        Help
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Medium Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Medium Sheet</CardTitle>
              <CardDescription>
                Standard width for most use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">Open Medium</Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Medium Panel</SheetTitle>
                    <SheetDescription>
                      Standard width sheet for most content.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="space-y-[var(--space-md)]">
                      <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                        <div className="text-body-medium-sm mb-[var(--space-sm)]">Feature Highlight</div>
                        <div className="text-body-sm text-[var(--color-text-secondary)]">
                          This medium-width sheet provides enough space for detailed content
                          while maintaining focus.
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Wide Sheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Wide Sheet</CardTitle>
              <CardDescription>
                Wider sheet for complex content and forms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">Open Wide</Button>
                </SheetTrigger>
                <SheetContent className="w-[600px] sm:w-[600px]">
                  <SheetHeader>
                    <SheetTitle>Wide Panel</SheetTitle>
                    <SheetDescription>
                      Spacious sheet for complex layouts and forms.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-[var(--space-lg)]">
                    <div className="grid grid-cols-2 gap-[var(--space-md)]">
                      <div className="space-y-[var(--space-sm)]">
                        <div className="text-body-medium-sm">Column 1</div>
                        <div className="space-y-[var(--space-xsm)]">
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item 1</div>
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item 2</div>
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item 3</div>
                        </div>
                      </div>
                      <div className="space-y-[var(--space-sm)]">
                        <div className="text-body-medium-sm">Column 2</div>
                        <div className="space-y-[var(--space-xsm)]">
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item A</div>
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item B</div>
                          <div className="p-[var(--space-sm)] bg-[var(--color-background-neutral-subtle)] rounded text-caption-sm">Item C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
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
                <li>• Use appropriate side based on content and user flow</li>
                <li>• Include clear titles and descriptions</li>
                <li>• Provide obvious close mechanisms (X button, Cancel)</li>
                <li>• Use consistent padding and spacing</li>
                <li>• Consider mobile users with bottom/top sheets</li>
                <li>• Include form validation and feedback</li>
                <li>• Use semantic HTML and proper focus management</li>
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
                <li>• Don't make sheets too wide on mobile devices</li>
                <li>• Avoid nesting sheets within other sheets</li>
                <li>• Don't use sheets for simple confirmations</li>
                <li>• Avoid overcrowding sheets with too much content</li>
                <li>• Don't forget to handle keyboard navigation</li>
                <li>• Avoid sheets without clear exit strategies</li>
                <li>• Don't use sheets for time-sensitive actions</li>
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
                <strong>Focus Management:</strong> Sheets automatically trap focus and return it to the trigger when closed.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Users can close sheets with the Escape key and navigate with Tab/Shift+Tab.
              </p>
              <p>
                <strong>Screen Readers:</strong> Sheets include proper ARIA attributes and roles for screen reader compatibility.
              </p>
              <p>
                <strong>Color Contrast:</strong> Ensure sufficient contrast between text and backgrounds for readability.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}