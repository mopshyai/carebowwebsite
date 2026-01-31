"use client";

import { motion } from "framer-motion";
import { Smartphone, Apple, Play, QrCode, Star, Shield, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: Zap,
    title: "Fast & Lightweight",
    description: "Optimized for all devices, even on slower networks"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption protects your health data"
  },
  {
    icon: Star,
    title: "Highly Rated",
    description: "4.8 stars on both App Store and Play Store"
  }
];

const appStats = [
  { value: "100K+", label: "Downloads" },
  { value: "4.8", label: "App Rating" },
  { value: "50+", label: "Cities" }
];

export default function DownloadPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Download Carebow
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Get instant access to AI-powered health guidance, safety features, and
                trusted care services. Available on iOS and Android.
              </p>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://apps.apple.com/carebow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Apple size={28} />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/carebow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Play size={28} />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {appStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-primary-700">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 rounded-[2.5rem] overflow-hidden flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-3xl font-bold">C</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Carebow</h3>
                      <p className="text-sm text-gray-600">Healthcare guidance for your loved ones</p>
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
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
              Why download the app?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The Carebow mobile app gives you instant access to all features, anywhere, anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Scan to Download
            </h2>
            <p className="text-gray-600 mb-8">
              Use your phone's camera to scan the QR code and download Carebow instantly.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-card inline-block">
              <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">Scan with your camera app</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              System Requirements
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Apple className="w-8 h-8 text-gray-900" />
                  <h3 className="font-semibold text-gray-900">iOS</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>iOS 14.0 or later</li>
                  <li>iPhone 8 or newer</li>
                  <li>iPad with iPadOS 14.0+</li>
                  <li>App size: ~50 MB</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-8 h-8 text-gray-900" />
                  <h3 className="font-semibold text-gray-900">Android</h3>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Android 8.0 (Oreo) or later</li>
                  <li>2GB RAM minimum</li>
                  <li>Works on most Android devices</li>
                  <li>App size: ~40 MB</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
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
              Download Carebow now and give your family the gift of peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://apps.apple.com/carebow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <Apple size={20} className="mr-2" />
                  App Store
                </Button>
              </a>
              <a
                href="https://play.google.com/store/apps/carebow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <Play size={20} className="mr-2" />
                  Google Play
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
