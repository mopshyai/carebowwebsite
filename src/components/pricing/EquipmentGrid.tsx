'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { equipment } from '@/data/equipment';
import { Wind, HeartPulse, Bed, Accessibility, Cloud, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wind: Wind,
  lungs: Wind, // Using Wind as alternative for lungs
  bed: Bed,
  accessibility: Accessibility,
  'heart-pulse': HeartPulse,
  cloud: Cloud,
  gauge: Gauge,
};

export function EquipmentGrid() {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {equipment.map((item, index) => {
        const Icon = iconMap[item.icon] || Wind;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-primary-500 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              {item.isPopular && (
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                  Popular
                </span>
              )}
            </div>

            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-500 text-xs mt-1">{item.description}</p>

            <div className="flex items-baseline mt-3">
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(item.priceUSD)}
              </span>
              <span className="text-gray-400 text-sm ml-1">/{item.priceUnit}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-green-600 font-medium">{item.deliveryTime} delivery</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
