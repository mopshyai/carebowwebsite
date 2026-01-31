import { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/legal';
import { cookiePolicy } from '@/data/cookiePolicy';

export const metadata: Metadata = {
  title: 'Cookie Policy - CareBow',
  description: 'How CareBow uses cookies and similar technologies on our website and apps.',
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title={cookiePolicy.title}
      effectiveDate={cookiePolicy.effectiveDate}
    >
      {cookiePolicy.sections.map((section) => (
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
