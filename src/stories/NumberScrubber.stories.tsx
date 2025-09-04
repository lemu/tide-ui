import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NumberScrubber } from '../components/ui/number-scrubber'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const meta: Meta<typeof NumberScrubber> = {
  title: 'In Progress/NumberScrubber',
  component: NumberScrubber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Current numeric value',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment when dragging',
    },
    sensitivity: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: 'Drag sensitivity (higher = more sensitive)',
    },
    precision: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of decimal places to display',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof NumberScrubber>

export default meta
type Story = StoryObj<typeof meta>

// Default number scrubber
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Drag to adjust value</Label>
          <NumberScrubber
            value={value}
            onChange={setValue}
            className="w-full"
          />
        </div>
        <p className="text-body-sm text-[var(--color-text-secondary)]">
          Current value: {value}
        </p>
        <p className="text-caption-sm text-[var(--color-text-tertiary)]">
          Click and drag horizontally to change the value, or click to type directly.
        </p>
      </div>
    )
  },
}

// With constraints
export const WithConstraints: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Volume (0-100)</Label>
          <NumberScrubber
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-sm">Value: {value}</span>
          <Badge variant={value > 80 ? "destructive" : value > 50 ? "warning" : "success"}>
            {value > 80 ? "High" : value > 50 ? "Medium" : "Low"}
          </Badge>
        </div>
      </div>
    )
  },
}

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(10)
    const [medium, setMedium] = useState(50)
    const [large, setLarge] = useState(100)
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label className="mb-2 block">Small</Label>
          <NumberScrubber
            value={small}
            onChange={setSmall}
            size="sm"
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Medium (Default)</Label>
          <NumberScrubber
            value={medium}
            onChange={setMedium}
            size="md"
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Large</Label>
          <NumberScrubber
            value={large}
            onChange={setLarge}
            size="lg"
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

// Different variants
export const Variants: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState(25)
    const [ghostValue, setGhostValue] = useState(75)
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label className="mb-2 block">Default Variant</Label>
          <NumberScrubber
            value={defaultValue}
            onChange={setDefaultValue}
            variant="default"
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Ghost Variant</Label>
          <NumberScrubber
            value={ghostValue}
            onChange={setGhostValue}
            variant="ghost"
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

// Precision and formatting
export const PrecisionAndFormatting: Story = {
  render: () => {
    const [percentage, setPercentage] = useState(0.85)
    const [currency, setCurrency] = useState(19.99)
    const [temperature, setTemperature] = useState(23.5)
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label className="mb-2 block">Percentage (0-1, 2 decimal places)</Label>
          <NumberScrubber
            value={percentage}
            onChange={setPercentage}
            min={0}
            max={1}
            step={0.01}
            precision={2}
            sensitivity={0.5}
            formatValue={(value) => `${(value * 100).toFixed(0)}%`}
            parseValue={(value) => parseFloat(value.replace('%', '')) / 100}
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Currency (with custom formatting)</Label>
          <NumberScrubber
            value={currency}
            onChange={setCurrency}
            min={0}
            step={0.01}
            precision={2}
            formatValue={(value) => `$${value.toFixed(2)}`}
            parseValue={(value) => parseFloat(value.replace('$', ''))}
            className="w-full"
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Temperature (°C)</Label>
          <NumberScrubber
            value={temperature}
            onChange={setTemperature}
            min={-50}
            max={50}
            step={0.5}
            precision={1}
            formatValue={(value) => `${value.toFixed(1)}°C`}
            parseValue={(value) => parseFloat(value.replace('°C', ''))}
            className="w-full"
          />
        </div>
      </div>
    )
  },
}

// Sensitivity comparison
export const SensitivityComparison: Story = {
  render: () => {
    const [lowSens, setLowSens] = useState(50)
    const [mediumSens, setMediumSens] = useState(50)
    const [highSens, setHighSens] = useState(50)
    
    return (
      <div className="w-80 space-y-6">
        <div>
          <Label className="mb-2 block">Low Sensitivity (0.2x)</Label>
          <NumberScrubber
            value={lowSens}
            onChange={setLowSens}
            sensitivity={0.2}
            className="w-full"
          />
          <p className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
            Requires more drag distance to change values
          </p>
        </div>
        
        <div>
          <Label className="mb-2 block">Normal Sensitivity (1x)</Label>
          <NumberScrubber
            value={mediumSens}
            onChange={setMediumSens}
            sensitivity={1}
            className="w-full"
          />
          <p className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
            Default sensitivity
          </p>
        </div>
        
        <div>
          <Label className="mb-2 block">High Sensitivity (3x)</Label>
          <NumberScrubber
            value={highSens}
            onChange={setHighSens}
            sensitivity={3}
            className="w-full"
          />
          <p className="text-caption-sm text-[var(--color-text-secondary)] mt-1">
            Small movements create large value changes
          </p>
        </div>
      </div>
    )
  },
}

// Video editing style controls
export const VideoEditingControls: Story = {
  render: () => {
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)
    const [saturation, setSaturation] = useState(0)
    const [exposure, setExposure] = useState(0)
    
    const resetAll = () => {
      setBrightness(0)
      setContrast(0)
      setSaturation(0)
      setExposure(0)
    }
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Video Color Correction</CardTitle>
              <Button variant="ghost" size="sm" onClick={resetAll}>
                Reset All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 block">Brightness</Label>
              <NumberScrubber
                value={brightness}
                onChange={setBrightness}
                min={-100}
                max={100}
                step={1}
                sensitivity={1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Contrast</Label>
              <NumberScrubber
                value={contrast}
                onChange={setContrast}
                min={-100}
                max={100}
                step={1}
                sensitivity={1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Saturation</Label>
              <NumberScrubber
                value={saturation}
                onChange={setSaturation}
                min={-100}
                max={100}
                step={1}
                sensitivity={1}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Exposure</Label>
              <NumberScrubber
                value={exposure}
                onChange={setExposure}
                min={-3}
                max={3}
                step={0.1}
                precision={1}
                sensitivity={0.5}
                className="w-full"
              />
            </div>
            
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-caption-sm">
                <div>
                  <span className="text-[var(--color-text-secondary)]">Brightness:</span> {brightness}
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Contrast:</span> {contrast}
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Saturation:</span> {saturation}
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)]">Exposure:</span> {exposure.toFixed(1)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Animation timeline
export const AnimationTimeline: Story = {
  render: () => {
    const [duration, setDuration] = useState(2000)
    const [delay, setDelay] = useState(0)
    const [iterations, setIterations] = useState(1)
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Animation Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-2 block">Duration (ms)</Label>
              <NumberScrubber
                value={duration}
                onChange={setDuration}
                min={0}
                max={10000}
                step={100}
                sensitivity={2}
                formatValue={(value) => `${value}ms`}
                parseValue={(value) => parseInt(value.replace('ms', ''))}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Delay (ms)</Label>
              <NumberScrubber
                value={delay}
                onChange={setDelay}
                min={0}
                max={5000}
                step={50}
                sensitivity={1.5}
                formatValue={(value) => `${value}ms`}
                parseValue={(value) => parseInt(value.replace('ms', ''))}
                className="w-full"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Iterations</Label>
              <NumberScrubber
                value={iterations}
                onChange={setIterations}
                min={1}
                max={10}
                step={1}
                formatValue={(value) => value === 10 ? 'infinite' : value.toString()}
                parseValue={(value) => value === 'infinite' ? 10 : parseInt(value)}
                className="w-full"
              />
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-body-sm text-[var(--color-text-secondary)]">
                CSS: <code className="text-caption-sm font-mono bg-[var(--color-background-neutral-subtle)] px-1 rounded">
                  animation: slide {duration / 1000}s ease-in-out {delay / 1000}s {iterations === 10 ? 'infinite' : iterations}
                </code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [value, setValue] = useState(42)
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Disabled Number Scrubber</Label>
          <NumberScrubber
            value={value}
            onChange={setValue}
            disabled={true}
            className="w-full"
          />
        </div>
        <p className="text-caption-sm text-[var(--color-text-secondary)]">
          The number scrubber is disabled and cannot be interacted with.
        </p>
      </div>
    )
  },
}

// With scrub callbacks
export const WithScrubCallbacks: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    const [isScrubbing, setIsScrubbing] = useState(false)
    const [scrubCount, setScrubCount] = useState(0)
    
    const handleScrubStart = () => {
      setIsScrubbing(true)
      setScrubCount(prev => prev + 1)
    }
    
    const handleScrubEnd = () => {
      setIsScrubbing(false)
    }
    
    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Number Scrubber with Callbacks</Label>
          <NumberScrubber
            value={value}
            onChange={setValue}
            onScrubStart={handleScrubStart}
            onScrubEnd={handleScrubEnd}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={isScrubbing ? "default" : "secondary"}>
              {isScrubbing ? "Scrubbing" : "Idle"}
            </Badge>
            <span className="text-body-sm">Current value: {value}</span>
          </div>
          
          <p className="text-caption-sm text-[var(--color-text-secondary)]">
            Scrub sessions: {scrubCount}
          </p>
        </div>
      </div>
    )
  },
}