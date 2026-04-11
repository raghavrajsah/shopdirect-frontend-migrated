function resolveLinePrice(item) {
  if (item == null) {
    return 0;
  }

  if (typeof item.price === 'number') {
    return item.price;
  }

  if (item.productSnapshot && typeof item.productSnapshot.salePrice === 'number') {
    return item.productSnapshot.salePrice;
  }

  if (item.productSnapshot && item.productSnapshot.pricing) {
    return item.productSnapshot.pricing.current || 0;
  }

  return 0;
}

export default function calculateCartTotal(items) {
  var list = Array.isArray(items) ? items : [];
  var subtotal = list.reduce(function sum(acc, item) {
    var quantity = Number(item && item.quantity) || 0;
    return acc + resolveLinePrice(item) * quantity;
  }, 0);
  var itemCount = list.reduce(function sum(acc, item) {
    return acc + (Number(item && item.quantity) || 0);
  }, 0);
  var shipping = subtotal >= 100 || subtotal === 0 ? 0 : 8;
  var tax = Number((subtotal * 0.08).toFixed(2));
  var total = Number((subtotal + tax + shipping).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
    itemCount,
  };
}
