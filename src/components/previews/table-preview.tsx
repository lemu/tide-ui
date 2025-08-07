import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortHeader,
  TableGroupHeader,
  TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

// Sample data matching the Figma design
const laycanData = [
  // 2025 Data
  { year: "2025", month: "Jan", fixtureCount: 45, cargoQuantity: "7,785,000", grossFreight: "$133,340,750", avgFreightRate: "20.35", avgDemurrage: "$22,300" },
  { year: "2025", month: "Feb", fixtureCount: 127, cargoQuantity: "10,510,000", grossFreight: "$118,074,400", avgFreightRate: "13.29", avgDemurrage: "$21,500" },
  { year: "2025", month: "Mar", fixtureCount: 118, cargoQuantity: "7,785,900", grossFreight: "$145,230,750", avgFreightRate: "18.45", avgDemurrage: "$26,000" },
  { year: "2025", month: "Apr", fixtureCount: 102, cargoQuantity: "12,345,678", grossFreight: "$162,890,500", avgFreightRate: "21.67", avgDemurrage: "$23,800" },
  { year: "2025", month: "May", fixtureCount: 89, cargoQuantity: "15,678,900", grossFreight: "$189,450,300", avgFreightRate: "17.92", avgDemurrage: "$25,600" },
  { year: "2025", month: "Jun", fixtureCount: 5, cargoQuantity: "20,123,456", grossFreight: "$220,890,500", avgFreightRate: "8.48", avgDemurrage: "$23,800" },
  
  // 2024 Data
  { year: "2024", month: "Jan", fixtureCount: 91, cargoQuantity: "11,234,567", grossFreight: "$320,890,250", avgFreightRate: "13.75", avgDemurrage: "$24,500" },
  { year: "2024", month: "Feb", fixtureCount: 78, cargoQuantity: "13,456,789", grossFreight: "$335,450,600", avgFreightRate: "26.18", avgDemurrage: "$26,900" },
  { year: "2024", month: "Mar", fixtureCount: 66, cargoQuantity: "17,890,123", grossFreight: "$350,560,800", avgFreightRate: "12.68", avgDemurrage: "$25,200" },
  { year: "2024", month: "Apr", fixtureCount: 57, cargoQuantity: "22,000,000", grossFreight: "$353,580,560", avgFreightRate: "27.06", avgDemurrage: "$23,700" },
  { year: "2024", month: "May", fixtureCount: 49, cargoQuantity: "10,111,111", grossFreight: "$340,230,900", avgFreightRate: "19.40", avgDemurrage: "$24,800" },
  { year: "2024", month: "Jun", fixtureCount: 42, cargoQuantity: "14,567,890", grossFreight: "$325,890,400", avgFreightRate: "28.32", avgDemurrage: "$25,900" },
  { year: "2024", month: "Jul", fixtureCount: 36, cargoQuantity: "19,999,999", grossFreight: "$310,450,750", avgFreightRate: "11.62", avgDemurrage: "$26,300" },
  { year: "2024", month: "Aug", fixtureCount: 30, cargoQuantity: "21,000,000", grossFreight: "$295,670,300", avgFreightRate: "29.42", avgDemurrage: "$24,600" },
  { year: "2024", month: "Sep", fixtureCount: 25, cargoQuantity: "15,678,123", grossFreight: "$280,890,150", avgFreightRate: "10.58", avgDemurrage: "$23,900" },
  { year: "2024", month: "Oct", fixtureCount: 20, cargoQuantity: "18,765,432", grossFreight: "$265,320,600", avgFreightRate: "30.37", avgDemurrage: "$26,500" },
  { year: "2024", month: "Nov", fixtureCount: 15, cargoQuantity: "12,345,000", grossFreight: "$250,450,900", avgFreightRate: "9.67", avgDemurrage: "$24,100" },
  { year: "2024", month: "Dec", fixtureCount: 10, cargoQuantity: "16,789,123", grossFreight: "$235,670,200", avgFreightRate: "31.52", avgDemurrage: "$25,400" },
  
  // 2023 Data  
  { year: "2023", month: "Jun", fixtureCount: 76, cargoQuantity: "18,234,500", grossFreight: "$205,670,800", avgFreightRate: "22.11", avgDemurrage: "$24,900" },
  { year: "2023", month: "Feb", fixtureCount: 63, cargoQuantity: "21,903,000", grossFreight: "$223,890,150", avgFreightRate: "15.78", avgDemurrage: "$26,700" },
  { year: "2023", month: "Mar", fixtureCount: 54, cargoQuantity: "9,876,543", grossFreight: "$240,450,600", avgFreightRate: "23.34", avgDemurrage: "$25,300" },
  { year: "2023", month: "Apr", fixtureCount: 47, cargoQuantity: "14,321,000", grossFreight: "$256,780,900", avgFreightRate: "16.85", avgDemurrage: "$24,200" },
  { year: "2023", month: "May", fixtureCount: 128, cargoQuantity: "16,789,000", grossFreight: "$274,150,200", avgFreightRate: "24.29", avgDemurrage: "$27,100" },
  { year: "2023", month: "Jun", fixtureCount: 115, cargoQuantity: "19,456,789", grossFreight: "$290,320,750", avgFreightRate: "14.90", avgDemurrage: "$26,400" },
  { year: "2023", month: "Jul", fixtureCount: 103, cargoQuantity: "20,000,000", grossFreight: "$305,670,400", avgFreightRate: "25.03", avgDemurrage: "$25,800" },
];

type SortField = 'month' | 'fixtureCount' | 'cargoQuantity' | 'grossFreight' | 'avgFreightRate' | 'avgDemurrage';
type SortDirection = 'asc' | 'desc' | false;

export function TablePreview() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? false : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    if (sortDirection === 'desc') {
      setSortField(null);
      setSortDirection(false);
    }
  };

  const sortedData = [...laycanData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];
    
    // Handle numeric fields
    if (sortField === 'fixtureCount') {
      aVal = parseInt(aVal);
      bVal = parseInt(bVal);
    } else if (['cargoQuantity', 'grossFreight', 'avgFreightRate', 'avgDemurrage'].includes(sortField)) {
      aVal = parseFloat(aVal.toString().replace(/[$,]/g, ''));
      bVal = parseFloat(bVal.toString().replace(/[$,]/g, ''));
    }
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  // Group data by year for display
  const groupedData = sortedData.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {} as Record<string, typeof laycanData>);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Figma Design Recreation */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Figma Design Recreation</h2>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-heading-md">Summary by laycan date</CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Icon name="ellipsis" size="sm" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[var(--color-border-primary-subtle)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableSortHeader 
                      sortable 
                      sorted={sortField === 'month' ? sortDirection : false}
                      onSort={() => handleSort('month')}
                    >
                      Laycan month
                    </TableSortHeader>
                    <TableSortHeader 
                      align="right"
                      sortable
                      sorted={sortField === 'fixtureCount' ? sortDirection : false} 
                      onSort={() => handleSort('fixtureCount')}
                    >
                      Fixture count
                    </TableSortHeader>
                    <TableSortHeader 
                      align="right"
                      sortable
                      sorted={sortField === 'cargoQuantity' ? sortDirection : false}
                      onSort={() => handleSort('cargoQuantity')}
                    >
                      Cargo quantity
                    </TableSortHeader>
                    <TableSortHeader 
                      align="right"
                      sortable
                      sorted={sortField === 'grossFreight' ? sortDirection : false}
                      onSort={() => handleSort('grossFreight')}
                    >
                      Gross freight
                    </TableSortHeader>
                    <TableSortHeader 
                      align="right"
                      sortable
                      sorted={sortField === 'avgFreightRate' ? sortDirection : false}
                      onSort={() => handleSort('avgFreightRate')}
                    >
                      Avg. freight rate ($/...)
                    </TableSortHeader>
                    <TableSortHeader 
                      align="right"
                      sortable
                      sorted={sortField === 'avgDemurrage' ? sortDirection : false}
                      onSort={() => handleSort('avgDemurrage')}
                    >
                      Avg. demurrage ($/...)
                    </TableSortHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedData).map(([year, data]) => (
                    <React.Fragment key={year}>
                      <TableGroupHeader colSpan={6}>
                        <div className="flex items-center gap-[var(--space-sm)]">
                          <span>{year}</span>
                          <Icon name="chevron-down" size="sm" />
                        </div>
                      </TableGroupHeader>
                      {data.map((row, index) => (
                        <TableRow key={`${year}-${row.month}`} zebra zebraIndex={index}>
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell align="right">{row.fixtureCount}</TableCell>
                          <TableCell align="right">{row.cargoQuantity}</TableCell>
                          <TableCell align="right">{row.grossFreight}</TableCell>
                          <TableCell align="right">{row.avgFreightRate}</TableCell>
                          <TableCell align="right">{row.avgDemurrage}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination matching Figma */}
            <div className="flex items-center justify-between mt-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Button variant="ghost" size="sm">
                  <Icon name="chevron-left" size="sm" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="chevron-right" size="sm" />
                </Button>
              </div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                1-25 of 256
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Basic Table Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Tables</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Table</CardTitle>
              <CardDescription>
                Basic table with minimal styling and semantic design tokens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead align="right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>
                      <Badge variant="success" size="small">Paid</Badge>
                    </TableCell>
                    <TableCell align="right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>
                      <Badge variant="warning" size="small">Pending</Badge>
                    </TableCell>
                    <TableCell align="right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>
                      <Badge variant="secondary" size="small">Unpaid</Badge>
                    </TableCell>
                    <TableCell align="right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV004</TableCell>
                    <TableCell>
                      <Badge variant="success" size="small">Paid</Badge>
                    </TableCell>
                    <TableCell align="right">$450.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Zebra Striped Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Zebra Striped</CardTitle>
              <CardDescription>
                Table with alternating row backgrounds for better readability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead align="right">Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "John Doe", role: "Software Engineer", salary: "$75,000" },
                    { name: "Jane Smith", role: "Product Manager", salary: "$85,000" },
                    { name: "Mike Johnson", role: "Designer", salary: "$65,000" },
                    { name: "Sarah Wilson", role: "DevOps Engineer", salary: "$80,000" },
                    { name: "Alex Lee", role: "Data Analyst", salary: "$70,000" },
                  ].map((employee, index) => (
                    <TableRow key={employee.name} zebra zebraIndex={index}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell align="right">{employee.salary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Table with Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Actions</CardTitle>
              <CardDescription>
                Table with action buttons and interactive elements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead align="right">Price</TableHead>
                    <TableHead align="center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Laptop Pro</TableCell>
                    <TableCell>Electronics</TableCell>
                    <TableCell align="right">$1,299.00</TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-[var(--space-sm)]">
                        <Button variant="ghost" size="sm">
                          <Icon name="circle" size="sm" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="trash-2" size="sm" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wireless Mouse</TableCell>
                    <TableCell>Accessories</TableCell>
                    <TableCell align="right">$49.99</TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-[var(--space-sm)]">
                        <Button variant="ghost" size="sm">
                          <Icon name="circle" size="sm" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="trash-2" size="sm" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Monitor Stand</TableCell>
                    <TableCell>Accessories</TableCell>
                    <TableCell align="right">$99.99</TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center gap-[var(--space-sm)]">
                        <Button variant="ghost" size="sm">
                          <Icon name="circle" size="sm" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="trash-2" size="sm" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Sortable Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Sortable Headers</CardTitle>
              <CardDescription>
                Table with sortable column headers and sort indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableSortHeader sortable>Name</TableSortHeader>
                    <TableSortHeader sortable>Department</TableSortHeader>
                    <TableSortHeader align="right" sortable>Experience</TableSortHeader>
                    <TableSortHeader align="right" sortable>Rating</TableSortHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Alice Brown</TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell align="right">5 years</TableCell>
                    <TableCell align="right">4.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Chen</TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell align="right">3 years</TableCell>
                    <TableCell align="right">4.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Carol Davis</TableCell>
                    <TableCell>Marketing</TableCell>
                    <TableCell align="right">7 years</TableCell>
                    <TableCell align="right">4.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">David Evans</TableCell>
                    <TableCell>Sales</TableCell>
                    <TableCell align="right">2 years</TableCell>
                    <TableCell align="right">4.4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Table Sizes</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)]">
          {/* Small Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Small Size</CardTitle>
              <CardDescription>
                Compact table for dense data display.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table size="sm">
                <TableHeader>
                  <TableRow>
                    <TableHead size="sm">Item</TableHead>
                    <TableHead size="sm">Code</TableHead>
                    <TableHead size="sm" align="right">Qty</TableHead>
                    <TableHead size="sm" align="right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell size="sm" className="font-medium">Widget A</TableCell>
                    <TableCell size="sm">WID001</TableCell>
                    <TableCell size="sm" align="right">25</TableCell>
                    <TableCell size="sm" align="right">$12.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="sm" className="font-medium">Widget B</TableCell>
                    <TableCell size="sm">WID002</TableCell>
                    <TableCell size="sm" align="right">15</TableCell>
                    <TableCell size="sm" align="right">$24.99</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Large Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Large Size</CardTitle>
              <CardDescription>
                Spacious table for comfortable reading and interaction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table size="lg">
                <TableHeader>
                  <TableRow>
                    <TableHead size="lg">Project</TableHead>
                    <TableHead size="lg">Status</TableHead>
                    <TableHead size="lg">Progress</TableHead>
                    <TableHead size="lg" align="right">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell size="lg" className="font-medium">Website Redesign</TableCell>
                    <TableCell size="lg">
                      <Badge variant="success" size="small">Complete</Badge>
                    </TableCell>
                    <TableCell size="lg">100%</TableCell>
                    <TableCell size="lg" align="right">Dec 15, 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="lg" className="font-medium">Mobile App</TableCell>
                    <TableCell size="lg">
                      <Badge variant="warning" size="small">In Progress</Badge>
                    </TableCell>
                    <TableCell size="lg">65%</TableCell>
                    <TableCell size="lg" align="right">Jan 30, 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="check" size="sm" color="success" />
                <span>Good Examples</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use clear, descriptive column headers</li>
                <li>• Align numbers to the right for easy comparison</li>
                <li>• Use consistent formatting for similar data types</li>
                <li>• Provide visual feedback for sortable columns</li>
                <li>• Use zebra striping for tables with many rows</li>
                <li>• Include loading states for dynamic data</li>
                <li>• Ensure adequate spacing between elements</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="x" size="sm" color="error" />
                <span>Avoid</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Don't make tables too wide for the viewport</li>
                <li>• Avoid unclear or ambiguous column labels</li>
                <li>• Don't use excessive colors or styling</li>
                <li>• Avoid making all columns sortable if not needed</li>
                <li>• Don't forget mobile responsiveness considerations</li>
                <li>• Avoid cramming too much data in small spaces</li>
                <li>• Don't neglect keyboard navigation support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Note */}
      <section>
        <Card className="border-[var(--color-border-information)]">
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
              <Icon name="info" size="sm" color="information" />
              <span>Accessibility Considerations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
              <p>
                <strong>Semantic Structure:</strong> Tables use proper HTML elements (table, thead, tbody, th, td) for screen reader compatibility.
              </p>
              <p>
                <strong>Column Headers:</strong> Use th elements with proper scope attributes to associate data cells with headers.
              </p>
              <p>
                <strong>Sort Indicators:</strong> Sortable columns include visual indicators and proper ARIA labels for screen readers.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Ensure interactive elements within tables are keyboard accessible and focusable.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}