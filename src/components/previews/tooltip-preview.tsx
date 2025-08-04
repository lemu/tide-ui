import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TextLink } from "../ui/text-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Kbd } from "../ui/kbd";

export function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="space-y-[var(--space-xlg)]">
        {/* Basic Tooltips */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Basic Tooltips
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            {/* Simple Tooltips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  Simple Tooltips
                </CardTitle>
                <CardDescription>
                  Basic tooltip examples with buttons and icons.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-[var(--space-md)]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button>Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This action cannot be undone</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="md" icon="info" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get more information</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            {/* Icon Tooltips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Icon Tooltips</CardTitle>
                <CardDescription>
                  Tooltips for icon-only buttons and interactive elements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-[var(--space-md)]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" icon="settings" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" icon="share" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this item</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" icon="bookmark" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to bookmarks</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" icon="trash-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Move to trash</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Tooltips */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Advanced Tooltips
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
            {/* Positioning */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Positioning</CardTitle>
                <CardDescription>
                  Tooltips with different positioning options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid min-h-[200px] grid-cols-2 place-items-center gap-[var(--space-lg)]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="sm">
                        Top
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Tooltip on top</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="sm">
                        Right
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Tooltip on right</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="sm">
                        Bottom
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Tooltip on bottom</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="sm">
                        Left
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Tooltip on left</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            {/* Rich Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Rich Content</CardTitle>
                <CardDescription>
                  Tooltips with more detailed content and formatting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default">Feature Info</Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-72">
                      <div className="space-y-[var(--space-xsm)]">
                        <p className="text-body-strong-sm">Enhanced Feature</p>
                        <p className="text-body-sm">
                          This feature provides advanced functionality with
                          multiple options and configurations.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default">Keyboard Shortcut</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center gap-[var(--space-sm)]">
                        <span className="block">Save</span>
                        <Kbd variant="dark" size="sm">
                          ⌘S
                        </Kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Elements */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Interactive Elements
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            {/* Links with Tooltips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">
                  Links with Tooltips
                </CardTitle>
                <CardDescription>
                  Text links and interactive elements with helpful tooltips.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <p className="text-body-md">
                    For more information, please{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TextLink href="#" icon="link">
                          visit our documentation
                        </TextLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Opens in new tab</p>
                      </TooltipContent>
                    </Tooltip>{" "}
                    or{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TextLink href="#" icon="circle-help">
                          contact support
                        </TextLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Get help from our team</p>
                      </TooltipContent>
                    </Tooltip>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Form Elements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Form Elements</CardTitle>
                <CardDescription>
                  Tooltips for form fields and input elements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-[var(--space-md)]">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <label className="text-body-medium-md">Password</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Icon name="circle-help" size="sm" color="secondary" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          Password must be at least 8 characters long and
                          include uppercase, lowercase, numbers, and symbols.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <label className="text-body-medium-md">API Key</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Icon name="info" size="sm" color="secondary" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          You can find your API key in the developer settings
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Real-world Usage
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Dashboard Actions
              </CardTitle>
              <CardDescription>
                Common tooltip patterns in application interfaces.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                {/* Toolbar */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-md)]">
                    Toolbar
                  </h4>
                  <div className="flex items-center space-x-[var(--space-sm)] rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-md)]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" icon="plus" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create new item</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" icon="search" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Search items</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" icon="list-filter" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Filter results</p>
                      </TooltipContent>
                    </Tooltip>

                    <div className="h-[var(--size-md)] w-px bg-[var(--color-border-primary-subtle)]" />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon="layout-dashboard"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dashboard view</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" icon="table-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Table view</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Status Indicators */}
                <div>
                  <h4 className="text-body-medium-md mb-[var(--space-md)]">
                    Status Indicators
                  </h4>
                  <div className="flex items-center space-x-[var(--space-lg)]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex cursor-help items-center space-x-[var(--space-sm)]">
                          <div className="h-[var(--size-sm)] w-[var(--size-sm)] rounded-full bg-[var(--color-background-success)]"></div>
                          <span className="text-body-sm">Online</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>All systems operational</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex cursor-help items-center space-x-[var(--space-sm)]">
                          <div className="h-[var(--size-sm)] w-[var(--size-sm)] rounded-full bg-[var(--color-background-warning)]"></div>
                          <span className="text-body-sm">Warning</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Some services experiencing issues</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex cursor-help items-center space-x-[var(--space-sm)]">
                          <div className="h-[var(--size-sm)] w-[var(--size-sm)] rounded-full bg-[var(--color-background-error)]"></div>
                          <span className="text-body-sm">Offline</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>System maintenance in progress</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  <li>• Concise, helpful information</li>
                  <li>• Explain abbreviations and acronyms</li>
                  <li>• Provide context for icon-only buttons</li>
                  <li>• Include keyboard shortcuts</li>
                  <li>• Use for potentially destructive actions</li>
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
                  <li>• Repeating visible label text</li>
                  <li>• Essential information only in tooltips</li>
                  <li>• Overly long or complex content</li>
                  <li>• Tooltips on non-interactive elements</li>
                  <li>• Blocking important interface elements</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
