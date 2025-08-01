import { useState } from "react";
import { TypographyPreview } from "./components/previews/typography-preview";
import { IconsPreview } from "./components/previews/icons-preview";
import { ButtonsPreview } from "./components/previews/buttons-preview";
import { CardPreview } from "./components/previews/card-preview";
import { SeparatorPreview } from "./components/previews/separator-preview";

type Section = "typography" | "icons" | "buttons" | "cards" | "separators";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("buttons");

  const sections = [
    { id: "typography" as const, label: "Typography" },
    { id: "icons" as const, label: "Icons" },
    { id: "buttons" as const, label: "Buttons" },
    { id: "cards" as const, label: "Cards" },
    { id: "separators" as const, label: "Separators" },
  ];

  return (
    <div className="flex h-screen bg-[var(--color-surface-base)]">
      {/* Left Navigation */}
      <nav className="fixed top-0 left-0 z-40 h-screen w-32 border-r border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] p-[var(--space-md)]">
        <ul className="space-y-[var(--space-xsm)]">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`
                  text-body-sm flex w-full items-center rounded-sm 
                  px-[var(--space-sm)] py-[var(--space-xsm)] transition-colors
                  ${
                    activeSection === section.id
                      ? "bg-[var(--color-background-brand-selected)] text-[var(--color-text-selected)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-neutral-subtle-hovered)] hover:text-[var(--color-text-primary)]"
                  }
                `}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="ml-32 flex flex-1 flex-col">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 border-b border-[var(--color-border-primary-subtle)] bg-[var(--color-surface-primary)] px-[var(--space-2xlg)] py-[var(--space-lg)]">
          <div>
            <h1 className="text-heading-lg mb-[var(--space-sm)] text-[var(--color-text-brand)]">
              Tide DS
            </h1>
            <p className="text-body-sm text-[var(--color-text-secondary)]">
              Design System Components
            </p>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-[var(--space-2xlg)]">
          {activeSection === "typography" && <TypographyPreview />}
          {activeSection === "icons" && <IconsPreview />}
          {activeSection === "buttons" && <ButtonsPreview />}
          {activeSection === "cards" && <CardPreview />}
          {activeSection === "separators" && <SeparatorPreview />}
        </main>
      </div>
    </div>
  );
}

export default App;
