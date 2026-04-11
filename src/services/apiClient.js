import { mockOrders, mockProducts, mockUser } from '../data/mockData';

var database = {
  products: mockProducts.slice(),
  user: { ...mockUser },
  orders: mockOrders.slice(),
  cart: {
    id: mockUser.cartId,
    items: [],
    updatedAt: null,
  },
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function wait(ms) {
  return new Promise(function resolveAfterDelay(resolve) {
    setTimeout(resolve, ms);
  });
}

function findProduct(reference) {
  return database.products.find(function matchProduct(product) {
    return product.id === reference || product.slug === reference;
  });
}

async function respond(data) {
  await wait(160 + Math.round(Math.random() * 140));
  return clone(data);
}

export async function get(path) {
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

export async function patch(path, payload) {
  if (path === '/profile') {
    database.user = {
      ...database.user,
      ...payload,
      preferences: {
        ...database.user.preferences,
        ...(payload && payload.preferences),
      },
    };

    return respond(database.user);
  }

  return respond(payload);
}

export async function post(path, payload) {
  if (path === '/login') {
    database.user = {
      ...database.user,
      email: (payload && payload.email) || database.user.email,
      fullName:
        (payload && payload.email && payload.email.split('@')[0].replace('.', ' ')) ||
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
      items: clone((payload && payload.items) || []),
      updatedAt: new Date().toISOString(),
    };

    return respond(database.cart);
  }

  if (path === '/payments/authorize') {
    var amount = (payload && payload.amount) || 0;
    return respond({
      status: amount > 0 ? 'authorized' : 'declined',
      authorizationId: 'auth-' + Date.now(),
      amount,
      last4: String((payload && payload.cardNumber) || '').slice(-4),
    });
  }

  if (path === '/orders') {
    var order = {
      id: 'ord-' + Date.now(),
      placedAt: new Date().toISOString(),
      ...payload,
    };

    database.orders = [order].concat(database.orders);
    return respond(order);
  }

  return respond(payload);
}
