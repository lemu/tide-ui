import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Slider } from "../ui/slider";
import { Icon } from "../ui/icon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
} from "../ui/form-field";

export function SliderPreview() {
  const [volume, setVolume] = useState([50]);
  const [brightness, setBrightness] = useState([75]);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [temperature, setTemperature] = useState([22]);
  const [opacity, setOpacity] = useState([80]);
  const [quality, setQuality] = useState([85]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [rating, setRating] = useState([4.2]);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Sliders */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Sliders</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Single Value Slider */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Single Value</CardTitle>
              <CardDescription>
                Basic slider with a single thumb for selecting one value.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <label className="text-body-medium-sm">Volume</label>
                  <Badge variant="secondary" size="small">{volume[0]}%</Badge>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <label className="text-body-medium-sm">Brightness</label>
                  <Badge variant="secondary" size="small">{brightness[0]}%</Badge>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Range Slider */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Range Selection</CardTitle>
              <CardDescription>
                Slider with two thumbs for selecting a range of values.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <label className="text-body-medium-sm">Price Range</label>
                  <Badge variant="secondary" size="small">
                    ${priceRange[0]} - ${priceRange[1]}
                  </Badge>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
                  minStepsBetweenThumbs={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <label className="text-body-medium-sm">Age Range</label>
                  <Badge variant="secondary" size="small">
                    {ageRange[0]} - {ageRange[1]} years
                  </Badge>
                </div>
                <Slider
                  value={ageRange}
                  onValueChange={setAgeRange}
                  min={0}
                  max={100}
                  step={1}
                  minStepsBetweenThumbs={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Slider with Icons */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Sliders with Icons</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Volume Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Volume Control</CardTitle>
              <CardDescription>
                Slider with volume icons to indicate the range.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <Icon 
                  name="volume" 
                  size="sm" 
                  className={volume[0] === 0 ? "text-[var(--color-text-tertiary)]" : "text-[var(--color-text-secondary)]"} 
                />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Icon 
                  name="volume" 
                  size="md" 
                  className={volume[0] === 100 ? "text-[var(--color-text-brand)]" : "text-[var(--color-text-secondary)]"} 
                />
              </div>
              <div className="text-center text-body-sm text-[var(--color-text-secondary)]">
                Volume: {volume[0]}%
              </div>
            </CardContent>
          </Card>

          {/* Temperature Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Temperature</CardTitle>
              <CardDescription>
                Smart thermostat temperature control slider.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-xsm)]">
                  <Icon name="circle" size="sm" color="information" />
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">Cold</span>
                </div>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={10}
                  max={35}
                  step={0.5}
                  className="flex-1"
                />
                <div className="flex items-center gap-[var(--space-xsm)]">
                  <span className="text-caption-sm text-[var(--color-text-secondary)]">Hot</span>
                  <Icon name="circle" size="sm" color="error" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-heading-sm text-[var(--color-text-primary)]">
                  {temperature[0]}°C
                </div>
                <div className="text-caption-sm text-[var(--color-text-secondary)]">
                  Target Temperature
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Different Steps and Ranges */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Steps and Ranges</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Fine Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Fine Control</CardTitle>
              <CardDescription>
                Precise control with small steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Opacity</span>
                  <Badge variant="outline" size="small">{opacity[0]}%</Badge>
                </div>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-caption-sm text-[var(--color-text-tertiary)]">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coarse Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Coarse Control</CardTitle>
              <CardDescription>
                Quick selection with larger steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Quality</span>
                  <Badge variant="outline" size="small">{quality[0]}%</Badge>
                </div>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-caption-sm text-[var(--color-text-tertiary)]">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Decimal Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Decimal Values</CardTitle>
              <CardDescription>
                Slider supporting decimal increments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Rating</span>
                  <div className="flex items-center gap-[var(--space-xsm)]">
                    <Icon name="star" size="sm" color="warning" />
                    <Badge variant="outline" size="small">{rating[0]}</Badge>
                  </div>
                </div>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  min={1}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-caption-sm text-[var(--color-text-tertiary)]">
                  <span>1.0</span>
                  <span>3.0</span>
                  <span>5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Integration</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Budget Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Budget Settings</CardTitle>
              <CardDescription>
                Sliders integrated with form components and validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <FormField>
                <FormLabel>Monthly Budget Range</FormLabel>
                <FormControl>
                  <div className="space-y-[var(--space-md)]">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={50}
                      minStepsBetweenThumbs={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </FormControl>
                <FormHelperText>
                  Select your preferred budget range for monthly expenses
                </FormHelperText>
              </FormField>

              <FormField>
                <FormLabel>Priority Level</FormLabel>
                <FormControl>
                  <div className="space-y-[var(--space-md)]">
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-caption-sm text-[var(--color-text-secondary)]">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </FormControl>
                <FormHelperText>
                  Set the priority level for this task
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Display Settings</CardTitle>
              <CardDescription>
                Multiple sliders for configuring display preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center gap-[var(--space-md)]">
                  <Icon name="circle" size="sm" className="text-[var(--color-text-secondary)]" />
                  <div className="flex-1">
                    <div className="text-body-medium-sm mb-[var(--space-xsm)]">Brightness</div>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <Badge variant="outline" size="small">{brightness[0]}%</Badge>
                </div>

                <div className="flex items-center gap-[var(--space-md)]">
                  <Icon name="eye" size="sm" className="text-[var(--color-text-secondary)]" />
                  <div className="flex-1">
                    <div className="text-body-medium-sm mb-[var(--space-xsm)]">Opacity</div>
                    <Slider
                      value={opacity}
                      onValueChange={setOpacity}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <Badge variant="outline" size="small">{opacity[0]}%</Badge>
                </div>

                <div className="flex items-center gap-[var(--space-md)]">
                  <Icon name="volume" size="sm" className="text-[var(--color-text-secondary)]" />
                  <div className="flex-1">
                    <div className="text-body-medium-sm mb-[var(--space-xsm)]">Volume</div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <Badge variant="outline" size="small">{volume[0]}%</Badge>
                </div>
              </div>

              <Button className="w-full">Apply Settings</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Media Player */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Media Player Controls</CardTitle>
              <CardDescription>
                Audio/video player interface with multiple sliders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="p-[var(--space-lg)] bg-[var(--color-background-neutral-subtle)] rounded-lg space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <div className="text-body-medium-sm">Now Playing</div>
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="play" size="sm" />
                    <span className="text-caption-sm text-[var(--color-text-secondary)]">2:45 / 4:32</span>
                  </div>
                </div>

                <div className="space-y-[var(--space-sm)]">
                  <div className="text-body-sm text-[var(--color-text-secondary)]">Progress</div>
                  <Slider
                    defaultValue={[60]}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-[var(--space-md)]">
                  <Icon name="volume" size="sm" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Badge variant="ghost" size="small">{volume[0]}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Filter Panel</CardTitle>
              <CardDescription>
                E-commerce style filter controls with ranges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Price Range</span>
                  <Badge variant="secondary" size="small">
                    ${priceRange[0]} - ${priceRange[1]}
                  </Badge>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  minStepsBetweenThumbs={10}
                  className="w-full"
                />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Rating</span>
                  <div className="flex items-center gap-[var(--space-xsm)]">
                    <Icon name="star" size="sm" color="warning" />
                    <Badge variant="secondary" size="small">{rating[0]}+</Badge>
                  </div>
                </div>
                <Slider
                  value={rating}
                  onValueChange={setRating}
                  min={1}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm">Discount</span>
                  <Badge variant="secondary" size="small">{opacity[0]}%+</Badge>
                </div>
                <Slider
                  value={opacity}
                  onValueChange={setOpacity}
                  max={90}
                  step={10}
                  className="w-full"
                />
              </div>

              <Button variant="outline" className="w-full">
                <Icon name="rotate-ccw" size="sm" className="mr-[var(--space-sm)]" />
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disabled State */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Disabled State</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled Sliders</CardTitle>
              <CardDescription>
                Sliders in disabled state to show visual feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Volume (Disabled)</span>
                  <Badge variant="outline" size="small">50%</Badge>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  disabled
                  className="w-full"
                />
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <span className="text-body-medium-sm text-[var(--color-text-disabled)]">Range (Disabled)</span>
                  <Badge variant="outline" size="small">25 - 75</Badge>
                </div>
                <Slider
                  defaultValue={[25, 75]}
                  max={100}
                  step={1}
                  disabled
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Loading State</CardTitle>
              <CardDescription>
                Placeholder content while sliders are loading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-24"></div>
                  <div className="h-5 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-12"></div>
                </div>
                <div className="h-5 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-full"></div>
              </div>

              <div className="space-y-[var(--space-md)]">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-20"></div>
                  <div className="h-5 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-16"></div>
                </div>
                <div className="h-5 bg-[var(--color-background-neutral-subtle)] rounded animate-pulse w-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Best Practices</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="check" size="sm" color="success" />
                <span>Good Examples</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Show current value clearly with badges or labels</li>
                <li>• Use appropriate step sizes for the use case</li>
                <li>• Provide visual feedback for different ranges</li>
                <li>• Include min/max indicators when helpful</li>
                <li>• Use icons to clarify the purpose of controls</li>
                <li>• Ensure adequate spacing between range thumbs</li>
                <li>• Test with keyboard navigation and screen readers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
                <Icon name="x" size="sm" color="error" />
                <span>Avoid</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                <li>• Don't use sliders for precise number input</li>
                <li>• Avoid too many steps that make selection difficult</li>
                <li>• Don't hide the current value from users</li>
                <li>• Avoid sliders for binary choices (use toggles)</li>
                <li>• Don't make sliders too small on touch devices</li>
                <li>• Avoid unclear min/max bounds</li>
                <li>• Don't forget to handle loading and error states</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Accessibility Note */}
      <section>
        <Card className="border-[var(--color-border-information)]">
          <CardHeader>
            <CardTitle className="text-heading-sm flex items-center space-x-[var(--space-sm)]">
              <Icon name="info" size="sm" color="information" />
              <span>Accessibility Considerations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-md)] text-body-sm text-[var(--color-text-secondary)]">
              <p>
                <strong>Keyboard Navigation:</strong> Sliders support Arrow keys for fine adjustment, Page Up/Down for larger steps, and Home/End for min/max values.
              </p>
              <p>
                <strong>Screen Readers:</strong> Sliders include proper ARIA attributes and announce current values, ranges, and bounds clearly.
              </p>
              <p>
                <strong>Touch Targets:</strong> Ensure slider thumbs are large enough for comfortable touch interaction (minimum 44px).
              </p>
              <p>
                <strong>Visual Indicators:</strong> Provide clear visual feedback for focus states and value changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}