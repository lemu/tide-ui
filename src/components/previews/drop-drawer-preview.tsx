import { useState } from "react";
import {
  DropDrawer,
  DropDrawerContent,
  DropDrawerItem,
  DropDrawerLabel,
  DropDrawerSeparator,
  DropDrawerTrigger,
  DropDrawerGroup,
  DropDrawerCheckboxItem,
  DropDrawerRadioGroup,
  DropDrawerRadioItem,
  DropDrawerShortcut,
  DropDrawerSub,
  DropDrawerSubContent,
  DropDrawerSubTrigger,
} from "@/components/ui/drop-drawer";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kbd } from "@/components/ui/kbd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function DropDrawerPreview() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [social, setSocial] = useState(true);
  const [position, setPosition] = useState("bottom");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Drop Drawer</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Enhanced dropdown menu with drawer-style design, larger spacing, and smooth animations
        </p>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 gap-[var(--space-xlg)] md:grid-cols-2 lg:grid-cols-3">
        
        {/* Basic Drop Drawer */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Basic Drop Drawer</CardTitle>
            <CardDescription>
              Standard menu with improved spacing and rounded corners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropDrawerTrigger>
              <DropDrawerContent>
                <DropDrawerItem>
                  <Icon name="user" size="sm" className="mr-[var(--space-sm)]" />
                  Profile
                  <DropDrawerShortcut className="flex gap-1">
                    <Kbd size="sm">⇧</Kbd>
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">P</Kbd>
                  </DropDrawerShortcut>
                </DropDrawerItem>
                <DropDrawerItem>
                  <Icon name="credit-card" size="sm" className="mr-[var(--space-sm)]" />
                  Billing
                  <DropDrawerShortcut className="flex gap-1">
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">B</Kbd>
                  </DropDrawerShortcut>
                </DropDrawerItem>
                <DropDrawerItem>
                  <Icon name="settings" size="sm" className="mr-[var(--space-sm)]" />
                  Settings
                  <DropDrawerShortcut className="flex gap-1">
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="sm">S</Kbd>
                  </DropDrawerShortcut>
                </DropDrawerItem>
                <DropDrawerSeparator />
                <DropDrawerItem destructive>
                  <Icon name="log-out" size="sm" className="mr-[var(--space-sm)]" />
                  Sign out
                </DropDrawerItem>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>

        {/* Labeled Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">With Labels</CardTitle>
            <CardDescription>
              Menu items organized with section labels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">Categories</Button>
              </DropDrawerTrigger>
              <DropDrawerContent>
                <DropDrawerLabel>Important</DropDrawerLabel>
                <DropDrawerItem>
                  <Icon name="circle-alert" size="sm" className="mr-[var(--space-sm)]" />
                  Urgent Tasks
                </DropDrawerItem>
                <DropDrawerItem>
                  <Icon name="star" size="sm" className="mr-[var(--space-sm)]" />
                  Starred Items
                </DropDrawerItem>
                
                <DropDrawerSeparator />
                
                <DropDrawerLabel>Discussion</DropDrawerLabel>
                <DropDrawerItem>
                  <Icon name="message-circle" size="sm" className="mr-[var(--space-sm)]" />
                  Team Chat
                </DropDrawerItem>
                <DropDrawerItem>
                  <Icon name="users" size="sm" className="mr-[var(--space-sm)]" />
                  Group Discussion
                </DropDrawerItem>

                <DropDrawerSeparator />

                <DropDrawerLabel>Security</DropDrawerLabel>
                <DropDrawerItem>
                  <Icon name="shield-check" size="sm" className="mr-[var(--space-sm)]" />
                  Security Check
                </DropDrawerItem>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>

        {/* Checkbox Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Checkbox Items</CardTitle>
            <CardDescription>
              Multi-select options with larger touch targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">Preferences</Button>
              </DropDrawerTrigger>
              <DropDrawerContent>
                <DropDrawerLabel>Email Notifications</DropDrawerLabel>
                <DropDrawerCheckboxItem
                  checked={notifications}
                  onCheckedChange={setNotifications}
                >
                  General Notifications
                </DropDrawerCheckboxItem>
                <DropDrawerCheckboxItem
                  checked={marketing}
                  onCheckedChange={setMarketing}
                >
                  Marketing Updates
                </DropDrawerCheckboxItem>
                <DropDrawerCheckboxItem
                  checked={social}
                  onCheckedChange={setSocial}
                >
                  Social Activity
                </DropDrawerCheckboxItem>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>

        {/* Radio Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Radio Items</CardTitle>
            <CardDescription>
              Single-select options with improved styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">Position: {position}</Button>
              </DropDrawerTrigger>
              <DropDrawerContent>
                <DropDrawerLabel>Panel Position</DropDrawerLabel>
                <DropDrawerRadioGroup value={position} onValueChange={setPosition}>
                  <DropDrawerRadioItem value="top">Top</DropDrawerRadioItem>
                  <DropDrawerRadioItem value="bottom">Bottom</DropDrawerRadioItem>
                  <DropDrawerRadioItem value="right">Right</DropDrawerRadioItem>
                </DropDrawerRadioGroup>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>

        {/* Sub Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Nested Menu</CardTitle>
            <CardDescription>
              Sub-menus with enhanced visual hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">More Options</Button>
              </DropDrawerTrigger>
              <DropDrawerContent>
                <DropDrawerItem>
                  <Icon name="plus" size="sm" className="mr-[var(--space-sm)]" />
                  New Item
                </DropDrawerItem>
                <DropDrawerSub>
                  <DropDrawerSubTrigger>
                    <Icon name="share" size="sm" className="mr-[var(--space-sm)]" />
                    Share
                  </DropDrawerSubTrigger>
                  <DropDrawerSubContent>
                    <DropDrawerItem>
                      <Icon name="mail" size="sm" className="mr-[var(--space-sm)]" />
                      Email
                    </DropDrawerItem>
                    <DropDrawerItem>
                      <Icon name="link" size="sm" className="mr-[var(--space-sm)]" />
                      Copy Link
                    </DropDrawerItem>
                    <DropDrawerItem>
                      <Icon name="twitter" size="sm" className="mr-[var(--space-sm)]" />
                      Twitter
                    </DropDrawerItem>
                  </DropDrawerSubContent>
                </DropDrawerSub>
                <DropDrawerSeparator />
                <DropDrawerItem destructive>
                  <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                  Delete
                </DropDrawerItem>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>

        {/* Complex Action Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Action Menu</CardTitle>
            <CardDescription>
              Complex menu with multiple action types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropDrawer modal={false}>
              <DropDrawerTrigger asChild>
                <Button variant="outline">
                  <Icon name="more-horizontal" size="sm" />
                </Button>
              </DropDrawerTrigger>
              <DropDrawerContent align="end" className="w-64">
                <DropDrawerGroup>
                  <DropDrawerItem>
                    <Icon name="eye" size="sm" className="mr-[var(--space-sm)]" />
                    View Details
                    <DropDrawerShortcut>⌘I</DropDrawerShortcut>
                  </DropDrawerItem>
                  <DropDrawerItem>
                    <Icon name="edit" size="sm" className="mr-[var(--space-sm)]" />
                    Edit Item
                    <DropDrawerShortcut>⌘E</DropDrawerShortcut>
                  </DropDrawerItem>
                  <DropDrawerItem>
                    <Icon name="copy" size="sm" className="mr-[var(--space-sm)]" />
                    Duplicate
                    <DropDrawerShortcut>⌘D</DropDrawerShortcut>
                  </DropDrawerItem>
                </DropDrawerGroup>
                
                <DropDrawerSeparator />
                
                <DropDrawerGroup>
                  <DropDrawerItem>
                    <Icon name="download" size="sm" className="mr-[var(--space-sm)]" />
                    Export
                  </DropDrawerItem>
                  <DropDrawerItem>
                    <Icon name="share" size="sm" className="mr-[var(--space-sm)]" />
                    Share Link
                  </DropDrawerItem>
                </DropDrawerGroup>
                
                <DropDrawerSeparator />
                
                <DropDrawerItem>
                  <Icon name="archive" size="sm" className="mr-[var(--space-sm)]" />
                  Archive
                </DropDrawerItem>
                <DropDrawerItem destructive>
                  <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                  Delete Item
                </DropDrawerItem>
              </DropDrawerContent>
            </DropDrawer>
          </CardContent>
        </Card>
      </div>

      {/* Design Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Enhanced Design Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Visual Improvements</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Larger border radius (rounded-2xl) for modern look</li>
                <li>• Increased padding and spacing for better touch targets</li>
                <li>• Enhanced shadows and backdrop blur effects</li>
                <li>• Smoother animations with refined timing</li>
                <li>• Larger checkbox and radio button indicators</li>
                <li>• Improved focus and hover states</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">UX Enhancements</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• More generous spacing for easier interaction</li>
                <li>• Better visual hierarchy with refined typography</li>
                <li>• Enhanced backdrop blur for depth perception</li>
                <li>• Consistent icon sizing and alignment</li>
                <li>• Improved destructive action styling</li>
                <li>• Better keyboard navigation feedback</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}