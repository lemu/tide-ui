import type { Meta, StoryObj } from '@storybook/react'
import { FixtureStatus } from '../components/ui/fixture-status'
import type { StatusValue } from '../components/ui/fixture-status'

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
      options: ['sm', 'md', 'lg'],
    },
    showObject: {
      control: { type: 'boolean' },
    },
    coloredLabel: {
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
      {/* Order Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Order</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="order-draft" />
          <FixtureStatus value="order-distributed" />
          <FixtureStatus value="order-withdrawn" />
        </div>
      </div>

      {/* Negotiation Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Negotiation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="negotiation-indicative-offer" />
          <FixtureStatus value="negotiation-indicative-bid" />
          <FixtureStatus value="negotiation-firm-offer" />
          <FixtureStatus value="negotiation-firm-bid" />
          <FixtureStatus value="negotiation-firm" />
          <FixtureStatus value="negotiation-on-subs" />
          <FixtureStatus value="negotiation-fixed" />
          <FixtureStatus value="negotiation-firm-offer-expired" />
          <FixtureStatus value="negotiation-withdrawn" />
          <FixtureStatus value="negotiation-firm-amendment" />
          <FixtureStatus value="negotiation-subs-expired" />
          <FixtureStatus value="negotiation-subs-failed" />
          <FixtureStatus value="negotiation-on-subs-amendment" />
        </div>
      </div>

      {/* Contract Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Contract</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="contract-draft" />
          <FixtureStatus value="contract-working-copy" />
          <FixtureStatus value="contract-final" />
          <FixtureStatus value="contract-rejected" />
        </div>
      </div>

      {/* Addenda Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Addenda</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="addenda-draft" />
          <FixtureStatus value="addenda-working-copy" />
          <FixtureStatus value="addenda-final" />
        </div>
      </div>

      {/* Recap Manager Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Recap Manager</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="recap-manager-draft" />
          <FixtureStatus value="recap-manager-on-subs" />
          <FixtureStatus value="recap-manager-fully-fixed" />
          <FixtureStatus value="recap-manager-canceled" />
          <FixtureStatus value="recap-manager-failed" />
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h3>
        <FixtureStatus value="negotiation-firm-offer" size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h3>
        <FixtureStatus value="negotiation-firm-offer" size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <FixtureStatus value="negotiation-firm-offer" size="lg" />
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

export const LabelColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Colored Labels (Default)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="order-draft" coloredLabel={true} />
          <FixtureStatus value="negotiation-firm-offer" coloredLabel={true} />
          <FixtureStatus value="contract-final" coloredLabel={true} />
          <FixtureStatus value="negotiation-withdrawn" coloredLabel={true} />
          <FixtureStatus value="negotiation-on-subs" coloredLabel={true} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Black Labels</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FixtureStatus value="order-draft" coloredLabel={false} />
          <FixtureStatus value="negotiation-firm-offer" coloredLabel={false} />
          <FixtureStatus value="contract-final" coloredLabel={false} />
          <FixtureStatus value="negotiation-withdrawn" coloredLabel={false} />
          <FixtureStatus value="negotiation-on-subs" coloredLabel={false} />
        </div>
      </div>
    </div>
  ),
}
