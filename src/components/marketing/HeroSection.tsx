"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, Star, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

const trustBadges = [
  { icon: Users, label: "10,000+ families", value: "10,000+" },
  { icon: Star, label: "4.8 star rating", value: "4.8★" },
  { icon: Clock, label: "24/7 AI support", value: "24/7 AI" },
];

export default function HeroSection() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white -z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-100 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Complete Care in{" "}
              <span className="text-primary-700">One Platform</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
              From finding the perfect caregiver to emergency transport — everything
              your family needs, all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
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
              <Button
                variant="outline"
                size="lg"
                icon={<Play size={20} />}
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <badge.icon size={20} className="text-primary-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {badge.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Illustration/App Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-soft p-6 lg:p-8 border border-gray-100">
                {/* App Preview Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍👩‍👧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sharma Family</h3>
                    <p className="text-sm text-gray-500">2 profiles active</p>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4">
                  <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">✨</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Ask Carebow AI</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          "Dad has been feeling dizzy after meals..."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-success-soft rounded-xl p-4 border border-green-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">✓</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Daily Check-in Complete</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Mom responded: "Feeling good today!"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary-50 rounded-xl p-4 border border-secondary-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">🏥</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Doctor Visit Booked</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          Dr. Sharma • Tomorrow, 10:00 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 border border-gray-100 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-error-soft rounded-full flex items-center justify-center">
                    <span className="text-xl">🚨</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SOS Active</p>
                    <p className="text-sm font-semibold text-gray-900">2 Contacts</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
