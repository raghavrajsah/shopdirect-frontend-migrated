import React, { type ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { CartProvider } from '../contexts/CartContext';
import useCart from '../hooks/useCart';
import { mockProducts } from '../data/mockData';

interface WrapperProps {
  children: ReactNode;
}

function Wrapper(props: WrapperProps): React.ReactElement {
  return React.createElement(CartProvider, null, props.children);
}

describe('useCart', function () {
  beforeEach(function () {
    window.localStorage.clear();
  });

  it('adds items and updates totals', async function () {
    var result = renderHook(function () {
      return useCart();
    }, {
      wrapper: Wrapper,
    });

    act(function () {
      result.result.current.addToCart({
        ...mockProducts[2],
        primaryImage: mockProducts[2].image,
        displayPrice: mockProducts[2].salePrice,
      }, 2);
    });

    await waitFor(function () {
      expect(result.result.current.itemCount).toBe(2);
    });

    expect(result.result.current.subtotal).toBe(128);
    expect(result.result.current.hasItems).toBe(true);
  });
});
