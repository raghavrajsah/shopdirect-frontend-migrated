import { post } from './apiClient';
import { resolveProductImage, resolveProductPrice } from './productService';
import type { Cart, CartItem, Product } from '../types';

export function buildCartItem(product: Product, quantity?: number): CartItem {
  return {
    id: 'line-' + product.id,
    productId: product.id,
    sku: product.sku || product.id,
    slug: product.slug,
    title: product.name,
    quantity: quantity || 1,
    price: resolveProductPrice(product),
    image: resolveProductImage(product),
    brand: product.brand && product.brand.name,
    productSnapshot: {
      id: product.id,
      price: product.price,
      salePrice: product.salePrice,
      pricing: product.pricing,
      rating: product.rating,
      reviewCount: product.reviewCount,
      inventory: product.inventory,
    },
  };
}

export function mergeCartItems(items: CartItem[] | null, nextItem: CartItem): CartItem[] {
  return (items || []).map(function mergeItem(item) {
    if (item.productId !== nextItem.productId) {
      return item;
    }

    return {
      ...item,
      quantity: item.quantity + nextItem.quantity,
    };
  });
}

export async function syncCart(items: CartItem[]): Promise<Cart> {
  return post('/cart/sync', {
    items: items || [],
  }) as Promise<Cart>;
}
