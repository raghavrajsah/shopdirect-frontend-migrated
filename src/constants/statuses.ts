import type { OrderStatus, PaymentStatus, RequestStatus } from '../types';

export const REQUEST_STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const satisfies Record<string, RequestStatus>;

export const ORDER_STATUS = {
  pending: 'pending',
  processing: 'processing',
  placed: 'placed',
  delivered: 'delivered',
} as const satisfies Record<string, OrderStatus>;

export const PAYMENT_STATUS = {
  idle: 'idle',
  authorized: 'authorized',
  declined: 'declined',
  captured: 'captured',
} as const satisfies Record<string, PaymentStatus>;
