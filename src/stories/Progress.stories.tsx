import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Progress } from '../components/ui/progress'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Icon } from '../components/ui/icon'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label below progress bar',
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

// Default progress
export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Progress value={75} showLabel />
      <Progress value={42} showLabel variant="success" />
      <Progress value={88} showLabel variant="warning" />
      <Progress value={15} showLabel variant="error" />
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <p className="text-body-sm font-medium mb-2">Small</p>
        <Progress value={65} size="sm" showLabel />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-2">Medium (Default)</p>
        <Progress value={65} size="md" showLabel />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-2">Large</p>
        <Progress value={65} size="lg" showLabel />
      </div>
    </div>
  ),
}

// All variants
export const Variants: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Default</p>
        <Progress value={70} variant="default" showLabel />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-2">Success</p>
        <Progress value={85} variant="success" showLabel />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-2">Warning</p>
        <Progress value={60} variant="warning" showLabel />
      </div>
      <div>
        <p className="text-body-sm font-medium mb-2">Error</p>
        <Progress value={25} variant="error" showLabel />
      </div>
    </div>
  ),
}

// Interactive progress
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    const startProgress = () => {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 50)
    }

    return (
      <div className="w-80 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">File Upload Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress 
              value={progress} 
              showLabel 
              formatLabel={(value) => `${Math.round(value)}% completed`}
            />
            <div className="flex gap-2">
              <Button onClick={startProgress} size="sm">
                <Icon name="play" size="sm" className="mr-1" />
                Start Upload
              </Button>
              <Button 
                onClick={() => setProgress(0)} 
                variant="ghost" 
                size="sm"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Custom formatting
export const CustomFormatting: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <p className="text-body-sm font-medium mb-2">Default Formatting</p>
        <Progress value={75} showLabel />
      </div>
      
      <div>
        <p className="text-body-sm font-medium mb-2">Custom Percentage</p>
        <Progress 
          value={85} 
          showLabel 
          formatLabel={(value) => `${value.toFixed(1)}% complete`}
        />
      </div>
      
      <div>
        <p className="text-body-sm font-medium mb-2">File Size Progress</p>
        <Progress 
          value={60} 
          showLabel 
          formatLabel={(value) => `${(value * 2.4).toFixed(1)} MB / 240 MB`}
        />
      </div>
      
      <div>
        <p className="text-body-sm font-medium mb-2">Task Progress</p>
        <Progress 
          value={42} 
          showLabel 
          formatLabel={(value) => `${Math.round(value * 0.12)} / 12 tasks completed`}
        />
      </div>
    </div>
  ),
}

// Dashboard metrics
export const DashboardMetrics: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Project Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">Overall Completion</span>
                <Badge variant="default">On Track</Badge>
              </div>
              <Progress value={78} variant="success" showLabel />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">Budget Used</span>
                <Badge variant="secondary">Under Budget</Badge>
              </div>
              <Progress value={45} showLabel />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">Time Remaining</span>
                <Badge variant="outline">2 weeks left</Badge>
              </div>
              <Progress value={85} variant="warning" showLabel />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-medium">Risk Assessment</span>
                <Badge variant="secondary">Low Risk</Badge>
              </div>
              <Progress value={15} variant="error" showLabel />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

// Multi-step process
export const MultiStepProcess: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2)
    const totalSteps = 5
    const progress = (currentStep / totalSteps) * 100

    const steps = [
      'Account Setup',
      'Profile Information',
      'Preferences',
      'Verification',
      'Complete'
    ]

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Setup Wizard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-body-sm">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} showLabel={false} />
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                {steps[currentStep - 1]}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="ghost"
                size="sm"
              >
                Previous
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                disabled={currentStep === totalSteps}
                size="sm"
                className="flex-1"
              >
                {currentStep === totalSteps ? 'Finish' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Loading states
export const LoadingStates: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      download: 0,
      upload: 0,
      processing: 0,
    })

    const simulateProgress = (key: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({ ...prev, [key]: 0 }))
      const interval = setInterval(() => {
        setLoadingStates(prev => {
          const newValue = prev[key] + Math.random() * 10
          if (newValue >= 100) {
            clearInterval(interval)
            return { ...prev, [key]: 100 }
          }
          return { ...prev, [key]: newValue }
        })
      }, 200)
    }

    return (
      <div className="w-80 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">File Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm">Download</span>
                <Button 
                  onClick={() => simulateProgress('download')}
                  size="sm"
                  variant="ghost"
                >
                  <Icon name="download" size="sm" />
                </Button>
              </div>
              <Progress value={loadingStates.download} variant="default" showLabel />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm">Upload</span>
                <Button 
                  onClick={() => simulateProgress('upload')}
                  size="sm"
                  variant="ghost"
                >
                  <Icon name="upload" size="sm" />
                </Button>
              </div>
              <Progress value={loadingStates.upload} variant="success" showLabel />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-body-sm">Processing</span>
                <Button 
                  onClick={() => simulateProgress('processing')}
                  size="sm"
                  variant="ghost"
                >
                  <Icon name="cpu" size="sm" />
                </Button>
              </div>
              <Progress value={loadingStates.processing} variant="warning" showLabel />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}