import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import { heroBanners } from '../data/mockData';
import type { NormalizedProduct } from '../types';

export default function Home(): React.JSX.Element {
  var productsState = useProducts();
  var cart = useCart();
  var banner = heroBanners[0];

  return (
    <div className="stack page-stack">
      <section className="hero-panel section-card">
        <div className="stack hero-copy">
          <span className="eyebrow">{banner.eyebrow}</span>
          <h1>{banner.title}</h1>
          <p className="muted-text">{banner.body}</p>
        </div>
        <div className="hero-metrics">
          <div className="metric-card">
            <strong>{productsState.allProducts.length || 8}</strong>
            <span className="muted-text">Products in mock catalog</span>
          </div>
          <div className="metric-card">
            <strong>{cart.itemCount}</strong>
            <span className="muted-text">Items currently in cart</span>
          </div>
          <div className="metric-card">
            <strong>JS first</strong>
            <span className="muted-text">Migration pending</span>
          </div>
        </div>
      </section>

      <SearchBar
        searchTerm={productsState.searchTerm}
        selectedCategory={productsState.selectedCategory}
        sortBy={productsState.sortBy}
        categories={productsState.categories}
        onSearchChange={productsState.setSearchTerm}
        onCategoryChange={productsState.setSelectedCategory}
        onSortChange={productsState.setSortBy}
        onClear={productsState.clearSearch}
      />

      {productsState.status === 'loading' ? <LoadingSpinner label="Loading products" /> : null}

      {productsState.status === 'success' && productsState.products.length === 0 ? (
        <EmptyState
          title="No products matched your filters"
          description="Try clearing the search or switching back to all categories."
        />
      ) : null}

      <section className="product-grid">
        {productsState.products.map(function mapProduct(product: NormalizedProduct) {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={cart.addToCart}
            />
          );
        })}
      </section>
    </div>
  );
}
