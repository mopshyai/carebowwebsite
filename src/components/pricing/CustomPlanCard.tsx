'use client';

import { customPlan } from '@/data/customPlan';
import { Check, Settings, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export function CustomPlanCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border-2 border-primary-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{customPlan.name}</h3>
          <p className="text-primary-600">{customPlan.tagline}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600">
        {customPlan.description}
      </p>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {customPlan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 py-3 px-6 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors">
          {customPlan.cta}
        </button>
        <button className="flex-1 py-3 px-6 border-2 border-primary-600 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          {customPlan.ctaSecondary}
        </button>
      </div>
    </motion.div>
  );
}
