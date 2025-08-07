import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Icon } from "../ui/icon";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "../ui/form-field";

export function RadioGroupPreview() {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [notificationValue, setNotificationValue] = useState("email");
  const [paymentValue, setPaymentValue] = useState("");

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
              <CardTitle className="text-heading-sm">With Helper Text</CardTitle>
              <CardDescription>
                Complete form field structure with radio group and helper text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormLabel>Notification Preferences</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={notificationValue}
                    onValueChange={setNotificationValue}
                  >
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="email" id="notification-email" />
                      <FormLabel htmlFor="notification-email" className="mb-0">
                        Email notifications
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="sms" id="notification-sms" />
                      <FormLabel htmlFor="notification-sms" className="mb-0">
                        SMS notifications
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="none" id="notification-none" />
                      <FormLabel htmlFor="notification-none" className="mb-0">
                        No notifications
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormHelperText>
                  Choose how you'd like to receive notifications
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>

          {/* Form Field with Error */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">With Error State</CardTitle>
              <CardDescription>
                Form field with error state and error message.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={paymentValue}
                    onValueChange={setPaymentValue}
                  >
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="card" id="payment-card" variant="error" />
                      <FormLabel htmlFor="payment-card" className="mb-0">
                        Credit Card
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="paypal" id="payment-paypal" variant="error" />
                      <FormLabel htmlFor="payment-paypal" className="mb-0">
                        PayPal
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="bank" id="payment-bank" variant="error" />
                      <FormLabel htmlFor="payment-bank" className="mb-0">
                        Bank Transfer
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormErrorMessage>Please select a payment method</FormErrorMessage>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basic Radio Groups */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Basic Radio Groups
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Basic Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Basic Radio Group</CardTitle>
              <CardDescription>
                Standard radio group component (16px fixed size).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="option1" id="basic-option1" />
                    <label htmlFor="basic-option1" className="text-body-md cursor-pointer">
                      Option 1
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="option2" id="basic-option2" />
                    <label htmlFor="basic-option2" className="text-body-md cursor-pointer">
                      Option 2
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="option3" id="basic-option3" />
                    <label htmlFor="basic-option3" className="text-body-md cursor-pointer">
                      Option 3
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Radio Group States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Radio Group States</CardTitle>
              <CardDescription>
                Different states showing checked and unchecked options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <RadioGroup defaultValue="checked">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="unchecked" id="state-unchecked" />
                    <label htmlFor="state-unchecked" className="text-body-md cursor-pointer">
                      Unchecked
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="checked" id="state-checked" />
                    <label htmlFor="state-checked" className="text-body-md cursor-pointer">
                      Checked
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="disabled" id="state-disabled" disabled />
                    <label htmlFor="state-disabled" className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed">
                      Disabled
                    </label>
                  </div>
                </RadioGroup>
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
          {/* Controlled Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Controlled Radio Group</CardTitle>
              <CardDescription>
                Radio group with controlled state and onChange handler.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormLabel>Theme Preference</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={selectedValue}
                    onValueChange={setSelectedValue}
                  >
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="option1" id="controlled-option1" />
                      <FormLabel htmlFor="controlled-option1" className="mb-0">
                        Light theme
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="option2" id="controlled-option2" />
                      <FormLabel htmlFor="controlled-option2" className="mb-0">
                        Dark theme
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="option3" id="controlled-option3" />
                      <FormLabel htmlFor="controlled-option3" className="mb-0">
                        System preference
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormHelperText>
                  Choose your preferred color scheme
                </FormHelperText>
              </FormField>
              <p className="text-body-sm text-[var(--color-text-secondary)] mt-[var(--space-md)]">
                Selected: {selectedValue === "option1" ? "Light theme" : selectedValue === "option2" ? "Dark theme" : "System preference"}
              </p>
            </CardContent>
          </Card>

          {/* Orientation Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Horizontal Layout</CardTitle>
              <CardDescription>
                Radio group with horizontal orientation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField isCheckboxField>
                <FormLabel>Size Preference</FormLabel>
                <FormControl>
                  <RadioGroup defaultValue="medium" className="flex space-x-[var(--space-lg)]">
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="small" id="size-small" />
                      <FormLabel htmlFor="size-small" className="mb-0">
                        Small
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="medium" id="size-medium" />
                      <FormLabel htmlFor="size-medium" className="mb-0">
                        Medium
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-[var(--space-sm)]">
                      <RadioGroupItem value="large" id="size-large" />
                      <FormLabel htmlFor="size-large" className="mb-0">
                        Large
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormHelperText>
                  Select your preferred size
                </FormHelperText>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Radio Group Variants */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Radio Group Variants
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Default Variant */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default Variant</CardTitle>
              <CardDescription>
                Standard radio group appearance for normal use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <RadioGroup defaultValue="default-option2">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="default-option1" id="default-option1" variant="default" />
                    <label htmlFor="default-option1" className="text-body-md cursor-pointer">
                      Unchecked default
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="default-option2" id="default-option2" variant="default" />
                    <label htmlFor="default-option2" className="text-body-md cursor-pointer">
                      Checked default
                    </label>
                  </div>
                </RadioGroup>
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
                <FormField isCheckboxField>
                  <FormLabel>Required Selection</FormLabel>
                  <FormControl>
                    <RadioGroup>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="error-option1" id="error-option1" variant="error" />
                        <FormLabel htmlFor="error-option1" className="mb-0">
                          Option 1
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="error-option2" id="error-option2" variant="error" />
                        <FormLabel htmlFor="error-option2" className="mb-0">
                          Option 2
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormErrorMessage>Please select an option</FormErrorMessage>
                </FormField>
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
            <CardTitle className="text-heading-sm">Disabled Radio Groups</CardTitle>
            <CardDescription>
              Disabled radio groups with reduced opacity and no interaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-3">
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Unchecked Disabled</h4>
                <RadioGroup>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="disabled-unchecked" id="disabled-unchecked" disabled />
                    <label
                      htmlFor="disabled-unchecked"
                      className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                    >
                      Disabled option
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Checked Disabled</h4>
                <RadioGroup defaultValue="disabled-checked">
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="disabled-checked" id="disabled-checked" disabled />
                    <label
                      htmlFor="disabled-checked"
                      className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                    >
                      Disabled checked
                    </label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-[var(--space-md)]">
                <h4 className="text-body-medium-md">Group Disabled</h4>
                <RadioGroup defaultValue="group-disabled-option1" disabled>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="group-disabled-option1" id="group-disabled-option1" />
                    <label
                      htmlFor="group-disabled-option1"
                      className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                    >
                      Group disabled
                    </label>
                  </div>
                  <div className="flex items-center space-x-[var(--space-sm)]">
                    <RadioGroupItem value="group-disabled-option2" id="group-disabled-option2" />
                    <label
                      htmlFor="group-disabled-option2"
                      className="text-body-md text-[var(--color-text-disabled)] cursor-not-allowed"
                    >
                      Also disabled
                    </label>
                  </div>
                </RadioGroup>
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
                Example settings form using radio group components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <div className="space-y-[var(--space-md)]">
                  <h4 className="text-body-medium-md">Privacy Level</h4>
                  <div className="space-y-[var(--space-lg)]">
                    <FormField isCheckboxField>
                      <FormLabel>Visibility</FormLabel>
                      <FormControl>
                        <RadioGroup defaultValue="public">
                          <div className="flex items-center space-x-[var(--space-sm)]">
                            <RadioGroupItem value="public" id="visibility-public" />
                            <FormLabel htmlFor="visibility-public" className="mb-0">
                              Public
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-[var(--space-sm)]">
                            <RadioGroupItem value="friends" id="visibility-friends" />
                            <FormLabel htmlFor="visibility-friends" className="mb-0">
                              Friends only
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-[var(--space-sm)]">
                            <RadioGroupItem value="private" id="visibility-private" />
                            <FormLabel htmlFor="visibility-private" className="mb-0">
                              Private
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormHelperText>
                        Control who can see your profile
                      </FormHelperText>
                    </FormField>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Survey Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Survey Form</CardTitle>
              <CardDescription>
                Example survey form with rating questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <FormField isCheckboxField>
                  <FormLabel>How satisfied are you with our service?</FormLabel>
                  <FormControl>
                    <RadioGroup>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="very-satisfied" id="rating-very-satisfied" />
                        <FormLabel htmlFor="rating-very-satisfied" className="mb-0">
                          Very satisfied
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="satisfied" id="rating-satisfied" />
                        <FormLabel htmlFor="rating-satisfied" className="mb-0">
                          Satisfied
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="neutral" id="rating-neutral" />
                        <FormLabel htmlFor="rating-neutral" className="mb-0">
                          Neutral
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-[var(--space-sm)]">
                        <RadioGroupItem value="dissatisfied" id="rating-dissatisfied" />
                        <FormLabel htmlFor="rating-dissatisfied" className="mb-0">
                          Dissatisfied
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormHelperText>
                    Your feedback helps us improve
                  </FormHelperText>
                </FormField>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Best Practices
        </h2>

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
                <li>• Use radio buttons for mutually exclusive options</li>
                <li>• Always pair radio buttons with clear, clickable labels</li>
                <li>• Provide a default selection when appropriate</li>
                <li>• Group related options together logically</li>
                <li>• Use consistent spacing and alignment</li>
                <li>• Include helper text for complex decisions</li>
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
                <li>• Don't use radio buttons for non-exclusive options</li>
                <li>• Avoid too many options in a single group (use select instead)</li>
                <li>• Don't mix radio buttons with checkboxes in same group</li>
                <li>• Avoid unclear or ambiguous option labels</li>
                <li>• Don't disable options without clear explanation</li>
                <li>• Avoid single radio button (use checkbox instead)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}