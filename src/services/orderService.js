import { get, post } from './apiClient';

function mapOrderItem(item) {
  return {
    productId: item.productId,
    name: item.title || item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  };
}

export async function getOrderHistory() {
  return get('/orders');
}

export async function getLatestOrder() {
  var orders = await getOrderHistory();
  return orders && orders[0];
}

export async function placeOrder(payload) {
  var orderPayload = {
    status: 'placed',
    subtotal: payload.totals.subtotal,
    tax: payload.totals.tax,
    shipping: payload.totals.shipping,
    total: payload.totals.total,
    items: (payload.items || []).map(mapOrderItem),
    shippingAddress: {
      name: payload.checkoutForm.fullName,
      address1: payload.checkoutForm.address1,
      city: payload.checkoutForm.city,
      state: payload.checkoutForm.state,
      postalCode: payload.checkoutForm.postalCode,
    },
    payment: payload.payment,
    customer: {
      email: payload.checkoutForm.email,
      userId: payload.user && payload.user.id,
    },
  };

  return post('/orders', orderPayload);
}
