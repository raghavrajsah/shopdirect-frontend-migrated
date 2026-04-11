import { useNavigate } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useCheckout from '../hooks/useCheckout';
import formatPrice from '../utils/formatPrice';
import { ROUTES } from '../constants/routes';

export default function Checkout() {
  var auth = useAuth();
  var cart = useCart();
  var navigate = useNavigate();
  var checkout = useCheckout(auth.currentUser);

  if (!auth.currentUser && auth.status === 'loading') {
    return <LoadingSpinner label="Loading checkout" />;
  }

  if (!cart.hasItems) {
    return (
      <EmptyState
        title="Your checkout is waiting on cart items"
        description="Add at least one product before trying to place a mock order."
        actionLabel="Browse products"
      />
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    var order = await checkout.submitCheckout({
      items: cart.items,
      totals: {
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
      },
      user: auth.currentUser,
    });

    if (order) {
      cart.clearCart();
      navigate(ROUTES.orderConfirmation.replace(':orderId', order.id), {
        state: { order: order },
      });
    }
  }

  return (
    <div className="content-grid two-column page-stack">
      <form className="section-card checkout-form" onSubmit={handleSubmit}>
        <div className="stack">
          <h1>Checkout</h1>
          <span className="muted-text">
            This flow stays local, but the service layer still returns async responses like an older frontend app would expect.
          </span>
        </div>

        <div className="checkout-grid">
          <label>
            Email
            <input
              value={checkout.checkoutForm.email}
              onChange={function handleChange(event) {
                checkout.setFieldValue('email', event.target.value);
              }}
            />
          </label>
          <label>
            Full name
            <input
              value={checkout.checkoutForm.fullName}
              onChange={function handleChange(event) {
                checkout.setFieldValue('fullName', event.target.value);
              }}
            />
          </label>
          <label className="checkout-grid-wide">
            Address
            <input
              value={checkout.checkoutForm.address1}
              onChange={function handleChange(event) {
                checkout.setFieldValue('address1', event.target.value);
              }}
            />
          </label>
          <label>
            City
            <input
              value={checkout.checkoutForm.city}
              onChange={function handleChange(event) {
                checkout.setFieldValue('city', event.target.value);
              }}
            />
          </label>
          <label>
            State
            <input
              value={checkout.checkoutForm.state}
              onChange={function handleChange(event) {
                checkout.setFieldValue('state', event.target.value);
              }}
            />
          </label>
          <label>
            Postal code
            <input
              value={checkout.checkoutForm.postalCode}
              onChange={function handleChange(event) {
                checkout.setFieldValue('postalCode', event.target.value);
              }}
            />
          </label>
          <label>
            Cardholder
            <input
              value={checkout.checkoutForm.cardName}
              onChange={function handleChange(event) {
                checkout.setFieldValue('cardName', event.target.value);
              }}
            />
          </label>
          <label>
            Card number
            <input
              placeholder="4242 4242 4242 4242"
              value={checkout.checkoutForm.cardNumber}
              onChange={function handleChange(event) {
                checkout.setFieldValue('cardNumber', event.target.value);
              }}
            />
          </label>
          <label>
            Expiry
            <input
              placeholder="04/28"
              value={checkout.checkoutForm.expiry}
              onChange={function handleChange(event) {
                checkout.setFieldValue('expiry', event.target.value);
              }}
            />
          </label>
        </div>

        {checkout.error ? <div className="form-error">{checkout.error}</div> : null}

        <button className="button" type="submit" disabled={checkout.status === 'loading'}>
          {checkout.status === 'loading' ? 'Placing order...' : 'Place order'}
        </button>
      </form>

      <aside className="section-card checkout-summary">
        <div className="stack">
          <h2>Cart summary</h2>
          {cart.items.map(function mapItem(item) {
            return (
              <div key={item.productId} className="inline-row space-between">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            );
          })}
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
        </div>
      </aside>
    </div>
  );
}
