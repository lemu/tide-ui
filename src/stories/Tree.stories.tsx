import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tree, TreeDataItem } from '../components/in-progress/tree'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'

const meta: Meta<typeof Tree> = {
  title: 'In Progress/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    expandAll: {
      control: 'boolean',
      description: 'Whether to expand all nodes by default',
    },
    initialSelectedItemId: {
      control: 'text',
      description: 'Initially selected item ID',
    },
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for examples
const sampleData: TreeDataItem[] = [
  {
    id: '1',
    name: 'src',
    children: [
      {
        id: '2',
        name: 'components',
        children: [
          {
            id: '3',
            name: 'ui',
            children: [
              { id: '4', name: 'button.tsx' },
              { id: '5', name: 'input.tsx' },
              { id: '6', name: 'tree.tsx' },
            ],
          },
          { id: '7', name: 'forms', children: [
            { id: '8', name: 'form.tsx' },
            { id: '9', name: 'field.tsx' },
          ]},
        ],
      },
      {
        id: '10',
        name: 'pages',
        children: [
          { id: '11', name: 'home.tsx' },
          { id: '12', name: 'about.tsx' },
        ],
      },
      { id: '13', name: 'utils.ts' },
    ],
  },
  {
    id: '14',
    name: 'public',
    children: [
      { id: '15', name: 'favicon.ico' },
      { id: '16', name: 'logo.png' },
    ],
  },
  { id: '17', name: 'package.json' },
  { id: '18', name: 'README.md' },
]

// Default tree view
export const Default: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<TreeDataItem | undefined>()
    
    return (
      <div className="w-80 space-y-4">
        <Tree
          data={sampleData}
          onSelectChange={setSelectedItem}
          className="border rounded-lg p-4"
        />
        {selectedItem && (
          <div className="p-3 bg-[var(--color-background-neutral-subtlest)] rounded-lg">
            <p className="text-body-sm">
              Selected: <strong>{selectedItem.name}</strong>
            </p>
          </div>
        )}
      </div>
    )
  },
}

// Expanded by default
export const ExpandedByDefault: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<TreeDataItem | undefined>()
    
    return (
      <div className="w-80">
        <Tree
          data={sampleData}
          expandAll={true}
          onSelectChange={setSelectedItem}
          className="border rounded-lg p-4"
        />
      </div>
    )
  },
}

// File explorer with custom icons
export const FileExplorer: Story = {
  render: () => {
    const fileData: TreeDataItem[] = [
      {
        id: 'root',
        name: 'Project Files',
        icon: ({ className }) => <Icon name="folder" className={className} />,
        openIcon: ({ className }) => <Icon name="folder-open" className={className} />,
        children: [
          {
            id: 'docs',
            name: 'Documentation',
            icon: ({ className }) => <Icon name="folder" className={className} />,
            openIcon: ({ className }) => <Icon name="folder-open" className={className} />,
            children: [
              {
                id: 'readme',
                name: 'README.md',
                icon: ({ className }) => <Icon name="file-text" className={className} />,
              },
              {
                id: 'guide',
                name: 'USER_GUIDE.pdf',
                icon: ({ className }) => <Icon name="file" className={className} />,
              },
            ],
          },
          {
            id: 'images',
            name: 'Images',
            icon: ({ className }) => <Icon name="folder" className={className} />,
            openIcon: ({ className }) => <Icon name="folder-open" className={className} />,
            children: [
              {
                id: 'logo',
                name: 'logo.png',
                icon: ({ className }) => <Icon name="image" className={className} />,
              },
              {
                id: 'banner',
                name: 'banner.jpg',
                icon: ({ className }) => <Icon name="image" className={className} />,
              },
            ],
          },
          {
            id: 'config',
            name: 'config.json',
            icon: ({ className }) => <Icon name="settings" className={className} />,
          },
        ],
      },
    ]

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="folder" />
              File Explorer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tree
              data={fileData}
              expandAll={false}
              className="space-y-1"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// With actions and metadata
export const WithActions: Story = {
  render: () => {
    const [items, setItems] = useState<TreeDataItem[]>([
      {
        id: 'team',
        name: 'Development Team',
        children: [
          {
            id: 'frontend',
            name: 'Frontend Developers',
            actions: <Badge>3 members</Badge>,
            children: [
              {
                id: 'john',
                name: 'John Doe',
                actions: (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Icon name="mail" size="sm" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="more-horizontal" size="sm" />
                    </Button>
                  </div>
                ),
                onClick: () => alert('Clicked John Doe'),
              },
              {
                id: 'jane',
                name: 'Jane Smith',
                actions: (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Icon name="mail" size="sm" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="more-horizontal" size="sm" />
                    </Button>
                  </div>
                ),
              },
            ],
          },
          {
            id: 'backend',
            name: 'Backend Developers',
            actions: <Badge>2 members</Badge>,
            children: [
              {
                id: 'bob',
                name: 'Bob Johnson',
                actions: (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Icon name="mail" size="sm" />
                    </Button>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ])

    const addMember = (parentId: string) => {
      const newMember: TreeDataItem = {
        id: `member-${Date.now()}`,
        name: 'New Member',
        actions: (
          <Button size="sm" variant="ghost">
            <Icon name="mail" size="sm" />
          </Button>
        ),
      }
      
      // Add logic to insert new member (simplified for demo)
      alert(`Adding new member to ${parentId}`)
    }

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Team Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <Tree
              data={items}
              expandAll={true}
              className="space-y-1"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Navigation tree
export const NavigationTree: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<TreeDataItem | undefined>()
    
    const navigationData: TreeDataItem[] = [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: ({ className }) => <Icon name="layout-dashboard" className={className} />,
        onClick: () => console.log('Navigate to dashboard'),
      },
      {
        id: 'users',
        name: 'User Management',
        icon: ({ className }) => <Icon name="users" className={className} />,
        children: [
          {
            id: 'all-users',
            name: 'All Users',
            icon: ({ className }) => <Icon name="user" className={className} />,
          },
          {
            id: 'user-roles',
            name: 'User Roles',
            icon: ({ className }) => <Icon name="shield" className={className} />,
          },
          {
            id: 'permissions',
            name: 'Permissions',
            icon: ({ className }) => <Icon name="key" className={className} />,
          },
        ],
      },
      {
        id: 'content',
        name: 'Content Management',
        icon: ({ className }) => <Icon name="file-text" className={className} />,
        children: [
          {
            id: 'posts',
            name: 'Posts',
            icon: ({ className }) => <Icon name="edit" className={className} />,
          },
          {
            id: 'media',
            name: 'Media Library',
            icon: ({ className }) => <Icon name="image" className={className} />,
          },
        ],
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: ({ className }) => <Icon name="settings" className={className} />,
        children: [
          {
            id: 'general',
            name: 'General',
            icon: ({ className }) => <Icon name="sliders" className={className} />,
          },
          {
            id: 'security',
            name: 'Security',
            icon: ({ className }) => <Icon name="shield-check" className={className} />,
          },
        ],
      },
    ]

    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Admin Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tree
              data={navigationData}
              onSelectChange={setSelectedItem}
              className="space-y-1"
            />
            {selectedItem && (
              <div className="mt-4 p-3 bg-[var(--color-background-brand-subtle)] rounded-lg">
                <p className="text-body-sm text-[var(--color-text-brand-bold)]">
                  Active: {selectedItem.name}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled items
export const DisabledItems: Story = {
  render: () => {
    const disabledData: TreeDataItem[] = [
      {
        id: 'available',
        name: 'Available Features',
        children: [
          {
            id: 'dashboard',
            name: 'Dashboard',
            icon: ({ className }) => <Icon name="layout-dashboard" className={className} />,
          },
          {
            id: 'analytics',
            name: 'Analytics',
            icon: ({ className }) => <Icon name="bar-chart" className={className} />,
            disabled: true,
            actions: <Badge>Premium</Badge>,
          },
        ],
      },
      {
        id: 'coming-soon',
        name: 'Coming Soon',
        disabled: true,
        children: [
          {
            id: 'ai-features',
            name: 'AI Features',
            disabled: true,
            icon: ({ className }) => <Icon name="brain" className={className} />,
          },
          {
            id: 'mobile-app',
            name: 'Mobile App',
            disabled: true,
            icon: ({ className }) => <Icon name="smartphone" className={className} />,
          },
        ],
      },
    ]

    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Feature Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <Tree
              data={disabledData}
              expandAll={true}
              className="space-y-1"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Organization chart
export const OrganizationChart: Story = {
  render: () => {
    const orgData: TreeDataItem[] = [
      {
        id: 'ceo',
        name: 'John Smith - CEO',
        icon: ({ className }) => <Icon name="crown" className={className} />,
        actions: <Badge intent="brand" appearance="solid">Executive</Badge>,
        children: [
          {
            id: 'cto',
            name: 'Alice Johnson - CTO',
            icon: ({ className }) => <Icon name="cpu" className={className} />,
            actions: <Badge intent="success" appearance="solid">Tech Lead</Badge>,
            children: [
              {
                id: 'dev-team',
                name: 'Development Team',
                children: [
                  {
                    id: 'senior-dev',
                    name: 'Bob Wilson - Senior Developer',
                    icon: ({ className }) => <Icon name="code" className={className} />,
                  },
                  {
                    id: 'junior-dev',
                    name: 'Carol Brown - Junior Developer',
                    icon: ({ className }) => <Icon name="code" className={className} />,
                  },
                ],
              },
            ],
          },
          {
            id: 'cmo',
            name: 'David Lee - CMO',
            icon: ({ className }) => <Icon name="megaphone" className={className} />,
            actions: <Badge intent="warning" appearance="solid">Marketing</Badge>,
            children: [
              {
                id: 'marketing-team',
                name: 'Marketing Team',
                children: [
                  {
                    id: 'marketing-specialist',
                    name: 'Emma Davis - Specialist',
                    icon: ({ className }) => <Icon name="target" className={className} />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Organization Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <Tree
              data={orgData}
              expandAll={true}
              className="space-y-1"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Interactive example with add/remove functionality
export const Interactive: Story = {
  render: () => {
    const [treeData, setTreeData] = useState<TreeDataItem[]>([
      {
        id: 'root',
        name: 'Project Root',
        children: [
          {
            id: 'folder1',
            name: 'Folder 1',
            children: [
              { id: 'file1', name: 'file1.txt' },
            ],
          },
        ],
      },
    ])

    const addItem = (parentId: string, type: 'folder' | 'file') => {
      const newItem: TreeDataItem = {
        id: `${type}-${Date.now()}`,
        name: `New ${type}`,
        children: type === 'folder' ? [] : undefined,
      }

      const addToChildren = (items: TreeDataItem[]): TreeDataItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem],
            }
          }
          if (item.children) {
            return {
              ...item,
              children: addToChildren(item.children),
            }
          }
          return item
        })
      }

      setTreeData(addToChildren(treeData))
    }

    return (
      <div className="w-96 space-y-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => addItem('root', 'folder')}
          >
            <Icon name="folder-plus" size="sm" className="mr-1" />
            Add Folder
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => addItem('root', 'file')}
          >
            <Icon name="file-plus" size="sm" className="mr-1" />
            Add File
          </Button>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <Tree
              data={treeData}
              expandAll={true}
              className="space-y-1"
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}