import React, { useCallback, useMemo } from "react";
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
    "var(--color-chart-bar-1)", // #487D9A - Deep blue-teal
    "var(--color-chart-bar-2)", // #86C8CF - Light teal
    "var(--color-chart-bar-3)", // #D27369 - Coral red
    "var(--color-chart-bar-4)", // #CFDEE6 - Light blue-gray
    "var(--color-chart-bar-5)", // #DCB891 - Warm beige
    "var(--color-chart-bar-6)", // #56959D - Medium teal
  ],
  line: [
    "var(--color-chart-line-1)", // #487D9A - Deep blue-teal
    "var(--color-chart-line-2)", // #86C8CF - Light teal
    "var(--color-chart-line-3)", // #DCB891 - Warm beige
    "var(--color-chart-line-4)", // #D27369 - Coral red
    "var(--color-chart-line-5)", // #6B9691 - Sage green-teal
  ],
  scatter: [
    "var(--color-chart-scatter-1)", // #66B1BA - Bright teal
    "var(--color-chart-scatter-2)", // #A14238 - Deep red-brown
    "var(--color-chart-scatter-3)", // #DCB891 - Warm beige
    "var(--color-chart-scatter-4)", // #3B5D73 - Dark blue-gray
    "var(--color-chart-scatter-5)", // #56959D - Medium teal
    "var(--color-chart-scatter-6)", // #D27369 - Coral red
  ],
  // Area chart colors optimized for filled regions with transparency
  area: [
    "var(--color-chart-area-1)", // #487D9A - Deep blue-teal
    "var(--color-chart-area-2)", // #86C8CF - Light teal
    "var(--color-chart-area-3)", // #DCB891 - Warm beige
    "var(--color-chart-area-4)", // #699792 - Medium sage
    "var(--color-chart-area-5)", // #A1C8C4 - Soft teal
    "var(--color-chart-area-6)", // #3B5D73 - Dark blue-gray
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

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type ChartMarginSize = 'sm' | 'md' | 'lg' | 'auto';

export interface ChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  config: ChartConfig;
  className?: string;
  height?: number;
  width?: number;
  minWidth?: number;
  onDataPointClick?: (data: ChartDataPoint, index: number) => void;
  onDataPointHover?: (data: ChartDataPoint | null, index?: number) => void;
  highlightedIndex?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  colorScheme?: ChartColorScheme; // Allow custom color schemes
  responsive?: boolean; // Control responsive behavior
  maintainAspectRatio?: boolean; // Control aspect ratio
  margin?: Partial<ChartMargin>; // Custom margin override
  marginSize?: ChartMarginSize; // Preset margin sizes
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
  minWidth = 300,
  onDataPointClick,
  onDataPointHover,
  highlightedIndex,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  colorScheme,
  responsive = true,
  maintainAspectRatio = false,
  margin,
  marginSize = 'auto',
  ...props
}: ChartProps) {


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
    onDataPointHover?.(data?.activePayload?.[0]?.payload, index);
  }, [onDataPointHover]);

  const handleMouseLeave = useCallback(() => {
    onDataPointHover?.(null);
  }, [onDataPointHover]);

  const handleClick = useCallback((data: any) => {
    const index = data?.activeTooltipIndex ?? 0;
    onDataPointClick?.(data?.activePayload?.[0]?.payload, index);
  }, [onDataPointClick]);

  // Smart margin calculation based on chart size and type
  const calculateMargins = (size: ChartMarginSize, chartType: ChartType, chartHeight: number): ChartMargin => {
    // Base margins for different sizes - optimized for maximum chart space (multiples of 4px)
    const marginPresets = {
      sm: { top: 4, right: 8, left: 8, bottom: 16 },
      md: { top: 8, right: 12, left: 16, bottom: 20 },
      lg: { top: 16, right: 20, left: 24, bottom: 28 },
    };

    // Auto-calculate size based on height
    const getAutoSize = (height: number): keyof typeof marginPresets => {
      if (height < 300) return 'sm';
      if (height <= 500) return 'md';
      return 'lg';
    };

    const effectiveSize = size === 'auto' ? getAutoSize(chartHeight) : size;
    const baseMargins = marginPresets[effectiveSize];

    // Type-specific adjustments - reduced for tighter spacing (multiples of 4px)
    const typeAdjustments = {
      'horizontal-bar': {
        left: baseMargins.left + 12, // Extra space for Y-axis labels
        right: baseMargins.right + 4, // Extra space for value labels
      },
      'scatter': {
        left: baseMargins.left + 4, // Minimal extra space for number axes (4px multiple)
        right: baseMargins.right + 4,
        bottom: baseMargins.bottom + 4,
      },
      'bar': baseMargins,
      'line': baseMargins,
      'composed': baseMargins,
    };

    return { ...baseMargins, ...typeAdjustments[chartType] };
  };

  // Dynamic margins based on props, chart type, and size
  const getMargins = (): ChartMargin => {
    // If custom margin is provided, use it (with fallbacks for missing values)
    if (margin) {
      const defaultMargin = calculateMargins(marginSize || 'auto', type, height);
      return {
        top: margin.top ?? defaultMargin.top,
        right: margin.right ?? defaultMargin.right,
        bottom: margin.bottom ?? defaultMargin.bottom,
        left: margin.left ?? defaultMargin.left,
      };
    }

    // Use calculated margins based on marginSize (defaults to 'auto')
    return calculateMargins(marginSize || 'auto', type, height);
  };

  const commonProps = {
    data,
    margin: getMargins(),
  };

  const xAxisProps = {
    axisLine: { stroke: "var(--color-border-primary-subtle)", strokeWidth: 2 },
    tickLine: false,
    tick: { 
      fontSize: 10, 
      fill: "var(--color-text-tertiary)",
      fontFamily: "Inter, sans-serif"
    },
  };



  const yAxisProps = {
    axisLine: { stroke: "var(--color-border-primary-subtle)", strokeWidth: 2 },
    tickLine: { stroke: "var(--color-border-primary-subtle)", strokeWidth: 1 },
    tick: { 
      fontSize: 10, 
      fill: "var(--color-text-tertiary)",
      fontFamily: "Inter, sans-serif"
    },
  };

  const gridProps = {
    stroke: "var(--color-border-primary-subtle)",
    horizontal: true,
    vertical: false,
  };


  // Custom legend content for consistent styling
  const CustomLegend = ({ payload }: any) => {
    if (!payload || !payload.length) return null;
    
    // Get left margin to align with Y-axis start (accounting for Y-axis label width + tick marks)
    const getLeftMargin = () => {
      switch (type) {
        case "horizontal-bar":
          return "ml-[65px]"; // 60px + 5px adjustment
        case "scatter":
          return "ml-[69px]"; // 64px + 5px adjustment
        default:
          return "ml-[59px]"; // 54px + 5px adjustment
      }
    };
    
    return (
      <div className={`flex justify-start items-center gap-[var(--space-md)] ${getLeftMargin()}`}>
        {payload.map((entry: any, index: number) => {
          const isBarChart = type === "bar" || type === "horizontal-bar";
          return (
            <div key={index} className="flex items-center justify-center gap-[var(--space-xsm)]">
              <div
                className={isBarChart ? "w-[6px] h-[6px] flex-shrink-0" : "w-[6px] h-[6px] rounded-full flex-shrink-0"}
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="[&]:text-body-medium-xsm [&]:text-[var(--color-text-secondary)] leading-none">
                {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    );
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
            {showTooltip && <Tooltip 
              content={(props) => <CustomTooltip {...props} config={config} />}
              cursor={{ 
                stroke: "var(--color-border-primary)", 
                strokeWidth: 1,
                fill: "var(--color-background-neutral)",
                fillOpacity: 1.0
              }}
              position={{ x: undefined, y: undefined }}
              offset={10}
              animationDuration={0}
            />}
            {showLegend && <Legend content={<CustomLegend />} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];

              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={baseColor}
                  radius={[0, 0, 0, 0]}
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
            {showTooltip && <Tooltip 
              content={(props) => <CustomTooltip {...props} config={config} />}
              cursor={{ 
                stroke: "var(--color-border-primary)", 
                strokeWidth: 1,
                fill: "var(--color-background-neutral)",
                fillOpacity: 1.0
              }}
              position={{ x: undefined, y: undefined }}
              offset={10}
              animationDuration={0}
            />}
            {showLegend && <Legend content={<CustomLegend />} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];

              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={baseColor}
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
            {showTooltip && <Tooltip 
              content={(props) => <CustomTooltip {...props} config={config} />} 
              position={{ x: undefined, y: undefined }}
              offset={10}
              animationDuration={0}
            />}
            {showLegend && <Legend content={<CustomLegend />} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];

              return (
                <Line
                  key={key}
                  type="linear"
                  dataKey={key}
                  name={config[key].label}
                  stroke={baseColor}
                  strokeWidth={2}
                  dot={{
                    fill: baseColor,
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
            {showTooltip && <Tooltip 
              content={(props) => <CustomTooltip {...props} config={config} />} 
              position={{ x: undefined, y: undefined }}
              offset={10}
              animationDuration={0}
            />}
            {showLegend && <Legend content={<CustomLegend />} />}
            {dataKeys
              .filter(key => key !== 'x' && key !== 'y' && key !== 'name')
              .map((key, index) => {
                const baseColor = config[key]?.color || activeColorScheme[index % activeColorScheme.length];

                return (
                  <Scatter
                    key={key}
                    name={config[key]?.label || key}
                    data={data.map(d => ({ x: d.x, y: d.y, [key]: d[key] }))}
                    fill={baseColor}
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
            {showTooltip && <Tooltip 
              content={(props) => <CustomTooltip {...props} config={config} />} 
              position={{ x: undefined, y: undefined }}
              offset={10}
              animationDuration={0}
            />}
            {showLegend && <Legend content={<CustomLegend />} />}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const chartElementType = config[key].type || "bar"; // Default to bar

              if (chartElementType === "line") {
                return (
                  <Line
                    key={key}
                    type="linear"
                    dataKey={key}
                    name={config[key].label}
                    stroke={baseColor}
                    strokeWidth={2}
                    dot={{
                      fill: baseColor,
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
                    fill={baseColor}
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
                    fill={baseColor}
                    radius={[0, 0, 0, 0]}
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

  const chartRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const chartContainer = chartRef.current;
    if (!chartContainer) return;
    
    const timeoutId = setTimeout(() => {
      // Find all Y-axis ticks and make the zero tick thicker
      const ticks = chartContainer.querySelectorAll('.recharts-cartesian-axis-tick');
      ticks.forEach(tick => {
        const text = tick.querySelector('text');
        const tickLine = tick.querySelector('.recharts-cartesian-axis-tick-line');
        if (text?.textContent?.trim() === '0' && tickLine) {
          (tickLine as SVGElement).setAttribute('stroke-width', '2');
        }
      });
    }, 100); // Small delay to ensure chart is rendered
    
    return () => clearTimeout(timeoutId);
  }, [data, type]);

  return (
    <div 
      ref={chartRef}
      className={cn("w-full", className)} 
      style={{ minWidth }}
      {...props}
    >
      {responsive ? (
        <ResponsiveContainer 
          width={width || "100%"} 
          height={height}
          minHeight={200}
        >
          {renderChart() || <div>Chart error</div>}
        </ResponsiveContainer>
      ) : (
        <div style={{ width: width || "100%", height, minWidth }}>
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