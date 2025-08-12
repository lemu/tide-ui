import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, createChartConfig, generateChartColors, chartColorSchemes } from "@/components/ui/chart";
import { LinkedChart, createLinkedChartColumns } from "@/components/ui/linked-chart";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

// Sample data for different chart types
const salesData = [
  { name: "Jan", revenue: 4000, profit: 2400, orders: 240 },
  { name: "Feb", revenue: 3000, profit: 1398, orders: 139 },
  { name: "Mar", revenue: 2000, profit: 9800, orders: 980 },
  { name: "Apr", revenue: 2780, profit: 3908, orders: 390 },
  { name: "May", revenue: 1890, profit: 4800, orders: 480 },
  { name: "Jun", revenue: 2390, profit: 3800, orders: 380 },
  { name: "Jul", revenue: 3490, profit: 4300, orders: 430 },
];

const performanceData = [
  { name: "Website", desktop: 86, mobile: 73, tablet: 69 },
  { name: "Mobile App", desktop: 92, mobile: 88, tablet: 85 },
  { name: "Social Media", desktop: 78, mobile: 82, tablet: 76 },
  { name: "Email", desktop: 91, mobile: 85, tablet: 88 },
  { name: "Direct", desktop: 95, mobile: 89, tablet: 92 },
];

const growthData = [
  { name: "Q1", growth: 12, target: 15 },
  { name: "Q2", growth: 18, target: 20 },
  { name: "Q3", growth: 25, target: 25 },
  { name: "Q4", growth: 32, target: 30 },
];

const scatterData = [
  { name: "Product A", x: 100, y: 200, size: 20, category: "Electronics" },
  { name: "Product B", x: 120, y: 100, size: 15, category: "Electronics" },
  { name: "Product C", x: 170, y: 300, size: 25, category: "Clothing" },
  { name: "Product D", x: 140, y: 250, size: 18, category: "Books" },
  { name: "Product E", x: 150, y: 400, size: 30, category: "Clothing" },
  { name: "Product F", x: 110, y: 280, size: 22, category: "Electronics" },
];

// Chart configurations
const salesConfig = createChartConfig(
  ["revenue", "profit", "orders"],
  ["Revenue", "Profit", "Orders"],
  generateChartColors(3, "bar")
);

const performanceConfig = createChartConfig(
  ["desktop", "mobile", "tablet"],
  ["Desktop", "Mobile", "Tablet"],
  generateChartColors(3, "bar")
);

const growthConfig = createChartConfig(
  ["growth", "target"],
  ["Actual Growth", "Target Growth"],
  generateChartColors(2, "line")
);

const scatterConfig = createChartConfig(
  ["size"],
  ["Market Size"],
  generateChartColors(1, "scatter")
);

export function ChartPreview() {
  const [selectedChartType, setSelectedChartType] = useState<"bar" | "horizontal-bar" | "line" | "scatter">("bar");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Charts</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Interactive charts built with Recharts, featuring multiple chart types, color schemes, and linked data table functionality
        </p>
      </div>

      {/* Color Schemes Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-md">Color Schemes</CardTitle>
          <CardDescription>
            Each chart type uses a distinct 6-color palette for visual consistency and accessibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)]">
            {Object.entries(chartColorSchemes).map(([scheme, colors]) => (
              <div key={scheme} className="space-y-[var(--space-sm)]">
                <h4 className="text-body-medium-md capitalize">
                  {scheme} Charts
                  <Badge variant="secondary" size="sm" className="ml-[var(--space-sm)]">
                    {colors.length} colors
                  </Badge>
                </h4>
                <div className="flex gap-[var(--space-xsm)]">
                  {colors.map((color, index) => (
                    <div key={index} className="space-y-[var(--space-xsm)]">
                      <div
                        className="w-12 h-8 rounded-sm border border-[var(--color-border-primary-subtle)]"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-caption-xsm font-mono text-center text-[var(--color-text-secondary)]">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic Chart Types */}
      <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
        
        {/* Vertical Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="bar-chart" size="sm" color="brand" />
              Vertical Bar Chart
            </CardTitle>
            <CardDescription>
              Revenue, profit, and orders data with blue color scheme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={salesData}
              config={salesConfig}
              height={250}
              showLegend={true}
              showGrid={true}
            />
          </CardContent>
        </Card>

        {/* Horizontal Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="bar-chart" size="sm" color="brand" />
              Horizontal Bar Chart
            </CardTitle>
            <CardDescription>
              Performance metrics across different platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="horizontal-bar"
              data={performanceData}
              config={performanceConfig}
              height={250}
              showLegend={true}
              showGrid={true}
            />
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="trending-up" size="sm" color="brand" />
              Linear Line Chart
            </CardTitle>
            <CardDescription>
              Growth trends with linear lines (no smoothing) and green color scheme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={growthData}
              config={growthConfig}
              height={250}
              showLegend={true}
              showGrid={true}
            />
          </CardContent>
        </Card>

        {/* Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="scatter-chart" size="sm" color="brand" />
              Scatter Plot
            </CardTitle>
            <CardDescription>
              Product positioning data with purple color scheme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="scatter"
              data={scatterData}
              config={scatterConfig}
              height={250}
              showLegend={false}
              showGrid={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Interactive Chart Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Interactive Chart Types</CardTitle>
          <CardDescription>
            Switch between different chart types to see the same data visualized differently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)]">
            <div className="flex gap-[var(--space-sm)]">
              <Button
                variant={selectedChartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedChartType("bar")}
              >
                <Icon name="bar-chart" size="sm" className="mr-[var(--space-sm)]" />
                Vertical Bar
              </Button>
              <Button
                variant={selectedChartType === "horizontal-bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedChartType("horizontal-bar")}
              >
                <Icon name="bar-chart" size="sm" className="mr-[var(--space-sm)]" />
                Horizontal Bar
              </Button>
              <Button
                variant={selectedChartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedChartType("line")}
              >
                <Icon name="trending-up" size="sm" className="mr-[var(--space-sm)]" />
                Line Chart
              </Button>
            </div>
            
            <Chart
              type={selectedChartType}
              data={salesData}
              config={salesConfig}
              height={300}
              showLegend={true}
              showGrid={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Linked Chart with Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
            <Icon name="link" size="sm" color="brand" />
            Linked Chart with Data Table
          </CardTitle>
          <CardDescription>
            Interactive chart that syncs with a data table - click chart points to filter, hover to highlight
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkedChart
            title="Sales Performance Dashboard"
            description="Click on chart data points to filter the table below. Hover over chart or table to highlight corresponding data."
            type="bar"
            data={salesData}
            config={salesConfig}
            columns={createLinkedChartColumns(salesConfig, [
              {
                key: "revenue",
                label: "Revenue",
                type: "currency",
              },
              {
                key: "profit",
                label: "Profit",
                type: "currency",
              },
              {
                key: "orders",
                label: "Orders",
                type: "number",
              },
            ])}
            height={300}
            enableFiltering={true}
            enableRowSelection={true}
            showTable={true}
          />
        </CardContent>
      </Card>

      {/* Advanced Linked Chart Example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Advanced Linked Visualization</CardTitle>
          <CardDescription>
            Line chart with performance data showing advanced linking features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkedChart
            title="Platform Performance Analysis"
            description="Multi-platform performance metrics with interactive filtering and selection capabilities."
            type="line"
            data={performanceData}
            config={performanceConfig}
            columns={[
              { key: "name", label: "Platform", type: "text" },
              {
                key: "desktop",
                label: "Desktop Score",
                type: "percentage",
              },
              {
                key: "mobile",
                label: "Mobile Score",
                type: "percentage",
              },
              {
                key: "tablet",
                label: "Tablet Score",
                type: "percentage",
              },
            ]}
            height={300}
            enableFiltering={true}
            enableRowSelection={true}
            showTable={true}
          />
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="palette" size="sm" color="brand" />
              Color Schemes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• 6 distinct colors per chart type</li>
              <li>• Bar charts: Blue palette</li>
              <li>• Line charts: Green palette</li>
              <li>• Scatter plots: Purple palette</li>
              <li>• Accessible contrast ratios</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="mouse-pointer" size="sm" color="brand" />
              Interactivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Hover highlighting</li>
              <li>• Click to filter data</li>
              <li>• Chart-table synchronization</li>
              <li>• Row selection support</li>
              <li>• Custom tooltips</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="settings" size="sm" color="brand" />
              Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Configurable chart types</li>
              <li>• Custom data formatting</li>
              <li>• Flexible column definitions</li>
              <li>• Grid and legend toggles</li>
              <li>• Responsive design</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="bar-chart" size="sm" color="brand" />
              Chart Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Vertical bar charts</li>
              <li>• Horizontal bar charts</li>
              <li>• Linear line charts</li>
              <li>• Scatter plots</li>
              <li>• Built with Recharts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="table" size="sm" color="brand" />
              Data Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Automatic table generation</li>
              <li>• Data type formatting</li>
              <li>• Currency and percentage support</li>
              <li>• Custom format functions</li>
              <li>• Synchronized highlighting</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="shield-check" size="sm" color="brand" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Keyboard navigation</li>
              <li>• Screen reader support</li>
              <li>• High contrast colors</li>
              <li>• Semantic HTML structure</li>
              <li>• ARIA labels and roles</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Guide */}
      <Card className="border-[var(--color-border-information)]">
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
            <Icon name="info" size="sm" color="information" />
            Implementation Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              <strong>Basic Charts:</strong> Use the Chart component for standalone visualizations with built-in color schemes and interactivity.
            </p>
            <p>
              <strong>Linked Charts:</strong> Use LinkedChart for dashboard-style components where chart and table data should stay synchronized.
            </p>
            <p>
              <strong>Color Consistency:</strong> Each chart type automatically uses its designated color palette (bar: blue, line: green, scatter: purple).
            </p>
            <p>
              <strong>Data Format:</strong> Charts expect data arrays with consistent key names. Use createChartConfig() to define data mappings and labels.
            </p>
            <p>
              <strong>Customization:</strong> All chart properties can be overridden, and custom formatting functions can be applied to table columns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}