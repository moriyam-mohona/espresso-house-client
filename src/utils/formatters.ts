/**
 * Common formatting utility functions.
 */

/**
 * Format a number as currency (e.g. $1,234.56)
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date into a human readable string
 */
export function formatDate(
  dateInput: string | Date | number,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale: string = "en-US"
): string {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Format numbers with comma thousand separators
 */
export function formatNumber(
  value: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Truncate long strings with ellipsis
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
