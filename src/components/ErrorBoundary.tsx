import { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" style={{ width: '100%', height: '100%' }}>
      <p>Something went wrong:</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

interface ErrorCatchProps extends PropsWithChildren<unknown> {
  onReset?: () => void;
}

export function ErrorCatch({ children, onReset }: ErrorCatchProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}
