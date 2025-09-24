import type { Meta, StoryObj } from '@storybook/react'
import { Chart, generateChartColors, createChartConfig } from '../components/ui/chart'

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
            <p><strong>Auto scaling:</strong> height &lt; 300px = 'sm', 300-500px = 'md', &gt; 500px = 'lg'</p>
            <p><strong>New margins:</strong> sm: 4-16px, md: 8-16px, lg: 16-24px</p>
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
{`// Old: Fixed 40px margins for scatter
scatter: { top: 24, right: 40, left: 40, bottom: 40 }`}
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
                margin={{ top: 24, right: 40, left: 40, bottom: 40 }}
                className="h-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">❌ Wastes significant space with large margins</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">New Auto Margins</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// New: Auto-calculated for height < 300px
marginSize="auto" → 'sm' margins
{ top: 4, right: 8, left: 8, bottom: 16 }`}
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
            <p className="text-body-xsm text-[var(--color-text-success)] mt-2">✅ Much more space-efficient for small charts</p>
          </div>
        </div>
      </div>

      {/* Margin Size Presets */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Margin Size Presets</h2>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-[var(--space-lg)]">
          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Small Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`marginSize="sm"`}
              </pre>
            </div>
            <div className="h-48">
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
                className="h-full"
              />
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Medium Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`marginSize="md"`}
              </pre>
            </div>
            <div className="h-48">
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
                className="h-full"
              />
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Large Margins</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`marginSize="lg"`}
              </pre>
            </div>
            <div className="h-48">
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
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">💡 Usage Examples</h3>

        <div className="space-y-4">
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
{`<Chart marginSize="auto" /> // Auto-scales with chart size`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-body-md font-medium text-[var(--color-text-primary)] mb-[var(--space-sm)]">Custom Spacing</h4>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`<Chart margin={{ left: 80, bottom: 50 }} /> // Override specific margins`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

