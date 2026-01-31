"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UserPlus, MessageSquare, Stethoscope, CalendarCheck } from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds with your email or phone number. It's completely free to get started.",
    details: [
      "Quick registration process",
      "No credit card required",
      "Add multiple family members"
    ],
    color: "primary"
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Describe What's Happening",
    description: "Tell Carebow AI about symptoms or concerns in simple language. Just like talking to a doctor.",
    details: [
      "Natural conversation style",
      "Follow-up questions for clarity",
      "Context-aware responses"
    ],
    color: "secondary"
  },
  {
    number: "03",
    icon: Stethoscope,
    title: "Get Personalized Guidance",
    description: "Receive AI-powered recommendations based on symptoms, medical history, and urgency level.",
    details: [
      "Severity assessment",
      "Care recommendations",
      "Emergency detection"
    ],
    color: "primary"
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Book Services if Needed",
    description: "Connect with verified healthcare providers for home visits, consultations, or lab tests.",
    details: [
      "Vetted professionals",
      "Easy scheduling",
      "Real-time tracking"
    ],
    color: "secondary"
  }
];

const useCases = [
  {
    title: "For Families",
    description: "Caring for aging parents from afar? Carebow keeps you connected and informed.",
    features: ["Daily check-in notifications", "Shared health records", "Instant SOS alerts"]
  },
  {
    title: "For Seniors",
    description: "Simple, easy-to-use interface designed for elderly users with accessibility in mind.",
    features: ["Large, clear buttons", "Voice input support", "One-tap emergency help"]
  },
  {
    title: "For Caregivers",
    description: "Professional tools to manage care efficiently and communicate with families.",
    features: ["Care logging", "Schedule management", "Direct family messaging"]
  }
];

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How Carebow Works
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Getting started takes just minutes. Here's how Carebow helps you provide
              better care for your loved ones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gray-200 hidden md:block" />
                )}

                <div className="flex gap-6 mb-12">
                  {/* Step Number */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.color === "primary" ? "bg-primary-700" : "bg-secondary"
                  }`}>
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className={`w-6 h-6 ${
                        step.color === "primary" ? "text-primary-700" : "text-secondary"
                      }`} />
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Everyone in the Care Circle
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a family member, a senior, or a caregiver - Carebow has you covered.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="w-0 h-0 border-l-[20px] border-l-primary-700 border-y-[12px] border-y-transparent ml-2" />
                </div>
                <p className="text-gray-600 font-medium">Watch How It Works</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-700">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of families who use Carebow to provide better care.
            </p>
            <Link href="/register">
              <Button variant="secondary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
