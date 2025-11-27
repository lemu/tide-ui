import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "../components/fundamental/button-group";
import { Button } from "../components/fundamental/button";
import { Icon } from "../components/fundamental/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/fundamental/dropdown-menu";

const meta: Meta<typeof ButtonGroup> = {
  title: "NPM • Fundamental/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the button group",
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button group
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Default</p>
        <ButtonGroup>
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Primary</p>
        <ButtonGroup>
          <Button variant="primary">Option 1</Button>
          <Button variant="primary">Option 2</Button>
          <Button variant="primary">Option 3</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Ghost</p>
        <ButtonGroup>
          <Button variant="ghost">Option 1</Button>
          <Button variant="ghost">Option 2</Button>
          <Button variant="ghost">Option 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Small</p>
        <ButtonGroup size="sm">
          <Button>Small</Button>
          <Button>Button</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Medium (Default)</p>
        <ButtonGroup size="md">
          <Button>Medium</Button>
          <Button>Button</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Large</p>
        <ButtonGroup size="lg">
          <Button>Large</Button>
          <Button>Button</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">View Options</p>
        <ButtonGroup>
          <Button>
            <Icon name="list" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="grid-2x2" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="layout-grid" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Text Formatting</p>
        <ButtonGroup variant="ghost" size="sm">
          <Button>
            <Icon name="bold" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="italic" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="underline" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="strikethrough" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Alignment</p>
        <ButtonGroup>
          <Button>
            <Icon name="align-left" className="w-4 h-4 mr-2" />
            Left
          </Button>
          <Button>
            <Icon name="align-center" className="w-4 h-4 mr-2" />
            Center
          </Button>
          <Button>
            <Icon name="align-right" className="w-4 h-4 mr-2" />
            Right
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Two buttons
export const TwoButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Yes/No Choice</p>
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button>Confirm</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Previous/Next</p>
        <ButtonGroup>
          <Button>
            <Icon name="chevron-left" className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button>
            Next
            <Icon name="chevron-right" className="w-4 h-4 ml-1" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Many buttons
export const ManyButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Number Picker</p>
        <ButtonGroup size="sm">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>7</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Tabs Navigation</p>
        <ButtonGroup variant="ghost">
          <Button>Overview</Button>
          <Button>Analytics</Button>
          <Button>Reports</Button>
          <Button>Settings</Button>
          <Button>Users</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Single button (edge case)
export const SingleButton: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Single Button in Group</p>
        <ButtonGroup>
          <Button>Only Button</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Should look the same as regular button:</p>
        <Button>Regular Button</Button>
      </div>
    </div>
  ),
};

// Filter/Segmented Control Pattern
export const FilterExample: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-heading-sm font-medium mb-4">Filter Controls</h3>
          <div className="space-y-4">
            <div>
              <p className="text-body-sm font-medium mb-2">Status Filter</p>
              <ButtonGroup size="sm">
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Pending</Button>
                <Button>Inactive</Button>
              </ButtonGroup>
            </div>

            <div>
              <p className="text-body-sm font-medium mb-2">Time Range</p>
              <ButtonGroup variant="ghost">
                <Button>Today</Button>
                <Button>This Week</Button>
                <Button>This Month</Button>
                <Button>This Year</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm font-medium mb-4">Toolbar Actions</h3>
          <div className="flex gap-4">
            <ButtonGroup>
              <Button>
                <Icon name="download" className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button>
                <Icon name="printer" className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button>
                <Icon name="share" className="w-4 h-4 mr-2" />
                Share
              </Button>
            </ButtonGroup>

            <ButtonGroup variant="ghost" size="sm">
              <Button>
                <Icon name="copy" className="w-4 h-4" />
              </Button>
              <Button>
                <Icon name="edit" className="w-4 h-4" />
              </Button>
              <Button>
                <Icon name="trash-2" className="w-4 h-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  },
};

// Mixed button types (should work with individual button props)
export const MixedButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Individual Button Overrides</p>
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button>Save Draft</Button>
          <Button>Publish</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Mixed Sizes (not recommended)</p>
        <ButtonGroup>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Disabled buttons test
export const WithDisabledButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Some Disabled Buttons</p>
        <ButtonGroup size="sm">
          <Button disabled>
            <Icon name="arrow-left" className="w-4 h-4" />
          </Button>
          <Button>
            <Icon name="arrow-right" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Pagination-like (matching Pagination component)</p>
        <ButtonGroup size="sm">
          <Button disabled>
            <Icon name="arrow-left" className="w-4 h-4" />
          </Button>
          <Button disabled>
            <Icon name="arrow-right" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// NEW FEATURES - Vertical Orientation
export const VerticalOrientation: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Vertical Button Group</p>
        <ButtonGroup orientation="vertical">
          <Button>
            <Icon name="home" className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button>
            <Icon name="settings" className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Icon name="user" className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button>
            <Icon name="log-out" className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Vertical Icon-Only Group</p>
        <ButtonGroup orientation="vertical">
          <Button size="icon-md">
            <Icon name="bold" className="w-4 h-4" />
          </Button>
          <Button size="icon-md">
            <Icon name="italic" className="w-4 h-4" />
          </Button>
          <Button size="icon-md">
            <Icon name="underline" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Vertical Ghost Buttons</p>
        <ButtonGroup orientation="vertical">
          <Button variant="ghost">Edit</Button>
          <Button variant="ghost">Duplicate</Button>
          <Button variant="ghost">Archive</Button>
          <Button variant="ghost" className="text-[var(--color-text-error-bold)]">
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// NEW FEATURES - With Separator (Split Button Pattern)
export const WithSeparator: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Split Button - Primary Action</p>
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="primary" size="icon-md">
                <Icon name="chevron-down" className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save and Continue</DropdownMenuItem>
              <DropdownMenuItem>Save as Draft</DropdownMenuItem>
              <DropdownMenuItem>Save as Template</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Split Button - Default</p>
        <ButtonGroup>
          <Button>Export</Button>
          <ButtonGroupSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-md">
                <Icon name="chevron-down" className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as JSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Action Group with Separators</p>
        <ButtonGroup>
          <Button size="sm">
            <Icon name="copy" className="w-4 h-4" />
          </Button>
          <ButtonGroupSeparator />
          <Button size="sm">
            <Icon name="edit" className="w-4 h-4" />
          </Button>
          <ButtonGroupSeparator />
          <Button size="sm">
            <Icon name="trash-2" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// NEW FEATURES - With Text (Labeled Groups)
export const WithText: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Labeled Button Group</p>
        <ButtonGroup>
          <ButtonGroupText>
            <Icon name="layout" />
            View:
          </ButtonGroupText>
          <Button variant="ghost" size="sm">
            <Icon name="list" className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="grid-2x2" className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="layout-grid" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Filter with Label</p>
        <ButtonGroup>
          <ButtonGroupText>Status:</ButtonGroupText>
          <Button size="sm">All</Button>
          <Button size="sm">Active</Button>
          <Button size="sm">Pending</Button>
          <Button size="sm">Closed</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Mixed Text and Actions</p>
        <ButtonGroup>
          <ButtonGroupText>
            <Icon name="sliders" />
            Sort by:
          </ButtonGroupText>
          <Button variant="ghost" size="sm">
            Date
            <Icon name="chevron-down" className="w-4 h-4 ml-1" />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="ghost" size="sm">
            <Icon name="arrow-up" className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// NEW FEATURES - Complex Examples
export const ComplexLayouts: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Toolbar with Multiple Groups</p>
        <div className="flex gap-[var(--space-sm)]">
          <ButtonGroup>
            <Button size="sm">
              <Icon name="bold" className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Icon name="italic" className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Icon name="underline" className="w-4 h-4" />
            </Button>
          </ButtonGroup>

          <ButtonGroupSeparator orientation="vertical" />

          <ButtonGroup>
            <Button size="sm">
              <Icon name="align-left" className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Icon name="align-center" className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Icon name="align-right" className="w-4 h-4" />
            </Button>
          </ButtonGroup>

          <ButtonGroupSeparator orientation="vertical" />

          <ButtonGroup>
            <Button size="sm">
              <Icon name="list" className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <Icon name="list-ordered" className="w-4 h-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Filter Bar with Labels and Actions</p>
        <div className="flex gap-[var(--space-md)] items-center">
          <ButtonGroup>
            <ButtonGroupText>
              <Icon name="filter" />
              Status:
            </ButtonGroupText>
            <Button size="sm">All</Button>
            <Button size="sm">Active</Button>
            <Button size="sm">Inactive</Button>
          </ButtonGroup>

          <ButtonGroup>
            <ButtonGroupText>Priority:</ButtonGroupText>
            <Button size="sm" variant="ghost">High</Button>
            <Button size="sm" variant="ghost">Medium</Button>
            <Button size="sm" variant="ghost">Low</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button size="sm" variant="primary">Apply Filters</Button>
            <ButtonGroupSeparator />
            <Button size="sm" variant="ghost">Reset</Button>
          </ButtonGroup>
        </div>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Vertical Sidebar Navigation</p>
        <ButtonGroup orientation="vertical">
          <ButtonGroupText asChild>
            <div className="justify-start px-[var(--space-md)] py-[var(--space-sm)]">
              <Icon name="folder" />
              <span className="text-body-strong-sm">Projects</span>
            </div>
          </ButtonGroupText>
          <Button variant="ghost" className="justify-start">
            <Icon name="file" className="w-4 h-4 mr-2" />
            Project Alpha
          </Button>
          <Button variant="ghost" className="justify-start">
            <Icon name="file" className="w-4 h-4 mr-2" />
            Project Beta
          </Button>
          <Button variant="ghost" className="justify-start">
            <Icon name="file" className="w-4 h-4 mr-2" />
            Project Gamma
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};