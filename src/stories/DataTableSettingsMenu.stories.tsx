import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTableSettingsMenu } from "../components/product/data-table-settings-menu";

const meta: Meta<typeof DataTableSettingsMenu> = {
  title: "NPM • Product Components/DataTableSettingsMenu",
  component: DataTableSettingsMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataTableSettingsMenu>;

// Sample column data
const sampleColumns = [
  { id: "id", label: "ID" },
  { id: "counterparty", label: "Counterparty" },
  { id: "type", label: "Type" },
  { id: "stage", label: "Stage" },
  { id: "laycan", label: "Laycan" },
  { id: "vessel", label: "Vessel" },
  { id: "lastBid", label: "Last bid" },
  { id: "lastOffer", label: "Last offer" },
  { id: "demurrage", label: "Demurrage" },
  { id: "tce", label: "TCE" },
  { id: "validity", label: "Validity" },
];

const groupableColumns = [
  { id: "counterparty", label: "Counterparty" },
  { id: "stage", label: "Stage" },
  { id: "vessel", label: "Vessel" },
];

// Interactive wrapper component
function InteractiveWrapper() {
  const [sortColumn, setSortColumn] = useState<string>();
  const [groupColumn, setGroupColumn] = useState<string>();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "id",
    "counterparty",
    "type",
    "stage",
    "laycan",
    "vessel",
    "lastBid",
    "lastOffer",
    "tce",
  ]);

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setVisibleColumns((prev) =>
      visible ? [...prev, columnId] : prev.filter((id) => id !== columnId)
    );
  };

  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <div className="flex items-center justify-between p-4 bg-[var(--color-surface-secondary)] rounded-m">
        <div className="text-body-md">Data Table Settings</div>
        <DataTableSettingsMenu
          sortableColumns={sampleColumns}
          selectedSortColumn={sortColumn}
          onSortChange={setSortColumn}
          groupableColumns={groupableColumns}
          selectedGroupColumn={groupColumn}
          onGroupChange={setGroupColumn}
          columns={sampleColumns}
          visibleColumns={visibleColumns}
          onColumnVisibilityChange={handleColumnVisibilityChange}
        />
      </div>

      <div className="p-4 bg-[var(--color-surface-primary)] rounded-m border border-[var(--color-border-primary-subtle)]">
        <h4 className="text-label-sm mb-2 text-[var(--color-text-tertiary)]">
          Current State
        </h4>
        <div className="space-y-2 text-caption-sm">
          <div>
            <span className="text-[var(--color-text-secondary)]">Sort by:</span>{" "}
            <span className="text-[var(--color-text-primary)]">
              {sortColumn || "None"}
            </span>
          </div>
          <div>
            <span className="text-[var(--color-text-secondary)]">Group by:</span>{" "}
            <span className="text-[var(--color-text-primary)]">
              {groupColumn || "None"}
            </span>
          </div>
          <div>
            <span className="text-[var(--color-text-secondary)]">
              Visible columns:
            </span>{" "}
            <span className="text-[var(--color-text-primary)]">
              {visibleColumns.length}
            </span>
          </div>
          <div className="text-[var(--color-text-tertiary)] text-caption-xsm">
            {visibleColumns.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
};

export const Default: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "end",
  },
};

export const WithPreselectedSort: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: "counterparty",
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "end",
  },
};

export const WithPreselectedGroup: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    groupableColumns: groupableColumns,
    selectedGroupColumn: "stage",
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "end",
  },
};

export const FewColumns: Story = {
  args: {
    sortableColumns: [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "status", label: "Status" },
    ],
    selectedSortColumn: undefined,
    groupableColumns: [
      { id: "status", label: "Status" },
    ],
    selectedGroupColumn: undefined,
    columns: [
      { id: "id", label: "ID" },
      { id: "name", label: "Name" },
      { id: "status", label: "Status" },
    ],
    visibleColumns: ["id", "name", "status"],
    align: "end",
  },
};

export const ManyColumns: Story = {
  args: {
    sortableColumns: Array.from({ length: 100 }, (_, i) => ({
      id: `column${i + 1}`,
      label: `Column ${i + 1}`,
      dataType: 'text' as const,
    })),
    selectedSortColumn: undefined,
    groupableColumns: Array.from({ length: 10 }, (_, i) => ({
      id: `column${i + 1}`,
      label: `Column ${i + 1}`,
      dataType: 'text' as const,
    })),
    selectedGroupColumn: undefined,
    columns: Array.from({ length: 100 }, (_, i) => ({
      id: `column${i + 1}`,
      label: `Column ${i + 1}`,
      dataType: 'text' as const,
    })),
    visibleColumns: Array.from({ length: 50 }, (_, i) => `column${i + 1}`),
    align: "end",
  },
};

export const AlignStart: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "start",
  },
};

export const CustomTriggerClassName: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "end",
    triggerClassName: "shrink-0 ml-auto",
  },
};

export const OnlyColumnVisibility: Story = {
  args: {
    sortableColumns: [],
    groupableColumns: [],
    columns: sampleColumns,
    visibleColumns: [
      "id",
      "counterparty",
      "type",
      "stage",
      "laycan",
      "vessel",
      "lastBid",
      "lastOffer",
      "tce",
    ],
    align: "end",
  },
};

export const OnlySorting: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    onSortChange: undefined,
    groupableColumns: [],
    columns: [],
    visibleColumns: [],
    align: "end",
  },
};

export const OnlyGrouping: Story = {
  args: {
    sortableColumns: [],
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    onGroupChange: undefined,
    columns: [],
    visibleColumns: [],
    align: "end",
  },
};

export const SortingAndGrouping: Story = {
  args: {
    sortableColumns: sampleColumns,
    selectedSortColumn: undefined,
    groupableColumns: groupableColumns,
    selectedGroupColumn: undefined,
    columns: [],
    visibleColumns: [],
    align: "end",
  },
};
