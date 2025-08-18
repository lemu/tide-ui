import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// Basic dialog
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Confirmation dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleConfirm = () => {
      // Simulate action
      console.log('Action confirmed')
      setIsOpen(false)
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-[var(--color-text-error)]">
            <Icon name="trash-2" size="sm" className="mr-2" />
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-background-error)] flex items-center justify-center">
                <Icon name="alert-triangle" size="sm" className="text-[var(--color-text-on-action)]" />
              </div>
              <div>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-[var(--color-background-error-subtle)] border border-[var(--color-border-error)] rounded-md">
              <h4 className="text-body-medium-sm font-medium mb-2">What will be deleted:</h4>
              <ul className="space-y-1 text-body-sm">
                <li>• Your profile and account information</li>
                <li>• All your projects and files</li>
                <li>• Your subscription and billing history</li>
                <li>• All collaboration access and shared content</li>
              </ul>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button 
              variant="ghost" 
              className="bg-[var(--color-background-error)] text-[var(--color-text-on-action)] hover:bg-[var(--color-background-error-hovered)]"
              onClick={handleConfirm}
            >
              <Icon name="trash-2" size="sm" className="mr-2" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// Form dialog with validation
export const FormDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      priority: '',
      assignee: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
      const newErrors: Record<string, string> = {}
      if (!formData.title.trim()) newErrors.title = 'Title is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (!formData.priority) newErrors.priority = 'Priority is required'
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (validateForm()) {
        console.log('Creating task:', formData)
        setIsOpen(false)
        setFormData({ title: '', description: '', priority: '', assignee: '' })
        setErrors({})
      }
    }

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Icon name="plus" size="sm" className="mr-2" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your project. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={errors.title ? 'border-[var(--color-border-error)]' : ''}
              />
              {errors.title && (
                <p className="text-caption-sm text-[var(--color-text-error)]">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the task in detail"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={errors.description ? 'border-[var(--color-border-error)]' : ''}
                rows={3}
              />
              {errors.description && (
                <p className="text-caption-sm text-[var(--color-text-error)]">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  className={`w-full h-10 px-3 border rounded-md bg-[var(--color-surface-primary)] text-body-sm ${
                    errors.priority ? 'border-[var(--color-border-error)]' : 'border-[var(--color-border-input)]'
                  }`}
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                {errors.priority && (
                  <p className="text-caption-sm text-[var(--color-text-error)]">{errors.priority}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <select
                  id="assignee"
                  value={formData.assignee}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
                >
                  <option value="">Unassigned</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>
              <Icon name="plus" size="sm" className="mr-2" />
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// Alert dialog
export const AlertDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[var(--color-text-warning)]">
          <Icon name="alert-circle" size="sm" className="mr-2" />
          Show Alert
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-warning)] flex items-center justify-center">
              <Icon name="alert-triangle" size="md" className="text-[var(--color-text-on-action)]" />
            </div>
            <div>
              <DialogTitle>Storage Almost Full</DialogTitle>
              <DialogDescription>
                Your storage is 95% full. Please free up space or upgrade your plan to continue using all features.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="p-4 bg-[var(--color-background-warning-subtle)] border border-[var(--color-border-warning)] rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm font-medium">Storage Usage</span>
                <span className="text-body-sm">4.75 GB / 5.00 GB</span>
              </div>
              <div className="w-full bg-[var(--color-background-neutral-subtle)] rounded-full h-2">
                <div className="bg-[var(--color-background-warning)] h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-body-medium-sm font-medium">Recommended actions:</h4>
              <ul className="space-y-1 text-body-sm text-[var(--color-text-secondary)]">
                <li>• Delete unnecessary files and folders</li>
                <li>• Empty your trash to permanently remove deleted items</li>
                <li>• Archive old projects to external storage</li>
                <li>• Upgrade to a higher storage plan</li>
              </ul>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Remind Me Later</Button>
          </DialogClose>
          <Button>
            <Icon name="zap" size="sm" className="mr-2" />
            Upgrade Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Complex content dialog
export const ComplexContentDialog: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        status: 'online',
        lastActive: 'Active now'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Editor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=32&h=32&fit=crop&crop=face',
        status: 'away',
        lastActive: '5 minutes ago'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'Viewer',
        avatar: '',
        status: 'offline',
        lastActive: '2 hours ago'
      },
    ]

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Icon name="users" size="sm" className="mr-2" />
            Manage Team
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Team Members</DialogTitle>
            <DialogDescription>
              Manage your team members, their roles, and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-medium">{users.length} members</span>
                <Badge variant="secondary">{users.filter(u => u.status === 'online').length} online</Badge>
              </div>
              <Button size="sm">
                <Icon name="user-plus" size="sm" className="mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {users.map((user) => (
                <Card key={user.id} className={`cursor-pointer transition-colors ${
                  selectedUser === user.id ? 'bg-[var(--color-background-brand-selected)]' : ''
                }`} onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            user.status === 'online' ? 'bg-green-400' : 
                            user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{user.name}</span>
                            <Badge variant="outline" className="text-xs">{user.role}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-body-sm text-[var(--color-text-secondary)]">
                            <span>{user.email}</span>
                            <span>•</span>
                            <span>{user.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Icon name="more-horizontal" className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {selectedUser === user.id && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-border-primary-subtle)]">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-semibold">24</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Projects</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">156</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Tasks</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold">8.5h</div>
                            <div className="text-caption-sm text-[var(--color-text-secondary)]">Today</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="ghost" className="flex-1">
                            <Icon name="mail" size="sm" className="mr-2" />
                            Message
                          </Button>
                          <Button size="sm" variant="ghost" className="flex-1">
                            <Icon name="settings" size="sm" className="mr-2" />
                            Settings
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// Information dialog
export const InformationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Icon name="info" size="sm" className="mr-2" />
          About
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-background-information)] flex items-center justify-center">
              <Icon name="info" size="md" className="text-[var(--color-text-on-action)]" />
            </div>
            <div>
              <DialogTitle>About This Application</DialogTitle>
              <DialogDescription>
                Learn more about features, version information, and credits.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-[var(--color-background-neutral-subtle)] rounded-md">
              <div className="text-lg font-semibold text-[var(--color-text-brand)]">v2.4.1</div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">Current Version</div>
            </div>
            <div className="p-4 bg-[var(--color-background-neutral-subtle)] rounded-md">
              <div className="text-lg font-semibold text-[var(--color-text-brand)]">2024</div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">Last Updated</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">What's New in v2.4.1</h4>
              <ul className="space-y-1 text-body-sm text-[var(--color-text-secondary)]">
                <li>• Improved performance and loading speeds</li>
                <li>• New collaboration features for team projects</li>
                <li>• Enhanced security with 2FA support</li>
                <li>• Bug fixes and stability improvements</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--color-border-primary-subtle)]">
              <h4 className="font-medium mb-2">Credits & Acknowledgments</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Built with love by our team. Special thanks to all contributors and the open-source community.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="ghost">
            <Icon name="external-link" size="sm" className="mr-2" />
            Release Notes
          </Button>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Full screen dialog
export const FullScreenDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Icon name="maximize" size="sm" className="mr-2" />
          Open Full Screen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh]">
        <DialogHeader>
          <DialogTitle>Project Overview Dashboard</DialogTitle>
          <DialogDescription>
            Comprehensive view of all your projects, tasks, and team activity.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 py-4 overflow-hidden">
          <div className="grid grid-cols-4 gap-6 h-full">
            <div className="col-span-3 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-[var(--color-text-secondary)]">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">143</div>
                    <p className="text-xs text-[var(--color-text-secondary)]">+23 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-[var(--color-text-secondary)]">5 online now</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">User {i + 1} completed task "Design Review"</p>
                          <p className="text-xs text-[var(--color-text-secondary)]">{i + 1} hours ago</p>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6 overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" className="w-full justify-start">
                    <Icon name="plus" size="sm" className="mr-2" />
                    New Project
                  </Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">
                    <Icon name="user-plus" size="sm" className="mr-2" />
                    Invite Member
                  </Button>
                  <Button size="sm" variant="ghost" className="w-full justify-start">
                    <Icon name="file-text" size="sm" className="mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Project {i + 1}</span>
                        <Badge variant="outline" className="text-xs">
                          {i === 0 ? 'Today' : `${i + 1} days`}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">Final review and deployment</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Multiple dialogs
export const MultipleDialogs: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false)
    const [secondOpen, setSecondOpen] = useState(false)

    return (
      <>
        <Dialog open={firstOpen} onOpenChange={setFirstOpen}>
          <DialogTrigger asChild>
            <Button>Open Settings</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Application Settings</DialogTitle>
              <DialogDescription>
                Configure your application preferences and settings.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <select className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <select className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Dialog open={secondOpen} onOpenChange={setSecondOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost">Advanced Settings</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advanced Settings</DialogTitle>
                    <DialogDescription>
                      Configure advanced options and developer settings.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Debug Mode</Label>
                        <p className="text-caption-sm text-[var(--color-text-secondary)]">Enable detailed logging</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Experimental Features</Label>
                        <p className="text-caption-sm text-[var(--color-text-secondary)]">Try new features early</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button>Save Settings</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}