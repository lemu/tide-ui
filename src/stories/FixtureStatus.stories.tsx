import type { Meta, StoryObj } from '@storybook/react'
import { FixtureStatus } from '../components/product/fixture-status'
import type { StatusValue } from '../components/product/fixture-status'

const meta: Meta<typeof FixtureStatus> = {
  title: 'NPM • Product Components/FixtureStatus',
  component: FixtureStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'select' },
      options: [
        // Order statuses
        'order-draft',
        'order-distributed',
        'order-withdrawn',
        // Negotiation statuses
        'negotiation-indicative-offer',
        'negotiation-indicative-bid',
        'negotiation-firm-offer',
        'negotiation-firm-bid',
        'negotiation-firm',
        'negotiation-on-subs',
        'negotiation-fixed',
        'negotiation-firm-offer-expired',
        'negotiation-withdrawn',
        'negotiation-firm-amendment',
        'negotiation-subs-expired',
        'negotiation-subs-failed',
        'negotiation-on-subs-amendment',
        // Contract statuses
        'contract-draft',
        'contract-working-copy',
        'contract-final',
        'contract-rejected',
        // Addenda statuses
        'addenda-draft',
        'addenda-working-copy',
        'addenda-final',
        // Recap Manager statuses
        'recap-manager-draft',
        'recap-manager-on-subs',
        'recap-manager-fully-fixed',
        'recap-manager-canceled',
        'recap-manager-failed',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l'],
    },
    showObject: {
      control: { type: 'boolean' },
    },
    asBadge: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof FixtureStatus>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'order-draft',
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {(['xs', 's', 'm', 'l'] as const).map((size) => (
        <div key={size}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
            Size: {size}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Order Statuses */}
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Order</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FixtureStatus value="order-draft" size={size} />
                <FixtureStatus value="order-distributed" size={size} />
                <FixtureStatus value="order-withdrawn" size={size} />
              </div>
            </div>

            {/* Negotiation Statuses */}
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Negotiation</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FixtureStatus value="negotiation-indicative-offer" size={size} />
                <FixtureStatus value="negotiation-indicative-bid" size={size} />
                <FixtureStatus value="negotiation-firm-offer" size={size} />
                <FixtureStatus value="negotiation-firm-bid" size={size} />
                <FixtureStatus value="negotiation-firm" size={size} />
                <FixtureStatus value="negotiation-on-subs" size={size} />
                <FixtureStatus value="negotiation-fixed" size={size} />
                <FixtureStatus value="negotiation-firm-offer-expired" size={size} />
                <FixtureStatus value="negotiation-withdrawn" size={size} />
                <FixtureStatus value="negotiation-firm-amendment" size={size} />
                <FixtureStatus value="negotiation-subs-expired" size={size} />
                <FixtureStatus value="negotiation-subs-failed" size={size} />
                <FixtureStatus value="negotiation-on-subs-amendment" size={size} />
              </div>
            </div>

            {/* Contract Statuses */}
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Contract</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FixtureStatus value="contract-draft" size={size} />
                <FixtureStatus value="contract-working-copy" size={size} />
                <FixtureStatus value="contract-final" size={size} />
                <FixtureStatus value="contract-rejected" size={size} />
              </div>
            </div>

            {/* Addenda Statuses */}
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Addenda</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FixtureStatus value="addenda-draft" size={size} />
                <FixtureStatus value="addenda-working-copy" size={size} />
                <FixtureStatus value="addenda-final" size={size} />
              </div>
            </div>

            {/* Recap Manager Statuses */}
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Recap Manager</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FixtureStatus value="recap-manager-draft" size={size} />
                <FixtureStatus value="recap-manager-on-subs" size={size} />
                <FixtureStatus value="recap-manager-fully-fixed" size={size} />
                <FixtureStatus value="recap-manager-canceled" size={size} />
                <FixtureStatus value="recap-manager-failed" size={size} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Extra Small</h3>
        <FixtureStatus value="negotiation-firm-offer" size="xs" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <FixtureStatus value="negotiation-firm-offer" size="s" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h3>
        <FixtureStatus value="negotiation-firm-offer" size="m" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <FixtureStatus value="negotiation-firm-offer" size="l" />
      </div>
    </div>
  ),
}

export const WithoutObjectLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
      <FixtureStatus value="order-draft" showObject={false} />
      <FixtureStatus value="negotiation-firm-offer" showObject={false} />
      <FixtureStatus value="contract-final" showObject={false} />
      <FixtureStatus value="addenda-working-copy" showObject={false} />
      <FixtureStatus value="recap-manager-fully-fixed" showObject={false} />
    </div>
  ),
}

export const AsBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Status as Badge</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge />
          <FixtureStatus value="negotiation-firm-offer" asBadge />
          <FixtureStatus value="negotiation-firm" asBadge />
          <FixtureStatus value="negotiation-on-subs" asBadge />
          <FixtureStatus value="contract-final" asBadge />
          <FixtureStatus value="negotiation-withdrawn" asBadge />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>With Object Label</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge showObject />
          <FixtureStatus value="negotiation-firm-offer" asBadge showObject />
          <FixtureStatus value="contract-final" asBadge showObject />
        </div>
      </div>
    </div>
  ),
}

export const AsBadgeSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Extra Small</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge size="xs" />
          <FixtureStatus value="negotiation-firm-offer" asBadge size="xs" />
          <FixtureStatus value="contract-final" asBadge size="xs" />
          <FixtureStatus value="negotiation-on-subs" asBadge size="xs" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge size="s" />
          <FixtureStatus value="negotiation-firm-offer" asBadge size="s" />
          <FixtureStatus value="contract-final" asBadge size="s" />
          <FixtureStatus value="negotiation-on-subs" asBadge size="s" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge size="m" />
          <FixtureStatus value="negotiation-firm-offer" asBadge size="m" />
          <FixtureStatus value="contract-final" asBadge size="m" />
          <FixtureStatus value="negotiation-on-subs" asBadge size="m" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" asBadge size="l" />
          <FixtureStatus value="negotiation-firm-offer" asBadge size="l" />
          <FixtureStatus value="contract-final" asBadge size="l" />
          <FixtureStatus value="negotiation-on-subs" asBadge size="l" />
        </div>
      </div>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {/* Order Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Order (Icon Only)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="order-draft" iconOnly />
          <FixtureStatus value="order-distributed" iconOnly />
          <FixtureStatus value="order-withdrawn" iconOnly />
        </div>
      </div>

      {/* Negotiation Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Negotiation (Icon Only)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="negotiation-indicative-offer" iconOnly />
          <FixtureStatus value="negotiation-indicative-bid" iconOnly />
          <FixtureStatus value="negotiation-firm-offer" iconOnly />
          <FixtureStatus value="negotiation-firm-bid" iconOnly />
          <FixtureStatus value="negotiation-firm" iconOnly />
          <FixtureStatus value="negotiation-on-subs" iconOnly />
          <FixtureStatus value="negotiation-fixed" iconOnly />
          <FixtureStatus value="negotiation-firm-offer-expired" iconOnly />
          <FixtureStatus value="negotiation-withdrawn" iconOnly />
          <FixtureStatus value="negotiation-firm-amendment" iconOnly />
          <FixtureStatus value="negotiation-subs-expired" iconOnly />
          <FixtureStatus value="negotiation-subs-failed" iconOnly />
          <FixtureStatus value="negotiation-on-subs-amendment" iconOnly />
        </div>
      </div>

      {/* Contract Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Contract (Icon Only)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="contract-draft" iconOnly />
          <FixtureStatus value="contract-working-copy" iconOnly />
          <FixtureStatus value="contract-final" iconOnly />
          <FixtureStatus value="contract-rejected" iconOnly />
        </div>
      </div>

      {/* Addenda Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Addenda (Icon Only)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="addenda-draft" iconOnly />
          <FixtureStatus value="addenda-working-copy" iconOnly />
          <FixtureStatus value="addenda-final" iconOnly />
        </div>
      </div>

      {/* Recap Manager Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Recap Manager (Icon Only)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="recap-manager-draft" iconOnly />
          <FixtureStatus value="recap-manager-on-subs" iconOnly />
          <FixtureStatus value="recap-manager-fully-fixed" iconOnly />
          <FixtureStatus value="recap-manager-canceled" iconOnly />
          <FixtureStatus value="recap-manager-failed" iconOnly />
        </div>
      </div>
    </div>
  ),
}

export const IconOnlySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Extra Small</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="negotiation-firm-offer" size="xs" iconOnly />
          <FixtureStatus value="negotiation-firm" size="xs" iconOnly />
          <FixtureStatus value="negotiation-fixed" size="xs" iconOnly />
          <FixtureStatus value="contract-final" size="xs" iconOnly />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="negotiation-firm-offer" size="s" iconOnly />
          <FixtureStatus value="negotiation-firm" size="s" iconOnly />
          <FixtureStatus value="negotiation-fixed" size="s" iconOnly />
          <FixtureStatus value="contract-final" size="s" iconOnly />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="negotiation-firm-offer" size="m" iconOnly />
          <FixtureStatus value="negotiation-firm" size="m" iconOnly />
          <FixtureStatus value="negotiation-fixed" size="m" iconOnly />
          <FixtureStatus value="contract-final" size="m" iconOnly />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <FixtureStatus value="negotiation-firm-offer" size="l" iconOnly />
          <FixtureStatus value="negotiation-firm" size="l" iconOnly />
          <FixtureStatus value="negotiation-fixed" size="l" iconOnly />
          <FixtureStatus value="contract-final" size="l" iconOnly />
        </div>
      </div>
    </div>
  ),
}

export const IconOnlyWithoutObjectLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '24px' }}>
      <FixtureStatus value="order-draft" iconOnly showObject={false} />
      <FixtureStatus value="negotiation-firm-offer" iconOnly showObject={false} />
      <FixtureStatus value="contract-final" iconOnly showObject={false} />
      <FixtureStatus value="addenda-working-copy" iconOnly showObject={false} />
      <FixtureStatus value="recap-manager-fully-fixed" iconOnly showObject={false} />
    </div>
  ),
}

const allStatusValues: StatusValue[] = [
  // Order
  'order-draft', 'order-distributed', 'order-withdrawn',
  // Negotiation
  'negotiation-indicative-offer', 'negotiation-indicative-bid', 'negotiation-firm-offer',
  'negotiation-firm-bid', 'negotiation-firm', 'negotiation-on-subs', 'negotiation-fixed',
  'negotiation-firm-offer-expired', 'negotiation-withdrawn', 'negotiation-firm-amendment',
  'negotiation-subs-expired', 'negotiation-subs-failed', 'negotiation-on-subs-amendment',
  // Contract
  'contract-draft', 'contract-working-copy', 'contract-final', 'contract-rejected',
  // Addenda
  'addenda-draft', 'addenda-working-copy', 'addenda-final',
  // Recap Manager
  'recap-manager-draft', 'recap-manager-on-subs', 'recap-manager-fully-fixed',
  'recap-manager-canceled', 'recap-manager-failed',
]

export const AllStatusesAsBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {(['xs', 's', 'm', 'l'] as const).map((size) => (
        <div key={size}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
            Size: {size}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {allStatusValues.map((value) => (
              <FixtureStatus key={value} value={value} size={size} asBadge />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
