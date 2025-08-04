import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Kbd } from "../ui/kbd";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function KbdPreview() {
  return (
    <TooltipProvider>
      <div className="space-y-[var(--space-xlg)]">
        {/* Basic Kbd Examples */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Basic Keyboard Shortcuts
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            {/* Light Variant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Light Variant</CardTitle>
                <CardDescription>
                  For use in light backgrounds, menus, and interfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <div className="space-y-[var(--space-sm)]">
                    <h4 className="text-body-medium-md">Single Keys</h4>
                    <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                      <Kbd variant="light" size="sm">
                        A
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Enter
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Esc
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Space
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Tab
                      </Kbd>
                    </div>
                  </div>

                  <div className="space-y-[var(--space-sm)]">
                    <h4 className="text-body-medium-md">Combinations</h4>
                    <div className="flex flex-wrap items-center gap-[var(--space-md)]">
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="light" size="sm">
                          ⌘
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">+</span>
                        <Kbd variant="light" size="sm">
                          S
                        </Kbd>
                      </div>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="light" size="sm">
                          Ctrl
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">+</span>
                        <Kbd variant="light" size="sm">
                          C
                        </Kbd>
                      </div>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="light" size="sm">
                          Shift
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">+</span>
                        <Kbd variant="light" size="sm">
                          Tab
                        </Kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark Variant */}
            <Card className="border-[var(--grey-alpha-300)] bg-[var(--color-background-inverse)]">
              <CardHeader>
                <CardTitle className="text-heading-sm text-[var(--color-text-inverse)]">
                  Dark Variant
                </CardTitle>
                <CardDescription className="text-[var(--grey-400)]">
                  For use in dark backgrounds, tooltips, and overlays.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <div className="space-y-[var(--space-sm)]">
                    <h4 className="text-body-medium-md text-[var(--color-text-inverse)]">
                      Single Keys
                    </h4>
                    <div className="flex flex-wrap items-center gap-[var(--space-sm)]">
                      <Kbd variant="dark" size="sm">
                        A
                      </Kbd>
                      <Kbd variant="dark" size="sm">
                        Enter
                      </Kbd>
                      <Kbd variant="dark" size="sm">
                        Esc
                      </Kbd>
                      <Kbd variant="dark" size="sm">
                        Space
                      </Kbd>
                      <Kbd variant="dark" size="sm">
                        Tab
                      </Kbd>
                    </div>
                  </div>

                  <div className="space-y-[var(--space-sm)]">
                    <h4 className="text-body-medium-md text-[var(--color-text-inverse)]">
                      Combinations
                    </h4>
                    <div className="flex flex-wrap items-center gap-[var(--space-md)]">
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="dark" size="sm">
                          ⌘
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">
                          +
                        </span>
                        <Kbd variant="dark" size="sm">
                          S
                        </Kbd>
                      </div>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="dark" size="sm">
                          Ctrl
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">
                          +
                        </span>
                        <Kbd variant="dark" size="sm">
                          C
                        </Kbd>
                      </div>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <Kbd variant="dark" size="sm">
                          Shift
                        </Kbd>
                        <span className="text-caption-sm text-[var(--grey-500)]">
                          +
                        </span>
                        <Kbd variant="dark" size="sm">
                          Tab
                        </Kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sizes */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">Sizes</h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Available Sizes</CardTitle>
              <CardDescription>
                Small and medium sizes for different contexts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div className="space-y-[var(--space-sm)]">
                  <h4 className="text-body-medium-md">Small (default)</h4>
                  <div className="flex items-center gap-[var(--space-md)]">
                    <div className="flex items-center gap-[var(--space-xs)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <span className="text-caption-sm text-[var(--grey-500)]">+</span>
                      <Kbd variant="light" size="sm">
                        K
                      </Kbd>
                    </div>
                    <span className="text-body-sm text-[var(--color-text-secondary)]">
                      Command palette
                    </span>
                  </div>
                </div>

                <div className="space-y-[var(--space-sm)]">
                  <h4 className="text-body-medium-md">Medium</h4>
                  <div className="flex items-center gap-[var(--space-md)]">
                    <div className="flex items-center gap-[var(--space-xs)]">
                      <Kbd variant="light" size="md">
                        ⌘
                      </Kbd>
                      <span className="text-caption-sm px-1 text-[var(--grey-500)]">+</span>
                      <Kbd variant="light" size="md">
                        Enter
                      </Kbd>
                    </div>
                    <span className="text-body-sm text-[var(--color-text-secondary)]">
                      Submit form
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Usage Examples
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
            {/* In Tooltips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">In Tooltips</CardTitle>
                <CardDescription>
                  Using dark variant in tooltips for better contrast.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-[var(--space-md)]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm">
                        <Icon name="search" size="sm" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <span>Search</span>
                        <Kbd variant="dark" size="sm">
                          ⌘K
                        </Kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button icon="plus" size="sm"></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <span>Create new</span>
                        <Kbd variant="dark" size="sm">
                          ⌘N
                        </Kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        icon="trash-2"
                        variant="destructive"
                        size="sm"
                      ></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-[var(--space-xs)]">
                        <span>Delete</span>
                        <Kbd variant="dark" size="sm">
                          Del
                        </Kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            {/* In Menus */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">In Menus</CardTitle>
                <CardDescription>
                  Using light variant in menu items and lists.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-sm)]">
                  <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtle)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="plus" size="sm" />
                      <span className="text-body-sm">New File</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        N
                      </Kbd>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtle)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="settings" size="sm" />
                      <span className="text-body-sm">Settings</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        ,
                      </Kbd>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-md p-[var(--space-sm)] transition-colors hover:bg-[var(--color-background-neutral-subtle)]">
                    <div className="flex items-center gap-[var(--space-sm)]">
                      <Icon name="circle-help" size="sm" />
                      <span className="text-body-sm">Help</span>
                    </div>
                    <div className="flex items-center gap-[var(--space-xs)]">
                      <Kbd variant="light" size="sm">
                        ?
                      </Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Shortcuts */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Common Shortcuts
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  Application Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Save</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        S
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Copy</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        C
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Paste</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        V
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Undo</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Z
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Redo</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        ⇧
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        Z
                      </Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  Navigation Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Command Palette</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        K
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Quick Open</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        P
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Go Back</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        ←
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Go Forward</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        →
                      </Kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Close Tab</span>
                    <div className="flex items-center gap-[var(--space-xsm)]">
                      <Kbd variant="light" size="sm">
                        ⌘
                      </Kbd>
                      <Kbd variant="light" size="sm">
                        W
                      </Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Best Practices
          </h2>

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
                  <li>• Use light variant for menus and light backgrounds</li>
                  <li>• Use dark variant for tooltips and dark overlays</li>
                  <li>• Keep shortcuts concise and memorable</li>
                  <li>• Show common shortcuts in tooltips</li>
                  <li>• Use platform-appropriate modifier keys (⌘ vs Ctrl)</li>
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
                  <li>• Using wrong variant for background context</li>
                  <li>• Overly complex key combinations</li>
                  <li>• Showing shortcuts for rarely used actions</li>
                  <li>• Inconsistent spacing between keys</li>
                  <li>• Using full words instead of symbols (Command vs ⌘)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
