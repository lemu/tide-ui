import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Icon } from "../ui/icon";
import {
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "../ui/form-field";

export function InputPreview() {
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
                Complete form field structure with label and helper text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField>
                <FormLabel htmlFor="helper-example">Label</FormLabel>
                <FormControl>
                  <Input id="helper-example" placeholder="Placeholder" />
                </FormControl>
                <FormHelperText>Helper text</FormHelperText>
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
              <FormField>
                <FormLabel htmlFor="error-example">Label</FormLabel>
                <FormControl>
                  <Input 
                    id="error-example" 
                    variant="error" 
                    placeholder="Placeholder" 
                  />
                </FormControl>
                <FormErrorMessage>Helper text</FormErrorMessage>
              </FormField>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Basic Inputs */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Basic Inputs
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Sizes</CardTitle>
              <CardDescription>
                Input components in different sizes for various use cases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="size-sm">Small</FormLabel>
                  <FormControl>
                    <Input
                      id="size-sm"
                      size="sm"
                      placeholder="Small input"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="size-md">Medium (Default)</FormLabel>
                  <FormControl>
                    <Input
                      id="size-md"
                      size="md"
                      placeholder="Medium input"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="size-lg">Large</FormLabel>
                  <FormControl>
                    <Input
                      id="size-lg"
                      size="lg"
                      placeholder="Large input"
                    />
                  </FormControl>
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Input Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Input Types</CardTitle>
              <CardDescription>
                Different input types for various data collection needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="type-text">Text</FormLabel>
                  <FormControl>
                    <Input
                      id="type-text"
                      type="text"
                      placeholder="Enter text"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="type-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="type-email"
                      type="email"
                      placeholder="Enter email"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="type-password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="type-password"
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="type-number">Number</FormLabel>
                  <FormControl>
                    <Input
                      id="type-number"
                      type="number"
                      placeholder="Enter number"
                    />
                  </FormControl>
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Input States */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Input States
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
          {/* Default & Error States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Default & Error States</CardTitle>
              <CardDescription>
                Standard input appearance and error state styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="state-default">Default</FormLabel>
                  <FormControl>
                    <Input
                      id="state-default"
                      placeholder="Default input"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="state-value">With Value</FormLabel>
                  <FormControl>
                    <Input
                      id="state-value"
                      defaultValue="Sample text"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="state-error">Error State</FormLabel>
                  <FormControl>
                    <Input
                      id="state-error"
                      variant="error"
                      placeholder="Error input"
                    />
                  </FormControl>
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormField>
              </div>
            </CardContent>
          </Card>

          {/* Disabled State */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Disabled State</CardTitle>
              <CardDescription>
                Disabled inputs with reduced opacity and interaction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="disabled-empty">Disabled Empty</FormLabel>
                  <FormControl>
                    <Input
                      id="disabled-empty"
                      disabled
                      placeholder="Disabled input"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="disabled-value">Disabled with Value</FormLabel>
                  <FormControl>
                    <Input
                      id="disabled-value"
                      disabled
                      defaultValue="Disabled with text"
                    />
                  </FormControl>
                </FormField>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Form Examples
        </h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Login Form</CardTitle>
              <CardDescription>
                Example login form using input components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="login-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="login-password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                </FormField>
              </form>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Profile Form</CardTitle>
              <CardDescription>
                Example profile form with different input types and sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="profile-name">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="profile-name"
                      type="text"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormHelperText>
                    Enter your first and last name
                  </FormHelperText>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="profile-age">Age</FormLabel>
                  <FormControl>
                    <Input
                      id="profile-age"
                      type="number"
                      placeholder="25"
                      size="sm"
                      className="w-24"
                    />
                  </FormControl>
                </FormField>
                <FormField>
                  <FormLabel htmlFor="profile-website">Website</FormLabel>
                  <FormControl>
                    <Input
                      id="profile-website"
                      type="url"
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormHelperText>
                    Optional: Your personal or business website
                  </FormHelperText>
                </FormField>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Validation Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Form Validation Examples
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">
              Complete Validation States
            </CardTitle>
            <CardDescription>
              Examples showing different validation states and messages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-[var(--space-xlg)] md:grid-cols-2">
              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="validation-email">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      id="validation-email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormHelperText>We'll never share your email</FormHelperText>
                </FormField>

                <FormField>
                  <FormLabel htmlFor="validation-password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="validation-password"
                      type="password"
                      variant="error"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormErrorMessage>Password must be at least 8 characters</FormErrorMessage>
                </FormField>
              </div>

              <div className="space-y-[var(--space-lg)]">
                <FormField>
                  <FormLabel htmlFor="validation-username">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="validation-username"
                      type="text"
                      variant="error"
                      placeholder="Choose username"
                    />
                  </FormControl>
                  <FormErrorMessage>Username is already taken</FormErrorMessage>
                </FormField>

                <FormField>
                  <FormLabel htmlFor="validation-phone">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id="validation-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </FormControl>
                  <FormHelperText>Include country code for international numbers</FormHelperText>
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Real-world Usage */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">
          Real-world Usage
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-heading-sm">
              Search & Filter Interface
            </CardTitle>
            <CardDescription>
              Common input patterns in application interfaces.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-[var(--space-lg)]">
              {/* Search Bar */}
              <div>
                <h4 className="text-body-medium-md mb-[var(--space-md)]">
                  Search Bar
                </h4>
                <FormField>
                  <FormLabel htmlFor="search-products">Search Products</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="search-products"
                        type="search"
                        placeholder="Search products..."
                        size="lg"
                        className="pl-[var(--space-3xlg)]"
                      />
                      <div className="absolute left-[var(--space-md)] top-1/2 -translate-y-1/2">
                        <Icon name="search" size="md" color="tertiary" />
                      </div>
                    </div>
                  </FormControl>
                  <FormHelperText>Use keywords to find products quickly</FormHelperText>
                </FormField>
              </div>

              {/* Filter Inputs */}
              <div>
                <h4 className="text-body-medium-md mb-[var(--space-md)]">
                  Filter Inputs
                </h4>
                <div className="grid grid-cols-1 gap-[var(--space-md)] md:grid-cols-3">
                  <div>
                    <label className="text-body-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                      Min Price
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      size="sm"
                    />
                  </div>
                  <div>
                    <label className="text-body-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                      Max Price
                    </label>
                    <Input
                      type="number"
                      placeholder="1000"
                      size="sm"
                    />
                  </div>
                  <div>
                    <label className="text-body-sm mb-[var(--space-xsm)] block text-[var(--color-text-secondary)]">
                      Category
                    </label>
                    <Input
                      type="text"
                      placeholder="Electronics"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                <li>• Use appropriate input types for data validation</li>
                <li>• Provide clear, descriptive placeholder text</li>
                <li>• Include proper labels for accessibility</li>
                <li>• Show validation errors immediately after interaction</li>
                <li>• Use consistent sizing within forms</li>
                <li>• Provide helpful error messages</li>
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
                <li>• Don't use generic placeholder text like "Enter text"</li>
                <li>• Avoid using inputs without proper labels</li>
                <li>• Don't mix different input sizes inconsistently</li>
                <li>• Avoid unclear or technical error messages</li>
                <li>• Don't disable inputs without clear indication why</li>
                <li>• Avoid overly long or complex form fields</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}