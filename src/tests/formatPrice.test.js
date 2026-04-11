import formatPrice from '../utils/formatPrice';

describe('formatPrice', function () {
  it('formats numeric values as usd currency', function () {
    expect(formatPrice(24.5)).toBe('$24.50');
  });
});
