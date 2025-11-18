import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../components/fundamental/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "../components/fundamental/card";
import { Badge } from "../components/fundamental/badge";

const meta: Meta<typeof Pagination> = {
  title: "NPM • Fundamental/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "full"],
      description: "Pagination variant - default has prev/next, full adds first/last buttons",
    },
    currentPage: {
      control: "number",
      description: "Current active page number",
    },
    totalItems: {
      control: "number",
      description: "Total number of items to paginate",
    },
    pageSize: {
      control: "number",
      description: "Number of items per page",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant
export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    const totalItems = 256;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-body-sm font-medium mb-2">Default Variant</p>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Previous/Next navigation with range dropdown
          </p>
        </div>
        <Pagination
         
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

// Full variant
export const Full: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    const [pageSize, setPageSize] = useState(25);
    const totalItems = 256;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-body-sm font-medium mb-2">Full Variant</p>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            First/Previous/Next/Last navigation with range dropdown
          </p>
        </div>
        <Pagination
          variant="full"
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    const [pageSize, setPageSize] = useState(10);
    const [variant, setVariant] = useState<"default" | "full">("default");
    const totalItems = 247;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    const totalPages = Math.ceil(totalItems / pageSize);

    return (
      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pagination Demo
              <div className="flex gap-2">
                <Badge
                  
                  className="cursor-pointer"
                  onClick={() => setVariant("default")}
                >
                  Default
                </Badge>
                <Badge
                  
                  className="cursor-pointer"
                  onClick={() => setVariant("full")}
                >
                  Full
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-body-md">
                <strong>Showing items {startItem}-{endItem}</strong> of {totalItems} total
              </p>
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Page {currentPage} of {totalPages} • {pageSize} items per page
              </p>
            </div>

            {/* Simulated content */}
            <div className="border rounded-lg p-4 space-y-2">
              {Array.from({ length: Math.min(pageSize, totalItems - startItem + 1) }, (_, i) => {
                const itemNumber = startItem + i;
                return (
                  <div
                    key={itemNumber}
                    className="flex items-center justify-between p-2 bg-[var(--color-background-neutral-subtle)] rounded"
                  >
                    <span className="font-medium">Item #{itemNumber}</span>
                    <Badge appearance="outline">Type {((itemNumber - 1) % 4) + 1}</Badge>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Pagination
                variant={variant}
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

// Different page sizes
export const PageSizes: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const totalItems = 1000;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-body-sm font-medium mb-2">Large Dataset</p>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            {totalItems} items with customizable page sizes
          </p>
        </div>
        <Pagination
          variant="full"
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[25, 50, 100, 200]}
        />
      </div>
    );
  },
};

// Edge cases
export const EdgeCases: Story = {
  render: () => {
    const [scenario, setScenario] = useState<"empty" | "single" | "few">("empty");

    const scenarios = {
      empty: { items: 0, page: 1, size: 10 },
      single: { items: 5, page: 1, size: 10 },
      few: { items: 8, page: 1, size: 25 },
    };

    const [currentPage, setCurrentPage] = useState(scenarios[scenario].page);
    const [pageSize, setPageSize] = useState(scenarios[scenario].size);
    const totalItems = scenarios[scenario].items;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-body-sm font-medium">Edge Cases</p>
          <div className="flex justify-center gap-2">
            <Badge
              
              className="cursor-pointer"
              onClick={() => setScenario("empty")}
            >
              No Items
            </Badge>
            <Badge
              
              className="cursor-pointer"
              onClick={() => setScenario("single")}
            >
              Single Page
            </Badge>
            <Badge
              
              className="cursor-pointer"
              onClick={() => setScenario("few")}
            >
              Few Items
            </Badge>
          </div>
        </div>

        <div className="flex justify-center">
          <Pagination
            variant="full"
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>

        <div className="text-center text-body-sm text-[var(--color-text-secondary)]">
          {scenario === "empty" && "No items to display"}
          {scenario === "single" && `${totalItems} items (all fit on one page)`}
          {scenario === "few" && `${totalItems} items (less than page size)`}
        </div>
      </div>
    );
  },
};

// Data table integration example
export const DataTableExample: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const allUsers = Array.from({ length: 127 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: Math.random() > 0.3 ? "Active" : "Inactive",
    }));

    const totalItems = allUsers.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentUsers = allUsers.slice(startIndex, endIndex);

    const getStatusBadge = (status: string) => (
      <Badge>
        {status}
      </Badge>
    );

    return (
      <div className="w-full max-w-4xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-primary-subtle)] bg-[#f6f7f8]">
                    <th className="text-left px-4 py-2 text-body-strong-sm font-semibold">Name</th>
                    <th className="text-left px-4 py-2 text-body-strong-sm font-semibold">Email</th>
                    <th className="text-left px-4 py-2 text-body-strong-sm font-semibold">Role</th>
                    <th className="text-left px-4 py-2 text-body-strong-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[var(--color-border-primary-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)]"
                    >
                      <td className="px-4 py-2 text-body-sm font-medium">{user.name}</td>
                      <td className="px-4 py-2 text-body-sm text-[var(--color-text-secondary)]">
                        {user.email}
                      </td>
                      <td className="px-4 py-2">
                        <Badge appearance="outline">{user.role}</Badge>
                      </td>
                      <td className="px-4 py-2">{getStatusBadge(user.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                Total: {totalItems} users
              </div>
              <Pagination
               
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

// Comparison of variants
export const VariantComparison: Story = {
  render: () => {
    const [currentPage1, setCurrentPage1] = useState(1);
    const [pageSize1, setPageSize1] = useState(25);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(25);
    const totalItems = 256;

    return (
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h3 className="text-heading-md font-semibold mb-2">Variant Comparison</h3>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Compare default and full pagination variants side by side
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Default Variant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-body-sm text-[var(--color-text-secondary)]">
                Previous/Next navigation only
              </div>
              <div className="flex justify-center">
                <Pagination
                 
                  currentPage={currentPage1}
                  totalItems={totalItems}
                  pageSize={pageSize1}
                  onPageChange={setCurrentPage1}
                  onPageSizeChange={setPageSize1}
                />
              </div>
              <div className="text-center text-body-sm">
                Page {currentPage1} of {Math.ceil(totalItems / pageSize1)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Full Variant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-body-sm text-[var(--color-text-secondary)]">
                First/Previous/Next/Last navigation
              </div>
              <div className="flex justify-center">
                <Pagination
                  variant="full"
                  currentPage={currentPage2}
                  totalItems={totalItems}
                  pageSize={pageSize2}
                  onPageChange={setCurrentPage2}
                  onPageSizeChange={setPageSize2}
                />
              </div>
              <div className="text-center text-body-sm">
                Page {currentPage2} of {Math.ceil(totalItems / pageSize2)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
};