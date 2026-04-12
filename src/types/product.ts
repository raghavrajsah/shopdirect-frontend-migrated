/**
 * Product domain types.
 *
 * The legacy codebase uses several inconsistent shapes for pricing, images,
 * and ratings. These interfaces capture every variant observed in mockData
 * and the service layer so that migrated files can narrow progressively.
 */

// ---------------------------------------------------------------------------
// Sub-entities
// ---------------------------------------------------------------------------

export interface Brand {
  name: string;
  country: string;
}

/** Rating objects appear with different key names across products. */
export interface ProductRating {
  average?: number;
  value?: number;
  score?: number;
  count?: number;
}

/** Alternative pricing shape used by some catalog entries. */
export interface ProductPricing {
  current: number;
  compareAt: number | null;
}

export interface ProductInventory {
  count: number;
  warehouse?: string;
  backorder?: boolean;
}

export interface ProductMedia {
  primary: string;
}

export interface ProductSpecs {
  [key: string]: string;
}

// ---------------------------------------------------------------------------
// Core product
// ---------------------------------------------------------------------------

/**
 * Raw product as it appears in the mock catalog / API responses.
 *
 * Fields are intentionally optional because different catalog entries carry
 * different subsets (e.g. some use `price`, others use `pricing`).
 */
export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: string;
  description: string;
  shortDescription?: string;

  // Pricing — three legacy patterns coexist
  price?: number;
  salePrice?: number | null;
  pricing?: ProductPricing;

  // Ratings — key names vary per entry
  rating?: ProductRating | null;
  reviewCount?: number;

  // Images — three legacy patterns coexist
  image?: string;
  images?: string[];
  media?: ProductMedia;

  brand?: Brand;
  inventory?: ProductInventory | null;
  badges?: string[];
  featured?: boolean;

  // Miscellaneous optional fields
  sku?: string;
  specs?: ProductSpecs;
  details?: Record<string, string>;
  colorways?: string[];
}

// ---------------------------------------------------------------------------
// Normalized product (output of productService.normalizeProduct)
// ---------------------------------------------------------------------------

export interface NormalizedProduct extends Product {
  displayPrice: number;
  primaryImage: string;
  ratingValue: number;
  totalReviews: number;
}
