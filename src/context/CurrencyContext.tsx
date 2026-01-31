'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyCode, CURRENCIES, CurrencyConfig } from '@/lib/currency';
import { formatPrice, formatPriceWithPeriod } from '@/lib/formatPrice';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;
  formatPriceWithPeriod: (amountUSD: number, period: string) => string;
  currencyConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem('carebow-currency') as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    } else {
      // Auto-detect from browser locale
      const locale = navigator.language;
      if (locale.includes('IN')) setCurrencyState('INR');
      else if (locale.includes('GB')) setCurrencyState('GBP');
      else if (locale.includes('DE') || locale.includes('FR')) setCurrencyState('EUR');
      else if (locale.includes('AE')) setCurrencyState('AED');
      else if (locale.includes('SG')) setCurrencyState('SGD');
      else if (locale.includes('AU')) setCurrencyState('AUD');
      else if (locale.includes('CA')) setCurrencyState('CAD');
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('carebow-currency', code);
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    formatPrice: (amount: number) => formatPrice(amount, currency),
    formatPriceWithPeriod: (amount: number, period: string) => formatPriceWithPeriod(amount, period, currency),
    currencyConfig: CURRENCIES[currency],
  };

  // Prevent hydration mismatch by not rendering until client
  if (!isHydrated) {
    return (
      <CurrencyContext.Provider value={{
        ...value,
        formatPrice: (amount: number) => formatPrice(amount, 'USD'),
        formatPriceWithPeriod: (amount: number, period: string) => formatPriceWithPeriod(amount, period, 'USD'),
        currencyConfig: CURRENCIES['USD'],
      }}>
        {children}
      </CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
