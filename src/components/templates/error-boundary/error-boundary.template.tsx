import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";

import { Component } from "react";

type ErrorBoundaryProps = PropsWithChildren<{ className?: string }>;
type ErrorBoundaryState = { errorMessage: string; hasError: boolean };

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorMessage: "", hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { errorMessage: error.message, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorMessage: error.message, hasError: true });
    console.error("an error happened", error, errorInfo.componentStack);
  }

  render(): ReactNode {
    const { children, className } = this.props;
    const { errorMessage, hasError } = this.state;

    if (hasError) {
      return (
        <button
          className={className}
          onClick={window.location.reload}
          type="button"
        >
          <p>{errorMessage}</p>
          <p>Reload Page</p>
        </button>
      );
    }

    return children;
  }
}
