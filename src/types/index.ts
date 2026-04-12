/**
 * Canonical shared type contracts for the ShopDirect frontend.
 *
 * Re-exports every domain type so consumers can import from a single entry:
 *
 *   import type { Product, CartItem, User } from '../types';
 */

export type {
  Brand,
  NormalizedProduct,
  Product,
  ProductInventory,
  ProductMedia,
  ProductPricing,
  ProductRating,
  ProductSpecs,
} from './product';

export type {
  Cart,
  CartItem,
  CartTotals,
  ProductSnapshot,
} from './cart';

export type {
  Address,
  LoginCredentials,
  LoginResponse,
  Loyalty,
  User,
  UserPreferences,
} from './user';

export type {
  Order,
  OrderCustomer,
  OrderItem,
  OrderPayment,
  ShippingAddress,
} from './order';

export type {
  CheckoutForm,
  PaymentAuthRequest,
  PaymentAuthResponse,
} from './payment';

export type {
  HeroBanner,
  OrderStatus,
  PaymentStatus,
  RequestStatus,
} from './common';
