export interface Service {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceUnit: string;
  category: 'healthcare' | 'diagnostics' | 'care' | 'wellness';
  icon: string;
  isPopular?: boolean;
  is24x7?: boolean;
  tags?: string[];
}

export const services: Service[] = [
  {
    id: 'doctor-visit',
    name: 'Doctor Visit (Home)',
    description: 'Qualified physician visits your home for consultation and checkup',
    priceUSD: 15,
    priceUnit: 'visit',
    category: 'healthcare',
    icon: 'stethoscope',
    isPopular: true,
    tags: ['Same day available', 'Prescription included'],
  },
  {
    id: 'video-consult',
    name: 'Video Consultation',
    description: 'Talk to a doctor online via video call from anywhere',
    priceUSD: 10,
    priceUnit: 'session',
    category: 'healthcare',
    icon: 'video',
    tags: ['Instant booking', '15-30 min'],
  },
  {
    id: 'lab-tests',
    name: 'Lab Tests (Home Collection)',
    description: 'Sample collection from home with digital reports',
    priceUSD: 5,
    priceUnit: 'test',
    category: 'diagnostics',
    icon: 'flask',
    isPopular: true,
    tags: ['Home collection', 'Reports in 24hrs'],
  },
  {
    id: 'nursing-care',
    name: 'Nursing Care',
    description: 'Professional trained nurses for medical care at home',
    priceUSD: 8,
    priceUnit: '4 hours',
    category: 'care',
    icon: 'heart-pulse',
    is24x7: true,
    tags: ['Trained nurses', '24/7 available'],
  },
  {
    id: 'caregiver',
    name: 'Caregiver / Companion',
    description: 'Trained companion for daily assistance and company',
    priceUSD: 6,
    priceUnit: 'hour',
    category: 'care',
    icon: 'users',
    tags: ['Background verified', 'Trained'],
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    description: 'At-home physical therapy sessions for recovery and mobility',
    priceUSD: 12,
    priceUnit: 'session',
    category: 'wellness',
    icon: 'activity',
    tags: ['Certified therapists', '45-60 min'],
  },
  {
    id: 'yoga',
    name: 'Yoga & Meditation',
    description: 'Gentle yoga and meditation sessions for seniors',
    priceUSD: 8,
    priceUnit: 'session',
    category: 'wellness',
    icon: 'sun',
    tags: ['Senior-friendly', 'Group or 1-on-1'],
  },
];
