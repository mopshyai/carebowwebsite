import { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { disclaimer } from '@/data/disclaimer';

export const metadata: Metadata = {
  title: 'Medical Disclaimer - CareBow',
  description: 'CareBow Medical Disclaimer. Important information about AI health guidance and its limitations.',
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout
      title={disclaimer.title}
      effectiveDate={disclaimer.effectiveDate}
    >
      {disclaimer.sections.map((section) => (
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
