import { CURRENCIES, CurrencyCode, FALLBACK_RATES } from './currency';

interface FormatOptions {
  showDecimals?: boolean;
  compact?: boolean;
}

/**
 * Format price from USD to selected currency
 */
export function formatPrice(
  amountUSD: number,
  currencyCode: CurrencyCode = 'USD',
  options: FormatOptions = {}
): string {
  const config = CURRENCIES[currencyCode];
  const rate = config?.rate || FALLBACK_RATES[currencyCode] || 1;
  const converted = amountUSD * rate;

  const decimals = options.showDecimals === false ? 0 : config.decimals;

  let formatted: string;

  if (options.compact && converted >= 1000) {
    if (converted >= 1000000) {
      formatted = `${(converted / 1000000).toFixed(1)}M`;
    } else {
      formatted = `${(converted / 1000).toFixed(1)}K`;
    }
  } else {
    formatted = converted.toLocaleString(config.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  return `${config.symbol}${formatted}`;
}

/**
 * Format price with period (e.g., "$30/month")
 */
export function formatPriceWithPeriod(
  amountUSD: number,
  period: string,
  currencyCode: CurrencyCode = 'USD'
): string {
  return `${formatPrice(amountUSD, currencyCode)}/${period}`;
}

/**
 * Format price range (e.g., "From $5" or "$5 - $15")
 */
export function formatPriceRange(
  fromUSD: number,
  toUSD?: number,
  currencyCode: CurrencyCode = 'USD'
): string {
  if (toUSD && toUSD !== fromUSD) {
    return `${formatPrice(fromUSD, currencyCode)} - ${formatPrice(toUSD, currencyCode)}`;
  }
  return `From ${formatPrice(fromUSD, currencyCode)}`;
}
