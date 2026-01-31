"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to care with confidence?
          </h2>
          <p className="text-lg sm:text-xl text-primary-100 mb-10">
            Join thousands of families using Carebow to manage health for their loved ones.
            Start free, upgrade when you need more.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
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
                variant="ghost"
                size="lg"
                className="text-white border-2 border-white/30 hover:bg-white/10"
              >
                Talk to Us
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-primary-200">
            No credit card required • Free plan available • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
