export default function formatPrice(value: number | string | null | undefined, currency?: string): string {
  var resolvedCurrency: string = currency || 'USD';
  var amount: number = Number(value);

  if (Number.isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resolvedCurrency,
    minimumFractionDigits: 2,
  }).format(amount);
}
