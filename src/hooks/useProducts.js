import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { REQUEST_STATUS } from '../constants/statuses';
import useSearch from './useSearch';

export default function useProducts() {
  var [products, setProducts] = useState([]);
  var [visibleProducts, setVisibleProducts] = useState([]);
  var [status, setStatus] = useState(REQUEST_STATUS.idle);
  var [error, setError] = useState('');
  var [selectedCategory, setSelectedCategory] = useState('all');
  var [sortBy, setSortBy] = useState('featured');
  var search = useSearch('');

  useEffect(function loadProducts() {
    var active = true;

    setStatus(REQUEST_STATUS.loading);
    fetchProducts()
      .then(function handleProducts(items) {
        if (!active) {
          return;
        }

        setProducts(items);
        setVisibleProducts(items);
        setStatus(REQUEST_STATUS.success);
      })
      .catch(function handleError() {
        if (!active) {
          return;
        }

        setError('Products could not be loaded.');
        setStatus(REQUEST_STATUS.error);
      });

    return function stopUpdates() {
      active = false;
    };
  }, []);

  useEffect(
    function filterAndSortProducts() {
      var nextProducts = products.slice();

      if (selectedCategory !== 'all') {
        nextProducts = nextProducts.filter(function filterByCategory(product) {
          return product.category === selectedCategory;
        });
      }

      if (search.debouncedTerm) {
        nextProducts = nextProducts.filter(function filterBySearch(product) {
          var haystack = [
            product.name,
            product.category,
            product.brand && product.brand.name,
            product.shortDescription,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

          return haystack.indexOf(search.debouncedTerm) !== -1;
        });
      }

      nextProducts.sort(function sortProducts(a, b) {
        if (sortBy === 'price-low') {
          return a.displayPrice - b.displayPrice;
        }

        if (sortBy === 'price-high') {
          return b.displayPrice - a.displayPrice;
        }

        if (sortBy === 'top-rated') {
          return b.ratingValue - a.ratingValue;
        }

        return Number(!!b.featured) - Number(!!a.featured);
      });

      setVisibleProducts(nextProducts);
    },
    [products, selectedCategory, sortBy, search.debouncedTerm]
  );

  var categories = ['all'].concat(
    Array.from(
      new Set(
        products.map(function mapCategory(product) {
          return product.category;
        })
      )
    )
  );

  return {
    products: visibleProducts,
    allProducts: products,
    categories: categories,
    status: status,
    error: error,
    selectedCategory: selectedCategory,
    sortBy: sortBy,
    searchTerm: search.searchTerm,
    setSearchTerm: search.setSearchTerm,
    clearSearch: search.clearSearch,
    setSelectedCategory: setSelectedCategory,
    setSortBy: setSortBy,
  };
}
