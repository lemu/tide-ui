import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '../components/fundamental/slider'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Label } from '../components/fundamental/label'

const meta: Meta<typeof Slider> = {
  title: 'In Progress/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

// Basic slider
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState([50])

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <Label>Volume: {value[0]}%</Label>
          <Slider
            value={value}
            onValueChange={setValue}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
    )
  },
}

// Range slider (dual thumbs)
export const RangeSlider: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([25, 75])

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>
      </div>
    )
  },
}

// Different steps and ranges
export const DifferentSteps: Story = {
  render: () => {
    const [volume, setVolume] = useState([50])
    const [brightness, setBrightness] = useState([7])
    const [temperature, setTemperature] = useState([22])

    return (
      <div className="w-80 space-y-6">
        <div className="space-y-2">
          <Label>Volume: {volume[0]}%</Label>
          <Slider
            value={volume}
            onValueChange={setVolume}
            min={0}
            max={100}
            step={5}
          />
          <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
            <span>Mute</span>
            <span>Max</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Brightness: {brightness[0]}/10</Label>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            min={1}
            max={10}
            step={1}
          />
          <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
            <span>Dim</span>
            <span>Bright</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Temperature: {temperature[0]}°C</Label>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={16}
            max={30}
            step={0.5}
          />
          <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
            <span>16°C</span>
            <span>30°C</span>
          </div>
        </div>
      </div>
    )
  },
}

// Color picker sliders
export const ColorPicker: Story = {
  render: () => {
    const [red, setRed] = useState([128])
    const [green, setGreen] = useState([128])
    const [blue, setBlue] = useState([128])
    const [alpha, setAlpha] = useState([1])

    const rgbaColor = `rgba(${red[0]}, ${green[0]}, ${blue[0]}, ${alpha[0]})`

    return (
      <div className="w-96 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Picker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div 
                className="w-full h-24 rounded-lg border border-[var(--color-border-primary-subtle)]"
                style={{ backgroundColor: rgbaColor }}
              />
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-500">Red</Label>
                    <span className="text-body-sm font-mono">{red[0]}</span>
                  </div>
                  <Slider
                    value={red}
                    onValueChange={setRed}
                    min={0}
                    max={255}
                    step={1}
                    className="[&_.slider-range]:bg-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-green-500">Green</Label>
                    <span className="text-body-sm font-mono">{green[0]}</span>
                  </div>
                  <Slider
                    value={green}
                    onValueChange={setGreen}
                    min={0}
                    max={255}
                    step={1}
                    className="[&_.slider-range]:bg-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-blue-500">Blue</Label>
                    <span className="text-body-sm font-mono">{blue[0]}</span>
                  </div>
                  <Slider
                    value={blue}
                    onValueChange={setBlue}
                    min={0}
                    max={255}
                    step={1}
                    className="[&_.slider-range]:bg-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Alpha</Label>
                    <span className="text-body-sm font-mono">{alpha[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={alpha}
                    onValueChange={setAlpha}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-primary-subtle)]">
                <div className="space-y-2">
                  <Label>Color Values</Label>
                  <div className="space-y-1 text-body-sm font-mono">
                    <div>RGB: rgb({red[0]}, {green[0]}, {blue[0]})</div>
                    <div>RGBA: {rgbaColor}</div>
                    <div>HEX: #{red[0].toString(16).padStart(2, '0')}{green[0].toString(16).padStart(2, '0')}{blue[0].toString(16).padStart(2, '0')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Media player controls
export const MediaPlayer: Story = {
  render: () => {
    const [volume, setVolume] = useState([75])
    const [progress, setProgress] = useState([35])
    const [playbackSpeed, setPlaybackSpeed] = useState([1])
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const totalDuration = 240 // 4 minutes
    const currentTime = Math.floor((progress[0] / 100) * totalDuration)

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="music" size="sm" />
              Now Playing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-body-lg font-semibold">Song Title</h3>
              <p className="text-body-sm text-[var(--color-text-secondary)]">Artist Name</p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <Slider
                value={progress}
                onValueChange={setProgress}
                min={0}
                max={100}
                step={0.1}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="skip-back" size="sm" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Icon name={isPlaying ? "pause" : "play"} size="md" />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="skip-forward" size="sm" />
              </Button>
            </div>

            {/* Volume control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <Icon 
                      name={isMuted || volume[0] === 0 ? "volume-x" : volume[0] < 50 ? "volume-1" : "volume-2"} 
                      size="sm" 
                    />
                  </Button>
                  Volume
                </Label>
                <span className="text-body-sm">{isMuted ? 0 : volume[0]}%</span>
              </div>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={(value) => {
                  setVolume(value)
                  if (value[0] > 0) setIsMuted(false)
                }}
                min={0}
                max={100}
                step={1}
              />
            </div>

            {/* Playback speed */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Playback Speed</Label>
                <span className="text-body-sm">{playbackSpeed[0]}x</span>
              </div>
              <Slider
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                min={0.25}
                max={2}
                step={0.25}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>0.25x</span>
                <span>1x</span>
                <span>2x</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Settings panel with multiple sliders
export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      brightness: [80],
      volume: [65],
      contrast: [50],
      saturation: [60],
      sensitivity: [75],
      quality: [8],
    })

    const updateSetting = (key: string, value: number[]) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    }

    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Display & Audio Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">Display</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Brightness</Label>
                  <span className="text-body-sm">{settings.brightness[0]}%</span>
                </div>
                <Slider
                  value={settings.brightness}
                  onValueChange={(value) => updateSetting('brightness', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Contrast</Label>
                  <span className="text-body-sm">{settings.contrast[0]}%</span>
                </div>
                <Slider
                  value={settings.contrast}
                  onValueChange={(value) => updateSetting('contrast', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Saturation</Label>
                  <span className="text-body-sm">{settings.saturation[0]}%</span>
                </div>
                <Slider
                  value={settings.saturation}
                  onValueChange={(value) => updateSetting('saturation', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">Audio</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Master Volume</Label>
                  <span className="text-body-sm">{settings.volume[0]}%</span>
                </div>
                <Slider
                  value={settings.volume}
                  onValueChange={(value) => updateSetting('volume', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Microphone Sensitivity</Label>
                  <span className="text-body-sm">{settings.sensitivity[0]}%</span>
                </div>
                <Slider
                  value={settings.sensitivity}
                  onValueChange={(value) => updateSetting('sensitivity', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-body-medium-md font-medium">Performance</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Quality Level</Label>
                  <Badge appearance="outline">{
                    settings.quality[0] <= 3 ? 'Low' :
                    settings.quality[0] <= 6 ? 'Medium' :
                    settings.quality[0] <= 8 ? 'High' : 'Ultra'
                  }</Badge>
                </div>
                <Slider
                  value={settings.quality}
                  onValueChange={(value) => updateSetting('quality', value)}
                  min={1}
                  max={10}
                  step={1}
                />
                <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Ultra</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border-primary-subtle)]">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSettings({
                      brightness: [100],
                      volume: [100],
                      contrast: [50],
                      saturation: [50],
                      sensitivity: [75],
                      quality: [10],
                    })
                  }}
                >
                  Reset to Defaults
                </Button>
                <Button size="sm">Apply Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledSlider: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false)
    const [value, setValue] = useState([30])

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="rounded"
          />
          <Label>Enable slider</Label>
        </div>
        
        <div className="space-y-2">
          <Label className={enabled ? '' : 'text-[var(--color-text-disabled)]'}>
            Value: {value[0]}%
          </Label>
          <Slider
            value={value}
            onValueChange={setValue}
            min={0}
            max={100}
            step={1}
            disabled={!enabled}
          />
        </div>
      </div>
    )
  },
}

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      budget: [5000],
      duration: [30],
      teamSize: [5],
      priority: [7],
    })

    const updateField = (field: string, value: number[]) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
      console.log('Form submitted:', formData)
    }

    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Project Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Project Budget: ${formData.budget[0].toLocaleString()}</Label>
              <Slider
                value={formData.budget}
                onValueChange={(value) => updateField('budget', value)}
                min={1000}
                max={50000}
                step={500}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>$1K</span>
                <span>$25K</span>
                <span>$50K</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration: {formData.duration[0]} days</Label>
              <Slider
                value={formData.duration}
                onValueChange={(value) => updateField('duration', value)}
                min={7}
                max={365}
                step={7}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>1 week</span>
                <span>6 months</span>
                <span>1 year</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Team Size: {formData.teamSize[0]} {formData.teamSize[0] === 1 ? 'person' : 'people'}</Label>
              <Slider
                value={formData.teamSize}
                onValueChange={(value) => updateField('teamSize', value)}
                min={1}
                max={20}
                step={1}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>Solo</span>
                <span>Small team</span>
                <span>Large team</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority Level: {formData.priority[0]}/10</Label>
              <Slider
                value={formData.priority}
                onValueChange={(value) => updateField('priority', value)}
                min={1}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Critical</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border-primary-subtle)]">
              <div className="space-y-3">
                <div className="text-body-sm">
                  <strong>Project Summary:</strong>
                </div>
                <div className="text-body-sm text-[var(--color-text-secondary)] space-y-1">
                  <div>Budget: ${formData.budget[0].toLocaleString()}</div>
                  <div>Duration: {formData.duration[0]} days ({Math.round(formData.duration[0] / 7)} weeks)</div>
                  <div>Team: {formData.teamSize[0]} {formData.teamSize[0] === 1 ? 'person' : 'people'}</div>
                  <div>Priority: {
                    formData.priority[0] <= 3 ? 'Low' :
                    formData.priority[0] <= 6 ? 'Medium' :
                    formData.priority[0] <= 8 ? 'High' : 'Critical'
                  }</div>
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  Create Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}