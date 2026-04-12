import { get } from './apiClient';
import type { NormalizedProduct, Product } from '../types';

export function resolveProductPrice(product: Product | null | undefined): number {
  if (!product) {
    return 0;
  }

  if (typeof product.salePrice === 'number') {
    return product.salePrice;
  }

  if (typeof product.price === 'number') {
    return product.price;
  }

  if (product.pricing && typeof product.pricing.current === 'number') {
    return product.pricing.current;
  }

  return 0;
}

export function resolveProductImage(product: Product | null | undefined): string {
  return (
    (product && product.image) ||
    (product && product.images && product.images[0]) ||
    (product && product.media && product.media.primary) ||
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  );
}

export function resolveProductRating(product: Product | null | undefined): number {
  return (
    (product && product.rating && product.rating.average) ||
    (product && product.rating && product.rating.value) ||
    (product && product.rating && product.rating.score) ||
    0
  );
}

export function resolveReviewCount(product: Product | null | undefined): number {
  return (
    (product && product.rating && product.rating.count) ||
    (product && product.reviewCount) ||
    0
  );
}

function normalizeProduct(product: Product): NormalizedProduct {
  return {
    ...product,
    displayPrice: resolveProductPrice(product),
    primaryImage: resolveProductImage(product),
    ratingValue: resolveProductRating(product),
    totalReviews: resolveReviewCount(product),
  };
}

export async function fetchProducts(): Promise<NormalizedProduct[]> {
  var products = (await get('/products')) as Product[] | null;
  return (products || []).map(normalizeProduct);
}

export async function fetchProductById(productId: string): Promise<NormalizedProduct | null> {
  var product = (await get('/products/' + productId)) as Product | null;
  return product ? normalizeProduct(product) : null;
}

export async function fetchFeaturedProducts(): Promise<NormalizedProduct[]> {
  var products = await fetchProducts();
  return products.filter(function onlyFeatured(product) {
    return product.featured;
  });
}
