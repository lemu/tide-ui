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

