export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  testsIncluded: number;
  sampleTests: string[];
  priceUSD: number;
  originalPriceUSD: number;
  discount: number;
  icon: string;
  isPopular?: boolean;
  turnaroundTime: string;
}

export const healthPackages: HealthPackage[] = [
  {
    id: 'cardiac',
    name: 'Cardiac Health Package',
    description: 'Complete heart health assessment for seniors',
    testsIncluded: 12,
    sampleTests: ['ECG', 'Lipid Profile', 'Blood Sugar', 'Blood Pressure', 'Chest X-Ray', 'Troponin'],
    priceUSD: 35,
    originalPriceUSD: 50,
    discount: 30,
    icon: 'heart',
    isPopular: true,
    turnaroundTime: '24-48 hours',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Care Package',
    description: 'Comprehensive diabetes screening and monitoring',
    testsIncluded: 15,
    sampleTests: ['HbA1c', 'Fasting Blood Sugar', 'PP Blood Sugar', 'Kidney Function (KFT)', 'Lipid Profile', 'Urine Analysis'],
    priceUSD: 25,
    originalPriceUSD: 35,
    discount: 29,
    icon: 'droplet',
    turnaroundTime: '24 hours',
  },
  {
    id: 'senior-comprehensive',
    name: 'Senior Comprehensive Package',
    description: 'Full body checkup designed for seniors 60+',
    testsIncluded: 78,
    sampleTests: ['CBC', 'LFT', 'KFT', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Bone Profile', 'Iron Studies', 'Lipid Profile'],
    priceUSD: 45,
    originalPriceUSD: 65,
    discount: 31,
    icon: 'clipboard-check',
    isPopular: true,
    turnaroundTime: '48-72 hours',
  },
  {
    id: 'neuro',
    name: 'Neuro Assessment Package',
    description: 'Brain and nervous system health assessment',
    testsIncluded: 10,
    sampleTests: ['MRI Brain', 'EEG', 'Nerve Conduction Study', 'Cognitive Assessment', 'Vitamin B12'],
    priceUSD: 80,
    originalPriceUSD: 120,
    discount: 33,
    icon: 'brain',
    turnaroundTime: '3-5 days',
  },
  {
    id: 'arthritis',
    name: 'Arthritis & Joint Package',
    description: 'Joint health and arthritis screening',
    testsIncluded: 14,
    sampleTests: ['RA Factor', 'CRP', 'Uric Acid', 'Calcium', 'Vitamin D', 'X-Ray Joints'],
    priceUSD: 30,
    originalPriceUSD: 45,
    discount: 33,
    icon: 'bone',
    turnaroundTime: '24-48 hours',
  },
];
