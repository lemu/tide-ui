import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Icon } from "../ui/icon";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "../ui/form-field";

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false);
  const [indeterminateChecked, setIndeterminateChecked] = useState<
    boolean | "indeterminate"
  >("indeterminate");
  const [multipleSelection, setMultipleSelection] = useState({
    option1: false,
    option2: true,
    option3: false,
  });

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Complete Form Fields */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Complete Form Fields
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Form Field with Helper Text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                With Helper Text
              </CardTitle>
              <CardDescription>
                Complete form field structure with label and helper text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormControl>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox id="helper-example" />
                    <FormLabel htmlFor="helper-example" className="mb-0">
                      I agree to the terms and conditions
                    </FormLabel>
                  </div>
                </FormControl>
                <FormHelperText>
                  Please read our terms and conditions before proceeding
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* Form Field with Error */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                With Error State
              </CardTitle>
              <CardDescription>
                Form field with error state and error message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormControl>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox id="error-example" variant="error" />
                    <FormLabel htmlFor="error-example" className="mb-0">
                      Subscribe to newsletter
                    </FormLabel>
                  </div>
                </FormControl>
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basic Checkboxes */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Basic Checkboxes
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Basic Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Basic Checkbox</CardTitle>
              <CardDescription>
                Standard checkbox component (16px fixed size).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="basic-example" />
                  <label htmlFor="basic-example" className="text-body-md cursor-pointer">
                    Basic checkbox example
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="basic-checked" defaultChecked />
                  <label htmlFor="basic-checked" className="text-body-md cursor-pointer">
                    Pre-checked checkbox
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Checkbox States</CardTitle>
              <CardDescription>
                Different states showing checked, unchecked, and indeterminate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="state-unchecked" />
                  <label htmlFor="state-unchecked" className="text-body-md cursor-pointer">
                    Unchecked
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="state-checked" defaultChecked />
                  <label htmlFor="state-checked" className="text-body-md cursor-pointer">
                    Checked
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox
                    id="state-indeterminate"
                    checked={indeterminateChecked}
                    onCheckedChange={setIndeterminateChecked}
                  />
                  <label htmlFor="state-indeterminate" className="text-body-md cursor-pointer">
                    Indeterminate
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Interactive Examples
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Controlled Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Controlled Checkbox
              </CardTitle>
              <CardDescription>
                Checkbox with controlled state and onChange handler.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormControl>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox
                      id="controlled-example"
                      checked={checked}
                      onCheckedChange={(checked) => setChecked(checked as boolean)}
                    />
                    <FormLabel htmlFor="controlled-example" className="mb-0">
                      Enable notifications
                    </FormLabel>
                  </div>
                </FormControl>
                <FormHelperText>
                  Toggle to receive push notifications on your device
                </FormHelperText>
              </FormField>
              <p className="text-body-sm text-[var(--color-text-secondary)] mt-[var(--space-md)]">
                Status: {checked ? "Enabled" : "Disabled"}
              </p>
            </CardContent>
          </Card>

          {/* Multiple Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Multiple Selection
              </CardTitle>
              <CardDescription>
                Multiple checkboxes with independent state management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="space-y-[var(--space-sm)]">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox
                      id="multi-option1"
                      checked={multipleSelection.option1}
                      onCheckedChange={(checked) =>
                        setMultipleSelection((prev) => ({
                          ...prev,
                          option1: checked as boolean,
                        }))
                      }
                    />
                    <label htmlFor="multi-option1" className="text-body-md cursor-pointer">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox
                      id="multi-option2"
                      checked={multipleSelection.option2}
                      onCheckedChange={(checked) =>
                        setMultipleSelection((prev) => ({
                          ...prev,
                          option2: checked as boolean,
                        }))
                      }
                    />
                    <label htmlFor="multi-option2" className="text-body-md cursor-pointer">
                      SMS notifications
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <Checkbox
                      id="multi-option3"
                      checked={multipleSelection.option3}
                      onCheckedChange={(checked) =>
                        setMultipleSelection((prev) => ({
                          ...prev,
                          option3: checked as boolean,
                        }))
                      }
                    />
                    <label htmlFor="multi-option3" className="text-body-md cursor-pointer">
                      Push notifications
                    </label>
                  </div>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Selected:{" "}
                  {Object.values(multipleSelection).filter(Boolean).length} of 3
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checkbox Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Checkbox Variants
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Default Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default Variant</CardTitle>
              <CardDescription>
                Standard checkbox appearance for normal use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="default-unchecked" variant="default" />
                  <label htmlFor="default-unchecked" className="text-body-md cursor-pointer">
                    Unchecked default
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox
                    id="default-checked"
                    variant="default"
                    defaultChecked
                  />
                  <label htmlFor="default-checked" className="text-body-md cursor-pointer">
                    Checked default
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox
                    id="default-indeterminate"
                    variant="default"
                    checked="indeterminate"
                  />
                  <label
                    htmlFor="default-indeterminate"
                    className="text-body-md cursor-pointer"
                  >
                    Indeterminate default
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Error Variant</CardTitle>
              <CardDescription>
                Error state styling for validation feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="error-unchecked" variant="error" />
                  <label htmlFor="error-unchecked" className="text-body-md cursor-pointer">
                    Unchecked error
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="error-checked" variant="error" defaultChecked />
                  <label htmlFor="error-checked" className="text-body-md cursor-pointer">
                    Checked error
                  </label>
                </div>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox
                    id="error-indeterminate"
                    variant="error"
                    checked="indeterminate"
                  />
                  <label htmlFor="error-indeterminate" className="text-body-md cursor-pointer">
                    Indeterminate error
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Disabled States
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">
              Disabled Checkboxes
            </CardTitle>
            <CardDescription>
              Disabled checkboxes with reduced opacity and no interaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Unchecked</h4>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="disabled-unchecked" disabled />
                  <label
                    htmlFor="disabled-unchecked"
                    className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                  >
                    Disabled unchecked
                  </label>
                </div>
              </div>
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Checked</h4>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox id="disabled-checked" disabled defaultChecked />
                  <label
                    htmlFor="disabled-checked"
                    className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                  >
                    Disabled checked
                  </label>
                </div>
              </div>
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Indeterminate</h4>
                <div className="flex items-center space-x-[var(--space-sm)]">
                  <Checkbox
                    id="disabled-indeterminate"
                    disabled
                    checked="indeterminate"
                  />
                  <label
                    htmlFor="disabled-indeterminate"
                    className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                  >
                    Disabled indeterminate
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Integration Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Form Integration Examples
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Settings Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Settings Form</CardTitle>
              <CardDescription>
                Example settings form using checkbox components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <div className="space-y-[var(--space-md)]">
                  <h4 className="text-body-medium-md">Privacy Settings</h4>
                  <div className="space-y-[var(--space-lg)]">
                    <FormField isCheckboxField>
                      <FormControl>
                        <div className="flex items-center space-x-[var(--space-sm)]">
                          <Checkbox id="setting-profile" defaultChecked />
                          <FormLabel htmlFor="setting-profile" className="mb-0">
                            Make profile public
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormHelperText>
                        Your profile will be visible to other users
                      </FormHelperText>
                    </FormField>
                    
                    <FormField isCheckboxField>
                      <FormControl>
                        <div className="flex items-center space-x-[var(--space-sm)]">
                          <Checkbox id="setting-analytics" />
                          <FormLabel htmlFor="setting-analytics" className="mb-0">
                            Allow analytics tracking
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormHelperText>
                        Help us improve by sharing anonymous usage data
                      </FormHelperText>
                    </FormField>
                    
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <Checkbox id="setting-marketing" />
                      <label htmlFor="setting-marketing" className="text-body-md cursor-pointer">
                        Receive marketing emails
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preferences Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">
                Preferences Form
              </CardTitle>
              <CardDescription>
                User preferences with different checkbox sizes and states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <div className="space-y-[var(--space-md)]">
                  <h4 className="text-body-medium-md">
                    Notification Preferences
                  </h4>
                  <div className="space-y-[var(--space-sm)]">
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <Checkbox id="pref-email" defaultChecked />
                      <label htmlFor="pref-email" className="text-body-sm cursor-pointer">
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <Checkbox id="pref-browser" defaultChecked />
                      <label htmlFor="pref-browser" className="text-body-sm cursor-pointer">
                        Browser notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <Checkbox id="pref-mobile" />
                      <label htmlFor="pref-mobile" className="text-body-sm cursor-pointer">
                        Mobile push notifications
                      </label>
                    </div>
                  </div>
                </div>
              </form>
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Always pair checkboxes with clear, clickable labels</li>
                <li>• Use appropriate spacing between checkbox and label</li>
                <li>• Include helper text for complex or unclear options</li>
                <li>
                  • Use indeterminate state for parent/child relationships
                </li>
                <li>• Provide immediate feedback for state changes</li>
                <li>• Use consistent sizing within related groups</li>
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
              <ul className="text-body-sm space-y-[var(--space-sm)] text-[var(--color-text-secondary)]">
                <li>• Don't use checkboxes for mutually exclusive options</li>
                <li>• Avoid unclear or ambiguous checkbox labels</li>
                <li>• Don't mix different checkbox sizes inconsistently</li>
                <li>• Avoid using checkboxes without proper labels</li>
                <li>• Don't disable checkboxes without explanation</li>
                <li>• Avoid long lists without grouping or organization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
