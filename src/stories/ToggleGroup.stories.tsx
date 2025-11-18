import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../components/fundamental/toggle-group'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Label } from '../components/fundamental/label'

const meta: Meta<typeof ToggleGroup> = {
  title: 'NPM • Fundamental/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether only one or multiple items can be selected',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle items',
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic toggle group
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('left')

    return (
      <div className="space-y-4">
        <div>
          <Label>Text Alignment</Label>
          <p className="text-body-sm text-[var(--color-text-secondary)]">Selected: {value || 'None'}</p>
        </div>
        <ToggleGroup type="single" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="left">
            <Icon name="align-left" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <Icon name="align-center" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <Icon name="align-right" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify">
            <Icon name="align-justify" size="sm" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    )
  },
}

// Multiple selection
export const MultipleSelection: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['bold'])

    return (
      <div className="space-y-4">
        <div>
          <Label>Text Formatting</Label>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Selected: {values.length > 0 ? values.join(', ') : 'None'}
          </p>
        </div>
        <ToggleGroup type="multiple" value={values} onValueChange={setValues}>
          <ToggleGroupItem value="bold">
            <Icon name="bold" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic">
            <Icon name="italic" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline">
            <Icon name="underline" size="sm" />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough">
            <Icon name="strikethrough" size="sm" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState<string>('option1')
    const [mediumValue, setMediumValue] = useState<string>('option2')
    const [largeValue, setLargeValue] = useState<string>('option3')

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Small Size</Label>
          <ToggleGroup type="single" size="sm" value={smallValue} onValueChange={setSmallValue}>
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
            <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
            <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Medium Size (Default)</Label>
          <ToggleGroup type="single" size="md" value={mediumValue} onValueChange={setMediumValue}>
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
            <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
            <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Large Size</Label>
          <ToggleGroup type="single" size="lg" value={largeValue} onValueChange={setLargeValue}>
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
            <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
            <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    )
  },
}

// Different variants
export const Variants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState<string>('option1')
    const [outlineValue, setOutlineValue] = useState<string>('option2')

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Default Variant</Label>
          <ToggleGroup type="single" value={defaultValue} onValueChange={setDefaultValue}>
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
            <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
            <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label>Outline Variant</Label>
          <ToggleGroup type="single" variant="outline" value={outlineValue} onValueChange={setOutlineValue}>
            <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
            <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
            <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    )
  },
}

// Text editor toolbar
export const TextEditorToolbar: Story = {
  render: () => {
    const [alignment, setAlignment] = useState<string>('left')
    const [formatting, setFormatting] = useState<string[]>(['bold'])
    const [fontSize, setFontSize] = useState<string>('medium')
    const [listType, setListType] = useState<string>('')

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Text Editor Toolbar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Font size */}
              <div className="space-y-2">
                <Label className="text-xs">Font Size</Label>
                <ToggleGroup type="single" size="sm" value={fontSize} onValueChange={setFontSize}>
                  <ToggleGroupItem value="small">
                    <Icon name="type" size="sm" className="scale-75" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="medium">
                    <Icon name="type" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="large">
                    <Icon name="type" size="sm" className="scale-125" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Text formatting */}
              <div className="space-y-2">
                <Label className="text-xs">Formatting</Label>
                <ToggleGroup type="multiple" size="sm" value={formatting} onValueChange={setFormatting}>
                  <ToggleGroupItem value="bold">
                    <Icon name="bold" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic">
                    <Icon name="italic" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline">
                    <Icon name="underline" size="sm" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Text alignment */}
              <div className="space-y-2">
                <Label className="text-xs">Alignment</Label>
                <ToggleGroup type="single" size="sm" value={alignment} onValueChange={setAlignment}>
                  <ToggleGroupItem value="left">
                    <Icon name="align-left" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center">
                    <Icon name="align-center" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right">
                    <Icon name="align-right" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="justify">
                    <Icon name="align-justify" size="sm" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Lists */}
              <div className="space-y-2">
                <Label className="text-xs">Lists</Label>
                <ToggleGroup type="single" size="sm" value={listType} onValueChange={setListType}>
                  <ToggleGroupItem value="bullet">
                    <Icon name="list" size="sm" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="numbered">
                    <Icon name="list-ordered" size="sm" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <Label className="text-xs">Preview</Label>
              <div 
                className={`mt-2 p-4 border border-[var(--color-border-primary-subtle)] rounded-md min-h-24 ${
                  alignment === 'left' ? 'text-left' :
                  alignment === 'center' ? 'text-center' :
                  alignment === 'right' ? 'text-right' :
                  alignment === 'justify' ? 'text-justify' : 'text-left'
                } ${
                  fontSize === 'small' ? 'text-sm' :
                  fontSize === 'large' ? 'text-lg' : 'text-base'
                } ${formatting.includes('bold') ? 'font-bold' : ''} ${
                  formatting.includes('italic') ? 'italic' : ''
                } ${formatting.includes('underline') ? 'underline' : ''}`}
              >
                {listType === 'bullet' ? (
                  <ul className="list-disc list-inside">
                    <li>Sample bullet point text</li>
                    <li>Another bullet point</li>
                  </ul>
                ) : listType === 'numbered' ? (
                  <ol className="list-decimal list-inside">
                    <li>First numbered item</li>
                    <li>Second numbered item</li>
                  </ol>
                ) : (
                  'Sample text with selected formatting and alignment applied.'
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// View mode selector
export const ViewModeSelector: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<string>('grid')

    const getItemCount = () => {
      switch (viewMode) {
        case 'list': return 15
        case 'grid': return 12
        case 'card': return 8
        default: return 0
      }
    }

    return (
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              View Options
              <Badge appearance="outline">{getItemCount()} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Mode</Label>
              <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                <ToggleGroupItem value="list">
                  <Icon name="list" size="sm" />
                  <span className="ml-2">List</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="grid">
                  <Icon name="grid-3x3" size="sm" />
                  <span className="ml-2">Grid</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="card">
                  <Icon name="credit-card" size="sm" />
                  <span className="ml-2">Cards</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Preview */}
            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <Label className="text-xs mb-2 block">Preview</Label>
              <div className="border border-[var(--color-border-primary-subtle)] rounded-md p-4 min-h-32">
                {viewMode === 'list' && (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-[var(--color-background-neutral-subtle)] rounded">
                        <div className="w-6 h-6 bg-[var(--color-background-brand)] rounded"></div>
                        <span className="text-sm">List item {i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="aspect-square bg-[var(--color-background-neutral-subtle)] rounded flex items-center justify-center">
                        <span className="text-xs">Item {i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {viewMode === 'card' && (
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 2 }, (_, i) => (
                      <div key={i} className="p-3 bg-[var(--color-background-neutral-subtle)] rounded">
                        <div className="w-full h-16 bg-[var(--color-background-brand)] rounded mb-2"></div>
                        <span className="text-xs">Card {i + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Filter options
export const FilterOptions: Story = {
  render: () => {
    const [status, setStatus] = useState<string[]>(['active'])
    const [category, setCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('name')

    const getFilteredCount = () => {
      // Simulate filtering logic
      let count = 100
      if (status.length < 3) count = Math.floor(count * 0.7)
      if (category !== 'all') count = Math.floor(count * 0.6)
      return count
    }

    return (
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Filter & Sort
              <Badge>{getFilteredCount()} results</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Status (Multiple)</Label>
              <ToggleGroup type="multiple" size="sm" value={status} onValueChange={setStatus}>
                <ToggleGroupItem value="active">
                  <Icon name="check-circle" size="sm" className="mr-2" />
                  Active
                </ToggleGroupItem>
                <ToggleGroupItem value="pending">
                  <Icon name="clock" size="sm" className="mr-2" />
                  Pending
                </ToggleGroupItem>
                <ToggleGroupItem value="inactive">
                  <Icon name="x-circle" size="sm" className="mr-2" />
                  Inactive
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <ToggleGroup type="single" size="sm" value={category} onValueChange={setCategory}>
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="design">Design</ToggleGroupItem>
                <ToggleGroupItem value="development">Dev</ToggleGroupItem>
                <ToggleGroupItem value="marketing">Marketing</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <ToggleGroup type="single" size="sm" value={sortBy} onValueChange={setSortBy}>
                <ToggleGroupItem value="name">
                  <Icon name="type" size="sm" className="mr-2" />
                  Name
                </ToggleGroupItem>
                <ToggleGroupItem value="date">
                  <Icon name="calendar" size="sm" className="mr-2" />
                  Date
                </ToggleGroupItem>
                <ToggleGroupItem value="priority">
                  <Icon name="flag" size="sm" className="mr-2" />
                  Priority
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <div className="text-body-sm space-y-1">
                <div><strong>Applied Filters:</strong></div>
                <div>Status: {status.length > 0 ? status.join(', ') : 'None'}</div>
                <div>Category: {category}</div>
                <div>Sort: {sortBy}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Chart type selector
export const ChartTypeSelector: Story = {
  render: () => {
    const [chartType, setChartType] = useState<string>('bar')
    const [timeRange, setTimeRange] = useState<string>('7d')
    const [dataPoints, setDataPoints] = useState<string[]>(['revenue', 'users'])

    return (
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Chart Type</Label>
              <ToggleGroup type="single" value={chartType} onValueChange={setChartType}>
                <ToggleGroupItem value="line">
                  <Icon name="trending-up" size="sm" />
                </ToggleGroupItem>
                <ToggleGroupItem value="bar">
                  <Icon name="bar-chart" size="sm" />
                </ToggleGroupItem>
                <ToggleGroupItem value="pie">
                  <Icon name="pie-chart" size="sm" />
                </ToggleGroupItem>
                <ToggleGroupItem value="area">
                  <Icon name="activity" size="sm" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Time Range</Label>
              <ToggleGroup type="single" size="sm" value={timeRange} onValueChange={setTimeRange}>
                <ToggleGroupItem value="24h">24h</ToggleGroupItem>
                <ToggleGroupItem value="7d">7d</ToggleGroupItem>
                <ToggleGroupItem value="30d">30d</ToggleGroupItem>
                <ToggleGroupItem value="90d">90d</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Data Points</Label>
              <ToggleGroup type="multiple" size="sm" value={dataPoints} onValueChange={setDataPoints}>
                <ToggleGroupItem value="revenue">
                  <Icon name="dollar-sign" size="sm" className="mr-1" />
                  Revenue
                </ToggleGroupItem>
                <ToggleGroupItem value="users">
                  <Icon name="users" size="sm" className="mr-1" />
                  Users
                </ToggleGroupItem>
                <ToggleGroupItem value="sessions">
                  <Icon name="activity" size="sm" className="mr-1" />
                  Sessions
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Chart preview placeholder */}
            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <Label className="text-xs mb-2 block">Chart Preview</Label>
              <div className="border border-[var(--color-border-primary-subtle)] rounded-md p-4 h-32 flex items-center justify-center bg-[var(--color-background-neutral-subtle)]">
                <div className="text-center text-[var(--color-text-secondary)]">
                  <Icon name={
                    chartType === 'line' ? 'trending-up' :
                    chartType === 'bar' ? 'bar-chart' :
                    chartType === 'pie' ? 'pie-chart' : 'activity'
                  } size="lg" className="mx-auto mb-2" />
                  <div className="text-sm">{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</div>
                  <div className="text-xs">{timeRange} • {dataPoints.length} metrics</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Column display toggles - matching Figma design
export const ColumnDisplayToggles: Story = {
  render: () => {
    const [selectedColumns, setSelectedColumns] = useState<string[]>([
      'laycan-year', 'laycan-month', 'fixture-count', 'cargo-count',
      'gross-freight', 'avg-freight-rate', 'avg-demurrage'
    ])

    return (
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Table View Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-label-sm text-[var(--color-text-tertiary)]">Display columns</Label>
              <ToggleGroup
                type="multiple"
                variant="outline"
                size="sm"
                value={selectedColumns}
                onValueChange={setSelectedColumns}
                className="flex-wrap justify-start"
              >
                <ToggleGroupItem value="laycan-year">Laycan year</ToggleGroupItem>
                <ToggleGroupItem value="laycan-month">Laycan month</ToggleGroupItem>
                <ToggleGroupItem value="fixture-count">Fixture count</ToggleGroupItem>
                <ToggleGroupItem value="cargo-count">Cargo count</ToggleGroupItem>
                <ToggleGroupItem value="gross-freight">Gross freight</ToggleGroupItem>
                <ToggleGroupItem value="avg-freight-rate">Avg. freight rate</ToggleGroupItem>
                <ToggleGroupItem value="avg-demurrage">Avg. demurrage</ToggleGroupItem>
                <ToggleGroupItem value="hidden-property">Hidden property</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <div className="text-body-sm space-y-1">
                <div><strong>Visible columns:</strong> {selectedColumns.length}</div>
                <div className="text-[var(--color-text-secondary)]">
                  {selectedColumns.length > 0
                    ? selectedColumns.map(col => col.replace('-', ' ')).join(', ')
                    : 'No columns selected'
                  }
                </div>
              </div>
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
    const [isEnabled, setIsEnabled] = useState(false)
    const [value, setValue] = useState<string>('option1')

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="rounded"
          />
          <Label>Enable toggle group</Label>
        </div>
        
        <div className="space-y-2">
          <Label className={isEnabled ? '' : 'text-[var(--color-text-disabled)]'}>
            Options
          </Label>
          <ToggleGroup 
            type="single" 
            value={isEnabled ? value : ''}
            onValueChange={isEnabled ? setValue : undefined}
            disabled={!isEnabled}
          >
            <ToggleGroupItem value="option1" disabled={!isEnabled}>
              Option 1
            </ToggleGroupItem>
            <ToggleGroupItem value="option2" disabled={!isEnabled}>
              Option 2
            </ToggleGroupItem>
            <ToggleGroupItem value="option3" disabled={!isEnabled}>
              Option 3
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    )
  },
}