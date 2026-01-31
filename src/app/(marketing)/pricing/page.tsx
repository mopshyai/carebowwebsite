"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { carePlans } from "@/data/carePlans";
import {
  CurrencySelector,
  PlanCard,
  AIPlanCard,
  CustomPlanCard,
  PlanComparison,
  ServicesGrid,
  EquipmentGrid,
  HealthPackagesGrid,
  PricingFAQ,
} from "@/components/pricing";

export default function PricingPage() {
  const handlePlanSelect = (planId: string) => {
    // Navigate to registration with plan
    window.location.href = `/register?plan=${planId}`;
  };

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
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              No hidden fees. You only pay for what you use.
            </p>
            <p className="text-2xl font-semibold text-primary-700">
              For just $1/day, keep your worries at bay!
            </p>
          </motion.div>

          {/* Currency Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            <CurrencySelector />
          </motion.div>
        </div>
      </section>

      {/* Care Plans */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              CareBow Care Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your family&apos;s care needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
            {carePlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ask CareBow AI */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Just Need AI Health Guidance?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get 24/7 AI-powered health consultations without a full care plan.
            </p>
          </motion.div>

          <div className="max-w-lg mx-auto">
            <AIPlanCard />
          </div>
        </div>
      </section>

      {/* Custom Plan */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <CustomPlanCard />
          </div>
        </div>
      </section>

      {/* Plan Comparison */}
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
              Compare Plans
            </h2>
            <p className="text-lg text-gray-600">
              See what&apos;s included in each plan
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <PlanComparison />
          </div>
        </div>
      </section>

      {/* Pay-Per-Use Services */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pay-Per-Use Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book services individually when you need them. All providers are background-verified.
            </p>
          </motion.div>

          <ServicesGrid />
        </div>
      </section>

      {/* Equipment Rentals */}
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
              Medical Equipment Rental
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rent medical equipment with free delivery and setup included.
            </p>
          </motion.div>

          <EquipmentGrid />
        </div>
      </section>

      {/* Health Packages */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Health Check Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive health packages with home sample collection.
            </p>
          </motion.div>

          <HealthPackagesGrid />
        </div>
      </section>

      {/* FAQ */}
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
              Pricing FAQ
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <PricingFAQ />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Give Your Parents the Care They Deserve?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join 10,000+ families who trust CareBow for their loved ones.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link href="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Schedule a Call
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-primary-200 text-sm">
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> 7-day free trial
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4" /> Cancel anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
