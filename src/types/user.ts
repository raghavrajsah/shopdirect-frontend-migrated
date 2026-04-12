/**
 * User / auth domain types.
 */

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export interface Address {
  id: string;
  label?: string;
  address1: string;
  city: string;
  state: string;
  /** Some records use `postalCode`, others use `zip`. */
  postalCode?: string;
  zip?: string;
  country: string;
}

// ---------------------------------------------------------------------------
// Sub-entities
// ---------------------------------------------------------------------------

export interface Loyalty {
  tier: string;
  points: number;
}

export interface UserPreferences {
  currency: string;
  marketingOptIn: boolean;
}

// ---------------------------------------------------------------------------
// Core user
// ---------------------------------------------------------------------------

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  phone?: string | null;
  loyalty?: Loyalty;
  cartId?: string;
  preferences?: UserPreferences;
  savedAddresses?: Address[];
}

// ---------------------------------------------------------------------------
// Auth payloads
// ---------------------------------------------------------------------------

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
