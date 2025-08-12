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
  TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";

export function TablePreview() {

  return (
    <div className="space-y-[var(--space-xlg)]">

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
                      <Badge variant="success" size="sm">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell align="right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>
                      <Badge variant="warning" size="sm">
                        Pending
                      </Badge>
                    </TableCell>
                    <TableCell align="right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>
                      <Badge variant="secondary" size="sm">
                        Unpaid
                      </Badge>
                    </TableCell>
                    <TableCell align="right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV004</TableCell>
                    <TableCell>
                      <Badge variant="success" size="sm">
                        Paid
                      </Badge>
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
                    {
                      name: "John Doe",
                      role: "Software Engineer",
                      salary: "$75,000",
                    },
                    {
                      name: "Jane Smith",
                      role: "Product Manager",
                      salary: "$85,000",
                    },
                    {
                      name: "Mike Johnson",
                      role: "Designer",
                      salary: "$65,000",
                    },
                    {
                      name: "Sarah Wilson",
                      role: "DevOps Engineer",
                      salary: "$80,000",
                    },
                    {
                      name: "Alex Lee",
                      role: "Data Analyst",
                      salary: "$70,000",
                    },
                  ].map((employee, index) => (
                    <TableRow key={employee.name} zebra zebraIndex={index}>
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
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
                    <TableCell className="font-medium">
                      Wireless Mouse
                    </TableCell>
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
              <CardTitle className="text-heading-sm">
                Sortable Headers
              </CardTitle>
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
                    <TableSortHeader align="right" sortable>
                      Experience
                    </TableSortHeader>
                    <TableSortHeader align="right" sortable>
                      Rating
                    </TableSortHeader>
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
                    <TableHead size="sm" align="right">
                      Qty
                    </TableHead>
                    <TableHead size="sm" align="right">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell size="sm" className="font-medium">
                      Widget A
                    </TableCell>
                    <TableCell size="sm">WID001</TableCell>
                    <TableCell size="sm" align="right">
                      25
                    </TableCell>
                    <TableCell size="sm" align="right">
                      $12.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="sm" className="font-medium">
                      Widget B
                    </TableCell>
                    <TableCell size="sm">WID002</TableCell>
                    <TableCell size="sm" align="right">
                      15
                    </TableCell>
                    <TableCell size="sm" align="right">
                      $24.99
                    </TableCell>
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
                    <TableHead size="lg" align="right">
                      Due Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell size="lg" className="font-medium">
                      Website Redesign
                    </TableCell>
                    <TableCell size="lg">
                      <Badge variant="success" size="sm">
                        Complete
                      </Badge>
                    </TableCell>
                    <TableCell size="lg">100%</TableCell>
                    <TableCell size="lg" align="right">
                      Dec 15, 2024
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell size="lg" className="font-medium">
                      Mobile App
                    </TableCell>
                    <TableCell size="lg">
                      <Badge variant="warning" size="sm">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell size="lg">65%</TableCell>
                    <TableCell size="lg" align="right">
                      Jan 30, 2025
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Features Demo */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Enhanced Table Features
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Filtering & Selection
              </CardTitle>
              <CardDescription>
                The main table above demonstrates comprehensive filtering,
                sorting, and row selection capabilities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div>
                <h4 className="text-body-medium-sm mb-[var(--space-sm)]">
                  Features:
                </h4>
                <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
                  <li>• Multi-field text search across columns</li>
                  <li>• Year-based filtering with dropdown</li>
                  <li>• Minimum fixtures threshold filter</li>
                  <li>• Column sorting (click headers)</li>
                  <li>• Row selection with checkboxes</li>
                  <li>• Clear all filters button</li>
                  <li>• Real-time result count</li>
                  <li>• Selected rows counter</li>
                </ul>
              </div>

              <div>
                <h4 className="text-body-medium-sm mb-[var(--space-sm)]">
                  Try it:
                </h4>
                <div className="text-body-sm space-y-[var(--space-sm)]">
                  <p>• Search "jan" to find January records</p>
                  <p>• Select "2024" year filter</p>
                  <p>• Set minimum fixtures to 50</p>
                  <p>• Click column headers to sort</p>
                  <p>• Use checkboxes to select rows</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Technical Implementation
              </CardTitle>
              <CardDescription>
                Built with React state management and semantic design tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div>
                <h4 className="text-body-medium-sm mb-[var(--space-sm)]">
                  Components Used:
                </h4>
                <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
                  <li>
                    • <code className="text-caption-sm">TableSortHeader</code> -
                    Sortable columns
                  </li>
                  <li>
                    • <code className="text-caption-sm">TableGroupHeader</code>{" "}
                    - Year groups
                  </li>
                  <li>
                    • <code className="text-caption-sm">Input</code> - Text
                    search
                  </li>
                  <li>
                    • <code className="text-caption-sm">Select</code> - Year
                    filter
                  </li>
                  <li>
                    • <code className="text-caption-sm">Checkbox</code> - Row
                    selection
                  </li>
                  <li>
                    • <code className="text-caption-sm">Badge</code> - Selection
                    counter
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-body-medium-sm mb-[var(--space-sm)]">
                  State Management:
                </h4>
                <ul className="text-body-sm space-y-[var(--space-xsm)] text-[var(--color-text-secondary)]">
                  <li>• Sort field and direction tracking</li>
                  <li>• Multi-field filtering logic</li>
                  <li>• Row selection with Set data structure</li>
                  <li>• Real-time data processing</li>
                </ul>
              </div>
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
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
            <div className="text-body-sm space-y-[var(--space-md)] text-[var(--color-text-secondary)]">
              <p>
                <strong>Semantic Structure:</strong> Tables use proper HTML
                elements (table, thead, tbody, th, td) for screen reader
                compatibility.
              </p>
              <p>
                <strong>Column Headers:</strong> Use th elements with proper
                scope attributes to associate data cells with headers.
              </p>
              <p>
                <strong>Sort Indicators:</strong> Sortable columns include
                visual indicators and proper ARIA labels for screen readers.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Ensure interactive
                elements within tables are keyboard accessible and focusable.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
