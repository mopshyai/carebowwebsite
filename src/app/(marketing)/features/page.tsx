"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Calendar,
  Database,
  Bell,
  PhoneCall,
  MessageCircle,
  Users,
  Clock,
  MapPin,
  FileText,
  Heart,
  ArrowRight
} from "lucide-react";
import Button from "@/components/ui/Button";

const mainFeatures = [
  {
    icon: Sparkles,
    title: "AI-Powered Health Guidance",
    description: "Describe symptoms and get intelligent triage recommendations. Carebow AI understands context and provides personalized guidance 24/7.",
    benefits: [
      "Natural language symptom description",
      "Intelligent severity assessment",
      "Emergency detection and alerts",
      "Personalized care recommendations"
    ],
    color: "primary"
  },
  {
    icon: Shield,
    title: "Safety & Monitoring",
    description: "Daily check-ins and one-tap SOS alerts keep your loved ones safe. Get peace of mind knowing help is always one tap away.",
    benefits: [
      "Daily wellness check-ins",
      "One-tap SOS emergency button",
      "Real-time location sharing",
      "Instant family notifications"
    ],
    color: "secondary"
  },
  {
    icon: Calendar,
    title: "Book Trusted Services",
    description: "Access vetted healthcare providers for home visits. Doctor consultations, nursing care, lab tests, and physiotherapy at your doorstep.",
    benefits: [
      "Background-verified caregivers",
      "Home visit scheduling",
      "Real-time appointment tracking",
      "Secure payment processing"
    ],
    color: "primary"
  },
  {
    icon: Database,
    title: "Health Memory",
    description: "Store and manage all health information in one secure place. Medications, conditions, allergies - everything organized and accessible.",
    benefits: [
      "Centralized health records",
      "Automatic capture from chats",
      "Easy export for doctor visits",
      "Multi-profile family support"
    ],
    color: "secondary"
  }
];

const additionalFeatures = [
  { icon: MessageCircle, title: "Family Chat", description: "Coordinate care with family members in shared chat rooms" },
  { icon: Users, title: "Caregiver Network", description: "Connect with verified caregivers in your area" },
  { icon: Clock, title: "Medication Reminders", description: "Never miss a dose with smart medication alerts" },
  { icon: MapPin, title: "Location Tracking", description: "Know where your loved ones are in real-time" },
  { icon: FileText, title: "Care Reports", description: "Detailed reports from every caregiver visit" },
  { icon: Heart, title: "Wellness Insights", description: "Track health trends and patterns over time" },
];

export default function FeaturesPage() {
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
              Everything you need to care with confidence
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Carebow combines AI-powered health guidance, safety features, and trusted services
              to help you provide the best care for your elderly loved ones.
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-20 lg:space-y-32">
            {mainFeatures.map((feature, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isReversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={isReversed ? "lg:col-start-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        feature.color === "primary" ? "bg-primary-100" : "bg-secondary-100"
                      }`}>
                        <feature.icon className={`w-6 h-6 ${
                          feature.color === "primary" ? "text-primary-700" : "text-secondary"
                        }`} />
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h2>

                    <p className="text-lg text-gray-600 mb-6">
                      {feature.description}
                    </p>

                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className={`rounded-2xl p-8 ${
                      feature.color === "primary"
                        ? "bg-gradient-to-br from-primary-50 to-primary-100"
                        : "bg-gradient-to-br from-secondary-50 to-secondary-100"
                    }`}>
                      <div className="aspect-square max-w-sm mx-auto flex items-center justify-center">
                        <feature.icon className={`w-32 h-32 ${
                          feature.color === "primary" ? "text-primary-300" : "text-secondary-light"
                        }`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
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
              And so much more
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover all the features that make Carebow the complete caregiving solution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
              Join thousands of families who trust Carebow to help care for their loved ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
