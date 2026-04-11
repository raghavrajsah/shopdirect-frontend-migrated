import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import formatDate from '../utils/formatDate';
import formatPrice from '../utils/formatPrice';
import { getLatestOrder } from '../services/orderService';
import { ROUTES } from '../constants/routes';

export default function OrderConfirmation() {
  var params = useParams();
  var location = useLocation();
  var [order, setOrder] = useState(location.state && location.state.order);
  var [loading, setLoading] = useState(!order);

  useEffect(
    function loadFallbackOrder() {
      if (order) {
        return;
      }

      getLatestOrder().then(function handleLatestOrder(nextOrder) {
        setOrder(nextOrder);
        setLoading(false);
      });
    },
    [order]
  );

  if (loading) {
    return <LoadingSpinner label="Loading order confirmation" />;
  }

  return (
    <section className="section-card confirmation-panel">
      <span className="eyebrow">Order confirmed</span>
      <h1>Thanks for your order.</h1>
      <p className="muted-text">
        Order <strong>{params.orderId}</strong> was placed on{' '}
        <strong>{formatDate(order && (order.placedAt || order.orderedAt))}</strong>.
      </p>
      <div className="stack confirmation-summary">
        <div className="inline-row space-between">
          <span>Items</span>
          <strong>{order && order.items && order.items.length}</strong>
        </div>
        <div className="inline-row space-between">
          <span>Total paid</span>
          <strong>{formatPrice(order && order.total)}</strong>
        </div>
        <div className="inline-row space-between">
          <span>Status</span>
          <strong>{order && order.status}</strong>
        </div>
      </div>
      <div className="inline-row">
        <Link to={ROUTES.profile} className="outline-button">
          View profile
        </Link>
        <Link to={ROUTES.home} className="button">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
