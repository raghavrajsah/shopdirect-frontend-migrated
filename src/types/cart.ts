/**
 * Cart domain types.
 */

import type { ProductInventory, ProductPricing, ProductRating } from './product';

// ---------------------------------------------------------------------------
// Cart line item
// ---------------------------------------------------------------------------

/** Snapshot of pricing / inventory data captured when a product is added. */
export interface ProductSnapshot {
  id: string;
  price?: number;
  salePrice?: number | null;
  pricing?: ProductPricing;
  rating?: ProductRating | null;
  reviewCount?: number;
  inventory?: ProductInventory | null;
}

/** A single line item inside the cart. */
export interface CartItem {
  id: string;
  productId: string;
  sku: string;
  slug?: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
  brand?: string;
  productSnapshot: ProductSnapshot;
}

// ---------------------------------------------------------------------------
// Cart aggregate
// ---------------------------------------------------------------------------

export interface Cart {
  id: string;
  items: CartItem[];
  updatedAt: string | null;
}

// ---------------------------------------------------------------------------
// Cart totals (output of calculateCartTotal)
// ---------------------------------------------------------------------------

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
