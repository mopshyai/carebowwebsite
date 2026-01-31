'use client';

import { useCurrency } from '@/context/CurrencyContext';
import { askCareBowPlan } from '@/data/aiPlan';
import { Sparkles, Clock, Brain, Shield, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIPlanCard() {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{askCareBowPlan.name}</h3>
          <p className="text-purple-200">{askCareBowPlan.tagline}</p>
        </div>
      </div>

      <div className="flex items-baseline mt-6">
        <span className="text-5xl font-bold">
          {formatPrice(askCareBowPlan.priceUSD)}
        </span>
        <span className="text-purple-200 ml-2">/month</span>
      </div>

      <p className="mt-4 text-purple-100">
        {askCareBowPlan.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">24/7</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Brain className="w-4 h-4" />
          <span className="text-sm">AI-Powered</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Shield className="w-4 h-4" />
          <span className="text-sm">Emergency Alerts</span>
        </div>
      </div>

      {/* Features */}
      <ul className="mt-6 space-y-2">
        {askCareBowPlan.features.slice(0, 5).map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-purple-100">
            <Check className="w-4 h-4 text-purple-300 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <button className="w-full mt-8 py-4 px-6 bg-white text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
        {askCareBowPlan.cta}
      </button>

      <p className="text-center text-purple-200 text-sm mt-3">
        {askCareBowPlan.trialDays}-day free trial • No credit card required
      </p>
    </motion.div>
  );
}
