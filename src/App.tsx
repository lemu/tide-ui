import { useState } from "react";
import { TypographyPreview } from "./components/previews/typography-preview";
import { IconsPreview } from "./components/previews/icons-preview";
import { ButtonsPreview } from "./components/previews/buttons-preview";
import { CardPreview } from "./components/previews/card-preview";
import { SeparatorPreview } from "./components/previews/separator-preview";
import { TextLinkPreview } from "./components/previews/text-link-preview";
import { TooltipPreview } from "./components/previews/tooltip-preview";
import { KbdPreview } from "./components/previews/kbd-preview";
import { BreadcrumbPreview } from "./components/previews/breadcrumb-preview";
import { InputPreview } from "./components/previews/input-preview";
import { CheckboxPreview } from "./components/previews/checkbox-preview";
import { RadioGroupPreview } from "./components/previews/radio-group-preview";
import { SelectPreview } from "./components/previews/select-preview";
import { AccordionPreview } from "./components/previews/accordion-preview";
import { AlertPreview } from "./components/previews/alert-preview";
import { BadgePreview } from "./components/previews/badge-preview";
import { CalendarPreview } from "./components/previews/calendar-preview";
import { ComboboxPreview } from "./components/previews/combobox-preview";
import { HoverCardPreview } from "./components/previews/hover-card-preview";
import { PaginationPreview } from "./components/previews/pagination-preview";
import { SheetPreview } from "./components/previews/sheet-preview";
import { SliderPreview } from "./components/previews/slider-preview";
import { ToastPreview } from "./components/previews/toast-preview";
import { SwitchPreview } from "./components/previews/switch-preview";
import { TogglePreview } from "./components/previews/toggle-preview";
import { DialogPreview } from "./components/previews/dialog-preview";
import { AvatarPreview } from "./components/previews/avatar-preview";
import { TabsPreview } from "./components/previews/tabs-preview";
import { TablePreview } from "./components/previews/table-preview";
import { AppFramePreview } from "./components/previews/app-frame-preview";
import { DropdownMenuShowcase } from "./components/previews/dropdown-menu-showcase";
import { FormPreview } from "./components/previews/form-preview";
import { SkeletonPreview } from "./components/previews/skeleton-preview";
import { Toaster } from "./components/ui/toast";

type Section = "typography" | "icons" | "buttons" | "cards" | "separators" | "text-links" | "tooltips" | "kbd" | "breadcrumbs" | "inputs" | "forms" | "checkboxes" | "radio-groups" | "selects" | "accordions" | "alerts" | "badges" | "calendars" | "comboboxes" | "hover-cards" | "pagination" | "sheets" | "sliders" | "toasts" | "switches" | "toggles" | "dialogs" | "avatars" | "tabs" | "tables" | "dropdown-menus" | "skeletons" | "app-frame";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("buttons");

  const sections = [
    { id: "typography" as const, label: "Typography" },
    { id: "icons" as const, label: "Icons" },
    { id: "buttons" as const, label: "Buttons" },
    { id: "cards" as const, label: "Cards" },
    { id: "separators" as const, label: "Separators" },
    { id: "text-links" as const, label: "Text Links" },
    { id: "tooltips" as const, label: "Tooltips" },
    { id: "kbd" as const, label: "Kbd" },
    { id: "breadcrumbs" as const, label: "Breadcrumbs" },
    { id: "inputs" as const, label: "Inputs" },
    { id: "forms" as const, label: "Forms" },
    { id: "checkboxes" as const, label: "Checkboxes" },
    { id: "radio-groups" as const, label: "Radio Groups" },
    { id: "selects" as const, label: "Selects" },
    { id: "accordions" as const, label: "Accordions" },
    { id: "alerts" as const, label: "Alerts" },
    { id: "badges" as const, label: "Badges" },
    { id: "calendars" as const, label: "Calendars" },
    { id: "comboboxes" as const, label: "Comboboxes" },
    { id: "hover-cards" as const, label: "Hover Cards" },
    { id: "pagination" as const, label: "Pagination" },
    { id: "sheets" as const, label: "Sheets" },
    { id: "sliders" as const, label: "Sliders" },
    { id: "toasts" as const, label: "Toasts" },
    { id: "switches" as const, label: "Switches" },
    { id: "toggles" as const, label: "Toggles" },
    { id: "dialogs" as const, label: "Dialogs" },
    { id: "avatars" as const, label: "Avatars" },
    { id: "tabs" as const, label: "Tabs" },
    { id: "tables" as const, label: "Tables" },
    { id: "dropdown-menus" as const, label: "Dropdown Menus" },
    { id: "skeletons" as const, label: "Skeletons" },
    { id: "app-frame" as const, label: "App Frame" },
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
          {activeSection === "text-links" && <TextLinkPreview />}
          {activeSection === "tooltips" && <TooltipPreview />}
          {activeSection === "kbd" && <KbdPreview />}
          {activeSection === "breadcrumbs" && <BreadcrumbPreview />}
          {activeSection === "inputs" && <InputPreview />}
          {activeSection === "forms" && <FormPreview />}
          {activeSection === "checkboxes" && <CheckboxPreview />}
          {activeSection === "radio-groups" && <RadioGroupPreview />}
          {activeSection === "selects" && <SelectPreview />}
          {activeSection === "accordions" && <AccordionPreview />}
          {activeSection === "alerts" && <AlertPreview />}
          {activeSection === "badges" && <BadgePreview />}
          {activeSection === "calendars" && <CalendarPreview />}
          {activeSection === "comboboxes" && <ComboboxPreview />}
          {activeSection === "hover-cards" && <HoverCardPreview />}
          {activeSection === "pagination" && <PaginationPreview />}
          {activeSection === "sheets" && <SheetPreview />}
          {activeSection === "sliders" && <SliderPreview />}
          {activeSection === "toasts" && <ToastPreview />}
          {activeSection === "switches" && <SwitchPreview />}
          {activeSection === "toggles" && <TogglePreview />}
          {activeSection === "dialogs" && <DialogPreview />}
          {activeSection === "avatars" && <AvatarPreview />}
          {activeSection === "tabs" && <TabsPreview />}
          {activeSection === "tables" && <TablePreview />}
          {activeSection === "dropdown-menus" && <DropdownMenuShowcase />}
          {activeSection === "skeletons" && <SkeletonPreview />}
          {activeSection === "app-frame" && <AppFramePreview />}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
