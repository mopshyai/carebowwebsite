import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, CreditCard, Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal - CareBow',
  description: 'CareBow legal documents including Terms of Service, Privacy Policy, and more.',
};

const legalPages = [
  {
    title: 'Terms of Service',
    description: 'Rules and guidelines for using CareBow',
    href: '/terms',
    icon: FileText,
  },
  {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your data',
    href: '/privacy',
    icon: Shield,
  },
  {
    title: 'Medical Disclaimer',
    description: 'Important information about health guidance',
    href: '/disclaimer',
    icon: AlertTriangle,
  },
  {
    title: 'Refund Policy',
    description: 'Cancellation and refund procedures',
    href: '/refund-policy',
    icon: CreditCard,
  },
  {
    title: 'Cookie Policy',
    description: 'How we use cookies and tracking',
    href: '/cookies',
    icon: Cookie,
  },
];

export default function LegalIndexPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Legal</h1>
          <p className="text-gray-600 mt-4">
            Important documents governing your use of CareBow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {legalPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md hover:border-primary-500 transition-all group"
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <page.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {page.title}
              </h2>
              <p className="text-gray-500 text-sm mt-2">{page.description}</p>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-12">
          Questions? Contact us at{' '}
          <a href="mailto:legal@carebow.com" className="text-primary-600 hover:underline">
            legal@carebow.com
          </a>
        </p>
      </div>
    </main>
  );
}
