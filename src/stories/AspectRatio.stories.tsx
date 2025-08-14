import type { Meta, StoryObj } from '@storybook/react'
import { AspectRatio } from '../components/ui/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'number' },
      description: 'The aspect ratio (width/height)',
    },
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Square: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Landscape: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576075796033-848c2a5a3af2?w=800&dpr=2&q=80"
          alt="Photo by Alex Wolowiecki"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={3 / 4} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?w=800&dpr=2&q=80"
          alt="Photo by Zoshua Colah"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const UltraWide: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={21 / 9} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&dpr=2&q=80"
          alt="Photo by Birmingham Museums Trust"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const VideoPlayer: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="bg-black rounded-md overflow-hidden relative">
        <div className="h-full w-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm opacity-90">Video Player</p>
            <p className="text-xs opacity-70">16:9 Aspect Ratio</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const PhotoGallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
          alt="Photo by Ravi Patel"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80"
          alt="Photo by David Marcu"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80"
          alt="Photo by Alex Litvin"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80"
          alt="Photo by Violette Filippini"
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md border-2 border-dashed border-border flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-12 h-12 bg-muted-foreground/10 rounded-full flex items-center justify-center mb-3 mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm">No image selected</p>
          <p className="text-xs">16:9 ratio</p>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const ResponsiveGallery: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      {[
        { ratio: 4/3, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&dpr=2&q=80", alt: "Mountain landscape" },
        { ratio: 16/9, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&dpr=2&q=80", alt: "Forest path" },
        { ratio: 1/1, src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&dpr=2&q=80", alt: "Portrait" },
        { ratio: 3/2, src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&dpr=2&q=80", alt: "Nature scene" },
        { ratio: 16/9, src: "https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=400&dpr=2&q=80", alt: "City skyline" },
        { ratio: 4/5, src: "https://images.unsplash.com/photo-1494790108755-2616c395c7b8?w=400&dpr=2&q=80", alt: "Ocean view" },
      ].map((item, index) => (
        <AspectRatio key={index} ratio={item.ratio} className="bg-muted rounded-md overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover"
          />
        </AspectRatio>
      ))}
    </div>
  ),
}