import type { Meta, StoryObj } from '@storybook/react'
import { Status } from '../components/ui/status'
import type { StatusValue } from '../components/ui/status'

const meta: Meta<typeof Status> = {
  title: 'NPM • Product Components/Status',
  component: Status,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
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
} satisfies Meta<typeof Status>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    status: 'order-draft',
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', padding: '24px' }}>
      {/* Order Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Order</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="order-draft" />
          <Status status="order-distributed" />
          <Status status="order-withdrawn" />
        </div>
      </div>

      {/* Negotiation Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Negotiation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="negotiation-indicative-offer" />
          <Status status="negotiation-indicative-bid" />
          <Status status="negotiation-firm-offer" />
          <Status status="negotiation-firm-bid" />
          <Status status="negotiation-firm" />
          <Status status="negotiation-on-subs" />
          <Status status="negotiation-fixed" />
          <Status status="negotiation-firm-offer-expired" />
          <Status status="negotiation-withdrawn" />
          <Status status="negotiation-firm-amendment" />
          <Status status="negotiation-subs-expired" />
          <Status status="negotiation-subs-failed" />
          <Status status="negotiation-on-subs-amendment" />
        </div>
      </div>

      {/* Contract Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Contract</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="contract-draft" />
          <Status status="contract-working-copy" />
          <Status status="contract-final" />
          <Status status="contract-rejected" />
        </div>
      </div>

      {/* Addenda Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Addenda</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="addenda-draft" />
          <Status status="addenda-working-copy" />
          <Status status="addenda-final" />
        </div>
      </div>

      {/* Recap Manager Statuses */}
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Recap Manager</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="recap-manager-draft" />
          <Status status="recap-manager-on-subs" />
          <Status status="recap-manager-fully-fixed" />
          <Status status="recap-manager-canceled" />
          <Status status="recap-manager-failed" />
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
        <Status status="negotiation-firm-offer" size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h3>
        <Status status="negotiation-firm-offer" size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h3>
        <Status status="negotiation-firm-offer" size="lg" />
      </div>
    </div>
  ),
}

export const WithoutObjectLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
      <Status status="order-draft" showObject={false} />
      <Status status="negotiation-firm-offer" showObject={false} />
      <Status status="contract-final" showObject={false} />
      <Status status="addenda-working-copy" showObject={false} />
      <Status status="recap-manager-fully-fixed" showObject={false} />
    </div>
  ),
}

export const LabelColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Colored Labels (Default)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="order-draft" coloredLabel={true} />
          <Status status="negotiation-firm-offer" coloredLabel={true} />
          <Status status="contract-final" coloredLabel={true} />
          <Status status="negotiation-withdrawn" coloredLabel={true} />
          <Status status="negotiation-on-subs" coloredLabel={true} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Black Labels</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status status="order-draft" coloredLabel={false} />
          <Status status="negotiation-firm-offer" coloredLabel={false} />
          <Status status="contract-final" coloredLabel={false} />
          <Status status="negotiation-withdrawn" coloredLabel={false} />
          <Status status="negotiation-on-subs" coloredLabel={false} />
        </div>
      </div>
    </div>
  ),
}
