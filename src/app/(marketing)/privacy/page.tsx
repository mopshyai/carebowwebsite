import { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { privacyPolicy } from '@/data/privacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy - CareBow',
  description: 'CareBow Privacy Policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title={privacyPolicy.title}
      effectiveDate={privacyPolicy.effectiveDate}
    >
      {privacyPolicy.sections.map((section) => (
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
