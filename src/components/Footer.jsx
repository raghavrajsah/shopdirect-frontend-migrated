export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div className="stack">
          <strong>ShopDirect Frontend</strong>
          <span className="muted-text">
            Built as a realistic JavaScript storefront waiting for a TypeScript migration.
          </span>
        </div>
        <div className="stack">
          <strong>Teams</strong>
          <span className="muted-text">Storefront Platform</span>
          <span className="muted-text">Checkout Operations</span>
        </div>
        <div className="stack">
          <strong>Notes</strong>
          <span className="muted-text">Mock data only</span>
          <span className="muted-text">No backend dependencies</span>
        </div>
      </div>
    </footer>
  );
}
