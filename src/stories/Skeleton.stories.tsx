import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable } from '../components/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'NPM • Fundamental/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="w-[100px] h-[20px] rounded-full" />,
}

export const Card: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const Article: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  ),
}

export const Avatar: Story = {
  render: () => <SkeletonAvatar />,
}

export const Button: Story = {
  render: () => <SkeletonButton />,
}

export const CardSkeleton: Story = {
  render: () => <SkeletonCard />,
}

export const Table: Story = {
  render: () => <SkeletonTable />,
}

export const Profile: Story = {
  render: () => (
    <div className="w-80 border rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-3 w-[80px]" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-[60px]" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-[80px]" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-[70px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
      <div className="flex space-x-2 mt-6">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-16" />
      </div>
    </div>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="border rounded-lg p-4">
        <Skeleton className="h-5 w-24 mb-4" />
        <Skeleton className="h-32 w-full" />
      </div>
      
      {/* List */}
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}