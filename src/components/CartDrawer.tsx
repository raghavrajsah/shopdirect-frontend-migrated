import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import QuantitySelector from './QuantitySelector';
import type { CartItem } from '../types';

export default function CartDrawer(): React.JSX.Element {
  var cart = useCart();

  return (
    <div className={cart.isDrawerOpen ? 'drawer-backdrop drawer-open' : 'drawer-backdrop'}>
      <aside className={cart.isDrawerOpen ? 'cart-drawer cart-drawer-open' : 'cart-drawer'}>
        <div className="drawer-header">
          <div className="stack">
            <strong>Quick cart</strong>
            <span className="muted-text">{cart.itemCount} item(s)</span>
          </div>
          <button className="ghost-button" onClick={cart.closeDrawer}>
            Close
          </button>
        </div>

        <div className="drawer-body">
          {cart.items.length === 0 ? (
            <div className="stack">
              <strong>Your cart is still empty.</strong>
              <span className="muted-text">Add something from the homepage to get started.</span>
            </div>
          ) : (
            cart.items.map(function mapItem(item: CartItem) {
              return (
                <div key={item.productId} className="drawer-item">
                  <img src={item.image} alt={item.title} className="drawer-item-image" />
                  <div className="stack drawer-item-body">
                    <strong>{item.title}</strong>
                    <span className="muted-text">{formatPrice(item.price)}</span>
                    <QuantitySelector
                      value={item.quantity}
                      onChange={function handleQuantityChange(nextQuantity: number) {
                        cart.updateQuantity(item.productId, nextQuantity);
                      }}
                    />
                    <button
                      className="ghost-button"
                      onClick={function removeItem() {
                        cart.removeFromCart(item.productId);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="drawer-footer">
          <div className="inline-row space-between">
            <span>Subtotal</span>
            <strong>{formatPrice(cart.subtotal)}</strong>
          </div>
          <div className="drawer-actions">
            <Link to={ROUTES.cart} className="outline-button" onClick={cart.closeDrawer}>
              View cart
            </Link>
            <Link to={ROUTES.checkout} className="button" onClick={cart.closeDrawer}>
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
