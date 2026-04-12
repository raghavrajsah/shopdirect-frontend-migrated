import type { CartItem, CartTotals } from '../types';

function resolveLinePrice(item: CartItem | null | undefined): number {
  if (item == null) {
    return 0;
  }

  if (typeof item.price === 'number') {
    return item.price;
  }

  if (item.productSnapshot && typeof item.productSnapshot.salePrice === 'number') {
    return item.productSnapshot.salePrice;
  }

  if (item.productSnapshot && item.productSnapshot.pricing) {
    return item.productSnapshot.pricing.current || 0;
  }

  return 0;
}

export default function calculateCartTotal(items: CartItem[] | unknown): CartTotals {
  var list: CartItem[] = Array.isArray(items) ? items : [];
  var subtotal: number = list.reduce(function sum(acc: number, item: CartItem) {
    var quantity: number = Number(item && item.quantity) || 0;
    return acc + resolveLinePrice(item) * quantity;
  }, 0);
  var itemCount: number = list.reduce(function sum(acc: number, item: CartItem) {
    return acc + (Number(item && item.quantity) || 0);
  }, 0);
  var shipping: number = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  var tax: number = Number((subtotal * 0.08).toFixed(2));
  var total: number = Number((subtotal + tax + shipping).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
    itemCount,
  };
}
