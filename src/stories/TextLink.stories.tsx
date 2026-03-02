import type { Meta, StoryObj } from '@storybook/react'
import { TextLink } from '../components/fundamental/text-link'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'

import {
  BarChart,
  BookOpen,
  Calendar,
  Crown,
  Download,
  Eye,
  FolderOpen,
  Github,
  HelpCircle,
  Home,
  Linkedin,
  Mail,
  MessageCircle,
  Play,
  Plus,
  Rss,
  Settings,
  Share,
  Twitter,
  Upload,
  Users,
  Youtube,
  Zap,
} from 'lucide-react'
const meta: Meta<typeof TextLink> = {
  title: 'NPM • Fundamental/TextLink',
  component: TextLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Size of the text link',
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle'],
      description: 'Visual variant of the text link',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
    },
  },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

// Basic text links
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div>
          <TextLink href="#" size="s">Small link</TextLink>
        </div>
        <div>
          <TextLink href="#" size="m">Medium link (default)</TextLink>
        </div>
        <div>
          <TextLink href="#" size="l">Large link</TextLink>
        </div>
      </div>
    </div>
  ),
}

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <TextLink href="#">Default variant link</TextLink>
      </div>
      <div>
        <TextLink href="#" variant="subtle">Subtle variant link</TextLink>
      </div>
    </div>
  ),
}

// Links with icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div>
          <TextLink href="#" icon="external-link" iconPosition="right">
            Visit external site
          </TextLink>
        </div>
        <div>
          <TextLink href="#" icon={Download} iconPosition="left">
            Download file
          </TextLink>
        </div>
        <div>
          <TextLink href="#" icon="arrow-right" iconPosition="right">
            Continue reading
          </TextLink>
        </div>
        <div>
          <TextLink href="#" icon={Mail} iconPosition="left">
            Send email
          </TextLink>
        </div>
        <div>
          <TextLink href="#" icon={Github} iconPosition="left">
            View on GitHub
          </TextLink>
        </div>
      </div>
    </div>
  ),
}

// Navigation links
export const NavigationLinks: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <TextLink href="#" icon={Home} iconPosition="left">
              Back to Dashboard
            </TextLink>
          </div>
          <div>
            <TextLink href="#" icon={Settings} iconPosition="left">
              Account Settings
            </TextLink>
          </div>
          <div>
            <TextLink href="#" icon={HelpCircle} iconPosition="left">
              Help & Support
            </TextLink>
          </div>
          <div>
            <TextLink href="#" icon={BookOpen} iconPosition="left">
              Documentation
            </TextLink>
          </div>
          <div>
            <TextLink href="#" icon="external-link" iconPosition="right" target="_blank">
              API Reference
            </TextLink>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Content with inline links
export const InlineLinks: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="prose">
        <h3 className="text-heading-md font-semibold mb-4">Getting Started Guide</h3>
        <p className="text-body-md mb-4">
          Welcome to our platform! To get started, you'll need to{" "}
          <TextLink href="#" size="m">create an account</TextLink> or{" "}
          <TextLink href="#" size="m">sign in</TextLink> if you already have one.
        </p>
        <p className="text-body-md mb-4">
          Once you're logged in, check out our{" "}
          <TextLink href="#" icon={Play} iconPosition="left" size="m">
            video tutorial
          </TextLink>{" "}
          or browse the{" "}
          <TextLink href="#" icon={BookOpen} iconPosition="right" size="m">
            documentation
          </TextLink>{" "}
          to learn more about the features.
        </p>
        <p className="text-body-md">
          Need help? Visit our{" "}
          <TextLink href="#" size="m">support center</TextLink> or{" "}
          <TextLink href="#" icon={Mail} iconPosition="left" size="m">
            contact our team
          </TextLink>{" "}
          directly. You can also join our{" "}
          <TextLink href="#" icon="external-link" iconPosition="right" target="_blank" size="m">
            community forum
          </TextLink>{" "}
          to connect with other users.
        </p>
      </div>
    </div>
  ),
}

// Action links
export const ActionLinks: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>File Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-[var(--color-border-primary-subtle)] rounded-m">
            <div>
              <div className="font-medium">project-document.pdf</div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">2.4 MB • Modified 2 hours ago</div>
            </div>
            <div className="flex gap-2">
              <TextLink href="#" icon={Eye} size="s">View</TextLink>
              <TextLink href="#" icon={Download} size="s">Download</TextLink>
              <TextLink href="#" icon={Share} size="s">Share</TextLink>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-[var(--color-border-primary-subtle)] rounded-m">
            <div>
              <div className="font-medium">design-assets.zip</div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">15.8 MB • Modified 1 day ago</div>
            </div>
            <div className="flex gap-2">
              <TextLink href="#" icon={Download} size="s">Download</TextLink>
              <TextLink href="#" icon={FolderOpen} size="s">Extract</TextLink>
              <TextLink href="#" icon={Share} size="s">Share</TextLink>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <TextLink href="#" icon={Plus} iconPosition="left">
              Create new project
            </TextLink>
            <TextLink href="#" icon={Upload} iconPosition="left">
              Upload files
            </TextLink>
            <TextLink href="#" icon={Users} iconPosition="left">
              Invite team members
            </TextLink>
            <TextLink href="#" icon={Settings} iconPosition="left">
              Project settings
            </TextLink>
          </div>
          <div className="space-y-2">
            <TextLink href="#" icon={BarChart} iconPosition="left">
              View analytics
            </TextLink>
            <TextLink href="#" icon={Calendar} iconPosition="left">
              Schedule meeting
            </TextLink>
            <TextLink href="#" icon={MessageCircle} iconPosition="left">
              Send feedback
            </TextLink>
            <TextLink href="#" icon="external-link" iconPosition="right" target="_blank">
              Open in new tab
            </TextLink>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Social and external links
export const SocialLinks: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <TextLink href="#" icon={Twitter} iconPosition="left" target="_blank">
              Follow us on Twitter
            </TextLink>
            <TextLink href="#" icon={Github} iconPosition="left" target="_blank">
              Star us on GitHub
            </TextLink>
            <TextLink href="#" icon={Linkedin} iconPosition="left" target="_blank">
              Connect on LinkedIn
            </TextLink>
            <TextLink href="#" icon={Youtube} iconPosition="left" target="_blank">
              Subscribe on YouTube
            </TextLink>
          </div>
          
          <div className="border-t border-[var(--color-border-primary-subtle)] pt-4 space-y-3">
            <TextLink href="#" icon={Rss} iconPosition="left">
              Subscribe to our blog
            </TextLink>
            <TextLink href="#" icon={Mail} iconPosition="left">
              Join our newsletter
            </TextLink>
            <TextLink href="#" icon={MessageCircle} iconPosition="left">
              Join our Discord
            </TextLink>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Disabled state
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-body-medium-md font-medium mb-2">Disabled Links</h4>
        <div className="space-y-2">
          <div>
            <TextLink href="#" disabled>
              Disabled default link
            </TextLink>
          </div>
          <div>
            <TextLink href="#" variant="subtle" disabled>
              Disabled subtle link
            </TextLink>
          </div>
          <div>
            <TextLink href="#" icon="external-link" iconPosition="right" disabled>
              Disabled link with icon
            </TextLink>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-body-medium-md font-medium mb-2">Interactive Example</h4>
        <p className="text-body-md mb-3">
          Some features are only available to premium users.{" "}
          <TextLink href="#" disabled>
            Advanced analytics
          </TextLink>{" "}
          and{" "}
          <TextLink href="#" icon={Crown} iconPosition="left" disabled>
            premium templates
          </TextLink>{" "}
          require an upgrade.
        </p>
        <TextLink href="#" icon={Zap} iconPosition="left">
          Upgrade to Premium
        </TextLink>
      </div>
    </div>
  ),
}

// Different contexts
export const InDifferentContexts: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      {/* In a list */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span>John updated the project timeline</span>
              <TextLink href="#" size="s" variant="subtle">View changes</TextLink>
            </li>
            <li className="flex items-center justify-between">
              <span>New comment on design review</span>
              <TextLink href="#" size="s" variant="subtle">Read comment</TextLink>
            </li>
            <li className="flex items-center justify-between">
              <span>Sarah shared 3 new files</span>
              <TextLink href="#" size="s" variant="subtle">View files</TextLink>
            </li>
            <li className="flex items-center justify-between">
              <span>Weekly report is ready</span>
              <TextLink href="#" size="s" variant="subtle" icon={Download} iconPosition="right">
                Download
              </TextLink>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* In a footer */}
      <Card>
        <CardContent className="p-6">
          <div className="border-t border-[var(--color-border-primary-subtle)] pt-6">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <h5 className="text-body-medium-sm font-medium mb-3">Product</h5>
                <div className="space-y-2">
                  <div><TextLink href="#" size="s" variant="subtle">Features</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Pricing</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Security</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Changelog</TextLink></div>
                </div>
              </div>
              <div>
                <h5 className="text-body-medium-sm font-medium mb-3">Resources</h5>
                <div className="space-y-2">
                  <div><TextLink href="#" size="s" variant="subtle">Documentation</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">API Reference</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Tutorials</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Blog</TextLink></div>
                </div>
              </div>
              <div>
                <h5 className="text-body-medium-sm font-medium mb-3">Support</h5>
                <div className="space-y-2">
                  <div><TextLink href="#" size="s" variant="subtle">Help Center</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Contact Us</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Status Page</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Community</TextLink></div>
                </div>
              </div>
              <div>
                <h5 className="text-body-medium-sm font-medium mb-3">Company</h5>
                <div className="space-y-2">
                  <div><TextLink href="#" size="s" variant="subtle">About</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Careers</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Press</TextLink></div>
                  <div><TextLink href="#" size="s" variant="subtle">Partners</TextLink></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In alerts or notices */}
      <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-info-bold)] rounded-m">
        <div className="flex items-start gap-3">
          <div className="text-[var(--color-text-info-bold)]">ⓘ</div>
          <div className="flex-1">
            <p className="text-body-sm">
              Your subscription will expire in 7 days.{" "}
              <TextLink href="#" size="s">Renew your subscription</TextLink>{" "}
              to continue using all features, or{" "}
              <TextLink href="#" size="s" variant="subtle">learn about our new pricing</TextLink>.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}