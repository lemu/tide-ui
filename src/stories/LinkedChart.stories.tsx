import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { LinkedChart, createLinkedChartColumns } from '../components/ui/linked-chart'
import { ChartDataPoint, ChartConfig } from '../components/ui/chart'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const meta: Meta<typeof LinkedChart> = {
  title: 'Done/LinkedChart',
  component: LinkedChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkedChart>

export default meta
type Story = StoryObj<typeof meta>

// Sales performance tracking
export const SalesPerformance: Story = {
  render: () => {
    const [filteredData, setFilteredData] = useState<ChartDataPoint[]>([])
    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const salesData: ChartDataPoint[] = [
      { name: 'John Smith', sales: 125000, calls: 340, meetings: 45, region: 'North', performance: 112 },
      { name: 'Sarah Johnson', sales: 145000, calls: 420, meetings: 52, region: 'South', performance: 128 },
      { name: 'Mike Davis', sales: 98000, calls: 280, meetings: 38, region: 'East', performance: 87 },
      { name: 'Lisa Chen', sales: 167000, calls: 380, meetings: 58, region: 'West', performance: 145 },
      { name: 'David Wilson', sales: 134000, calls: 360, meetings: 49, region: 'North', performance: 118 },
      { name: 'Emma Brown', sales: 156000, calls: 400, meetings: 55, region: 'South', performance: 138 },
      { name: 'Alex Rodriguez', sales: 112000, calls: 320, meetings: 42, region: 'East', performance: 98 },
      { name: 'Jennifer Lee', sales: 189000, calls: 450, meetings: 65, region: 'West', performance: 165 },
    ]

    const chartConfig: ChartConfig = {
      sales: {
        label: 'Sales ($)',
        color: 'var(--color-chart-bar-1)',
      },
      calls: {
        label: 'Calls Made',
        color: 'var(--color-chart-bar-2)',
      },
      meetings: {
        label: 'Meetings',
        color: 'var(--color-chart-bar-3)',
      },
    }

    const columns = createLinkedChartColumns(chartConfig, [
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'performance', label: 'Performance %', type: 'percentage' },
    ])

    const getMetrics = () => {
      const totalSales = salesData.reduce((sum, rep) => sum + rep.sales, 0)
      const avgPerformance = salesData.reduce((sum, rep) => sum + rep.performance, 0) / salesData.length
      const topPerformer = salesData.reduce((top, rep) => rep.sales > top.sales ? rep : top)
      
      return {
        totalSales,
        avgPerformance: Math.round(avgPerformance),
        topPerformer: topPerformer.name,
      }
    }

    const metrics = getMetrics()

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-heading-lg font-semibold mb-2">Q4 Sales Performance Dashboard</h2>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Interactive analysis of sales team performance and activity metrics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                ${(metrics.totalSales / 1000).toFixed(0)}k
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Total Sales
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                {metrics.avgPerformance}%
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Avg Performance
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                {metrics.topPerformer}
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Top Performer
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Chart and Table */}
        <LinkedChart
          title="Sales Team Performance Analysis"
          description="Click chart data points to filter the table, select table rows to highlight team members"
          data={salesData}
          config={chartConfig}
          columns={columns}
          type="bar"
          enableFiltering={true}
          enableRowSelection={true}
          onDataFilter={setFilteredData}
          onRowSelectionChange={setSelectedRows}
          showTable={true}
        />

        {/* Action Panel */}
        {(filteredData.length > 0 || selectedRows.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedRows.length > 0 && (
                  <>
                    <Button size="sm">
                      <Icon name="mail" size="sm" className="mr-1" />
                      Email Selected ({selectedRows.length})
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="calendar" size="sm" className="mr-1" />
                      Schedule Review
                    </Button>
                  </>
                )}
                {filteredData.length > 0 && (
                  <Button size="sm" variant="ghost">
                    <Icon name="download" size="sm" className="mr-1" />
                    Export Filtered Data
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  },
}

// Revenue analytics with multiple metrics
export const RevenueAnalytics: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<'bar' | 'line'>('bar')

    const revenueData: ChartDataPoint[] = [
      { name: 'January', revenue: 145000, expenses: 89000, profit: 56000, growth: 12 },
      { name: 'February', revenue: 158000, expenses: 94000, profit: 64000, growth: 15 },
      { name: 'March', revenue: 172000, expenses: 98000, profit: 74000, growth: 18 },
      { name: 'April', revenue: 167000, expenses: 96000, profit: 71000, growth: 16 },
      { name: 'May', revenue: 189000, expenses: 105000, profit: 84000, growth: 22 },
      { name: 'June', revenue: 203000, expenses: 112000, profit: 91000, growth: 25 },
      { name: 'July', revenue: 195000, expenses: 108000, profit: 87000, growth: 23 },
      { name: 'August', revenue: 221000, expenses: 118000, profit: 103000, growth: 28 },
      { name: 'September', revenue: 234000, expenses: 125000, profit: 109000, growth: 31 },
      { name: 'October', revenue: 245000, expenses: 130000, profit: 115000, growth: 33 },
      { name: 'November', revenue: 267000, expenses: 138000, profit: 129000, growth: 38 },
      { name: 'December', revenue: 289000, expenses: 145000, profit: 144000, growth: 42 },
    ]

    const chartConfig: ChartConfig = {
      revenue: {
        label: 'Revenue',
        color: 'var(--color-chart-bar-1)',
      },
      expenses: {
        label: 'Expenses',
        color: 'var(--color-chart-bar-2)',
      },
      profit: {
        label: 'Profit',
        color: 'var(--color-chart-bar-3)',
      },
    }

    const columns = createLinkedChartColumns(chartConfig, [
      { key: 'growth', label: 'Growth %', type: 'percentage' },
      { 
        key: 'margin', 
        label: 'Profit Margin', 
        type: 'percentage',
        format: (value: any, row: any) => {
          const margin = Math.round((row.profit / row.revenue) * 100)
          return `${margin}%`
        }
      },
    ])

    const yearOverYear = revenueData.map((month, index) => {
      const lastYear = Math.round(month.revenue * 0.85) // Simulated last year data
      const growth = Math.round(((month.revenue - lastYear) / lastYear) * 100)
      return { ...month, lastYearRevenue: lastYear, yoyGrowth: growth }
    })

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-lg font-semibold">2024 Revenue Analytics</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Monthly financial performance with interactive filtering
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === 'bar' ? 'default' : 'ghost'}
              onClick={() => setViewMode('bar')}
            >
              Bar Chart
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'line' ? 'default' : 'ghost'}
              onClick={() => setViewMode('line')}
            >
              Line Chart
            </Button>
          </div>
        </div>

        <LinkedChart
          data={revenueData}
          config={chartConfig}
          columns={columns}
          type={viewMode}
          enableFiltering={true}
          enableRowSelection={true}
          showTable={true}
        />

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">Best Month</Badge>
                <span className="text-body-sm">December - $289k revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Highest Growth</Badge>
                <span className="text-body-sm">November - 38% growth</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Avg Margin</Badge>
                <span className="text-body-sm">42% profit margin</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="download" size="sm" className="mr-2" />
                Export to CSV
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="file-text" size="sm" className="mr-2" />
                Generate Report
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="share" size="sm" className="mr-2" />
                Share Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

// Product performance comparison
export const ProductComparison: Story = {
  render: () => {
    const [selectedQuarter, setSelectedQuarter] = useState('Q4')

    const productData: ChartDataPoint[] = [
      { name: 'Product A', sales: 89000, units: 1200, rating: 4.5, category: 'Electronics' },
      { name: 'Product B', sales: 156000, units: 890, rating: 4.8, category: 'Software' },
      { name: 'Product C', sales: 134000, units: 2100, rating: 4.2, category: 'Electronics' },
      { name: 'Product D', sales: 67000, units: 450, rating: 4.6, category: 'Software' },
      { name: 'Product E', sales: 198000, units: 780, rating: 4.9, category: 'Premium' },
      { name: 'Product F', sales: 112000, units: 1650, rating: 4.1, category: 'Electronics' },
      { name: 'Product G', sales: 234000, units: 920, rating: 4.7, category: 'Premium' },
    ]

    const chartConfig: ChartConfig = {
      sales: {
        label: 'Sales Revenue',
        color: 'var(--color-chart-bar-1)',
      },
      units: {
        label: 'Units Sold',
        color: 'var(--color-chart-bar-2)',
      },
    }

    const columns = createLinkedChartColumns(chartConfig, [
      { key: 'category', label: 'Category', type: 'text' },
      { 
        key: 'rating', 
        label: 'Rating', 
        format: (value: number) => `${value}/5.0 ⭐`
      },
      { 
        key: 'avgPrice', 
        label: 'Avg Price', 
        type: 'currency',
        format: (value: any, row: any) => `$${Math.round(row.sales / row.units)}`
      },
    ])

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-lg font-semibold">Product Performance Analysis</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Compare product sales, units sold, and customer ratings
            </p>
          </div>
          <div className="flex gap-2">
            {quarters.map((quarter) => (
              <Button
                key={quarter}
                size="sm"
                variant={selectedQuarter === quarter ? 'default' : 'ghost'}
                onClick={() => setSelectedQuarter(quarter)}
              >
                {quarter}
              </Button>
            ))}
          </div>
        </div>

        <LinkedChart
          title={`${selectedQuarter} Product Performance`}
          description="Interactive product comparison - click data points to filter, select rows to compare products"
          data={productData}
          config={chartConfig}
          columns={columns}
          type="bar"
          enableFiltering={true}
          enableRowSelection={true}
          showTable={true}
        />

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Electronics', 'Software', 'Premium'].map((category) => {
                const categoryProducts = productData.filter(p => p.category === category)
                const totalSales = categoryProducts.reduce((sum, p) => sum + p.sales, 0)
                const totalUnits = categoryProducts.reduce((sum, p) => sum + p.units, 0)
                const avgRating = categoryProducts.reduce((sum, p) => sum + p.rating, 0) / categoryProducts.length

                return (
                  <div key={category} className="p-4 border border-[var(--color-border-primary-subtle)] rounded-md">
                    <h4 className="text-body-medium-sm font-medium mb-3">{category}</h4>
                    <div className="space-y-2 text-body-sm">
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium">${(totalSales / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Units:</span>
                        <span className="font-medium">{totalUnits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Rating:</span>
                        <span className="font-medium">{avgRating.toFixed(1)}/5.0</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Website traffic analytics
export const TrafficAnalytics: Story = {
  render: () => {
    const [timeRange, setTimeRange] = useState('7d')

    const trafficData: ChartDataPoint[] = [
      { name: 'Monday', pageviews: 15420, sessions: 8900, bounceRate: 32, avgTime: 185 },
      { name: 'Tuesday', pageviews: 18650, sessions: 10200, bounceRate: 28, avgTime: 210 },
      { name: 'Wednesday', pageviews: 21340, sessions: 12100, bounceRate: 25, avgTime: 245 },
      { name: 'Thursday', pageviews: 19870, sessions: 11500, bounceRate: 30, avgTime: 220 },
      { name: 'Friday', pageviews: 23450, sessions: 13800, bounceRate: 22, avgTime: 280 },
      { name: 'Saturday', pageviews: 16780, sessions: 9600, bounceRate: 35, avgTime: 195 },
      { name: 'Sunday', pageviews: 14200, sessions: 8200, bounceRate: 38, avgTime: 165 },
    ]

    const chartConfig: ChartConfig = {
      pageviews: {
        label: 'Page Views',
        color: 'var(--color-chart-line-1)',
      },
      sessions: {
        label: 'Sessions',
        color: 'var(--color-chart-line-2)',
      },
    }

    const columns = createLinkedChartColumns(chartConfig, [
      { key: 'bounceRate', label: 'Bounce Rate', type: 'percentage' },
      { 
        key: 'avgTime', 
        label: 'Avg Session Time', 
        format: (value: number) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`
      },
      {
        key: 'conversion',
        label: 'Conversion Rate',
        type: 'percentage',
        format: () => `${(Math.random() * 5 + 1).toFixed(1)}%` // Simulated conversion rate
      },
    ])

    const timeRanges = [
      { value: '24h', label: 'Last 24 Hours' },
      { value: '7d', label: 'Last 7 Days' },
      { value: '30d', label: 'Last 30 Days' },
      { value: '90d', label: 'Last 90 Days' },
    ]

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-heading-lg font-semibold">Website Traffic Analytics</h2>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Monitor visitor behavior and engagement metrics
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-[var(--color-border-input)] rounded px-3 py-2 text-body-sm"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <LinkedChart
          title="Daily Traffic Overview"
          description="Interactive traffic analysis - explore daily patterns and user engagement"
          data={trafficData}
          config={chartConfig}
          columns={columns}
          type="line"
          enableFiltering={true}
          enableRowSelection={true}
          showTable={true}
        />

        {/* Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { source: 'Organic Search', percentage: 45, change: '+12%' },
                  { source: 'Direct Traffic', percentage: 28, change: '+5%' },
                  { source: 'Social Media', percentage: 15, change: '+18%' },
                  { source: 'Referral Sites', percentage: 8, change: '-3%' },
                  { source: 'Email Marketing', percentage: 4, change: '+8%' },
                ].map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[var(--color-chart-line-1)]"></div>
                      <span className="text-body-sm">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm font-medium">{source.percentage}%</span>
                      <Badge 
                        variant={source.change.startsWith('+') ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {source.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2 p-3 bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] rounded-md">
                  <Icon name="check-circle" size="sm" color="success" />
                  <div>
                    <p className="text-body-sm font-medium">High Engagement</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">
                      Friday showed 25% increase in session duration
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 p-3 bg-[var(--color-background-warning-subtle)] border border-[var(--color-border-warning)] rounded-md">
                  <Icon name="alert-triangle" size="sm" color="warning" />
                  <div>
                    <p className="text-body-sm font-medium">Higher Bounce Rate</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">
                      Sunday bounce rate exceeded 35% threshold
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}

// Multiple charts linked to single data table
export const MultiChartDashboard: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [filteredData, setFilteredData] = useState<ChartDataPoint[]>([])
    const [activeChart, setActiveChart] = useState<'sales' | 'performance' | 'activity'>('sales')

    const teamData: ChartDataPoint[] = [
      { name: 'Alice Johnson', sales: 145000, calls: 420, meetings: 52, performance: 128, region: 'North', satisfaction: 4.8 },
      { name: 'Bob Smith', sales: 98000, calls: 280, meetings: 38, performance: 87, region: 'South', satisfaction: 4.2 },
      { name: 'Carol Davis', sales: 167000, calls: 380, meetings: 58, performance: 145, region: 'East', satisfaction: 4.9 },
      { name: 'David Wilson', sales: 134000, calls: 360, meetings: 49, performance: 118, region: 'West', satisfaction: 4.5 },
      { name: 'Emma Brown', sales: 156000, calls: 400, meetings: 55, performance: 138, region: 'North', satisfaction: 4.7 },
      { name: 'Frank Miller', sales: 112000, calls: 320, meetings: 42, performance: 98, region: 'South', satisfaction: 4.3 },
      { name: 'Grace Lee', sales: 189000, calls: 450, meetings: 65, performance: 165, region: 'East', satisfaction: 4.8 },
      { name: 'Henry Garcia', sales: 123000, calls: 340, meetings: 46, performance: 108, region: 'West', satisfaction: 4.4 },
    ]

    // Chart configurations for different views
    const salesConfig: ChartConfig = {
      sales: { label: 'Sales Revenue ($)', color: 'var(--color-chart-bar-1)' },
    }

    const performanceConfig: ChartConfig = {
      performance: { label: 'Performance Score', color: 'var(--color-chart-bar-2)' },
      satisfaction: { label: 'Customer Satisfaction', color: 'var(--color-chart-bar-3)' },
    }

    const activityConfig: ChartConfig = {
      calls: { label: 'Calls Made', color: 'var(--color-chart-bar-4)' },
      meetings: { label: 'Meetings Held', color: 'var(--color-chart-bar-5)' },
    }

    // Unified table columns showing all metrics
    const allColumns: LinkedChartColumn[] = [
      { key: 'name', label: 'Team Member', type: 'text' },
      { key: 'sales', label: 'Sales Revenue', type: 'currency' },
      { key: 'calls', label: 'Calls Made', type: 'number' },
      { key: 'meetings', label: 'Meetings', type: 'number' },
      { key: 'performance', label: 'Performance', type: 'number' },
      { key: 'region', label: 'Region', type: 'text' },
      { key: 'satisfaction', label: 'Satisfaction', format: (value: number) => `${value}/5.0 ⭐` },
      { 
        key: 'efficiency', 
        label: 'Sales/Call Ratio', 
        type: 'currency',
        format: (value: any, row: any) => `$${Math.round(row.sales / row.calls)}`
      },
    ]

    const getCurrentConfig = () => {
      switch (activeChart) {
        case 'sales': return salesConfig
        case 'performance': return performanceConfig
        case 'activity': return activityConfig
        default: return salesConfig
      }
    }

    const getChartTitle = () => {
      switch (activeChart) {
        case 'sales': return 'Sales Revenue by Team Member'
        case 'performance': return 'Performance & Satisfaction Scores'
        case 'activity': return 'Activity Metrics (Calls & Meetings)'
        default: return 'Team Performance'
      }
    }

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-heading-lg font-semibold mb-2">Multi-Chart Team Dashboard</h2>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Switch between different chart views while maintaining unified data table interactions
          </p>
        </div>

        {/* Chart Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant={activeChart === 'sales' ? 'default' : 'ghost'}
                onClick={() => setActiveChart('sales')}
              >
                <Icon name="dollar-sign" size="sm" className="mr-1" />
                Sales Revenue
              </Button>
              <Button
                size="sm"
                variant={activeChart === 'performance' ? 'default' : 'ghost'}
                onClick={() => setActiveChart('performance')}
              >
                <Icon name="trending-up" size="sm" className="mr-1" />
                Performance
              </Button>
              <Button
                size="sm"
                variant={activeChart === 'activity' ? 'default' : 'ghost'}
                onClick={() => setActiveChart('activity')}
              >
                <Icon name="phone" size="sm" className="mr-1" />
                Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Chart with Unified Data Table */}
        <LinkedChart
          title={getChartTitle()}
          description="All charts are linked to the same comprehensive data table below. Selections and filters persist across chart views. Select rows to see them highlighted or filtered in the chart above."
          data={teamData}
          config={getCurrentConfig()}
          columns={allColumns}
          type="bar"
          enableFiltering={true}
          enableRowSelection={true}
          chartFilterMode="highlight" // Start with highlight mode
          onDataFilter={setFilteredData}
          onRowSelectionChange={setSelectedRows}
          showTable={true}
        />

        {/* Summary Cards showing selected data insights */}
        {selectedRows.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                  {selectedRows.length}
                </div>
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Team Members Selected
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                  ${Math.round(teamData
                    .filter((_, i) => selectedRows.includes(i))
                    .reduce((sum, member) => sum + member.sales, 0) / 1000)}k
                </div>
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Combined Sales (Selected)
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                  {Math.round(teamData
                    .filter((_, i) => selectedRows.includes(i))
                    .reduce((sum, member) => sum + member.performance, 0) / selectedRows.length)}
                </div>
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Avg Performance (Selected)
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Panel */}
        {(filteredData.length > 0 || selectedRows.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle>Data Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedRows.length > 0 && (
                  <>
                    <Button size="sm">
                      <Icon name="mail" size="sm" className="mr-1" />
                      Message Selected ({selectedRows.length})
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="calendar" size="sm" className="mr-1" />
                      Schedule Team Meeting
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="award" size="sm" className="mr-1" />
                      Performance Review
                    </Button>
                  </>
                )}
                {filteredData.length > 0 && (
                  <Button size="sm" variant="ghost">
                    <Icon name="download" size="sm" className="mr-1" />
                    Export Filtered Data
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Info */}
        <Card className="border-[var(--color-border-success)]">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Icon name="lightbulb" size="sm" color="success" className="mt-1" />
              <div className="space-y-2 text-body-sm">
                <p className="font-medium text-[var(--color-text-primary)]">Multi-Chart Features:</p>
                <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                  <li>Switch between Sales, Performance, and Activity views</li>
                  <li>All charts share the same unified data table with full metrics</li>
                  <li>Row selections and filters persist across chart changes</li>
                  <li>Real-time summary calculations for selected team members</li>
                  <li>Comprehensive data export and team management actions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Financial dashboard with expense tracking
export const ExpenseTracking: Story = {
  render: () => {
    const expenseData: ChartDataPoint[] = [
      { name: 'Marketing', budget: 50000, spent: 47800, remaining: 2200, category: 'Growth' },
      { name: 'Technology', budget: 120000, spent: 89500, remaining: 30500, category: 'Operations' },
      { name: 'Personnel', budget: 450000, spent: 445000, remaining: 5000, category: 'Operations' },
      { name: 'Office Space', budget: 80000, spent: 80000, remaining: 0, category: 'Operations' },
      { name: 'Travel', budget: 25000, spent: 18400, remaining: 6600, category: 'Operations' },
      { name: 'Legal', budget: 35000, spent: 28900, remaining: 6100, category: 'Compliance' },
      { name: 'Insurance', budget: 45000, spent: 45000, remaining: 0, category: 'Compliance' },
    ]

    const chartConfig: ChartConfig = {
      budget: {
        label: 'Budget',
        color: 'var(--color-chart-bar-1)',
      },
      spent: {
        label: 'Spent',
        color: 'var(--color-chart-bar-2)',
      },
      remaining: {
        label: 'Remaining',
        color: 'var(--color-chart-bar-3)',
      },
    }

    const columns = createLinkedChartColumns(chartConfig, [
      { key: 'category', label: 'Category', type: 'text' },
      { 
        key: 'utilization', 
        label: 'Utilization', 
        type: 'percentage',
        format: (value: any, row: any) => `${Math.round((row.spent / row.budget) * 100)}%`
      },
    ])

    const getTotalMetrics = () => {
      const totalBudget = expenseData.reduce((sum, item) => sum + item.budget, 0)
      const totalSpent = expenseData.reduce((sum, item) => sum + item.spent, 0)
      const totalRemaining = expenseData.reduce((sum, item) => sum + item.remaining, 0)
      const utilization = Math.round((totalSpent / totalBudget) * 100)

      return { totalBudget, totalSpent, totalRemaining, utilization }
    }

    const metrics = getTotalMetrics()

    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-heading-lg font-semibold">2024 Budget Tracking</h2>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Department-wise budget allocation and expense monitoring
          </p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                ${(metrics.totalBudget / 1000).toFixed(0)}k
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Total Budget
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                ${(metrics.totalSpent / 1000).toFixed(0)}k
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Total Spent
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                ${(metrics.totalRemaining / 1000).toFixed(0)}k
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Remaining
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                {metrics.utilization}%
              </div>
              <div className="text-caption-sm text-[var(--color-text-secondary)]">
                Utilization
              </div>
            </CardContent>
          </Card>
        </div>

        <LinkedChart
          title="Department Budget Analysis"
          description="Track budget utilization across departments - click to filter by spending patterns"
          data={expenseData}
          config={chartConfig}
          columns={columns}
          type="bar"
          enableFiltering={true}
          enableRowSelection={true}
          showTable={true}
        />

        {/* Alerts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {expenseData
                .filter(item => (item.spent / item.budget) > 0.95)
                .map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-[var(--color-background-warning-subtle)] border border-[var(--color-border-warning)] rounded-md">
                    <Icon name="alert-triangle" size="sm" color="warning" />
                    <div>
                      <p className="text-body-sm font-medium">{item.name} - Near Budget Limit</p>
                      <p className="text-caption-sm text-[var(--color-text-secondary)]">
                        {Math.round((item.spent / item.budget) * 100)}% of budget utilized
                      </p>
                    </div>
                  </div>
                ))}
              
              {expenseData
                .filter(item => item.remaining === 0)
                .map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-[var(--color-background-error-subtle)] border border-[var(--color-border-error)] rounded-md">
                    <Icon name="alert-circle" size="sm" color="error" />
                    <div>
                      <p className="text-body-sm font-medium">{item.name} - Budget Exceeded</p>
                      <p className="text-caption-sm text-[var(--color-text-secondary)]">
                        No remaining budget for this department
                      </p>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="download" size="sm" className="mr-2" />
                Export Expense Report
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="plus" size="sm" className="mr-2" />
                Request Budget Adjustment
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="bell" size="sm" className="mr-2" />
                Set Budget Alerts
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Icon name="calendar" size="sm" className="mr-2" />
                Schedule Budget Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  },
}