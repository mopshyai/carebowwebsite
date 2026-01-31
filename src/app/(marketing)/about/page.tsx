import { Metadata } from 'next';
import {
  AboutHero,
  OurStory,
  ValuesSection,
  StatsSection,
  TeamSection,
  JoinUsSection,
  ContactSection,
} from '@/components/about';

export const metadata: Metadata = {
  title: 'About Us - CareBow',
  description: "Learn about CareBow's mission to help families care for their elderly loved ones, meet our team, and discover our values.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
      <JoinUsSection />
      <ContactSection />
    </main>
  );
}
