export interface Equipment {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  priceUnit: 'month' | 'week' | 'day';
  icon: string;
  tags: string[];
  deliveryTime: string;
  isPopular?: boolean;
  deposit?: number;
}

export const equipment: Equipment[] = [
  {
    id: 'oxygen-concentrator',
    name: 'Oxygen Concentrator',
    description: '5L/min medical grade oxygen concentrator',
    priceUSD: 55,
    priceUnit: 'month',
    icon: 'wind',
    tags: ['Free delivery', 'Setup included', 'Training provided'],
    deliveryTime: 'Same day',
    isPopular: true,
  },
  {
    id: 'bipap',
    name: 'BiPAP Machine',
    description: 'For sleep apnea and respiratory support',
    priceUSD: 65,
    priceUnit: 'month',
    icon: 'lungs',
    tags: ['Free delivery', 'Mask included', 'Training included'],
    deliveryTime: 'Next day',
  },
  {
    id: 'cpap',
    name: 'CPAP Machine',
    description: 'Continuous positive airway pressure device',
    priceUSD: 55,
    priceUnit: 'month',
    icon: 'lungs',
    tags: ['Free delivery', 'Mask included'],
    deliveryTime: 'Same day',
  },
  {
    id: 'hospital-bed',
    name: 'Hospital Bed',
    description: 'Adjustable electric medical bed with rails',
    priceUSD: 40,
    priceUnit: 'month',
    icon: 'bed',
    tags: ['Free delivery', 'Setup included', 'Mattress included'],
    deliveryTime: 'Same day',
    isPopular: true,
  },
  {
    id: 'wheelchair',
    name: 'Wheelchair',
    description: 'Foldable, lightweight wheelchair for easy mobility',
    priceUSD: 20,
    priceUnit: 'month',
    icon: 'accessibility',
    tags: ['Free delivery', 'Cushion included'],
    deliveryTime: 'Same day',
  },
  {
    id: 'cardiac-monitor',
    name: 'Cardiac Monitor',
    description: '24/7 heart rate and rhythm monitoring device',
    priceUSD: 45,
    priceUnit: 'month',
    icon: 'heart-pulse',
    tags: ['Free delivery', '24/7 monitoring support'],
    deliveryTime: 'Same day',
  },
  {
    id: 'nebulizer',
    name: 'Nebulizer',
    description: 'For respiratory medication delivery',
    priceUSD: 15,
    priceUnit: 'month',
    icon: 'cloud',
    tags: ['Free delivery', 'Masks included'],
    deliveryTime: 'Same day',
  },
  {
    id: 'bp-monitor',
    name: 'BP Monitor (Digital)',
    description: 'Automatic blood pressure monitoring device',
    priceUSD: 10,
    priceUnit: 'month',
    icon: 'gauge',
    tags: ['Free delivery', 'Easy to use'],
    deliveryTime: 'Same day',
  },
];
