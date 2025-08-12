import { useState, useMemo, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample task data
interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done" | "canceled";
  priority: "low" | "medium" | "high";
  assignee: string;
  estimatedHours: number;
  createdAt: Date;
  labels: string[];
}

const sampleTasks: Task[] = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in-progress",
    priority: "medium",
    assignee: "John Doe",
    estimatedHours: 8,
    createdAt: new Date("2024-01-15"),
    labels: ["bug", "feature"],
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "todo",
    priority: "high",
    assignee: "Jane Smith",
    estimatedHours: 12,
    createdAt: new Date("2024-01-10"),
    labels: ["enhancement"],
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "done",
    priority: "low",
    assignee: "Mike Johnson",
    estimatedHours: 4,
    createdAt: new Date("2024-01-08"),
    labels: ["bug", "documentation"],
  },
  {
    id: "TASK-5562",
    title: "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
    status: "in-progress",
    priority: "medium",
    assignee: "Sarah Wilson",
    estimatedHours: 16,
    createdAt: new Date("2024-01-20"),
    labels: ["feature", "performance"],
  },
  {
    id: "TASK-8686",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "canceled",
    priority: "low",
    assignee: "Alex Lee",
    estimatedHours: 6,
    createdAt: new Date("2024-01-12"),
    labels: ["bug"],
  },
  {
    id: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "done",
    priority: "high",
    assignee: "Emily Chen",
    estimatedHours: 20,
    createdAt: new Date("2024-01-05"),
    labels: ["feature", "security"],
  },
  {
    id: "TASK-7262",
    title: "The UTF8 application is down, parse the neural bandwidth so we can back up the quantified feed!",
    status: "todo",
    priority: "medium",
    assignee: "David Brown",
    estimatedHours: 10,
    createdAt: new Date("2024-01-18"),
    labels: ["enhancement", "performance"],
  },
  {
    id: "TASK-1138",
    title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: "in-progress",
    priority: "high",
    assignee: "Lisa Garcia",
    estimatedHours: 14,
    createdAt: new Date("2024-01-22"),
    labels: ["bug", "feature"],
  },
  {
    id: "TASK-7184",
    title: "We need to program the back-end TCP protocol!",
    status: "done",
    priority: "low",
    assignee: "Tom Anderson",
    estimatedHours: 8,
    createdAt: new Date("2024-01-14"),
    labels: ["documentation"],
  },
  {
    id: "TASK-5160",
    title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: "todo",
    priority: "high",
    assignee: "Maria Rodriguez",
    estimatedHours: 18,
    createdAt: new Date("2024-01-25"),
    labels: ["feature", "enhancement"],
  },
];

type SortField = keyof Task | null;
type SortDirection = "asc" | "desc" | null;

const statusConfig = {
  todo: { label: "Todo", variant: "secondary" as const, icon: "circle" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const, icon: "clock" as const },
  done: { label: "Done", variant: "success" as const, icon: "check-circle" as const },
  canceled: { label: "Canceled", variant: "destructive" as const, icon: "x-circle" as const },
};

const priorityConfig = {
  low: { label: "Low", variant: "secondary" as const, icon: "arrow-down" as const },
  medium: { label: "Medium", variant: "warning" as const, icon: "minus" as const },
  high: { label: "High", variant: "destructive" as const, icon: "arrow-up" as const },
};

interface ColumnVisibility {
  id: boolean;
  title: boolean;
  status: boolean;
  priority: boolean;
  assignee: boolean;
  estimatedHours: boolean;
  createdAt: boolean;
  labels: boolean;
  actions: boolean;
}

export function DataTablePreview() {
  const [tasks] = useState<Task[]>(sampleTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    id: true,
    title: true,
    status: true,
    priority: true,
    assignee: true,
    estimatedHours: true,
    createdAt: true,
    labels: true,
    actions: true,
  });

  // Get unique values for filters
  const uniqueAssignees = useMemo(() => {
    return Array.from(new Set(tasks.map(task => task.assignee))).sort();
  }, [tasks]);

  // Filter and sort data
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = searchQuery === "" || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === "all" || task.assignee === assigneeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });

    // Sort data
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === "createdAt") {
          aVal = (aVal as Date).getTime();
          bVal = (bVal as Date).getTime();
        } else if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = (bVal as string).toLowerCase();
        }

        if (sortDirection === "asc") {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [tasks, searchQuery, statusFilter, priorityFilter, assigneeFilter, sortField, sortDirection]);

  // Paginate data
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedTasks.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedTasks, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedTasks.length / pageSize);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(paginatedTasks.map(task => task.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedRows(newSelection);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setAssigneeFilter("all");
    setSortField(null);
    setSortDirection(null);
    setCurrentPage(1);
  };

  const handleColumnVisibilityChange = (column: keyof ColumnVisibility, visible: boolean) => {
    setColumnVisibility(prev => ({ ...prev, [column]: visible }));
  };

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Advanced Data Table</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          A powerful data table with filtering, sorting, pagination, column management, and bulk actions
        </p>
      </div>

      {/* Advanced Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-heading-md">Task Management</CardTitle>
              <CardDescription>
                Manage your tasks with advanced filtering and sorting capabilities
              </CardDescription>
            </div>
            <div className="flex items-center gap-[var(--space-sm)]">
              {selectedRows.size > 0 && (
                <>
                  <Badge variant="secondary" size="sm">
                    {selectedRows.size} selected
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                    Delete
                  </Button>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="columns" size="sm" className="mr-[var(--space-sm)]" />
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {Object.entries(columnVisibility).map(([key, value]) => (
                    <DropdownMenuCheckboxItem
                      key={key}
                      className="capitalize"
                      checked={value}
                      onCheckedChange={(checked) =>
                        handleColumnVisibilityChange(key as keyof ColumnVisibility, !!checked)
                      }
                    >
                      {key === "id" ? "ID" : key.replace(/([A-Z])/g, " $1").trim()}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {/* Filter Controls */}
        <div className="space-y-[var(--space-md)] px-[var(--space-lg)] pb-[var(--space-md)]">
          <div className="flex flex-wrap items-center gap-[var(--space-md)]">
            <div className="min-w-[300px] flex-1">
              <Input
                placeholder="Search tasks by title or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>
                    {assignee}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <Icon name="x" size="sm" className="mr-[var(--space-sm)]" />
              Clear
            </Button>
          </div>

          <div className="text-body-sm flex items-center justify-between text-[var(--color-text-secondary)]">
            <span>
              Showing {paginatedTasks.length} of {filteredAndSortedTasks.length} tasks
              {selectedRows.size > 0 && ` (${selectedRows.size} selected)`}
            </span>
            <div className="flex items-center gap-[var(--space-sm)]">
              <span>Rows per page:</span>
              <Select value={pageSize.toString()} onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <CardContent>
          <div className="rounded-md border border-[var(--color-border-primary-subtle)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.size > 0 && selectedRows.size === paginatedTasks.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </TableHead>
                  {columnVisibility.id && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "id" ? (sortDirection || false) : false}
                      onSort={() => handleSort("id")}
                    >
                      Task ID
                    </TableSortHeader>
                  )}
                  {columnVisibility.title && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "title" ? (sortDirection || false) : false}
                      onSort={() => handleSort("title")}
                    >
                      Title
                    </TableSortHeader>
                  )}
                  {columnVisibility.status && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "status" ? (sortDirection || false) : false}
                      onSort={() => handleSort("status")}
                    >
                      Status
                    </TableSortHeader>
                  )}
                  {columnVisibility.priority && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "priority" ? (sortDirection || false) : false}
                      onSort={() => handleSort("priority")}
                    >
                      Priority
                    </TableSortHeader>
                  )}
                  {columnVisibility.assignee && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "assignee" ? (sortDirection || false) : false}
                      onSort={() => handleSort("assignee")}
                    >
                      Assignee
                    </TableSortHeader>
                  )}
                  {columnVisibility.estimatedHours && (
                    <TableSortHeader
                      align="right"
                      sortable
                      sorted={sortField === "estimatedHours" ? (sortDirection || false) : false}
                      onSort={() => handleSort("estimatedHours")}
                    >
                      Est. Hours
                    </TableSortHeader>
                  )}
                  {columnVisibility.createdAt && (
                    <TableSortHeader
                      sortable
                      sorted={sortField === "createdAt" ? (sortDirection || false) : false}
                      onSort={() => handleSort("createdAt")}
                    >
                      Created
                    </TableSortHeader>
                  )}
                  {columnVisibility.labels && (
                    <TableHead>Labels</TableHead>
                  )}
                  {columnVisibility.actions && (
                    <TableHead align="center">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTasks.map((task, index) => {
                  const isSelected = selectedRows.has(task.id);
                  return (
                    <TableRow
                      key={task.id}
                      zebra
                      zebraIndex={index}
                      variant={isSelected ? "selected" : "default"}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectRow(task.id, !!checked)}
                          aria-label={`Select task ${task.id}`}
                        />
                      </TableCell>
                      {columnVisibility.id && (
                        <TableCell className="font-mono text-body-sm">{task.id}</TableCell>
                      )}
                      {columnVisibility.title && (
                        <TableCell className="max-w-[400px]">
                          <div className="truncate font-medium" title={task.title}>
                            {task.title}
                          </div>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell>
                          <Badge
                            variant={statusConfig[task.status].variant}
                            size="sm"
                            className="flex items-center gap-[var(--space-xsm)] w-fit"
                          >
                            <Icon name={statusConfig[task.status].icon} size="sm" />
                            {statusConfig[task.status].label}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.priority && (
                        <TableCell>
                          <Badge
                            variant={priorityConfig[task.priority].variant}
                            size="sm"
                            className="flex items-center gap-[var(--space-xsm)] w-fit"
                          >
                            <Icon name={priorityConfig[task.priority].icon} size="sm" />
                            {priorityConfig[task.priority].label}
                          </Badge>
                        </TableCell>
                      )}
                      {columnVisibility.assignee && (
                        <TableCell>{task.assignee}</TableCell>
                      )}
                      {columnVisibility.estimatedHours && (
                        <TableCell align="right">{task.estimatedHours}h</TableCell>
                      )}
                      {columnVisibility.createdAt && (
                        <TableCell>
                          {task.createdAt.toLocaleDateString()}
                        </TableCell>
                      )}
                      {columnVisibility.labels && (
                        <TableCell>
                          <div className="flex flex-wrap gap-[var(--space-xsm)]">
                            {task.labels.map((label) => (
                              <Badge key={label} variant="secondary" size="sm">
                                {label}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      )}
                      {columnVisibility.actions && (
                        <TableCell align="center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Icon name="more-horizontal" size="sm" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Icon name="eye" size="sm" className="mr-[var(--space-sm)]" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Icon name="edit" size="sm" className="mr-[var(--space-sm)]" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Icon name="copy" size="sm" className="mr-[var(--space-sm)]" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-[var(--color-text-error)]">
                                <Icon name="trash" size="sm" className="mr-[var(--space-sm)]" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-[var(--space-lg)] flex items-center justify-between">
            <div className="text-body-sm text-[var(--color-text-secondary)]">
              Page {currentPage} of {totalPages} ({filteredAndSortedTasks.length} total results)
            </div>
            <div className="flex items-center gap-[var(--space-sm)]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <Icon name="chevrons-left" size="sm" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="chevron-left" size="sm" />
              </Button>
              <span className="text-body-sm px-[var(--space-md)]">
                {currentPage}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <Icon name="chevron-right" size="sm" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <Icon name="chevrons-right" size="sm" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="search" size="sm" color="brand" />
              Advanced Filtering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Global search across title and ID</li>
              <li>• Status-based filtering</li>
              <li>• Priority level filtering</li>
              <li>• Assignee filtering</li>
              <li>• Clear all filters button</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="arrow-up-down" size="sm" color="brand" />
              Sorting & Pagination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Multi-column sorting</li>
              <li>• Ascending/descending/no sort</li>
              <li>• Configurable page sizes</li>
              <li>• Full pagination controls</li>
              <li>• Result count display</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="columns" size="sm" color="brand" />
              Column Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Show/hide columns dynamically</li>
              <li>• Column visibility persistence</li>
              <li>• Responsive column layout</li>
              <li>• Custom column widths</li>
              <li>• Sortable column indicators</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="check-square" size="sm" color="brand" />
              Row Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Individual row selection</li>
              <li>• Select all functionality</li>
              <li>• Bulk action support</li>
              <li>• Selection count display</li>
              <li>• Visual selection indicators</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="more-horizontal" size="sm" color="brand" />
              Row Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Context menu per row</li>
              <li>• View, edit, duplicate actions</li>
              <li>• Delete with confirmation</li>
              <li>• Keyboard accessible menus</li>
              <li>• Action grouping</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
              <Icon name="palette" size="sm" color="brand" />
              Visual Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
              <li>• Status and priority badges</li>
              <li>• Zebra striped rows</li>
              <li>• Selected row highlighting</li>
              <li>• Semantic design tokens</li>
              <li>• Consistent spacing</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Usage Guidelines */}
      <Card className="border-[var(--color-border-information)]">
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center gap-[var(--space-sm)]">
            <Icon name="info" size="sm" color="information" />
            Implementation Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              <strong>Performance:</strong> This table implements client-side filtering and sorting. For large datasets (1000+ rows), consider implementing server-side pagination and filtering.
            </p>
            <p>
              <strong>Accessibility:</strong> Full keyboard navigation support, proper ARIA labels, and screen reader compatibility for all interactive elements.
            </p>
            <p>
              <strong>Mobile:</strong> Column visibility management allows hiding less important columns on smaller screens for better mobile experience.
            </p>
            <p>
              <strong>State Management:</strong> All table state (filters, sorting, pagination, column visibility) can be persisted to localStorage or URL parameters.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}