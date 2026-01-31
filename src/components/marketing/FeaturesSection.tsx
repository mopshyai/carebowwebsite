"use client";

import { motion } from "framer-motion";
import {
  Users,
  Ambulance,
  Bot,
  Video,
  Pill,
  Heart
} from "lucide-react";

const services = [
  {
    id: "caregiver-marketplace",
    icon: Users,
    title: "Caregiver Marketplace",
    description:
      "Smart matching with verified caregivers, nurses, and therapists. Flexible hourly, daily, or long-term care options.",
    gradient: "from-primary-500 to-primary-700",
    bgGradient: "from-primary-50 to-primary-100",
  },
  {
    id: "transport-logistics",
    icon: Ambulance,
    title: "Transport & Logistics",
    description:
      "Ambulance-on-demand and medical transport. Real-time tracking for peace of mind.",
    gradient: "from-red-500 to-red-700",
    bgGradient: "from-red-50 to-red-100",
  },
  {
    id: "ai-health-buddy",
    icon: Bot,
    title: "AI Health Buddy",
    description:
      "24/7 symptom checker combining Ayurveda and modern medicine. Daily check-ins and health tips.",
    gradient: "from-violet-500 to-violet-700",
    bgGradient: "from-violet-50 to-violet-100",
  },
  {
    id: "telehealth",
    icon: Video,
    title: "Telehealth",
    description:
      "Instant doctor consultations. Connect with specialists anytime, anywhere.",
    gradient: "from-blue-500 to-blue-700",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    id: "pharmacy-lab",
    icon: Pill,
    title: "Pharmacy & Lab",
    description:
      "Home delivery of medicines. Diagnostic tests with home sample collection.",
    gradient: "from-emerald-500 to-emerald-700",
    bgGradient: "from-emerald-50 to-emerald-100",
  },
  {
    id: "companionship",
    icon: Heart,
    title: "Companionship",
    description:
      "Mental health support and daily companionship. Licensed therapists and group activities.",
    gradient: "from-secondary-500 to-secondary-700",
    bgGradient: "from-secondary-50 to-secondary-100",
  },
];

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <div className={`relative bg-gradient-to-br ${service.bgGradient} rounded-2xl p-6 h-full border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg`}>
        {/* Icon */}
        <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
          <service.icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything your family needs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services designed for modern families — all accessible from one platform.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
