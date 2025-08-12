import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export function AspectRatioPreview() {
  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Header */}
      <div>
        <h1 className="text-heading-lg mb-[var(--space-sm)]">Aspect Ratio</h1>
        <p className="text-body-md text-[var(--color-text-secondary)]">
          Displays content within a desired ratio, useful for images, videos, and responsive layouts
        </p>
      </div>

      {/* Common Aspect Ratios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Common Aspect Ratios</CardTitle>
          <CardDescription>
            Standard aspect ratios for different use cases and media types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-3">
            
            {/* 16:9 - Video */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">16:9 (Video/Widescreen)</h3>
              <div className="w-full">
                <AspectRatio ratio={16 / 9}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="play-circle" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">16:9 Video</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* 4:3 - Classic */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">4:3 (Classic TV)</h3>
              <div className="w-full">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="tv" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">4:3 Classic</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* 1:1 - Square */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">1:1 (Square/Profile)</h3>
              <div className="w-full">
                <AspectRatio ratio={1 / 1}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="user" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">1:1 Square</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* 21:9 - Ultra-wide */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">21:9 (Ultra-wide)</h3>
              <div className="w-full">
                <AspectRatio ratio={21 / 9}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="monitor" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">21:9 Ultra-wide</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* 3:2 - Photography */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">3:2 (Photography)</h3>
              <div className="w-full">
                <AspectRatio ratio={3 / 2}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="camera" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">3:2 Photo</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>

            {/* 9:16 - Portrait/Mobile */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">9:16 (Portrait/Mobile)</h3>
              <div className="w-full">
                <AspectRatio ratio={9 / 16}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)]">
                    <div className="text-center">
                      <Icon name="smartphone" size="lg" className="mx-auto mb-[var(--space-sm)] text-[var(--color-text-secondary)]" />
                      <p className="text-body-sm text-[var(--color-text-secondary)]">9:16 Portrait</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Image Examples</CardTitle>
          <CardDescription>
            Using aspect ratio to display images with consistent proportions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            
            {/* Landscape Image */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">Landscape Image (16:9)</h3>
              <AspectRatio ratio={16 / 9}>
                <img
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
                  className="h-full w-full rounded-lg object-cover"
                />
              </AspectRatio>
            </div>

            {/* Portrait Image */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">Portrait Image (3:4)</h3>
              <AspectRatio ratio={3 / 4}>
                <img
                  src="https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=400&dpr=2&q=80"
                  alt="Photo by Vlad Hilitanu"
                  className="h-full w-full rounded-lg object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Placeholder Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Video Placeholder Examples</CardTitle>
          <CardDescription>
            Common video aspect ratios with placeholder content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            
            {/* YouTube Style */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">YouTube Style (16:9)</h3>
              <AspectRatio ratio={16 / 9}>
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-background-brand)] to-[var(--color-background-brand-hovered)] text-[var(--color-text-on-action)]">
                  <div className="text-center">
                    <Icon name="play" size="xl" className="mx-auto mb-[var(--space-md)]" />
                    <p className="text-body-lg font-semibold">Play Video</p>
                    <p className="text-body-sm opacity-90">Click to start playback</p>
                  </div>
                </div>
              </AspectRatio>
            </div>

            {/* TikTok Style */}
            <div className="space-y-[var(--space-sm)]">
              <h3 className="text-body-medium-md">TikTok Style (9:16)</h3>
              <div className="max-w-[200px]">
                <AspectRatio ratio={9 / 16}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-t from-purple-600 to-pink-600 text-white">
                    <div className="text-center">
                      <Icon name="music" size="lg" className="mx-auto mb-[var(--space-sm)]" />
                      <p className="text-body-sm font-semibold">Short Video</p>
                      <p className="text-caption-sm opacity-90">Vertical format</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Responsive Grid Layout</CardTitle>
          <CardDescription>
            Using aspect ratio to create consistent grid layouts that adapt to different screen sizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-[var(--space-md)] md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-[var(--space-sm)]">
                <AspectRatio ratio={1}>
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[var(--color-background-neutral-subtle)] border border-[var(--color-border-primary-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] transition-colors">
                    <div className="text-center">
                      <Icon name="image" size="md" className="mx-auto mb-[var(--space-xsm)] text-[var(--color-text-secondary)]" />
                      <p className="text-caption-sm text-[var(--color-text-secondary)]">Item {i + 1}</p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-heading-sm">Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Common Use Cases</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Image galleries and thumbnails</li>
                <li>• Video players and embeds</li>
                <li>• Card layouts with consistent proportions</li>
                <li>• Social media content placeholders</li>
                <li>• Profile pictures and avatars</li>
                <li>• Product images in e-commerce</li>
                <li>• Hero sections and banners</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body-medium-md mb-[var(--space-sm)]">Best Practices</h4>
              <ul className="space-y-[var(--space-xsm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Use object-cover for images to maintain aspect ratio</li>
                <li>• Consider content hierarchy when choosing ratios</li>
                <li>• Test across different screen sizes</li>
                <li>• Use consistent ratios within the same context</li>
                <li>• Provide fallback content for loading states</li>
                <li>• Consider accessibility with proper alt text</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card className="border-[var(--color-border-information)]">
        <CardHeader>
          <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
            <Icon name="info" size="sm" color="information" />
            <span>Technical Implementation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
            <p>
              <strong>Radix UI Primitive:</strong> Built on @radix-ui/react-aspect-ratio for reliable cross-browser support.
            </p>
            <p>
              <strong>CSS Implementation:</strong> Uses CSS aspect-ratio property with fallback support for older browsers.
            </p>
            <p>
              <strong>Responsive Design:</strong> Maintains aspect ratio while allowing flexible width for responsive layouts.
            </p>
            <p>
              <strong>Usage:</strong> Simply wrap your content with AspectRatio and specify the desired ratio as a decimal (e.g., 16/9 = 1.777...).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}