import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../services/productService';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import QuantitySelector from '../components/QuantitySelector';
import ReviewStars from '../components/ReviewStars';
import ProductCard from '../components/ProductCard';
import useCart from '../hooks/useCart';
import formatPrice from '../utils/formatPrice';
import { ROUTES } from '../constants/routes';

export default function ProductDetail() {
  var params = useParams();
  var cart = useCart();
  var [product, setProduct] = useState(null);
  var [relatedProducts, setRelatedProducts] = useState([]);
  var [quantity, setQuantity] = useState(1);
  var [loading, setLoading] = useState(true);

  useEffect(
    function loadProductPage() {
      var active = true;
      setLoading(true);

      Promise.all([fetchProductById(params.productId), fetchProducts()]).then(function handleData(result) {
        var nextProduct = result[0];
        var allProducts = result[1];

        if (!active) {
          return;
        }

        setProduct(nextProduct);
        setRelatedProducts(
          (allProducts || [])
            .filter(function filterRelated(item) {
              return nextProduct && item.category === nextProduct.category && item.id !== nextProduct.id;
            })
            .slice(0, 3)
        );
        setLoading(false);
      });

      return function stopLoading() {
        active = false;
      };
    },
    [params.productId]
  );

  if (loading) {
    return <LoadingSpinner label="Loading product" />;
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="This catalog item may have been renamed, archived, or never existed outside the demo data."
      />
    );
  }

  return (
    <div className="stack page-stack">
      <Link to={ROUTES.home} className="muted-text detail-back-link">
        ← Back to catalog
      </Link>

      <section className="detail-layout section-card">
        <div className="detail-media-panel">
          <img src={product.primaryImage} alt={product.name} className="detail-image" />
        </div>

        <div className="stack detail-copy-panel">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <ReviewStars product={product} />
          <div className="price-stack">
            <strong>{formatPrice(product.displayPrice)}</strong>
            {product.price && product.salePrice ? <s>{formatPrice(product.price)}</s> : null}
          </div>
          <p className="muted-text">{product.description}</p>

          <div className="tag-list">
            {(product.badges || []).map(function mapBadge(badge) {
              return (
                <span key={badge} className="tag">
                  {badge}
                </span>
              );
            })}
          </div>

          <div className="stack detail-meta-grid">
            <div className="detail-meta-row">
              <span className="muted-text">Brand</span>
              <strong>{product.brand && product.brand.name}</strong>
            </div>
            <div className="detail-meta-row">
              <span className="muted-text">Inventory</span>
              <strong>
                {product.inventory && product.inventory.count
                  ? product.inventory.count + ' in stock'
                  : product.inventory && product.inventory.backorder
                    ? 'Backorder available'
                    : 'Availability varies'}
              </strong>
            </div>
          </div>

          <div className="detail-purchase-row">
            <QuantitySelector value={quantity} onChange={setQuantity} max={8} />
            <button
              className="button"
              onClick={function handleAddToCart() {
                cart.addToCart(product, quantity);
              }}
            >
              Add {quantity} to cart
            </button>
          </div>
        </div>
      </section>

      <section className="stack">
        <div className="inline-row space-between">
          <strong>Related products</strong>
          <span className="muted-text">Same category, similar merchandising rules</span>
        </div>
        <div className="product-grid compact-grid">
          {relatedProducts.map(function mapProduct(item) {
            return (
              <ProductCard key={item.id} product={item} onAddToCart={cart.addToCart} />
            );
          })}
        </div>
      </section>
    </div>
  );
}
