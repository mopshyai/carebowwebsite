'use client';

import { motion } from 'framer-motion';
import { story } from '@/data/company';
import { Quote } from 'lucide-react';

export function OurStory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {story.headline}
            </h2>

            <div className="space-y-6">
              {story.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Founder Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 left-6 w-12 h-12 text-primary-200" />

              <blockquote className="relative z-10 pl-8">
                <p className="text-xl md:text-2xl text-primary-900 font-medium italic leading-relaxed">
                  &ldquo;{story.founderQuote.text}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {story.founderQuote.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="font-semibold text-gray-900 not-italic">
                      {story.founderQuote.author}
                    </cite>
                    <p className="text-gray-500 text-sm">{story.founderQuote.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
