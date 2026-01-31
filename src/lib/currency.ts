export type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'EUR' | 'AED' | 'SGD' | 'AUD' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number;
  decimals: number;
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1, decimals: 2, locale: 'en-US' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 86.5, decimals: 0, locale: 'en-IN' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.79, decimals: 2, locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.92, decimals: 2, locale: 'de-DE' },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', flag: '🇦🇪', rate: 3.67, decimals: 2, locale: 'ar-AE' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1.34, decimals: 2, locale: 'en-SG' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 1.57, decimals: 2, locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.44, decimals: 2, locale: 'en-CA' },
};

export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 86.5,
  GBP: 0.79,
  EUR: 0.92,
  AED: 3.67,
  SGD: 1.34,
  AUD: 1.57,
  CAD: 1.44,
};
