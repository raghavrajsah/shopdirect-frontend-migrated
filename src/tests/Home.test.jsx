import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import Home from '../pages/Home';

function Providers(props) {
  return (
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>{props.children}</CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Home page', function () {
  beforeEach(function () {
    window.localStorage.clear();
  });

  it('renders the homepage and loads product cards', async function () {
    render(<Home />, {
      wrapper: Providers,
    });

    expect(screen.getByText('Search by name, brand, or category')).toBeInTheDocument();
    expect(await screen.findByText('Oak & Iron Desk Lamp')).toBeInTheDocument();
  });
});
