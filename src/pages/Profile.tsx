import { useEffect, useState } from 'react';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import { getOrderHistory } from '../services/orderService';
import formatDate from '../utils/formatDate';
import formatPrice from '../utils/formatPrice';
import type { Address, Order } from '../types';

export default function Profile(): React.JSX.Element {
  var auth = useAuth();
  var [orders, setOrders] = useState<Order[]>([]);
  var [loading, setLoading] = useState<boolean>(true);

  useEffect(function loadOrders() {
    var active = true;

    getOrderHistory().then(function handleOrders(nextOrders: Order[]) {
      if (!active) {
        return;
      }

      setOrders(nextOrders || []);
      setLoading(false);
    });

    return function stopLoading() {
      active = false;
    };
  }, []);

  if (auth.status === 'loading' || loading) {
    return <LoadingSpinner label="Loading profile" />;
  }

  if (!auth.currentUser) {
    return (
      <EmptyState
        title="No active user"
        description="Use the demo sign-in action in the header to load the fake shopper profile."
      />
    );
  }

  return (
    <div className="content-grid two-column page-stack">
      <section className="section-card profile-panel">
        <span className="eyebrow">Customer profile</span>
        <h1>{auth.currentUser.fullName || auth.currentUser.firstName}</h1>
        <div className="stack">
          <div className="detail-meta-row">
            <span className="muted-text">Email</span>
            <strong>{auth.currentUser.email}</strong>
          </div>
          <div className="detail-meta-row">
            <span className="muted-text">Loyalty tier</span>
            <strong>
              {auth.currentUser.loyalty && auth.currentUser.loyalty.tier} ·{' '}
              {auth.currentUser.loyalty && auth.currentUser.loyalty.points} pts
            </strong>
          </div>
        </div>

        <div className="stack">
          <strong>Saved addresses</strong>
          {(auth.currentUser.savedAddresses || []).map(function mapAddress(address: Address) {
            return (
              <div key={address.id} className="address-card">
                <strong>{address.label}</strong>
                <span className="muted-text">{address.address1}</span>
                <span className="muted-text">
                  {address.city}, {address.state} {address.postalCode || address.zip}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-card profile-panel">
        <span className="eyebrow">Order history</span>
        <h2>Recent orders</h2>
        <div className="stack">
          {orders.map(function mapOrder(order: Order) {
            return (
              <div key={order.id} className="order-row">
                <div className="stack">
                  <strong>{order.id}</strong>
                  <span className="muted-text">
                    {formatDate(order.placedAt || order.orderedAt)}
                  </span>
                </div>
                <div className="stack">
                  <strong>{formatPrice(order.total)}</strong>
                  <span className="muted-text">{order.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
