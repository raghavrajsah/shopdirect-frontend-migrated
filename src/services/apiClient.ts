import { mockOrders, mockProducts, mockUser } from '../data/mockData';
import type { Cart, CartItem } from '../types';
import type { LoginCredentials, LoginResponse, User } from '../types';
import type { Order } from '../types';
import type { PaymentAuthRequest, PaymentAuthResponse } from '../types';
import type { Product } from '../types';

interface Database {
  products: Product[];
  user: User;
  orders: Order[];
  cart: Cart;
}

var database: Database = {
  products: mockProducts.slice(),
  user: { ...mockUser },
  orders: mockOrders.slice(),
  cart: {
    id: mockUser.cartId,
    items: [],
    updatedAt: null,
  },
};

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

function wait(ms: number): Promise<void> {
  return new Promise(function resolveAfterDelay(resolve) {
    setTimeout(resolve, ms);
  });
}

function findProduct(reference: string): Product | undefined {
  return database.products.find(function matchProduct(product) {
    return product.id === reference || product.slug === reference;
  });
}

async function respond<T>(data: T): Promise<T> {
  await wait(160 + Math.round(Math.random() * 140));
  return clone(data);
}

export async function get(path: string): Promise<unknown> {
  if (path === '/products') {
    return respond(database.products);
  }

  if (path.indexOf('/products/') === 0) {
    return respond(findProduct(path.replace('/products/', '')));
  }

  if (path === '/profile') {
    return respond(database.user);
  }

  if (path === '/orders') {
    return respond(database.orders);
  }

  if (path === '/cart') {
    return respond(database.cart);
  }

  return respond(null);
}

export async function patch(path: string, payload: Record<string, unknown>): Promise<unknown> {
  if (path === '/profile') {
    database.user = {
      ...database.user,
      ...payload,
      preferences: {
        ...database.user.preferences,
        ...(payload && payload.preferences as Record<string, unknown>),
      },
    } as User;

    return respond(database.user);
  }

  return respond(payload);
}

export async function post(path: string, payload: Record<string, unknown>): Promise<unknown> {
  if (path === '/login') {
    database.user = {
      ...database.user,
      email: (payload && (payload.email as string)) || database.user.email,
      fullName:
        (payload && (payload.email as string) && (payload.email as string).split('@')[0].replace('.', ' ')) ||
        database.user.fullName,
    };

    return respond({
      token: 'mock-token-' + Date.now(),
      user: database.user,
    });
  }

  if (path === '/cart/sync') {
    database.cart = {
      ...database.cart,
      items: clone((payload && (payload.items as CartItem[])) || []),
      updatedAt: new Date().toISOString(),
    };

    return respond(database.cart);
  }

  if (path === '/payments/authorize') {
    var amount = (payload && (payload.amount as number)) || 0;
    return respond({
      status: amount > 0 ? 'authorized' : 'declined',
      authorizationId: 'auth-' + Date.now(),
      amount,
      last4: String((payload && (payload.cardNumber as string)) || '').slice(-4),
    });
  }

  if (path === '/orders') {
    var order = {
      id: 'ord-' + Date.now(),
      placedAt: new Date().toISOString(),
      ...payload,
    };

    database.orders = [order as Order].concat(database.orders);
    return respond(order);
  }

  return respond(payload);
}
