import type { Meta, StoryObj } from "@storybook/react";
import { Flag, FlagSize } from "../components/fundamental/flag";

const meta: Meta<typeof Flag> = {
  title: "NPM • Fundamental/Flag",
  component: Flag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    country: {
      control: "text",
      description: "ISO 3166-1-alpha-2 country code",
    },
    size: {
      control: "select",
      options: ["s", "m", "l", "xl"],
      description: "Size variant matching Icon component sizes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default flag with medium size
 */
export const Default: Story = {
  args: {
    country: "us",
    size: "m",
  },
};

/**
 * Small size flag (12px × 9px)
 */
export const Small: Story = {
  args: {
    country: "us",
    size: "s",
  },
};

/**
 * Medium size flag (16px × 12px) - Default
 */
export const Medium: Story = {
  args: {
    country: "us",
    size: "m",
  },
};

/**
 * Large size flag (20px × 15px)
 */
export const Large: Story = {
  args: {
    country: "us",
    size: "l",
  },
};

/**
 * Extra large size flag (24px × 18px)
 */
export const ExtraLarge: Story = {
  args: {
    country: "us",
    size: "xl",
  },
};

/**
 * All size variants displayed together
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-m)]">
      <div className="flex flex-col items-center gap-[var(--space-s)]">
        <Flag country="us" size="s" />
        <span className="text-caption-xsm text-[var(--color-text-secondary)]">
          s
        </span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-s)]">
        <Flag country="us" size="m" />
        <span className="text-caption-xsm text-[var(--color-text-secondary)]">
          m
        </span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-s)]">
        <Flag country="us" size="l" />
        <span className="text-caption-xsm text-[var(--color-text-secondary)]">
          l
        </span>
      </div>
      <div className="flex flex-col items-center gap-[var(--space-s)]">
        <Flag country="us" size="xl" />
        <span className="text-caption-xsm text-[var(--color-text-secondary)]">
          xl
        </span>
      </div>
    </div>
  ),
};

/**
 * Popular country flags
 */
export const PopularCountries: Story = {
  render: () => {
    const countries = [
      { code: "us", name: "United States" },
      { code: "gb", name: "United Kingdom" },
      { code: "ca", name: "Canada" },
      { code: "au", name: "Australia" },
      { code: "de", name: "Germany" },
      { code: "fr", name: "France" },
      { code: "jp", name: "Japan" },
      { code: "cn", name: "China" },
      { code: "in", name: "India" },
      { code: "br", name: "Brazil" },
      { code: "mx", name: "Mexico" },
      { code: "it", name: "Italy" },
      { code: "es", name: "Spain" },
      { code: "nl", name: "Netherlands" },
      { code: "se", name: "Sweden" },
    ];

    return (
      <div className="flex flex-wrap gap-[var(--space-m)] max-w-[400px]">
        {countries.map((country) => (
          <div
            key={country.code}
            className="flex flex-col items-center gap-[var(--space-s)]"
          >
            <Flag country={country.code} size="l" aria-label={`${country.name} flag`} />
            <span className="text-caption-xsm text-[var(--color-text-secondary)]">
              {country.code.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Flags in different sizes with labels
 */
export const WithLabels: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-m)]">
      {(["s", "m", "l", "xl"] as FlagSize[]).map((size) => (
        <div key={size} className="flex items-center gap-[var(--space-m)]">
          <Flag country="us" size={size} />
          <Flag country="gb" size={size} />
          <Flag country="fr" size={size} />
          <Flag country="de" size={size} />
          <Flag country="jp" size={size} />
          <span className="text-body-sm text-[var(--color-text-secondary)] min-w-[40px]">
            {size}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Flags with accessibility labels
 */
export const WithAccessibility: Story = {
  render: () => (
    <div className="flex items-center gap-[var(--space-m)]">
      <Flag country="us" size="l" aria-label="United States flag" />
      <Flag country="gb" size="l" aria-label="United Kingdom flag" />
      <Flag country="ca" size="l" aria-label="Canada flag" />
      <Flag country="au" size="l" aria-label="Australia flag" />
    </div>
  ),
};

/**
 * Example usage in a list with text
 */
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--space-s)] min-w-[200px]">
      <div className="flex items-center gap-[var(--space-s)]">
        <Flag country="us" size="m" />
        <span className="text-body-md">United States</span>
      </div>
      <div className="flex items-center gap-[var(--space-s)]">
        <Flag country="gb" size="m" />
        <span className="text-body-md">United Kingdom</span>
      </div>
      <div className="flex items-center gap-[var(--space-s)]">
        <Flag country="ca" size="m" />
        <span className="text-body-md">Canada</span>
      </div>
      <div className="flex items-center gap-[var(--space-s)]">
        <Flag country="au" size="m" />
        <span className="text-body-md">Australia</span>
      </div>
      <div className="flex items-center gap-[var(--space-s)]">
        <Flag country="de" size="m" />
        <span className="text-body-md">Germany</span>
      </div>
    </div>
  ),
};
