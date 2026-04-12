import { get, post } from './apiClient';
import type {
  CartItem,
  CartTotals,
  CheckoutForm,
  Order,
  OrderItem,
  PaymentAuthResponse,
  User,
} from '../types';

interface PlaceOrderPayload {
  totals: CartTotals;
  items: CartItem[];
  checkoutForm: CheckoutForm;
  payment: PaymentAuthResponse;
  user: User | null;
}

function mapOrderItem(item: CartItem): OrderItem {
  return {
    productId: item.productId,
    name: item.title,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  };
}

export async function getOrderHistory(): Promise<Order[]> {
  return get('/orders') as Promise<Order[]>;
}

export async function getLatestOrder(): Promise<Order | undefined> {
  var orders = await getOrderHistory();
  return orders && orders[0];
}

export async function placeOrder(payload: PlaceOrderPayload): Promise<Order> {
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

  return post('/orders', orderPayload as Record<string, unknown>) as Promise<Order>;
}
