"use client";

import { motion } from "framer-motion";

const problems = [
  {
    emoji: "😰",
    question: '"Is this serious?"',
    description: "Uncertainty about symptoms keeps you up at night",
  },
  {
    emoji: "🏥",
    question: '"Should we go to ER?"',
    description: "Unclear when home care vs hospital is needed",
  },
  {
    emoji: "📞",
    question: '"Who do I call?"',
    description: "Finding reliable healthcare help is overwhelming",
  },
];

export default function ProblemSection() {
  return (
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
            Caring for aging parents is stressful
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every day brings new health concerns and difficult decisions. You shouldn't
            have to face them alone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 lg:p-8 text-center shadow-card border border-gray-100"
            >
              <div className="text-5xl mb-4">{problem.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {problem.question}
              </h3>
              <p className="text-gray-600">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl text-primary-700 font-medium">
            Carebow helps you make confident health decisions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
