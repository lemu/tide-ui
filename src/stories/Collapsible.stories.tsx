import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../components/ui/collapsible'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

// Basic collapsible
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="w-full max-w-md">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full items-center justify-between p-4">
              <span className="text-body-md font-medium">Can I use this in my project?</span>
              <Icon 
                name="chevron-down" 
                size="sm" 
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <div className="text-body-md text-[var(--color-text-secondary)]">
              Yes. Free to use for personal and commercial projects. No attribution required.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  },
}

// Code snippet collapsible
export const CodeSnippet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="code" size="sm" />
              Example Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between">
                  <span>View source code</span>
                  <Icon 
                    name={isOpen ? 'chevron-up' : 'chevron-down'} 
                    size="sm"
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="rounded-md bg-[var(--color-surface-secondary)] p-4 font-mono text-sm">
                  <pre className="text-[var(--color-text-primary)]">
{`import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function Example() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}`}
                  </pre>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Icon name="copy" size="sm" className="mr-2" />
                    Copy
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Icon name="external-link" size="sm" className="mr-2" />
                    Open in CodeSandbox
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Settings section
export const SettingsSection: Story = {
  render: () => {
    const [advancedOpen, setAdvancedOpen] = useState(false)
    const [debugOpen, setDebugOpen] = useState(false)

    return (
      <div className="w-full max-w-lg space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-body-sm font-medium">Theme</label>
              <select className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-body-sm font-medium">Language</label>
              <select className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between p-0">
                    <span className="text-body-md font-medium">Advanced Settings</span>
                    <Icon 
                      name="chevron-down" 
                      size="sm" 
                      className={`transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">Cache Size (MB)</label>
                    <input 
                      type="number" 
                      defaultValue="256"
                      className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-body-sm font-medium">API Timeout (ms)</label>
                    <input 
                      type="number" 
                      defaultValue="5000"
                      className="w-full h-10 px-3 border border-[var(--color-border-input)] rounded-md bg-[var(--color-surface-primary)] text-body-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-sm font-medium">Enable Experimental Features</p>
                      <p className="text-caption-sm text-[var(--color-text-secondary)]">May cause instability</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="border-t border-[var(--color-border-primary-subtle)] pt-4">
              <Collapsible open={debugOpen} onOpenChange={setDebugOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between p-0">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md font-medium">Debug Options</span>
                      <Badge variant="outline" className="text-xs">Developer</Badge>
                    </div>
                    <Icon 
                      name="chevron-down" 
                      size="sm" 
                      className={`transition-transform duration-200 ${debugOpen ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Enable Console Logging</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Show Performance Metrics</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm">Debug Network Requests</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="pt-2 border-t border-[var(--color-border-primary-subtle)]">
                    <Button size="sm" variant="ghost" className="text-[var(--color-text-error)]">
                      Clear All Debug Data
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Navigation sidebar
export const NavigationSidebar: Story = {
  render: () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      dashboard: true,
      projects: false,
      settings: false,
    })

    const toggleSection = (section: string) => {
      setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    return (
      <div className="w-64 border border-[var(--color-border-primary-subtle)] rounded-lg bg-[var(--color-surface-primary)]">
        <div className="p-4 border-b border-[var(--color-border-primary-subtle)]">
          <h2 className="text-heading-sm font-semibold">Navigation</h2>
        </div>
        
        <div className="p-2">
          <div className="space-y-1">
            {/* Dashboard Section */}
            <div>
              <Collapsible open={openSections.dashboard} onOpenChange={(open) => toggleSection('dashboard')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <Icon name="layout-dashboard" size="sm" />
                      <span className="text-body-sm">Dashboard</span>
                    </div>
                    <Icon 
                      name="chevron-down" 
                      size="sm" 
                      className={`transition-transform duration-200 ${openSections.dashboard ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 mt-1 space-y-1">
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Overview
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm bg-[var(--color-background-brand-selected)] text-[var(--color-text-brand)]">
                      Analytics
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Reports
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Projects Section */}
            <div>
              <Collapsible open={openSections.projects} onOpenChange={(open) => toggleSection('projects')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <Icon name="folder" size="sm" />
                      <span className="text-body-sm">Projects</span>
                      <Badge variant="secondary" className="text-xs">3</Badge>
                    </div>
                    <Icon 
                      name="chevron-down" 
                      size="sm" 
                      className={`transition-transform duration-200 ${openSections.projects ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 mt-1 space-y-1">
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Website Redesign
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Mobile App
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      API Integration
                    </Button>
                    <div className="pt-1 border-t border-[var(--color-border-primary-subtle)] mt-2">
                      <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm text-[var(--color-text-secondary)]">
                        <Icon name="plus" size="sm" className="mr-2" />
                        New Project
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Settings Section */}
            <div>
              <Collapsible open={openSections.settings} onOpenChange={(open) => toggleSection('settings')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <Icon name="settings" size="sm" />
                      <span className="text-body-sm">Settings</span>
                    </div>
                    <Icon 
                      name="chevron-down" 
                      size="sm" 
                      className={`transition-transform duration-200 ${openSections.settings ? 'rotate-180' : ''}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 mt-1 space-y-1">
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      General
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Integrations
                    </Button>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1 h-auto text-body-sm">
                      Billing
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Single Items */}
            <Button variant="ghost" className="flex w-full items-center gap-2 px-2 py-1.5 justify-start">
              <Icon name="users" size="sm" />
              <span className="text-body-sm">Team</span>
            </Button>
            <Button variant="ghost" className="flex w-full items-center gap-2 px-2 py-1.5 justify-start">
              <Icon name="help-circle" size="sm" />
              <span className="text-body-sm">Help</span>
            </Button>
          </div>
        </div>
      </div>
    )
  },
}

// Product feature list
export const FeatureList: Story = {
  render: () => {
    const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({})

    const toggleFeature = (feature: string) => {
      setOpenFeatures(prev => ({ ...prev, [feature]: !prev[feature] }))
    }

    const features = [
      {
        id: 'analytics',
        title: 'Advanced Analytics',
        icon: 'bar-chart',
        description: 'Get deep insights into your data with powerful analytics tools.',
        details: [
          'Real-time dashboard with customizable widgets',
          'Advanced filtering and segmentation options',
          'Export data in multiple formats (CSV, Excel, PDF)',
          'Automated reporting and scheduled email delivery',
          'Integration with Google Analytics and other platforms',
        ]
      },
      {
        id: 'collaboration',
        title: 'Team Collaboration',
        icon: 'users',
        description: 'Work together seamlessly with advanced collaboration features.',
        details: [
          'Real-time collaborative editing',
          'Comment system with mentions and notifications',
          'Version history and change tracking',
          'Role-based permissions and access control',
          'Integration with Slack, Microsoft Teams, and other tools',
        ]
      },
      {
        id: 'automation',
        title: 'Workflow Automation',
        icon: 'zap',
        description: 'Automate repetitive tasks and streamline your workflow.',
        details: [
          'Visual workflow builder with drag-and-drop interface',
          'Pre-built templates for common automation scenarios',
          'Conditional logic and branching workflows',
          'Integration with 1000+ third-party applications',
          'Webhook support for custom integrations',
        ]
      },
      {
        id: 'security',
        title: 'Enterprise Security',
        icon: 'shield',
        description: 'Keep your data safe with enterprise-grade security features.',
        details: [
          'End-to-end encryption for all data transmission',
          'SOC 2 Type II compliance and regular security audits',
          'Single Sign-On (SSO) with SAML and OAuth support',
          'Advanced user management and access controls',
          '24/7 security monitoring and incident response',
        ]
      }
    ]

    return (
      <div className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h2 className="text-heading-lg font-bold mb-2">Platform Features</h2>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Explore our comprehensive suite of tools and capabilities
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature) => (
            <Card key={feature.id}>
              <Collapsible 
                open={openFeatures[feature.id]} 
                onOpenChange={() => toggleFeature(feature.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-background-brand)] flex items-center justify-center">
                          <Icon name={feature.icon as any} size="sm" className="text-[var(--color-text-on-action)]" />
                        </div>
                        <div className="text-left">
                          <CardTitle className="text-heading-sm">{feature.title}</CardTitle>
                          <p className="text-body-sm text-[var(--color-text-secondary)] mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <Icon 
                        name="chevron-down" 
                        size="sm" 
                        className={`transition-transform duration-200 ${openFeatures[feature.id] ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <h4 className="text-body-medium-sm font-medium mb-3">What's included:</h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2 text-body-sm">
                            <Icon name="check" size="sm" className="mt-0.5 text-[var(--color-text-success)] flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4">
                        <Button size="sm">
                          Learn More
                          <Icon name="arrow-right" size="sm" className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    )
  },
}

// Multiple controlled collapsibles
export const MultipleControlled: Story = {
  render: () => {
    const [states, setStates] = useState({
      personal: false,
      work: false,
      social: false,
    })

    const toggle = (key: string) => {
      setStates(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2 mb-4">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setStates({ personal: true, work: true, social: true })}
          >
            Expand All
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => setStates({ personal: false, work: false, social: false })}
          >
            Collapse All
          </Button>
        </div>

        <Card>
          <Collapsible open={states.personal} onOpenChange={() => toggle('personal')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="user" size="sm" />
                    <span className="text-body-md font-medium">Personal Information</span>
                  </div>
                  <Icon 
                    name="chevron-down" 
                    size="sm" 
                    className={`transition-transform duration-200 ${states.personal ? 'rotate-180' : ''}`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="First name" className="px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                  <input placeholder="Last name" className="px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                </div>
                <input placeholder="Email address" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                <input placeholder="Phone number" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card>
          <Collapsible open={states.work} onOpenChange={() => toggle('work')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="briefcase" size="sm" />
                    <span className="text-body-md font-medium">Work Information</span>
                  </div>
                  <Icon 
                    name="chevron-down" 
                    size="sm" 
                    className={`transition-transform duration-200 ${states.work ? 'rotate-180' : ''}`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-3">
                <input placeholder="Company name" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                <input placeholder="Job title" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                <input placeholder="Work email" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                <input placeholder="Department" className="w-full px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card>
          <Collapsible open={states.social} onOpenChange={() => toggle('social')}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="share-2" size="sm" />
                    <span className="text-body-md font-medium">Social Links</span>
                  </div>
                  <Icon 
                    name="chevron-down" 
                    size="sm" 
                    className={`transition-transform duration-200 ${states.social ? 'rotate-180' : ''}`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="twitter" size="sm" />
                  <input placeholder="Twitter username" className="flex-1 px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="github" size="sm" />
                  <input placeholder="GitHub username" className="flex-1 px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="linkedin" size="sm" />
                  <input placeholder="LinkedIn profile" className="flex-1 px-3 py-2 border border-[var(--color-border-input)] rounded text-body-sm" />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    )
  },
}