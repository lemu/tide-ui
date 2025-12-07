import { useState, useCallback, useMemo } from "react";
import { Chart, ChartProps, ChartDataPoint, ChartConfig } from "../fundamental/chart";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../fundamental/table";
import { Card, CardContent, CardHeader, CardTitle } from "../fundamental/card";
import { Button } from "../fundamental/button";
import { Icon } from "../fundamental/icon";
import { Badge } from "../fundamental/badge";
import { cn } from "@/lib/utils";

export interface LinkedChartColumn {
  key: string;
  label: string;
  type?: "text" | "number" | "currency" | "percentage";
  format?: (value: any, row?: any) => string;
}

export interface LinkedChartProps extends Omit<ChartProps, "onDataPointClick" | "onDataPointHover" | "highlightedIndex"> {
  title?: string;
  description?: string;
  columns: LinkedChartColumn[];
  enableFiltering?: boolean;
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: number[]) => void;
  onDataFilter?: (filteredData: ChartDataPoint[]) => void;
  showTable?: boolean;
  tableClassName?: string;
  chartClassName?: string;
  enableRowFiltering?: boolean; // New prop to control if row selection filters chart
}

export function LinkedChart({
  title,
  description,
  data,
  config,
  columns,
  type,
  enableFiltering = true,
  enableRowSelection = true,
  onRowSelectionChange,
  onDataFilter,
  showTable = true,
  tableClassName,
  chartClassName,
  enableRowFiltering = false,
  className,
  ...chartProps
}: LinkedChartProps) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [filteredIndices, setFilteredIndices] = useState<Set<number>>(new Set());
  const [isRowFilterActive, setIsRowFilterActive] = useState(false);

  // Filter data based on current filters
  const displayData = useMemo(() => {
    // If we have filtered indices from chart clicks, use those
    if (filteredIndices.size > 0) {
      return data.filter((_, index) => filteredIndices.has(index));
    }

    // If row filtering is active and we have selected rows, show only selected
    if (isRowFilterActive && selectedRows.size > 0) {
      return data.filter((_, index) => selectedRows.has(index));
    }

    // Otherwise show all data
    return data;
  }, [data, filteredIndices, selectedRows, isRowFilterActive]);

  // Handle chart hover
  const handleChartHover = useCallback((hoveredData: ChartDataPoint | null, index?: number) => {
    if (index !== undefined && hoveredData) {
      // Map the hovered index from displayData back to original data index
      const originalIndex = data.findIndex(item => item === displayData[index]);
      setHoveredChartIndex(originalIndex !== -1 ? originalIndex : null);
    } else {
      setHoveredChartIndex(null);
    }
  }, [data, displayData]);

  // Handle chart click for filtering
  const handleChartClick = useCallback((_clickedData: ChartDataPoint, index: number) => {
    if (!enableFiltering) return;

    // Map the clicked index from displayData back to original data index
    const originalIndex = data.findIndex(item => item === displayData[index]);
    if (originalIndex === -1) return; // Safety check

    const newFilteredIndices = new Set(filteredIndices);
    
    if (newFilteredIndices.has(originalIndex)) {
      newFilteredIndices.delete(originalIndex);
    } else {
      newFilteredIndices.add(originalIndex);
    }
    
    setFilteredIndices(newFilteredIndices);
    
    // Notify parent of filtered data
    const filteredData = data.filter((_, i) => newFilteredIndices.has(i));
    onDataFilter?.(filteredData);
  }, [enableFiltering, filteredIndices, data, onDataFilter, displayData]);

  // Handle row selection
  const handleRowClick = useCallback((index: number) => {
    if (!enableRowSelection) return;

    const newSelection = new Set(selectedRows);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    
    setSelectedRows(newSelection);
    onRowSelectionChange?.(Array.from(newSelection));
  }, [enableRowSelection, selectedRows, onRowSelectionChange]);

  // Handle row hover
  const handleRowHover = useCallback((index: number | null) => {
    setHoveredRowIndex(index);
  }, []);

  // Clear all filters and selections
  const clearAll = useCallback(() => {
    setSelectedRows(new Set());
    setFilteredIndices(new Set());
    setHoveredRowIndex(null);
    setHoveredChartIndex(null);
    setIsRowFilterActive(false);
    onRowSelectionChange?.([]);
    onDataFilter?.([]);
  }, [onRowSelectionChange, onDataFilter]);

  // Format cell value based on column type
  const formatCellValue = useCallback((value: any, column: LinkedChartColumn, row?: any) => {
    if (column.format) {
      return column.format(value, row);
    }

    switch (column.type) {
      case "currency":
        return typeof value === "number" ? `$${value.toLocaleString()}` : value;
      case "percentage":
        return typeof value === "number" ? `${value}%` : value;
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value;
      default:
        return value;
    }
  }, []);

  // Determine highlight index for chart (simple hover only)
  const chartHighlightIndex = hoveredRowIndex ?? hoveredChartIndex;

  // Calculate which data point should be highlighted (for single hover highlight)
  const getChartHighlightIndex = useMemo(() => {
    if (chartHighlightIndex !== null) {
      // Map original data index to display data index
      const displayIndex = displayData.findIndex(item => data[chartHighlightIndex] === item);
      return displayIndex !== -1 ? displayIndex : undefined;
    }
    return undefined;
  }, [chartHighlightIndex, displayData, data]);

  return (
    <div className={cn("space-y-[var(--space-lg)]", className)}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-[var(--space-sm)]">
          {title && <h3 className="text-heading-md">{title}</h3>}
          {description && (
            <p className="text-body-md text-[var(--color-text-secondary)]">{description}</p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--space-sm)]">
          {selectedRows.size > 0 && (
            <Badge intent="neutral" appearance="subtle" size="sm">
              {selectedRows.size} selected
              {isRowFilterActive ? " (filtered)" : ""}
            </Badge>
          )}
          {filteredIndices.size > 0 && (
            <Badge intent="brand" appearance="subtle" size="sm">
              {filteredIndices.size} chart filtered
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-[var(--space-sm)]">
          {/* Row filter toggle */}
          {enableRowFiltering && selectedRows.size > 0 && (
            <Button
              size="sm"
              variant={isRowFilterActive ? "default" : "ghost"}
              onClick={() => setIsRowFilterActive(!isRowFilterActive)}
            >
              <Icon name="filter" size="sm" className="mr-[var(--space-xsm)]" />
              Filter selected
            </Button>
          )}

          {(selectedRows.size > 0 || filteredIndices.size > 0 || isRowFilterActive) && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Icon name="x" size="sm" className="mr-[var(--space-sm)]" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="p-[var(--space-lg)]">
          <Chart
            {...chartProps}
            type={type}
            data={displayData}
            config={config}
            onDataPointClick={handleChartClick}
            onDataPointHover={handleChartHover}
            highlightedIndex={getChartHighlightIndex}
            className={chartClassName}
          />
        </CardContent>
      </Card>

      {/* Table */}
      {showTable && (
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center justify-between">
              Data Table
              <Badge intent="neutral" appearance="subtle" size="sm">
                {displayData.length} rows
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("rounded-md border border-[var(--color-border-primary-subtle)]", tableClassName)}>
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((row, _index) => {
                    const originalIndex = data.indexOf(row);
                    const isSelected = selectedRows.has(originalIndex);
                    const isHovered = hoveredRowIndex === originalIndex || hoveredChartIndex === originalIndex;
                    
                    return (
                      <TableRow
                        key={originalIndex}
                        onClick={() => handleRowClick(originalIndex)}
                        onMouseEnter={() => handleRowHover(originalIndex)}
                        onMouseLeave={() => handleRowHover(null)}
                        variant={isSelected ? "selected" : "default"}
                        className={cn(
                          "cursor-pointer transition-colors",
                          isHovered && "bg-[var(--color-background-neutral-subtlest-hovered)]",
                          enableRowSelection && "hover:bg-[var(--color-background-neutral-subtlest-hovered)]"
                        )}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {formatCellValue(row[column.key], column, row)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {enableFiltering && (
        <Card className="border-[var(--color-border-info-bold)]">
          <CardContent className="p-[var(--space-md)]">
            <div className="flex items-start gap-[var(--space-sm)]">
              <Icon name="info" size="sm" color="information" className="mt-1" />
              <div className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <p>
                  <strong>Interactive Features:</strong>
                </p>
                <ul className="list-disc list-inside space-y-[var(--space-xsm)]">
                  <li>Click chart data points to filter the table</li>
                  {enableRowSelection && (
                    <li>Click table rows to select/deselect them</li>
                  )}
                  {enableRowFiltering && enableRowSelection && (
                    <li>Use "Filter Selected" button to show only selected rows in the chart</li>
                  )}
                  <li>Hover over chart or table to see corresponding data</li>
                  <li>Use "Clear All" to reset all filters and selections</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Utility function to create linked chart columns from chart config
export const createLinkedChartColumns = (
  config: ChartConfig,
  additionalColumns: LinkedChartColumn[] = []
): LinkedChartColumn[] => {
  const configColumns: LinkedChartColumn[] = Object.entries(config).map(([key, value]) => ({
    key,
    label: value.label,
    type: "number" as const,
  }));

  return [
    { key: "name", label: "Name", type: "text" },
    ...configColumns,
    ...additionalColumns,
  ];
};