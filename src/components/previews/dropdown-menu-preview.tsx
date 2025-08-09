import { Button } from "../ui/button"
import { Icon } from "../ui/icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useState } from "react"

export function DropdownMenuPreview() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [position, setPosition] = useState("bottom")

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Dropdown Menu */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Dropdown Menu</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Menu */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Menu</CardTitle>
              <CardDescription>
                Basic dropdown menu with items and separators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">
                    Actions
                    <Icon name="chevron-down" size="sm" className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" size="sm" className="mr-2" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="credit-card" size="sm" className="mr-2" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" size="sm" className="mr-2" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="log-out" size="sm" className="mr-2" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Menu with Checkbox Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Checkbox Menu</CardTitle>
              <CardDescription>
                Dropdown menu with checkable items for toggling states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    View
                    <Icon name="chevron-down" size="sm" className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showActivityBar}
                    onCheckedChange={setShowActivityBar}
                    disabled
                  >
                    Activity Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Dropdown Menus */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Advanced Dropdown Menus</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Radio Group Menu */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Radio Group Menu</CardTitle>
              <CardDescription>
                Dropdown menu with radio group for single selection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    Panel Position
                    <Icon name="chevron-down" size="sm" className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Position</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Submenu */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Nested Submenu</CardTitle>
              <CardDescription>
                Dropdown menu with nested submenus for organized options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">
                    More Options
                    <Icon name="chevron-down" size="sm" className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Icon name="plus" size="sm" className="mr-2" />
                    <span>New Tab</span>
                    <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="download" size="sm" className="mr-2" />
                    <span>Download</span>
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon name="share-2" size="sm" className="mr-2" />
                      <span>Share</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Icon name="mail" size="sm" className="mr-2" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="message-square" size="sm" className="mr-2" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icon name="plus-circle" size="sm" className="mr-2" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="trash-2" size="sm" className="mr-2" />
                    <span>Delete</span>
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Different Trigger Types */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Trigger Variations</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Icon Button Trigger */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Icon Button</CardTitle>
              <CardDescription>
                Using an icon button as dropdown trigger.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-[var(--size-md)] w-[var(--size-md)] p-0">
                    <Icon name="more-horizontal" size="sm" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem className="text-[var(--color-text-error)]">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Text Trigger */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Text Link</CardTitle>
              <CardDescription>
                Using text as dropdown trigger.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 font-normal text-[var(--color-text-brand)] hover:text-[var(--color-text-brand-hovered)]">
                    john.doe@example.com
                    <Icon name="chevron-down" size="sm" className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
                  <DropdownMenuItem disabled>john.doe@example.com</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="user" size="sm" className="mr-2" />
                    Your Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" size="sm" className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="log-out" size="sm" className="mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Avatar Trigger */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Custom Element</CardTitle>
              <CardDescription>
                Using custom elements as triggers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-[var(--size-md)] w-[var(--size-md)] rounded-full p-0">
                    <div className="h-[var(--size-md)] w-[var(--size-md)] rounded-full bg-[var(--color-background-brand)] flex items-center justify-center">
                      <span className="text-xs font-medium text-[var(--color-text-on-action)]">
                        JD
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-[var(--color-text-secondary)]">
                        john@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icon name="user" size="sm" className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="settings" size="sm" className="mr-2" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon name="log-out" size="sm" className="mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Real World Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Real World Examples</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Data Table Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Table Row Actions</CardTitle>
              <CardDescription>
                Common pattern for data table row actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-[var(--color-border-primary-subtle)] rounded-md">
                <div className="flex items-center justify-between p-[var(--space-md)]">
                  <div>
                    <h4 className="font-medium text-body-sm">Project Alpha</h4>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">Updated 2 hours ago</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-[var(--size-md)] w-[var(--size-md)] p-0">
                        <Icon name="more-horizontal" size="sm" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Icon name="eye" size="sm" className="mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="edit" size="sm" className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="copy" size="sm" className="mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icon name="archive" size="sm" className="mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--color-text-error)]">
                        <Icon name="trash-2" size="sm" className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Menu */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Navigation Menu</CardTitle>
              <CardDescription>
                User navigation menu with profile and quick actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-[var(--space-md)] p-[var(--space-md)] border border-[var(--color-border-primary-subtle)] rounded-md">
                <div className="h-10 w-10 rounded-full bg-[var(--color-background-brand)] flex items-center justify-center">
                  <span className="text-sm font-medium text-[var(--color-text-on-action)]">
                    AB
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-medium">Alex Brown</p>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">alex@company.com</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Icon name="chevron-down" size="sm" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="user" size="sm" className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="credit-card" size="sm" className="mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="settings" size="sm" className="mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="life-buoy" size="sm" className="mr-2" />
                      Support
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Icon name="log-out" size="sm" className="mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>
        
        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card className="border-[var(--color-border-success)]">
            <CardHeader>
              <CardTitle className="text-heading-sm text-[var(--color-text-success)]">✓ Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use clear, action-oriented labels</li>
                <li>• Group related actions with separators</li>
                <li>• Include keyboard shortcuts when applicable</li>
                <li>• Use consistent iconography throughout</li>
                <li>• Provide visual feedback for destructive actions</li>
                <li>• Position menus to stay within viewport</li>
                <li>• Use appropriate trigger elements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-error)]">
            <CardHeader>
              <CardTitle className="text-heading-sm text-[var(--color-text-error)]">✗ Avoid</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Too many nested levels (max 2-3 deep)</li>
                <li>• Unclear or ambiguous action labels</li>
                <li>• Missing visual hierarchy in options</li>
                <li>• Overloading menus with too many options</li>
                <li>• Inconsistent menu positioning</li>
                <li>• Missing destructive action confirmation</li>
                <li>• Poor mobile touch target sizes</li>
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
                <strong>Keyboard Navigation:</strong> Dropdown menus support full keyboard navigation with arrow keys, Enter, and Escape.
              </p>
              <p>
                <strong>Focus Management:</strong> Focus is properly managed when opening/closing menus and navigating between items.
              </p>
              <p>
                <strong>Screen Readers:</strong> All menu items include proper ARIA labels and roles for screen reader compatibility.
              </p>
              <p>
                <strong>Visual Indicators:</strong> Clear visual indicators show menu state, selection, and keyboard focus.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}