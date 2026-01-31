'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, Shield, AlertTriangle, CreditCard, Cookie } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

const legalLinks = [
  { title: 'Terms of Service', href: '/terms', icon: FileText },
  { title: 'Privacy Policy', href: '/privacy', icon: Shield },
  { title: 'Medical Disclaimer', href: '/disclaimer', icon: AlertTriangle },
  { title: 'Refund Policy', href: '/refund-policy', icon: CreditCard },
  { title: 'Cookie Policy', href: '/cookies', icon: Cookie },
];

export function LegalPageLayout({ title, effectiveDate, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container-custom py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{title}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-2">
            Effective: {new Date(effectiveDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="flex gap-12">
          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-64">
            <div className="sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Legal Documents</h3>
              <nav className="space-y-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 py-2 transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
