import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Editable, EditablePreview, EditableInput } from '../components/fundamental/editable'

const meta: Meta<typeof Editable> = {
  title: 'NPM • Fundamental/Editable',
  component: Editable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled value',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled usage',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether editing is disabled',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus when editing starts',
    },
    selectAllOnFocus: {
      control: 'boolean',
      description: 'Select all text when focused',
    },
  },
} satisfies Meta<typeof Editable>

export default meta
type Story = StoryObj<typeof meta>

// Basic editable text
export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('Click to edit this text')

    return (
      <div className="w-96 p-4">
        <Editable
          value={value}
          onSubmit={setValue}
          placeholder="Enter text..."
        >
          <EditablePreview className="cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] p-2 rounded-md transition-colors" />
          <EditableInput className="border-2 border-[var(--color-border-brand-bold)] p-2 rounded-md outline-none" />
        </Editable>
      </div>
    )
  },
}

// Heading with text-heading-lg
export const HeadingLarge: Story = {
  render: () => {
    const [title, setTitle] = React.useState('Large Heading Title')

    const sharedStyles = {
      fontFamily: 'var(--font-family-primary)',
      padding: 'var(--space-sm)',
    }

    return (
      <div className="w-full p-4">
        <Editable
          value={title}
          onSubmit={setTitle}
          placeholder="Enter heading..."
        >
          <EditablePreview
            className="text-heading-lg cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] rounded-md transition-colors"
            style={{
              ...sharedStyles,
              minHeight: '3rem',
              display: 'flex',
              alignItems: 'center',
            }}
          />
          <EditableInput
            className="text-heading-lg bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--color-border-brand-bold)] rounded-md"
            style={sharedStyles}
            autoResize
            minWidth={200}
            charWidth={20}
          />
        </Editable>
      </div>
    )
  },
}

// Auto-resizing input
export const AutoResizing: Story = {
  render: () => {
    const [text, setText] = React.useState('This text will auto-resize as you type more content')

    const sharedStyles = {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-family-primary)',
      padding: 'var(--space-sm)',
    }

    return (
      <div className="w-full max-w-2xl p-4">
        <div className="mb-4">
          <h3 className="text-heading-sm mb-2">Auto-resizing Editable</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            The input field grows and shrinks based on content length
          </p>
        </div>
        <Editable
          value={text}
          onSubmit={setText}
          placeholder="Start typing to see auto-resize..."
        >
          <EditablePreview
            className="cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] rounded-md transition-colors"
            style={{
              ...sharedStyles,
              minHeight: '2rem',
              display: 'flex',
              alignItems: 'center',
            }}
          />
          <EditableInput
            className="bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--color-border-brand-bold)] rounded-md"
            style={sharedStyles}
            autoResize
            minWidth={150}
            charWidth={12}
          />
        </Editable>
      </div>
    )
  },
}

// Controlled vs Uncontrolled
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = React.useState('Controlled component')

    return (
      <div className="w-full max-w-2xl p-4 space-y-6">
        <div>
          <h3 className="text-heading-sm mb-2">Controlled Component</h3>
          <div className="border border-[var(--color-border-primary-subtle)] rounded-lg p-4">
            <Editable
              value={controlledValue}
              onSubmit={setControlledValue}
              onChange={(value) => console.log('Typing:', value)}
              placeholder="Type something..."
            >
              <EditablePreview className="text-body-md cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] p-2 rounded-md transition-colors" />
              <EditableInput className="text-body-md border-2 border-[var(--color-border-brand-bold)] p-2 rounded-md outline-none" />
            </Editable>
            <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
              Current value: "{controlledValue}"
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-heading-sm mb-2">Uncontrolled Component</h3>
          <div className="border border-[var(--color-border-primary-subtle)] rounded-lg p-4">
            <Editable
              defaultValue="Uncontrolled component"
              onSubmit={(value) => console.log('Submitted:', value)}
              placeholder="Enter text..."
            >
              <EditablePreview className="text-body-md cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] p-2 rounded-md transition-colors" />
              <EditableInput className="text-body-md border-2 border-[var(--color-border-brand-bold)] p-2 rounded-md outline-none" />
            </Editable>
            <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
              Check console for submitted values
            </p>
          </div>
        </div>
      </div>
    )
  },
}

// Disabled state
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-96 p-4">
        <div className="mb-4">
          <h3 className="text-heading-sm mb-2">Disabled Editable</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            This field cannot be edited
          </p>
        </div>
        <div className="border border-[var(--color-border-primary-subtle)] rounded-lg p-4 bg-[var(--color-surface-secondary)]">
          <Editable
            defaultValue="This field is disabled"
            disabled={true}
            placeholder="Cannot edit..."
          >
            <EditablePreview
              className="text-body-md rounded-md p-2"
              style={{
                color: 'var(--color-text-disabled)',
                cursor: 'not-allowed',
              }}
            />
            <EditableInput
              className="text-body-md p-2 rounded-md"
              style={{
                color: 'var(--color-text-disabled)',
                border: '2px solid var(--color-interaction-border-input-disabled)',
                backgroundColor: 'var(--color-interaction-background-input-disabled)',
              }}
            />
          </Editable>
        </div>
      </div>
    )
  },
}

// Custom styling with Tide UI tokens
export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = React.useState('Custom styled editable')

    return (
      <div className="w-full max-w-xl p-4">
        <div className="mb-4">
          <h3 className="text-heading-sm mb-2">Custom Styled with Tide UI Tokens</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Using semantic design tokens for consistent theming
          </p>
        </div>
        <Editable
          value={value}
          onSubmit={setValue}
          placeholder="Enter text..."
        >
          <EditablePreview
            className="cursor-pointer rounded-lg transition-all duration-200 hover:shadow-sm"
            style={{
              color: 'var(--color-text-brand-bold)',
              fontSize: 'var(--font-size-500)',
              lineHeight: 'var(--font-line-height-600)',
              fontWeight: 'var(--font-weight-semibold)',
              padding: 'var(--space-lg)',
              backgroundColor: 'var(--color-background-blue-subtle-selected)',
              border: `1px solid var(--color-border-brand-bold)`,
            }}
          />
          <EditableInput
            className="rounded-lg outline-none transition-all duration-200"
            style={{
              color: 'var(--color-text-brand-bold)',
              fontSize: 'var(--font-size-500)',
              lineHeight: 'var(--font-line-height-600)',
              fontWeight: 'var(--font-weight-semibold)',
              padding: 'var(--space-lg)',
              backgroundColor: 'var(--color-surface-primary)',
              border: `2px solid var(--color-border-brand-bold)`,
              boxShadow: 'var(--shadow-md)',
            }}
            autoResize
            charWidth={14}
          />
        </Editable>
      </div>
    )
  },
}

// Demonstration of all fixes
export const EnhancedFeatures: Story = {
  render: () => {
    const [title, setTitle] = React.useState('Enhanced Editable Component')
    const [description, setDescription] = React.useState('This component fixes all the issues: no cursor jumping, consistent fonts, auto-resizing')

    const titleStyles = {
      fontFamily: 'var(--font-family-primary)',
      padding: 'var(--space-sm)',
    }

    const descStyles = {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--font-family-primary)',
      padding: 'var(--space-sm)',
    }

    return (
      <div className="w-full max-w-3xl p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-heading-sm mb-2">✅ All Issues Fixed</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[var(--color-border-success-bold)] rounded-lg p-4 bg-[var(--color-background-success-subtle)]">
                <h4 className="text-body-strong-sm text-[var(--color-text-success-bold)] mb-1">No Cursor Jumping</h4>
                <p className="text-caption-sm text-[var(--color-text-success-bold)]">
                  Cursor stays in correct position while typing
                </p>
              </div>
              <div className="border border-[var(--color-border-info-bold)] rounded-lg p-4 bg-[var(--color-background-info-subtle)]">
                <h4 className="text-body-strong-sm text-[var(--color-text-info-bold)] mb-1">Font Consistency</h4>
                <p className="text-caption-sm text-[var(--color-text-info-bold)]">
                  Preview and input have identical styling
                </p>
              </div>
              <div className="border border-[var(--color-border-brand-bold)] rounded-lg p-4 bg-[var(--color-background-blue-subtle-selected)]">
                <h4 className="text-body-strong-sm text-[var(--color-text-brand-bold)] mb-1">Auto-resizing</h4>
                <p className="text-caption-sm text-[var(--color-text-brand-bold)]">
                  Input grows and shrinks with content
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-body-strong-md mb-2">Title Editor (text-heading-lg)</h4>
              <Editable
                value={title}
                onSubmit={setTitle}
                placeholder="Enter title..."
              >
                <EditablePreview
                  className="text-heading-lg cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] rounded-md transition-colors"
                  style={{
                    ...titleStyles,
                    minHeight: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
                <EditableInput
                  className="text-heading-lg bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--color-border-brand-bold)] rounded-md"
                  style={titleStyles}
                  autoResize
                  minWidth={200}
                  charWidth={18}
                />
              </Editable>
            </div>

            <div>
              <h4 className="text-body-strong-md mb-2">Description Editor (Auto-resizing)</h4>
              <Editable
                value={description}
                onSubmit={setDescription}
                placeholder="Enter description..."
              >
                <EditablePreview
                  className="cursor-pointer hover:bg-[var(--color-background-neutral-subtlest-hovered)] rounded-md transition-colors"
                  style={{
                    ...descStyles,
                    minHeight: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
                <EditableInput
                  className="bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--color-border-brand-bold)] rounded-md"
                  style={descStyles}
                  autoResize
                  minWidth={250}
                  charWidth={12}
                />
              </Editable>
            </div>
          </div>

          <div className="bg-[var(--color-surface-secondary)] rounded-lg p-4">
            <h4 className="text-body-strong-md mb-2">How to Use</h4>
            <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-1">
              <li>• <strong>Click</strong> on any editable text to start editing</li>
              <li>• <strong>Enter</strong> to save changes</li>
              <li>• <strong>Escape</strong> to cancel changes</li>
              <li>• <strong>Click outside</strong> to save changes</li>
              <li>• Watch the input field auto-resize as you type</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
}