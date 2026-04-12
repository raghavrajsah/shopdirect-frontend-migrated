import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import { ROUTES } from './constants/routes';

function App(): React.JSX.Element {
  return (
    <div className="app-shell">
      <Navbar />
      <CartDrawer />
      <main className="page-shell">
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.productDetail} element={<ProductDetail />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path={ROUTES.checkout} element={<Checkout />} />
          <Route path={ROUTES.orderConfirmation} element={<OrderConfirmation />} />
          <Route path={ROUTES.profile} element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
