import { useEffect, useState } from 'react';
import { PAYMENT_STATUS, REQUEST_STATUS } from '../constants/statuses';
import { placeOrder } from '../services/orderService';
import { authorizePayment } from '../services/paymentService';
import validateEmail from '../utils/validateEmail';
import type {
  CartItem,
  CartTotals,
  CheckoutForm,
  Order,
  PaymentAuthResponse,
  PaymentStatus,
  RequestStatus,
  User,
} from '../types';

interface CheckoutPayload {
  items: CartItem[];
  totals: CartTotals;
  user: User | null;
}

interface UseCheckoutReturn {
  checkoutForm: CheckoutForm;
  status: RequestStatus;
  paymentStatus: PaymentStatus;
  error: string;
  latestOrder: Order | null;
  setFieldValue: (name: keyof CheckoutForm, value: string) => void;
  submitCheckout: (payload: CheckoutPayload) => Promise<Order | null>;
}

function createInitialForm(user: User | null | undefined): CheckoutForm {
  var primaryAddress = user && user.savedAddresses && user.savedAddresses[0];

  return {
    email: (user && user.email) || '',
    fullName: (user && (user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' '))) || '',
    address1: (primaryAddress && primaryAddress.address1) || '',
    city: (primaryAddress && primaryAddress.city) || '',
    state: (primaryAddress && primaryAddress.state) || '',
    postalCode:
      (primaryAddress && (primaryAddress.postalCode || primaryAddress.zip)) || '',
    cardName: '',
    cardNumber: '',
    expiry: '',
  };
}

export default function useCheckout(user: User | null | undefined): UseCheckoutReturn {
  var [checkoutForm, setCheckoutForm] = useState<CheckoutForm>(createInitialForm(user));
  var [status, setStatus] = useState<RequestStatus>(REQUEST_STATUS.idle);
  var [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PAYMENT_STATUS.idle);
  var [error, setError] = useState('');
  var [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(
    function refreshCheckoutForm() {
      setCheckoutForm(function mergeWithUser(currentForm: CheckoutForm): CheckoutForm {
        return {
          ...createInitialForm(user),
          cardName: currentForm.cardName,
          cardNumber: currentForm.cardNumber,
          expiry: currentForm.expiry,
        };
      });
    },
    [user]
  );

  function setFieldValue(name: keyof CheckoutForm, value: string): void {
    setCheckoutForm(function updateField(currentForm: CheckoutForm): CheckoutForm {
      return {
        ...currentForm,
        [name]: value,
      };
    });
  }

  async function submitCheckout(payload: CheckoutPayload): Promise<Order | null> {
    if (!validateEmail(checkoutForm.email)) {
      setError('Please enter a valid email address.');
      return null;
    }

    setStatus(REQUEST_STATUS.loading);
    setPaymentStatus(PAYMENT_STATUS.idle);

    try {
      var payment: PaymentAuthResponse = await authorizePayment(checkoutForm, payload.totals.total);
      setPaymentStatus(payment.status as PaymentStatus);

      var order: Order = await placeOrder({
        items: payload.items,
        totals: payload.totals,
        checkoutForm: checkoutForm,
        payment: payment,
        user: payload.user,
      });

      setLatestOrder(order);
      setStatus(REQUEST_STATUS.success);
      setError('');
      return order;
    } catch (err) {
      setStatus(REQUEST_STATUS.error);
      setPaymentStatus(PAYMENT_STATUS.declined);
      setError('Checkout could not be completed.');
      return null;
    }
  }

  return {
    checkoutForm: checkoutForm,
    status: status,
    paymentStatus: paymentStatus,
    error: error,
    latestOrder: latestOrder,
    setFieldValue: setFieldValue,
    submitCheckout: submitCheckout,
  };
}
