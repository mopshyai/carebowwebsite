'use client';

import { motion } from 'framer-motion';
import { mission } from '@/data/company';

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pt-32 pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            About CareBow
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {mission.statement}
          </h1>

          <p className="text-xl text-primary-100 mt-6 max-w-2xl mx-auto">
            {mission.vision}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
