import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Toggle } from "../ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
} from "../ui/form-field";

export function TogglePreview() {
  const [boldPressed, setBoldPressed] = useState(false);
  const [italicPressed, setItalicPressed] = useState(false);
  const [underlinePressed, setUnderlinePressed] = useState(false);
  
  const [textFormatting, setTextFormatting] = useState<string[]>([]);
  const [alignment, setAlignment] = useState("left");
  const [viewMode, setViewMode] = useState("list");
  const [sidebar, setSidebar] = useState("files");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Toggles */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Toggles</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Toggles</CardTitle>
              <CardDescription>
                Basic toggle buttons with different variants and sizes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm mb-[var(--space-sm)]">Default Variant</div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Toggle aria-label="Toggle bold" size="sm">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                  <Toggle aria-label="Toggle italic">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                  <Toggle aria-label="Toggle underline" size="lg">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm mb-[var(--space-sm)]">Outline Variant</div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Toggle variant="ghost" aria-label="Toggle bold" size="sm">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                  <Toggle variant="ghost" aria-label="Toggle italic">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                  <Toggle variant="ghost" aria-label="Toggle underline" size="lg">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggle States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Toggle States</CardTitle>
              <CardDescription>
                Toggles in different states including pressed and disabled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Not Pressed</span>
                  <Toggle variant="ghost" aria-label="Not pressed">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Pressed</span>
                  <Toggle variant="ghost" defaultPressed aria-label="Pressed">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Disabled</span>
                  <Toggle variant="ghost" disabled aria-label="Disabled">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Disabled + Pressed</span>
                  <Toggle variant="ghost" disabled defaultPressed aria-label="Disabled pressed">
                    <Icon name="circle" size="sm" />
                  </Toggle>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Text Formatting Example */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Text Formatting</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Individual Toggles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Individual Controls</CardTitle>
              <CardDescription>
                Separate toggle controls for text formatting options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Toggle
                  pressed={boldPressed}
                  onPressedChange={setBoldPressed}
                  variant="ghost"
                  aria-label="Toggle bold"
                >
                  <Icon name="circle" size="sm" />
                  <span>Bold</span>
                </Toggle>
                <Toggle
                  pressed={italicPressed}
                  onPressedChange={setItalicPressed}
                  variant="ghost"
                  aria-label="Toggle italic"
                >
                  <Icon name="circle" size="sm" />
                  <span>Italic</span>
                </Toggle>
                <Toggle
                  pressed={underlinePressed}
                  onPressedChange={setUnderlinePressed}
                  variant="ghost"
                  aria-label="Toggle underline"
                >
                  <Icon name="circle" size="sm" />
                  <span>Underline</span>
                </Toggle>
              </div>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                  Preview:
                </div>
                <div
                  className={`text-body-md ${
                    boldPressed ? "font-bold" : ""
                  } ${italicPressed ? "italic" : ""} ${
                    underlinePressed ? "underline" : ""
                  }`}
                >
                  Sample text with formatting
                </div>
              </div>

              <div className="flex items-center gap-[var(--space-sm)] text-caption-sm">
                <Badge variant={boldPressed ? "success" : "outline"} size="sm">
                  Bold: {boldPressed ? "On" : "Off"}
                </Badge>
                <Badge variant={italicPressed ? "success" : "outline"} size="sm">
                  Italic: {italicPressed ? "On" : "Off"}
                </Badge>
                <Badge variant={underlinePressed ? "success" : "outline"} size="sm">
                  Underline: {underlinePressed ? "On" : "Off"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Toggle Group - Multiple */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Selection Group</CardTitle>
              <CardDescription>
                Toggle group allowing multiple selections for formatting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <ToggleGroup
                type="multiple"
                value={textFormatting}
                onValueChange={setTextFormatting}
                variant="ghost"
              >
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Icon name="circle" size="sm" />
                  <span>Bold</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Icon name="circle" size="sm" />
                  <span>Italic</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Icon name="circle" size="sm" />
                  <span>Underline</span>
                </ToggleGroupItem>
              </ToggleGroup>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                  Selected formatting:
                </div>
                <div className="flex items-center gap-[var(--space-sm)]">
                  {textFormatting.length > 0 ? (
                    textFormatting.map((format) => (
                      <Badge key={format} variant="success" size="sm">
                        {format}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="ghost" size="sm">
                      None
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Toggle Groups */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Toggle Groups</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Single Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Single Selection</CardTitle>
              <CardDescription>
                Toggle group with single selection mode for alignment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Text Alignment</div>
                <ToggleGroup
                  type="single"
                  value={alignment}
                  onValueChange={setAlignment}
                  variant="ghost"
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <Icon name="arrow-left" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <Icon name="circle" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <Icon name="arrow-right" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="justify" aria-label="Justify">
                    <Icon name="navigation" size="sm" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                  Current alignment: <Badge variant="secondary" size="sm">{alignment}</Badge>
                </div>
                <div
                  className={`text-body-md ${
                    alignment === "left" ? "text-left" :
                    alignment === "center" ? "text-center" :
                    alignment === "right" ? "text-right" :
                    alignment === "justify" ? "text-justify" : "text-left"
                  }`}
                >
                  This text will be aligned according to your selection.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">View Mode</CardTitle>
              <CardDescription>
                Toggle between different view modes with icons and labels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Display Mode</div>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={setViewMode}
                >
                  <ToggleGroupItem value="list" aria-label="List view">
                    <Icon name="list-filter" size="sm" />
                    <span>List</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Icon name="grid-2x2-plus" size="sm" />
                    <span>Grid</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="table" aria-label="Table view">
                    <Icon name="table-2" size="sm" />
                    <span>Table</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                  Current view: <Badge variant="secondary" size="sm">{viewMode}</Badge>
                </div>
                <div className="grid gap-[var(--space-sm)]">
                  {viewMode === "list" && (
                    <div className="space-y-[var(--space-xsm)]">
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border">Item 1</div>
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border">Item 2</div>
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border">Item 3</div>
                    </div>
                  )}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-3 gap-[var(--space-sm)]">
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border aspect-square flex items-center justify-center text-caption-sm">1</div>
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border aspect-square flex items-center justify-center text-caption-sm">2</div>
                      <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border aspect-square flex items-center justify-center text-caption-sm">3</div>
                    </div>
                  )}
                  {viewMode === "table" && (
                    <div className="space-y-[var(--space-xsm)]">
                      <div className="grid grid-cols-3 gap-[var(--space-sm)] text-caption-sm font-medium">
                        <div>Name</div>
                        <div>Type</div>
                        <div>Size</div>
                      </div>
                      <div className="grid grid-cols-3 gap-[var(--space-sm)] text-caption-sm">
                        <div>Item 1</div>
                        <div>File</div>
                        <div>2.4 MB</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Integration</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Preference Settings</CardTitle>
              <CardDescription>
                Toggle groups integrated with form components.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <FormField>
                <FormLabel>Sidebar Panels</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    value={sidebar}
                    onValueChange={setSidebar}
                    variant="ghost"
                  >
                    <ToggleGroupItem value="files" aria-label="Files panel">
                      <Icon name="package" size="sm" />
                      <span>Files</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="search" aria-label="Search panel">
                      <Icon name="search" size="sm" />
                      <span>Search</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="settings" aria-label="Settings panel">
                      <Icon name="settings" size="sm" />
                      <span>Settings</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormHelperText>
                  Choose which sidebar panel to display by default
                </FormHelperText>
              </FormField>

              <FormField>
                <FormLabel>Editor Features</FormLabel>
                <FormControl>
                  <ToggleGroup
                    type="multiple"
                    defaultValue={["syntax", "minimap"]}
                    variant="ghost"
                    size="sm"
                  >
                    <ToggleGroupItem value="syntax" aria-label="Syntax highlighting">
                      <Icon name="sparkles" size="sm" />
                      <span>Syntax</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="minimap" aria-label="Minimap">
                      <Icon name="navigation" size="sm" />
                      <span>Minimap</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="wordwrap" aria-label="Word wrap">
                      <Icon name="rotate-ccw" size="sm" />
                      <span>Wrap</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormHelperText>
                  Enable additional editor features
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* Toolbar Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Toolbar Configuration</CardTitle>
              <CardDescription>
                Configure which tools appear in the toolbar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Quick Actions</div>
                <ToggleGroup
                  type="multiple"
                  defaultValue={["save", "undo"]}
                  variant="ghost"
                  size="sm"
                >
                  <ToggleGroupItem value="save" aria-label="Save button">
                    <Icon name="send" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="undo" aria-label="Undo button">
                    <Icon name="rotate-ccw" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="redo" aria-label="Redo button">
                    <Icon name="rotate-ccw" size="sm" className="scale-x-[-1]" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="share" aria-label="Share button">
                    <Icon name="share" size="sm" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">View Tools</div>
                <ToggleGroup
                  type="multiple"
                  defaultValue={["zoom"]}
                  variant="ghost"
                  size="sm"
                >
                  <ToggleGroupItem value="zoom" aria-label="Zoom controls">
                    <Icon name="search" size="sm" />
                    <span>Zoom</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="ruler" aria-label="Ruler">
                    <Icon name="navigation" size="sm" />
                    <span>Ruler</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="grid" aria-label="Grid">
                    <Icon name="grid-2x2-plus" size="sm" />
                    <span>Grid</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)]">
                  Toolbar configuration will be saved to your preferences.
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
          {/* Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Filter Controls</CardTitle>
              <CardDescription>
                Use toggles to control data filtering and display options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Show Active Only</span>
                  <Toggle variant="ghost" defaultPressed>
                    <Icon name="circle-check-big" size="sm" />
                  </Toggle>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Include Archived</span>
                  <Toggle variant="ghost">
                    <Icon name="package" size="sm" />
                  </Toggle>
                </div>

                <Separator />

                <div>
                  <div className="text-body-medium-sm mb-[var(--space-sm)]">Status Filters</div>
                  <ToggleGroup type="multiple" variant="ghost" size="sm">
                    <ToggleGroupItem value="pending" aria-label="Show pending">
                      <Icon name="circle" size="sm" />
                      <span>Pending</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="complete" aria-label="Show complete">
                      <Icon name="circle-check-big" size="sm" />
                      <span>Complete</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="error" aria-label="Show errors">
                      <Icon name="triangle-alert" size="sm" />
                      <span>Error</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Dashboard Widgets</CardTitle>
              <CardDescription>
                Toggle visibility of different dashboard sections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="text-body-medium-sm">Visible Sections</div>
                <ToggleGroup
                  type="multiple"
                  defaultValue={["analytics", "recent"]}
                  variant="ghost"
                  size="sm"
                >
                  <ToggleGroupItem value="analytics" aria-label="Analytics widget">
                    <Icon name="layout-dashboard" size="sm" />
                    <span>Analytics</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="recent" aria-label="Recent activity">
                    <Icon name="circle" size="sm" />
                    <span>Recent</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="tasks" aria-label="Task list">
                    <Icon name="list-filter" size="sm" />
                    <span>Tasks</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="calendar" aria-label="Calendar">
                    <Icon name="calendar-days" size="sm" />
                    <span>Calendar</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                <div className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
                  Widget Layout:
                </div>
                <div className="grid grid-cols-2 gap-[var(--space-sm)]">
                  <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border text-caption-sm text-center">
                    Analytics
                  </div>
                  <div className="p-[var(--space-sm)] bg-[var(--color-surface-primary)] rounded border text-caption-sm text-center">
                    Recent Activity
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
                <li>• Use clear icons and labels for toggle purposes</li>
                <li>• Group related toggles logically with Toggle Groups</li>
                <li>• Provide immediate visual feedback on state changes</li>
                <li>• Use single selection for mutually exclusive options</li>
                <li>• Use multiple selection for independent features</li>
                <li>• Include accessible ARIA labels for screen readers</li>
                <li>• Consider the consequences of toggle state changes</li>
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
                <li>• Don't use toggles for actions that require immediate effect</li>
                <li>• Avoid unclear or ambiguous toggle labels</li>
                <li>• Don't use toggles for navigation or primary actions</li>
                <li>• Avoid making critical settings easy to accidentally change</li>
                <li>• Don't group unrelated toggles together</li>
                <li>• Avoid too many options in a single toggle group</li>
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
                <strong>Keyboard Navigation:</strong> Toggles can be activated with Space or Enter keys. Arrow keys navigate between toggle group items.
              </p>
              <p>
                <strong>Screen Readers:</strong> Toggles include proper ARIA attributes and announce their pressed state clearly to assistive technologies.
              </p>
              <p>
                <strong>Visual Indicators:</strong> Use sufficient color contrast and don't rely solely on color to indicate pressed states.
              </p>
              <p>
                <strong>Labels and Context:</strong> Always provide clear ARIA labels and consider the semantic meaning of toggle states.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}