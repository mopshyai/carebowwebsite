import {
  HeroSection,
  ProblemSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  TrustSection,
  CTASection,
} from "@/components/marketing";

export const metadata = {
  title: "Carebow - Healthcare Guidance for Your Loved Ones",
  description:
    "AI-powered health insights, emergency safety features, and trusted care services — all in one place. Care for aging parents with confidence.",
  keywords:
    "healthcare, elderly care, family health, symptom checker, AI health, caregiver, India healthcare",
  openGraph: {
    title: "Carebow - Healthcare Guidance for Your Loved Ones",
    description:
      "AI-powered health insights, emergency safety features, and trusted care services for families.",
    url: "https://carebow.com",
    siteName: "Carebow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carebow - Healthcare Guidance for Your Loved Ones",
    description:
      "AI-powered health insights, emergency safety features, and trusted care services for families.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <TrustSection />
      <CTASection />
    </>
  );
}
