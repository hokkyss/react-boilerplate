import { EmptyObject } from "@hokkyss/composite-types";
import React from "react";

type ErrorBoundaryProps = React.PropsWithChildren<EmptyObject>;
type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo.componentStack);
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <button onClick={window.location.reload} type="button">
          Reload Page
        </button>
      );
    }

    return children;
  }
}
