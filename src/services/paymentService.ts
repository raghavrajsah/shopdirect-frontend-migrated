import { post } from './apiClient';
import type { CheckoutForm, PaymentAuthResponse } from '../types';

export function maskCardNumber(cardNumber: string | undefined): string {
  var last4 = String(cardNumber || '').slice(-4);
  return last4 ? '**** **** **** ' + last4 : 'Card ending soon';
}

export async function authorizePayment(paymentForm: CheckoutForm, amount: number): Promise<PaymentAuthResponse> {
  var response = (await post('/payments/authorize', {
    amount,
    cardNumber: paymentForm.cardNumber,
    cardName: paymentForm.cardName,
    expiry: paymentForm.expiry,
  })) as PaymentAuthResponse;

  return {
    ...response,
    brand: paymentForm.cardNumber && paymentForm.cardNumber[0] === '4' ? 'visa' : 'card',
    maskedNumber: maskCardNumber(paymentForm.cardNumber),
  };
}
