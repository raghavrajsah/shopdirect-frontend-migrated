import { get } from './apiClient';

export function resolveProductPrice(product) {
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

export function resolveProductImage(product) {
  return (
    (product && product.image) ||
    (product && product.images && product.images[0]) ||
    (product && product.media && product.media.primary) ||
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  );
}

export function resolveProductRating(product) {
  return (
    (product && product.rating && product.rating.average) ||
    (product && product.rating && product.rating.value) ||
    (product && product.rating && product.rating.score) ||
    0
  );
}

export function resolveReviewCount(product) {
  return (
    (product && product.rating && product.rating.count) ||
    (product && product.reviewCount) ||
    (product && product.reviews && product.reviews.length) ||
    0
  );
}

function normalizeProduct(product) {
  return {
    ...product,
    displayPrice: resolveProductPrice(product),
    primaryImage: resolveProductImage(product),
    ratingValue: resolveProductRating(product),
    totalReviews: resolveReviewCount(product),
  };
}

export async function fetchProducts() {
  var products = await get('/products');
  return (products || []).map(normalizeProduct);
}

export async function fetchProductById(productId) {
  var product = await get('/products/' + productId);
  return product ? normalizeProduct(product) : null;
}

export async function fetchFeaturedProducts() {
  var products = await fetchProducts();
  return products.filter(function onlyFeatured(product) {
    return product.featured;
  });
}
