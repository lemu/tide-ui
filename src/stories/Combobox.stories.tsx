import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Combobox, MultiCombobox } from '../components/ui/combobox'
import { Button } from '../components/ui/button'
import { Icon } from '../components/ui/icon'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'

const meta: Meta<typeof Combobox> = {
  title: 'In Progress/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

// Basic single select combobox
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')
    
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date' },
      { value: 'elderberry', label: 'Elderberry' },
    ]

    return (
      <div className="w-80 space-y-4">
        <div>
          <Label>Selected: {value || 'None'}</Label>
        </div>
        <Combobox
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Select a fruit..."
          searchPlaceholder="Search fruits..."
        />
      </div>
    )
  },
}

// Team member selection
export const TeamMemberSelection: Story = {
  render: () => {
    const [selectedMember, setSelectedMember] = useState<string>('')
    const [assignedTasks, setAssignedTasks] = useState<string[]>([])

    const teamMembers = [
      { value: 'john-doe', label: 'John Doe', disabled: false },
      { value: 'jane-smith', label: 'Jane Smith', disabled: false },
      { value: 'mike-johnson', label: 'Mike Johnson', disabled: true },
      { value: 'sarah-williams', label: 'Sarah Williams', disabled: false },
      { value: 'david-brown', label: 'David Brown', disabled: false },
      { value: 'lisa-davis', label: 'Lisa Davis', disabled: false },
      { value: 'chris-taylor', label: 'Chris Taylor', disabled: false },
      { value: 'amy-wilson', label: 'Amy Wilson', disabled: true },
    ]

    const tasks = [
      'Design wireframes',
      'Implement authentication',
      'Write documentation',
      'Review pull requests',
      'Deploy to staging',
    ]

    const getMemberInfo = (memberId: string) => {
      const member = teamMembers.find(m => m.value === memberId)
      return member ? member.label : 'Unknown'
    }

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Assign Project Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Assign to Team Member
              </Label>
              <Combobox
                options={teamMembers}
                value={selectedMember}
                onValueChange={setSelectedMember}
                placeholder="Select team member..."
                searchPlaceholder="Search team members..."
                emptyMessage="No team members found"
                className="w-full"
              />
              {teamMembers.some(m => m.disabled) && (
                <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
                  Some members are currently unavailable
                </p>
              )}
            </div>

            {selectedMember && (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
                  <h4 className="text-body-sm font-medium mb-2">Selected Assignee:</h4>
                  <div className="flex items-center gap-2">
                    <Icon name="user" size="sm" />
                    <span className="text-body-sm">{getMemberInfo(selectedMember)}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-body-medium-sm font-medium mb-3 block">
                    Available Tasks
                  </Label>
                  <div className="space-y-2">
                    {tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-[var(--color-border-primary-subtle)] rounded-md">
                        <span className="text-body-sm">{task}</span>
                        <Button
                          size="sm"
                          variant={assignedTasks.includes(task) ? 'default' : 'ghost'}
                          onClick={() => {
                            if (assignedTasks.includes(task)) {
                              setAssignedTasks(assignedTasks.filter(t => t !== task))
                            } else {
                              setAssignedTasks([...assignedTasks, task])
                            }
                          }}
                        >
                          {assignedTasks.includes(task) ? 'Assigned' : 'Assign'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {assignedTasks.length > 0 && (
                  <div className="p-4 bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] rounded-md">
                    <h4 className="text-body-sm font-medium mb-2">Tasks Assigned to {getMemberInfo(selectedMember)}:</h4>
                    <div className="flex flex-wrap gap-1">
                      {assignedTasks.map((task, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Multi-select tag management
export const TagManagement: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['react', 'typescript'])
    const [articleTitle, setArticleTitle] = useState('Building Modern Web Applications')

    const availableTags = [
      { value: 'react', label: 'React' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'nextjs', label: 'Next.js' },
      { value: 'tailwind', label: 'Tailwind CSS' },
      { value: 'graphql', label: 'GraphQL' },
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'postgresql', label: 'PostgreSQL' },
      { value: 'docker', label: 'Docker' },
      { value: 'aws', label: 'AWS' },
      { value: 'testing', label: 'Testing' },
      { value: 'performance', label: 'Performance' },
      { value: 'accessibility', label: 'Accessibility' },
      { value: 'security', label: 'Security' },
    ]

    const getTagStats = () => {
      const stats = {
        'react': 1250,
        'typescript': 890,
        'javascript': 2100,
        'nodejs': 780,
        'nextjs': 560,
        'tailwind': 420,
        'graphql': 340,
        'mongodb': 680,
        'postgresql': 520,
        'docker': 920,
        'aws': 1100,
        'testing': 380,
        'performance': 290,
        'accessibility': 180,
        'security': 640,
      }
      return stats
    }

    const tagStats = getTagStats()

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Article Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Article Title
              </Label>
              <input
                type="text"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                className="w-full p-3 border border-[var(--color-border-input)] rounded-md text-body-md"
                placeholder="Enter article title..."
              />
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Tags ({selectedTags.length} selected)
              </Label>
              <MultiCombobox
                options={availableTags}
                values={selectedTags}
                onValuesChange={setSelectedTags}
                placeholder="Add tags..."
                searchPlaceholder="Search available tags..."
                emptyMessage="No tags found"
                maxDisplayedItems={3}
                className="w-full"
              />
              <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
                Tags help categorize and improve discoverability of your content
              </p>
            </div>

            {selectedTags.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
                  <h4 className="text-body-sm font-medium mb-3">Selected Tags & Stats:</h4>
                  <div className="space-y-2">
                    {selectedTags.map((tagValue) => {
                      const tag = availableTags.find(t => t.value === tagValue)
                      const count = tagStats[tagValue as keyof typeof tagStats] || 0
                      return (
                        <div key={tagValue} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {tag?.label}
                            </Badge>
                          </div>
                          <span className="text-caption-sm text-[var(--color-text-secondary)]">
                            {count.toLocaleString()} articles
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-4 bg-[var(--color-background-success-subtle)] border border-[var(--color-border-success)] rounded-md">
                  <h4 className="text-body-sm font-medium mb-2">Article Preview:</h4>
                  <div className="space-y-2">
                    <h3 className="text-body-md font-medium">{articleTitle}</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedTags.map((tagValue) => {
                        const tag = availableTags.find(t => t.value === tagValue)
                        return (
                          <Badge key={tagValue} variant="secondary" className="text-xs">
                            #{tag?.label.toLowerCase().replace(/\s+/g, '')}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1">Publish Article</Button>
              <Button variant="ghost" onClick={() => setSelectedTags([])}>
                Clear Tags
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Location selection with countries and cities
export const LocationSelection: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')

    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'au', label: 'Australia' },
      { value: 'br', label: 'Brazil' },
    ]

    const cities = {
      us: [
        { value: 'nyc', label: 'New York City' },
        { value: 'la', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'phoenix', label: 'Phoenix' },
      ],
      ca: [
        { value: 'toronto', label: 'Toronto' },
        { value: 'vancouver', label: 'Vancouver' },
        { value: 'montreal', label: 'Montreal' },
        { value: 'calgary', label: 'Calgary' },
      ],
      uk: [
        { value: 'london', label: 'London' },
        { value: 'manchester', label: 'Manchester' },
        { value: 'birmingham', label: 'Birmingham' },
        { value: 'liverpool', label: 'Liverpool' },
      ],
      de: [
        { value: 'berlin', label: 'Berlin' },
        { value: 'munich', label: 'Munich' },
        { value: 'hamburg', label: 'Hamburg' },
        { value: 'cologne', label: 'Cologne' },
      ],
    }

    const getCityOptions = () => {
      if (!selectedCountry) return []
      return cities[selectedCountry as keyof typeof cities] || []
    }

    const getLocationInfo = () => {
      const country = countries.find(c => c.value === selectedCountry)
      const cityOptions = getCityOptions()
      const city = cityOptions.find(c => c.value === selectedCity)
      
      return {
        country: country?.label || '',
        city: city?.label || '',
      }
    }

    const locationInfo = getLocationInfo()

    return (
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Job Location Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Country
              </Label>
              <Combobox
                options={countries}
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value)
                  setSelectedCity('') // Reset city when country changes
                }}
                placeholder="Select country..."
                searchPlaceholder="Search countries..."
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                City
              </Label>
              <Combobox
                options={getCityOptions()}
                value={selectedCity}
                onValueChange={setSelectedCity}
                placeholder={selectedCountry ? "Select city..." : "Select country first"}
                searchPlaceholder="Search cities..."
                disabled={!selectedCountry}
                className="w-full"
              />
              {!selectedCountry && (
                <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
                  Please select a country first
                </p>
              )}
            </div>

            {selectedCountry && (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
                  <h4 className="text-body-sm font-medium mb-2">Selected Location:</h4>
                  <div className="flex items-center gap-2">
                    <Icon name="map-pin" size="sm" />
                    <span className="text-body-sm">
                      {selectedCity ? `${locationInfo.city}, ${locationInfo.country}` : locationInfo.country}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-body-medium-sm font-medium">Job Preferences:</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-body-sm">Remote work available</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-body-sm">Hybrid work arrangement</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-body-sm">Relocation assistance</span>
                    </label>
                  </div>
                </div>

                <Button className="w-full">
                  Save Location Preferences
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Skill filtering for job search
export const SkillFiltering: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>(['react', 'javascript'])
    const [experienceLevel, setExperienceLevel] = useState<string>('mid')
    const [jobResults, setJobResults] = useState(0)

    const skillOptions = [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'csharp', label: 'C#' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'php', label: 'PHP' },
      { value: 'sql', label: 'SQL' },
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'postgresql', label: 'PostgreSQL' },
      { value: 'docker', label: 'Docker' },
      { value: 'kubernetes', label: 'Kubernetes' },
      { value: 'aws', label: 'AWS' },
      { value: 'azure', label: 'Azure' },
      { value: 'gcp', label: 'Google Cloud' },
    ]

    const experienceLevels = [
      { value: 'junior', label: 'Junior (0-2 years)' },
      { value: 'mid', label: 'Mid-level (2-5 years)' },
      { value: 'senior', label: 'Senior (5+ years)' },
      { value: 'lead', label: 'Lead/Principal (8+ years)' },
    ]

    // Simulate job count based on selected skills
    const calculateJobResults = () => {
      const baseCount = 150
      const skillMultiplier = selectedSkills.length * 25
      const experienceMultiplier = {
        junior: 1.2,
        mid: 1.0,
        senior: 0.8,
        lead: 0.6,
      }[experienceLevel] || 1.0
      
      return Math.floor((baseCount + skillMultiplier) * experienceMultiplier)
    }

    // Update job results when filters change
    const updateResults = () => {
      const newResults = calculateJobResults()
      setJobResults(newResults)
    }

    // Update results when dependencies change
    React.useEffect(() => {
      updateResults()
    }, [selectedSkills, experienceLevel])

    const getSkillDemand = (skill: string) => {
      const demandMap = {
        javascript: 'High',
        typescript: 'High',
        react: 'Very High',
        vue: 'Medium',
        angular: 'Medium',
        nodejs: 'High',
        python: 'Very High',
        java: 'High',
        csharp: 'Medium',
        go: 'Medium',
        rust: 'Low',
        php: 'Medium',
      }
      return demandMap[skill as keyof typeof demandMap] || 'Medium'
    }

    return (
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Job Search Filters
              <Badge variant="outline">{jobResults} jobs found</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Required Skills ({selectedSkills.length} selected)
              </Label>
              <MultiCombobox
                options={skillOptions}
                values={selectedSkills}
                onValuesChange={setSelectedSkills}
                placeholder="Add required skills..."
                searchPlaceholder="Search programming languages, frameworks..."
                emptyMessage="No skills found"
                maxDisplayedItems={4}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Experience Level
              </Label>
              <Combobox
                options={experienceLevels}
                value={experienceLevel}
                onValueChange={setExperienceLevel}
                placeholder="Select experience level..."
                className="w-full"
              />
            </div>

            {selectedSkills.length > 0 && (
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
                  <h4 className="text-body-sm font-medium mb-3">Skill Demand Analysis:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSkills.slice(0, 6).map((skillValue) => {
                      const skill = skillOptions.find(s => s.value === skillValue)
                      const demand = getSkillDemand(skillValue)
                      return (
                        <div key={skillValue} className="flex items-center justify-between">
                          <span className="text-body-sm">{skill?.label}</span>
                          <Badge 
                            variant={demand === 'Very High' ? 'default' : demand === 'High' ? 'secondary' : 'outline'} 
                            className="text-xs"
                          >
                            {demand}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                  {selectedSkills.length > 6 && (
                    <p className="text-caption-sm text-[var(--color-text-secondary)] mt-2">
                      +{selectedSkills.length - 6} more skills selected
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                        {jobResults}
                      </div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">
                        Total Jobs
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                        {Math.floor(jobResults * 0.3)}
                      </div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">
                        Remote Available
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-heading-md font-semibold text-[var(--color-text-primary)]">
                        ${Math.floor(80 + selectedSkills.length * 5)}k
                      </div>
                      <div className="text-caption-sm text-[var(--color-text-secondary)]">
                        Avg. Salary
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={updateResults}>
                    <Icon name="search" size="sm" className="mr-2" />
                    Search Jobs
                  </Button>
                  <Button variant="ghost" onClick={() => setSelectedSkills([])}>
                    Clear Skills
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      category: '',
      tags: [] as string[],
      priority: 'medium',
      assignee: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const categories = [
      { value: 'bug', label: '🐛 Bug Report' },
      { value: 'feature', label: '✨ Feature Request' },
      { value: 'improvement', label: '🔧 Improvement' },
      { value: 'question', label: '❓ Question' },
      { value: 'documentation', label: '📝 Documentation' },
    ]

    const tagOptions = [
      { value: 'urgent', label: 'Urgent' },
      { value: 'backend', label: 'Backend' },
      { value: 'frontend', label: 'Frontend' },
      { value: 'ui', label: 'UI/UX' },
      { value: 'performance', label: 'Performance' },
      { value: 'security', label: 'Security' },
      { value: 'testing', label: 'Testing' },
      { value: 'deployment', label: 'Deployment' },
    ]

    const priorities = [
      { value: 'low', label: 'Low Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'high', label: 'High Priority' },
      { value: 'critical', label: 'Critical' },
    ]

    const assignees = [
      { value: 'john', label: 'John Doe' },
      { value: 'jane', label: 'Jane Smith' },
      { value: 'mike', label: 'Mike Johnson' },
      { value: 'sarah', label: 'Sarah Williams' },
    ]

    const validateForm = () => {
      const newErrors: Record<string, string> = {}
      
      if (!formData.category) {
        newErrors.category = 'Category is required'
      }
      if (!formData.assignee) {
        newErrors.assignee = 'Assignee is required'
      }
      if (formData.tags.length === 0) {
        newErrors.tags = 'At least one tag is required'
      }
      
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (validateForm()) {
        alert('Form submitted successfully!')
      }
    }

    const updateFormData = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }))
      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }))
      }
    }

    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Category *
              </Label>
              <Combobox
                options={categories}
                value={formData.category}
                onValueChange={(value) => updateFormData('category', value)}
                placeholder="Select ticket category..."
                searchPlaceholder="Search categories..."
                className="w-full"
              />
              {errors.category && (
                <p className="text-caption-sm text-[var(--color-text-error)] mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Tags * ({formData.tags.length} selected)
              </Label>
              <MultiCombobox
                options={tagOptions}
                values={formData.tags}
                onValuesChange={(values) => updateFormData('tags', values)}
                placeholder="Add relevant tags..."
                searchPlaceholder="Search tags..."
                className="w-full"
              />
              {errors.tags && (
                <p className="text-caption-sm text-[var(--color-text-error)] mt-1">
                  {errors.tags}
                </p>
              )}
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Priority
              </Label>
              <Combobox
                options={priorities}
                value={formData.priority}
                onValueChange={(value) => updateFormData('priority', value)}
                placeholder="Select priority level..."
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Assignee *
              </Label>
              <Combobox
                options={assignees}
                value={formData.assignee}
                onValueChange={(value) => updateFormData('assignee', value)}
                placeholder="Assign to team member..."
                searchPlaceholder="Search team members..."
                className="w-full"
              />
              {errors.assignee && (
                <p className="text-caption-sm text-[var(--color-text-error)] mt-1">
                  {errors.assignee}
                </p>
              )}
            </div>

            <div>
              <Label className="text-body-medium-sm font-medium mb-3 block">
                Description
              </Label>
              <textarea
                className="w-full p-3 border border-[var(--color-border-input)] rounded-md resize-none"
                rows={4}
                placeholder="Describe the issue or request in detail..."
              />
            </div>

            {Object.values(formData).some(v => Array.isArray(v) ? v.length > 0 : v) && (
              <div className="p-4 bg-[var(--color-background-information-subtle)] border border-[var(--color-border-information)] rounded-md">
                <h4 className="text-body-sm font-medium mb-3">Ticket Preview:</h4>
                <div className="space-y-2 text-body-sm">
                  {formData.category && (
                    <div>
                      <span className="font-medium">Category: </span>
                      {categories.find(c => c.value === formData.category)?.label}
                    </div>
                  )}
                  {formData.tags.length > 0 && (
                    <div>
                      <span className="font-medium">Tags: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.map((tagValue) => {
                          const tag = tagOptions.find(t => t.value === tagValue)
                          return (
                            <Badge key={tagValue} variant="outline" className="text-xs">
                              {tag?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {formData.priority && (
                    <div>
                      <span className="font-medium">Priority: </span>
                      {priorities.find(p => p.value === formData.priority)?.label}
                    </div>
                  )}
                  {formData.assignee && (
                    <div>
                      <span className="font-medium">Assignee: </span>
                      {assignees.find(a => a.value === formData.assignee)?.label}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSubmit}>
                Create Ticket
              </Button>
              <Button variant="ghost" onClick={() => setFormData({ category: '', tags: [], priority: 'medium', assignee: '' })}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}