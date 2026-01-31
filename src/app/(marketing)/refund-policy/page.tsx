import { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { refundPolicy } from '@/data/refundPolicy';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy - CareBow',
  description: 'CareBow refund and cancellation policy. 30-day money-back guarantee on all subscriptions.',
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title={refundPolicy.title}
      effectiveDate={refundPolicy.effectiveDate}
    >
      {refundPolicy.sections.map((section) => (
        <LegalSection
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
        />
      ))}
    </LegalPageLayout>
  );
}
