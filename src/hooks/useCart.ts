import { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import calculateCartTotal from '../utils/calculateCartTotal';
import type { CartItem, CartTotals, NormalizedProduct } from '../types';

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  lastAddedProductId: string | null;
  addToCart: (product: NormalizedProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

interface UseCartReturn extends CartContextValue, CartTotals {
  hasItems: boolean;
  getItem: (productId: string) => CartItem | undefined;
}

export default function useCart(): UseCartReturn {
  var cart = useContext(CartContext) as CartContextValue | null;

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
