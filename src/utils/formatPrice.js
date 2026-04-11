export default function formatPrice(value, currency) {
  var resolvedCurrency = currency || 'USD';
  var amount = Number(value);

  if (Number.isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resolvedCurrency,
    minimumFractionDigits: 2,
  }).format(amount);
}
