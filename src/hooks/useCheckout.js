import { useEffect, useState } from 'react';
import { PAYMENT_STATUS, REQUEST_STATUS } from '../constants/statuses';
import { placeOrder } from '../services/orderService';
import { authorizePayment } from '../services/paymentService';
import validateEmail from '../utils/validateEmail';

function createInitialForm(user) {
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

export default function useCheckout(user) {
  var [checkoutForm, setCheckoutForm] = useState(createInitialForm(user));
  var [status, setStatus] = useState(REQUEST_STATUS.idle);
  var [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.idle);
  var [error, setError] = useState('');
  var [latestOrder, setLatestOrder] = useState(null);

  useEffect(
    function refreshCheckoutForm() {
      setCheckoutForm(function mergeWithUser(currentForm) {
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

  function setFieldValue(name, value) {
    setCheckoutForm(function updateField(currentForm) {
      return {
        ...currentForm,
        [name]: value,
      };
    });
  }

  async function submitCheckout(payload) {
    if (!validateEmail(checkoutForm.email)) {
      setError('Please enter a valid email address.');
      return null;
    }

    setStatus(REQUEST_STATUS.loading);
    setPaymentStatus(PAYMENT_STATUS.idle);

    try {
      var payment = await authorizePayment(checkoutForm, payload.totals.total);
      setPaymentStatus(payment.status);

      var order = await placeOrder({
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
