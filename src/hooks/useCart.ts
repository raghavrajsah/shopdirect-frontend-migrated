import { useContext } from 'react';
import CartContext, { type CartContextValue } from '../contexts/CartContext';
import calculateCartTotal from '../utils/calculateCartTotal';
import type { CartItem, CartTotals } from '../types';

interface UseCartReturn extends CartContextValue, CartTotals {
  hasItems: boolean;
  getItem: (productId: string) => CartItem | undefined;
}

export default function useCart(): UseCartReturn {
  var cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart must be used inside CartProvider');
  }

  var totals: CartTotals = calculateCartTotal(cart.items);

  function getItem(productId: string): CartItem | undefined {
    return cart!.items.find(function matchLineItem(item: CartItem) {
      return (item.productId || item.id) === productId;
    });
  }

  return {
    ...cart,
    subtotal: totals.subtotal,
    tax: totals.tax,
    shipping: totals.shipping,
    total: totals.total,
    itemCount: totals.itemCount,
    hasItems: cart.items.length > 0,
    getItem: getItem,
  };
}
