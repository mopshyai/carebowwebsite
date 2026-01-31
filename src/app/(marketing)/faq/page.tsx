"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Search, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const faqCategories = [
  {
    name: "General",
    faqs: [
      {
        question: "What is Carebow?",
        answer: "Carebow is an AI-powered healthcare platform designed to help families care for their elderly loved ones. It provides health guidance, safety features like daily check-ins and SOS alerts, and access to trusted healthcare services."
      },
      {
        question: "Who is Carebow for?",
        answer: "Carebow is for families caring for elderly parents or relatives, seniors who want to stay independent while having support, and professional caregivers who provide care services."
      },
      {
        question: "Is Carebow available in my city?",
        answer: "Carebow's AI health guidance is available nationwide. Our healthcare services (doctor visits, nursing care, etc.) are currently available in 50+ major cities across India, with more being added regularly."
      },
      {
        question: "How do I get started?",
        answer: "Simply download the app or sign up on our website. Create your account, add your family members, and you're ready to use Carebow's features. The basic plan is free forever."
      }
    ]
  },
  {
    name: "AI Health Guidance",
    faqs: [
      {
        question: "How accurate is the AI health guidance?",
        answer: "Our AI is trained on extensive medical data and reviewed by healthcare professionals. However, it's designed to provide guidance, not diagnose conditions. Always consult a doctor for serious concerns."
      },
      {
        question: "Can the AI replace a doctor?",
        answer: "No. Carebow AI is a guidance tool that helps you understand symptoms and decide when to seek care. It's not a replacement for professional medical advice, diagnosis, or treatment."
      },
      {
        question: "Is my health data private?",
        answer: "Absolutely. We use bank-level encryption to protect your data. We never sell your information to third parties. You control who sees your health records."
      },
      {
        question: "What languages does the AI support?",
        answer: "Currently, our AI supports English and Hindi. We're working on adding more Indian languages including Tamil, Telugu, and Bengali."
      }
    ]
  },
  {
    name: "Safety Features",
    faqs: [
      {
        question: "How do daily check-ins work?",
        answer: "Each day, the app sends a simple check-in notification. Your loved one just taps to confirm they're okay. If they don't respond within the set time, family members are notified."
      },
      {
        question: "What happens when SOS is activated?",
        answer: "When the SOS button is pressed, all designated emergency contacts receive an immediate alert with the user's location. The app also provides options to call emergency services."
      },
      {
        question: "Can I track my family member's location?",
        answer: "Location sharing is optional and requires consent. When enabled, family members can see each other's location in real-time through the app."
      }
    ]
  },
  {
    name: "Services & Booking",
    faqs: [
      {
        question: "How are caregivers verified?",
        answer: "All caregivers on our platform undergo thorough background verification, identity checks, and skills assessment. We also collect and display verified reviews from families."
      },
      {
        question: "What services can I book?",
        answer: "You can book doctor home visits, nursing care, physiotherapy, lab tests (home collection), and more. Services vary by city."
      },
      {
        question: "How do I pay for services?",
        answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and wallets. Payment is secure and handled within the app."
      },
      {
        question: "What if I'm not satisfied with a service?",
        answer: "We have a satisfaction guarantee. If you're not happy with a service, contact us within 24 hours and we'll arrange a refund or rebooking at no extra cost."
      }
    ]
  },
  {
    name: "Pricing & Billing",
    faqs: [
      {
        question: "Is there a free plan?",
        answer: "Yes! Our free plan includes 5 AI health queries per month, 1 family member profile, daily check-ins, and basic health records. It's free forever."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a full refund within 7 days of subscription if you're not satisfied. Service bookings have their own refund policy based on cancellation timing."
      }
    ]
  }
];

function FAQItem({ faq }: { faq: { question: string; answer: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery
    ? faqCategories.flatMap((cat) =>
        cat.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : faqCategories.find((cat) => cat.name === activeCategory)?.faqs || [];

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to common questions about Carebow. Can't find what you're
              looking for? Contact our support team.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-2">
                  {faqCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeCategory === category.name
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* FAQ List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={searchQuery ? "lg:col-span-4" : "lg:col-span-3"}
            >
              {searchQuery && (
                <p className="text-gray-600 mb-4">
                  {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
                </p>
              )}

              <div className="bg-white rounded-xl shadow-card p-6">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <FAQItem key={index} faq={faq} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No results found for your search.</p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Our support team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <Link href="/contact">
              <Button variant="primary" icon={<ArrowRight size={18} />} iconPosition="right">
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
