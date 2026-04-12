import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function EmptyState(props: EmptyStateProps): React.JSX.Element {
  var title = props.title || 'Nothing here yet';
  var description =
    props.description || 'Try another search or head back to the storefront.';
  var actionLabel = props.actionLabel || 'Back to home';
  var actionTo = props.actionTo || ROUTES.home;

  return (
    <div className="empty-state section-card">
      <div className="empty-state-icon">◎</div>
      <div className="stack">
        <strong>{title}</strong>
        <span className="muted-text">{description}</span>
      </div>
      <Link to={actionTo} className="button">
        {actionLabel}
      </Link>
    </div>
  );
}
