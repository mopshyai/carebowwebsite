'use client';

import { motion } from 'framer-motion';
import { Briefcase, Heart, Rocket, Coffee } from 'lucide-react';
import Link from 'next/link';

const perks = [
  { icon: Heart, title: 'Mission-Driven', description: 'Work that actually helps families' },
  { icon: Rocket, title: 'Fast Growth', description: 'Join an early-stage rocket ship' },
  { icon: Coffee, title: 'Remote-First', description: 'Work from anywhere in India' },
  { icon: Briefcase, title: 'Equity', description: 'Own a piece of CareBow' },
];

export function JoinUsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              We&apos;re Hiring!
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Join Us in Transforming Elder Care
            </h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              We&apos;re looking for passionate people who want to make a real difference in the lives of millions of families.
            </p>
          </motion.div>

          {/* Perks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <perk.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{perk.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{perk.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <Briefcase className="w-5 h-5" />
              View Open Positions
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              Don&apos;t see a role? Email us at{' '}
              <a href="mailto:careers@carebow.com" className="text-primary-600 hover:underline">
                careers@carebow.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
