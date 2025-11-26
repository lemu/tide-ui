import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sortable } from '../components/in-progress/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Avatar, AvatarFallback, AvatarImage } from '../components/fundamental/avatar'
import { Badge } from '../components/fundamental/badge'
import { Icon } from '../components/fundamental/icon'

const meta: Meta<typeof Sortable.Root> = {
  title: 'In Progress/Sortable',
  component: Sortable.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'grid'],
      description: 'Layout orientation of sortable items',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether sorting is disabled',
    },
  },
} satisfies Meta<typeof Sortable.Root>

export default meta
type Story = StoryObj<typeof meta>

// Simple list example
export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      'Apple',
      'Banana', 
      'Cherry',
      'Date',
      'Elderberry'
    ])
    
    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Sortable Fruit List</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={items}
              onItemsChange={setItems}
              orientation="vertical"
              renderItem={(item) => (
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-[var(--color-surface-primary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)]">
                  <Sortable.Handle />
                  <span className="text-body-sm">{item}</span>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Task list with priorities
export const TaskList: Story = {
  render: () => {
    const [tasks, setTasks] = useState([
      { id: '1', title: 'Design new homepage', priority: 'High', completed: false },
      { id: '2', title: 'Update user documentation', priority: 'Medium', completed: false },
      { id: '3', title: 'Fix navigation bug', priority: 'High', completed: true },
      { id: '4', title: 'Implement dark mode', priority: 'Low', completed: false },
      { id: '5', title: 'Optimize database queries', priority: 'Medium', completed: false },
    ])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={tasks}
              onItemsChange={setTasks}
              getItemId={(task) => task.id}
              renderItem={(task) => (
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-[var(--color-surface-primary)]">
                  <Sortable.Handle />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-body-sm ${task.completed ? 'line-through text-[var(--color-text-secondary)]' : ''}`}>
                        {task.title}
                      </span>
                      <Badge className={`${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  {task.completed && (
                    <Icon name="check" size="sm" className="text-[var(--color-text-success-bold)]" />
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Team members with avatars
export const TeamMembers: Story = {
  render: () => {
    const [members, setMembers] = useState([
      { id: '1', name: 'Alice Johnson', role: 'Product Manager', avatar: '' },
      { id: '2', name: 'Bob Smith', role: 'Frontend Developer', avatar: '' },
      { id: '3', name: 'Carol Williams', role: 'Designer', avatar: '' },
      { id: '4', name: 'David Brown', role: 'Backend Developer', avatar: '' },
      { id: '5', name: 'Eva Davis', role: 'QA Engineer', avatar: '' },
    ])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Team Hierarchy</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={members}
              onItemsChange={setMembers}
              getItemId={(member) => member.id}
              renderItem={(member) => (
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-[var(--color-surface-primary)]">
                  <Sortable.Handle />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium">{member.name}</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">{member.role}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="more-horizontal" size="sm" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Horizontal navigation tabs
export const HorizontalTabs: Story = {
  render: () => {
    const [tabs, setTabs] = useState([
      'Dashboard',
      'Analytics',
      'Users',
      'Settings',
      'Reports'
    ])
    
    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Sortable Navigation Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={tabs}
              onItemsChange={setTabs}
              orientation="horizontal"
              renderItem={(tab) => (
                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-[var(--color-surface-primary)] hover:bg-[var(--color-background-neutral-subtlest-hovered)] whitespace-nowrap">
                  <Sortable.Handle className="opacity-50 hover:opacity-100">
                    <Icon name="grip-horizontal" size="sm" />
                  </Sortable.Handle>
                  <span className="text-body-sm">{tab}</span>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Image gallery grid
export const ImageGallery: Story = {
  render: () => {
    const [images, setImages] = useState([
      { id: '1', name: 'Beach Sunset', color: 'bg-orange-200' },
      { id: '2', name: 'Mountain View', color: 'bg-green-200' },
      { id: '3', name: 'City Skyline', color: 'bg-blue-200' },
      { id: '4', name: 'Forest Path', color: 'bg-emerald-200' },
      { id: '5', name: 'Desert Dunes', color: 'bg-yellow-200' },
      { id: '6', name: 'Ocean Waves', color: 'bg-cyan-200' },
    ])
    
    return (
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <Sortable.Root
                items={images}
                onItemsChange={setImages}
                getItemId={(image) => image.id}
                orientation="grid"
                renderItem={(image) => (
                  <div className="relative aspect-square rounded-lg overflow-hidden group">
                    <div className={`w-full h-full ${image.color} flex items-center justify-center`}>
                      <Icon name="image" size="lg" className="text-white/70" />
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sortable.Handle className="absolute top-2 right-2 text-white">
                        <Icon name="move" size="sm" />
                      </Sortable.Handle>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                      <p className="text-caption-sm font-medium">{image.name}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Kanban board columns
export const KanbanBoard: Story = {
  render: () => {
    const [columns, setColumns] = useState([
      { id: '1', title: 'To Do', tasks: ['Research competitors', 'Write project brief'] },
      { id: '2', title: 'In Progress', tasks: ['Design mockups', 'Setup development environment'] },
      { id: '3', title: 'Review', tasks: ['Code review for PR #123'] },
      { id: '4', title: 'Done', tasks: ['Initial project setup', 'Team kickoff meeting'] },
    ])
    
    return (
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Kanban Board Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={columns}
              onItemsChange={setColumns}
              getItemId={(column) => column.id}
              orientation="horizontal"
              renderItem={(column) => (
                <div className="flex-1 min-w-0 border rounded-lg bg-[var(--color-surface-primary)]">
                  <div className="p-3 border-b bg-[var(--color-background-neutral-subtlest)]">
                    <div className="flex items-center gap-2">
                      <Sortable.Handle />
                      <h3 className="text-body-medium-sm font-medium">{column.title}</h3>
                      <Badge className="bg-gray-100 text-gray-800">{column.tasks.length}</Badge>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {column.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className="p-2 border rounded bg-[var(--color-surface-primary)] text-caption-sm"
                      >
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Playlist with songs
export const MusicPlaylist: Story = {
  render: () => {
    const [songs, setSongs] = useState([
      { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
      { id: '2', title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
      { id: '3', title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
      { id: '4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', duration: '5:03' },
      { id: '5', title: 'Imagine', artist: 'John Lennon', duration: '3:03' },
    ])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Playlist</CardTitle>
              <Badge>{songs.length} songs</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={songs}
              onItemsChange={setSongs}
              getItemId={(song) => song.id}
              renderItem={(song, index) => (
                <div className="flex items-center gap-3 p-2 rounded hover:bg-[var(--color-background-neutral-subtlest-hovered)] group">
                  <Sortable.Handle className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="grip-vertical" size="sm" />
                  </Sortable.Handle>
                  <div className="flex items-center justify-center w-8 h-8 bg-[var(--color-background-neutral-subtlest)] rounded text-caption-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium truncate">{song.title}</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)] truncate">{song.artist}</p>
                  </div>
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">
                    {song.duration}
                  </span>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                    <Icon name="play" size="sm" />
                  </Button>
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [items] = useState([
      'Item 1',
      'Item 2', 
      'Item 3',
      'Item 4'
    ])
    
    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Disabled Sortable List</CardTitle>
          </CardHeader>
          <CardContent>
            <Sortable.Root
              items={items}
              onItemsChange={() => {}} // No-op function
              disabled={true}
              renderItem={(item) => (
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-[var(--color-surface-primary)] opacity-50">
                  <Sortable.Handle />
                  <span className="text-body-sm">{item}</span>
                </div>
              )}
            />
            <p className="text-caption-sm text-[var(--color-text-secondary)] mt-3">
              Sorting is disabled for this list.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Dashboard widgets
export const DashboardWidgets: Story = {
  render: () => {
    const [widgets, setWidgets] = useState([
      { id: '1', title: 'Revenue Chart', type: 'chart', color: 'bg-blue-100' },
      { id: '2', title: 'User Analytics', type: 'stats', color: 'bg-green-100' },
      { id: '3', title: 'Recent Orders', type: 'table', color: 'bg-purple-100' },
      { id: '4', title: 'Performance Metrics', type: 'metrics', color: 'bg-orange-100' },
    ])
    
    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Layout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Sortable.Root
                items={widgets}
                onItemsChange={setWidgets}
                getItemId={(widget) => widget.id}
                orientation="grid"
                renderItem={(widget) => (
                  <div className="relative aspect-video border rounded-lg overflow-hidden group">
                    <div className={`w-full h-full ${widget.color} p-4 flex flex-col justify-between`}>
                      <div className="flex items-start justify-between">
                        <h3 className="text-body-medium-sm font-medium">{widget.title}</h3>
                        <Sortable.Handle className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="move" size="sm" />
                        </Sortable.Handle>
                      </div>
                      <div className="flex items-center justify-center flex-1">
                        <Icon 
                          name={
                            widget.type === 'chart' ? 'bar-chart' :
                            widget.type === 'stats' ? 'trending-up' :
                            widget.type === 'table' ? 'table' : 'activity'
                          } 
                          size="lg" 
                          className="text-black/30" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}