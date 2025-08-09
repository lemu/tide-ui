import { z } from "zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  useFormWithSchema,
} from "../ui/form";

// Define validation schemas
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  age: z.coerce.number().min(13, "Must be at least 13 years old").max(120, "Please enter a valid age"),
  role: z.string().min(1, "Please select a role"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a priority" }),
  }),
});

export function FormPreview() {
  const [submissions, setSubmissions] = useState<Record<string, any>>({});

  // Login form
  const loginForm = useFormWithSchema({
    schema: loginSchema,
    defaultValues: { email: "", password: "" },
  });

  // Profile form
  const profileForm = useFormWithSchema({
    schema: profileSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      role: "",
      bio: "",
      acceptTerms: false,
    },
  });

  // Contact form
  const contactForm = useFormWithSchema({
    schema: contactSchema,
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    },
  });

  const handleSubmit = (formName: string) => (data: any) => {
    console.log(`${formName} submitted:`, data);
    setSubmissions(prev => ({ ...prev, [formName]: data }));
  };

  return (
    <div className="space-y-[var(--space-xlg)]">
      <div>
        <h1 className="text-heading-2xlg mb-[var(--space-md)] text-[var(--color-text-primary)]">
          Form Validation
        </h1>
        <p className="text-body-lg text-[var(--color-text-secondary)]">
          React Hook Form integration with Zod schema validation and existing form components.
        </p>
      </div>

      <div className="space-y-[var(--space-xlg)]">
        {/* Login Form */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Login Form
          </h2>
          
          <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Login with Validation</CardTitle>
                <CardDescription>
                  Form with email and password validation using Zod schema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form form={loginForm} onSubmit={handleSubmit("login")} className="space-y-[var(--space-lg)]">
                  <FormField name="email">
                    {({ value, onChange, onBlur, error }) => (
                      <>
                        <FormLabel htmlFor="login-email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            variant={error ? "error" : "default"}
                          />
                        </FormControl>
                        {error ? (
                          <FormErrorMessage>{error}</FormErrorMessage>
                        ) : (
                          <FormHelperText>We'll never share your email</FormHelperText>
                        )}
                      </>
                    )}
                  </FormField>

                  <FormField name="password">
                    {({ value, onChange, onBlur, error }) => (
                      <>
                        <FormLabel htmlFor="login-password">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            variant={error ? "error" : "default"}
                          />
                        </FormControl>
                        {error ? (
                          <FormErrorMessage>{error}</FormErrorMessage>
                        ) : (
                          <FormHelperText>Minimum 8 characters required</FormHelperText>
                        )}
                      </>
                    )}
                  </FormField>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    loading={loginForm.formState.isSubmitting}
                  >
                    Sign In
                  </Button>
                </Form>
              </CardContent>
            </Card>

            {/* Login Form Result */}
            {submissions.login && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-sm">Form Submission</CardTitle>
                  <CardDescription>
                    Successfully validated and submitted data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-body-sm bg-[var(--color-surface-secondary)] p-[var(--space-md)] rounded-md overflow-x-auto">
                    {JSON.stringify(submissions.login, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Profile Form */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Profile Form
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">User Profile</CardTitle>
                <CardDescription>
                  Complex form with multiple field types and validation rules.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form form={profileForm} onSubmit={handleSubmit("profile")} className="space-y-[var(--space-lg)]">
                  <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
                    <FormField name="firstName">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="profile-firstName">First Name</FormLabel>
                          <FormControl>
                            <Input
                              id="profile-firstName"
                              type="text"
                              placeholder="John"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>

                    <FormField name="lastName">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="profile-lastName">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              id="profile-lastName"
                              type="text"
                              placeholder="Doe"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>
                  </div>

                  <FormField name="email">
                    {({ value, onChange, onBlur, error }) => (
                      <>
                        <FormLabel htmlFor="profile-email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="profile-email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            variant={error ? "error" : "default"}
                          />
                        </FormControl>
                        {error && <FormErrorMessage>{error}</FormErrorMessage>}
                      </>
                    )}
                  </FormField>

                  <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
                    <FormField name="age">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="profile-age">Age</FormLabel>
                          <FormControl>
                            <Input
                              id="profile-age"
                              type="number"
                              placeholder="25"
                              value={value}
                              onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                              size="sm"
                              className="w-24"
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>

                    <FormField name="role">
                      {({ value, onChange, error }) => (
                        <>
                          <FormLabel htmlFor="profile-role">Role</FormLabel>
                          <FormControl>
                            <Select value={value} onValueChange={onChange}>
                              <SelectTrigger variant={error ? "error" : "default"}>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>
                  </div>

                  <FormField name="bio">
                    {({ value, onChange, onBlur, error }) => (
                      <>
                        <FormLabel htmlFor="profile-bio">Bio (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            id="profile-bio"
                            placeholder="Tell us about yourself..."
                            value={value || ""}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            variant={error ? "error" : "default"}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        {error ? (
                          <FormErrorMessage>{error}</FormErrorMessage>
                        ) : (
                          <FormHelperText>Maximum 500 characters</FormHelperText>
                        )}
                      </>
                    )}
                  </FormField>

                  <FormField name="acceptTerms">
                    {({ value, onChange, error }) => (
                      <div className="flex items-start space-x-[var(--space-sm)]">
                        <Checkbox
                          id="profile-acceptTerms"
                          checked={value}
                          onCheckedChange={onChange}
                          variant={error ? "error" : "default"}
                        />
                        <div className="grid gap-[var(--space-xsm)] leading-none">
                          <FormLabel 
                            htmlFor="profile-acceptTerms"
                            className="text-body-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Accept terms and conditions
                          </FormLabel>
                          {error && (
                            <FormErrorMessage className="text-caption-sm">
                              {error}
                            </FormErrorMessage>
                          )}
                        </div>
                      </div>
                    )}
                  </FormField>

                  <Button 
                    type="submit" 
                    variant="primary"
                    loading={profileForm.formState.isSubmitting}
                  >
                    Save Profile
                  </Button>
                </Form>
              </CardContent>
            </Card>

            {/* Profile Form Result */}
            {submissions.profile && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading-sm">Profile Submitted</CardTitle>
                  <CardDescription>
                    Successfully validated and submitted profile data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-body-sm bg-[var(--color-surface-secondary)] p-[var(--space-md)] rounded-md overflow-x-auto">
                    {JSON.stringify(submissions.profile, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Contact Form
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Contact Us</CardTitle>
              <CardDescription>
                Form with enum validation and complex message handling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-[var(--space-lg)] lg:grid-cols-2">
                <Form form={contactForm} onSubmit={handleSubmit("contact")} className="space-y-[var(--space-lg)]">
                  <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
                    <FormField name="name">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="contact-name">Name</FormLabel>
                          <FormControl>
                            <Input
                              id="contact-name"
                              type="text"
                              placeholder="Your name"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>

                    <FormField name="email">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="contact-email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="contact-email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
                    <FormField name="subject">
                      {({ value, onChange, onBlur, error }) => (
                        <>
                          <FormLabel htmlFor="contact-subject">Subject</FormLabel>
                          <FormControl>
                            <Input
                              id="contact-subject"
                              type="text"
                              placeholder="What's this about?"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              onBlur={onBlur}
                              variant={error ? "error" : "default"}
                            />
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>

                    <FormField name="priority">
                      {({ value, onChange, error }) => (
                        <>
                          <FormLabel htmlFor="contact-priority">Priority</FormLabel>
                          <FormControl>
                            <Select value={value} onValueChange={onChange}>
                              <SelectTrigger variant={error ? "error" : "default"}>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </>
                      )}
                    </FormField>
                  </div>

                  <FormField name="message">
                    {({ value, onChange, onBlur, error }) => (
                      <>
                        <FormLabel htmlFor="contact-message">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            id="contact-message"
                            placeholder="Please describe your inquiry..."
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            variant={error ? "error" : "default"}
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        {error ? (
                          <FormErrorMessage>{error}</FormErrorMessage>
                        ) : (
                          <FormHelperText>Please provide as much detail as possible</FormHelperText>
                        )}
                      </>
                    )}
                  </FormField>

                  <Button 
                    type="submit" 
                    variant="primary"
                    loading={contactForm.formState.isSubmitting}
                  >
                    Send Message
                  </Button>
                </Form>

                {/* Contact Form Result */}
                {submissions.contact && (
                  <div className="space-y-[var(--space-md)]">
                    <h3 className="text-heading-sm">Message Submitted</h3>
                    <div className="bg-[var(--color-surface-secondary)] p-[var(--space-md)] rounded-md">
                      <pre className="text-body-sm overflow-x-auto">
                        {JSON.stringify(submissions.contact, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form States */}
        <section>
          <h2 className="text-heading-lg mb-[var(--space-lg)]">
            Form States & Features
          </h2>

          <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Validation Features</CardTitle>
                <CardDescription>
                  Built-in features of the form validation system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                  <li>• Real-time validation on blur/change</li>
                  <li>• Type-safe schema validation with Zod</li>
                  <li>• Automatic error state styling</li>
                  <li>• Form submission loading states</li>
                  <li>• Custom validation messages</li>
                  <li>• Integration with existing form components</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-heading-sm">Supported Field Types</CardTitle>
                <CardDescription>
                  Components that work with the validation system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-[var(--space-sm)] text-body-sm text-[var(--color-text-secondary)]">
                  <li>• Input (text, email, password, number, etc.)</li>
                  <li>• Textarea for multi-line text</li>
                  <li>• Select dropdowns with enum validation</li>
                  <li>• Checkbox with boolean validation</li>
                  <li>• Radio groups (can be added)</li>
                  <li>• Custom form controls</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}