import { useState, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

// Enhanced color palettes for different chart types with accessibility support
export const chartColorSchemes = {
  bar: [
    "#3B82F6", // blue-500
    "#1D4ED8", // blue-700  
    "#1E40AF", // blue-800
    "#1E3A8A", // blue-900
    "#312E81", // indigo-800
    "#1E1B4B", // indigo-900
    "#F59E0B", // amber-500 (contrast color)
    "#DC2626", // red-600 (contrast color)
  ],
  line: [
    "#10B981", // emerald-500
    "#059669", // emerald-600
    "#047857", // emerald-700
    "#065F46", // emerald-800
    "#064E3B", // emerald-900
    "#022C22", // emerald-950
    "#8B5CF6", // violet-500 (contrast color)
    "#DC2626", // red-600 (contrast color)
  ],
  scatter: [
    "#8B5CF6", // violet-500
    "#7C3AED", // violet-600
    "#6D28D9", // violet-700
    "#5B21B6", // violet-800
    "#4C1D95", // violet-900
    "#312E81", // indigo-800
    "#10B981", // emerald-500 (contrast color)
    "#F59E0B", // amber-500 (contrast color)
  ],
  // New accessibility-focused scheme
  accessible: [
    "#0066CC", // High contrast blue
    "#CC6600", // High contrast orange
    "#009966", // High contrast green
    "#CC0066", // High contrast magenta
    "#6600CC", // High contrast purple
    "#CC9900", // High contrast gold
    "#006666", // High contrast teal
    "#CC0000", // High contrast red
  ],
} as const;

export type ChartType = "bar" | "horizontal-bar" | "line" | "scatter" | "composed";
export type ChartColorScheme = keyof typeof chartColorSchemes;

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    type?: "bar" | "line" | "area"; // For composed charts
  };
}

export interface ChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  config: ChartConfig;
  className?: string;
  height?: number;
  width?: number;
  onDataPointClick?: (data: ChartDataPoint, index: number) => void;
  onDataPointHover?: (data: ChartDataPoint | null, index?: number) => void;
  highlightedIndex?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colorScheme?: ChartColorScheme; // Allow custom color schemes
  responsive?: boolean; // Control responsive behavior
  maintainAspectRatio?: boolean; // Control aspect ratio
}

// Enhanced tooltip component with better accessibility and formatting
const CustomTooltip = ({ active, payload, label, config }: any & { config: ChartConfig }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div 
      className="rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-sm)] shadow-md max-w-xs"
      role="tooltip"
      aria-label="Chart data tooltip"
    >
      <p className="text-body-sm font-medium mb-[var(--space-xsm)] text-[var(--color-text-primary)]">
        {label}
      </p>
      {payload.map((entry: any, index: number) => {
        const value = typeof entry.value === 'number' 
          ? entry.value.toLocaleString() 
          : entry.value;
        
        return (
          <div key={index} className="flex items-center gap-[var(--space-xsm)] text-body-sm">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-[var(--color-text-secondary)] min-w-0">
              {config[entry.dataKey as string]?.label || entry.dataKey}:
            </span>
            <span className="font-medium text-[var(--color-text-primary)] ml-auto">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export function Chart({
  type,
  data,
  config,
  className,
  height = 300,
  width,
  onDataPointClick,
  onDataPointHover,
  highlightedIndex,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colorScheme,
  responsive = true,
  maintainAspectRatio = false,
  ...props
}: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get color scheme based on chart type or custom scheme
  const activeColorScheme = useMemo(() => {
    if (colorScheme) {
      return chartColorSchemes[colorScheme];
    }
    
    switch (type) {
      case "bar":
      case "horizontal-bar":
        return chartColorSchemes.bar;
      case "line":
        return chartColorSchemes.line;
      case "scatter":
        return chartColorSchemes.scatter;
      case "composed":
        return chartColorSchemes.bar; // Use bar colors for composed charts
      default:
        return chartColorSchemes.bar;
    }
  }, [type, colorScheme]);

  // Get data keys from config (exclude 'name' which is the category axis)
  const dataKeys = Object.keys(config).filter(key => key !== 'name');

  const handleMouseEnter = useCallback((data: any) => {
    const index = data?.activeTooltipIndex ?? 0;
    setHoveredIndex(index);
    onDataPointHover?.(data?.activePayload?.[0]?.payload, index);
  }, [onDataPointHover]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    onDataPointHover?.(null);
  }, [onDataPointHover]);

  const handleClick = useCallback((data: any) => {
    const index = data?.activeTooltipIndex ?? 0;
    onDataPointClick?.(data?.activePayload?.[0]?.payload, index);
  }, [onDataPointClick]);

  // Dynamic margins based on chart type
  const getMargins = () => {
    switch (type) {
      case "horizontal-bar":
        return { top: 20, right: 50, left: 60, bottom: 20 }; // More space for Y-axis labels
      case "scatter":
        return { top: 20, right: 40, left: 40, bottom: 40 }; // More space for number axes
      default:
        return { top: 20, right: 30, left: 20, bottom: 20 };
    }
  };

  const commonProps = {
    data,
    margin: getMargins(),
  };

  const xAxisProps = {
    axisLine: false,
    tickLine: false,
    tick: { 
      fontSize: 12, 
      fill: "var(--color-text-secondary)",
      fontFamily: "Inter, sans-serif"
    },
  };

  const yAxisProps = {
    axisLine: false,
    tickLine: false,
    tick: { 
      fontSize: 12, 
      fill: "var(--color-text-secondary)",
      fontFamily: "Inter, sans-serif"
    },
  };

  const gridProps = {
    strokeDasharray: "2 2",
    stroke: "var(--color-border-primary-subtle)",
    horizontal: true,
    vertical: false,
  };

  const legendProps = {
    wrapperStyle: {
      fontSize: "12px",
      fontFamily: "Inter, sans-serif",
      color: "var(--color-text-secondary)",
    },
  };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart 
            {...commonProps}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis dataKey="name" {...xAxisProps} />
            <YAxis {...yAxisProps} />
            {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} config={config} />} />}
            {showLegend && <Legend {...legendProps} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const shouldDim = highlightedIndex !== undefined && hoveredIndex !== highlightedIndex;
              const fillColor = shouldDim ? `${baseColor}60` : baseColor;
              
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={fillColor}
                  radius={[2, 2, 0, 0]}
                  className="cursor-pointer transition-colors"
                  isAnimationActive={false}
                  maxBarSize={60}
                />
              );
            })}
          </BarChart>
        );

      case "horizontal-bar":
        return (
          <BarChart 
            {...commonProps}
            layout="vertical"
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showGrid && <CartesianGrid {...gridProps} horizontal={false} vertical={true} />}
            <XAxis type="number" {...xAxisProps} />
            <YAxis type="category" dataKey="name" {...yAxisProps} />
            {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} config={config} />} />}
            {showLegend && <Legend {...legendProps} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const shouldDim = highlightedIndex !== undefined && hoveredIndex !== highlightedIndex;
              const fillColor = shouldDim ? `${baseColor}60` : baseColor;
              
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={fillColor}
                  isAnimationActive={false}
                  maxBarSize={40}
                />
              );
            })}
          </BarChart>
        );

      case "line":
        return (
          <LineChart 
            {...commonProps}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis dataKey="name" {...xAxisProps} />
            <YAxis {...yAxisProps} />
            {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} config={config} />} />}
            {showLegend && <Legend {...legendProps} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const shouldDim = highlightedIndex !== undefined && hoveredIndex !== highlightedIndex;
              const strokeColor = shouldDim ? `${baseColor}60` : baseColor;
              
              return (
                <Line
                  key={key}
                  type="linear"
                  dataKey={key}
                  name={config[key].label}
                  stroke={strokeColor}
                  strokeWidth={2}
                  dot={{ 
                    fill: strokeColor, 
                    strokeWidth: 0,
                    r: 3
                  }}
                  activeDot={{ 
                    r: 5,
                    fill: baseColor
                  }}
                  className="cursor-pointer transition-colors"
                  isAnimationActive={false}
                />
              );
            })}
          </LineChart>
        );

      case "scatter":
        return (
          <ScatterChart 
            {...commonProps}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis dataKey="x" type="number" {...xAxisProps} />
            <YAxis dataKey="y" type="number" {...yAxisProps} />
            {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} config={config} />} />}
            {showLegend && <Legend {...legendProps} />}
            {dataKeys
              .filter(key => key !== 'x' && key !== 'y' && key !== 'name')
              .map((key, index) => {
                const baseColor = config[key]?.color || activeColorScheme[index % activeColorScheme.length];
                const shouldDim = highlightedIndex !== undefined && hoveredIndex !== highlightedIndex;
                const fillColor = shouldDim ? `${baseColor}60` : baseColor;
                
                return (
                  <Scatter
                    key={key}
                    name={config[key]?.label || key}
                    data={data.map(d => ({ x: d.x, y: d.y, [key]: d[key] }))}
                    fill={fillColor}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                  />
                );
              })}
          </ScatterChart>
        );

      case "composed":
        return (
          <ComposedChart 
            {...commonProps}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis dataKey="name" {...xAxisProps} />
            <YAxis {...yAxisProps} domain={[0, 'dataMax']} />
            {showTooltip && <Tooltip content={(props) => <CustomTooltip {...props} config={config} />} />}
            {showLegend && <Legend {...legendProps} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const shouldDim = highlightedIndex !== undefined && hoveredIndex !== highlightedIndex;
              const fillColor = shouldDim ? `${baseColor}60` : baseColor;
              const chartElementType = config[key].type || "bar"; // Default to bar
              
              if (chartElementType === "line") {
                return (
                  <Line
                    key={key}
                    type="linear"
                    dataKey={key}
                    name={config[key].label}
                    stroke={fillColor}
                    strokeWidth={2}
                    dot={{ 
                      fill: fillColor, 
                      strokeWidth: 0,
                      r: 3
                    }}
                    activeDot={{ 
                      r: 5,
                      fill: baseColor
                    }}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                  />
                );
              } else if (chartElementType === "area") {
                return (
                  <Area
                    key={key}
                    type="linear"
                    dataKey={key}
                    name={config[key].label}
                    stroke={baseColor}
                    fill={fillColor}
                    fillOpacity={0.3}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                  />
                );
              } else {
                // Default to bar
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    name={config[key].label}
                    fill={fillColor}
                    radius={[2, 2, 0, 0]}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                    maxBarSize={60}
                  />
                );
              }
            })}
          </ComposedChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {responsive ? (
        <ResponsiveContainer 
          width={width || "100%"} 
          height={height}
          minHeight={200}
          debounceMs={50}
        >
          {renderChart() || <div>Chart error</div>}
        </ResponsiveContainer>
      ) : (
        <div style={{ width: width || "100%", height }}>
          {renderChart() || <div>Chart error</div>}
        </div>
      )}
    </div>
  );
}

// Export utility functions for working with chart data
export const generateChartColors = (count: number, scheme: ChartColorScheme = "bar") => {
  const colors = chartColorSchemes[scheme];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

export const createChartConfig = (
  input: ChartConfig | string[], 
  labels?: string[], 
  colors?: string[]
): ChartConfig => {
  // If input is already a ChartConfig object, return it
  if (!Array.isArray(input)) {
    return input;
  }
  
  // If input is an array of keys, create config from arrays
  const keys = input;
  return keys.reduce((config, key, index) => {
    config[key] = {
      label: labels?.[index] || key,
      color: colors?.[index],
    };
    return config;
  }, {} as ChartConfig);
};