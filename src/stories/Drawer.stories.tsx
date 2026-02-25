import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../components/fundamental/drawer'
import { Button } from '../components/fundamental/button'
import { Label } from '../components/fundamental/label'
import { Input } from '../components/fundamental/input'

const meta: Meta<typeof Drawer> = {
  title: 'NPM • Fundamental/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer component that slides up from the bottom of the screen.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-[var(--space-l)]">
          <p className="text-body-sm text-[var(--color-text-secondary)]">
            Drawer content goes here. This component is built using Vaul and provides
            a mobile-friendly bottom sheet experience.
          </p>
        </div>
        <DrawerFooter>
          <Button variant="primary">Submit</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const WithForm: Story = {
  render: () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="default">Open Form</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-[var(--space-l)] space-y-[var(--space-m)]">
            <div className="space-y-[var(--space-s)]">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-[var(--space-s)]">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button variant="primary">Save changes</Button>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

export const Nested: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="default">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Parent Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer contains another drawer inside it.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-[var(--space-l)] space-y-[var(--space-m)]">
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              You can nest drawers to create multi-level navigation experiences.
            </p>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="default">Open Nested Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nested Drawer</DrawerTitle>
                  <DrawerDescription>
                    This is a nested drawer component.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-[var(--space-l)]">
                  <p className="text-body-sm text-[var(--color-text-secondary)]">
                    Content of the nested drawer.
                  </p>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="ghost">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

export const WithScrollContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms and Conditions</DrawerTitle>
          <DrawerDescription>
            Please read and accept our terms and conditions.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-[var(--space-l)] max-h-[400px] overflow-y-auto">
          <div className="space-y-[var(--space-m)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
        </div>
        <DrawerFooter>
          <Button variant="primary">Accept</Button>
          <DrawerClose asChild>
            <Button variant="ghost">Decline</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
