import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'

const meta: Meta<typeof Accordion> = {
  title: 'NPM/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether multiple items can be expanded at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed when type is single',
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

// Basic accordion
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components' aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses CSS animations for smooth expand and collapse transitions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

// Multiple items can be open
export const Multiple: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Accordion type="multiple">
        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>• Responsive design that works on all devices</p>
              <p>• Dark mode support with automatic switching</p>
              <p>• Advanced search and filtering capabilities</p>
              <p>• Real-time collaboration tools</p>
              <p>• Integration with popular third-party services</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <AccordionTrigger>Pricing</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Basic Plan</span>
                <span className="text-body-md">$9/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Pro Plan</span>
                <span className="text-body-md">$29/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Enterprise</span>
                <span className="text-body-md">Custom pricing</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Support</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>We provide 24/7 customer support through multiple channels:</p>
              <ul className="space-y-1 ml-4">
                <li>• Live chat support</li>
                <li>• Email support</li>
                <li>• Phone support for enterprise customers</li>
                <li>• Comprehensive documentation</li>
                <li>• Video tutorials and guides</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

// FAQ style
export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="mb-6">
        <h2 className="text-heading-lg font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Find answers to common questions about our service.
        </p>
      </div>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="getting-started">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>Getting started is easy! Follow these simple steps:</p>
              <ol className="space-y-2 ml-4">
                <li>1. Sign up for a free account</li>
                <li>2. Complete your profile setup</li>
                <li>3. Connect your existing tools and data sources</li>
                <li>4. Explore our interactive tutorials</li>
                <li>5. Start building your first project</li>
              </ol>
              <div className="mt-4">
                <Button size="sm">Start Free Trial</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="data-security">
          <AccordionTrigger>How secure is my data?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>We take data security very seriously and implement multiple layers of protection:</p>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Icon name="shield-check" size="sm" className="mt-1 text-[var(--color-text-success)]" />
                  <div>
                    <p className="font-medium">End-to-end encryption</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">All data is encrypted in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="server" size="sm" className="mt-1 text-[var(--color-text-information)]" />
                  <div>
                    <p className="font-medium">SOC 2 Type II compliant</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">Independently audited security controls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="users" size="sm" className="mt-1 text-[var(--color-text-warning)]" />
                  <div>
                    <p className="font-medium">Role-based access control</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">Granular permissions and user management</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="integrations">
          <AccordionTrigger>What integrations are available?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>We offer a wide range of integrations to connect with your existing workflow:</p>
              
              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Icon name="database" size="sm" />
                    Data Sources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">MySQL</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">Redis</Badge>
                    <Badge variant="secondary">Elasticsearch</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Icon name="cloud" size="sm" />
                    Cloud Platforms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">Google Cloud</Badge>
                    <Badge variant="secondary">Azure</Badge>
                    <Badge variant="secondary">Digital Ocean</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Icon name="git-branch" size="sm" />
                    Development Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">GitHub</Badge>
                    <Badge variant="secondary">GitLab</Badge>
                    <Badge variant="secondary">Bitbucket</Badge>
                    <Badge variant="secondary">Jira</Badge>
                    <Badge variant="secondary">Slack</Badge>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="billing">
          <AccordionTrigger>How does billing work?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>Our billing system is designed to be simple and transparent:</p>
              <div className="space-y-3">
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <h4 className="font-medium mb-1">Monthly Billing</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Pay month-to-month with no long-term commitment. Cancel anytime.
                  </p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <h4 className="font-medium mb-1">Annual Billing</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Save 20% with annual billing. Billed once per year.
                  </p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <h4 className="font-medium mb-1">Usage-Based</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Enterprise plans can be customized based on your specific usage needs.
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cancellation">
          <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>Yes, you can cancel your subscription at any time with no questions asked.</p>
              <div className="bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md p-4">
                <div className="flex items-start gap-3">
                  <Icon name="info" size="sm" className="mt-0.5 text-[var(--color-text-information)]" />
                  <div className="space-y-1">
                    <p className="font-medium">What happens when you cancel:</p>
                    <ul className="text-body-sm space-y-1">
                      <li>• Your account remains active until the end of your billing period</li>
                      <li>• You can export all your data at any time</li>
                      <li>• No cancellation fees or penalties</li>
                      <li>• You can reactivate your account anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

// Settings/Configuration style
export const SettingsAccordion: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <div className="mb-4">
        <h2 className="text-heading-md font-semibold">Account Settings</h2>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Manage your account preferences and configuration
        </p>
      </div>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="profile">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Icon name="user" size="sm" />
              Profile Information
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-body-sm font-medium">First Name</label>
                  <input 
                    className="w-full h-8 px-2 border border-[var(--color-border-input)] rounded text-body-sm"
                    defaultValue="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium">Last Name</label>
                  <input 
                    className="w-full h-8 px-2 border border-[var(--color-border-input)] rounded text-body-sm"
                    defaultValue="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-body-sm font-medium">Email</label>
                <input 
                  className="w-full h-8 px-2 border border-[var(--color-border-input)] rounded text-body-sm"
                  defaultValue="john@example.com"
                  type="email"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm">Save Changes</Button>
                <Button size="sm" variant="ghost">Cancel</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Icon name="bell" size="sm" />
              Notifications
              <Badge variant="outline" className="ml-auto">3 enabled</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium">Email notifications</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Receive updates via email</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium">Push notifications</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Browser push notifications</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium">SMS notifications</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Text message alerts</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium">Weekly digest</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">Summary of weekly activity</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Icon name="shield" size="sm" />
              Privacy & Security
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="text-body-sm font-medium mb-2">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-3 border border-[var(--color-border-success)] bg-[var(--color-background-success-subtle)] rounded-md">
                    <div className="flex items-center gap-2">
                      <Icon name="shield-check" size="sm" className="text-[var(--color-text-success)]" />
                      <span className="text-body-sm">Enabled</span>
                    </div>
                    <Button size="sm" variant="ghost">Manage</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-body-sm font-medium mb-2">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border border-[var(--color-border-primary-subtle)] rounded">
                      <div className="flex items-center gap-2">
                        <Icon name="monitor" size="sm" />
                        <span className="text-body-sm">Desktop - Current</span>
                      </div>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">Active now</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border border-[var(--color-border-primary-subtle)] rounded">
                      <div className="flex items-center gap-2">
                        <Icon name="smartphone" size="sm" />
                        <span className="text-body-sm">Mobile App</span>
                      </div>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="billing-settings">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Icon name="credit-card" size="sm" />
              Billing & Subscription
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-body-sm font-medium">Current Plan</h4>
                  <Badge>Pro Plan</Badge>
                </div>
                <p className="text-caption-sm text-[var(--color-text-secondary)]">
                  $29/month • Next billing: March 15, 2024
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-body-sm font-medium">Payment Method</h4>
                <div className="flex items-center gap-2 p-2 border border-[var(--color-border-primary-subtle)] rounded">
                  <Icon name="credit-card" size="sm" />
                  <span className="text-body-sm">•••• •••• •••• 4242</span>
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">Expires 12/25</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">Change Plan</Button>
                <Button size="sm" variant="ghost">Update Payment</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

// Width consistency demonstration
export const WidthConsistency: Story = {
  render: () => (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-heading-md font-semibold mb-2">Width Consistency Test</h2>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          This example shows how accordion width behaves with different content lengths.
          The accordion should maintain consistent width in collapsed and expanded states.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="border border-[var(--color-border-primary-subtle)] rounded-md">
        <AccordionItem value="short">
          <AccordionTrigger>Short</AccordionTrigger>
          <AccordionContent>
            Brief content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="medium">
          <AccordionTrigger>Medium length title</AccordionTrigger>
          <AccordionContent>
            This is medium length content that should not affect the overall accordion width when expanded or collapsed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="long">
          <AccordionTrigger>This is a very long accordion trigger title that demonstrates width behavior</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>This is very long content that includes multiple paragraphs and complex layout elements to test how the accordion handles width consistency when there's a significant difference between trigger and content widths.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded">
                  <h4 className="font-medium mb-1">Column 1</h4>
                  <p className="text-body-sm">Some content here that extends the width</p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded">
                  <h4 className="font-medium mb-1">Column 2</h4>
                  <p className="text-body-sm">More content that could affect width</p>
                </div>
              </div>
              <Button size="sm">Action Button</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

// Product features showcase
export const ProductShowcase: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="mb-6 text-center">
        <h2 className="text-heading-lg font-bold mb-2">Why Choose Our Platform?</h2>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Discover the powerful features that make us different
        </p>
      </div>
      
      <Accordion type="multiple" defaultValue={["performance"]}>
        <AccordionItem value="performance">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-success)] flex items-center justify-center">
                <Icon name="zap" size="sm" className="text-[var(--color-text-on-action)]" />
              </div>
              <span>Lightning Fast Performance</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>Our platform is built for speed, delivering exceptional performance across all features.</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[var(--color-text-brand)]">99.9%</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-text-brand)]">&lt;100ms</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--color-text-brand)]">10M+</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Requests/day</div>
                </div>
              </div>
              
              <div className="bg-[var(--color-background-neutral-subtle)] p-4 rounded-md">
                <h4 className="font-medium mb-2">Performance Features:</h4>
                <ul className="space-y-1 text-body-sm">
                  <li>• Global CDN with edge caching</li>
                  <li>• Optimized database queries</li>
                  <li>• Real-time data synchronization</li>
                  <li>• Advanced caching strategies</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-information)] flex items-center justify-center">
                <Icon name="shield" size="sm" className="text-[var(--color-text-on-action)]" />
              </div>
              <span>Enterprise-Grade Security</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>Your data security is our top priority. We implement industry-leading security measures.</p>
              
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 border border-[var(--color-border-success)] bg-[var(--color-background-success-subtle)] rounded-md">
                  <Icon name="check-circle" size="sm" className="mt-0.5 text-[var(--color-text-success)]" />
                  <div>
                    <p className="font-medium">SOC 2 Type II Compliant</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">Independently audited security controls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border border-[var(--color-border-success)] bg-[var(--color-background-success-subtle)] rounded-md">
                  <Icon name="check-circle" size="sm" className="mt-0.5 text-[var(--color-text-success)]" />
                  <div>
                    <p className="font-medium">ISO 27001 Certified</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">International security management standard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border border-[var(--color-border-success)] bg-[var(--color-background-success-subtle)] rounded-md">
                  <Icon name="check-circle" size="sm" className="mt-0.5 text-[var(--color-text-success)]" />
                  <div>
                    <p className="font-medium">GDPR Compliant</p>
                    <p className="text-body-sm text-[var(--color-text-secondary)]">Full compliance with data protection regulations</p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scalability">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-warning)] flex items-center justify-center">
                <Icon name="trending-up" size="sm" className="text-[var(--color-text-on-action)]" />
              </div>
              <span>Infinite Scalability</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>Grow without limits. Our infrastructure automatically scales with your needs.</p>
              
              <div className="space-y-3">
                <div className="p-4 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Auto-scaling</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Resources automatically adjust based on demand
                  </p>
                </div>
                <div className="p-4 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Load Balancing</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Traffic distributed across multiple servers for optimal performance
                  </p>
                </div>
                <div className="p-4 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Database Clustering</span>
                    <Badge variant="outline">Multi-region</Badge>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Data replicated across multiple regions for reliability
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-background-error)] flex items-center justify-center">
                <Icon name="heart" size="sm" className="text-[var(--color-text-on-action)]" />
              </div>
              <span>24/7 Expert Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>Get help whenever you need it from our team of experienced professionals.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="message-circle" size="sm" />
                    <span className="font-medium">Live Chat</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Instant support via chat
                  </p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="mail" size="sm" />
                    <span className="font-medium">Email Support</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Detailed technical assistance
                  </p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="phone" size="sm" />
                    <span className="font-medium">Phone Support</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Direct line to experts
                  </p>
                </div>
                <div className="p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="book-open" size="sm" />
                    <span className="font-medium">Documentation</span>
                  </div>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Comprehensive guides
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}