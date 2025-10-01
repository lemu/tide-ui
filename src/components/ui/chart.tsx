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
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { cn } from "@/lib/utils";

// Format number with spaces as thousands separator, dot for decimals
export const formatNumber = (value: number, decimals: number = 0): string => {
  const fixed = value.toFixed(decimals);
  const parts = fixed.split('.');
  // Add space every 3 digits from the right
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decimals > 0 && parts[1] ? `${integerPart}.${parts[1]}` : integerPart;
};

// Calculate Y-axis width based on longest formatted tick value
const calculateYAxisWidth = (
  data: ChartDataPoint[],
  dataKeys: string[],
  tickFormatter?: (value: any, index: number) => string,
  defaultWidth: number = 20
): number => {
  if (!data.length) return defaultWidth;

  // Find max value across all data keys
  let maxValue = 0;
  data.forEach(point => {
    dataKeys.forEach(key => {
      const value = point[key];
      if (typeof value === 'number') {
        maxValue = Math.max(maxValue, Math.abs(value));
      } else if (Array.isArray(value)) {
        // Handle range-area data
        value.forEach(v => {
          if (typeof v === 'number') {
            maxValue = Math.max(maxValue, Math.abs(v));
          }
        });
      }
    });
  });

  // Format the max value to get character count
  const formattedMax = tickFormatter
    ? tickFormatter(maxValue, 0)
    : maxValue.toString();

  // Calculate width: ~6px per character + 12px padding
  const charCount = formattedMax.length;
  return Math.max(defaultWidth, charCount * 6 + 12);
};

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
    strokeStyle?: "solid" | "dashed" | "dotted"; // Line style for line charts
  };
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// Reference Marker interfaces for vertical lines with independent data points
export interface ReferenceMarkerDataPoint {
  yValue: number;                    // Explicit Y-value on chart
  label?: string;                    // Optional label for tooltip/identification
  shape?: 'circle' | 'triangle' | 'square';  // Marker shape
  size?: number;                     // Marker radius/size (default: 4)
  fill?: string;                     // Fill color
  stroke?: string;                   // Border color
  strokeWidth?: number;              // Border width
}

export interface ReferenceMarker {
  xValue: string | number;           // X-axis position (e.g., "Sep 25" or timestamp)
  showLine?: boolean;                // Show vertical line (default: true)
  lineStyle?: {
    stroke?: string;                 // Line color (default: #000000 black)
    strokeWidth?: number;            // Line thickness (default: 2)
    strokeDasharray?: string;        // Dashed pattern (e.g., "3 3")
  };
  tooltipLabel?: string;             // Custom label for tooltip section (default: "Reference Markers:")
  dataPoints: ReferenceMarkerDataPoint[];  // Independent data points along the line
}

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
  yAxisWidth?: number; // Override Y-axis space when more room needed
  yAxisTickCount?: number; // Force specific number of Y-axis ticks
  yAxisDomain?: [number | 'auto' | 'dataMin' | 'dataMax', number | 'auto' | 'dataMin' | 'dataMax']; // Y-axis domain [min, max]
  xAxisTickFormatter?: (value: any, index: number) => string; // Custom X-axis tick formatting
  yAxisTickFormatter?: (value: any, index: number) => string; // Custom Y-axis tick formatting
  // Accessibility
  title?: string; // Chart title for screen readers
  description?: string; // Chart description for screen readers
  showDataTable?: boolean; // Show accessible data table fallback
  tooltipMaxWidth?: string; // Custom tooltip max width class (e.g., 'max-w-xs', 'max-w-48')
  legendOrder?: string[]; // Custom order for legend items (array of data keys)
  legendPosition?: 'bottom'; // Legend position (only bottom is supported)
  // Reference Markers
  referenceMarkers?: ReferenceMarker[]; // Array of reference markers (vertical lines with data points)
}

// Helper function to convert strokeStyle to strokeDasharray values
const getStrokeDashArray = (strokeStyle?: string): string | undefined => {
  switch (strokeStyle) {
    case "dashed": return "5 5";    // 5px line, 5px gap
    case "dotted": return "2 2";    // 2px dot, 2px gap
    case "solid":
    default: return undefined;      // Solid line (default)
  }
};

// Helper function to render custom marker shapes for ReferenceDot
const renderMarkerShape = (shape: 'circle' | 'triangle' | 'square' = 'circle') => {
  return (props: any) => {
    const { cx, cy, r, fill, stroke, strokeWidth } = props;
    const size = r || 4;

    switch (shape) {
      case 'triangle':
        const height = size * 1.5;
        const width = size * 1.3;
        const path = `M ${cx},${cy - height} L ${cx + width},${cy + height/2} L ${cx - width},${cy + height/2} Z`;
        return (
          <path
            d={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth || 0}
          />
        );
      case 'square':
        const squareSize = size * 1.4;
        return (
          <rect
            x={cx - squareSize}
            y={cy - squareSize}
            width={squareSize * 2}
            height={squareSize * 2}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth || 0}
          />
        );
      case 'circle':
      default:
        return (
          <circle
            cx={cx}
            cy={cy}
            r={size}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth || 0}
          />
        );
    }
  };
};

// Helper function to get Legend positioning props
const getLegendProps = (legendPosition: 'bottom') => {
  // Only bottom legend is supported
  return { verticalAlign: 'bottom' as const, align: 'center' as const };
};

// Enhanced tooltip component with better accessibility and formatting
const CustomTooltip = ({ active, payload, label, config, tooltipMaxWidth = 'max-w-xs', chartType, referenceMarkers }: any & { config: ChartConfig; tooltipMaxWidth?: string; chartType?: ChartType; referenceMarkers?: ReferenceMarker[] }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  // Find reference markers for this X-axis value
  const markersAtThisPoint = referenceMarkers?.filter(marker => marker.xValue === label) || [];

  return (
    <div
      className={`rounded-xsm border border-[var(--color-border-primary-medium)] bg-[var(--color-surface-primary)] p-[var(--space-md)] shadow-md min-w-[120px] ${tooltipMaxWidth}`}
      role="tooltip"
      aria-label="Chart data tooltip"
    >
      <p className="text-body-xsm font-medium mb-[var(--space-xsm)] text-[var(--color-text-primary)]">
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
            displayValue = `${formatNumber(originalData[0])}\u00A0–\u00A0${formatNumber(originalData[1])}`;
          } else {
            displayValue = typeof entry.value === 'number'
              ? formatNumber(entry.value)
              : entry.value;
          }
        } else {
          displayValue = typeof entry.value === 'number'
            ? formatNumber(entry.value)
            : entry.value;
        }

        // Get tooltip marker element to match legend markers
        const getTooltipMarkerElement = () => {
          switch (chartType) {
            case "line":
              const strokeStyle = config[entry.dataKey]?.strokeStyle;
              const strokePattern = getStrokeDashArray(strokeStyle);
              return (
                <div
                  className="w-3 h-0.5 flex-shrink-0 relative"
                  aria-hidden="true"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: strokePattern
                        ? `linear-gradient(to right, ${entry.color} 50%, transparent 50%)`
                        : entry.color,
                      backgroundSize: strokePattern === "5 5" ? "6px 100%" : strokePattern === "2 2" ? "2px 100%" : "100% 100%"
                    }}
                  />
                </div>
              );
            case "scatter":
              return (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
              );
            case "composed":
              // For composed charts, check individual element type
              const elementType = config[entry.dataKey]?.type;
              switch (elementType) {
                case "line":
                  const strokeStyle = config[entry.dataKey]?.strokeStyle;
                  const strokePattern = getStrokeDashArray(strokeStyle);
                  return (
                    <div
                      className="w-3 h-0.5 flex-shrink-0 relative"
                      aria-hidden="true"
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          background: strokePattern
                            ? `linear-gradient(to right, ${entry.color} 50%, transparent 50%)`
                            : entry.color,
                          backgroundSize: strokePattern === "5 5" ? "6px 100%" : strokePattern === "2 2" ? "2px 100%" : "100% 100%"
                        }}
                      />
                    </div>
                  );
                case "area":
                case "range-area":
                  return (
                    <div
                      className="w-2.5 h-2.5 flex-shrink-0"
                      style={{ backgroundColor: entry.color }}
                      aria-hidden="true"
                    />
                  );
                case "bar":
                default:
                  return (
                    <div
                      className="w-2 h-2 flex-shrink-0"
                      style={{ backgroundColor: entry.color }}
                      aria-hidden="true"
                    />
                  );
              }
            case "bar":
            case "horizontal-bar":
            case "area":
            default:
              return (
                <div
                  className="w-2 h-2 flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
              );
          }
        };

        return (
          <div key={index} className="flex items-center gap-[var(--space-xsm)] text-body-xsm">
            {getTooltipMarkerElement()}
            <span className="text-[var(--color-text-primary)] min-w-0 break-words">
              {configEntry?.label || entry.dataKey}:
            </span>
            <span className="text-label-sm text-[var(--color-text-primary)] ml-auto pl-[16px]">
              {displayValue}
            </span>
          </div>
        );
      })}
      {/* Display reference marker data if available at this X position */}
      {markersAtThisPoint.length > 0 && (
        <>
          <div className="border-t border-[var(--color-border-primary-subtle)] my-[var(--space-xsm)]" />
          {markersAtThisPoint.map((marker, markerIdx) => (
            <React.Fragment key={`marker-section-${markerIdx}`}>
              {marker.tooltipLabel && (
                <p className="text-body-sm font-medium mb-[var(--space-xsm)] text-[var(--color-text-secondary)]">
                  {marker.tooltipLabel}
                </p>
              )}
              {!marker.tooltipLabel && markerIdx === 0 && (
                <p className="text-body-sm font-medium mb-[var(--space-xsm)] text-[var(--color-text-secondary)]">
                  Reference Markers:
                </p>
              )}
              {marker.dataPoints.map((point, pointIdx) => {
                // Render marker shape icon
                const shapeIcon = () => {
                  const shapeSize = 8;
                  switch (point.shape || 'circle') {
                    case 'triangle':
                      return (
                        <svg width={shapeSize} height={shapeSize} className="flex-shrink-0" viewBox="0 0 10 10">
                          <path
                            d="M 5,2 L 8,8 L 2,8 Z"
                            fill={point.fill || 'var(--color-chart-line-1)'}
                            stroke={point.stroke || 'transparent'}
                            strokeWidth={point.strokeWidth || 0}
                          />
                        </svg>
                      );
                    case 'square':
                      return (
                        <svg width={shapeSize} height={shapeSize} className="flex-shrink-0" viewBox="0 0 10 10">
                          <rect
                            x="2"
                            y="2"
                            width="6"
                            height="6"
                            fill={point.fill || 'var(--color-chart-line-1)'}
                            stroke={point.stroke || 'transparent'}
                            strokeWidth={point.strokeWidth || 0}
                          />
                        </svg>
                      );
                    case 'circle':
                    default:
                      return (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: point.fill || 'var(--color-chart-line-1)',
                            border: point.stroke ? `${point.strokeWidth || 1}px solid ${point.stroke}` : 'none'
                          }}
                        />
                      );
                  }
                };

                return (
                  <div key={`marker-${markerIdx}-point-${pointIdx}`} className="flex items-center gap-[var(--space-xsm)] text-caption-sm">
                    {shapeIcon()}
                    <span className="text-[var(--color-text-secondary)] min-w-0 break-words">
                      {point.label || `Marker ${pointIdx + 1}`}:
                    </span>
                    <span className="font-medium text-[var(--color-text-primary)] ml-auto">
                      {formatNumber(point.yValue)}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </>
      )}
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
  yAxisWidth,
  yAxisTickCount,
  xAxisTickFormatter,
  yAxisTickFormatter,
  title,
  description,
  showDataTable = false,
  tooltipMaxWidth = 'max-w-xs',
  legendOrder,
  legendPosition = 'bottom',
  referenceMarkers,
  yAxisDomain,
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

  // Simple margin calculation with zero defaults and legend support
  const getMargins = (): ChartMargin => {
    const defaultMargin = { top: 0, right: 0, left: 0, bottom: 0 };

    // Calculate legend space requirements (only bottom position supported)
    const dataKeyCount = Object.keys(config).filter(key => key !== 'name').length;
    const estimatedLegendHeight = showLegend
      ? Math.ceil(dataKeyCount / 4) * 24 + 8 // Rough estimate: 4 items per row, 24px per row, 8px padding
      : 0;

    return {
      top: margin?.top ?? defaultMargin.top,
      right: margin?.right ?? defaultMargin.right,
      left: margin?.left ?? defaultMargin.left,
      bottom: margin?.bottom ?? (defaultMargin.bottom + estimatedLegendHeight),
    };
  };

  // Calculate Y-axis width dynamically based on formatted tick values
  const calculatedYAxisWidth = useMemo(() => {
    if (yAxisWidth) return yAxisWidth; // Manual override takes precedence
    return calculateYAxisWidth(processedData, dataKeys, yAxisTickFormatter, 20);
  }, [yAxisWidth, processedData, dataKeys, yAxisTickFormatter]);

  // Get legend positioning props
  const legendProps = getLegendProps(legendPosition);

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
    width: calculatedYAxisWidth, // Auto-calculated based on tick formatter, default 20px
    tickFormatter: yAxisTickFormatter,
    ...(yAxisTickCount && { tickCount: yAxisTickCount }), // Force specific number of ticks when provided
    ...(yAxisDomain && { domain: yAxisDomain }), // Custom Y-axis domain when provided
  };

  const gridProps = {
    stroke: "var(--color-border-primary-subtle)",
    horizontal: true,
    vertical: false,
  };


  // Custom legend content for consistent styling
  const CustomLegend = ({ payload }: any) => {
    if (!payload || !payload.length) return null;

    // Sort payload based on legendOrder if provided
    const sortedPayload = legendOrder
      ? [...payload].sort((a, b) => {
          const aIndex = legendOrder.indexOf(a.dataKey);
          const bIndex = legendOrder.indexOf(b.dataKey);

          // Items not in legendOrder go to the end
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;

          return aIndex - bIndex;
        })
      : payload;

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
        {sortedPayload.map((entry: any, index: number) => {
          const getMarkerElement = () => {
            switch (type) {
              case "line":
                const strokeStyle = config[entry.dataKey]?.strokeStyle;
                const strokePattern = getStrokeDashArray(strokeStyle);
                return (
                  <div
                    className="w-[12px] h-[2px] flex-shrink-0 relative"
                    aria-hidden="true"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: strokePattern
                          ? `linear-gradient(to right, ${entry.color} 50%, transparent 50%)`
                          : entry.color,
                        backgroundSize: strokePattern === "5 5" ? "8px 100%" : strokePattern === "2 2" ? "3px 100%" : "100% 100%"
                      }}
                    />
                  </div>
                );
              case "scatter":
                return (
                  <div
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: entry.color }}
                    aria-hidden="true"
                  />
                );
              case "composed":
                // For composed charts, check individual element type
                const elementType = config[entry.dataKey]?.type;
                switch (elementType) {
                  case "line":
                    const strokeStyle = config[entry.dataKey]?.strokeStyle;
                    const strokePattern = getStrokeDashArray(strokeStyle);
                    return (
                      <div
                        className="w-[12px] h-[2px] flex-shrink-0 relative"
                        aria-hidden="true"
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            background: strokePattern
                              ? `linear-gradient(to right, ${entry.color} 50%, transparent 50%)`
                              : entry.color,
                            backgroundSize: strokePattern === "5 5" ? "8px 100%" : strokePattern === "2 2" ? "3px 100%" : "100% 100%"
                          }}
                        />
                      </div>
                    );
                  case "area":
                  case "range-area":
                    return (
                      <div
                        className="w-[8px] h-[8px] flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                        aria-hidden="true"
                      />
                    );
                  case "bar":
                  default:
                    return (
                      <div
                        className="w-[6px] h-[6px] flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                        aria-hidden="true"
                      />
                    );
                }
              case "bar":
              case "horizontal-bar":
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} chartType={type} />}
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
            {showLegend && <Legend content={<CustomLegend />} {...legendProps} />}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} chartType={type} />}
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
            {showLegend && <Legend content={<CustomLegend />} {...legendProps} />}
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
            {/* Reference lines - rendered BEFORE lines so tooltip activeDots appear on top */}
            {referenceMarkers?.map((marker, markerIdx) => (
              marker.showLine !== false && (
                <ReferenceLine
                  key={`marker-line-${markerIdx}`}
                  x={marker.xValue}
                  stroke={marker.lineStyle?.stroke || '#000000'}
                  strokeWidth={marker.lineStyle?.strokeWidth || 2}
                  strokeDasharray={marker.lineStyle?.strokeDasharray}
                />
              )
            ))}
            {showTooltip && <Tooltip
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} chartType={type} referenceMarkers={referenceMarkers} />}
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
            {showLegend && <Legend content={<CustomLegend />} {...legendProps} />}
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
                  strokeDasharray={getStrokeDashArray(config[key].strokeStyle)}
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
            {/* Reference marker dots - rendered AFTER lines to appear on top */}
            {referenceMarkers?.map((marker, markerIdx) => (
              <React.Fragment key={`marker-dots-${markerIdx}`}>
                {marker.dataPoints.map((point, pointIdx) => (
                  <ReferenceDot
                    key={`marker-${markerIdx}-point-${pointIdx}`}
                    x={marker.xValue}
                    y={point.yValue}
                    r={point.size || 4}
                    fill={point.fill || 'var(--color-chart-line-1)'}
                    stroke={point.stroke || 'transparent'}
                    strokeWidth={point.strokeWidth || 0}
                    shape={renderMarkerShape(point.shape || 'circle')}
                    isFront={true}
                  />
                ))}
              </React.Fragment>
            ))}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} chartType={type} />}
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
            {showLegend && <Legend content={<CustomLegend />} {...legendProps} />}
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
              content={(props) => <CustomTooltip {...props} config={config} tooltipMaxWidth={tooltipMaxWidth} chartType={type} />}
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
            {showLegend && <Legend content={<CustomLegend />} {...legendProps} />}
            {/* Render in order: bars first, then areas, then lines (for proper z-index layering) */}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const chartElementType = config[key].type || "bar"; // Default to bar

              // Render bars first
              if (chartElementType === "bar") {
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
              return null;
            })}
            {/* Render areas second */}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const chartElementType = config[key].type || "bar";

              if (chartElementType === "area") {
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
                  />
                );
              }
              return null;
            })}
            {/* Render lines last (on top of bars and areas) */}
            {dataKeys.map((key, index) => {
              const baseColor = config[key].color || activeColorScheme[index % activeColorScheme.length];
              const chartElementType = config[key].type || "bar";

              if (chartElementType === "line") {
                return (
                  <Line
                    key={key}
                    type="linear"
                    dataKey={key}
                    name={config[key].label}
                    stroke={baseColor}
                    strokeWidth={2}
                    strokeDasharray={getStrokeDashArray(config[key].strokeStyle)}
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
              }
              return null;
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