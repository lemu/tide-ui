import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "../components/ui/button-group";
import { Button } from "../components/ui/button";
import { Icon } from "../components/ui/icon";

const meta: Meta<typeof ButtonGroup> = {
  title: "NPM/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size applied to all buttons in the group",
    },
    variant: {
      control: "select",
      options: ["default", "secondary", "ghost", "link"],
      description: "Variant applied to all buttons in the group",
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
        <p className="text-body-sm font-medium mb-2">Secondary</p>
        <ButtonGroup variant="secondary">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Ghost</p>
        <ButtonGroup variant="ghost">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
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
        <ButtonGroup variant="secondary">
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
        <ButtonGroup variant="secondary">
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
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </ButtonGroup>
      </div>

      <div>
        <p className="text-body-sm font-medium mb-2">Previous/Next</p>
        <ButtonGroup variant="secondary">
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
        <ButtonGroup variant="secondary" size="sm">
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
              <ButtonGroup variant="secondary" size="sm">
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
            <ButtonGroup variant="secondary">
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="default">Save Draft</Button>
          <Button variant="default">Publish</Button>
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
        <ButtonGroup variant="default" size="sm">
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
        <ButtonGroup variant="default" size="sm">
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