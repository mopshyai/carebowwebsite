"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in seconds. Add your family members and their health profiles.",
    color: "primary",
  },
  {
    number: "02",
    title: "Describe Symptoms",
    description: "Tell Carebow AI what's happening. Answer a few questions about the symptoms.",
    color: "secondary",
  },
  {
    number: "03",
    title: "Get Guidance",
    description: "Receive personalized recommendations. Book services if needed.",
    color: "primary",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started with Carebow takes just a few minutes
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-xl font-bold text-white ${
                      step.color === "primary" ? "bg-primary-700" : "bg-secondary"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Connector dot */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-8 w-2 h-2 bg-gray-300 rounded-full -translate-y-1/2" />
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/register">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Get Started Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
