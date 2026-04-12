/**
 * Order domain types.
 */

// ---------------------------------------------------------------------------
// Shipping address (as stored on an order — differs slightly from user Address)
// ---------------------------------------------------------------------------

export interface ShippingAddress {
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode?: string;
  zip?: string;
}

// ---------------------------------------------------------------------------
// Order line item
// ---------------------------------------------------------------------------

export interface OrderItem {
  productId: string;
  /** Legacy data uses both `name` and `title` for the display label. */
  name?: string;
  title?: string;
  quantity: number;
  price: number;
  image?: string;
}

// ---------------------------------------------------------------------------
// Order-level payment summary
// ---------------------------------------------------------------------------

export interface OrderPayment {
  brand: string;
  last4: string;
  status: string;
  authorizationId?: string;
  amount?: number;
  maskedNumber?: string;
}

// ---------------------------------------------------------------------------
// Order customer reference
// ---------------------------------------------------------------------------

export interface OrderCustomer {
  email: string;
  userId?: string;
}

// ---------------------------------------------------------------------------
// Core order
// ---------------------------------------------------------------------------

export interface Order {
  id: string;
  status: string;
  /** Legacy data uses both `placedAt` and `orderedAt`. */
  placedAt?: string;
  orderedAt?: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
  payment?: OrderPayment;
  customer?: OrderCustomer;
}
