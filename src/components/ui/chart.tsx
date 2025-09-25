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
  [key: string]: string | number | number[]; // Allow arrays for range data
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
    type?: "bar" | "line" | "area" | "range-area"; // For composed charts
    stroke?: string; // Custom stroke color or "none"
    fill?: string; // Custom fill color
    showDots?: boolean; // Show/hide data point dots on lines (default: false)
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
  yAxisWidth?: number; // Override Y-axis space when more room needed
  xAxisTickFormatter?: (value: any, index: number) => string; // Custom X-axis tick formatting
  yAxisTickFormatter?: (value: any, index: number) => string; // Custom Y-axis tick formatting
  // Accessibility
  title?: string; // Chart title for screen readers
  description?: string; // Chart description for screen readers
  showDataTable?: boolean; // Show accessible data table fallback
  tooltipMaxWidth?: string; // Custom tooltip max width class (e.g., 'max-w-xs', 'max-w-48')
}

// Enhanced tooltip component with better accessibility and formatting
const CustomTooltip = ({ active, payload, label, config, tooltipMaxWidth = 'max-w-xs' }: any & { config: ChartConfig; tooltipMaxWidth?: string }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div
      className={`rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-sm)] shadow-md ${tooltipMaxWidth}`}
      role="tooltip"
      aria-label="Chart data tooltip"
    >
      <p className="text-body-sm font-medium mb-[var(--space-xsm)] text-[var(--color-text-primary)]">
        {label}
      </p>
      {payload.map((entry: any, index: number) => {
        const configEntry = config[entry.dataKey as string];
        let displayValue;

        // Handle range-area data specially
        if (configEntry?.type === 'range-area' && entry.payload) {
          const originalData = entry.payload[entry.dataKey];
          if (Array.isArray(originalData) && originalData.length === 2) {
            // Format range as "min – max" with non-breaking spaces to prevent awkward line breaks
            displayValue = `${originalData[0].toLocaleString()}\u00A0–\u00A0${originalData[1].toLocaleString()}`;
          } else {
            displayValue = typeof entry.value === 'number'
              ? entry.value.toLocaleString()
              : entry.value;
          }
        } else {
          displayValue = typeof entry.value === 'number'
            ? entry.value.toLocaleString()
            : entry.value;
        }

        return (
          <div key={index} className="flex items-center gap-[var(--space-xsm)] text-body-sm">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-[var(--color-text-secondary)] min-w-0 break-words">
              {configEntry?.label || entry.dataKey}:
            </span>
            <span className="font-medium text-[var(--color-text-primary)] ml-auto">
              {displayValue}
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
  yAxisWidth,
  xAxisTickFormatter,
  yAxisTickFormatter,
  title,
  description,
  showDataTable = false,
  tooltipMaxWidth = 'max-w-xs',
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

  // Transform data for range-area types
  const processedData = useMemo(() => {
    return data.map(point => {
      const transformedPoint = { ...point };

      // Process range-area data
      dataKeys.forEach(key => {
        if (config[key].type === 'range-area') {
          const value = point[key];
          if (Array.isArray(value) && value.length === 2) {
            // For range areas, we need both the original array and separate min/max
            // Keep the original array for potential other uses
            transformedPoint[key] = value;
            transformedPoint[`${key}_min`] = value[0];
            transformedPoint[`${key}_max`] = value[1];
          }
        }
      });

      return transformedPoint;
    });
  }, [data, config, dataKeys]);

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
    // Comfortable margins with 4px grid system - Y-axis width is the real space controller
    const marginPresets = {
      sm: { top: 4, right: 8, left: 8, bottom: 8 },   // Compact for small charts
      md: { top: 8, right: 12, left: 12, bottom: 12 },  // Balanced for medium charts
      lg: { top: 12, right: 16, left: 16, bottom: 16 }, // Spacious for large charts
    };

    // Auto-calculate size based on height
    const getAutoSize = (height: number): keyof typeof marginPresets => {
      if (height < 300) return 'sm';
      if (height <= 500) return 'md';
      return 'lg';
    };

    const effectiveSize = size === 'auto' ? getAutoSize(chartHeight) : size;
    const baseMargins = marginPresets[effectiveSize];

    // Type-specific adjustments - 4px grid system maintained
    const typeAdjustments = {
      'horizontal-bar': {
        left: baseMargins.left + 8, // Extra space for Y-axis category labels
        right: baseMargins.right + 4, // Space for value labels
      },
      'scatter': {
        left: baseMargins.left + 4, // Slight extra for numeric Y-axis
        right: baseMargins.right + 4,
        bottom: baseMargins.bottom + 4,
      },
      'bar': baseMargins,
      'line': baseMargins, // Clean margins - Y-axis width controls space
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
    data: processedData,
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
    tickFormatter: xAxisTickFormatter,
  };



  const yAxisProps = {
    axisLine: { stroke: "var(--color-border-primary-subtle)", strokeWidth: 2 },
    tickLine: { stroke: "var(--color-border-primary-subtle)", strokeWidth: 1 },
    tick: {
      fontSize: 10,
      fill: "var(--color-text-tertiary)",
      fontFamily: "Inter, sans-serif"
    },
    width: yAxisWidth || 15, // Ultra-minimal default width (15px) vs Recharts default (~60px)
    tickFormatter: yAxisTickFormatter,
  };

  const gridProps = {
    stroke: "var(--color-border-primary-subtle)",
    horizontal: true,
    vertical: false,
  };


  // Custom legend content for consistent styling
  const CustomLegend = ({ payload }: any) => {
    if (!payload || !payload.length) return null;

    // Get dynamic left margin based on actual chart margins (not hardcoded)
    const actualMargins = getMargins();
    const legendLeftOffset = actualMargins.left + 5; // 5px visual alignment adjustment

    return (
      <div
        style={{
          paddingLeft: `${legendLeftOffset}px`,
          paddingRight: '16px'
        }}
      >
        <div className="flex flex-wrap justify-start items-start gap-x-[var(--space-md)] gap-y-[var(--space-sm)]">
        {payload.map((entry: any, index: number) => {
          const getMarkerElement = () => {
            switch (type) {
              case "line":
                return (
                  <div
                    className="w-[12px] h-[2px] flex-shrink-0"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                );
              case "scatter":
                return (
                  <div
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                );
              case "bar":
              case "horizontal-bar":
              case "area":
              case "composed":
              default:
                return (
                  <div
                    className="w-[6px] h-[6px] flex-shrink-0"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                );
            }
          };

          return (
            <div key={index} className="flex items-center justify-center gap-[var(--space-xsm)]">
              {getMarkerElement()}
              <span className="[&]:text-body-medium-xsm [&]:text-[var(--color-text-secondary)] leading-none whitespace-nowrap">
                {entry.value}
              </span>
            </div>
          );
        })}
        </div>
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} />}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} />}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} />} 
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
                  dot={config[key].showDots === true ? {
                    fill: baseColor,
                    strokeWidth: 0,
                    r: 3
                  } : false}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} />} 
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} />} 
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
                    dot={config[key].showDots === true ? {
                      fill: baseColor,
                      strokeWidth: 0,
                      r: 3
                    } : false}
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
                    stroke={config[key].stroke ?? baseColor}
                    fill={config[key].fill ?? baseColor}
                    fillOpacity={0.3}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                  />
                );
              } else if (chartElementType === "range-area") {
                // For range areas, use Area with proper baseLine data transformation
                const customData = processedData.map(point => ({
                  ...point,
                  [key]: point[`${key}_max`] // Use max value as the area height
                }));

                return (
                  <Area
                    key={key}
                    type="linear"
                    dataKey={key}
                    name={config[key].label}
                    stroke={config[key].stroke ?? "none"}
                    fill={config[key].fill ?? baseColor}
                    fillOpacity={0.3}
                    className="cursor-pointer transition-colors"
                    isAnimationActive={false}
                    // Use a custom shape to render the range properly
                    baseLine={(props: any) => {
                      // Return the min value for each data point
                      const dataPoint = processedData[props.index];
                      return dataPoint ? dataPoint[`${key}_min`] : 0;
                    }}
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

  // Accessible data table for screen readers
  const DataTable = () => {
    if (!showDataTable) return null;

    return (
      <div className="sr-only">
        <table role="table" aria-label={title ? `Data for ${title}` : "Chart data"}>
          <caption className="sr-only">
            {title && `${title}. `}
            {description || `${type} chart showing ${dataKeys.length} data series across ${data.length} categories.`}
          </caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              {dataKeys.map(key => (
                <th key={key} scope="col">{config[key]?.label || key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.name || `Item ${index + 1}`}</th>
                {dataKeys.map(key => (
                  <td key={key}>
                    {yAxisTickFormatter
                      ? yAxisTickFormatter(item[key], index)
                      : item[key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
      role="img"
      aria-label={title || `${type} chart`}
      aria-describedby={description ? `${chartRef.current?.id || 'chart'}-desc` : undefined}
      {...props}
    >
      {title && (
        <h3 className="sr-only" id={`${chartRef.current?.id || 'chart'}-title`}>
          {title}
        </h3>
      )}
      {description && (
        <p className="sr-only" id={`${chartRef.current?.id || 'chart'}-desc`}>
          {description}
        </p>
      )}

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

      <DataTable />
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