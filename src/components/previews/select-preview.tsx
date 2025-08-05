import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Icon } from "../ui/icon";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "../ui/form-field";

export function SelectPreview() {
  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedCountry, setSelectedCountry] = useState("");

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Size Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Size Variants</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Medium Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Medium Size</CardTitle>
              <CardDescription>
                Default medium-sized select component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <Select>
                  <SelectTrigger size="medium" className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Large Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Large Size</CardTitle>
              <CardDescription>
                Larger select component for prominent form elements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <Select>
                  <SelectTrigger size="large" className="w-full">
                    <SelectValue placeholder="Select a vegetable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Vegetables</SelectLabel>
                      <SelectItem value="carrot">Carrot</SelectItem>
                      <SelectItem value="broccoli">Broccoli</SelectItem>
                      <SelectItem value="spinach">Spinach</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* State Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">State Variants</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Default State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default State</CardTitle>
              <CardDescription>
                Normal select with default styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger variant="default" className="w-full">
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Error State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Error State</CardTitle>
              <CardDescription>
                Select with error styling for validation feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger variant="error" className="w-full">
                  <SelectValue placeholder="Required field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valid1">Valid Option 1</SelectItem>
                  <SelectItem value="valid2">Valid Option 2</SelectItem>
                  <SelectItem value="valid3">Valid Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Disabled State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled State</CardTitle>
              <CardDescription>
                Disabled select that cannot be interacted with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select disabled>
                <SelectTrigger className="w-full" disabled>
                  <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled1">Disabled Option</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Integration</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Form Field with Helper Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Helper Text</CardTitle>
              <CardDescription>
                Select integrated with form field structure and helper text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField>
                <FormLabel>Theme Preference</FormLabel>
                <FormControl>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Appearance</SelectLabel>
                        <SelectItem value="light">Light theme</SelectItem>
                        <SelectItem value="dark">Dark theme</SelectItem>
                        <SelectItem value="system">System preference</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormHelperText>
                  Choose your preferred color scheme for the interface
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* Form Field with Error */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Error Message</CardTitle>
              <CardDescription>
                Select with validation error state and error message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger variant="error" className="w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormErrorMessage>Please select your country</FormErrorMessage>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Advanced Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Grouped Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Grouped Options</CardTitle>
              <CardDescription>
                Select with grouped options and separators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="carrot">Carrot</SelectItem>
                    <SelectItem value="broccoli">Broccoli</SelectItem>
                    <SelectItem value="spinach">Spinach</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Proteins</SelectLabel>
                    <SelectItem value="chicken">Chicken</SelectItem>
                    <SelectItem value="beef">Beef</SelectItem>
                    <SelectItem value="tofu">Tofu</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Controlled Component */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Controlled Component</CardTitle>
              <CardDescription>
                Select with controlled state and change handler.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <Select value={selectedFruit} onValueChange={setSelectedFruit}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                      <SelectItem value="strawberry">Strawberry</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Selected: {selectedFruit || "None"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Long List Example */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Long List Example</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">Scrollable Options</CardTitle>
            <CardDescription>
              Select with many options demonstrating scrolling behavior.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a programming language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Popular Languages</SelectLabel>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="kotlin">Kotlin</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="scala">Scala</SelectItem>
                    <SelectItem value="dart">Dart</SelectItem>
                    <SelectItem value="elixir">Elixir</SelectItem>
                    <SelectItem value="haskell">Haskell</SelectItem>
                    <SelectItem value="clojure">Clojure</SelectItem>
                    <SelectItem value="r">R</SelectItem>
                    <SelectItem value="matlab">MATLAB</SelectItem>
                    <SelectItem value="lua">Lua</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
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
                <li>• Use clear, descriptive placeholder text</li>
                <li>• Group related options with labels and separators</li>
                <li>• Provide helper text for complex selections</li>
                <li>• Use appropriate sizing for the context</li>
                <li>• Include search functionality for long lists</li>
                <li>• Show validation errors clearly</li>
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
                <li>• Don't use vague placeholder text like "Select..."</li>
                <li>• Avoid extremely long option lists without grouping</li>
                <li>• Don't mix different types of options in one select</li>
                <li>• Avoid unclear or ambiguous option labels</li>
                <li>• Don't use selects for binary choices (use toggle instead)</li>
                <li>• Avoid disabled options without clear explanation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}