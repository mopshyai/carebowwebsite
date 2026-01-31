"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Carebow helped me know when Dad's symptoms were serious. We got help in time. The AI guidance gave us confidence to make the right call.",
    author: "Priya S.",
    location: "Mumbai",
    role: "Caring for father, 72",
    rating: 5,
  },
  {
    content:
      "The daily check-in feature gives me so much peace of mind about Mom. I get a notification every morning that she's okay.",
    author: "Rahul M.",
    location: "Delhi",
    role: "Caring for mother, 68",
    rating: 5,
  },
  {
    content:
      "Finally, a healthcare app that understands Indian families. The caregiver booking is seamless and the AI actually speaks in a way my parents understand.",
    author: "Anita K.",
    location: "Bangalore",
    role: "Caring for in-laws",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by families across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of families who are caring for their loved ones with confidence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-100">
                <Quote size={40} className="fill-current" />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}, {testimonial.location}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
