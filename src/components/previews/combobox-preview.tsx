import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Combobox, MultiCombobox } from "../ui/combobox";
import { Icon } from "../ui/icon";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "../ui/form-field";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxtjs", label: "Nuxt.js" },
  { value: "gatsby", label: "Gatsby" },
];

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended", disabled: true },
  { value: "archived", label: "Archived" },
];

export function ComboboxPreview() {
  const [framework, setFramework] = useState<string>("");
  const [language, setLanguage] = useState<string>("typescript");
  const [country, setCountry] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(["javascript", "react"]);
  const [preferences, setPreferences] = useState<string[]>([]);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Combobox */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Combobox</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Single Select */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Single Selection</CardTitle>
              <CardDescription>
                Basic combobox with single selection and search functionality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Combobox
                options={frameworks}
                value={framework}
                onValueChange={setFramework}
                placeholder="Select a framework..."
                searchPlaceholder="Search frameworks..."
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected:</strong> {framework || "None"}
              </div>
            </CardContent>
          </Card>

          {/* With Default Value */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Default Value</CardTitle>
              <CardDescription>
                Combobox with a pre-selected default value.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Combobox
                options={languages}
                value={language}
                onValueChange={setLanguage}
                placeholder="Select a language..."
                searchPlaceholder="Search languages..."
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected:</strong> {language || "None"}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Multi-Select Combobox */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Multi-Select Combobox</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Multiple Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Selection</CardTitle>
              <CardDescription>
                Select multiple options with search and filtering.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <MultiCombobox
                options={languages}
                values={skills}
                onValuesChange={setSkills}
                placeholder="Select your skills..."
                searchPlaceholder="Search skills..."
                maxDisplayedItems={2}
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected ({skills.length}):</strong> {skills.length > 0 ? skills.join(", ") : "None"}
              </div>
            </CardContent>
          </Card>

          {/* Empty Multi-Select */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Empty Multi-Select</CardTitle>
              <CardDescription>
                Multi-select combobox starting with no selections.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <MultiCombobox
                options={countries}
                values={preferences}
                onValuesChange={setPreferences}
                placeholder="Select preferred countries..."
                searchPlaceholder="Search countries..."
                maxDisplayedItems={3}
              />
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                <strong>Selected ({preferences.length}):</strong> {preferences.length > 0 ? preferences.join(", ") : "None"}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Combobox States */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Combobox States</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
          {/* Normal State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Normal State</CardTitle>
              <CardDescription>
                Standard combobox with all options enabled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Combobox
                options={countries.slice(0, 5)}
                value={country}
                onValueChange={setCountry}
                placeholder="Select country..."
              />
            </CardContent>
          </Card>

          {/* With Disabled Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled Options</CardTitle>
              <CardDescription>
                Combobox with some options disabled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Combobox
                options={statusOptions}
                value={status}
                onValueChange={setStatus}
                placeholder="Select status..."
              />
            </CardContent>
          </Card>

          {/* Disabled Combobox */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled State</CardTitle>
              <CardDescription>
                Completely disabled combobox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Combobox
                options={frameworks}
                value=""
                onValueChange={() => {}}
                placeholder="Select framework..."
                disabled
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Form Integration</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* With Form Field */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Form Field</CardTitle>
              <CardDescription>
                Combobox integrated with form field components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField>
                <FormLabel>Preferred Framework</FormLabel>
                <FormControl>
                  <Combobox
                    options={frameworks}
                    value={framework}
                    onValueChange={setFramework}
                    placeholder="Choose your framework..."
                    searchPlaceholder="Search frameworks..."
                  />
                </FormControl>
                <FormHelperText>
                  Select the framework you're most comfortable with
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* With Error State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Error State</CardTitle>
              <CardDescription>
                Combobox with validation error styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField>
                <FormLabel>Programming Language</FormLabel>
                <FormControl>
                  <Combobox
                    options={languages}
                    value=""
                    onValueChange={() => {}}
                    placeholder="Select a language..."
                    triggerClassName="border-[var(--color-border-error)] focus:border-[var(--color-border-error)]"
                  />
                </FormControl>
                <FormErrorMessage>Please select a programming language</FormErrorMessage>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Advanced Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Advanced Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Custom Styling */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Custom Styling</CardTitle>
              <CardDescription>
                Combobox with custom width and styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="w-[300px]">
                <Combobox
                  options={frameworks}
                  value={framework}
                  onValueChange={setFramework}
                  placeholder="Choose framework..."
                  className="w-full"
                  triggerClassName="h-[48px]"
                  popoverClassName="w-[300px]"
                />
              </div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                Custom width (300px) and height (48px)
              </div>
            </CardContent>
          </Card>

          {/* With Icons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Rich Options</CardTitle>
              <CardDescription>
                Demonstrating combobox with detailed option display.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="space-y-[var(--space-sm)]">
                <div className="flex items-center gap-[var(--space-sm)]">
                  <Icon name="code" size="sm" className="text-[var(--color-text-brand)]" />
                  <span className="text-body-medium-sm">Development Stack</span>
                </div>
                <MultiCombobox
                  options={[
                    { value: "frontend", label: "Frontend Development" },
                    { value: "backend", label: "Backend Development" },
                    { value: "fullstack", label: "Full-stack Development" },
                    { value: "mobile", label: "Mobile Development" },
                    { value: "devops", label: "DevOps & Infrastructure" },
                    { value: "data", label: "Data Science & Analytics" },
                  ]}
                  values={preferences}
                  onValuesChange={setPreferences}
                  placeholder="Select your expertise areas..."
                  searchPlaceholder="Search expertise areas..."
                  maxDisplayedItems={2}
                />
              </div>
              <div className="text-body-sm text-[var(--color-text-secondary)]">
                Selected areas: {preferences.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Team Member Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Team Assignment</CardTitle>
              <CardDescription>
                Assign team members to a project with multi-select.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
                <Icon name="users" size="sm" className="text-[var(--color-text-brand)]" />
                <span className="text-body-medium-sm">Project Team</span>
              </div>
              <MultiCombobox
                options={[
                  { value: "alice", label: "Alice Johnson (Frontend)" },
                  { value: "bob", label: "Bob Smith (Backend)" },
                  { value: "carol", label: "Carol Davis (Design)" },
                  { value: "david", label: "David Wilson (DevOps)" },
                  { value: "eve", label: "Eve Brown (QA)" },
                  { value: "frank", label: "Frank Miller (PM)" },
                ]}
                values={skills}
                onValuesChange={setSkills}
                placeholder="Assign team members..."
                searchPlaceholder="Search team members..."
                emptyMessage="No team members found."
                maxDisplayedItems={3}
              />
              {skills.length > 0 && (
                <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                  <div className="flex items-center gap-[var(--space-sm)]">
                    <Icon name="check-circle" size="sm" color="success" />
                    <span className="text-body-medium-sm">
                      {skills.length} team member{skills.length !== 1 ? 's' : ''} assigned
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Location Selector</CardTitle>
              <CardDescription>
                Select office location with contextual information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <div className="flex items-center gap-[var(--space-sm)] mb-[var(--space-sm)]">
                <Icon name="map-pin" size="sm" className="text-[var(--color-text-brand)]" />
                <span className="text-body-medium-sm">Office Location</span>
              </div>
              <Combobox
                options={[
                  { value: "hq", label: "Headquarters - New York" },
                  { value: "west", label: "West Coast - San Francisco" },
                  { value: "europe", label: "European Office - London" },
                  { value: "asia", label: "Asia Pacific - Singapore" },
                  { value: "remote", label: "Remote Work" },
                ]}
                value={country}
                onValueChange={setCountry}
                placeholder="Select your work location..."
                searchPlaceholder="Search locations..."
              />
              {country && (
                <div className="p-[var(--space-md)] bg-[var(--color-background-neutral-subtle)] rounded-md">
                  <div className="flex items-start gap-[var(--space-sm)]">
                    <Icon name="info" size="sm" className="mt-[2px] text-[var(--color-text-brand)]" />
                    <div>
                      <div className="text-body-medium-sm">Location Details</div>
                      <div className="text-body-sm text-[var(--color-text-secondary)]">
                        {country === "hq" && "Main headquarters with full amenities"}
                        {country === "west" && "Tech hub with startup atmosphere"}
                        {country === "europe" && "European operations center"}
                        {country === "asia" && "Growing Asia Pacific presence"}
                        {country === "remote" && "Flexible remote work arrangement"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                <li>• Use clear, descriptive placeholder text</li>
                <li>• Provide helpful search placeholders</li>
                <li>• Include empty state messages</li>
                <li>• Limit displayed items in multi-select for readability</li>
                <li>• Disable unavailable options instead of hiding them</li>
                <li>• Use appropriate selection modes for the use case</li>
                <li>• Ensure keyboard navigation works properly</li>
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
                <li>• Don't use vague placeholders like "Select..."</li>
                <li>• Avoid extremely long option lists without grouping</li>
                <li>• Don't use multi-select when single selection is sufficient</li>
                <li>• Avoid unclear or abbreviated option labels</li>
                <li>• Don't forget to handle loading and error states</li>
                <li>• Avoid poor contrast for disabled or selected states</li>
                <li>• Don't neglect accessibility and keyboard support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}