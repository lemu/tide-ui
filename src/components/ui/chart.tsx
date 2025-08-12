import React, { useState, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

// Color palettes for different chart types
export const chartColorSchemes = {
  bar: [
    "#3B82F6", // blue-500
    "#1D4ED8", // blue-700
    "#1E40AF", // blue-800
    "#1E3A8A", // blue-900
    "#312E81", // indigo-800
    "#1E1B4B", // indigo-900
  ],
  line: [
    "#10B981", // emerald-500
    "#059669", // emerald-600
    "#047857", // emerald-700
    "#065F46", // emerald-800
    "#064E3B", // emerald-900
    "#022C22", // emerald-950
  ],
  scatter: [
    "#8B5CF6", // violet-500
    "#7C3AED", // violet-600
    "#6D28D9", // violet-700
    "#5B21B6", // violet-800
    "#4C1D95", // violet-900
    "#312E81", // indigo-800
  ],
} as const;

export type ChartType = "bar" | "horizontal-bar" | "line" | "scatter";
export type ChartColorScheme = keyof typeof chartColorSchemes;

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
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
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, config }: TooltipProps<any, any> & { config: ChartConfig }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-md border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-sm)] shadow-md">
      <p className="text-body-sm font-medium mb-[var(--space-xsm)]">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-[var(--space-xsm)] text-body-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[var(--color-text-secondary)]">
            {config[entry.dataKey as string]?.label || entry.dataKey}:
          </span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </span>
        </div>
      ))}
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
  ...props
}: ChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get color scheme based on chart type
  const colorScheme = useMemo(() => {
    switch (type) {
      case "bar":
      case "horizontal-bar":
        return chartColorSchemes.bar;
      case "line":
        return chartColorSchemes.line;
      case "scatter":
        return chartColorSchemes.scatter;
      default:
        return chartColorSchemes.bar;
    }
  }, [type]);

  // Get data keys from config (exclude 'name' which is the category axis)
  const dataKeys = Object.keys(config).filter(key => key !== 'name');

  const handleMouseEnter = useCallback((data: any, index: number) => {
    setHoveredIndex(index);
    onDataPointHover?.(data, index);
  }, [onDataPointHover]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    onDataPointHover?.(null);
  }, [onDataPointHover]);

  const handleClick = useCallback((data: any, index: number) => {
    onDataPointClick?.(data, index);
  }, [onDataPointClick]);

  const commonProps = {
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
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
              const baseColor = config[key].color || colorScheme[index % colorScheme.length];
              const isHighlighted = highlightedIndex !== undefined && hoveredIndex !== null;
              const fillColor = isHighlighted ? `${baseColor}60` : baseColor;
              
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={fillColor}
                  radius={[2, 2, 0, 0]}
                  className="cursor-pointer transition-colors"
                />
              );
            })}
          </BarChart>
        );

      case "horizontal-bar":
        return (
          <BarChart 
            {...commonProps} 
            layout="horizontal"
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
              const baseColor = config[key].color || colorScheme[index % colorScheme.length];
              const isHighlighted = highlightedIndex !== undefined && hoveredIndex !== null;
              const fillColor = isHighlighted ? `${baseColor}60` : baseColor;
              
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={config[key].label}
                  fill={fillColor}
                  radius={[0, 2, 2, 0]}
                  className="cursor-pointer transition-colors"
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
              const baseColor = config[key].color || colorScheme[index % colorScheme.length];
              const isHighlighted = highlightedIndex !== undefined && hoveredIndex !== null;
              const strokeColor = isHighlighted ? `${baseColor}60` : baseColor;
              
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
                const baseColor = config[key]?.color || colorScheme[index % colorScheme.length];
                const isHighlighted = highlightedIndex !== undefined && hoveredIndex !== null;
                const fillColor = isHighlighted ? `${baseColor}60` : baseColor;
                
                return (
                  <Scatter
                    key={key}
                    name={config[key]?.label || key}
                    data={data.map(d => ({ x: d.x, y: d.y, [key]: d[key] }))}
                    fill={fillColor}
                    className="cursor-pointer transition-colors"
                  />
                );
              })}
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width={width || "100%"} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

// Export utility functions for working with chart data
export const generateChartColors = (count: number, scheme: ChartColorScheme = "bar") => {
  const colors = chartColorSchemes[scheme];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

export const createChartConfig = (
  keys: string[], 
  labels: string[], 
  colors?: string[]
): ChartConfig => {
  return keys.reduce((config, key, index) => {
    config[key] = {
      label: labels[index] || key,
      color: colors?.[index],
    };
    return config;
  }, {} as ChartConfig);
};