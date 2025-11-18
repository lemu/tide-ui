import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '../components/fundamental/sheet'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Input } from '../components/fundamental/input'
import { Label } from '../components/fundamental/label'
import { Textarea } from '../components/fundamental/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../components/fundamental/avatar'

const meta: Meta<typeof Sheet> = {
  title: 'NPM • Fundamental/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The side of the screen where the sheet appears',
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

// Default sheet from right
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

// Sheet from different sides
export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Icon name="menu" size="sm" className="mr-2" />
          Navigation
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Quick access to all sections of the application.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="home" size="sm" className="mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="folder" size="sm" className="mr-2" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="users" size="sm" className="mr-2" />
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="bar-chart" size="sm" className="mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="settings" size="sm" className="mr-2" />
              Settings
            </Button>
          </nav>
        </div>
        <SheetFooter>
          <div className="flex items-center gap-2 text-body-sm text-[var(--color-text-secondary)]">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const FromTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Icon name="bell" size="sm" className="mr-2" />
          Notifications
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Recent Notifications</SheetTitle>
          <SheetDescription>
            Stay updated with the latest activity and alerts.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="info" size="sm" className="text-[var(--color-text-information)]" />
                    <span className="text-body-sm font-medium">System Update</span>
                  </div>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Your system has been updated to version 2.4.{i + 1}
                  </p>
                  <p className="text-caption-sm text-[var(--color-text-tertiary)] mt-1">
                    {i + 1} hour{i !== 0 ? 's' : ''} ago
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const FromBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Icon name="share" size="sm" className="mr-2" />
          Share Options
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share This Project</SheetTitle>
          <SheetDescription>
            Choose how you want to share this project with others.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="grid grid-cols-4 gap-4">
            <Button variant="ghost" className="flex flex-col gap-2 h-auto py-4">
              <Icon name="mail" size="md" />
              <span className="text-sm">Email</span>
            </Button>
            <Button variant="ghost" className="flex flex-col gap-2 h-auto py-4">
              <Icon name="link" size="md" />
              <span className="text-sm">Copy Link</span>
            </Button>
            <Button variant="ghost" className="flex flex-col gap-2 h-auto py-4">
              <Icon name="download" size="md" />
              <span className="text-sm">Export</span>
            </Button>
            <Button variant="ghost" className="flex flex-col gap-2 h-auto py-4">
              <Icon name="share-2" size="md" />
              <span className="text-sm">Social</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

// Shopping cart example
export const ShoppingCart: Story = {
  render: () => {
    const [cartItems, setCartItems] = useState([
      { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop' },
      { id: 2, name: 'Smart Watch', price: 299.99, quantity: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop' },
      { id: 3, name: 'Laptop Stand', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80&h=80&fit=crop' },
    ])

    const updateQuantity = (id: number, newQuantity: number) => {
      if (newQuantity === 0) {
        setCartItems(items => items.filter(item => item.id !== id))
      } else {
        setCartItems(items => 
          items.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        )
      }
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Icon name="shopping-cart" size="sm" className="mr-2" />
            Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              Review your items before checkout.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 flex-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Icon name="shopping-cart" size="lg" className="text-[var(--color-text-tertiary)]" />
                <div className="text-center">
                  <p className="text-body-md font-medium">Your cart is empty</p>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Add some items to get started</p>
                </div>
                <Button>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-[var(--color-border-primary-subtle)] rounded-md">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="minus" size="sm" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="plus" size="sm" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-[var(--color-text-error)]"
                      onClick={() => updateQuantity(item.id, 0)}
                    >
                      <Icon name="trash-2" size="sm" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <SheetFooter className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-heading-sm font-semibold">Total: ${total.toFixed(2)}</span>
                  <Badge>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</Badge>
                </div>
                <div className="flex gap-2">
                  <SheetClose asChild>
                    <Button variant="ghost" className="flex-1">Continue Shopping</Button>
                  </SheetClose>
                  <Button className="flex-1">
                    <Icon name="credit-card" size="sm" className="mr-2" />
                    Checkout
                  </Button>
                </div>
              </div>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    )
  },
}

// Form sheet
export const FormSheet: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      priority: 'medium'
    })

    const handleSubmit = () => {
      console.log('Form submitted:', formData)
      // Reset form
      setFormData({ name: '', email: '', message: '', priority: 'medium' })
    }

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Icon name="message-circle" size="sm" className="mr-2" />
            Contact Support
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contact Support</SheetTitle>
            <SheetDescription>
              Send us a message and we'll get back to you as soon as possible.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="support-name">Full Name</Label>
              <Input
                id="support-name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Email Address</Label>
              <Input
                id="support-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-priority">Priority Level</Label>
              <select
                id="support-priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
              >
                <option value="low">Low - General inquiry</option>
                <option value="medium">Medium - Need help</option>
                <option value="high">High - Issue affecting work</option>
                <option value="critical">Critical - System down</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">Message</Label>
              <Textarea
                id="support-message"
                placeholder="Describe your issue or question in detail"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={5}
              />
            </div>

            <div className="bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md p-4">
              <div className="flex items-start gap-2">
                <Icon name="info" size="sm" className="mt-0.5 text-[var(--color-text-information)]" />
                <div className="space-y-1">
                  <p className="text-body-sm font-medium">Response Time</p>
                  <ul className="text-caption-sm space-y-1">
                    <li>• Critical: Within 1 hour</li>
                    <li>• High: Within 4 hours</li>
                    <li>• Medium: Within 24 hours</li>
                    <li>• Low: Within 48 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter className="gap-2">
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSubmit}>
              <Icon name="send" size="sm" className="mr-2" />
              Send Message
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  },
}

// File browser sheet
export const FileBrowser: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState(['Documents', 'Projects'])
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])

    const files = [
      { name: 'README.md', type: 'file', size: '2.4 KB', modified: '2 hours ago', icon: 'file-text' },
      { name: 'src', type: 'folder', size: '—', modified: '1 day ago', icon: 'folder' },
      { name: 'package.json', type: 'file', size: '1.8 KB', modified: '3 days ago', icon: 'file-text' },
      { name: 'images', type: 'folder', size: '—', modified: '1 week ago', icon: 'folder' },
      { name: 'design-specs.pdf', type: 'file', size: '5.2 MB', modified: '2 weeks ago', icon: 'file' },
      { name: 'notes.txt', type: 'file', size: '892 B', modified: '1 month ago', icon: 'file-text' },
    ]

    const toggleFileSelection = (fileName: string) => {
      setSelectedFiles(prev => 
        prev.includes(fileName) 
          ? prev.filter(f => f !== fileName)
          : [...prev, fileName]
      )
    }

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icon name="folder-open" size="sm" className="mr-2" />
            Browse Files
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>File Browser</SheetTitle>
            <SheetDescription>
              Browse and manage your files and folders.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-body-sm">
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Icon name="home" size="sm" />
              </Button>
              {currentPath.map((folder, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon name="chevron-right" size="sm" className="text-[var(--color-text-tertiary)]" />
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    {folder}
                  </Button>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Icon name="upload" size="sm" className="mr-2" />
                  Upload
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="folder-plus" size="sm" className="mr-2" />
                  New Folder
                </Button>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-body-sm">{selectedFiles.length} selected</span>
                  <Button size="sm" variant="ghost">
                    <Icon name="download" size="sm" className="mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" className="text-[var(--color-text-error)]">
                    <Icon name="trash-2" size="sm" className="mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            {/* File list */}
            <div className="border border-[var(--color-border-primary-subtle)] rounded-md">
              <div className="grid grid-cols-12 gap-4 p-3 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-background-neutral-subtle)] text-body-sm font-medium">
                <div className="col-span-1"></div>
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Modified</div>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {files.map((file) => (
                  <div 
                    key={file.name}
                    className={`grid grid-cols-12 gap-4 p-3 border-b border-[var(--color-border-primary-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] cursor-pointer transition-colors ${
                      selectedFiles.includes(file.name) ? 'bg-[var(--color-background-brand-selected)]' : ''
                    }`}
                    onClick={() => toggleFileSelection(file.name)}
                  >
                    <div className="col-span-1 flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedFiles.includes(file.name)}
                        onChange={() => toggleFileSelection(file.name)}
                      />
                    </div>
                    <div className="col-span-6 flex items-center gap-2">
                      <Icon name={file.icon as any} size="sm" className="text-[var(--color-text-secondary)]" />
                      <span className="text-body-sm">{file.name}</span>
                    </div>
                    <div className="col-span-2 text-body-sm text-[var(--color-text-secondary)]">
                      {file.size}
                    </div>
                    <div className="col-span-3 text-body-sm text-[var(--color-text-secondary)]">
                      {file.modified}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className="flex items-center justify-between w-full">
              <span className="text-body-sm text-[var(--color-text-secondary)]">
                {files.length} items
              </span>
              <SheetClose asChild>
                <Button variant="ghost">Close</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  },
}

// Settings panel
export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      language: 'en',
      timezone: 'UTC-8'
    })

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Icon name="settings" size="sm" className="mr-2" />
            Settings
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Application Settings</SheetTitle>
            <SheetDescription>
              Customize your experience and preferences.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">General</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Notifications</Label>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Receive alerts and updates</p>
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
                    <Label>Dark Mode</Label>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Use dark theme</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="rounded"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings(prev => ({ ...prev, darkMode: e.target.checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Save</Label>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Automatically save changes</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="rounded"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">Preferences</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">Account</h4>
              
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="user" size="sm" className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="shield" size="sm" className="mr-2" />
                  Security Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Icon name="credit-card" size="sm" className="mr-2" />
                  Billing & Subscription
                </Button>
                <Button variant="ghost" className="w-full justify-start text-[var(--color-text-error)]">
                  <Icon name="log-out" size="sm" className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          <SheetFooter className="gap-2">
            <SheetClose asChild>
              <Button variant="ghost">Cancel</Button>
            </SheetClose>
            <Button>
              <Icon name="check" size="sm" className="mr-2" />
              Save Settings
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  },
}