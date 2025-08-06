import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { toast } from "../ui/toast";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function ToastPreview() {
  const [customMessage, setCustomMessage] = useState("Custom toast message");

  const showBasicToast = () => {
    toast("Event has been created");
  };

  const showSuccessToast = () => {
    toast.success("Your changes have been saved successfully!");
  };

  const showErrorToast = () => {
    toast.error("Failed to save changes. Please try again.");
  };

  const showWarningToast = () => {
    toast.warning("Your session will expire in 5 minutes");
  };

  const showInfoToast = () => {
    toast.info("A new software update is available");
  };

  const showToastWithDescription = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
  };

  const showToastWithAction = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => toast("Event creation undone"),
      },
    });
  };

  const showToastWithCloseButton = () => {
    toast("This toast has a close button", {
      closeButton: true,
      duration: 10000,
    });
  };

  const showLoadingToast = () => {
    toast.loading("Processing your request...", {
      id: "loading-toast",
    });

    // Simulate async operation
    setTimeout(() => {
      toast.success("Request processed successfully!", {
        id: "loading-toast",
      });
    }, 3000);
  };

  const showPromiseToast = () => {
    const myPromise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded successfully");
        } else {
          reject("Failed to load data");
        }
      }, 2000);
    });

    toast.promise(myPromise, {
      loading: "Loading data...",
      success: (data) => data,
      error: "Something went wrong",
    });
  };

  const showCustomToast = () => {
    toast.custom((t) => (
      <div className="flex items-start gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary-subtle)] rounded-lg shadow-lg">
        <div className="flex-shrink-0">
          <Icon name="sparkles" size="md" color="brand" />
        </div>
        <div className="flex-1">
          <div className="text-body-medium-md text-[var(--color-text-primary)]">
            Custom Toast!
          </div>
          <div className="text-body-sm text-[var(--color-text-secondary)] mt-[var(--space-xsm)]">
            This is a completely custom toast with custom styling and content.
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => toast.dismiss(t)}
          className="flex-shrink-0"
        >
          <Icon name="x" size="sm" />
        </Button>
      </div>
    ), {
      duration: 5000,
    });
  };

  const showPersistentToast = () => {
    toast("This toast will stay until dismissed", {
      duration: Infinity,
      closeButton: true,
    });
  };

  const showPositionedToasts = () => {
    toast("Top Left Toast", { position: "top-left" });
    setTimeout(() => toast("Top Right Toast", { position: "top-right" }), 100);
    setTimeout(() => toast("Bottom Left Toast", { position: "bottom-left" }), 200);
    setTimeout(() => toast("Bottom Right Toast", { position: "bottom-right" }), 300);
  };

  const dismissAllToasts = () => {
    toast.dismiss();
  };

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Toasts */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Basic Toasts</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Simple Toasts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Simple Notifications</CardTitle>
              <CardDescription>
                Basic toast notifications with different message types.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showBasicToast} className="w-full">
                Show Basic Toast
              </Button>
              <Button onClick={showToastWithDescription} variant="outline" className="w-full">
                Toast with Description
              </Button>
              <Button onClick={showToastWithCloseButton} variant="ghost" className="w-full">
                Toast with Close Button
              </Button>
            </CardContent>
          </Card>

          {/* Toast Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Toast Types</CardTitle>
              <CardDescription>
                Different types of toasts with semantic colors and icons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showSuccessToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="check-circle" size="sm" color="success" />
                Success Toast
              </Button>
              <Button onClick={showErrorToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="x" size="sm" color="error" />
                Error Toast
              </Button>
              <Button onClick={showWarningToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="triangle-alert" size="sm" color="warning" />
                Warning Toast
              </Button>
              <Button onClick={showInfoToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="info" size="sm" color="information" />
                Info Toast
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Toasts */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Interactive Toasts</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Action Toasts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Action Toasts</CardTitle>
              <CardDescription>
                Toasts with action buttons and interactive elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showToastWithAction} className="w-full">
                Toast with Action
              </Button>
              <Button 
                onClick={() => {
                  toast("File deleted", {
                    description: "Your file has been moved to trash",
                    action: {
                      label: "Undo",
                      onClick: () => toast.success("File restored successfully"),
                    },
                    cancel: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                }} 
                variant="outline" 
                className="w-full"
              >
                Toast with Action & Cancel
              </Button>
            </CardContent>
          </Card>

          {/* Loading and Promise Toasts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Loading & Async</CardTitle>
              <CardDescription>
                Toasts that handle loading states and async operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showLoadingToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="rotate-ccw" size="sm" />
                Loading Toast
              </Button>
              <Button onClick={showPromiseToast} variant="outline" className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="send" size="sm" />
                Promise Toast
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Custom Content */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Custom Content</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Custom Toast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Custom JSX</CardTitle>
              <CardDescription>
                Completely custom toast content with JSX elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showCustomToast} className="w-full flex items-center gap-[var(--space-sm)]">
                <Icon name="sparkles" size="sm" />
                Custom JSX Toast
              </Button>
              <Button 
                onClick={() => {
                  toast.custom((t) => (
                    <div className="flex items-center gap-[var(--space-md)] p-[var(--space-lg)] bg-gradient-to-r from-[var(--color-background-brand)] to-[var(--color-background-brand-hovered)] text-[var(--color-text-on-action)] rounded-lg shadow-lg">
                      <Icon name="star" size="md" />
                      <div className="flex-1">
                        <div className="text-body-medium-md">Achievement Unlocked!</div>
                        <div className="text-body-sm opacity-90">You've created your first custom toast</div>
                      </div>
                    </div>
                  ));
                }} 
                variant="outline" 
                className="w-full flex items-center gap-[var(--space-sm)]"
              >
                <Icon name="star" size="sm" />
                Achievement Toast
              </Button>
            </CardContent>
          </Card>

          {/* Dynamic Toast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Dynamic Content</CardTitle>
              <CardDescription>
                Create toasts with user-defined content and options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Input
                placeholder="Enter your custom message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <Button 
                onClick={() => toast(customMessage || "Custom message")} 
                className="w-full"
              >
                Show Custom Message
              </Button>
              <Button 
                onClick={() => {
                  const id = Date.now().toString();
                  toast(`Toast #${id.slice(-4)}`, {
                    description: `Created at ${new Date().toLocaleTimeString()}`,
                    id: id,
                  });
                }} 
                variant="outline" 
                className="w-full"
              >
                Show Timestamped Toast
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Position and Behavior */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Position & Behavior</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Position Control */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Position Control</CardTitle>
              <CardDescription>
                Toasts can appear in different positions on screen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button onClick={showPositionedToasts} className="w-full">
                Show All Positions
              </Button>
              <div className="grid grid-cols-2 gap-[var(--space-sm)]">
                <Button 
                  onClick={() => toast("Top Left", { position: "top-left" })} 
                  variant="outline" 
                  size="sm"
                >
                  Top Left
                </Button>
                <Button 
                  onClick={() => toast("Top Right", { position: "top-right" })} 
                  variant="outline" 
                  size="sm"
                >
                  Top Right
                </Button>
                <Button 
                  onClick={() => toast("Bottom Left", { position: "bottom-left" })} 
                  variant="outline" 
                  size="sm"
                >
                  Bottom Left
                </Button>
                <Button 
                  onClick={() => toast("Bottom Right", { position: "bottom-right" })} 
                  variant="outline" 
                  size="sm"
                >
                  Bottom Right
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Duration and Persistence */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Duration Control</CardTitle>
              <CardDescription>
                Control how long toasts remain visible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button 
                onClick={() => toast("Quick toast (1s)", { duration: 1000 })} 
                variant="outline" 
                className="w-full"
              >
                Quick Toast (1s)
              </Button>
              <Button 
                onClick={() => toast("Long toast (10s)", { duration: 10000, closeButton: true })} 
                variant="outline" 
                className="w-full"
              >
                Long Toast (10s)
              </Button>
              <Button onClick={showPersistentToast} variant="outline" className="w-full">
                Persistent Toast
              </Button>
              <Button onClick={dismissAllToasts} variant="destructive" className="w-full">
                <Icon name="x" size="sm" className="mr-[var(--space-sm)]" />
                Dismiss All Toasts
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Form Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Form Actions</CardTitle>
              <CardDescription>
                Common form submission and validation scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button 
                onClick={() => {
                  toast.loading("Saving changes...", { id: "save" });
                  setTimeout(() => {
                    toast.success("Changes saved successfully!", { id: "save" });
                  }, 1500);
                }} 
                className="w-full"
              >
                <Icon name="send" size="sm" className="mr-[var(--space-sm)]" />
                Save Form
              </Button>
              <Button 
                onClick={() => {
                  toast.error("Please fill in all required fields", {
                    description: "Email and password are required to continue",
                    action: {
                      label: "Review",
                      onClick: () => toast.info("Highlighting required fields..."),
                    },
                  });
                }} 
                variant="outline" 
                className="w-full"
              >
                <Icon name="triangle-alert" size="sm" className="mr-[var(--space-sm)]" />
                Form Validation Error
              </Button>
            </CardContent>
          </Card>

          {/* System Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">System Updates</CardTitle>
              <CardDescription>
                System status updates and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[var(--space-md)]">
              <Button 
                onClick={() => {
                  toast.success("Connected to server", {
                    description: "All systems operational",
                    icon: <Icon name="circle-check-big" size="sm" color="success" />,
                  });
                }} 
                variant="outline" 
                className="w-full"
              >
                <Icon name="circle-check-big" size="sm" className="mr-[var(--space-sm)]" />
                Connection Success
              </Button>
              <Button 
                onClick={() => {
                  toast.warning("Low storage space", {
                    description: "Only 2GB remaining. Consider cleaning up files.",
                    action: {
                      label: "Clean Up",
                      onClick: () => toast.info("Opening storage manager..."),
                    },
                    closeButton: true,
                    duration: 8000,
                  });
                }} 
                variant="outline" 
                className="w-full"
              >
                <Icon name="triangle-alert" size="sm" className="mr-[var(--space-sm)]" />
                System Warning
              </Button>
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
                <li>• Use appropriate toast types (success, error, warning, info)</li>
                <li>• Keep messages concise and actionable</li>
                <li>• Include action buttons for reversible operations</li>
                <li>• Use loading toasts for async operations</li>
                <li>• Provide clear descriptions when needed</li>
                <li>• Position toasts consistently in your app</li>
                <li>• Use persistent toasts sparingly for critical messages</li>
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
                <li>• Don't use toasts for critical information that must be seen</li>
                <li>• Avoid showing multiple similar toasts at once</li>
                <li>• Don't use toasts for complex interactions</li>
                <li>• Avoid very long toast messages</li>
                <li>• Don't rely solely on color to convey meaning</li>
                <li>• Avoid auto-dismissing error messages too quickly</li>
                <li>• Don't spam users with excessive notifications</li>
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
                <strong>Screen Reader Support:</strong> Toasts are announced to screen readers with proper ARIA live regions and roles.
              </p>
              <p>
                <strong>Keyboard Navigation:</strong> Toast actions are keyboard accessible, and users can dismiss toasts with the Escape key.
              </p>
              <p>
                <strong>Reduced Motion:</strong> Animations respect the user's reduced motion preferences for accessibility.
              </p>
              <p>
                <strong>Color and Contrast:</strong> Don't rely solely on color to communicate status - always include icons or descriptive text.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}