import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const meta: Meta<typeof Pagination> = {
  title: 'In Progress/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Basic pagination
export const Default: Story = {
  render: () => (
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
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

// Interactive pagination
export const Interactive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5)
    const totalPages = 20

    const generatePageNumbers = () => {
      const pages = []
      const maxVisible = 7

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 3) {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        }
      }

      return pages
    }

    const pages = generatePageNumbers()

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Page {currentPage} of {totalPages} (400 total items)
          </p>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                style={{ 
                  opacity: currentPage === 1 ? 0.5 : 1,
                  pointerEvents: currentPage === 1 ? 'none' : 'auto'
                }}
              />
            </PaginationItem>
            
            {pages.map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink 
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page as number)
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
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                style={{ 
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  pointerEvents: currentPage === totalPages ? 'none' : 'auto'
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentPage(Math.floor(Math.random() * totalPages) + 1)}
          >
            Random Page
          </Button>
        </div>
      </div>
    )
  },
}

// Simple pagination (few pages)
export const SimplePagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(2)
    const totalPages = 5

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Showing page {currentPage} of {totalPages}
          </p>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                style={{ 
                  opacity: currentPage === 1 ? 0.5 : 1,
                  pointerEvents: currentPage === 1 ? 'none' : 'auto'
                }}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                style={{ 
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  pointerEvents: currentPage === totalPages ? 'none' : 'auto'
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  },
}

// Data table with pagination
export const DataTablePagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    
    const totalItems = 247
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const generateTableRows = () => {
      const rows = []
      for (let i = startItem; i <= endItem; i++) {
        rows.push({
          id: i,
          name: `User ${i}`,
          email: `user${i}@example.com`,
          role: ['Admin', 'Editor', 'Viewer'][i % 3],
          status: Math.random() > 0.3 ? 'Active' : 'Inactive'
        })
      }
      return rows
    }

    const tableData = generateTableRows()

    const generatePageNumbers = () => {
      const pages = []
      const maxVisible = 5

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        }
      }

      return pages
    }

    const pages = generatePageNumbers()

    return (
      <div className="w-full max-w-4xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Users
              <Badge variant="outline">{totalItems} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border-primary-subtle)]">
                    <th className="text-left p-3 text-body-sm font-medium">Name</th>
                    <th className="text-left p-3 text-body-sm font-medium">Email</th>
                    <th className="text-left p-3 text-body-sm font-medium">Role</th>
                    <th className="text-left p-3 text-body-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((user) => (
                    <tr key={user.id} className="border-b border-[var(--color-border-primary-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)]">
                      <td className="p-3 text-body-sm font-medium">{user.name}</td>
                      <td className="p-3 text-body-sm text-[var(--color-text-secondary)]">{user.email}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">{user.role}</Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                          {user.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-body-sm">Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      const newItemsPerPage = Number(e.target.value)
                      setItemsPerPage(newItemsPerPage)
                      setCurrentPage(1)
                    }}
                    className="border border-[var(--color-border-input)] rounded px-2 py-1 text-body-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <div className="text-body-sm text-[var(--color-text-secondary)]">
                  Showing {startItem}-{endItem} of {totalItems}
                </div>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      style={{ 
                        opacity: currentPage === 1 ? 0.5 : 1,
                        pointerEvents: currentPage === 1 ? 'none' : 'auto'
                      }}
                    />
                  </PaginationItem>
                  
                  {pages.map((page, index) => (
                    <PaginationItem key={index}>
                      {page === 'ellipsis' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink 
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page as number)
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
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      style={{ 
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        pointerEvents: currentPage === totalPages ? 'none' : 'auto'
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Search results pagination
export const SearchResultsPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery] = useState('design system')
    
    const resultsPerPage = 5
    const totalResults = 127
    const totalPages = Math.ceil(totalResults / resultsPerPage)
    const startResult = (currentPage - 1) * resultsPerPage + 1
    const endResult = Math.min(currentPage * resultsPerPage, totalResults)

    const generateResults = () => {
      const results = []
      for (let i = startResult; i <= endResult; i++) {
        results.push({
          id: i,
          title: `Design System Component #${i}`,
          description: `A comprehensive guide to building scalable design systems with reusable components and patterns. Result ${i} of ${totalResults}.`,
          url: `https://example.com/component-${i}`,
          type: ['Component', 'Pattern', 'Guide', 'Example'][i % 4]
        })
      }
      return results
    }

    const searchResults = generateResults()

    const generatePageNumbers = () => {
      const pages = []
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 3) {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('ellipsis')
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
          pages.push('ellipsis')
          pages.push(totalPages)
        }
      }
      return pages
    }

    const pages = generatePageNumbers()

    return (
      <div className="w-full max-w-3xl space-y-6">
        <div className="border-b border-[var(--color-border-primary-subtle)] pb-4">
          <h2 className="text-heading-lg font-semibold mb-2">Search Results</h2>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            {totalResults.toLocaleString()} results for "{searchQuery}" ({(Math.random() * 0.5 + 0.2).toFixed(2)} seconds)
          </p>
        </div>

        <div className="space-y-6">
          {searchResults.map((result) => (
            <div key={result.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="text-body-lg font-medium text-[var(--color-text-action)] hover:underline cursor-pointer">
                    {result.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)] mt-1">
                    {result.url}
                  </p>
                  <p className="text-body-md mt-2">
                    {result.description}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {result.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-primary-subtle)]">
          <div className="text-body-sm text-[var(--color-text-secondary)]">
            Showing {startResult}-{endResult} of {totalResults.toLocaleString()} results
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  style={{ 
                    opacity: currentPage === 1 ? 0.5 : 1,
                    pointerEvents: currentPage === 1 ? 'none' : 'auto'
                  }}
                />
              </PaginationItem>
              
              {pages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink 
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page as number)
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
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  style={{ 
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    pointerEvents: currentPage === totalPages ? 'none' : 'auto'
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    )
  },
}

// Compact pagination for mobile
export const CompactPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3)
    const totalPages = 15

    return (
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center">
          <h3 className="text-heading-sm font-semibold mb-2">Mobile Gallery</h3>
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Photo {currentPage} of {totalPages}
          </p>
        </div>

        {/* Simulated image */}
        <div className="aspect-square bg-[var(--color-background-neutral-subtle)] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Icon name="image" size="lg" className="mx-auto mb-2 text-[var(--color-text-secondary)]" />
            <p className="text-body-sm text-[var(--color-text-secondary)]">Image {currentPage}</p>
          </div>
        </div>

        {/* Compact pagination */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon name="chevron-left" size="sm" className="mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {currentPage > 2 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
                {currentPage > 3 && <span className="text-[var(--color-text-secondary)]">...</span>}
              </>
            )}
            
            {currentPage > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {currentPage - 1}
              </Button>
            )}
            
            <Button
              size="sm"
              className="w-8 h-8 p-0"
            >
              {currentPage}
            </Button>
            
            {currentPage < totalPages && (
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}
            
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && <span className="text-[var(--color-text-secondary)]">...</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <Icon name="chevron-right" size="sm" className="ml-1" />
          </Button>
        </div>
      </div>
    )
  },
}

// Edge cases
export const EdgeCases: Story = {
  render: () => {
    const [scenario, setScenario] = useState<'single' | 'empty' | 'many'>('single')
    
    const scenarios = {
      single: { current: 1, total: 1, items: 5 },
      empty: { current: 1, total: 0, items: 0 },
      many: { current: 500, total: 1000, items: 25000 }
    }
    
    const { current, total, items } = scenarios[scenario]

    return (
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2">
          <h3 className="text-heading-sm font-semibold">Edge Case Scenarios</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={scenario === 'single' ? 'default' : 'ghost'}
              onClick={() => setScenario('single')}
            >
              Single Page
            </Button>
            <Button
              size="sm"
              variant={scenario === 'empty' ? 'default' : 'ghost'}
              onClick={() => setScenario('empty')}
            >
              No Results
            </Button>
            <Button
              size="sm"
              variant={scenario === 'many' ? 'default' : 'ghost'}
              onClick={() => setScenario('many')}
            >
              Many Pages
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {scenario === 'empty' ? (
              <div className="text-center py-8">
                <Icon name="search" size="lg" className="mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                <h4 className="text-body-md font-medium mb-2">No results found</h4>
                <p className="text-body-sm text-[var(--color-text-secondary)] mb-4">
                  Try adjusting your search criteria or filters.
                </p>
                <Button size="sm">Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    {scenario === 'single' 
                      ? `Showing all ${items} items` 
                      : `Page ${current.toLocaleString()} of ${total.toLocaleString()} (${items.toLocaleString()} total items)`
                    }
                  </p>
                </div>

                {scenario === 'single' ? (
                  <div className="text-center py-4">
                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                      All items are displayed on this page.
                    </p>
                  </div>
                ) : (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">499</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>500</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">501</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1000</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}