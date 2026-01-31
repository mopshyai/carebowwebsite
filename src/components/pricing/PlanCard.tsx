'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { CarePlan } from '@/data/carePlans';
import { Check, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: CarePlan;
  onSelect: (planId: string) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${
        plan.isPopular
          ? 'border-purple-500 shadow-lg lg:scale-105'
          : plan.isBestValue
            ? 'border-orange-500'
            : 'border-gray-200 hover:border-primary-500'
      }`}
    >
      {/* Accent bar */}
      <div
        className="h-2 w-full"
        style={{ backgroundColor: plan.color }}
      />

      {/* Popular/Best Value Badge */}
      {plan.isPopular && (
        <div className="absolute top-6 right-4">
          <span className="inline-flex items-center gap-1 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </span>
        </div>
      )}
      {plan.isBestValue && (
        <div className="absolute top-6 right-4">
          <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Crown className="w-3 h-3" />
            Best Value
          </span>
        </div>
      )}

      <div className="p-6 lg:p-8">
        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <p className="text-gray-500 mt-1">{plan.tagline}</p>

        {/* Price */}
        <div className="mt-6">
          {plan.originalPriceUSD && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-lg">
                {formatPrice(plan.originalPriceUSD)}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                {plan.discount}% OFF
              </span>
            </div>
          )}
          <div className="flex items-baseline mt-1">
            <span
              className="text-4xl lg:text-5xl font-bold"
              style={{ color: plan.color }}
            >
              {formatPrice(plan.priceUSD)}
            </span>
            <span className="text-gray-500 ml-2">
              /{plan.billingPeriod === '6-month' ? '6 months' : plan.billingPeriod}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            ~{formatPrice(plan.pricePerDay)}/day
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm">
          {plan.description}
        </p>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                style={{ color: plan.color }}
              />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Key highlights */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Check-ins</span>
              <p className="font-semibold text-gray-900">{plan.checkInFrequency}</p>
            </div>
            <div>
              <span className="text-gray-400">24/7 Support</span>
              <p className="font-semibold text-gray-900">
                {plan.has24x7Support ? '✓ Yes' : '✗ No'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => onSelect(plan.id)}
          className="w-full mt-8 py-4 px-6 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: plan.color }}
        >
          Choose {plan.name}
        </button>
      </div>
    </motion.div>
  );
}
