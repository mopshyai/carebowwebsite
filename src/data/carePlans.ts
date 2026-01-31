export interface CarePlan {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  originalPriceUSD?: number;
  discount?: number;
  billingPeriod: 'month' | '6-month' | 'year';
  pricePerMonth?: number;
  pricePerDay: number;
  description: string;
  features: string[];
  checkInFrequency: string;
  familyUpdateFrequency: string;
  has24x7Support: boolean;
  hasAssistedVisits: boolean;
  hasDedicatedCoordinator: boolean;
  isPopular?: boolean;
  isBestValue?: boolean;
  color: string;
  icon: string;
}

export const carePlans: CarePlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    tagline: 'Best for short-term',
    priceUSD: 30,
    billingPeriod: 'month',
    pricePerDay: 1.00,
    description: 'Perfect for immediate and short-term care solutions.',
    features: [
      'Weekly check-in calls and wellbeing monitoring',
      'Weekly wellbeing updates to family members',
      'Medication reminders and routine follow-ups',
      'Access to local caregivers and trained companions',
      'Doctor appointment scheduling and coordination',
      'Emergency support coordination when required',
      'Dedicated CareBow coordinator',
    ],
    checkInFrequency: 'Once a Week',
    familyUpdateFrequency: 'Once a Week',
    has24x7Support: false,
    hasAssistedVisits: false,
    hasDedicatedCoordinator: true,
    color: '#0D4F52',
    icon: 'calendar',
  },
  {
    id: '6-month',
    name: '6-Month Plan',
    tagline: 'Most Popular',
    priceUSD: 150,
    originalPriceUSD: 180,
    discount: 17,
    billingPeriod: '6-month',
    pricePerMonth: 25,
    pricePerDay: 0.83,
    isPopular: true,
    description: 'Perfect for families seeking consistent care and exclusive health access.',
    features: [
      'Everything in Monthly Plan, plus:',
      'Twice a week check-in calls and wellbeing monitoring',
      'Twice a week wellbeing updates to family members',
      'Priority doctor visit coordination and faster response times',
      'Dedicated care coordinator managing day-to-day needs',
      'Fortnightly detailed care reports shared with family',
      'Assisted medical visits when required',
      'Ongoing health monitoring and follow-up reminders',
      '24/7 access to care support',
    ],
    checkInFrequency: 'Twice a Week',
    familyUpdateFrequency: 'Twice a Week',
    has24x7Support: true,
    hasAssistedVisits: true,
    hasDedicatedCoordinator: true,
    color: '#8B5CF6',
    icon: 'star',
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    tagline: 'Best Value',
    priceUSD: 300,
    originalPriceUSD: 360,
    discount: 17,
    billingPeriod: 'year',
    pricePerMonth: 25,
    pricePerDay: 0.82,
    isBestValue: true,
    description: 'Ideal for families seeking comprehensive, long-term support.',
    features: [
      'All 6-Month Plan benefits, plus:',
      'Daily check-in calls and wellbeing monitoring',
      'Daily wellbeing updates shared with family',
      'Priority emergency support and response',
      'Monthly care summary with detailed notes and updates',
    ],
    checkInFrequency: 'Daily',
    familyUpdateFrequency: 'Daily',
    has24x7Support: true,
    hasAssistedVisits: true,
    hasDedicatedCoordinator: true,
    color: '#EA580C',
    icon: 'crown',
  },
];
