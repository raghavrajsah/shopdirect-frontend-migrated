interface LoadingSpinnerProps {
  label?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps): React.JSX.Element {
  var label = props.label || 'Loading';

  return (
    <div className="loading-shell" role="status" aria-live="polite">
      <div className="loading-ring" />
      <div className="stack">
        <strong>{label}</strong>
        <span className="muted-text">Pulling mock data from the local service layer.</span>
      </div>
    </div>
  );
}
