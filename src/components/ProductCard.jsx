import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';
import ReviewStars from './ReviewStars';
import { ROUTES } from '../constants/routes';

function buildProductHref(productId) {
  return ROUTES.productDetail.replace(':productId', productId);
}

export default function ProductCard(props) {
  var product = props.product;
  var onAddToCart = props.onAddToCart;

  return (
    <article className="product-card section-card">
      <Link to={buildProductHref(product.id)} className="product-media-link">
        <img className="product-image" src={product.primaryImage} alt={product.name} />
      </Link>

      <div className="stack product-body">
        <div className="inline-row product-header">
          <div className="stack">
            <span className="muted-text">{product.category}</span>
            <Link to={buildProductHref(product.id)}>
              <strong>{product.name}</strong>
            </Link>
          </div>
          {product.inventory && product.inventory.count <= 5 ? (
            <span className="stock-pill">Low stock</span>
          ) : null}
        </div>

        <p className="muted-text product-copy">
          {product.shortDescription || product.description}
        </p>

        <ReviewStars product={product} />

        <div className="price-stack">
          <strong>{formatPrice(product.displayPrice)}</strong>
          {product.pricing && product.pricing.compareAt ? (
            <s>{formatPrice(product.pricing.compareAt)}</s>
          ) : null}
          {product.price && product.salePrice ? <s>{formatPrice(product.price)}</s> : null}
        </div>

        <div className="tag-list">
          {(product.badges || []).map(function mapBadge(badge) {
            return (
              <span key={badge} className="tag">
                {badge}
              </span>
            );
          })}
        </div>

        <div className="product-actions">
          <Link to={buildProductHref(product.id)} className="outline-button">
            View details
          </Link>
          <button
            className="button"
            onClick={function handleAddToCart() {
              onAddToCart(product, 1);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
