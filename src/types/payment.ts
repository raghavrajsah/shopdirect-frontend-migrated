/**
 * Payment domain types.
 */

// ---------------------------------------------------------------------------
// Checkout form (user-facing input)
// ---------------------------------------------------------------------------

export interface CheckoutForm {
  email: string;
  fullName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
}

// ---------------------------------------------------------------------------
// Payment authorization
// ---------------------------------------------------------------------------

export interface PaymentAuthRequest {
  amount: number;
  cardNumber: string;
  cardName: string;
  expiry: string;
}

export interface PaymentAuthResponse {
  status: string;
  authorizationId: string;
  amount: number;
  last4: string;
  brand?: string;
  maskedNumber?: string;
}
