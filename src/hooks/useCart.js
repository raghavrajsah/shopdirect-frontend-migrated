import { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import calculateCartTotal from '../utils/calculateCartTotal';

export default function useCart() {
  var cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart must be used inside CartProvider');
  }

  var totals = calculateCartTotal(cart.items);

  function getItem(productId) {
    return cart.items.find(function matchLineItem(item) {
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
