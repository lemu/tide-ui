import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kbd } from "@/components/ui/kbd";

export function DropdownMenuShowcase() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [social, setSocial] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <div className="p-8 bg-[var(--color-surface-base)] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-heading-lg mb-2">Dropdown Menu Showcase</h1>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Updated dropdown menu components following the Figma design system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Menu */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Basic Menu</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Icon name="user" size="md" className="mr-2" />
                  Profile
                  <DropdownMenuShortcut className="flex gap-1">
                    <Kbd size="sm">⇧</Kbd>
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">P</Kbd>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="credit-card" size="md" className="mr-2" />
                  Billing
                  <DropdownMenuShortcut className="flex gap-1">
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">B</Kbd>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="settings" size="md" className="mr-2" />
                  Settings
                  <DropdownMenuShortcut className="flex gap-1">
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">S</Kbd>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>
                  <Icon name="log-out" size="md" className="mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Menu with Labels */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Menu with Labels</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Important</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Icon name="circle-alert" size="md" className="mr-2" />
                  Urgent Tasks
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="star" size="md" className="mr-2" />
                  Starred Items
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel>Discussion</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Icon name="message-circle" size="md" className="mr-2" />
                  Team Chat
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="users" size="md" className="mr-2" />
                  Group Discussion
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Verification</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Icon name="shield-check" size="md" className="mr-2" />
                  Security Check
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Checkbox Menu */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Checkbox Menu</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Preferences</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Email Notifications</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={notifications}
                  onCheckedChange={setNotifications}
                >
                  General Notifications
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={marketing}
                  onCheckedChange={setMarketing}
                >
                  Marketing Updates
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={social}
                  onCheckedChange={setSocial}
                >
                  Social Activity
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Radio Menu */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Radio Menu</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Position: {position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sub Menu */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Sub Menu</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">More Options</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Icon name="plus" size="md" className="mr-2" />
                  New Item
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Icon name="share" size="md" className="mr-2" />
                    Share
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Icon name="mail" size="md" className="mr-2" />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="link" size="md" className="mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon name="twitter" size="md" className="mr-2" />
                      Twitter
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>
                  <Icon name="trash" size="md" className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Complex Menu (like in Figma) */}
          <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
            <h3 className="text-heading-sm mb-4">Complex Menu</h3>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Icon name="more-horizontal" size="md" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="user" size="md" className="mr-2" />
                    User Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="truck" size="md" className="mr-2" />
                    Cargo Tracking
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="file-text" size="md" className="mr-2" />
                    Shipment Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" size="md" className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem destructive>
                  <Icon name="trash" size="md" className="mr-2" />
                  Remove Asset
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="bg-[var(--color-surface-primary)] p-6 rounded-lg border border-[var(--color-border-primary-subtle)]">
          <h3 className="text-heading-sm mb-4">Design Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-body-medium-md mb-2">Styling Updates</h4>
              <ul className="text-body-sm space-y-1 text-[var(--color-text-secondary)]">
                <li>• Updated to use semantic design tokens</li>
                <li>• Improved spacing with consistent padding</li>
                <li>• Enhanced border radius (rounded-lg)</li>
                <li>• Better typography with proper text sizing</li>
                <li>• Destructive styling for dangerous actions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body-medium-md mb-2">Interactive Elements</h4>
              <ul className="text-body-sm space-y-1 text-[var(--color-text-secondary)]">
                <li>• Enhanced hover states</li>
                <li>• Improved checkbox styling</li>
                <li>• Better focus indicators</li>
                <li>• Consistent icon alignment</li>
                <li>• Proper keyboard shortcuts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}