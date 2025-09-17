import type { Meta, StoryObj } from '@storybook/react'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/resizable'

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'NPM/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the panel group',
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic horizontal resizable panels
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <ResizablePanelGroup {...args} className="max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="text-heading-sm">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="text-heading-sm">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

// Vertical resizable panels
export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => (
    <ResizablePanelGroup {...args} className="min-h-[200px] max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

// With handle (grip visual indicator)
export const WithHandle: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <ResizablePanelGroup {...args} className="min-h-[200px] max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

// Three panel layout
export const ThreePanels: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <ResizablePanelGroup {...args} className="min-h-[200px] max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Two</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

// Complex nested layout
export const NestedLayout: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-heading-sm">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="text-heading-sm">Header</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="text-heading-sm">Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

// Dashboard layout example
export const DashboardLayout: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full rounded-lg border border-[var(--color-border-primary-subtle)]"
      >
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col gap-[var(--space-md)] p-[var(--space-lg)]">
            <h3 className="text-heading-sm text-[var(--color-text-primary)]">Navigation</h3>
            <div className="space-y-[var(--space-sm)]">
              <div className="rounded-md bg-[var(--color-background-brand)] p-[var(--space-sm)] text-[var(--color-text-on-action)]">
                <span className="text-body-sm">Dashboard</span>
              </div>
              <div className="rounded-md p-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <span className="text-body-sm">Analytics</span>
              </div>
              <div className="rounded-md p-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <span className="text-body-sm">Settings</span>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} minSize={30}>
              <div className="flex h-full flex-col gap-[var(--space-md)] p-[var(--space-lg)]">
                <h3 className="text-heading-sm text-[var(--color-text-primary)]">Main Content</h3>
                <div className="flex-1 rounded-lg bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)]">
                  <p className="text-body-md text-[var(--color-text-secondary)]">
                    Primary dashboard content goes here. This panel can be resized vertically
                    and horizontally to accommodate different amounts of content.
                  </p>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="flex h-full flex-col gap-[var(--space-md)] p-[var(--space-lg)]">
                <h3 className="text-heading-sm text-[var(--color-text-primary)]">Details Panel</h3>
                <div className="flex-1 rounded-lg bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)]">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Secondary information, logs, or detail views can be displayed here.
                  </p>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

// Code editor layout example
export const CodeEditorLayout: Story = {
  render: () => (
    <div className="h-[400px] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full rounded-lg border border-[var(--color-border-primary-subtle)]"
      >
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col gap-[var(--space-sm)] p-[var(--space-md)]">
            <h4 className="text-heading-xsm text-[var(--color-text-primary)]">File Explorer</h4>
            <div className="space-y-1">
              <div className="text-body-sm text-[var(--color-text-secondary)]">📁 src/</div>
              <div className="pl-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">📄 index.ts</div>
              <div className="pl-[var(--space-md)] text-body-sm text-[var(--color-text-brand)]">📄 App.tsx</div>
              <div className="pl-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">📄 styles.css</div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">📁 components/</div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">📄 package.json</div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={50}>
              <div className="h-full p-[var(--space-md)]">
                <h4 className="text-heading-xsm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Editor</h4>
                <div className="h-full rounded-md bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] font-mono text-body-sm">
                  <div className="text-[var(--color-text-secondary)]">
                    <span className="text-blue-500">import</span> React <span className="text-blue-500">from</span> <span className="text-green-500">'react'</span>
                  </div>
                  <div className="text-[var(--color-text-secondary)]">
                    <span className="text-blue-500">import</span> {'{ ResizablePanel }'} <span className="text-blue-500">from</span> <span className="text-green-500">'./ui/resizable'</span>
                  </div>
                  <br />
                  <div className="text-[var(--color-text-secondary)]">
                    <span className="text-blue-500">export</span> <span className="text-blue-500">function</span> <span className="text-yellow-500">App</span>() {'{'}
                  </div>
                  <div className="pl-[var(--space-md)] text-[var(--color-text-secondary)]">
                    <span className="text-blue-500">return</span> {'<div>Hello World</div>'}
                  </div>
                  <div className="text-[var(--color-text-secondary)]">{'}'}</div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="h-full p-[var(--space-md)]">
                <h4 className="text-heading-xsm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Terminal</h4>
                <div className="h-full rounded-md bg-black p-[var(--space-md)] font-mono text-body-sm text-green-400">
                  <div>$ npm run dev</div>
                  <div className="text-gray-400">Starting development server...</div>
                  <div className="text-blue-400">✓ Local: http://localhost:3000</div>
                  <div className="text-gray-400">ready in 1.2s</div>
                  <div className="animate-pulse">$ █</div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="flex h-full flex-col gap-[var(--space-sm)] p-[var(--space-md)]">
            <h4 className="text-heading-xsm text-[var(--color-text-primary)]">Properties</h4>
            <div className="space-y-[var(--space-sm)]">
              <div>
                <label className="text-body-sm text-[var(--color-text-secondary)]">Width</label>
                <div className="text-body-sm text-[var(--color-text-primary)]">1200px</div>
              </div>
              <div>
                <label className="text-body-sm text-[var(--color-text-secondary)]">Height</label>
                <div className="text-body-sm text-[var(--color-text-primary)]">800px</div>
              </div>
              <div>
                <label className="text-body-sm text-[var(--color-text-secondary)]">Position</label>
                <div className="text-body-sm text-[var(--color-text-primary)]">relative</div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

// Constrained sizing example
export const ConstrainedSizing: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border border-[var(--color-border-primary-subtle)]"
    >
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="text-center">
            <span className="text-heading-sm block">Sidebar</span>
            <span className="text-body-sm text-[var(--color-text-secondary)]">20-40%</span>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="text-center">
            <span className="text-heading-sm block">Main Content</span>
            <span className="text-body-sm text-[var(--color-text-secondary)]">Min 60%</span>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}