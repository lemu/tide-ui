import type { Meta, StoryObj } from '@storybook/react'
import { Chart, generateChartColors, createChartConfig } from '../components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const meta: Meta<typeof Chart> = {
  title: 'npm/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['bar', 'horizontal-bar', 'line', 'scatter', 'composed'],
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['bar', 'line', 'scatter'],
    },
  },
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for different chart types
const monthlyData = [
  { name: 'Jan', value: 400, sales: 300, profit: 200 },
  { name: 'Feb', value: 300, sales: 450, profit: 280 },
  { name: 'Mar', value: 500, sales: 380, profit: 220 },
  { name: 'Apr', value: 280, sales: 520, profit: 350 },
  { name: 'May', value: 590, sales: 280, profit: 180 },
  { name: 'Jun', value: 320, sales: 650, profit: 400 },
]

const scatterData = [
  { x: 10, y: 30, value: 400 },
  { x: 30, y: 50, value: 300 },
  { x: 45, y: 80, value: 500 },
  { x: 60, y: 20, value: 280 },
  { x: 75, y: 70, value: 590 },
  { x: 90, y: 40, value: 320 },
]

export const BarChart: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="bar"
        data={monthlyData}
        config={createChartConfig({
          value: { label: 'Value', color: 'var(--color-chart-bar-1)' },
          sales: { label: 'Sales', color: 'var(--color-chart-bar-2)' },
        })}
        className="h-full"
      />
    </div>
  ),
}

export const HorizontalBarChart: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="horizontal-bar"
        data={monthlyData}
        config={createChartConfig({
          value: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
          sales: { label: 'Sales', color: 'var(--color-chart-line-2)' },
        })}
        className="h-full"
      />
    </div>
  ),
}

export const LineChart: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="line"
        data={monthlyData}
        config={createChartConfig({
          value: { label: 'Revenue', color: 'var(--color-chart-area-1)' },
          sales: { label: 'Sales', color: 'var(--color-chart-area-2)' },
          profit: { label: 'Profit', color: 'var(--color-chart-area-3)' },
        })}
        className="h-full"
      />
    </div>
  ),
}

export const ScatterChart: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="scatter"
        data={scatterData}
        config={createChartConfig({
          value: { label: 'Performance', color: 'var(--color-chart-scatter-1)' },
        })}
        className="h-full"
      />
    </div>
  ),
}

export const AreaCharts: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Area Charts - Stroke Removed</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Area charts now render without stroke borders for cleaner, more modern appearance.
          Perfect for showing filled regions and trend areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Area Chart */}
        <div>
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Single Area Series</h2>
          <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
            <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart
  type="composed"
  data={data}
  config={{
    revenue: {
      label: 'Revenue',
      type: 'area'
    }
  }}
/>`}
            </pre>
          </div>
          <div className="h-80 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
            <Chart
              type="composed"
              data={[
                { name: 'Jan', revenue: 4000 },
                { name: 'Feb', revenue: 3200 },
                { name: 'Mar', revenue: 5800 },
                { name: 'Apr', revenue: 4100 },
                { name: 'May', revenue: 6200 },
                { name: 'Jun', revenue: 5500 },
              ]}
              config={createChartConfig({
                revenue: { label: 'Revenue ($)', type: 'area', color: 'var(--color-chart-area-1)' },
              })}
              yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              className="h-full"
            />
          </div>
          <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Clean filled area without border stroke</p>
        </div>

        {/* Multiple Area Charts */}
        <div>
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Multiple Overlapping Areas</h2>
          <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
            <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`config={{
  mobile: { label: 'Mobile', type: 'area' },
  desktop: { label: 'Desktop', type: 'area' },
  tablet: { label: 'Tablet', type: 'area' }
}}`}
            </pre>
          </div>
          <div className="h-80 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
            <Chart
              type="composed"
              data={[
                { name: 'Jan', mobile: 2000, desktop: 1500, tablet: 500 },
                { name: 'Feb', mobile: 2200, desktop: 1300, tablet: 700 },
                { name: 'Mar', mobile: 2800, desktop: 1800, tablet: 600 },
                { name: 'Apr', mobile: 2100, desktop: 1600, tablet: 800 },
                { name: 'May', mobile: 3200, desktop: 2000, tablet: 900 },
                { name: 'Jun', mobile: 2900, desktop: 1900, tablet: 650 },
              ]}
              config={createChartConfig({
                mobile: { label: 'Mobile Users', type: 'area', color: 'var(--color-chart-area-1)' },
                desktop: { label: 'Desktop Users', type: 'area', color: 'var(--color-chart-area-2)' },
                tablet: { label: 'Tablet Users', type: 'area', color: 'var(--color-chart-area-3)' },
              })}
              className="h-full"
            />
          </div>
          <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Smooth overlapping areas with transparency</p>
        </div>
      </div>

      {/* Mixed Chart Type */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Mixed Chart: Area + Line + Bar</h2>
        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
          <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`config={{
  background: { label: 'Market Size', type: 'area' },
  target: { label: 'Target', type: 'line' },
  actual: { label: 'Actual Sales', type: 'bar' }
}}`}
          </pre>
        </div>
        <div className="h-96 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
          <Chart
            type="composed"
            data={[
              { name: 'Q1', background: 8000, target: 3500, actual: 4000 },
              { name: 'Q2', background: 8500, target: 4000, actual: 5000 },
              { name: 'Q3', background: 9000, target: 4500, actual: 4500 },
              { name: 'Q4', background: 9500, target: 5000, actual: 6000 },
            ]}
            config={createChartConfig({
              background: { label: 'Market Size', type: 'area', color: 'var(--color-chart-area-4)' },
              target: { label: 'Target', type: 'line', color: 'var(--color-chart-line-2)' },
              actual: { label: 'Actual Sales', type: 'bar', color: 'var(--color-chart-bar-1)' },
            })}
            yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            className="h-full"
          />
        </div>
        <p className="text-body-xsm text-[var(--color-text-info)] mt-2">💡 Area provides context background, line shows targets, bars show actuals</p>
      </div>

      {/* Native AreaChart Example */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Temperature Range Area Chart</h2>
        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
          <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Temperature range area chart with array data
const rangeData = [
  { "name": "05-01", "temperature": [-1, 10] },
  { "name": "05-02", "temperature": [2, 15] },
  { "name": "05-03", "temperature": [3, 12] },
  // ... more data
];

<Chart
  type="composed"
  data={rangeData}
  config={{
    temperature: {
      label: 'Temperature Range (°C)',
      type: 'range-area',  // New range-area type
      stroke: 'none',      // Remove stroke
      fill: '#8884d8'      // Custom fill color
    }
  }}
  className="h-full"
/>`}
          </pre>
        </div>
        <div className="h-80 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden p-4 bg-white">
          <Chart
            type="composed"
            data={[
              { "name": "05-01", "temperature": [-1, 10] },
              { "name": "05-02", "temperature": [2, 15] },
              { "name": "05-03", "temperature": [3, 12] },
              { "name": "05-04", "temperature": [4, 12] },
              { "name": "05-05", "temperature": [12, 16] },
              { "name": "05-06", "temperature": [5, 16] },
              { "name": "05-07", "temperature": [3, 12] },
              { "name": "05-08", "temperature": [0, 8] },
              { "name": "05-09", "temperature": [-3, 5] }
            ]}
            config={createChartConfig({
              temperature: {
                label: 'Temperature Range (°C)',
                type: 'range-area',
                stroke: 'none',
                fill: '#8884d8'
              },
            })}
            className="h-full"
          />
        </div>
        <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Chart component with custom stroke and fill - temperature range data with clean filled area</p>
      </div>


      {/* Benefits Info */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">🎨 Area Chart Benefits</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Visual Improvements</h4>
            <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
              <li><strong>No border lines</strong> - Cleaner, modern appearance</li>
              <li><strong>Smooth filled regions</strong> - Better for trend visualization</li>
              <li><strong>Translucent overlays</strong> - Perfect for layered data</li>
              <li><strong>Focus on data</strong> - Less visual noise</li>
            </ul>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Best Use Cases</h4>
            <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
              <li><strong>Time series data</strong> - Revenue, users, metrics over time</li>
              <li><strong>Cumulative values</strong> - Total sales, growth areas</li>
              <li><strong>Background context</strong> - Market size, capacity, ranges</li>
              <li><strong>Multi-layer analysis</strong> - Different user segments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MultiDataBarChart: Story = {
  render: () => (
    <div className="w-[700px] h-[450px]">
      <Chart
        type="bar"
        data={monthlyData}
        config={createChartConfig({
          value: { label: 'Revenue ($)', color: generateChartColors('bar')[0] },
          sales: { label: 'Units Sold', color: generateChartColors('bar')[1] },
          profit: { label: 'Profit ($)', color: generateChartColors('bar')[2] },
        })}
        className="h-full"
      />
    </div>
  ),
}

export const ColorSchemesShowcase: Story = {
  render: () => (
    <div className="space-y-8 w-full">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bar Chart Color Scheme</h3>
        <div className="w-[500px] h-[300px]">
          <Chart
            type="bar"
            data={monthlyData.slice(0, 4)}
            config={createChartConfig({
              value: { label: 'Q1', color: generateChartColors('bar')[0] },
              sales: { label: 'Q2', color: generateChartColors('bar')[1] },
            })}
            colorScheme="bar"
            className="h-full"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Line Chart Color Scheme</h3>
        <div className="w-[500px] h-[300px]">
          <Chart
            type="line"
            data={monthlyData.slice(0, 4)}
            config={createChartConfig({
              value: { label: 'Growth', color: generateChartColors('line')[0] },
              sales: { label: 'Target', color: generateChartColors('line')[1] },
            })}
            colorScheme="line"
            className="h-full"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Scatter Chart Color Scheme</h3>
        <div className="w-[500px] h-[300px]">
          <Chart
            type="scatter"
            data={scatterData.slice(0, 4)}
            config={createChartConfig({
              value: { label: 'Distribution', color: generateChartColors('scatter')[0] },
            })}
            colorScheme="scatter"
            className="h-full"
          />
        </div>
      </div>
    </div>
  ),
}

export const ResponsiveChart: Story = {
  render: () => (
    <div className="w-full max-w-5xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="h-64 min-w-0">
          <h4 className="text-sm font-medium mb-2">Revenue Trend</h4>
          <Chart
            type="line"
            data={monthlyData}
            config={createChartConfig({
              value: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
            })}
            className="h-full"
          />
        </div>
        
        <div className="h-64 min-w-0">
          <h4 className="text-sm font-medium mb-2">Sales vs Profit</h4>
          <Chart
            type="bar"
            data={monthlyData}
            config={createChartConfig({
              sales: { label: 'Sales', color: 'var(--color-chart-bar-1)' },
              profit: { label: 'Profit', color: 'var(--color-chart-bar-2)' },
            })}
            className="h-full"
          />
        </div>
      </div>
    </div>
  ),
}

export const DashboardCharts: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 h-80">
          <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
          <Chart
            type="line"
            data={monthlyData}
            config={createChartConfig({
              value: { label: 'Revenue', color: generateChartColors('line')[0] },
              sales: { label: 'Sales', color: generateChartColors('line')[1] },
              profit: { label: 'Profit', color: generateChartColors('line')[2] },
            })}
            className="h-full"
          />
        </div>

        <div className="xl:col-span-2 h-80">
          <h3 className="text-lg font-semibold mb-4">Distribution</h3>
          <Chart
            type="scatter"
            data={scatterData}
            config={createChartConfig({
              value: { label: 'Performance', color: generateChartColors('scatter')[0] },
            })}
            className="h-full"
          />
        </div>
      </div>

      <div className="h-64">
        <h3 className="text-lg font-semibold mb-4">Quarterly Comparison</h3>
        <Chart
          type="horizontal-bar"
          data={monthlyData}
          config={createChartConfig({
            value: { label: 'Q1 Revenue', color: generateChartColors('bar')[0] },
            sales: { label: 'Q2 Revenue', color: generateChartColors('bar')[1] },
            profit: { label: 'Q3 Revenue', color: generateChartColors('bar')[2] },
          })}
          className="h-full"
        />
      </div>
    </div>
  ),
}

export const DataConfigurationGuide: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Chart Data Configuration Guide</h1>

        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Quick Reference</h2>
          <div className="text-body-sm text-[var(--color-text-secondary)] space-y-2">
            <p><strong>Required Props:</strong> <code>type</code>, <code>data</code>, <code>config</code></p>
            <p><strong>Data Key:</strong> Must include <code>name</code> field for X-axis labels (except scatter charts)</p>
            <p><strong>Scatter Charts:</strong> Must include <code>x</code> and <code>y</code> fields</p>
            <p><strong>Colors:</strong> Auto-assigned by chart type, or specify custom colors in config</p>
          </div>
        </div>
      </div>

      {/* 1. Basic Data Structure Examples */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">1. Data Structure Examples</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Bar/Line Chart Data</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`const data = [
  { name: 'Jan', revenue: 4000, sales: 240 },
  { name: 'Feb', revenue: 3000, sales: 139 },
  { name: 'Mar', revenue: 5000, sales: 280 },
]`}
              </pre>
            </div>
            <div className="mt-[var(--space-sm)] h-64">
              <Chart
                type="bar"
                data={[
                  { name: 'Jan', revenue: 4000, sales: 240 },
                  { name: 'Feb', revenue: 3000, sales: 139 },
                  { name: 'Mar', revenue: 5000, sales: 280 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue ($)' },
                  sales: { label: 'Sales Units' },
                })}
                className="h-full"
              />
            </div>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Scatter Chart Data</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`const data = [
  { x: 10, y: 30, performance: 85 },
  { x: 30, y: 50, performance: 92 },
  { x: 45, y: 80, performance: 78 },
]`}
              </pre>
            </div>
            <div className="mt-[var(--space-sm)] h-64">
              <Chart
                type="scatter"
                data={[
                  { x: 10, y: 30, performance: 85 },
                  { x: 30, y: 50, performance: 92 },
                  { x: 45, y: 80, performance: 78 },
                ]}
                config={createChartConfig({
                  performance: { label: 'Performance Score' },
                })}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Configuration Methods */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">2. Configuration Methods</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Manual Configuration</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`const config = {
  revenue: {
    label: 'Revenue ($)',
    color: 'var(--color-chart-bar-1)'
  },
  profit: {
    label: 'Profit ($)',
    color: 'var(--color-chart-bar-2)'
  }
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Using createChartConfig Helper</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`const config = createChartConfig({
  revenue: { label: 'Revenue ($)' },
  profit: { label: 'Profit ($)' }
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Chart Type Examples */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">3. Chart Types with Code Examples</h2>

        <div className="space-y-8">
          {/* Composed Chart Example */}
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Composed Chart (Mixed Types)</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart
  type="composed"
  data={data}
  config={{
    revenue: { label: 'Revenue', type: 'bar' },
    target: { label: 'Target', type: 'line' },
    growth: { label: 'Growth', type: 'area' }
  }}
/>`}
              </pre>
            </div>
            <div className="h-80">
              <Chart
                type="composed"
                data={[
                  { name: 'Q1', revenue: 4000, target: 3500, growth: 200 },
                  { name: 'Q2', revenue: 5000, target: 4000, growth: 280 },
                  { name: 'Q3', revenue: 4500, target: 4500, growth: 220 },
                  { name: 'Q4', revenue: 6000, target: 5000, growth: 350 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue ($)', type: 'bar' },
                  target: { label: 'Target ($)', type: 'line' },
                  growth: { label: 'Growth (%)', type: 'area' },
                })}
                className="h-full"
              />
            </div>
          </div>

          {/* Color Customization */}
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Custom Colors & Color Schemes</h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Custom Colors</h4>
                <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
                  <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`config={{
  series1: {
    label: 'Series 1',
    color: '#FF6B6B'
  },
  series2: {
    label: 'Series 2',
    color: '#4ECDC4'
  }
}}`}
                  </pre>
                </div>
                <div className="h-48">
                  <Chart
                    type="line"
                    data={[
                      { name: 'A', series1: 400, series2: 240 },
                      { name: 'B', series1: 300, series2: 139 },
                      { name: 'C', series1: 500, series2: 280 },
                    ]}
                    config={{
                      series1: { label: 'Series 1', color: '#FF6B6B' },
                      series2: { label: 'Series 2', color: '#4ECDC4' },
                    }}
                    className="h-full"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Color Schemes</h4>
                <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
                  <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart
  colorScheme="accessible"
  // Uses high-contrast colors
  // Other options: 'bar', 'line', 'scatter'
/>`}
                  </pre>
                </div>
                <div className="h-48">
                  <Chart
                    type="bar"
                    data={[
                      { name: 'A', series1: 400, series2: 240 },
                      { name: 'B', series1: 300, series2: 139 },
                      { name: 'C', series1: 500, series2: 280 },
                    ]}
                    config={createChartConfig({
                      series1: { label: 'Series 1' },
                      series2: { label: 'Series 2' },
                    })}
                    colorScheme="accessible"
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Complete Example */}
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Complete Implementation Example</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`import { Chart, createChartConfig } from '@rafal.lemieszewski/tide-ui'

const MyChart = () => {
  const salesData = [
    { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { name: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
  ]

  const config = createChartConfig({
    revenue: { label: 'Revenue ($)', color: 'var(--color-chart-bar-1)' },
    expenses: { label: 'Expenses ($)', color: 'var(--color-chart-bar-2)' },
    profit: { label: 'Profit ($)', color: 'var(--color-chart-bar-3)' }
  })

  return (
    <Chart
      type="bar"
      data={salesData}
      config={config}
      height={400}
      showGrid={true}
      showLegend={true}
      className="border rounded-lg p-4"
      onDataPointClick={(data, index) => console.log('Clicked:', data)}
    />
  )
}`}
              </pre>
            </div>
            <div className="h-96 border rounded-lg p-4">
              <Chart
                type="bar"
                data={[
                  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
                  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
                  { name: 'Mar', revenue: 5000, expenses: 2800, profit: 2200 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue ($)', color: 'var(--color-chart-bar-1)' },
                  expenses: { label: 'Expenses ($)', color: 'var(--color-chart-bar-2)' },
                  profit: { label: 'Profit ($)', color: 'var(--color-chart-bar-3)' }
                })}
                height={350}
                showGrid={true}
                showLegend={true}
                className="h-full"
                onDataPointClick={(data, index) => console.log('Clicked:', data)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tips and Best Practices */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">💡 Tips & Best Practices</h3>
        <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
          <li><strong>Data Consistency:</strong> Ensure all data points have the same structure</li>
          <li><strong>Field Names:</strong> Use descriptive field names that match your config labels</li>
          <li><strong>Color Variables:</strong> Use semantic color tokens (var(--color-chart-*)) for consistency</li>
          <li><strong>Responsive Design:</strong> Set appropriate height and enable responsive={`{true}`} for mobile</li>
          <li><strong>Accessibility:</strong> Use the 'accessible' color scheme for better contrast</li>
          <li><strong>Performance:</strong> For large datasets, consider data pagination or filtering</li>
        </ul>
      </div>
    </div>
  ),
}

export const TickFormatting: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Tick Formatting Examples</h1>

        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Custom Formatters</h2>
          <div className="text-body-sm text-[var(--color-text-secondary)] space-y-2">
            <p><strong>xAxisTickFormatter:</strong> Format X-axis labels (dates, categories, etc.)</p>
            <p><strong>yAxisTickFormatter:</strong> Format Y-axis labels (currency, percentages, units)</p>
            <p><strong>Common patterns:</strong> Currency, percentages, dates, abbreviated numbers</p>
          </div>
        </div>
      </div>

      {/* Currency Formatting */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Currency Formatting</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Without Formatting</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Raw numbers display as is
data: [{ name: 'Q1', revenue: 45000 }]`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', revenue: 45000 },
                  { name: 'Q2', revenue: 52000 },
                  { name: 'Q3', revenue: 38000 },
                  { name: 'Q4', revenue: 61000 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue' },
                })}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">❌ Hard to read: 45000, 52000</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">With Currency Formatting</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Format as currency
yAxisTickFormatter={(value) =>
  \`$\${(value / 1000).toFixed(0)}K\`
}`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', revenue: 45000 },
                  { name: 'Q2', revenue: 52000 },
                  { name: 'Q3', revenue: 38000 },
                  { name: 'Q4', revenue: 61000 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue' },
                })}
                yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Easy to read: $45K, $52K</p>
          </div>
        </div>
      </div>

      {/* Percentage Formatting */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Percentage & Date Formatting</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Percentage Values</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`yAxisTickFormatter={(value) => \`\${value}%\`}`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="line"
                data={[
                  { name: 'Jan', conversion: 12.5 },
                  { name: 'Feb', conversion: 15.2 },
                  { name: 'Mar', conversion: 18.7 },
                  { name: 'Apr', conversion: 16.3 },
                ]}
                config={createChartConfig({
                  conversion: { label: 'Conversion Rate' },
                })}
                yAxisTickFormatter={(value) => `${value}%`}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Abbreviated Numbers</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`yAxisTickFormatter={(value) =>
  value >= 1000000 ? \`\${(value/1000000).toFixed(1)}M\` :
  value >= 1000 ? \`\${(value/1000).toFixed(0)}K\` : value
}`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Small', users: 1200 },
                  { name: 'Medium', users: 15000 },
                  { name: 'Large', users: 230000 },
                  { name: 'Enterprise', users: 1200000 },
                ]}
                config={createChartConfig({
                  users: { label: 'Users' },
                })}
                yAxisTickFormatter={(value) =>
                  value >= 1000000 ? `${(value/1000000).toFixed(1)}M` :
                  value >= 1000 ? `${(value/1000).toFixed(0)}K` : value
                }
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg mt-[var(--space-xlg)]">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">💡 Common Formatters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Currency</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Short format
(value) => \`$\${(value/1000).toFixed(0)}K\`

// Full format
(value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(value)`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Dates</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Month abbreviation
(value) => new Date(value).toLocaleDateString(
  'en-US', { month: 'short' }
)

// Custom format
(value) => format(new Date(value), 'MMM yy')`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Chart Accessibility Features</h1>

        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Accessibility Props</h2>
          <div className="text-body-sm text-[var(--color-text-secondary)] space-y-2">
            <p><strong>title:</strong> Chart title for screen readers</p>
            <p><strong>description:</strong> Chart description for screen readers</p>
            <p><strong>showDataTable:</strong> Provides accessible data table fallback</p>
            <p><strong>ARIA support:</strong> Automatic role="img" and aria-labels</p>
          </div>
        </div>
      </div>

      {/* Enhanced ARIA Labels */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Enhanced ARIA Labels</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Basic Chart</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Basic accessibility
<Chart type="bar" data={data} config={config} />`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', revenue: 45000 },
                  { name: 'Q2', revenue: 52000 },
                  { name: 'Q3', revenue: 38000 },
                  { name: 'Q4', revenue: 61000 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue' },
                })}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">🔍 Inspect: role="img", aria-label="bar chart"</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Enhanced Accessibility</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Full accessibility features
<Chart
  title="Quarterly Revenue 2024"
  description="Revenue increased 35% from Q1 to Q4"
  showDataTable={true}
/>`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', revenue: 45000 },
                  { name: 'Q2', revenue: 52000 },
                  { name: 'Q3', revenue: 38000 },
                  { name: 'Q4', revenue: 61000 },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue' },
                })}
                title="Quarterly Revenue 2024"
                description="Revenue increased 35% from Q1 to Q4, with strongest performance in Q2"
                showDataTable={true}
                yAxisTickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Full ARIA labels + hidden data table</p>
          </div>
        </div>
      </div>

      {/* Data Table Fallback */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Screen Reader Support</h2>

        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">What Screen Readers Get:</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">1. Chart Title & Description</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">Hidden headings provide context and summary</p>
            </div>
            <div>
              <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">2. Data Table (when showDataTable=true)</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">Complete data in accessible table format with proper headers</p>
            </div>
            <div>
              <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">3. ARIA Labels</h4>
              <p className="text-body-sm text-[var(--color-text-secondary)]">Chart type, data series count, and category information</p>
            </div>
          </div>
        </div>

        <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
          <Chart
            type="line"
            data={[
              { name: 'Jan', sales: 120, leads: 85 },
              { name: 'Feb', sales: 145, leads: 92 },
              { name: 'Mar', sales: 165, leads: 108 },
              { name: 'Apr', sales: 140, leads: 95 },
            ]}
            config={createChartConfig({
              sales: { label: 'Sales' },
              leads: { label: 'Leads' },
            })}
            title="Monthly Sales & Leads Performance"
            description="Sales trend showing steady growth with leads correlation. Sales peaked in March at 165 units."
            showDataTable={true}
            height={256}
            className="w-full"
          />
        </div>
        <p className="text-body-xsm text-[var(--color-text-info)] mt-2">💡 Use browser developer tools to inspect the hidden data table</p>
      </div>

      {/* Best Practices */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg mt-[var(--space-xlg)]">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">♿ Accessibility Best Practices</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Always Include</h4>
            <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
              <li><strong>title</strong> - Clear, descriptive chart title</li>
              <li><strong>description</strong> - Key insights and trends</li>
              <li><strong>showDataTable</strong> - For complex data</li>
              <li><strong>Color contrast</strong> - Use 'accessible' color scheme</li>
            </ul>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Consider Adding</h4>
            <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
              <li><strong>Tick formatters</strong> - Improve readability</li>
              <li><strong>Legend</strong> - For multi-series charts</li>
              <li><strong>Tooltips</strong> - Additional context on hover</li>
              <li><strong>Summary stats</strong> - In description text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MarginCustomization: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Chart Margin Customization</h1>

        <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Margin Control</h2>
          <div className="text-body-sm text-[var(--color-text-secondary)] space-y-2">
            <p><strong>marginSize:</strong> 'sm', 'md', 'lg', 'auto' (auto scales based on chart height)</p>
            <p><strong>margin:</strong> Custom margin object override</p>
            <p><strong>yAxisWidth:</strong> Override Y-axis space when more room needed</p>
            <p><strong>Optimized spacing:</strong> ~27px total left space (12px margin + 15px Y-axis) with 4px grid system</p>
          </div>
        </div>
      </div>

      {/* Small Charts - Before and After */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Small Charts: Before vs After</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Old Fixed Margins</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Old: Large fixed margins (16px left)
md: { top: 8, right: 12, left: 16, bottom: 20 }`}
              </pre>
            </div>
            <div className="h-64 border-2 border-red-200">
              <Chart
                type="scatter"
                data={[
                  { x: 10, y: 30, performance: 85 },
                  { x: 30, y: 50, performance: 92 },
                  { x: 45, y: 80, performance: 78 },
                  { x: 60, y: 40, performance: 65 },
                ]}
                config={createChartConfig({
                  performance: { label: 'Performance Score' },
                })}
                margin={{ top: 8, right: 12, left: 16, bottom: 20 }}
                className="h-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">❌ Old margins: 16px left = more waste</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">New Auto Margins</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// New: Optimized margins (12px left) + Y-axis fix
md: { top: 8, right: 12, left: 12, bottom: 16 }
Y-axis: 15px (vs old 60px default)`}
              </pre>
            </div>
            <div className="h-64 border-2 border-green-200">
              <Chart
                type="scatter"
                data={[
                  { x: 10, y: 30, performance: 85 },
                  { x: 30, y: 50, performance: 92 },
                  { x: 45, y: 80, performance: 78 },
                  { x: 60, y: 40, performance: 65 },
                ]}
                config={createChartConfig({
                  performance: { label: 'Performance Score' },
                })}
                marginSize="auto"
                className="h-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ New margins: 4px left = minimal waste</p>
          </div>
        </div>
      </div>

      {/* Margin Size Presets */}
      <div className="mt-[var(--space-xlg)]">
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Margin Size Presets</h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-[var(--space-2xl)]">
          <div className="space-y-4">
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">Small Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)]">
{`marginSize="sm"`}
              </pre>
            </div>
            <div className="h-48 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'A', value: 400 },
                  { name: 'B', value: 300 },
                  { name: 'C', value: 500 },
                ]}
                config={createChartConfig({
                  value: { label: 'Value' },
                })}
                marginSize="sm"
                height={192}
                showLegend={false}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">Medium Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)]">
{`marginSize="md"`}
              </pre>
            </div>
            <div className="h-48 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'A', value: 400 },
                  { name: 'B', value: 300 },
                  { name: 'C', value: 500 },
                ]}
                config={createChartConfig({
                  value: { label: 'Value' },
                })}
                marginSize="md"
                height={192}
                showLegend={false}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)]">Large Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)]">
{`marginSize="lg"`}
              </pre>
            </div>
            <div className="h-48 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'A', value: 400 },
                  { name: 'B', value: 300 },
                  { name: 'C', value: 500 },
                ]}
                config={createChartConfig({
                  value: { label: 'Value' },
                })}
                marginSize="lg"
                height={192}
                showLegend={false}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Y-Axis Width Configuration */}
      <div className="mt-[var(--space-xlg)]">
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Y-Axis Width Configuration</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Default (Auto Width)</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Ultra-minimal margins + auto Y-axis
<Chart type="line" marginSize="auto" />`}
              </pre>
            </div>
            <div className="h-64 w-[452px] border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden mx-auto">
              <Chart
                type="line"
                data={[
                  { name: 'Jan', value: 4000 },
                  { name: 'Feb', value: 3200 },
                  { name: 'Mar', value: 5800 },
                  { name: 'Apr', value: 2100 },
                ]}
                config={createChartConfig({
                  value: { label: 'Revenue' },
                })}
                marginSize="auto"
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ ~27px total left space (452px → ~425px usable)</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Custom Y-Axis Width</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// When you need more Y-axis space
<Chart yAxisWidth={60} marginSize="auto" />`}
              </pre>
            </div>
            <div className="h-64 w-[452px] border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden mx-auto">
              <Chart
                type="line"
                data={[
                  { name: 'January', value: 40000 },
                  { name: 'February', value: 32000 },
                  { name: 'March', value: 58000 },
                  { name: 'April', value: 21000 },
                ]}
                config={createChartConfig({
                  value: { label: 'Revenue ($)' },
                })}
                marginSize="auto"
                yAxisWidth={60}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">🔧 Custom width for longer labels/values</p>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg mt-[var(--space-xlg)]">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">💡 Usage Examples</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Dashboard Cards</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart marginSize="sm" height={200} />`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Responsive Charts</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart marginSize="auto" />`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Long Y-Labels</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart yAxisWidth={80} />`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Custom Spacing</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart margin={{ left: 80 }} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MultiMetricLegend: Story = {
  render: () => (
    <div className="w-[800px] space-y-8">
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Multi-Metric Legend Wrapping</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
          Tests legend behavior with many metrics to ensure proper row wrapping without text wrapping within labels.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">8 Metrics Bar Chart</h3>
            <div className="bg-white border border-[var(--color-border-primary-subtle)] rounded-lg p-4">
              <Chart
                type="bar"
                data={[
                  {
                    name: 'Q1',
                    revenue: 4000,
                    expenses: 2400,
                    profit: 1600,
                    marketing: 800,
                    operations: 1200,
                    technology: 600,
                    humanResources: 400,
                    research: 300
                  },
                  {
                    name: 'Q2',
                    revenue: 3000,
                    expenses: 1398,
                    profit: 1602,
                    marketing: 700,
                    operations: 900,
                    technology: 500,
                    humanResources: 350,
                    research: 280
                  },
                  {
                    name: 'Q3',
                    revenue: 2000,
                    expenses: 9800,
                    profit: -7800,
                    marketing: 600,
                    operations: 1100,
                    technology: 700,
                    humanResources: 450,
                    research: 320
                  },
                  {
                    name: 'Q4',
                    revenue: 2780,
                    expenses: 3908,
                    profit: -1128,
                    marketing: 900,
                    operations: 1300,
                    technology: 800,
                    humanResources: 500,
                    research: 400
                  },
                ]}
                config={createChartConfig({
                  revenue: { label: 'Revenue' },
                  expenses: { label: 'Expenses' },
                  profit: { label: 'Profit' },
                  marketing: { label: 'Marketing Budget' },
                  operations: { label: 'Operations Cost' },
                  technology: { label: 'Technology Investment' },
                  humanResources: { label: 'Human Resources' },
                  research: { label: 'Research & Development' },
                })}
                height={320}
                showGrid={true}
                showLegend={true}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Narrow Container (400px)</h3>
            <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-sm)]">
              Testing legend wrapping in constrained width containers
            </p>
            <div className="w-[400px] bg-white border border-[var(--color-border-primary-subtle)] rounded-lg p-4">
              <Chart
                type="line"
                data={[
                  {
                    name: 'Week 1',
                    sales: 4000,
                    marketing: 2400,
                    support: 1600,
                    development: 800,
                    operations: 1200,
                    design: 600
                  },
                  {
                    name: 'Week 2',
                    sales: 3000,
                    marketing: 1398,
                    support: 1602,
                    development: 700,
                    operations: 900,
                    design: 500
                  },
                  {
                    name: 'Week 3',
                    sales: 5000,
                    marketing: 2800,
                    support: 2200,
                    development: 1200,
                    operations: 1100,
                    design: 700
                  },
                ]}
                config={createChartConfig({
                  sales: { label: 'Sales Revenue' },
                  marketing: { label: 'Marketing Spend' },
                  support: { label: 'Customer Support' },
                  development: { label: 'Development Cost' },
                  operations: { label: 'Operations Budget' },
                  design: { label: 'Design Investment' },
                })}
                height={320}
                showGrid={true}
                showLegend={true}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] p-[var(--space-lg)] rounded-lg mt-[var(--space-xlg)]">
          <h4 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">✅ Legend Behavior</h4>
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
            <li><strong>Multi-row wrapping</strong> - Legend items flow to multiple rows when needed</li>
            <li><strong>No text wrapping</strong> - Individual legend labels remain intact (whitespace-nowrap)</li>
            <li><strong>Consistent spacing</strong> - Proper horizontal and vertical gaps between items</li>
            <li><strong>Chart alignment</strong> - Legend maintains alignment with chart area</li>
            <li><strong>Responsive behavior</strong> - Adapts to different container widths</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

