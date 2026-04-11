import { createContext, useEffect, useRef, useState } from 'react';
import { buildCartItem, syncCart } from '../services/cartService';

var CartContext = createContext(null);
var CART_STORAGE_KEY = 'shopdirect-cart';

export function CartProvider(props) {
  var children = props.children;
  var [items, setItems] = useState([]);
  var [isDrawerOpen, setIsDrawerOpen] = useState(false);
  var [lastAddedProductId, setLastAddedProductId] = useState(null);
  var hasHydrated = useRef(false);

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  function addToCart(product, quantity) {
    var nextItem = buildCartItem(product, quantity || 1);

    setItems(function updateCart(currentItems) {
      var existingItem = currentItems.find(function matchItem(item) {
        return (item.productId || item.id) === nextItem.productId;
      });

      if (!existingItem) {
        return currentItems.concat(nextItem);
      }

      return currentItems.map(function mergeItem(item) {
        if ((item.productId || item.id) !== nextItem.productId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + nextItem.quantity,
        };
      });
    });

    setLastAddedProductId(nextItem.productId);
    setIsDrawerOpen(true);
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(function updateExistingItems(currentItems) {
      return currentItems.map(function updateItem(item) {
        if ((item.productId || item.id) !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: quantity,
        };
      });
    });
  }

  function removeFromCart(productId) {
    setItems(function filterItems(currentItems) {
      return currentItems.filter(function removeItem(item) {
        return (item.productId || item.id) !== productId;
      });
    });
  }

  function clearCart() {
    setItems([]);
  }

  useEffect(function hydrateCart() {
    var storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }

    hasHydrated.current = true;
  }, []);

  useEffect(
    function persistCart() {
      if (!hasHydrated.current) {
        return;
      }

      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      syncCart(items).catch(function ignoreCartSyncError() {});
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items: items,
        isDrawerOpen: isDrawerOpen,
        lastAddedProductId: lastAddedProductId,
        addToCart: addToCart,
        updateQuantity: updateQuantity,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
        openDrawer: openDrawer,
        closeDrawer: closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
