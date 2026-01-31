import { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { termsOfService } from '@/data/termsOfService';

export const metadata: Metadata = {
  title: 'Terms of Service - CareBow',
  description: 'CareBow Terms of Service. Read our terms and conditions for using the CareBow platform.',
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title={termsOfService.title}
      effectiveDate={termsOfService.effectiveDate}
    >
      {termsOfService.sections.map((section) => (
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
