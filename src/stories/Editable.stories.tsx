import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Editable, EditablePreview, EditableInput, EditableTextarea } from '../components/ui/editable'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Editable> = {
  title: 'Done/Editable',
  component: Editable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    triggerMode: {
      control: { type: 'select' },
      options: ['click', 'dblclick', 'focus'],
      description: 'How to trigger edit mode',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when value is empty',
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    maxLength: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Editable>

export default meta
type Story = StoryObj<typeof meta>

// Basic editable text
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('Click to edit this text')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Basic editable text</Label>
        <Editable 
          value={value} 
          onValueChange={setValue}
          placeholder="Enter some text..."
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          Click the text above to edit it
        </p>
      </div>
    )
  },
}

// Different trigger modes
export const TriggerModes: Story = {
  render: () => {
    const [clickValue, setClickValue] = useState('Click to edit')
    const [dblClickValue, setDblClickValue] = useState('Double-click to edit')
    const [focusValue, setFocusValue] = useState('Focus to edit')
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label>Click trigger (default)</Label>
          <Editable 
            value={clickValue} 
            onValueChange={setClickValue}
            triggerMode="click"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        
        <div>
          <Label>Double-click trigger</Label>
          <Editable 
            value={dblClickValue} 
            onValueChange={setDblClickValue}
            triggerMode="dblclick"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        
        <div>
          <Label>Focus trigger</Label>
          <Editable 
            value={focusValue} 
            onValueChange={setFocusValue}
            triggerMode="focus"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
      </div>
    )
  },
}

// With textarea
export const WithTextarea: Story = {
  render: () => {
    const [value, setValue] = useState('This is a longer piece of text that can be edited in a textarea. Click to edit and see how it expands automatically.')
    
    return (
      <div className="w-96 space-y-4">
        <Label>Editable textarea</Label>
        <Editable 
          value={value} 
          onValueChange={setValue}
          placeholder="Enter a longer description..."
        >
          <EditablePreview />
          <EditableTextarea />
        </Editable>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          Press Cmd+Enter to save, Escape to cancel
        </p>
      </div>
    )
  },
}

// Validation states
export const ValidationStates: Story = {
  render: () => {
    const [validValue, setValidValue] = useState('Valid input')
    const [invalidValue, setInvalidValue] = useState('This text is too long and exceeds the limit')
    const [requiredValue, setRequiredValue] = useState('')
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label>Valid state</Label>
          <Editable 
            value={validValue} 
            onValueChange={setValidValue}
            maxLength={50}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </div>
        
        <div>
          <Label>Invalid state (too long)</Label>
          <Editable 
            value={invalidValue} 
            onValueChange={setInvalidValue}
            invalid={invalidValue.length > 20}
            maxLength={20}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <p className="text-caption-sm text-[var(--color-text-error)]">
            Text must be 20 characters or less
          </p>
        </div>
        
        <div>
          <Label>Required field</Label>
          <Editable 
            value={requiredValue} 
            onValueChange={setRequiredValue}
            placeholder="This field is required"
            required
            invalid={!requiredValue}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          {!requiredValue && (
            <p className="text-caption-sm text-[var(--color-text-error)]">
              This field is required
            </p>
          )}
        </div>
      </div>
    )
  },
}

// Profile editing
export const ProfileEditing: Story = {
  render: () => {
    const [profile, setProfile] = useState({
      name: 'John Doe',
      title: 'Senior Frontend Developer',
      bio: 'Passionate about creating beautiful and functional user interfaces. 5+ years of experience with React, TypeScript, and modern web technologies.',
      email: 'john.doe@example.com',
      location: 'San Francisco, CA'
    })
    
    const updateProfile = (field: string, value: string) => {
      setProfile(prev => ({ ...prev, [field]: value }))
    }
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[var(--color-background-brand)] rounded-full flex items-center justify-center">
                <Icon name="user" size="lg" className="text-[var(--color-text-on-action)]" />
              </div>
              <div className="flex-1 space-y-2">
                <Editable 
                  value={profile.name} 
                  onValueChange={(value) => updateProfile('name', value)}
                  placeholder="Enter your name"
                >
                  <EditablePreview className="text-heading-md font-semibold" />
                  <EditableInput />
                </Editable>
                <Editable 
                  value={profile.title} 
                  onValueChange={(value) => updateProfile('title', value)}
                  placeholder="Enter your job title"
                >
                  <EditablePreview className="text-body-md text-[var(--color-text-secondary)]" />
                  <EditableInput />
                </Editable>
              </div>
            </div>
            
            <div>
              <Label className="text-body-sm font-medium mb-2 block">About</Label>
              <Editable 
                value={profile.bio} 
                onValueChange={(value) => updateProfile('bio', value)}
                placeholder="Tell us about yourself..."
              >
                <EditablePreview />
                <EditableTextarea rows={4} />
              </Editable>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-body-sm font-medium mb-2 block">Email</Label>
                <Editable 
                  value={profile.email} 
                  onValueChange={(value) => updateProfile('email', value)}
                  placeholder="Enter your email"
                >
                  <EditablePreview />
                  <EditableInput type="email" />
                </Editable>
              </div>
              
              <div>
                <Label className="text-body-sm font-medium mb-2 block">Location</Label>
                <Editable 
                  value={profile.location} 
                  onValueChange={(value) => updateProfile('location', value)}
                  placeholder="Enter your location"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </div>
            </div>
            
            <Button className="w-full">Save Profile</Button>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Task list
export const TaskList: Story = {
  render: () => {
    const [tasks, setTasks] = useState([
      { id: 1, title: 'Design new homepage', completed: false },
      { id: 2, title: 'Implement user authentication', completed: true },
      { id: 3, title: 'Write API documentation', completed: false },
      { id: 4, title: 'Set up CI/CD pipeline', completed: false },
      { id: 5, title: 'Create mobile app designs', completed: true },
    ])
    
    const updateTask = (id: number, title: string) => {
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, title } : task
      ))
    }
    
    const toggleTask = (id: number) => {
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ))
    }
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-[var(--color-background-neutral-subtle-hovered)] rounded">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <Editable 
                      value={task.title} 
                      onValueChange={(value) => updateTask(task.id, value)}
                      placeholder="Enter task title"
                    >
                      <EditablePreview 
                        className={task.completed ? 'line-through text-[var(--color-text-secondary)]' : ''} 
                      />
                      <EditableInput />
                    </Editable>
                  </div>
                  <Badge variant={task.completed ? 'default' : 'secondary'} className="text-xs">
                    {task.completed ? 'Done' : 'Todo'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Settings configuration
export const SettingsConfiguration: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      siteName: 'My Awesome Website',
      tagline: 'Building the future, one line of code at a time',
      description: 'A comprehensive platform for modern web development with cutting-edge tools and technologies.',
      maxUsers: '100',
      apiKey: 'sk-1234567890abcdef',
      webhookUrl: 'https://api.example.com/webhook'
    })
    
    const updateSetting = (key: string, value: string) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    }
    
    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Site Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-body-sm font-medium mb-2 block">Site Name</Label>
                <Editable 
                  value={settings.siteName} 
                  onValueChange={(value) => updateSetting('siteName', value)}
                  placeholder="Enter site name"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </div>
              
              <div>
                <Label className="text-body-sm font-medium mb-2 block">Tagline</Label>
                <Editable 
                  value={settings.tagline} 
                  onValueChange={(value) => updateSetting('tagline', value)}
                  placeholder="Enter tagline"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </div>
            </div>
            
            <div>
              <Label className="text-body-sm font-medium mb-2 block">Description</Label>
              <Editable 
                value={settings.description} 
                onValueChange={(value) => updateSetting('description', value)}
                placeholder="Enter site description"
              >
                <EditablePreview />
                <EditableTextarea rows={3} />
              </Editable>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-body-sm font-medium mb-2 block">Max Users</Label>
                <Editable 
                  value={settings.maxUsers} 
                  onValueChange={(value) => updateSetting('maxUsers', value)}
                  placeholder="Enter max users"
                >
                  <EditablePreview />
                  <EditableInput type="number" />
                </Editable>
              </div>
              
              <div>
                <Label className="text-body-sm font-medium mb-2 block">API Key</Label>
                <Editable 
                  value={settings.apiKey} 
                  onValueChange={(value) => updateSetting('apiKey', value)}
                  placeholder="Enter API key"
                >
                  <EditablePreview className="font-mono text-caption-sm" />
                  <EditableInput className="font-mono" />
                </Editable>
              </div>
            </div>
            
            <div>
              <Label className="text-body-sm font-medium mb-2 block">Webhook URL</Label>
              <Editable 
                value={settings.webhookUrl} 
                onValueChange={(value) => updateSetting('webhookUrl', value)}
                placeholder="Enter webhook URL"
              >
                <EditablePreview className="text-caption-sm text-[var(--color-text-action)]" />
                <EditableInput type="url" />
              </Editable>
            </div>
            
            <div className="flex gap-2">
              <Button>Save Configuration</Button>
              <Button variant="ghost">Reset to Defaults</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [value, setValue] = useState('This text cannot be edited')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Disabled editable text</Label>
        <Editable 
          value={value} 
          onValueChange={setValue}
          disabled={true}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          This editable component is disabled and cannot be interacted with.
        </p>
      </div>
    )
  },
}

// Custom preview content
export const CustomPreview: Story = {
  render: () => {
    const [value, setValue] = useState('Custom formatted content')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Custom preview formatting</Label>
        <Editable 
          value={value} 
          onValueChange={setValue}
          placeholder="Enter text..."
        >
          <EditablePreview>
            <div className="flex items-center gap-2">
              <Icon name="edit" size="sm" />
              <span className="font-semibold text-[var(--color-text-brand)]">
                {value || 'Click to add content'}
              </span>
            </div>
          </EditablePreview>
          <EditableInput />
        </Editable>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          The preview can contain custom JSX content
        </p>
      </div>
    )
  },
}

// Font size testing showcase
export const FontSizeShowcase: Story = {
  render: () => {
    const [values, setValues] = useState({
      heading2xlg: 'Extra Large Heading',
      headingXlg: 'Large Heading', 
      headingLg: 'Medium Large Heading',
      headingMd: 'Medium Heading',
      headingSm: 'Small Heading',
      bodyLg: 'Large body text',
      bodyMd: 'Medium body text', 
      bodySm: 'Small body text',
      captionSm: 'Caption text',
      captionXsm: 'Extra small caption'
    })
    
    const updateValue = (key: string, value: string) => {
      setValues(prev => ({ ...prev, [key]: value }))
    }
    
    const fontSizeExamples = [
      { key: 'heading2xlg', label: 'text-heading-2xlg', className: 'text-heading-2xlg', value: values.heading2xlg },
      { key: 'headingXlg', label: 'text-heading-xlg', className: 'text-heading-xlg', value: values.headingXlg },
      { key: 'headingLg', label: 'text-heading-lg', className: 'text-heading-lg', value: values.headingLg },
      { key: 'headingMd', label: 'text-heading-md', className: 'text-heading-md', value: values.headingMd },
      { key: 'headingSm', label: 'text-heading-sm', className: 'text-heading-sm', value: values.headingSm },
      { key: 'bodyLg', label: 'text-body-lg', className: 'text-body-lg', value: values.bodyLg },
      { key: 'bodyMd', label: 'text-body-md', className: 'text-body-md', value: values.bodyMd },
      { key: 'bodySm', label: 'text-body-sm', className: 'text-body-sm', value: values.bodySm },
      { key: 'captionSm', label: 'text-caption-sm', className: 'text-caption-sm', value: values.captionSm },
      { key: 'captionXsm', label: 'text-caption-xsm', className: 'text-caption-xsm', value: values.captionXsm }
    ]
    
    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Font Size Matching Test</CardTitle>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Click each text below to edit it. The input should maintain the same font size as the preview.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {fontSizeExamples.map((example) => (
              <div key={example.key} className="space-y-2">
                <Label className="text-body-sm font-medium text-[var(--color-text-tertiary)]">
                  {example.label}
                </Label>
                <Editable 
                  value={example.value} 
                  onValueChange={(value) => updateValue(example.key, value)}
                  placeholder={`Enter ${example.label} text...`}
                >
                  <EditablePreview className={example.className} />
                  <EditableInput />
                </Editable>
              </div>
            ))}
            
            <div className="pt-4 border-t border-[var(--color-border-primary-subtle)]">
              <Label className="text-body-sm font-medium mb-2 block text-[var(--color-text-tertiary)]">
                text-body-md with textarea
              </Label>
              <Editable 
                value="This is a longer text that demonstrates font size matching with textarea editing. Click to edit and see how the font size remains consistent."
                onValueChange={() => {}}
                placeholder="Enter longer text..."
              >
                <EditablePreview className="text-body-md" />
                <EditableTextarea rows={3} />
              </Editable>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}