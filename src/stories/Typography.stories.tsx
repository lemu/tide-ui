import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '../components/ui/typography'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'code', 'lead', 'large', 'small', 'muted'],
    },
    as: {
      control: { type: 'text' },
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

// Default typography
export const Default: Story = {
  args: {
    variant: 'p',
    children: 'This is a paragraph of text using the default typography component.',
  },
  render: (args) => (
    <div className="w-96">
      <Typography {...args} />
    </div>
  ),
}

// All heading variants
export const Headings: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <Typography variant="h1">Heading 1 - Main Page Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Subsection Title</Typography>
      <Typography variant="h4">Heading 4 - Article Title</Typography>
      <Typography variant="h5">Heading 5 - Component Title</Typography>
      <Typography variant="h6">Heading 6 - Small Section</Typography>
    </div>
  ),
}

// Body text variants
export const BodyText: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <div>
        <Typography variant="lead" className="mb-2">
          Lead paragraph - This is a lead paragraph that stands out from regular body text.
        </Typography>
        <Typography variant="p">
          Regular paragraph - This is the standard body text used throughout the application. 
          It provides good readability and follows our design system typography scale.
        </Typography>
      </div>
      
      <div>
        <Typography variant="large">
          Large text - Used for emphasis or important information that needs to stand out.
        </Typography>
      </div>
      
      <div>
        <Typography variant="small">
          Small text - Used for captions, labels, or secondary information.
        </Typography>
      </div>
      
      <div>
        <Typography variant="muted">
          Muted text - Used for less important information or placeholder text.
        </Typography>
      </div>
    </div>
  ),
}

// Special elements
export const SpecialElements: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <Typography variant="h4" className="mb-4">Blockquote Example</Typography>
        <Typography variant="blockquote">
          "The best way to predict the future is to invent it. Design is not just what it looks like and feels like. Design is how it works."
        </Typography>
        <Typography variant="small" className="mt-2">— Steve Jobs</Typography>
      </div>
      
      <div>
        <Typography variant="h4" className="mb-4">Inline Code</Typography>
        <Typography variant="p">
          To install the package, run <Typography variant="code" as="span">npm install @company/ui</Typography> in your terminal.
        </Typography>
      </div>
    </div>
  ),
}

// Article layout
export const ArticleLayout: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Card>
        <CardHeader>
          <Typography variant="h1" className="mb-2">
            Building Modern Web Applications
          </Typography>
          <Typography variant="muted">
            Published on March 15, 2024 • 5 min read
          </Typography>
        </CardHeader>
        <CardContent className="space-y-6">
          <Typography variant="lead">
            In today's rapidly evolving digital landscape, creating robust and scalable web applications 
            has become more important than ever. This article explores the best practices and modern 
            approaches to web development.
          </Typography>
          
          <div>
            <Typography variant="h2" className="mb-3">Introduction</Typography>
            <Typography variant="p" className="mb-4">
              Modern web development requires a deep understanding of various technologies, frameworks, 
              and design patterns. From responsive design to performance optimization, developers must 
              consider multiple factors when building applications.
            </Typography>
            <Typography variant="p">
              This comprehensive guide will walk you through the essential concepts and provide 
              practical examples to help you build better web applications.
            </Typography>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-3">Key Technologies</Typography>
            <Typography variant="p" className="mb-3">
              The modern web development stack includes several core technologies:
            </Typography>
            <ul className="space-y-2 ml-6">
              <li><Typography variant="p" as="span"><Typography variant="code" as="span">React</Typography> - Component-based UI library</Typography></li>
              <li><Typography variant="p" as="span"><Typography variant="code" as="span">TypeScript</Typography> - Type-safe JavaScript</Typography></li>
              <li><Typography variant="p" as="span"><Typography variant="code" as="span">Next.js</Typography> - Full-stack React framework</Typography></li>
              <li><Typography variant="p" as="span"><Typography variant="code" as="span">Tailwind CSS</Typography> - Utility-first CSS framework</Typography></li>
            </ul>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-3">Best Practices</Typography>
            <Typography variant="blockquote" className="mb-4">
              "Code is like humor. When you have to explain it, it's bad."
            </Typography>
            <Typography variant="p">
              Following established patterns and conventions helps maintain code quality and 
              ensures that your applications are maintainable and scalable.
            </Typography>
          </div>
          
          <div>
            <Typography variant="h4" className="mb-3">Performance Considerations</Typography>
            <Typography variant="p" className="mb-3">
              Performance optimization should be considered from the beginning of your project. 
              Some key areas to focus on include:
            </Typography>
            <div className="bg-[var(--color-background-neutral-subtle)] p-4 rounded-lg">
              <Typography variant="small" className="font-medium mb-2 block">
                Performance Checklist:
              </Typography>
              <ul className="space-y-1">
                <li><Typography variant="small" as="span">• Optimize bundle size</Typography></li>
                <li><Typography variant="small" as="span">• Implement lazy loading</Typography></li>
                <li><Typography variant="small" as="span">• Use efficient state management</Typography></li>
                <li><Typography variant="small" as="span">• Minimize API calls</Typography></li>
              </ul>
            </div>
          </div>
          
          <div>
            <Typography variant="h2" className="mb-3">Conclusion</Typography>
            <Typography variant="p" className="mb-3">
              Building modern web applications requires a thoughtful approach to architecture, 
              performance, and user experience. By following these guidelines and staying up-to-date 
              with the latest developments in the ecosystem, you can create applications that are 
              both powerful and maintainable.
            </Typography>
            <Typography variant="muted">
              Thank you for reading! Feel free to reach out if you have any questions or feedback.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Custom elements
export const CustomElements: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <Typography variant="h3" className="mb-4">Custom HTML Elements</Typography>
        
        {/* Using different HTML elements with same styling */}
        <div className="space-y-3">
          <Typography variant="h4" as="div">
            This is a div styled as h4
          </Typography>
          
          <Typography variant="p" as="span" className="block">
            This is a span styled as paragraph (with block display)
          </Typography>
          
          <Typography variant="large" as="small">
            This is a small element styled as large text
          </Typography>
          
          <Typography variant="code" as="div">
            This is a div styled as inline code
          </Typography>
        </div>
      </div>
      
      <div>
        <Typography variant="h4" className="mb-3">Mixed Content Example</Typography>
        <Typography variant="p">
          This paragraph contains{" "}
          <Typography variant="code" as="span">inline code</Typography>,{" "}
          <Typography variant="large" as="span">large text</Typography>, and{" "}
          <Typography variant="small" as="span">small text</Typography>{" "}
          all within the same paragraph.
        </Typography>
      </div>
    </div>
  ),
}

// Typography scale demonstration
export const TypographyScale: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Typography variant="h4" className="mb-4">Headings</Typography>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H1</Typography>
                  <Typography variant="h1">Sample</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H2</Typography>
                  <Typography variant="h2">Sample</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H3</Typography>
                  <Typography variant="h3">Sample</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H4</Typography>
                  <Typography variant="h4">Sample</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H5</Typography>
                  <Typography variant="h5">Sample</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-8 text-right">H6</Typography>
                  <Typography variant="h6">Sample</Typography>
                </div>
              </div>
            </div>
            
            <div>
              <Typography variant="h4" className="mb-4">Body Text</Typography>
              <div className="space-y-3">
                <div>
                  <Typography variant="small" className="mb-1 block">Lead</Typography>
                  <Typography variant="lead">Lead paragraph text sample</Typography>
                </div>
                <div>
                  <Typography variant="small" className="mb-1 block">Paragraph</Typography>
                  <Typography variant="p">Regular paragraph text sample</Typography>
                </div>
                <div>
                  <Typography variant="small" className="mb-1 block">Large</Typography>
                  <Typography variant="large">Large text sample</Typography>
                </div>
                <div>
                  <Typography variant="small" className="mb-1 block">Small</Typography>
                  <Typography variant="small">Small text sample</Typography>
                </div>
                <div>
                  <Typography variant="small" className="mb-1 block">Muted</Typography>
                  <Typography variant="muted">Muted text sample</Typography>
                </div>
                <div>
                  <Typography variant="small" className="mb-1 block">Code</Typography>
                  <Typography variant="code">console.log('code')</Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}