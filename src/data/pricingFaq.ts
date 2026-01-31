export interface PricingFaqItem {
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFaqItem[] = [
  {
    question: 'Can I switch between plans?',
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the end of your current billing period.",
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 7-day free trial for Ask CareBow AI. For care plans, you can schedule a free consultation call to understand how we can help your family before committing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, net banking, and PayPal. For yearly plans, we also offer bank transfer options.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: "Yes! Monthly plans can be cancelled anytime with no penalty. For 6-month and yearly plans, we offer a 30-day money-back guarantee if you're not satisfied.",
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees ever. The price you see is the price you pay. Services like doctor visits, lab tests, and equipment rentals are charged separately only if you use them.',
  },
  {
    question: 'Do prices include taxes?',
    answer: 'Prices shown are exclusive of applicable taxes. Taxes will be calculated at checkout based on your location.',
  },
  {
    question: "What's included vs. pay-per-use?",
    answer: 'Care plans include check-in calls, family updates, coordinator support, and emergency coordination. Services like doctor visits ($15/visit), lab tests ($5/test), and equipment rentals are pay-per-use.',
  },
  {
    question: 'Do you offer refunds?',
    answer: "We offer a 30-day money-back guarantee on all plans. If you're not satisfied within the first 30 days, we'll refund your payment in full, no questions asked.",
  },
];
