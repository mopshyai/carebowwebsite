'use client';

import { useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, CurrencyCode } from '@/lib/currency';
import { ChevronDown, Check } from 'lucide-react';

export function CurrencySelector() {
  const { currency, setCurrency, currencyConfig } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
      >
        <span className="text-xl">{currencyConfig.flag}</span>
        <span className="font-medium text-gray-700">{currency}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[220px]">
            {Object.values(CURRENCIES).map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code as CurrencyCode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currency === curr.code ? 'bg-primary-50' : ''
                }`}
              >
                <span className="text-xl">{curr.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{curr.code}</div>
                  <div className="text-sm text-gray-500">{curr.name}</div>
                </div>
                {currency === curr.code && (
                  <Check className="w-5 h-5 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
