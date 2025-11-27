import type { Meta, StoryObj } from '@storybook/react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from '../components/fundamental/input-group'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Kbd } from '../components/fundamental/kbd'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/fundamental/dropdown-menu'

const meta: Meta<typeof InputGroup> = {
  title: 'NPM • Fundamental/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic input with icon prefix
export const WithIconPrefix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

// Input with icon suffix
export const WithIconSuffix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter URL..." />
      <InputGroupAddon align="inline-end">
        <Icon name="external-link" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with text prefix
export const WithTextPrefix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

// Input with text suffix
export const WithTextSuffix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter amount" type="number" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with button suffix
export const WithButtonSuffix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Enter your email..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="primary" size="sm">
          Subscribe
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with button prefix
export const WithButtonPrefix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <InputGroupButton variant="default" size="icon-sm">
          <Icon name="upload" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="Upload file..." />
    </InputGroup>
  ),
}

// Input with multiple addons
export const MultipleAddons: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="user" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Username" />
      <InputGroupAddon align="inline-end">
        <Badge variant="success">Verified</Badge>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with dropdown menu
export const WithDropdownMenu: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Search repositories..." />
      <InputGroupAddon align="inline-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton size="icon-sm">
              <Icon name="settings-2" />
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Icon name="filter" className="mr-2" />
              Add Filter
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="sort-asc" className="mr-2" />
              Sort Results
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with keyboard shortcut
export const WithKeyboardShortcut: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <Kbd variant="light" size="sm">
          ⌘K
        </Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Search input with clear button
export const SearchWithClear: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" variant="ghost">
          <Icon name="x" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Password input with show/hide button
export const PasswordWithToggle: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="lock" />
      </InputGroupAddon>
      <InputGroupInput type="password" placeholder="Enter password" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" variant="ghost">
          <Icon name="eye" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Input with loading state
export const WithLoadingState: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Searching..." disabled />
      <InputGroupAddon align="inline-end">
        <Icon name="loader-2" className="animate-spin" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Textarea with block-start addon
export const TextareaBlockStart: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="block-start">
        <Icon name="message-square" />
        <InputGroupText>Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        placeholder="Type your message here..."
        rows={4}
      />
    </InputGroup>
  ),
}

// Textarea with block-end addon
export const TextareaBlockEnd: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupTextarea
        placeholder="Type your message here..."
        rows={4}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText>
          <span className="text-[var(--color-text-tertiary)]">0 / 500 characters</span>
        </InputGroupText>
        <InputGroupButton size="sm" variant="primary">
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Textarea with both block addons
export const TextareaBothAddons: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupAddon align="block-start">
        <Icon name="message-square" />
        <InputGroupText>Compose Message</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        placeholder="Type your message here..."
        rows={5}
      />
      <InputGroupAddon align="block-end">
        <div className="flex items-center justify-between w-full">
          <InputGroupText>
            <Icon name="paperclip" />
            <span className="text-[var(--color-text-tertiary)]">Attach file</span>
          </InputGroupText>
          <div className="flex items-center gap-2">
            <InputGroupText>
              <span className="text-[var(--color-text-tertiary)]">0 / 500</span>
            </InputGroupText>
            <InputGroupButton size="sm" variant="primary">
              Send
            </InputGroupButton>
          </div>
        </div>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Complex example with multiple buttons
export const ComplexExample: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupAddon align="inline-start">
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search products..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" variant="ghost">
          <Icon name="x" />
        </InputGroupButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton size="sm" variant="default">
              Filters
              <Icon name="chevron-down" />
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Products</DropdownMenuItem>
            <DropdownMenuItem>In Stock</DropdownMenuItem>
            <DropdownMenuItem>On Sale</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <InputGroupButton size="sm" variant="primary">
          Search
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// URL input with protocol selector
export const URLInput: Story = {
  render: () => (
    <InputGroup className="w-96">
      <InputGroupAddon align="inline-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroupButton size="sm" variant="default">
              https://
              <Icon name="chevron-down" />
            </InputGroupButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>https://</DropdownMenuItem>
            <DropdownMenuItem>http://</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-sm" variant="ghost">
          <Icon name="copy" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Invalid state
export const InvalidState: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="mail" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Enter email"
        aria-invalid="true"
        type="email"
      />
      <InputGroupAddon align="inline-end">
        <Icon name="alert-circle" color="error" />
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <InputGroup className="w-80" data-disabled="true">
      <InputGroupAddon align="inline-start">
        <Icon name="lock" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Disabled input" disabled />
    </InputGroup>
  ),
}

// File upload
export const FileUpload: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="inline-start">
        <Icon name="paperclip" />
      </InputGroupAddon>
      <InputGroupInput placeholder="No file chosen" readOnly />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="sm" variant="default">
          Browse
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

// Currency input
export const CurrencyInput: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
