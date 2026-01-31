'use client';

import { motion } from 'framer-motion';
import { company } from '@/data/company';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-600 mt-4">
              Have questions? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* General Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">General Inquiries</h3>
              <a
                href={`mailto:${company.email}`}
                className="text-primary-600 hover:underline mt-2 block"
              >
                {company.email}
              </a>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Support</h3>
              <a
                href={`mailto:${company.supportEmail}`}
                className="text-primary-600 hover:underline mt-2 block"
              >
                {company.supportEmail}
              </a>
            </motion.div>

            {/* Headquarters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Headquarters</h3>
              <p className="text-gray-600 mt-2">{company.headquarters}</p>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 mb-4">Follow us</p>
            <div className="flex justify-center gap-4">
              {Object.entries(company.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors capitalize text-gray-600 hover:text-primary-600 font-medium"
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
