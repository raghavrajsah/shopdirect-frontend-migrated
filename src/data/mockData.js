export const mockProducts = [
  {
    id: 'sku-1001',
    slug: 'oak-and-iron-lamp',
    name: 'Oak & Iron Desk Lamp',
    category: 'Home Office',
    description:
      'A sturdy task lamp with warm oak accents, soft brass hardware, and a long fabric cord that still feels lifted from an older catalog shoot.',
    shortDescription: 'Warm wood finish with a focused reading beam.',
    price: 89.99,
    rating: { average: 4.6, count: 31 },
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    ],
    brand: { name: 'Hearthline', country: 'US' },
    inventory: { count: 14, warehouse: 'A1' },
    badges: ['Best Seller', 'Free Shipping'],
    featured: true,
    specs: {
      finish: 'Oak',
      bulbType: 'E26',
      cordLength: '6 ft',
    },
  },
  {
    id: 'sku-1002',
    slug: 'weekend-duffel',
    name: 'Weekend Duffel',
    category: 'Travel',
    description:
      'Canvas duffel with leather trim, a roomy interior, and side pockets that somehow still fit chargers, socks, and a small notebook.',
    pricing: { current: 129.5, compareAt: 159 },
    reviewCount: 18,
    rating: { value: 4.2 },
    media: {
      primary:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    },
    brand: { name: 'Northline Goods', country: 'CA' },
    inventory: null,
    badges: ['Limited Stock'],
    featured: true,
    details: {
      material: 'Waxed canvas',
      strapDrop: '11 in',
    },
  },
  {
    id: 'sku-1003',
    slug: 'aero-runner',
    name: 'Aero Runner',
    category: 'Footwear',
    description:
      'Everyday running shoe with a knit upper, stable heel support, and enough cushioning for errands that accidentally turn into long walks.',
    price: 74,
    salePrice: 64,
    rating: { average: 4.1, count: 6 },
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    brand: { name: 'Metric', country: 'US' },
    inventory: { count: 0, backorder: true },
    badges: ['Sale'],
    featured: true,
    colorways: ['Stone', 'Midnight', 'Pine'],
  },
  {
    id: 'sku-1004',
    slug: 'ridge-backpack',
    name: 'Ridge Backpack',
    category: 'Bags',
    description:
      'A clean commuter backpack with separate laptop storage, hidden passport pocket, and slightly stiff straps that soften after a week.',
    price: 98.5,
    rating: { score: 4.7, count: 42 },
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    ],
    brand: { name: 'Northline Goods', country: 'CA' },
    inventory: { count: 9, warehouse: 'B3' },
    badges: ['New Arrival'],
    featured: false,
  },
  {
    id: 'sku-1005',
    slug: 'harbor-mug-set',
    name: 'Harbor Mug Set',
    category: 'Kitchen',
    description:
      'Stoneware mug bundle with a matte glaze and a little variation from mug to mug that customers keep calling “part of the charm.”',
    pricing: { current: 36, compareAt: null },
    rating: null,
    reviewCount: 3,
    image:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
    brand: { name: 'Cedar Room', country: 'US' },
    inventory: { count: 22, warehouse: 'C1' },
    featured: false,
    badges: ['Bundle'],
  },
  {
    id: 'sku-1006',
    slug: 'linen-sheet-set',
    name: 'Linen Sheet Set',
    category: 'Bedroom',
    description:
      'Breathable linen bedding that arrives slightly wrinkled, softens over time, and makes every product photo look suspiciously expensive.',
    price: 149,
    salePrice: null,
    rating: { average: 4.8, count: 87 },
    media: {
      primary:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    },
    brand: { name: 'Cedar Room', country: 'US' },
    inventory: { count: 5, warehouse: 'B7' },
    featured: true,
    badges: ['Free Shipping'],
  },
  {
    id: 'sku-1007',
    slug: 'summit-bottle',
    name: 'Summit Bottle',
    category: 'Outdoor',
    description:
      'Insulated steel bottle with a loop cap, powder finish, and a product detail sheet that still mentions the old logo in one paragraph.',
    price: 24.99,
    rating: { value: 4.3, count: 14 },
    image:
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    brand: { name: 'Range Supply', country: 'US' },
    inventory: { count: 44, warehouse: 'A4' },
    featured: false,
    badges: ['Staff Pick'],
  },
  {
    id: 'sku-1008',
    slug: 'notecloth-journal',
    name: 'Notecloth Journal',
    category: 'Office',
    description:
      'Cloth-bound journal with stitched pages, narrow ruling, and enough page weight to survive heavy gel-pen users without much ghosting.',
    pricing: { current: 18.75, compareAt: 21 },
    rating: { average: 4.4, count: 11 },
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    brand: { name: 'Paper House', country: 'UK' },
    inventory: { count: 18, warehouse: 'D2' },
    featured: true,
    badges: [],
  },
];

export const mockUser = {
  id: 'user-001',
  firstName: 'Mia',
  lastName: 'Chen',
  fullName: 'Mia Chen',
  email: 'mia.chen@example.com',
  phone: null,
  loyalty: { tier: 'Silver', points: 280 },
  cartId: 'cart-user-001',
  preferences: {
    currency: 'USD',
    marketingOptIn: true,
  },
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home',
      address1: '102 Hudson Ave',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'US',
    },
    {
      id: 'addr-2',
      label: 'Office',
      address1: '14 W 28th St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US',
    },
  ],
};

export const mockOrders = [
  {
    id: 'ord-5001',
    status: 'delivered',
    placedAt: '2026-03-08T16:15:00.000Z',
    subtotal: 165.5,
    tax: 13.24,
    shipping: 0,
    total: 178.74,
    payment: {
      brand: 'visa',
      last4: '4242',
      status: 'captured',
    },
    shippingAddress: {
      name: 'Mia Chen',
      address1: '102 Hudson Ave',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
    },
    items: [
      {
        productId: 'sku-1002',
        name: 'Weekend Duffel',
        quantity: 1,
        price: 129.5,
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      },
      {
        productId: 'sku-1007',
        name: 'Summit Bottle',
        quantity: 1,
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'ord-4998',
    status: 'processing',
    orderedAt: '2026-02-14T13:02:00.000Z',
    subtotal: 89.99,
    tax: 7.2,
    shipping: 6,
    total: 103.19,
    payment: {
      brand: 'mastercard',
      last4: '5104',
      status: 'authorized',
    },
    shippingAddress: {
      name: 'Mia Chen',
      address1: '14 W 28th St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    items: [
      {
        productId: 'sku-1001',
        title: 'Oak & Iron Desk Lamp',
        quantity: 1,
        price: 89.99,
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export const heroBanners = [
  {
    id: 'hero-spring',
    eyebrow: 'Warehouse favorites',
    title: 'Modern essentials without the luxury markup story.',
    body:
      'ShopDirect is the kind of storefront that has been through three redesigns, two branding exercises, and at least one very serious migration spreadsheet.',
  },
];
