import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Icon } from "../ui/icon";

export function AccordionPreview() {
  const [singleValue, setSingleValue] = useState<string>("item-1");
  const [multipleValue, setMultipleValue] = useState<string[]>(["item-1"]);

  return (
    <div className="space-y-[var(--space-xlg)]">
      {/* Basic Accordion Types */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Accordion Types</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Single Accordion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Single Accordion</CardTitle>
              <CardDescription>
                Only one item can be expanded at a time. Includes collapsible option.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern for accordions,
                    ensuring full keyboard navigation and screen reader support.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It uses semantic design tokens for consistent styling
                    across your design system, including proper spacing, colors,
                    and typography.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Smooth expand and collapse animations are included using
                    Tailwind CSS animations with proper easing curves.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Multiple Accordion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Multiple Accordion</CardTitle>
              <CardDescription>
                Multiple items can be expanded simultaneously.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can multiple be open?</AccordionTrigger>
                  <AccordionContent>
                    Yes. With type="multiple", users can expand multiple accordion
                    items at the same time for easier content comparison.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does navigation work?</AccordionTrigger>
                  <AccordionContent>
                    Users can navigate using mouse clicks, keyboard (Space/Enter
                    to toggle, Tab to move between triggers), and touch gestures
                    on mobile devices.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What about performance?</AccordionTrigger>
                  <AccordionContent>
                    The accordion is optimized for performance with lazy content
                    rendering and efficient DOM updates using Radix UI primitives.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Controlled State Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Controlled State</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* Controlled Single */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Controlled Single</CardTitle>
              <CardDescription>
                Externally controlled accordion with state management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex gap-[var(--space-sm)]">
                  <button
                    onClick={() => setSingleValue("item-1")}
                    className="text-body-sm px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] text-[var(--color-text-primary)]"
                  >
                    Open Item 1
                  </button>
                  <button
                    onClick={() => setSingleValue("item-2")}
                    className="text-body-sm px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] text-[var(--color-text-primary)]"
                  >
                    Open Item 2
                  </button>
                  <button
                    onClick={() => setSingleValue("")}
                    className="text-body-sm px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] text-[var(--color-text-primary)]"
                  >
                    Close All
                  </button>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Current: {singleValue || "None"}
                </p>
                <Accordion
                  type="single"
                  collapsible
                  value={singleValue}
                  onValueChange={setSingleValue}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      This accordion supports controlled state management,
                      allowing you to programmatically open and close items.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Integration</AccordionTrigger>
                    <AccordionContent>
                      Perfect for integration with forms, routing, or other
                      state management systems in your application.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* Controlled Multiple */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Controlled Multiple</CardTitle>
              <CardDescription>
                Multiple accordion with external state control.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-[var(--space-md)]">
                <div className="flex gap-[var(--space-sm)]">
                  <button
                    onClick={() => setMultipleValue(["item-1", "item-2", "item-3"])}
                    className="text-body-sm px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] text-[var(--color-text-primary)]"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setMultipleValue([])}
                    className="text-body-sm px-[var(--space-sm)] py-[var(--space-xsm)] rounded-sm bg-[var(--color-background-neutral-subtle)] hover:bg-[var(--color-background-neutral-subtle-hovered)] text-[var(--color-text-primary)]"
                  >
                    Collapse All
                  </button>
                </div>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Open: {multipleValue.length > 0 ? multipleValue.join(", ") : "None"}
                </p>
                <Accordion
                  type="multiple"
                  value={multipleValue}
                  onValueChange={setMultipleValue}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Design System</AccordionTrigger>
                    <AccordionContent>
                      Built with semantic design tokens for consistent theming
                      and easy customization across your entire application.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Accessibility</AccordionTrigger>
                    <AccordionContent>
                      Includes full keyboard support, ARIA attributes, and
                      screen reader compatibility for inclusive user experiences.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Customization</AccordionTrigger>
                    <AccordionContent>
                      Easily customizable styling, animations, and behavior
                      to match your specific design requirements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Case Examples */}
      <section>
        <h2 className="text-heading-lg mb-[var(--space-lg)]">Use Case Examples</h2>

        <div className="grid grid-cols-1 gap-[var(--space-lg)] md:grid-cols-2">
          {/* FAQ Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">FAQ Section</CardTitle>
              <CardDescription>
                Common use case for frequently asked questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="faq-1">
                  <AccordionTrigger>How do I get started?</AccordionTrigger>
                  <AccordionContent>
                    Getting started is easy! Simply install the required dependencies,
                    import the accordion components, and start building your interface.
                    Check our documentation for detailed setup instructions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                  <AccordionContent>
                    The accordion component works in all modern browsers including
                    Chrome, Firefox, Safari, and Edge. It also provides graceful
                    degradation for older browsers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! The component uses semantic design tokens and
                    accepts custom className props, making it easy to override
                    styles and match your brand guidelines.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger>Is there mobile support?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the accordion is fully responsive and includes touch
                    gesture support for optimal mobile user experience.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Settings/Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-heading-sm">Settings Panel</CardTitle>
              <CardDescription>
                Organizing complex configuration options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["general"]}>
                <AccordionItem value="general">
                  <AccordionTrigger>General Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-[var(--space-md)]">
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm">Enable notifications</span>
                        <div className="w-10 h-5 bg-[var(--color-background-brand)] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm">Auto-save changes</span>
                        <div className="w-10 h-5 bg-[var(--color-background-neutral-subtle)] rounded-full"></div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="appearance">
                  <AccordionTrigger>Appearance</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-[var(--space-md)]">
                      <div>
                        <label className="text-body-sm block mb-[var(--space-xsm)]">Theme</label>
                        <select className="w-full p-[var(--space-sm)] border border-[var(--color-border-input)] rounded-sm bg-[var(--color-surface-primary)]">
                          <option>Light</option>
                          <option>Dark</option>
                          <option>Auto</option>
                        </select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="advanced">
                  <AccordionTrigger>Advanced Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-[var(--space-md)]">
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm">Developer mode</span>
                        <div className="w-10 h-5 bg-[var(--color-background-neutral-subtle)] rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-body-sm">Debug logging</span>
                        <div className="w-10 h-5 bg-[var(--color-background-neutral-subtle)] rounded-full"></div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
                <li>• Use clear, descriptive trigger text</li>
                <li>• Group related content logically</li>
                <li>• Provide expand/collapse all functionality for long lists</li>
                <li>• Use single type for mutually exclusive content</li>
                <li>• Keep content scannable with proper formatting</li>
                <li>• Consider mobile experience with touch-friendly triggers</li>
                <li>• Include loading states for dynamic content</li>
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
                <li>• Don't nest accordions more than one level deep</li>
                <li>• Avoid very short content that doesn't benefit from collapsing</li>
                <li>• Don't use for critical information that should always be visible</li>
                <li>• Avoid unclear or ambiguous trigger labels</li>
                <li>• Don't overload individual sections with too much content</li>
                <li>• Avoid accordions when most content needs to be visible</li>
                <li>• Don't forget keyboard navigation testing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}