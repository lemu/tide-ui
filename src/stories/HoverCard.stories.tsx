import type { Meta, StoryObj } from '@storybook/react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../components/fundamental/hover-card'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/fundamental/avatar'

const meta: Meta<typeof HoverCard> = {
  title: 'NPM • Fundamental/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

// Basic hover card
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>NJ</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <Icon name="calendar" className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

// User profile hover card
export const UserProfile: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body-md">
        Hover over any username to see their profile:{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">@johndoe</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-body-md font-semibold">John Doe</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Senior Developer</p>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs">Pro</Badge>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">Online</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Full-stack developer with 8+ years of experience building scalable web applications. 
                Passionate about clean code and user experience.
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">127</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">2.1k</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">89</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Following</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-caption-sm text-[var(--color-text-secondary)]">
                <Icon name="map-pin" size="sm" />
                <span>San Francisco, CA</span>
                <span>•</span>
                <Icon name="calendar" size="sm" />
                <span>Joined March 2020</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="user-plus" size="sm" className="mr-2" />
                  Follow
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  <Icon name="message-circle" size="sm" className="mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">@janesmith</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b787?w=48&h=48&fit=crop&crop=face" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-body-md font-semibold">Jane Smith</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Product Designer</p>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs">Designer</Badge>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">Away</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Product designer focused on creating intuitive and accessible user experiences. 
                Love working at the intersection of design and technology.
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">43</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Designs</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">892</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Likes</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">156</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Following</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-caption-sm text-[var(--color-text-secondary)]">
                <Icon name="map-pin" size="sm" />
                <span>New York, NY</span>
                <span>•</span>
                <Icon name="calendar" size="sm" />
                <span>Joined June 2021</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="user-plus" size="sm" className="mr-2" />
                  Follow
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  <Icon name="message-circle" size="sm" className="mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", and "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">@mikejohnson</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-body-md font-semibold">Mike Johnson</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">DevOps Engineer</p>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs">DevOps</Badge>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">Offline</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                DevOps engineer specializing in cloud infrastructure and automation. 
                Passionate about building reliable and scalable systems.
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">67</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Deployments</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">99.9%</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Uptime</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">234</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Scripts</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-caption-sm text-[var(--color-text-secondary)]">
                <Icon name="map-pin" size="sm" />
                <span>Austin, TX</span>
                <span>•</span>
                <Icon name="calendar" size="sm" />
                <span>Joined January 2019</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="user-plus" size="sm" className="mr-2" />
                  Follow
                </Button>
                <Button size="sm" variant="ghost" className="flex-1">
                  <Icon name="message-circle" size="sm" className="mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </div>
  ),
}

// Link preview hover card
export const LinkPreview: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body-md">
        Check out these amazing resources:{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">React Documentation</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-96">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[var(--color-background-info-subtle)] rounded-lg flex items-center justify-center">
                  <Icon name="book-open" size="md" className="text-[var(--color-text-on-action)]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold">React Documentation</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">react.dev</p>
                  <p className="text-body-sm mt-2">
                    The library for web and native user interfaces. Learn React with our comprehensive documentation, 
                    interactive tutorials, and examples.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-caption-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <Icon name="eye" size="sm" />
                  <span>2.3M views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="star" size="sm" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="clock" size="sm" />
                  <span>Updated daily</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="external-link" size="sm" className="mr-2" />
                  Visit Site
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="bookmark" size="sm" className="mr-2" />
                  Save
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">Next.js Guide</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-96">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[var(--color-background-success-subtle)] rounded-lg flex items-center justify-center">
                  <Icon name="zap" size="md" className="text-[var(--color-text-on-action)]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold">Next.js by Vercel</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">nextjs.org</p>
                  <p className="text-body-sm mt-2">
                    The React Framework for the Web. Used by some of the world's largest companies, 
                    Next.js enables you to create high-quality web applications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-caption-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <Icon name="download" size="sm" />
                  <span>5M+ downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="github" size="sm" />
                  <span>115k stars</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="users" size="sm" />
                  <span>Active community</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="external-link" size="sm" className="mr-2" />
                  Get Started
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="github" size="sm" className="mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", and "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">Tailwind CSS</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-96">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[var(--color-background-blue-bold)] rounded-lg flex items-center justify-center">
                  <Icon name="palette" size="md" className="text-[var(--color-text-on-action)]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold">Tailwind CSS</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">tailwindcss.com</p>
                  <p className="text-body-sm mt-2">
                    A utility-first CSS framework packed with classes that can be composed to build any design, 
                    directly in your markup.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-caption-sm text-[var(--color-text-secondary)]">
                <div className="flex items-center gap-1">
                  <Icon name="package" size="sm" />
                  <span>4M+ weekly downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="heart" size="sm" />
                  <span>Loved by developers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="trending-up" size="sm" />
                  <span>Growing fast</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="external-link" size="sm" className="mr-2" />
                  Documentation
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="play" size="sm" className="mr-2" />
                  Playground
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </div>
  ),
}

// Product hover card
export const ProductCard: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body-md">
        Featured products:{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">MacBook Pro</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=60&fit=crop" 
                  alt="MacBook Pro"
                  className="w-20 h-15 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold">MacBook Pro 14-inch</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Apple M2 Pro chip</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon key={i} name="star" size="sm" className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-body-sm text-[var(--color-text-secondary)]">(127 reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency to the next level. 
                Whether you're at the studio or on the go.
              </p>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-sm font-semibold">16GB</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Memory</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">512GB</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Storage</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">M2 Pro</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Chip</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">$1,999</span>
                  <span className="text-body-sm text-[var(--color-text-secondary)] line-through ml-2">$2,199</span>
                </div>
                <Badge className="bg-[var(--color-background-success-subtle)]">9% off</Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="shopping-cart" size="sm" className="mr-2" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="heart" size="sm" className="mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto">iPhone 15 Pro</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=80&h=60&fit=crop" 
                  alt="iPhone 15 Pro"
                  className="w-20 h-15 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold">iPhone 15 Pro</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Titanium design</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon key={i} name="star" size="sm" className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-body-sm text-[var(--color-text-secondary)]">(89 reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                iPhone 15 Pro. Forged in titanium and featuring the groundbreaking A17 Pro chip, 
                a customizable Action Button, and the most versatile camera system.
              </p>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-sm font-semibold">6.1"</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Display</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">128GB</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Storage</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">A17 Pro</div>
                  <div className="text-caption-sm text-[var(--color-text-secondary)]">Chip</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold">$999</span>
                </div>
                <Badge>New</Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Icon name="shopping-cart" size="sm" className="mr-2" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="heart" size="sm" className="mr-2" />
                  Wishlist
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </div>
  ),
}

// File info hover card
export const FileInfo: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body-md">
        Project files:{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto font-mono">README.md</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--color-background-info-subtle)] rounded-lg flex items-center justify-center">
                  <Icon name="file-text" size="sm" className="text-[var(--color-text-on-action)]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold font-mono">README.md</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">Markdown file</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[var(--color-text-secondary)]">Size:</span>
                  <span className="ml-1 font-medium">2.4 KB</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Lines:</span>
                  <span className="ml-1 font-medium">67</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Modified:</span>
                  <span className="ml-1 font-medium">2 hours ago</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Author:</span>
                  <span className="ml-1 font-medium">John Doe</span>
                </div>
              </div>
              
              <div className="border-t border-[var(--color-border-primary-subtle)] pt-3">
                <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Preview:</p>
                <div className="bg-[var(--color-background-neutral-subtlest)] p-3 rounded text-caption-sm font-mono">
                  # Project Name<br/>
                  <br/>
                  A brief description of the project...<br/>
                  <br/>
                  ## Installation<br/>
                  <br/>
                  ```bash<br/>
                  npm install<br/>
                  ```
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        {", "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto font-mono">package.json</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[var(--color-background-success-subtle)] rounded-lg flex items-center justify-center">
                  <Icon name="package" size="sm" className="text-[var(--color-text-on-action)]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-body-md font-semibold font-mono">package.json</h4>
                  <p className="text-body-sm text-[var(--color-text-secondary)]">NPM package configuration</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[var(--color-text-secondary)]">Size:</span>
                  <span className="ml-1 font-medium">1.8 KB</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Dependencies:</span>
                  <span className="ml-1 font-medium">23</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Version:</span>
                  <span className="ml-1 font-medium">1.2.3</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Node:</span>
                  <span className="ml-1 font-medium">&gt;=18.0.0</span>
                </div>
              </div>
              
              <div className="border-t border-[var(--color-border-primary-subtle)] pt-3">
                <p className="text-caption-sm text-[var(--color-text-secondary)] mb-2">Scripts:</p>
                <div className="space-y-1 text-caption-sm font-mono">
                  <div>npm run dev</div>
                  <div>npm run build</div>
                  <div>npm run test</div>
                  <div>npm run lint</div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        .
      </p>
    </div>
  ),
}