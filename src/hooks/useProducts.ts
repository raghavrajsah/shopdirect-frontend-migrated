import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { REQUEST_STATUS } from '../constants/statuses';
import useSearch from './useSearch';
import type { NormalizedProduct, RequestStatus } from '../types';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'top-rated';

interface UseProductsReturn {
  products: NormalizedProduct[];
  allProducts: NormalizedProduct[];
  categories: string[];
  status: RequestStatus;
  error: string;
  selectedCategory: string;
  sortBy: SortOption;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  clearSearch: () => void;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
}

export default function useProducts(): UseProductsReturn {
  var [products, setProducts] = useState<NormalizedProduct[]>([]);
  var [visibleProducts, setVisibleProducts] = useState<NormalizedProduct[]>([]);
  var [status, setStatus] = useState<RequestStatus>(REQUEST_STATUS.idle as RequestStatus);
  var [error, setError] = useState('');
  var [selectedCategory, setSelectedCategory] = useState('all');
  var [sortBy, setSortBy] = useState<SortOption>('featured');
  var search = useSearch('');

  useEffect(function loadProducts() {
    var active = true;

    setStatus(REQUEST_STATUS.loading as RequestStatus);
    fetchProducts()
      .then(function handleProducts(items: NormalizedProduct[]) {
        if (!active) {
          return;
        }

        setProducts(items);
        setVisibleProducts(items);
        setStatus(REQUEST_STATUS.success as RequestStatus);
      })
      .catch(function handleError() {
        if (!active) {
          return;
        }

        setError('Products could not be loaded.');
        setStatus(REQUEST_STATUS.error as RequestStatus);
      });

    return function stopUpdates() {
      active = false;
    };
  }, []);

  useEffect(
    function filterAndSortProducts() {
      var nextProducts = products.slice();

      if (selectedCategory !== 'all') {
        nextProducts = nextProducts.filter(function filterByCategory(product: NormalizedProduct) {
          return product.category === selectedCategory;
        });
      }

      if (search.debouncedTerm) {
        nextProducts = nextProducts.filter(function filterBySearch(product: NormalizedProduct) {
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

      nextProducts.sort(function sortProducts(a: NormalizedProduct, b: NormalizedProduct) {
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

  var categories: string[] = ['all'].concat(
    Array.from(
      new Set(
        products.map(function mapCategory(product: NormalizedProduct) {
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
