import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/fundamental/alert-dialog'
import { Button } from '../components/fundamental/button'

const meta: Meta<typeof AlertDialog> = {
  title: 'NPM • Fundamental/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="primary">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const SimpleConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Save Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save Changes?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Do you want to save the changes you made to this document?
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Don't Save</AlertDialogCancel>
          <AlertDialogAction variant="primary">Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Are you sure you want to logout? You will need to sign in again to access your account.
          </p>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
          <AlertDialogAction variant="primary">Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

export const FileOperations: Story = {
  render: () => (
    <div className="flex space-x-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete File</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogBody>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              Are you sure you want to delete "document.pdf"? This action cannot be undone.
            </p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Replace File</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace Existing File</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogBody>
            <p className="text-body-md text-[var(--color-text-secondary)]">
              A file with this name already exists. Do you want to replace it?
            </p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Both</AlertDialogCancel>
            <AlertDialogAction variant="primary">Replace</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
}

export const LongContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Terms & Conditions</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          <p className="text-body-md text-[var(--color-text-secondary)] mb-4">
            Please review the terms and conditions below:
          </p>
          <div className="-mx-6 max-h-60 overflow-y-auto px-6 text-body-md text-[var(--color-text-secondary)]">
            By using this application, you agree to the following terms:
            <br /><br />
            1. You must be at least 18 years old to use this service.
            <br />
            2. You are responsible for maintaining the confidentiality of your account.
            <br />
            3. We reserve the right to terminate your account at any time.
            <br />
            4. Your data will be handled according to our privacy policy.
            <br />
            5. You agree not to use this service for any illegal activities.
            <br />
            6. We are not liable for any damages resulting from the use of this service.
            <br /><br />
            These terms are subject to change without notice. Continued use of the service constitutes acceptance of any changes.
          </div>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction variant="primary">Accept Terms</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}