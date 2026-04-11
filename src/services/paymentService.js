import { post } from './apiClient';

export function maskCardNumber(cardNumber) {
  var last4 = String(cardNumber || '').slice(-4);
  return last4 ? '**** **** **** ' + last4 : 'Card ending soon';
}

export async function authorizePayment(paymentForm, amount) {
  var response = await post('/payments/authorize', {
    amount,
    cardNumber: paymentForm.cardNumber,
    cardName: paymentForm.cardName,
    expiry: paymentForm.expiry,
  });

  return {
    ...response,
    brand: paymentForm.cardNumber && paymentForm.cardNumber[0] === '4' ? 'visa' : 'card',
    maskedNumber: maskCardNumber(paymentForm.cardNumber),
  };
}
