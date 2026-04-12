import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

function navClassName(props: { isActive: boolean }): string {
  return props.isActive ? 'nav-link nav-link-active' : 'nav-link';
}

export default function Navbar(): React.JSX.Element {
  var cart = useCart();
  var auth = useAuth();

  return (
    <header className="navbar-shell">
      <div className="promo-strip">Internal demo storefront for the ShopDirect migration workstream.</div>
      <div className="navbar-inner">
        <Link to={ROUTES.home} className="brand-lockup">
          <span className="brand-mark">SD</span>
          <div>
            <strong>ShopDirect</strong>
            <div className="muted-text">Legacy frontend sandbox</div>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to={ROUTES.home} className={navClassName}>
            Home
          </NavLink>
          <NavLink to={ROUTES.cart} className={navClassName}>
            Cart
          </NavLink>
          <NavLink to={ROUTES.profile} className={navClassName}>
            Profile
          </NavLink>
        </nav>

        <div className="nav-actions">
          <div className="nav-user">
            <strong>{auth.currentUser ? auth.currentUser.firstName || 'Shopper' : 'Guest'}</strong>
            <span className="muted-text">
              {auth.currentUser ? auth.currentUser.email : 'Preview mode'}
            </span>
          </div>
          {auth.currentUser ? (
            <button className="ghost-button" onClick={auth.logoutUser}>
              Sign out
            </button>
          ) : (
            <button
              className="ghost-button"
              onClick={function handleLogin() {
                auth.signInWithEmail('mia.chen@example.com');
              }}
            >
              Demo sign in
            </button>
          )}
          <button className="button" onClick={cart.openDrawer}>
            Cart ({cart.itemCount})
          </button>
        </div>
      </div>
    </header>
  );
}
