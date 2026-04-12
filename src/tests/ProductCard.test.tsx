import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import type { NormalizedProduct } from '../types';

describe('ProductCard', function () {
  it('renders product content and pricing details', function () {
    var product: NormalizedProduct = {
      ...mockProducts[0],
      primaryImage: mockProducts[0].images![0],
      displayPrice: mockProducts[0].price!,
      ratingValue: 4.6,
      totalReviews: mockProducts[0].rating!.count!,
    };

    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={function noop() {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Oak & Iron Desk Lamp')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(screen.getByText('Best Seller')).toBeInTheDocument();
  });
});
