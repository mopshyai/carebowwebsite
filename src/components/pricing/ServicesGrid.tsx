'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { services } from '@/data/services';
import { Stethoscope, Video, FlaskConical, HeartPulse, Users, Activity, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  video: Video,
  flask: FlaskConical,
  'heart-pulse': HeartPulse,
  users: Users,
  activity: Activity,
  sun: Sun,
};

export function ServicesGrid() {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = iconMap[service.icon] || Stethoscope;

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary-500 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              {service.isPopular && (
                <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded">
                  Popular
                </span>
              )}
            </div>

            <h3 className="font-semibold text-gray-900 mt-4">{service.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{service.description}</p>

            <div className="flex items-baseline mt-4">
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(service.priceUSD)}
              </span>
              <span className="text-gray-400 ml-1">/{service.priceUnit}</span>
            </div>

            {service.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
