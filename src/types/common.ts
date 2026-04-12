/**
 * Shared / cross-cutting types that don't belong to a single domain.
 */

// ---------------------------------------------------------------------------
// Status enums (mirror the JS constants in src/constants/statuses.js)
// ---------------------------------------------------------------------------

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export type OrderStatus = 'pending' | 'processing' | 'placed' | 'delivered';

export type PaymentStatus = 'idle' | 'authorized' | 'declined' | 'captured';

// ---------------------------------------------------------------------------
// Hero banner (marketing module)
// ---------------------------------------------------------------------------

export interface HeroBanner {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}
