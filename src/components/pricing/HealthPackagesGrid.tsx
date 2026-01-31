'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { healthPackages } from '@/data/healthPackages';
import { Heart, Droplet, ClipboardCheck, Brain, Bone } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  droplet: Droplet,
  'clipboard-check': ClipboardCheck,
  brain: Brain,
  bone: Bone,
};

export function HealthPackagesGrid() {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {healthPackages.map((pkg, index) => {
        const Icon = iconMap[pkg.icon] || Heart;

        return (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Icon className="w-6 h-6 text-emerald-600" />
              </div>
              {pkg.isPopular && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                  Popular
                </span>
              )}
            </div>

            <h3 className="font-semibold text-gray-900 mt-4">{pkg.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{pkg.description}</p>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-sm">
                  {formatPrice(pkg.originalPriceUSD)}
                </span>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                  {pkg.discount}% OFF
                </span>
              </div>
              <div className="flex items-baseline mt-1">
                <span className="text-2xl font-bold text-emerald-600">
                  {formatPrice(pkg.priceUSD)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">{pkg.testsIncluded} tests included:</p>
              <div className="flex flex-wrap gap-1">
                {pkg.sampleTests.slice(0, 4).map((test, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {test}
                  </span>
                ))}
                {pkg.sampleTests.length > 4 && (
                  <span className="text-gray-400 text-xs py-1">
                    +{pkg.sampleTests.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-gray-500">Results: {pkg.turnaroundTime}</span>
              <button className="text-emerald-600 font-medium hover:underline">
                Book Now →
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
