'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { stats } from '@/data/company';
import { Users, Globe, Phone, Star, Clock, Zap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  globe: Globe,
  phone: Phone,
  star: Star,
  clock: Clock,
  zap: Zap,
};

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return { count, ref };
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = iconMap[stat.icon] || Users;
  const numericValue = parseInt(stat.number.replace(/[^0-9]/g, '')) || 0;
  const { count, ref } = useCounter(numericValue);
  const hasPlus = stat.number.includes('+');
  const isSpecial = stat.number.includes('/');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary-200" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white">
        {isSpecial ? stat.number : (
          <>
            {count.toLocaleString()}
            {hasPlus && '+'}
            {stat.suffix}
          </>
        )}
      </div>
      <div className="text-primary-200 mt-2">{stat.label}</div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            CareBow by the Numbers
          </h2>
          <p className="text-primary-100 mt-4">
            Trusted by families worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
