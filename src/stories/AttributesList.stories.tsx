import type { Meta, StoryObj } from '@storybook/react'
import {
  AttributesList,
  AttributesSeparator,
  AttributesGroup,
  AttributesItem,
  AttributesRow,
  AttributesLabel,
  AttributesValue,
  AttributesContent,
  AttributesChevron,
} from '../components/ui/attributes-list'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const meta: Meta<typeof AttributesList> = {
  title: 'NPM • Product Components/AttributesList',
  component: AttributesList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AttributesList>

export default meta
type Story = StoryObj<typeof meta>

// Story 1: Flat List - Simple key-value pairs without grouping
export const FlatList: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Charterer</AttributesLabel>
            <AttributesValue>ShipCo Ltd</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Broker</AttributesLabel>
            <AttributesValue>Clarksons</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Owner</AttributesLabel>
            <AttributesValue>Acme Ltd</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Vessel name</AttributesLabel>
            <AttributesValue>Ever Given</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>IMO Number</AttributesLabel>
            <AttributesValue>9811000</AttributesValue>
          </AttributesRow>
        </AttributesItem>
      </AttributesList>
    </div>
  ),
}

// Story 2: Grouped Sections - Key-value pairs organized by section
export const GroupedSections: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesGroup label="Involved Parties">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Charterer</AttributesLabel>
              <AttributesValue>ShipCo Ltd</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Broker</AttributesLabel>
              <AttributesValue>Clarksons</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Owner</AttributesLabel>
              <AttributesValue>Acme Ltd</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Vessel">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Vessel name</AttributesLabel>
              <AttributesValue>Ever Given</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Callsign</AttributesLabel>
              <AttributesValue>H3RC</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>IMO Number</AttributesLabel>
              <AttributesValue>9811000</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Built date</AttributesLabel>
              <AttributesValue>28th September, 2018</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Voyage">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Load Port</AttributesLabel>
              <AttributesValue>Tubarão, BR</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Discharge Port</AttributesLabel>
              <AttributesValue>Qingdao or Tianjin, CN</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Cargo</AttributesLabel>
              <AttributesValue>Iron Ore + 160,000 mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Laycan</AttributesLabel>
              <AttributesValue>27th October, 2025 - 30th October, 2025</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>
      </AttributesList>
    </div>
  ),
}

// Story 3: Collapsible Items - Items that expand to show more details
export const CollapsibleItems: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesItem collapsible defaultOpen={false}>
          <AttributesRow asCollapsibleTrigger>
            <AttributesLabel>Charterer</AttributesLabel>
            <AttributesValue>
              ShipCo Ltd
              <AttributesChevron />
            </AttributesValue>
          </AttributesRow>
          <AttributesContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-xsm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Email:</span>
                    <span className="text-body-medium-xsm">contact@shipco.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Phone:</span>
                    <span className="text-body-medium-xsm">+1 555 0123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Country:</span>
                    <span className="text-body-medium-xsm">United Kingdom</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AttributesContent>
        </AttributesItem>

        <AttributesItem collapsible defaultOpen={false}>
          <AttributesRow asCollapsibleTrigger>
            <AttributesLabel>Vessel name</AttributesLabel>
            <AttributesValue>
              Ever Given
              <AttributesChevron />
            </AttributesValue>
          </AttributesRow>
          <AttributesContent>
            <Card>
              <CardContent className="p-[var(--space-md)]">
                <div className="space-y-2 text-body-xsm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Flag:</span>
                    <span className="text-body-medium-xsm">Panama</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Class:</span>
                    <span className="text-body-medium-xsm">G class</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">DWT:</span>
                    <span className="text-body-medium-xsm">99,155 mt</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Draft:</span>
                    <span className="text-body-medium-xsm">14.5 m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AttributesContent>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>IMO Number</AttributesLabel>
            <AttributesValue>9811000</AttributesValue>
          </AttributesRow>
        </AttributesItem>
      </AttributesList>
    </div>
  ),
}

// Story 4: Hidden Items - Items that can be shown/hidden with View all button
export const HiddenItems: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList showHiddenLabel="More details" hideLabel="Less details">
        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Vessel name</AttributesLabel>
            <AttributesValue>Ever Given</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>IMO Number</AttributesLabel>
            <AttributesValue>9811000</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        {/* Hidden items - shown after clicking "More details" */}
        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Built date</AttributesLabel>
            <AttributesValue>28th September, 2018</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>GRT</AttributesLabel>
            <AttributesValue>220,940 mt</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Flag</AttributesLabel>
            <AttributesValue>Panama</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Class</AttributesLabel>
            <AttributesValue>G class</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>DWT</AttributesLabel>
            <AttributesValue>99,155 mt</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Draft</AttributesLabel>
            <AttributesValue>14.5 m</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>LOA/Beam</AttributesLabel>
            <AttributesValue>400 m / 59 m</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Max height</AttributesLabel>
            <AttributesValue>65 m</AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem hidden>
          <AttributesRow>
            <AttributesLabel>Speed & Consumption</AttributesLabel>
            <AttributesValue>13.5 knots / 200,000 l/day</AttributesValue>
          </AttributesRow>
        </AttributesItem>
      </AttributesList>
    </div>
  ),
}

// Story 5: Complete Example - Matches Figma fixture specification design
export const FixtureSpecification: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesGroup label="Involved Parties">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Charterer</AttributesLabel>
              <AttributesValue>ShipCo Ltd</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Broker</AttributesLabel>
              <AttributesValue>Clarksons</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Owner</AttributesLabel>
              <AttributesValue>Acme Ltd</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Vessel" showHiddenLabel="More details" hideLabel="Less details">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Vessel name</AttributesLabel>
              <AttributesValue>Ever Given</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>IMO Number</AttributesLabel>
              <AttributesValue>9811000</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Callsign</AttributesLabel>
              <AttributesValue>H3RC</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Built date</AttributesLabel>
              <AttributesValue>28th September, 2018</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>GRT</AttributesLabel>
              <AttributesValue>220,940 mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Flag</AttributesLabel>
              <AttributesValue>Panama</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Class</AttributesLabel>
              <AttributesValue>G class</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>DWT</AttributesLabel>
              <AttributesValue>99,155 mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Draft</AttributesLabel>
              <AttributesValue>14.5 m</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>LOA/Beam</AttributesLabel>
              <AttributesValue>400 m / 59 m</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Max height</AttributesLabel>
              <AttributesValue>65 m</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Speed & Consumption</AttributesLabel>
              <AttributesValue>13.5 knots / 200,000 l/day</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Voyage">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Load Port</AttributesLabel>
              <AttributesValue>Tubarão, BR</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Discharge Port</AttributesLabel>
              <AttributesValue>Qingdao or Tianjin, CN</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Cargo</AttributesLabel>
              <AttributesValue>Iron Ore + 160,000 mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Laycan</AttributesLabel>
              <AttributesValue>27th October, 2025 - 30th October, 2025</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Financials" showHiddenLabel="More details" hideLabel="Less details">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Freight type</AttributesLabel>
              <AttributesValue>Voyage charter (Spot)</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Freight Rate</AttributesLabel>
              <AttributesValue>25.12 $/mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Demurrage / Despatch</AttributesLabel>
              <AttributesValue>29,000 $/mday</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Address commission</AttributesLabel>
              <AttributesValue>3.75%</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Broker commission</AttributesLabel>
              <AttributesValue>1.25%</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>
      </AttributesList>
    </div>
  ),
}

// Story 6: Mixed - Collapsible + Hidden items in groups
export const MixedFeatures: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesGroup label="Vessel" showHiddenLabel="View all" hideLabel="View less">
          <AttributesItem collapsible defaultOpen={false}>
            <AttributesRow asCollapsibleTrigger>
              <AttributesLabel>Vessel name</AttributesLabel>
              <AttributesValue>
                Ever Given
                <AttributesChevron />
              </AttributesValue>
            </AttributesRow>
            <AttributesContent>
              <Card>
                <CardContent className="p-[var(--space-md)]">
                  <div className="space-y-2 text-body-xsm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Type:</span>
                      <span className="text-body-medium-xsm">Container Ship</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">TEU Capacity:</span>
                      <span className="text-body-medium-xsm">20,124</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-secondary)]">Status:</span>
                      <Badge variant="success" size="sm">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AttributesContent>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>IMO Number</AttributesLabel>
              <AttributesValue>9811000</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Built date</AttributesLabel>
              <AttributesValue>28th September, 2018</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Flag</AttributesLabel>
              <AttributesValue>Panama</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Cargo Details" showHiddenLabel="View all" hideLabel="View less">
          <AttributesItem>
            <AttributesRow>
              <AttributesLabel>Cargo</AttributesLabel>
              <AttributesValue>Iron Ore + 160,000 mt</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem hidden collapsible>
            <AttributesRow asCollapsibleTrigger>
              <AttributesLabel>Loading terms</AttributesLabel>
              <AttributesValue>
                FIOST
                <AttributesChevron />
              </AttributesValue>
            </AttributesRow>
            <AttributesContent>
              <div className="pl-[var(--space-md)] text-body-xsm text-[var(--color-text-secondary)]">
                Free In and Out, Stowed and Trimmed - Charterer bears all cargo handling costs
              </div>
            </AttributesContent>
          </AttributesItem>

          <AttributesItem hidden>
            <AttributesRow>
              <AttributesLabel>Laytime allowed</AttributesLabel>
              <AttributesValue>72 hours</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>
      </AttributesList>
    </div>
  ),
}

// Story 7: Custom Value Content - Complex values with badges and custom components
export const CustomValues: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Status</AttributesLabel>
            <AttributesValue>
              <Badge variant="success" size="sm">Active</Badge>
            </AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Priority</AttributesLabel>
            <AttributesValue>
              <Badge variant="default" size="sm">High</Badge>
            </AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Tags</AttributesLabel>
            <AttributesValue>
              <div className="flex gap-[var(--space-xsm)] flex-wrap">
                <Badge variant="default" size="sm">Urgent</Badge>
                <Badge variant="default" size="sm">Verified</Badge>
                <Badge variant="default" size="sm">Premium</Badge>
              </div>
            </AttributesValue>
          </AttributesRow>
        </AttributesItem>

        <AttributesItem>
          <AttributesRow>
            <AttributesLabel>Compliance</AttributesLabel>
            <AttributesValue>
              <Badge variant="success" size="sm">Compliant</Badge>
            </AttributesValue>
          </AttributesRow>
        </AttributesItem>
      </AttributesList>
    </div>
  ),
}

// Story 8: External Links - Values with external link actions
export const ExternalLinks: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AttributesList>
        <AttributesGroup label="Deal with Acme">
          <AttributesItem>
            <AttributesRow
              externalLink={{
                href: "https://example.com/negotiation",
                label: "Go to negotiation"
              }}
            >
              <AttributesLabel>Negotiation</AttributesLabel>
              <AttributesValue>
                <Badge variant="success" size="sm">Fixed</Badge>
              </AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow
              externalLink={{
                href: "https://example.com/contract",
                label: "Go to contract"
              }}
            >
              <AttributesLabel>Contract</AttributesLabel>
              <AttributesValue>
                <Badge variant="default" size="sm">Working copy</Badge>
              </AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>

        <AttributesSeparator />

        <AttributesGroup label="Documentation">
          <AttributesItem>
            <AttributesRow
              externalLink={{
                href: "https://example.com/registry",
                label: "View vessel details"
              }}
            >
              <AttributesLabel>Vessel registry</AttributesLabel>
              <AttributesValue>IMO 9811000</AttributesValue>
            </AttributesRow>
          </AttributesItem>

          <AttributesItem>
            <AttributesRow
              externalLink={{
                href: "https://example.com/port",
                label: "Port specifications"
              }}
            >
              <AttributesLabel>Port information</AttributesLabel>
              <AttributesValue>Tubarão, BR</AttributesValue>
            </AttributesRow>
          </AttributesItem>
        </AttributesGroup>
      </AttributesList>
    </div>
  ),
}
