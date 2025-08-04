import { Button } from "../ui/button";

export function ButtonsPreview() {
  return (
    <div className="space-y-[var(--space-2xlg)]">
      <div>
        <h1 className="text-heading-2xlg mb-[var(--space-md)] text-[var(--color-text-primary)]">
          Buttons
        </h1>
        <p className="text-body-lg text-[var(--color-text-secondary)]">
          Button components with variants, sizes, icons, and interactive states.
        </p>
      </div>

      <div className="space-y-[var(--space-xlg)]">
        {/* Variants */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Variants
          </h2>
          <div className="flex flex-wrap items-center gap-[var(--space-md)]">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-[var(--space-md)]">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* With Icons */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            With Icons
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button icon="plus" iconPosition="left">
                Add Item
              </Button>
              <Button icon="download" iconPosition="left" variant="primary">
                Download
              </Button>
              <Button icon="trash-2" iconPosition="left" variant="destructive">
                Delete
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button icon="arrow-right" iconPosition="right">
                Next
              </Button>
              <Button icon="external-link" iconPosition="right" variant="ghost">
                External
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button icon="settings" size="sm" />
              <Button icon="edit" size="md" />
              <Button icon="star" size="lg" variant="primary" />
              <Button icon="trash-2" size="md" variant="destructive" />
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button icon="save" iconPosition="left" disabled>
                Save
              </Button>
              <Button icon="lock" size="md" disabled />
            </div>
          </div>
        </div>

        {/* With Dropdown */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            With Dropdown
          </h2>
          <div className="flex flex-wrap items-center gap-[var(--space-md)]">
            <Button dropdown>Actions</Button>
            <Button dropdown variant="primary">
              Primary Actions
            </Button>
            <Button icon="user" iconPosition="left" dropdown>
              User Menu
            </Button>
          </div>
        </div>

        {/* States */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            States
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button variant="primary">Primary Normal</Button>
              <Button variant="primary" disabled>
                Primary Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-[var(--space-md)]">
              <Button variant="destructive">Destructive Normal</Button>
              <Button variant="destructive" disabled>
                Destructive Disabled
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h2 className="text-heading-lg mb-[var(--space-lg)] text-[var(--color-text-primary)]">
            Usage Examples
          </h2>
          <div className="space-y-[var(--space-md)]">
            <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
              <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
                Basic Button
              </h3>
              <div className="flex items-center gap-[var(--space-md)]">
                <Button>Click me</Button>
                <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
                  {`<Button>Click me</Button>`}
                </code>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
              <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
                Primary with Icon
              </h3>
              <div className="flex items-center gap-[var(--space-md)]">
                <Button variant="primary" icon="plus" iconPosition="left">
                  Add Item
                </Button>
                <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
                  {`<Button variant="primary" icon="plus" iconPosition="left">Add Item</Button>`}
                </code>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-lg)]">
              <h3 className="text-heading-sm mb-[var(--space-sm)] text-[var(--color-text-primary)]">
                Icon Only Button
              </h3>
              <div className="flex items-center gap-[var(--space-md)]">
                <Button icon="settings" size="md" />
                <code className="text-body-sm rounded-sm bg-[var(--color-surface-secondary)] px-[var(--space-sm)] py-[var(--space-xsm)] text-[var(--color-text-primary)]">
                  {`<Button icon="settings" size="md" />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
