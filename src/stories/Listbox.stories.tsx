import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Listbox, ListboxItem, ListboxGroup, ListboxGroupLabel } from '../components/ui/listbox'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Listbox> = {
  title: 'Components/Listbox',
  component: Listbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'grid'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

// Basic single selection
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('')
    
    return (
      <div className="w-64 space-y-4">
        <Label>Choose your favorite fruit</Label>
        <Listbox value={selected} onValueChange={setSelected}>
          <ListboxItem value="apple">🍎 Apple</ListboxItem>
          <ListboxItem value="banana">🍌 Banana</ListboxItem>
          <ListboxItem value="orange">🍊 Orange</ListboxItem>
          <ListboxItem value="grape">🍇 Grape</ListboxItem>
          <ListboxItem value="strawberry">🍓 Strawberry</ListboxItem>
        </Listbox>
        {selected && (
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Selected: {selected}
          </p>
        )}
      </div>
    )
  },
}

// Multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['react', 'typescript'])
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose your tech stack ({selected.length} selected)</Label>
        <Listbox value={selected} onValueChange={setSelected} multiple>
          <ListboxItem value="react">React</ListboxItem>
          <ListboxItem value="vue">Vue.js</ListboxItem>
          <ListboxItem value="angular">Angular</ListboxItem>
          <ListboxItem value="svelte">Svelte</ListboxItem>
          <ListboxItem value="typescript">TypeScript</ListboxItem>
          <ListboxItem value="javascript">JavaScript</ListboxItem>
          <ListboxItem value="nodejs">Node.js</ListboxItem>
          <ListboxItem value="python">Python</ListboxItem>
        </Listbox>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  },
}

// Horizontal layout
export const HorizontalLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('medium')
    
    return (
      <div className="w-96 space-y-4">
        <Label>Select size</Label>
        <Listbox value={selected} onValueChange={setSelected} orientation="horizontal">
          <ListboxItem value="small">Small</ListboxItem>
          <ListboxItem value="medium">Medium</ListboxItem>
          <ListboxItem value="large">Large</ListboxItem>
          <ListboxItem value="xlarge">Extra Large</ListboxItem>
        </Listbox>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Selected: {selected}
        </p>
      </div>
    )
  },
}

// Grid layout
export const GridLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    
    const colors = [
      { value: 'red', color: 'bg-red-500', name: 'Red' },
      { value: 'blue', color: 'bg-blue-500', name: 'Blue' },
      { value: 'green', color: 'bg-green-500', name: 'Green' },
      { value: 'yellow', color: 'bg-yellow-500', name: 'Yellow' },
      { value: 'purple', color: 'bg-purple-500', name: 'Purple' },
      { value: 'pink', color: 'bg-pink-500', name: 'Pink' },
      { value: 'indigo', color: 'bg-indigo-500', name: 'Indigo' },
      { value: 'orange', color: 'bg-orange-500', name: 'Orange' },
    ]
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose colors ({selected.length} selected)</Label>
        <Listbox 
          value={selected} 
          onValueChange={setSelected} 
          multiple 
          orientation="grid" 
          gridCols={4}
        >
          {colors.map((color) => (
            <ListboxItem key={color.value} value={color.value}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${color.color}`} />
                <span className="text-xs">{color.name}</span>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selected.map((colorValue) => {
              const color = colors.find(c => c.value === colorValue)
              return (
                <Badge key={colorValue} variant="outline" className="text-xs">
                  {color?.name}
                </Badge>
              )
            })}
          </div>
        )}
      </div>
    )
  },
}

// With groups
export const WithGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    
    return (
      <div className="w-80 space-y-4">
        <Label>Select team members ({selected.length} selected)</Label>
        <Listbox value={selected} onValueChange={setSelected} multiple>
          <ListboxGroup>
            <ListboxGroupLabel>Developers</ListboxGroupLabel>
            <ListboxItem value="alice-dev">
              <div className="flex items-center gap-2">
                <Icon name="code" size="sm" />
                Alice Johnson
              </div>
            </ListboxItem>
            <ListboxItem value="bob-dev">
              <div className="flex items-center gap-2">
                <Icon name="code" size="sm" />
                Bob Smith
              </div>
            </ListboxItem>
            <ListboxItem value="charlie-dev">
              <div className="flex items-center gap-2">
                <Icon name="code" size="sm" />
                Charlie Brown
              </div>
            </ListboxItem>
          </ListboxGroup>
          
          <ListboxGroup>
            <ListboxGroupLabel>Designers</ListboxGroupLabel>
            <ListboxItem value="diana-design">
              <div className="flex items-center gap-2">
                <Icon name="palette" size="sm" />
                Diana Lee
              </div>
            </ListboxItem>
            <ListboxItem value="evan-design">
              <div className="flex items-center gap-2">
                <Icon name="palette" size="sm" />
                Evan Wilson
              </div>
            </ListboxItem>
          </ListboxGroup>
          
          <ListboxGroup>
            <ListboxGroupLabel>Product Managers</ListboxGroupLabel>
            <ListboxItem value="fiona-pm">
              <div className="flex items-center gap-2">
                <Icon name="briefcase" size="sm" />
                Fiona Davis
              </div>
            </ListboxItem>
            <ListboxItem value="george-pm">
              <div className="flex items-center gap-2">
                <Icon name="briefcase" size="sm" />
                George Miller
              </div>
            </ListboxItem>
          </ListboxGroup>
        </Listbox>
        {selected.length > 0 && (
          <div className="space-y-2">
            <p className="text-body-sm font-medium">Selected team members:</p>
            <div className="flex flex-wrap gap-1">
              {selected.map((member) => (
                <Badge key={member} variant="secondary" className="text-xs">
                  {member.split('-')[0]}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string>('')
    const [medium, setMedium] = useState<string>('')
    const [large, setLarge] = useState<string>('')
    
    return (
      <div className="space-y-6">
        <div className="w-64">
          <Label className="mb-2 block">Small size</Label>
          <Listbox value={small} onValueChange={setSmall} size="sm">
            <ListboxItem value="option1">Small Option 1</ListboxItem>
            <ListboxItem value="option2">Small Option 2</ListboxItem>
            <ListboxItem value="option3">Small Option 3</ListboxItem>
          </Listbox>
        </div>
        
        <div className="w-64">
          <Label className="mb-2 block">Medium size (default)</Label>
          <Listbox value={medium} onValueChange={setMedium} size="md">
            <ListboxItem value="option1">Medium Option 1</ListboxItem>
            <ListboxItem value="option2">Medium Option 2</ListboxItem>
            <ListboxItem value="option3">Medium Option 3</ListboxItem>
          </Listbox>
        </div>
        
        <div className="w-64">
          <Label className="mb-2 block">Large size</Label>
          <Listbox value={large} onValueChange={setLarge} size="lg">
            <ListboxItem value="option1">Large Option 1</ListboxItem>
            <ListboxItem value="option2">Large Option 2</ListboxItem>
            <ListboxItem value="option3">Large Option 3</ListboxItem>
          </Listbox>
        </div>
      </div>
    )
  },
}

// Settings panel
export const SettingsPanel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<string[]>(['email', 'push'])
    const [theme, setTheme] = useState<string>('auto')
    const [language, setLanguage] = useState<string>('en')
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-3 block">Notification Preferences</Label>
              <Listbox value={notifications} onValueChange={setNotifications} multiple>
                <ListboxItem value="email">
                  <div className="flex items-center gap-2">
                    <Icon name="mail" size="sm" />
                    Email Notifications
                  </div>
                </ListboxItem>
                <ListboxItem value="push">
                  <div className="flex items-center gap-2">
                    <Icon name="bell" size="sm" />
                    Push Notifications
                  </div>
                </ListboxItem>
                <ListboxItem value="sms">
                  <div className="flex items-center gap-2">
                    <Icon name="message-circle" size="sm" />
                    SMS Notifications
                  </div>
                </ListboxItem>
                <ListboxItem value="desktop">
                  <div className="flex items-center gap-2">
                    <Icon name="monitor" size="sm" />
                    Desktop Notifications
                  </div>
                </ListboxItem>
              </Listbox>
            </div>
            
            <div>
              <Label className="mb-3 block">Theme Preference</Label>
              <Listbox value={theme} onValueChange={setTheme} orientation="horizontal">
                <ListboxItem value="light">
                  <div className="flex flex-col items-center gap-1">
                    <Icon name="sun" size="sm" />
                    <span className="text-xs">Light</span>
                  </div>
                </ListboxItem>
                <ListboxItem value="dark">
                  <div className="flex flex-col items-center gap-1">
                    <Icon name="moon" size="sm" />
                    <span className="text-xs">Dark</span>
                  </div>
                </ListboxItem>
                <ListboxItem value="auto">
                  <div className="flex flex-col items-center gap-1">
                    <Icon name="laptop" size="sm" />
                    <span className="text-xs">Auto</span>
                  </div>
                </ListboxItem>
              </Listbox>
            </div>
            
            <div>
              <Label className="mb-3 block">Language</Label>
              <Listbox value={language} onValueChange={setLanguage}>
                <ListboxItem value="en">🇺🇸 English</ListboxItem>
                <ListboxItem value="es">🇪🇸 Español</ListboxItem>
                <ListboxItem value="fr">🇫🇷 Français</ListboxItem>
                <ListboxItem value="de">🇩🇪 Deutsch</ListboxItem>
                <ListboxItem value="ja">🇯🇵 日本語</ListboxItem>
                <ListboxItem value="zh">🇨🇳 中文</ListboxItem>
              </Listbox>
            </div>
            
            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled items
export const DisabledItems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('')
    
    return (
      <div className="w-64 space-y-4">
        <Label>Choose a subscription plan</Label>
        <Listbox value={selected} onValueChange={setSelected}>
          <ListboxItem value="free">
            <div className="flex items-center justify-between w-full">
              <span>Free Plan</span>
              <Badge variant="outline" className="text-xs">Current</Badge>
            </div>
          </ListboxItem>
          <ListboxItem value="pro">
            <div className="flex items-center justify-between w-full">
              <span>Pro Plan</span>
              <Badge variant="default" className="text-xs">$9/mo</Badge>
            </div>
          </ListboxItem>
          <ListboxItem value="team" disabled>
            <div className="flex items-center justify-between w-full">
              <span>Team Plan</span>
              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
            </div>
          </ListboxItem>
          <ListboxItem value="enterprise" disabled>
            <div className="flex items-center justify-between w-full">
              <span>Enterprise</span>
              <Badge variant="secondary" className="text-xs">Contact Sales</Badge>
            </div>
          </ListboxItem>
        </Listbox>
        {selected && (
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Selected: {selected} plan
          </p>
        )}
      </div>
    )
  },
}

// Complex layout with icons and metadata
export const ComplexLayout: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    
    const features = [
      {
        id: 'analytics',
        name: 'Analytics Dashboard',
        description: 'Advanced analytics and reporting',
        icon: 'bar-chart',
        category: 'Analytics',
        popular: true
      },
      {
        id: 'auth',
        name: 'Authentication',
        description: 'User management and security',
        icon: 'shield',
        category: 'Security',
        popular: false
      },
      {
        id: 'payments',
        name: 'Payment Processing',
        description: 'Secure payment handling',
        icon: 'credit-card',
        category: 'Commerce',
        popular: true
      },
      {
        id: 'notifications',
        name: 'Push Notifications',
        description: 'Real-time user notifications',
        icon: 'bell',
        category: 'Communication',
        popular: false
      },
      {
        id: 'storage',
        name: 'Cloud Storage',
        description: 'File storage and management',
        icon: 'cloud',
        category: 'Infrastructure',
        popular: true
      },
      {
        id: 'search',
        name: 'Full-text Search',
        description: 'Advanced search capabilities',
        icon: 'search',
        category: 'Search',
        popular: false
      }
    ]
    
    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Select features ({selected.length} selected)</Label>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelected([])}
          >
            Clear All
          </Button>
        </div>
        <Listbox value={selected} onValueChange={setSelected} multiple>
          {features.map((feature) => (
            <ListboxItem key={feature.id} value={feature.id}>
              <div className="flex items-start gap-3 w-full">
                <div className="mt-1">
                  <Icon name={feature.icon as any} size="sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feature.name}</span>
                    {feature.popular && (
                      <Badge variant="default" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
                    {feature.description}
                  </p>
                  <Badge variant="outline" className="text-xs mt-2">
                    {feature.category}
                  </Badge>
                </div>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
        {selected.length > 0 && (
          <div className="space-y-2">
            <p className="text-body-sm font-medium">Selected features:</p>
            <div className="flex flex-wrap gap-1">
              {selected.map((featureId) => {
                const feature = features.find(f => f.id === featureId)
                return (
                  <Badge key={featureId} variant="secondary" className="text-xs">
                    {feature?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  },
}