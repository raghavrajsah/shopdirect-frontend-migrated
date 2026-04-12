import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import QuantitySelector from '../components/QuantitySelector';
import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import { ROUTES } from '../constants/routes';
import type { CartItem } from '../types';

export default function Cart(): React.JSX.Element {
  var cart = useCart();

  if (!cart.hasItems) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Browse the catalog and add a few items to see shipping and tax totals update."
      />
    );
  }

  return (
    <div className="content-grid two-column page-stack">
      <section className="section-card cart-lines-panel">
        <div className="inline-row space-between">
          <h1>Your cart</h1>
          <button className="ghost-button" onClick={cart.clearCart}>
            Clear cart
          </button>
        </div>

        <div className="stack">
          {cart.items.map(function mapItem(item: CartItem) {
            return (
              <div key={item.productId} className="cart-line">
                <img src={item.image} alt={item.title} className="cart-line-image" />
                <div className="stack cart-line-copy">
                  <strong>{item.title}</strong>
                  <span className="muted-text">{item.brand || 'Standard vendor line'}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
                <QuantitySelector
                  value={item.quantity}
                  onChange={function changeQuantity(nextQuantity: number) {
                    cart.updateQuantity(item.productId, nextQuantity);
                  }}
                />
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="section-card cart-summary-panel">
        <div className="stack">
          <h2>Order summary</h2>
          <div className="inline-row space-between">
            <span>Subtotal</span>
            <strong>{formatPrice(cart.subtotal)}</strong>
          </div>
          <div className="inline-row space-between">
            <span>Shipping</span>
            <strong>{formatPrice(cart.shipping)}</strong>
          </div>
          <div className="inline-row space-between">
            <span>Tax</span>
            <strong>{formatPrice(cart.tax)}</strong>
          </div>
          <div className="inline-row space-between cart-total-row">
            <span>Total</span>
            <strong>{formatPrice(cart.total)}</strong>
          </div>
          <Link to={ROUTES.checkout} className="button">
            Continue to checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
