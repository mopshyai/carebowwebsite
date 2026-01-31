"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your health data is protected with enterprise-grade security",
  },
  {
    icon: Lock,
    title: "Encrypted Data",
    description: "All personal information is encrypted at rest and in transit",
  },
  {
    icon: FileCheck,
    title: "Verified Providers",
    description: "Every caregiver is background-checked and credential-verified",
  },
];

export default function TrustSection() {
  return (
    <section className="py-12 lg:py-16 bg-primary-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Your family's privacy is sacred
          </h2>
          <p className="text-gray-600">
            We take security and trust seriously
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <item.icon className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
