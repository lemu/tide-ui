import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Listbox, ListboxOption, ListboxGroup, ListboxGroupLabel } from '../components/ui/listbox'
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Listbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('react')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose your favorite framework</Label>
        <Listbox value={selected} onChange={setSelected}>
          <ListboxOption value="react">React</ListboxOption>
          <ListboxOption value="vue">Vue.js</ListboxOption>
          <ListboxOption value="angular">Angular</ListboxOption>
          <ListboxOption value="svelte">Svelte</ListboxOption>
          <ListboxOption value="solid">SolidJS</ListboxOption>
        </Listbox>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Selected: {selected}
        </p>
      </div>
    )
  },
}

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['typescript', 'react'])
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose your tech stack ({selected.length} selected)</Label>
        <Listbox value={selected} onChange={setSelected} multiple>
          <ListboxOption value="javascript">JavaScript</ListboxOption>
          <ListboxOption value="typescript">TypeScript</ListboxOption>
          <ListboxOption value="react">React</ListboxOption>
          <ListboxOption value="vue">Vue.js</ListboxOption>
          <ListboxOption value="angular">Angular</ListboxOption>
          <ListboxOption value="nodejs">Node.js</ListboxOption>
          <ListboxOption value="python">Python</ListboxOption>
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

export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('home')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Navigation</Label>
        <Listbox value={selected} onChange={setSelected}>
          <ListboxOption value="home">
            <div className="flex items-center gap-3">
              <Icon name="home" size="sm" />
              Home
            </div>
          </ListboxOption>
          <ListboxOption value="dashboard">
            <div className="flex items-center gap-3">
              <Icon name="layout-dashboard" size="sm" />
              Dashboard
            </div>
          </ListboxOption>
          <ListboxOption value="settings">
            <div className="flex items-center gap-3">
              <Icon name="settings" size="sm" />
              Settings
            </div>
          </ListboxOption>
          <ListboxOption value="profile">
            <div className="flex items-center gap-3">
              <Icon name="user" size="sm" />
              Profile
            </div>
          </ListboxOption>
        </Listbox>
      </div>
    )
  },
}

export const WithDisabledOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('free')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose a subscription plan</Label>
        <Listbox value={selected} onChange={setSelected}>
          <ListboxOption value="free">
            <div className="flex items-center justify-between w-full">
              <span>Free Plan</span>
              <Badge variant="secondary" className="text-xs">Current</Badge>
            </div>
          </ListboxOption>
          <ListboxOption value="pro">
            <div className="flex items-center justify-between w-full">
              <span>Pro Plan</span>
              <Badge variant="default" className="text-xs">$9/mo</Badge>
            </div>
          </ListboxOption>
          <ListboxOption value="team" disabled>
            <div className="flex items-center justify-between w-full">
              <span>Team Plan</span>
              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
            </div>
          </ListboxOption>
          <ListboxOption value="enterprise" disabled>
            <div className="flex items-center justify-between w-full">
              <span>Enterprise</span>
              <Badge variant="secondary" className="text-xs">Contact Sales</Badge>
            </div>
          </ListboxOption>
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

export const DisabledListbox: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('option1')
    
    return (
      <div className="w-80 space-y-4">
        <Label>Disabled listbox</Label>
        <Listbox value={selected} onChange={setSelected} disabled>
          <ListboxOption value="option1">Option 1</ListboxOption>
          <ListboxOption value="option2">Option 2</ListboxOption>
          <ListboxOption value="option3">Option 3</ListboxOption>
        </Listbox>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          This entire listbox is disabled
        </p>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string>('sm1')
    const [medium, setMedium] = useState<string>('md1')
    const [large, setLarge] = useState<string>('lg1')
    
    return (
      <div className="space-y-8">
        <div className="w-64">
          <Label className="mb-2 block">Small size</Label>
          <Listbox value={small} onChange={setSmall} size="sm">
            <ListboxOption value="sm1">Small Option 1</ListboxOption>
            <ListboxOption value="sm2">Small Option 2</ListboxOption>
            <ListboxOption value="sm3">Small Option 3</ListboxOption>
          </Listbox>
        </div>
        
        <div className="w-64">
          <Label className="mb-2 block">Medium size (default)</Label>
          <Listbox value={medium} onChange={setMedium} size="md">
            <ListboxOption value="md1">Medium Option 1</ListboxOption>
            <ListboxOption value="md2">Medium Option 2</ListboxOption>
            <ListboxOption value="md3">Medium Option 3</ListboxOption>
          </Listbox>
        </div>
        
        <div className="w-64">
          <Label className="mb-2 block">Large size</Label>
          <Listbox value={large} onChange={setLarge} size="lg">
            <ListboxOption value="lg1">Large Option 1</ListboxOption>
            <ListboxOption value="lg2">Large Option 2</ListboxOption>
            <ListboxOption value="lg3">Large Option 3</ListboxOption>
          </Listbox>
        </div>
      </div>
    )
  },
}

export const ColorsWithMultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['red', 'blue'])
    
    const colors = [
      { value: 'red', name: 'Red', color: 'bg-red-500' },
      { value: 'blue', name: 'Blue', color: 'bg-blue-500' },
      { value: 'green', name: 'Green', color: 'bg-green-500' },
      { value: 'yellow', name: 'Yellow', color: 'bg-yellow-500' },
      { value: 'purple', name: 'Purple', color: 'bg-purple-500' },
      { value: 'pink', name: 'Pink', color: 'bg-pink-500' },
    ]
    
    return (
      <div className="w-80 space-y-4">
        <Label>Choose colors ({selected.length} selected)</Label>
        <Listbox value={selected} onChange={setSelected} multiple>
          {colors.map((color) => (
            <ListboxOption key={color.value} value={color.value}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${color.color}`} />
                {color.name}
              </div>
            </ListboxOption>
          ))}
        </Listbox>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selected.map((colorValue) => {
              const color = colors.find(c => c.value === colorValue)
              return (
                <Badge key={colorValue} variant="secondary" className="text-xs">
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

export const SettingsPanel: Story = {
  render: () => {
    const [theme, setTheme] = useState<string>('system')
    const [language, setLanguage] = useState<string>('en')
    const [notifications, setNotifications] = useState<string[]>(['email', 'push'])
    
    return (
      <div className="max-w-md space-y-8">
        <div>
          <Label className="mb-3 block">Theme Preference</Label>
          <Listbox value={theme} onChange={setTheme}>
            <ListboxOption value="light">
              <div className="flex items-center gap-3">
                <Icon name="sun" size="sm" />
                Light Mode
              </div>
            </ListboxOption>
            <ListboxOption value="dark">
              <div className="flex items-center gap-3">
                <Icon name="moon" size="sm" />
                Dark Mode
              </div>
            </ListboxOption>
            <ListboxOption value="system">
              <div className="flex items-center gap-3">
                <Icon name="laptop" size="sm" />
                System Preference
              </div>
            </ListboxOption>
          </Listbox>
        </div>
        
        <div>
          <Label className="mb-3 block">Language</Label>
          <Listbox value={language} onChange={setLanguage}>
            <ListboxOption value="en">🇺🇸 English</ListboxOption>
            <ListboxOption value="es">🇪🇸 Español</ListboxOption>
            <ListboxOption value="fr">🇫🇷 Français</ListboxOption>
            <ListboxOption value="de">🇩🇪 Deutsch</ListboxOption>
            <ListboxOption value="ja">🇯🇵 日本語</ListboxOption>
          </Listbox>
        </div>
        
        <div>
          <Label className="mb-3 block">Notification Types ({notifications.length} enabled)</Label>
          <Listbox value={notifications} onChange={setNotifications} multiple>
            <ListboxOption value="email">
              <div className="flex items-center gap-3">
                <Icon name="mail" size="sm" />
                Email Notifications
              </div>
            </ListboxOption>
            <ListboxOption value="push">
              <div className="flex items-center gap-3">
                <Icon name="bell" size="sm" />
                Push Notifications
              </div>
            </ListboxOption>
            <ListboxOption value="sms">
              <div className="flex items-center gap-3">
                <Icon name="message-circle" size="sm" />
                SMS Notifications
              </div>
            </ListboxOption>
            <ListboxOption value="desktop">
              <div className="flex items-center gap-3">
                <Icon name="monitor" size="sm" />
                Desktop Notifications
              </div>
            </ListboxOption>
          </Listbox>
        </div>
      </div>
    )
  },
}

export const WithGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['alice', 'bob', 'diana'])
    
    return (
      <div className="w-96 space-y-4">
        <Label>Select team members ({selected.length} selected)</Label>
        <Listbox value={selected} onChange={setSelected} multiple>
          <ListboxGroup>
            <ListboxGroupLabel>Developers</ListboxGroupLabel>
            <ListboxOption value="alice">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-brand)]">AJ</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Alice Johnson</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Senior Developer</div>
                </div>
              </div>
            </ListboxOption>
            <ListboxOption value="bob">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-brand)]">BS</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Bob Smith</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Frontend Developer</div>
                </div>
              </div>
            </ListboxOption>
            <ListboxOption value="charlie">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-brand)]">CB</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Charlie Brown</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Backend Developer</div>
                </div>
              </div>
            </ListboxOption>
          </ListboxGroup>
          
          <ListboxGroup>
            <ListboxGroupLabel>Designers</ListboxGroupLabel>
            <ListboxOption value="diana">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-neutral-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-primary)]">DL</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Diana Lee</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">UI/UX Designer</div>
                </div>
              </div>
            </ListboxOption>
            <ListboxOption value="evan">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-neutral-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-primary)]">EW</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Evan Wilson</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Product Designer</div>
                </div>
              </div>
            </ListboxOption>
          </ListboxGroup>
          
          <ListboxGroup>
            <ListboxGroupLabel>Management</ListboxGroupLabel>
            <ListboxOption value="fiona">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-neutral-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-primary)]">FD</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">Fiona Davis</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Product Manager</div>
                </div>
              </div>
            </ListboxOption>
            <ListboxOption value="george" disabled>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-background-neutral-subtle)] flex items-center justify-center">
                  <span className="text-caption-sm font-medium text-[var(--color-text-primary)]">GM</span>
                </div>
                <div>
                  <div className="text-body-sm font-medium">George Miller</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Engineering Manager (On Leave)</div>
                </div>
              </div>
            </ListboxOption>
          </ListboxGroup>
        </Listbox>
        
        {selected.length > 0 && (
          <div className="space-y-2">
            <p className="text-body-sm font-medium">Selected team members:</p>
            <div className="flex flex-wrap gap-1">
              {selected.map((memberId) => {
                const memberNames = {
                  alice: 'Alice',
                  bob: 'Bob', 
                  charlie: 'Charlie',
                  diana: 'Diana',
                  evan: 'Evan',
                  fiona: 'Fiona',
                  george: 'George'
                }
                return (
                  <Badge key={memberId} variant="secondary" className="text-xs">
                    {memberNames[memberId as keyof typeof memberNames]}
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

export const DiceUIExample: Story = {
  render: () => {
    const [selectedPerson, setSelectedPerson] = useState<string>('wade')
    
    const people = [
      {
        id: 'wade',
        name: 'Wade Cooper',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin'
      },
      {
        id: 'arlene',
        name: 'Arlene Mccoy',
        title: 'Regional Paradigm Technician',
        department: 'Optimization', 
        role: 'Owner'
      },
      {
        id: 'devon',
        name: 'Devon Webb',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Member'
      },
      {
        id: 'tom',
        name: 'Tom Cook',
        title: 'Regional Paradigm Technician', 
        department: 'Optimization',
        role: 'Member'
      },
      {
        id: 'tanya',
        name: 'Tanya Fox',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Member'
      },
      {
        id: 'hellen',
        name: 'Hellen Schmidt',
        title: 'Regional Paradigm Technician',
        department: 'Optimization', 
        role: 'Member'
      }
    ]
    
    const selectedPersonData = people.find(p => p.id === selectedPerson)
    
    return (
      <div className="max-w-md space-y-6">
        <div>
          <Label className="mb-4 block text-body-md font-medium">Assigned to</Label>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            {people.map((person) => (
              <ListboxOption key={person.id} value={person.id}>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                      <span className="text-body-sm font-medium text-[var(--color-text-brand)]">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-[var(--color-text-primary)]">
                        {person.name}
                      </p>
                      <p className="text-caption-sm text-[var(--color-text-secondary)] mt-0.5">
                        {person.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">
                          {person.department}
                        </span>
                        <span className="text-caption-xsm text-[var(--color-text-tertiary)]">•</span>
                        <Badge 
                          variant={person.role === 'Admin' ? 'default' : person.role === 'Owner' ? 'secondary' : 'secondary'} 
                          className="text-xs px-1.5 py-0.5"
                        >
                          {person.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </ListboxOption>
            ))}
          </Listbox>
        </div>
        
        {selectedPersonData && (
          <div className="mt-4 p-4 rounded-md bg-[var(--color-background-neutral-subtle)]">
            <p className="text-body-sm font-medium mb-2">Selected:</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-brand-subtle)] flex items-center justify-center">
                <span className="text-caption-sm font-medium text-[var(--color-text-brand)]">
                  {selectedPersonData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-body-sm font-medium">{selectedPersonData.name}</p>
                <p className="text-caption-sm text-[var(--color-text-secondary)]">{selectedPersonData.title}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
}

