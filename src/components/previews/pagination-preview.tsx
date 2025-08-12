import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Icon } from "../ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";

export function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tablePage, setTablePage] = useState(2);
  const [pageSize, setPageSize] = useState("10");
  const [searchPage, setSearchPage] = useState(3);

  const totalPages = 10;
  const totalItems = 247;

  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = (current: number, total: number) => {
    const pages = [];
    
    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (current > 4) {
        pages.push('ellipsis-start');
      }
      
      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== total) {
          pages.push(i);
        }
      }
      
      if (current < total - 3) {
        pages.push('ellipsis-end');
      }
      
      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Pagination */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Pagination</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Pagination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Navigation</CardTitle>
              <CardDescription>
                Basic pagination with previous, next, and page numbers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.max(1, currentPage - 1));
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === 2}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(2);
                      }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === 3}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(3);
                      }}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.min(3, currentPage + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-caption-sm text-[var(--color-text-secondary)] text-center">
                Current page: {currentPage} of 3
              </div>
            </CardContent>
          </Card>

          {/* With Ellipsis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Ellipsis</CardTitle>
              <CardDescription>
                Pagination with ellipsis for large page counts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">47</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-caption-sm text-[var(--color-text-secondary)] text-center">
                Showing page 1 of 47
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Pagination */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Advanced Pagination</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)]">
          {/* Data Table Pagination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Data Table Pagination</CardTitle>
              <CardDescription>
                Complete pagination with page size selection and item counts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              {/* Table Info and Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-md)]">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <span className="text-body-sm text-[var(--color-text-secondary)]">Rows per page:</span>
                    <Select value={pageSize} onValueChange={setPageSize}>
                      <SelectTrigger className="w-20">
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
                  <div className="text-body-sm text-[var(--color-text-secondary)]">
                    Showing {((tablePage - 1) * parseInt(pageSize)) + 1}-{Math.min(tablePage * parseInt(pageSize), totalItems)} of {totalItems} items
                  </div>
                </div>
                <Badge variant="secondary" size="sm">
                  {Math.ceil(totalItems / parseInt(pageSize))} pages total
                </Badge>
              </div>

              {/* Pagination */}
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setTablePage(Math.max(1, tablePage - 1));
                      }}
                    />
                  </PaginationItem>
                  {generatePageNumbers(tablePage, Math.ceil(totalItems / parseInt(pageSize))).map((page, index) => (
                    <PaginationItem key={index}>
                      {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink 
                          href="#" 
                          isActive={tablePage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setTablePage(page as number);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setTablePage(Math.min(Math.ceil(totalItems / parseInt(pageSize)), tablePage + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pagination States */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Pagination States</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* First Page */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">First Page</CardTitle>
              <CardDescription>
                Pagination on the first page with disabled previous.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      className="pointer-events-none opacity-50"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          {/* Middle Page */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Middle Page</CardTitle>
              <CardDescription>
                Pagination in the middle with both directions enabled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">6</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          {/* Last Page */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Last Page</CardTitle>
              <CardDescription>
                Pagination on the last page with disabled next.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">8</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">9</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>10</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      className="pointer-events-none opacity-50"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Search Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Search Results</CardTitle>
              <CardDescription>
                Pagination for search results with result counts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Icon name="search" size="sm" className="text-[var(--color-text-brand)]" />
                  <span className="text-body-medium-sm">Search Results</span>
                </div>
                <Badge variant="secondary" size="sm">
                  1,247 results
                </Badge>
              </div>
              
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                Showing results 21-30 of 1,247 for "design system"
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchPage(Math.max(1, searchPage - 1));
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">125</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchPage(Math.min(125, searchPage + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          {/* Blog Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Blog Navigation</CardTitle>
              <CardDescription>
                Simple pagination for blog posts or articles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)]">
                <Icon name="bookmark" size="sm" className="text-[var(--color-text-brand)]" />
                <span className="text-body-medium-sm">Recent Articles</span>
              </div>
              
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                Page 2 of 12 articles
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">12</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="flex items-center justify-center gap-[var(--space-sm)] text-caption-sm text-[var(--color-text-tertiary)]">
                <Icon name="info" size="sm" />
                <span>Navigate between article pages</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compact Pagination */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Compact Variations</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Arrows */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Navigation</CardTitle>
              <CardDescription>
                Minimal pagination with just previous and next buttons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="text-body-sm text-[var(--color-text-secondary)] text-center">
                Image 3 of 8
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          {/* Mobile Optimized */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Mobile Optimized</CardTitle>
              <CardDescription>
                Compact pagination designed for mobile screens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="text-body-sm text-[var(--color-text-secondary)] text-center">
                5 of 23 pages
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size="sm">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size="sm" isActive>5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" size="sm">6</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
                <li>• Show total item count and current range</li>
                <li>• Provide page size options for data tables</li>
                <li>• Use ellipsis for large page counts</li>
                <li>• Disable navigation at boundaries (first/last page)</li>
                <li>• Include proper ARIA labels for accessibility</li>
                <li>• Consider mobile users with touch-friendly targets</li>
                <li>• Use semantic HTML with nav and list elements</li>
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
                <li>• Don't show too many page numbers at once</li>
                <li>• Avoid pagination for small data sets (&lt;20 items)</li>
                <li>• Don't use pagination without showing total counts</li>
                <li>• Avoid tiny click targets on mobile devices</li>
                <li>• Don't forget keyboard navigation support</li>
                <li>• Avoid inconsistent spacing between elements</li>
                <li>• Don't use generic link text without context</li>
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
                <strong>Keyboard Navigation:</strong> Ensure all pagination links are keyboard accessible with proper focus indicators.
              </p>
              <p>
                <strong>Screen Readers:</strong> Use semantic HTML (nav, ul, li) and ARIA labels like "Go to next page" and "Current page, page 3".
              </p>
              <p>
                <strong>Visual Indicators:</strong> Clearly indicate the current page and disabled states with sufficient color contrast.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}