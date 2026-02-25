import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/fundamental/popover'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Input } from '../components/fundamental/input'
import { Label } from '../components/fundamental/label'
import { Avatar, AvatarFallback, AvatarImage } from '../components/fundamental/avatar'

const meta: Meta<typeof Popover> = {
  title: 'NPM • Fundamental/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

// Basic popover
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Set the dimensions for the layer.
          </p>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// User profile popover
export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-body-md font-semibold">John Doe</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">john@example.com</p>
              <div className="flex items-center gap-2">
                <Badge className="text-xs">Admin</Badge>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="user" size="s" className="mr-2" />
                View Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="settings" size="s" className="mr-2" />
                Account Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="help-circle" size="s" className="mr-2" />
                Help & Support
              </Button>
              <Button variant="ghost" className="w-full justify-start text-[var(--color-text-error-bold)]">
                <Icon name="log-out" size="s" className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// Color picker popover
export const ColorPicker: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState('#3b82f6')
    
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#06b6d4',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
      '#ec4899', '#f43f5e', '#64748b', '#374151'
    ]

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-12 h-8 p-1">
            <div 
              className="w-full h-full rounded border border-[var(--color-border-primary-subtle)]"
              style={{ backgroundColor: selectedColor }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Select Color</h4>
              <div className="grid grid-cols-8 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-[var(--color-border-focus)] scale-110' 
                        : 'border-[var(--color-border-primary-subtle)] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-color">Custom Color</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-color"
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-8 p-1 cursor-pointer"
                />
                <Input
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 h-8"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="s">Cancel</Button>
              <Button size="s">Apply</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

// Quick actions popover
export const QuickActions: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Icon name="plus" size="s" className="mr-2" />
          Quick Actions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="font-medium mb-3">Create New</h4>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="file-text" size="s" className="mr-2" />
              Document
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="folder" size="s" className="mr-2" />
              Folder
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="image" size="s" className="mr-2" />
              Image
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="video" size="s" className="mr-2" />
              Video
            </Button>
          </div>
          
          <div className="border-t border-[var(--color-border-primary-subtle)] pt-2 mt-3">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="upload" size="s" className="mr-2" />
              Upload File
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="link" size="s" className="mr-2" />
              Import from URL
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

// Notifications popover
export const Notifications: Story = {
  render: () => {
    const notifications = [
      {
        id: 1,
        title: 'New comment on your post',
        message: 'John Doe commented on "Project Update"',
        time: '2 minutes ago',
        read: false,
        icon: 'message-circle',
        iconColor: 'text-[var(--color-text-info-bold)]'
      },
      {
        id: 2,
        title: 'Task completed',
        message: 'Website redesign has been completed',
        time: '1 hour ago',
        read: false,
        icon: 'check-circle',
        iconColor: 'text-[var(--color-text-success-bold)]'
      },
      {
        id: 3,
        title: 'System maintenance',
        message: 'Scheduled maintenance tonight at 2 AM',
        time: '3 hours ago',
        read: true,
        icon: 'alert-triangle',
        iconColor: 'text-[var(--color-text-warning-bold)]'
      },
      {
        id: 4,
        title: 'New team member',
        message: 'Jane Smith joined your team',
        time: '1 day ago',
        read: true,
        icon: 'user-plus',
        iconColor: 'text-[var(--color-text-brand-bold)]'
      }
    ]

    const unreadCount = notifications.filter(n => !n.read).length

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="relative">
            <Icon name="bell" size="s" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Notifications</h4>
              <Button variant="ghost" size="s" className="text-xs">
                Mark all read
              </Button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex gap-3 p-3 rounded-m transition-colors cursor-pointer ${
                    !notification.read 
                      ? 'bg-[var(--color-background-blue-subtle-selected)] hover:bg-[var(--color-background-blue-subtle-selected-hovered)]' 
                      : 'hover:bg-[var(--color-background-neutral-subtlest-hovered)]'
                  }`}
                >
                  <div className={`mt-1 ${notification.iconColor}`}>
                    <Icon name={notification.icon as any} size="s" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-body-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[var(--color-background-blue-bold)] rounded-full mt-1"></div>
                      )}
                    </div>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">
                      {notification.message}
                    </p>
                    <p className="text-caption-sm text-[var(--color-text-tertiary)]">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[var(--color-border-primary-subtle)] pt-3">
              <Button variant="ghost" className="w-full">
                View All Notifications
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

// Search popover
export const SearchPopover: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('')
    
    const searchResults = [
      { type: 'file', name: 'project-proposal.pdf', path: '/Documents/Projects' },
      { type: 'folder', name: 'Design Assets', path: '/Documents' },
      { type: 'file', name: 'meeting-notes.md', path: '/Documents/Notes' },
      { type: 'contact', name: 'John Doe', email: 'john@example.com' },
      { type: 'contact', name: 'Jane Smith', email: 'jane@example.com' },
    ].filter(item => 
      searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ('email' in item && item.email.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const getItemIcon = (type: string) => {
      switch (type) {
        case 'file': return 'file-text'
        case 'folder': return 'folder'
        case 'contact': return 'user'
        default: return 'search'
      }
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <Icon name="search" size="s" className="mr-2" />
            Search
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Quick Search</Label>
              <div className="relative">
                <Icon name="search" size="s" className="absolute left-3 top-2.5 text-[var(--color-text-secondary)]" />
                <Input
                  placeholder="Search files, folders, and contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {searchQuery && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-medium">Results</span>
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">
                    {searchResults.length} found
                  </span>
                </div>
                
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="search" size="l" className="mx-auto text-[var(--color-text-tertiary)] mb-2" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">No results found</p>
                      <p className="text-caption-sm text-[var(--color-text-tertiary)]">Try a different search term</p>
                    </div>
                  ) : (
                    searchResults.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-m hover:bg-[var(--color-background-neutral-subtlest-hovered)] cursor-pointer"
                      >
                        <Icon name={getItemIcon(item.type) as any} size="s" className="text-[var(--color-text-secondary)]" />
                        <div className="flex-1">
                          <p className="text-body-sm font-medium">{item.name}</p>
                          <p className="text-caption-sm text-[var(--color-text-secondary)]">
                            {'email' in item ? item.email : item.path}
                          </p>
                        </div>
                        <Badge appearance="outline" className="text-xs capitalize">
                          {item.type}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {!searchQuery && (
              <div className="space-y-3">
                <span className="text-body-sm font-medium">Recent Searches</span>
                <div className="space-y-1">
                  {['project files', 'team contacts', 'design assets'].map((term) => (
                    <Button
                      key={term}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setSearchQuery(term)}
                    >
                      <Icon name="clock" size="s" className="mr-2 text-[var(--color-text-secondary)]" />
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

// Share popover
export const SharePopover: Story = {
  render: () => {
    const [shareLink, setShareLink] = useState('https://example.com/share/abc123')
    const [linkCopied, setLinkCopied] = useState(false)

    const copyLink = () => {
      navigator.clipboard.writeText(shareLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <Icon name="share" size="s" className="mr-2" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Share this project</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Anyone with the link can view this project.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button size="s" onClick={copyLink}>
                  {linkCopied ? (
                    <Icon name="check" size="s" />
                  ) : (
                    <Icon name="copy" size="s" />
                  )}
                </Button>
              </div>
              {linkCopied && (
                <p className="text-caption-sm text-[var(--color-text-success-bold)]">
                  Link copied to clipboard!
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Share via</Label>
              <div className="grid grid-cols-4 gap-2">
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Icon name="mail" size="s" />
                  <span className="text-xs">Email</span>
                </Button>
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Icon name="message-circle" size="s" />
                  <span className="text-xs">Slack</span>
                </Button>
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Icon name="twitter" size="s" />
                  <span className="text-xs">Twitter</span>
                </Button>
                <Button variant="ghost" className="flex flex-col gap-1 h-auto py-3">
                  <Icon name="linkedin" size="s" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Team Members</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    <span className="text-body-sm">John Doe</span>
                  </div>
                  <Badge appearance="outline" className="text-xs">Owner</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">JS</AvatarFallback>
                    </Avatar>
                    <span className="text-body-sm">Jane Smith</span>
                  </div>
                  <select className="text-xs border border-[var(--color-interaction-border-input)] rounded px-2 py-1">
                    <option>Editor</option>
                    <option>Viewer</option>
                    <option>Remove</option>
                  </select>
                </div>
              </div>
              <Button variant="ghost" size="s" className="w-full">
                <Icon name="user-plus" size="s" className="mr-2" />
                Invite people
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

// Settings popover
export const SettingsPopover: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      darkMode: true
    })

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="s" className="h-8 w-8 p-0">
            <Icon name="settings" size="s" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <h4 className="font-medium">Quick Settings</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-body-sm">Notifications</Label>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">Enable push notifications</p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={settings.notifications}
                  onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-body-sm">Auto Save</Label>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">Save changes automatically</p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={settings.autoSave}
                  onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-body-sm">Dark Mode</Label>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">Use dark theme</p>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded"
                  checked={settings.darkMode}
                  onChange={(e) => setSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
                />
              </div>
            </div>

            <div className="border-t border-[var(--color-border-primary-subtle)] pt-3">
              <Button variant="ghost" size="s" className="w-full">
                <Icon name="settings" size="s" className="mr-2" />
                All Settings
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}