import type { Meta, StoryObj } from '@storybook/react'
import { Chart, generateChartColors, createChartConfig, formatNumber } from '../components/ui/chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const meta: Meta<typeof Chart> = {
  title: 'NPM • Fundamental/Chart',
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

// Sample data for freight rates vs predictions
const freightData = [
  { name: 'Jan', freightRate: 2400, prediction: 2200 },
  { name: 'Feb', freightRate: 2210, prediction: 2300 },
  { name: 'Mar', freightRate: 2290, prediction: 2350 },
  { name: 'Apr', freightRate: 2000, prediction: 2100 },
  { name: 'May', freightRate: 2181, prediction: 2250 },
  { name: 'Jun', freightRate: 2500, prediction: 2400 },
  { name: 'Jul', freightRate: null, prediction: 2450 },
  { name: 'Aug', freightRate: null, prediction: 2350 },
]

export const LineChartWithStrokeStyles: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="line"
        data={freightData}
        config={createChartConfig({
          freightRate: {
            label: 'Freight Rate',
            color: 'var(--color-chart-line-1)',
            strokeStyle: 'solid'
          },
          prediction: {
            label: 'Prediction',
            color: 'var(--color-chart-line-2)',
            strokeStyle: 'dashed'
          },
        })}
        className="h-full"
      />
    </div>
  ),
}

// Sample data for a continuous line that transitions from actual to predicted
const continuousFreightData = [
  { name: 'Jan', actualRate: 2400, predictedRate: null },
  { name: 'Feb', actualRate: 2210, predictedRate: null },
  { name: 'Mar', actualRate: 2290, predictedRate: null },
  { name: 'Apr', actualRate: 2000, predictedRate: null },
  { name: 'May', actualRate: 2181, predictedRate: null },
  { name: 'Jun', actualRate: 2500, predictedRate: 2500 }, // Transition point - both values
  { name: 'Jul', actualRate: null, predictedRate: 2450 },
  { name: 'Aug', actualRate: null, predictedRate: 2350 },
  { name: 'Sep', actualRate: null, predictedRate: 2400 },
]

export const ContinuousLineTransition: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="line"
        data={continuousFreightData}
        config={createChartConfig({
          actualRate: {
            label: 'Actual Freight Rate',
            color: 'var(--color-chart-line-1)',
            strokeStyle: 'solid'
          },
          predictedRate: {
            label: 'Predicted Rate',
            color: 'var(--color-chart-line-1)', // Same color for continuity
            strokeStyle: 'dashed'
          },
        })}
        className="h-full"
      />
    </div>
  ),
}

// Sample data for composed chart with continuous transition from solid to dashed
const composedData = [
  { name: 'Jan', marketSize: 8000, actualRate: 2400, prediction: null, sales: 1800 },
  { name: 'Feb', marketSize: 8200, actualRate: 2210, prediction: null, sales: 1900 },
  { name: 'Mar', marketSize: 8500, actualRate: 2290, prediction: null, sales: 2100 },
  { name: 'Apr', marketSize: 8100, actualRate: 2000, prediction: null, sales: 1750 },
  { name: 'May', marketSize: 8800, actualRate: 2181, prediction: null, sales: 2050 },
  { name: 'Jun', marketSize: 9000, actualRate: 2500, prediction: 2500, sales: 2200 }, // Transition point
  { name: 'Jul', marketSize: 9200, actualRate: null, prediction: 2450, sales: 2150 },
  { name: 'Aug', marketSize: 9100, actualRate: null, prediction: 2350, sales: 2000 },
  { name: 'Sep', marketSize: 9300, actualRate: null, prediction: 2400, sales: 2100 },
]

export const ComposedChartWithLineStyles: Story = {
  render: () => (
    <div className="w-[600px] h-[400px]">
      <Chart
        type="composed"
        data={composedData}
        config={createChartConfig({
          marketSize: {
            label: 'Market Size (Area)',
            type: 'area',
            color: 'var(--color-chart-area-4)',
            fill: 'var(--color-chart-area-4)'
          },
          sales: {
            label: 'Sales (Bars)',
            type: 'bar',
            color: 'var(--color-chart-bar-1)'
          },
          actualRate: {
            label: 'Actual Rate (Solid Line)',
            type: 'line',
            color: 'var(--color-chart-line-2)',
            strokeStyle: 'solid'
          },
          prediction: {
            label: 'Predicted Rate (Dashed Line)',
            type: 'line',
            color: 'var(--color-chart-line-3)',
            strokeStyle: 'dashed'
          },
        })}
        className="h-full"
      />
    </div>
  ),
}

// Sample data for demonstrating yAxisTickCount
const tickCountData = [
  { name: 'Q1', revenue: 45000, expenses: 32000 },
  { name: 'Q2', revenue: 52000, expenses: 38000 },
  { name: 'Q3', revenue: 48000, expenses: 35000 },
  { name: 'Q4', revenue: 61000, expenses: 42000 },
]

export const ChartWithCustomTickCount: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-heading-md mb-4">Default Y-Axis Ticks</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="bar"
            data={tickCountData}
            config={createChartConfig({
              revenue: { label: 'Revenue', color: 'var(--color-chart-bar-1)' },
              expenses: { label: 'Expenses', color: 'var(--color-chart-bar-2)' },
            })}
            className="h-full"
          />
        </div>
      </div>

      <div>
        <h3 className="text-heading-md mb-4">Forced 5 Y-Axis Ticks</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="bar"
            data={tickCountData}
            config={createChartConfig({
              revenue: { label: 'Revenue', color: 'var(--color-chart-bar-1)' },
              expenses: { label: 'Expenses', color: 'var(--color-chart-bar-2)' },
            })}
            yAxisTickCount={5}
            className="h-full"
          />
        </div>
      </div>

      <div>
        <h3 className="text-heading-md mb-4">Forced 10 Y-Axis Ticks</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="line"
            data={tickCountData}
            config={createChartConfig({
              revenue: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
              expenses: { label: 'Expenses', color: 'var(--color-chart-line-2)' },
            })}
            yAxisTickCount={10}
            className="h-full"
          />
        </div>
      </div>
    </div>
  ),
}

// Sample data for demonstrating legend order
const legendOrderData = [
  { name: 'Q1', alpha: 100, beta: 200, gamma: 300, delta: 150 },
  { name: 'Q2', alpha: 120, beta: 180, gamma: 250, delta: 200 },
  { name: 'Q3', alpha: 140, beta: 220, gamma: 280, delta: 180 },
  { name: 'Q4', alpha: 160, beta: 240, gamma: 320, delta: 220 },
]

export const ChartWithCustomLegendOrder: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-heading-md mb-4">Default Legend Order (Config Key Order)</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="line"
            data={legendOrderData}
            config={createChartConfig({
              alpha: { label: 'Alpha Series', color: 'var(--color-chart-line-1)' },
              beta: { label: 'Beta Series', color: 'var(--color-chart-line-2)' },
              gamma: { label: 'Gamma Series', color: 'var(--color-chart-line-3)' },
              delta: { label: 'Delta Series', color: 'var(--color-chart-line-4)' },
            })}
            className="h-full"
          />
        </div>
        <p className="text-body-sm text-[var(--color-text-secondary)] mt-2">
          Legend shows: Alpha, Beta, Gamma, Delta (config object key order)
        </p>
      </div>

      <div>
        <h3 className="text-heading-md mb-4">Custom Legend Order</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="line"
            data={legendOrderData}
            config={createChartConfig({
              alpha: { label: 'Alpha Series', color: 'var(--color-chart-line-1)' },
              beta: { label: 'Beta Series', color: 'var(--color-chart-line-2)' },
              gamma: { label: 'Gamma Series', color: 'var(--color-chart-line-3)' },
              delta: { label: 'Delta Series', color: 'var(--color-chart-line-4)' },
            })}
            legendOrder={['delta', 'gamma', 'beta', 'alpha']}
            className="h-full"
          />
        </div>
        <p className="text-body-sm text-[var(--color-text-secondary)] mt-2">
          Legend shows: Delta, Gamma, Beta, Alpha (custom order)
        </p>
      </div>

      <div>
        <h3 className="text-heading-md mb-4">Composed Chart with Custom Legend Order</h3>
        <div className="w-[600px] h-[300px]">
          <Chart
            type="composed"
            data={legendOrderData}
            config={createChartConfig({
              alpha: { label: 'Alpha Bars', type: 'bar', color: 'var(--color-chart-bar-1)' },
              beta: { label: 'Beta Area', type: 'area', color: 'var(--color-chart-area-1)' },
              gamma: { label: 'Gamma Line (Solid)', type: 'line', color: 'var(--color-chart-line-1)', strokeStyle: 'solid' },
              delta: { label: 'Delta Line (Dashed)', type: 'line', color: 'var(--color-chart-line-2)', strokeStyle: 'dashed' },
            })}
            legendOrder={['beta', 'delta', 'gamma', 'alpha']}
            className="h-full"
          />
        </div>
        <p className="text-body-sm text-[var(--color-text-secondary)] mt-2">
          Legend shows: Beta (area), Delta (dashed), Gamma (solid), Alpha (bars) - with correct marker types
        </p>
      </div>
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
        <h1 className="text-heading-lg text-[var(--color-text-primary)] mb-[var(--space-lg)]">Axis Formatting & Tooltip Behavior</h1>

        <div className="bg-[var(--color-background-info-subtle)] border border-[var(--color-border-info)] p-[var(--space-lg)] rounded-lg mb-[var(--space-lg)]">
          <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Key Concept: Axis vs Tooltip</h2>
          <div className="text-body-sm text-[var(--color-text-secondary)] space-y-3">
            <p><strong>Axis tick formatters</strong> control how values appear on the chart axes (compact display).</p>
            <p><strong>Tooltips always show full unformatted values</strong> from your data, formatted with spaces as thousands separators (e.g., 1 000 000).</p>
            <p className="text-body-sm font-medium text-[var(--color-text-primary)] pt-2">Example: If your Y-axis shows "1M", the tooltip will show "1 000 000"</p>
          </div>
        </div>
      </div>

      {/* Number Formatting Examples */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Number Formatting Examples</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Thousands (1K-10K)</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`yAxisTickFormatter={(v) =>
  v >= 1000 ? \`\${v/1000}K\` : v
}
// Axis: "5K"
// Tooltip: "5 000"`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', value: 1000 },
                  { name: 'Q2', value: 3000 },
                  { name: 'Q3', value: 5000 },
                  { name: 'Q4', value: 7000 },
                ]}
                config={createChartConfig({
                  value: { label: 'Sales' },
                })}
                yAxisTickFormatter={(value) => value >= 1000 ? `${value/1000}K` : value}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">Y-axis: "5K" / Tooltip: "5 000"</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Hundred Thousands (100K-1M)</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`yAxisTickFormatter={(v) =>
  v >= 1000 ? \`\${v/1000}K\` : v
}
// Axis: "450K"
// Tooltip: "450 000"`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', value: 100000 },
                  { name: 'Q2', value: 250000 },
                  { name: 'Q3', value: 450000 },
                  { name: 'Q4', value: 800000 },
                ]}
                config={createChartConfig({
                  value: { label: 'Revenue' },
                })}
                yAxisTickFormatter={(value) => value >= 1000 ? `${value/1000}K` : value}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">Y-axis: "250K" / Tooltip: "250 000"</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Millions (1M-10M)</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`yAxisTickFormatter={(v) =>
  v >= 1e6 ? \`\${v/1e6}M\` :
  v >= 1000 ? \`\${v/1000}K\` : v
}
// Axis: "2.5M"
// Tooltip: "2 500 000"`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="bar"
                data={[
                  { name: 'Q1', value: 1200000 },
                  { name: 'Q2', value: 2500000 },
                  { name: 'Q3', value: 4800000 },
                  { name: 'Q4', value: 7200000 },
                ]}
                config={createChartConfig({
                  value: { label: 'Users' },
                })}
                yAxisTickFormatter={(value) =>
                  value >= 1000000 ? `${value/1000000}M` :
                  value >= 1000 ? `${value/1000}K` : value
                }
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">Y-axis: "2.5M" / Tooltip: "2 500 000"</p>
          </div>
        </div>
      </div>

      {/* Date Formatting Example */}
      <div>
        <h2 className="text-heading-md text-[var(--color-text-primary)] mb-[var(--space-md)]">Date Formatting: Full Dates in Tooltips</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-[var(--space-lg)]">
          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Short Axis, Full Tooltip</h3>
            <div className="bg-[var(--color-background-neutral-subtle)] p-[var(--space-md)] rounded-md mb-[var(--space-sm)]">
              <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`// Store full dates in data
data: [{ name: 'January 2025', value: 450 }]

// Abbreviate on X-axis
xAxisTickFormatter={(value) => {
  const [month, year] = value.split(' ');
  return \`\${month.slice(0, 3)} \${year.slice(2)}\`;
}}

// X-axis shows: "Jan 25"
// Tooltip shows: "January 2025"`}
              </pre>
            </div>
            <div className="h-64 border border-[var(--color-border-primary-subtle)] rounded-md overflow-hidden">
              <Chart
                type="line"
                data={[
                  { name: 'January 2025', orders: 450 },
                  { name: 'February 2025', orders: 520 },
                  { name: 'March 2025', orders: 480 },
                  { name: 'April 2025', orders: 610 },
                ]}
                config={createChartConfig({
                  orders: { label: 'Orders' },
                })}
                xAxisTickFormatter={(value) => {
                  const [month, year] = value.split(' ');
                  return `${month.slice(0, 3)} ${year.slice(2)}`;
                }}
                height={256}
                showLegend={false}
                className="w-full"
              />
            </div>
            <p className="text-body-xsm text-[var(--color-text-secondary)] mt-2">Hover to see full month name and year</p>
          </div>

          <div>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Best Practice</h3>
            <div className="bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] p-[var(--space-md)] rounded-md">
              <div className="text-body-sm text-[var(--color-text-primary)] space-y-3">
                <p className="font-medium">✅ Always store full values in your data</p>
                <p>• Numbers: Store 1000000, not "1M"</p>
                <p>• Dates: Store "January 2025", not "Jan 25"</p>
                <p className="font-medium pt-2">✅ Use formatters only for axis display</p>
                <p>• xAxisTickFormatter: Abbreviate axis labels</p>
                <p>• yAxisTickFormatter: Shorten large numbers</p>
                <p className="font-medium pt-2">✅ Tooltips handle the rest</p>
                <p>• Automatically show full data values</p>
                <p>• Space-separated thousands (1 000 000)</p>
                <p>• Dot for decimals (1.5)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
        <h3 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">Complete Code Example</h3>
        <pre className="text-body-xsm font-mono text-[var(--color-text-primary)] overflow-x-auto">
{`import { Chart, createChartConfig } from '@rafal.lemieszewski/tide-ui';

// Example: Large revenue numbers
<Chart
  type="bar"
  data={[
    { name: 'Q1 2024', revenue: 1500000 },
    { name: 'Q2 2024', revenue: 2300000 },
    { name: 'Q3 2024', revenue: 1900000 },
    { name: 'Q4 2024', revenue: 3100000 }
  ]}
  config={createChartConfig({
    revenue: { label: 'Revenue ($)' }
  })}
  yAxisTickFormatter={(value) =>
    value >= 1000000 ? \`$\${value/1000000}M\` :
    value >= 1000 ? \`$\${value/1000}K\` : \`$\${value}\`
  }
/>

/* Result:
   Y-axis shows: "$1M", "$2M", "$3M"
   Tooltip shows: "1 500 000", "2 300 000", etc.
*/`}
        </pre>
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

// Dual Y-Axis Chart Examples
const dualAxisData = [
  { name: 'Jan', revenue: 4000, growthRate: 12, temperature: 15, humidity: 65 },
  { name: 'Feb', revenue: 3000, growthRate: 18, temperature: 18, humidity: 60 },
  { name: 'Mar', revenue: 5000, growthRate: 22, temperature: 22, humidity: 55 },
  { name: 'Apr', revenue: 4500, growthRate: 25, temperature: 25, humidity: 50 },
  { name: 'May', revenue: 6000, growthRate: 28, temperature: 28, humidity: 45 },
  { name: 'Jun', revenue: 5500, growthRate: 32, temperature: 32, humidity: 40 },
];

export const DualYAxisCharts: Story = {
  render: () => (
    <div className="w-full max-w-7xl mx-auto p-[var(--space-lg)] space-y-[var(--space-xlg)]">
      <div>
        <h2 className="text-heading-lg mb-[var(--space-md)]">Dual Y-Axis Charts</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-xlg)]">
          Demonstrating dual Y-axis functionality for displaying data with different units and scales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xlg)]">
        {/* Line Chart with Dual Y-Axis */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Line Chart - Revenue vs Growth Rate</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Revenue (left axis, $) and Growth Rate (right axis, %) on different scales.
          </p>
          <Chart
            type="line"
            data={dualAxisData}
            config={createChartConfig({
              revenue: {
                label: 'Revenue ($)',
                yAxisId: 'left',
                strokeStyle: 'solid',
                color: 'var(--color-chart-line-1)'
              },
              growthRate: {
                label: 'Growth Rate (%)',
                yAxisId: 'right',
                strokeStyle: 'dashed',
                color: 'var(--color-chart-line-2)'
              },
            })}
            height={300}
            showGrid={true}
            showLegend={true}
            showRightYAxis={true}
            rightYAxisTickFormatter={(value) => `${value}%`}
            yAxisTickFormatter={(value) => `$${formatNumber(value)}`}
            className="w-full"
          />
        </div>

        {/* Composed Chart with Dual Y-Axis - Temperature Line */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Line Chart - Temperature vs Humidity</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Temperature (left axis, °C) and Humidity (right axis, %) on different scales.
          </p>
          <Chart
            type="line"
            data={dualAxisData}
            config={createChartConfig({
              temperature: {
                label: 'Temperature (°C)',
                yAxisId: 'left',
                strokeStyle: 'solid',
                color: 'var(--color-chart-line-3)'
              },
              humidity: {
                label: 'Humidity (%)',
                yAxisId: 'right',
                strokeStyle: 'solid',
                color: 'var(--color-chart-line-4)'
              },
            })}
            height={300}
            showGrid={true}
            showLegend={true}
            showRightYAxis={true}
            rightYAxisTickFormatter={(value) => `${value}%`}
            yAxisTickFormatter={(value) => `${value}°C`}
            className="w-full"
          />
        </div>

        {/* Composed Chart with Dual Y-Axis */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Composed Chart - Mixed Elements</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Revenue bars (left) with growth rate line (right) and temperature area.
          </p>
          <Chart
            type="composed"
            data={dualAxisData}
            config={createChartConfig({
              revenue: {
                label: 'Revenue ($)',
                type: 'bar',
                yAxisId: 'left',
                color: 'var(--color-chart-bar-1)'
              },
              growthRate: {
                label: 'Growth Rate (%)',
                type: 'line',
                yAxisId: 'right',
                strokeStyle: 'solid',
                color: 'var(--color-chart-line-2)'
              },
              temperature: {
                label: 'Temperature Trend',
                type: 'area',
                yAxisId: 'left',
                color: 'var(--color-chart-area-4)'
              },
            })}
            height={350}
            showGrid={true}
            showLegend={true}
            showRightYAxis={true}
            rightYAxisTickFormatter={(value) => `${value}%`}
            yAxisTickFormatter={(value) => `$${formatNumber(value)}`}
            className="w-full"
          />
        </div>

        {/* Advanced Configuration */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Advanced Configuration</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Multiple lines with different axis assignments, tick counts, and formatters.
          </p>
          <Chart
            type="line"
            data={dualAxisData}
            config={createChartConfig({
              revenue: {
                label: 'Primary Revenue',
                yAxisId: 'left',
                strokeStyle: 'solid',
                showDots: true,
                color: 'var(--color-chart-line-1)'
              },
              temperature: {
                label: 'Secondary Metric 1',
                yAxisId: 'right',
                strokeStyle: 'dashed',
                color: 'var(--color-chart-line-3)'
              },
              humidity: {
                label: 'Secondary Metric 2',
                yAxisId: 'right',
                strokeStyle: 'dotted',
                color: 'var(--color-chart-line-4)'
              },
            })}
            height={300}
            showGrid={true}
            showLegend={true}
            showRightYAxis={true}
            yAxisTickCount={5}
            rightYAxisTickCount={4}
            rightYAxisTickFormatter={(value) => `${value}u`}
            yAxisTickFormatter={(value) => `$${formatNumber(value/1000)}k`}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] p-[var(--space-lg)] rounded-lg">
        <h4 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">✅ Dual Y-Axis Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
            <li><strong>Independent Scaling</strong> - Left and right axes scale independently for different data ranges</li>
            <li><strong>Custom Formatters</strong> - Different tick formatters for left and right axes (currency, percentage, etc.)</li>
            <li><strong>Flexible Configuration</strong> - Configure axis width, tick count, and styling independently</li>
            <li><strong>Grid Line Support</strong> - CartesianGrid automatically follows primary axis (prevents disappearing grid lines)</li>
          </ul>
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
            <li><strong>Line & Composed Charts</strong> - Dual Y-axis supported for line and composed chart types</li>
            <li><strong>Smart Margins</strong> - Automatic margin calculation to accommodate right Y-axis width</li>
            <li><strong>Auto Width Calculation</strong> - Right axis width auto-calculated based on formatted tick values</li>
            <li><strong>Mixed Elements</strong> - Composed charts can mix bars, lines, and areas on different axes</li>
          </ul>
        </div>

        <div className="mt-[var(--space-md)] p-[var(--space-md)] bg-[var(--color-background-info-subtle)] rounded-md">
          <h5 className="text-body-medium-sm text-[var(--color-text-primary)] mb-[var(--space-sm)]">Configuration Example:</h5>
          <pre className="text-caption-sm text-[var(--color-text-secondary)] font-mono">
{`<Chart
  type="line"
  data={data}
  config={{
    revenue: {
      label: 'Revenue ($)',
      yAxisId: 'left'  // Left Y-axis
    },
    growthRate: {
      label: 'Growth (%)',
      yAxisId: 'right' // Right Y-axis
    }
  }}
  showRightYAxis={true}
  rightYAxisTickFormatter={(v) => \`\${v}%\`}
  yAxisTickFormatter={(v) => \`$\${v}\`}
/>`}
          </pre>
        </div>
      </div>
    </div>
  ),
}

// Legend Positioning and Overflow Prevention
const manyItemsData = [
  { name: 'Jan', item1: 400, item2: 300, item3: 200, item4: 150, item5: 100, item6: 250, item7: 180, item8: 350 },
  { name: 'Feb', item1: 300, item2: 450, item3: 280, item4: 180, item5: 120, item6: 300, item7: 220, item8: 400 },
  { name: 'Mar', item1: 500, item2: 350, item3: 300, item4: 220, item5: 140, item6: 350, item7: 250, item8: 450 },
  { name: 'Apr', item1: 650, item2: 400, item3: 350, item4: 260, item5: 160, item6: 400, item7: 280, item8: 500 },
];

export const LegendPositioning: Story = {
  render: () => (
    <div className="w-full max-w-7xl mx-auto p-[var(--space-lg)] space-y-[var(--space-xlg)]">
      <div>
        <h2 className="text-heading-lg mb-[var(--space-md)]">Legend Positioning & Overflow Prevention</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-xlg)]">
          Demonstrating how legend positioning prevents overflow with X-axis labels and maintains proper layout across different positions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xlg)]">
        {/* Bottom Legend (Default) - Shows overflow prevention */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Bottom Legend (Overflow Protected)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Automatic bottom margin calculation prevents legend from overlapping X-axis labels.
          </p>
          <Chart
            type="line"
            data={manyItemsData}
            config={createChartConfig({
              item1: { label: 'Revenue Stream Alpha', strokeStyle: 'solid' },
              item2: { label: 'Marketing Investment', strokeStyle: 'dashed' },
              item3: { label: 'Operations Cost', strokeStyle: 'dotted' },
              item4: { label: 'Development Budget', strokeStyle: 'solid' },
              item5: { label: 'Support Expenses', strokeStyle: 'dashed' },
              item6: { label: 'Sales Commission', strokeStyle: 'dotted' },
              item7: { label: 'Research & Development', strokeStyle: 'solid' },
              item8: { label: 'Customer Acquisition', strokeStyle: 'dashed' },
            })}
            height={300}
            legendPosition="bottom"
            showGrid={true}
            showLegend={true}
            className="w-full"
          />
        </div>

        {/* Right Legend */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Right Legend (Vertical Layout)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Vertical layout saves vertical space and provides clean side alignment.
          </p>
          <Chart
            type="line"
            data={manyItemsData}
            config={createChartConfig({
              item1: { label: 'Revenue Stream Alpha', strokeStyle: 'solid' },
              item2: { label: 'Marketing Investment', strokeStyle: 'dashed' },
              item3: { label: 'Operations Cost', strokeStyle: 'dotted' },
              item4: { label: 'Development Budget', strokeStyle: 'solid' },
              item5: { label: 'Support Expenses', strokeStyle: 'dashed' },
              item6: { label: 'Sales Commission', strokeStyle: 'dotted' },
              item7: { label: 'Research & Development', strokeStyle: 'solid' },
              item8: { label: 'Customer Acquisition', strokeStyle: 'dashed' },
            })}
            height={300}
            legendPosition="right"
            showGrid={true}
            showLegend={true}
            className="w-full"
          />
        </div>

        {/* Top Legend */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Top Legend (Header Style)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Top positioning places legend above chart for header-style layout.
          </p>
          <Chart
            type="bar"
            data={manyItemsData}
            config={createChartConfig({
              item1: { label: 'Q1 Revenue' },
              item2: { label: 'Q2 Revenue' },
              item3: { label: 'Q3 Revenue' },
              item4: { label: 'Q4 Revenue' },
              item5: { label: 'Marketing' },
              item6: { label: 'Operations' },
              item7: { label: 'Development' },
              item8: { label: 'Support' },
            })}
            height={300}
            legendPosition="top"
            showGrid={true}
            showLegend={true}
            className="w-full"
          />
        </div>

        {/* Composed Chart with Bottom Legend */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Composed Chart (Protected Layout)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Combined bar and line elements with overflow-protected legend positioning.
          </p>
          <Chart
            type="composed"
            data={manyItemsData}
            config={createChartConfig({
              item1: { label: 'Revenue Bars', type: 'bar' },
              item2: { label: 'Target Line', type: 'line', strokeStyle: 'solid' },
              item3: { label: 'Forecast Line', type: 'line', strokeStyle: 'dashed' },
              item4: { label: 'Budget Area', type: 'area' },
              item5: { label: 'Growth Trend', type: 'line', strokeStyle: 'dotted' },
              item6: { label: 'Cost Baseline', type: 'bar' },
              item7: { label: 'Performance Range', type: 'range-area' },
              item8: { label: 'Efficiency Metric', type: 'line', strokeStyle: 'dashed' },
            })}
            height={350}
            legendPosition="bottom"
            showGrid={true}
            showLegend={true}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] p-[var(--space-lg)] rounded-lg">
        <h4 className="text-heading-sm text-[var(--color-text-primary)] mb-[var(--space-md)]">✅ Legend Layout Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
            <li><strong>Overflow Prevention</strong> - Bottom margin automatically adjusts for multi-row legends</li>
            <li><strong>Position Control</strong> - Choose from bottom, top, or right placement</li>
            <li><strong>Vertical Layout</strong> - Right positioning uses vertical legend layout for space efficiency</li>
            <li><strong>Dynamic Spacing</strong> - Margins adapt based on legend position and estimated size</li>
          </ul>
          <ul className="text-body-sm text-[var(--color-text-secondary)] space-y-2 list-disc list-inside">
            <li><strong>Multi-Chart Support</strong> - Works consistently across all chart types</li>
            <li><strong>Responsive Behavior</strong> - Legend positioning maintains proper spacing at all sizes</li>
            <li><strong>Layout Preservation</strong> - X-axis and Y-axis labels never overlap with legend</li>
            <li><strong>Stroke Style Support</strong> - Legend markers reflect line styles (solid, dashed, dotted)</li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

// Sample data for freight rates with markers
const freightRatesData = [
  { name: 'Mar 25', freightRate: 15, prediction: 14 },
  { name: 'Apr 25', freightRate: 13, prediction: 13.5 },
  { name: 'May 25', freightRate: 17, prediction: 16 },
  { name: 'Jun 25', freightRate: 14, prediction: 15 },
  { name: 'Jul 25', freightRate: 18, prediction: 17.5 },
  { name: 'Aug 25', freightRate: 16, prediction: 17 },
  { name: 'Sep 25', freightRate: 20, prediction: 19 },
  { name: 'Oct 25', freightRate: 18, prediction: 18.5 },
  { name: 'Nov 25', freightRate: 17, prediction: 19 },
];

export const ReferenceMarkers: Story = {
  render: () => (
    <div className="w-full max-w-7xl mx-auto p-[var(--space-lg)] space-y-[var(--space-xlg)]">
      <div>
        <h2 className="text-heading-lg mb-[var(--space-md)]">Reference Markers</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-xlg)]">
          Reference markers display independent data points (like negotiation offers, bids, or events) at specific X-axis positions
          with a vertical black line spanning the full chart height. Hover over the marked position to see marker data in the tooltip.
        </p>
      </div>

      <div className="space-y-[var(--space-xlg)]">
        {/* Freight Rates with Negotiation Markers */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Freight Rates with Order Negotiations</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            This chart shows freight rates over time with a reference marker at Sep 25 showing negotiation offers for a specific order.
            Hover over Sep 25 to see all marker data in the tooltip.
          </p>
          <Chart
            type="line"
            data={freightRatesData}
            config={createChartConfig({
              freightRate: { label: 'Freight rate ($/mt)', strokeStyle: 'solid' },
              prediction: { label: 'Prediction ($/mt)', strokeStyle: 'dashed' },
            })}
            height={350}
            showGrid={true}
            showLegend={true}
            className="w-full"
            yAxisDomain={[0, 30]}
            referenceMarkers={[
              {
                xValue: 'Sep 25',
                showLine: true,
                tooltipLabel: 'Order #1234 Negotiations:',
                dataPoints: [
                  {
                    yValue: 18,
                    label: 'Counter offer 1',
                    shape: 'triangle',
                    size: 5,
                    fill: '#DCB891',
                    stroke: '#B8956F',
                    strokeWidth: 1,
                  },
                  {
                    yValue: 19,
                    label: 'Initial offer',
                    shape: 'circle',
                    size: 4,
                    fill: '#D27369',
                    stroke: '#B85E55',
                    strokeWidth: 1,
                  },
                  {
                    yValue: 20.5,
                    label: 'Counter offer 2',
                    shape: 'circle',
                    size: 4,
                    fill: '#D27369',
                    stroke: '#B85E55',
                    strokeWidth: 1,
                  },
                  {
                    yValue: 21,
                    label: 'Final agreed price',
                    shape: 'square',
                    size: 4,
                    fill: '#7FB069',
                    stroke: '#5F8A4F',
                    strokeWidth: 1,
                  },
                ],
              },
            ]}
          />
        </div>

        {/* Multiple Reference Markers */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Multiple Events on Timeline</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Multiple reference markers can mark different events at different times. Each marker can have its own custom styling and tooltip label.
          </p>
          <Chart
            type="line"
            data={freightRatesData}
            config={createChartConfig({
              freightRate: { label: 'Freight rate ($/mt)', strokeStyle: 'solid' },
            })}
            height={350}
            showGrid={true}
            showLegend={true}
            className="w-full"
            referenceMarkers={[
              {
                xValue: 'Jun 25',
                showLine: true,
                lineStyle: { stroke: '#487D9A', strokeWidth: 2, strokeDasharray: '5 5' },
                tooltipLabel: 'Event A:',
                dataPoints: [
                  {
                    yValue: 15,
                    label: 'Target price',
                    shape: 'triangle',
                    size: 5,
                    fill: '#487D9A',
                  },
                ],
              },
              {
                xValue: 'Sep 25',
                showLine: true,
                lineStyle: { stroke: '#D27369', strokeWidth: 2 },
                tooltipLabel: 'Event B:',
                dataPoints: [
                  {
                    yValue: 20,
                    label: 'Peak price',
                    shape: 'circle',
                    size: 5,
                    fill: '#D27369',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
}

export const LegendHeightControl: Story = {
  render: () => (
    <div className="w-full max-w-7xl mx-auto p-[var(--space-lg)] space-y-[var(--space-xlg)]">
      <div>
        <h2 className="text-heading-lg mb-[var(--space-md)]">Legend Height Control</h2>
        <p className="text-body-md text-[var(--color-text-secondary)] mb-[var(--space-xlg)]">
          Use the <code className="text-caption-sm px-1 py-0.5 bg-[var(--grey-100)] rounded">legendHeight</code> prop to reserve space for the legend.
          The height prop is the total container height. Chart body gets <code className="text-caption-sm px-1 py-0.5 bg-[var(--grey-100)] rounded">height - legendHeight</code>.
          This ensures consistent chart body sizes across different legend configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xlg)]">
        {/* Standard Height (Default Behavior) */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Standard Mode (no legendHeight)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Total height = 200px fixed. Chart body and legend share this space. Charts with more legend items have smaller plotting areas.
          </p>
          <div className="border border-dashed border-[var(--color-border-accent)] rounded p-2">
            <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Container: 200px total (shared)</p>
            <Chart
              type="line"
              data={monthlyData}
              config={createChartConfig({
                value: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
                sales: { label: 'Sales', color: 'var(--color-chart-line-2)' },
                profit: { label: 'Profit', color: 'var(--color-chart-line-3)' },
              })}
              height={200}
              showLegend={true}
              className="w-full"
            />
          </div>
        </div>

        {/* Legend Height Mode */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg">
          <h3 className="text-heading-md mb-[var(--space-md)]">Legend Height Mode (height=240, legendHeight=40)</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            Total = 240px. Chart body = 200px (240-40). Legend = 40px reserved.
          </p>
          <div className="border border-dashed border-[var(--color-border-accent)] rounded p-2">
            <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Total: 240px (200px chart + 40px legend)</p>
            <Chart
              type="line"
              data={monthlyData}
              config={createChartConfig({
                value: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
                sales: { label: 'Sales', color: 'var(--color-chart-line-2)' },
                profit: { label: 'Profit', color: 'var(--color-chart-line-3)' },
              })}
              height={240}
              legendHeight={40}
              showLegend={true}
              className="w-full"
            />
          </div>
        </div>

        {/* Legend Height with Many Legend Items */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg lg:col-span-2">
          <h3 className="text-heading-md mb-[var(--space-md)]">Legend Height with Multi-Row Legend</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            With 6 metrics needing 2 rows. Total = 318px. Chart body = 250px (318-68). Legend = 68px reserved.
          </p>
          <div className="border border-dashed border-[var(--color-border-accent)] rounded p-2">
            <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Total: 318px (250px chart + 68px legend)</p>
            <Chart
              type="line"
              data={[
                { name: 'Jan', metric1: 400, metric2: 300, metric3: 200, metric4: 350, metric5: 280, metric6: 320 },
                { name: 'Feb', metric1: 300, metric2: 450, metric3: 280, metric4: 300, metric5: 320, metric6: 380 },
                { name: 'Mar', metric1: 500, metric2: 380, metric3: 220, metric4: 420, metric5: 360, metric6: 340 },
                { name: 'Apr', metric1: 280, metric2: 520, metric3: 350, metric4: 380, metric5: 400, metric6: 360 },
              ]}
              config={createChartConfig({
                metric1: { label: 'Revenue', color: 'var(--color-chart-line-1)' },
                metric2: { label: 'Sales', color: 'var(--color-chart-line-2)' },
                metric3: { label: 'Profit', color: 'var(--color-chart-line-3)' },
                metric4: { label: 'Cost', color: 'var(--color-chart-line-4)' },
                metric5: { label: 'Marketing', color: 'var(--color-chart-line-5)' },
                metric6: { label: 'Operations', color: 'var(--color-chart-bar-1)' },
              })}
              height={318}
              legendHeight={68}
              showLegend={true}
              className="w-full"
            />
          </div>
        </div>

        {/* Use Case: Dashboard Grid */}
        <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] p-[var(--space-lg)] rounded-lg lg:col-span-2">
          <h3 className="text-heading-md mb-[var(--space-md)]">Use Case: Dashboard with Consistent Chart Bodies</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-[var(--space-md)]">
            All three charts: <code className="text-caption-sm px-1 py-0.5 bg-[var(--grey-100)] rounded">height=248</code> and <code className="text-caption-sm px-1 py-0.5 bg-[var(--grey-100)] rounded">legendHeight=68</code>.
            Chart body for all = 180px (248-68). Total container for all = 248px. Perfect alignment!
          </p>
          <div className="grid grid-cols-3 gap-4 items-start">
            <div className="border border-[var(--color-border-primary-subtle)] rounded p-3">
              <h4 className="text-body-strong-sm mb-2">2 Metrics</h4>
              <Chart
                type="line"
                data={monthlyData.slice(0, 4)}
                config={createChartConfig({
                  value: { label: 'Total Revenue Stream', color: 'var(--color-chart-line-1)' },
                  sales: { label: 'Quarterly Sales Volume', color: 'var(--color-chart-line-2)' },
                })}
                height={248}
                legendHeight={68}
                showLegend={true}
                className="w-full"
              />
            </div>
            <div className="border border-[var(--color-border-primary-subtle)] rounded p-3">
              <h4 className="text-body-strong-sm mb-2">3 Metrics</h4>
              <Chart
                type="line"
                data={monthlyData.slice(0, 4)}
                config={createChartConfig({
                  value: { label: 'Total Revenue Stream', color: 'var(--color-chart-line-1)' },
                  sales: { label: 'Quarterly Sales Volume', color: 'var(--color-chart-line-2)' },
                  profit: { label: 'Net Profit Margin', color: 'var(--color-chart-line-3)' },
                })}
                height={248}
                legendHeight={68}
                showLegend={true}
                className="w-full"
              />
            </div>
            <div className="border border-[var(--color-border-primary-subtle)] rounded p-3">
              <h4 className="text-body-strong-sm mb-2">5 Metrics</h4>
              <Chart
                type="line"
                data={monthlyData.slice(0, 4)}
                config={createChartConfig({
                  value: { label: 'Total Revenue Stream', color: 'var(--color-chart-line-1)' },
                  sales: { label: 'Quarterly Sales Volume', color: 'var(--color-chart-line-2)' },
                  profit: { label: 'Net Profit Margin', color: 'var(--color-chart-line-3)' },
                  cost: { label: 'Operating Expenses', color: 'var(--color-chart-line-4)' },
                  value2: { label: 'Customer Acquisition', color: 'var(--color-chart-line-5)' },
                })}
                height={248}
                legendHeight={68}
                showLegend={true}
                className="w-full"
              />
            </div>
          </div>
          <p className="text-caption-sm text-[var(--color-text-secondary)] mt-4">
            ✓ All chart bodies are exactly 180px (248 - 68 = 180)<br />
            ✓ All total containers are exactly 248px<br />
            ✓ Perfect for dashboard grids where consistent sizing is critical
          </p>
        </div>
      </div>
    </div>
  ),
}

