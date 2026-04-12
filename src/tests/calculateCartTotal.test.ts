import type { CartTotals } from '../types';
import calculateCartTotal from '../utils/calculateCartTotal';

describe('calculateCartTotal', function () {
  it('returns subtotal, tax, shipping, and total', function () {
    var totals: CartTotals = calculateCartTotal([
      { price: 25, quantity: 2 },
      { price: 10, quantity: 1 },
    ]);

    expect(totals.subtotal).toBe(60);
    expect(totals.tax).toBe(4.8);
    expect(totals.shipping).toBe(8);
    expect(totals.total).toBe(72.8);
  });
});
