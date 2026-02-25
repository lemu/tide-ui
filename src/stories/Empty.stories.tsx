import type { Meta, StoryObj } from '@storybook/react'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '../components/fundamental/empty'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'

const meta = {
  title: 'NPM • fundamental/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

// Basic Examples
export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Icon name="database" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>No data found</EmptyTitle>
        <EmptyDescription>
          There's no data to display yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="primary">
          <Icon name="inbox" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Inbox is empty</EmptyTitle>
        <EmptyDescription>
          When you receive messages, they'll appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Compose Message</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const WithMultipleActions: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="primary">
          <Icon name="upload" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>No files uploaded</EmptyTitle>
        <EmptyDescription>
          Upload your first file to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Upload File</Button>
        <Button variant="ghost">Browse Templates</Button>
      </EmptyContent>
    </Empty>
  ),
}

// Size Variants
export const SizeSmall: Story = {
  render: () => (
    <Empty size="s">
      <EmptyHeader>
        <EmptyMedia size="s">
          <Icon name="search" className="h-6 w-6" />
        </EmptyMedia>
        <EmptyTitle size="s">No results</EmptyTitle>
        <EmptyDescription size="s">
          Try different keywords
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const SizeMedium: Story = {
  render: () => (
    <Empty size="m">
      <EmptyHeader>
        <EmptyMedia size="m">
          <Icon name="search" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle size="m">No results found</EmptyTitle>
        <EmptyDescription size="m">
          Try adjusting your search or filter
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const SizeLarge: Story = {
  render: () => (
    <Empty size="l">
      <EmptyHeader>
        <EmptyMedia size="l">
          <Icon name="search" className="h-10 w-10" />
        </EmptyMedia>
        <EmptyTitle size="l">No results found</EmptyTitle>
        <EmptyDescription size="l">
          Try adjusting your search or filter to find what you're looking for.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

// Color Variants
export const ColorDefault: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="default">
          <Icon name="database" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Default color</EmptyTitle>
        <EmptyDescription>
          Neutral gray background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const ColorPrimary: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="primary">
          <Icon name="inbox" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Primary color</EmptyTitle>
        <EmptyDescription>
          Brand blue background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const ColorSuccess: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="success">
          <Icon name="check-circle" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Success color</EmptyTitle>
        <EmptyDescription>
          Green background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const ColorWarning: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="warning">
          <Icon name="alert-triangle" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Warning color</EmptyTitle>
        <EmptyDescription>
          Yellow/orange background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const ColorError: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="error">
          <Icon name="x-circle" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Error color</EmptyTitle>
        <EmptyDescription>
          Red background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const ColorInfo: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="info">
          <Icon name="info" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Info color</EmptyTitle>
        <EmptyDescription>
          Info blue background
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

// Common Use Cases
export const NoSearchResults: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Icon name="search" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filter to find what you're looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="ghost">Clear Filters</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const EmptyCart: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Icon name="shopping-cart" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Your cart is empty</EmptyTitle>
        <EmptyDescription>
          Add some items to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Browse Products</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const ConnectionError: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="error">
          <Icon name="wifi-off" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Connection error</EmptyTitle>
        <EmptyDescription>
          Unable to load data. Please check your connection and try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Retry</Button>
        <Button variant="ghost">Go Offline</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const PageNotFound: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="warning">
          <Icon name="file-question" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist or has been moved.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Go Home</Button>
        <Button variant="ghost">Contact Support</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const Unauthorized: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="error">
          <Icon name="lock" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Access denied</EmptyTitle>
        <EmptyDescription>
          You don't have permission to view this content.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Request Access</Button>
        <Button variant="ghost">Go Back</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const ComingSoon: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="warning">
          <Icon name="construction" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>Coming soon</EmptyTitle>
        <EmptyDescription>
          This feature is currently under development.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="ghost">Notify Me</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const NoNotifications: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia color="success">
          <Icon name="bell" className="h-8 w-8" />
        </EmptyMedia>
        <EmptyTitle>No new notifications</EmptyTitle>
        <EmptyDescription>
          You're all caught up! Check back later for updates.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

// Advanced: With custom content
export const WithCustomContent: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <img
            src="https://via.placeholder.com/64"
            alt="Placeholder"
            className="h-16 w-16 rounded-full"
          />
        </EmptyMedia>
        <EmptyTitle>Custom media content</EmptyTitle>
        <EmptyDescription>
          You can use EmptyMedia with variant="default" for custom content like images or avatars.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Get Started</Button>
      </EmptyContent>
    </Empty>
  ),
}
